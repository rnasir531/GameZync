import pool from './db';

// --- WHERE CLAUSE BUILDER ---
function buildWhere(where, existingValues = []) {
  if (!where) return { clause: '', values: existingValues };
  const keys = Object.keys(where);
  if (keys.length === 0) return { clause: '', values: existingValues };

  const values = existingValues;
  const clauses = keys.map((k) => {
    const val = where[k];

    // Handle Prisma OR
    if (k === 'OR' && Array.isArray(val)) {
      const orClauses = val.map(orCond => {
        const subKeys = Object.keys(orCond);
        return subKeys.map(sk => {
          const sv = orCond[sk];
          if (sv === null) { return `"${sk}" IS NULL`; }
          values.push(sv);
          return `"${sk}" = $${values.length}`;
        }).join(' AND ');
      }).filter(c => c !== '');
      return `(${orClauses.join(' OR ')})`;
    }

    // Handle Prisma AND
    if (k === 'AND' && Array.isArray(val)) {
      const andClauses = val.map(andCond => {
        const { clause } = buildWhere(andCond, values);
        return clause.replace(/^WHERE /, '');
      }).filter(c => c !== '');
      return `(${andClauses.join(' AND ')})`;
    }

    if (typeof val === 'object' && val !== null) {
      if ('contains' in val) {
        values.push(`%${val.contains}%`);
        return val.mode === 'insensitive'
          ? `"${k}" ILIKE $${values.length}`
          : `"${k}" LIKE $${values.length}`;
      }
      if ('gte' in val) { values.push(val.gte); return `"${k}" >= $${values.length}`; }
      if ('lte' in val) { values.push(val.lte); return `"${k}" <= $${values.length}`; }
      if ('gt'  in val) { values.push(val.gt);  return `"${k}" > $${values.length}`; }
      if ('lt'  in val) { values.push(val.lt);  return `"${k}" < $${values.length}`; }
      if ('not' in val) {
        if (val.not === null) return `"${k}" IS NOT NULL`;
        values.push(val.not);
        return `"${k}" != $${values.length}`;
      }
      if ('in' in val && Array.isArray(val.in)) {
        const placeholders = val.in.map(v => { values.push(v); return `$${values.length}`; });
        return `"${k}" IN (${placeholders.join(', ')})`;
      }
    }

    if (val === null) return `"${k}" IS NULL`;
    values.push(val);
    return `"${k}" = $${values.length}`;
  });

  return { clause: `WHERE ` + clauses.join(' AND '), values };
}

// --- ORDER BY BUILDER ---
function buildOrderBy(orderBy) {
  if (!orderBy) return '';
  if (Array.isArray(orderBy)) {
    const clauses = orderBy.map(obj => {
      const k = Object.keys(obj)[0];
      return k ? `"${k}" ${obj[k].toUpperCase()}` : '';
    }).filter(Boolean);
    return clauses.length > 0 ? `ORDER BY ${clauses.join(', ')}` : '';
  }
  const keys = Object.keys(orderBy);
  if (keys.length === 0) return '';
  const k = keys[0];
  return `ORDER BY "${k}" ${orderBy[k].toUpperCase()}`;
}

// --- MODEL CLASS ---
class Model {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async findMany(args = {}) {
    const { where, take, skip, orderBy } = args;
    const { clause, values } = buildWhere(where);
    const orderClause = buildOrderBy(orderBy);
    const limitClause = take ? `LIMIT ${take}` : '';
    const offsetClause = skip ? `OFFSET ${skip}` : '';
    const q = `SELECT * FROM "${this.tableName}" ${clause} ${orderClause} ${limitClause} ${offsetClause}`.trim();
    const res = await pool.query(q, values);
    return res.rows;
  }

  async findUnique(args = {}) {
    const { clause, values } = buildWhere(args.where);
    const q = `SELECT * FROM "${this.tableName}" ${clause} LIMIT 1`;
    const res = await pool.query(q, values);
    return res.rows[0] || null;
  }

  async findFirst(args = {}) {
    return this.findUnique(args);
  }

  async create(args = {}) {
    const data = args.data || {};
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const q = `INSERT INTO "${this.tableName}" (${keys.map(k => `"${k}"`).join(', ')}) VALUES (${placeholders}) RETURNING *`;
    try {
      const res = await pool.query(q, values);
      return res.rows[0];
    } catch (error) {
      console.error(`\n[DB INSERT ERROR on ${this.tableName}]`, error.message);
      console.error(`[QUERY]`, q);
      console.error(`[VALUES]`, values, `\n`);
      throw error;
    }
  }

  async update(args = {}) {
    const { where, data } = args;
    const { clause: whereClause, values: whereValues } = buildWhere(where);
    const keys = Object.keys(data);
    const setClauses = keys.map((k, i) => `"${k}" = $${whereValues.length + i + 1}`);
    const values = [...whereValues, ...Object.values(data)];
    const q = `UPDATE "${this.tableName}" SET ${setClauses.join(', ')} ${whereClause} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  }

  async upsert(args = {}) {
    const { where, update, create } = args;
    const existing = await this.findUnique({ where });
    if (existing) {
      return this.update({ where, data: update });
    } else {
      return this.create({ data: create });
    }
  }

  async delete(args = {}) {
    const { clause, values } = buildWhere(args.where);
    const q = `DELETE FROM "${this.tableName}" ${clause} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  }

  async deleteMany(args = {}) {
    const { clause, values } = buildWhere(args?.where);
    const q = `DELETE FROM "${this.tableName}" ${clause}`;
    const res = await pool.query(q, values);
    return { count: res.rowCount };
  }

  async count(args = {}) {
    const { clause, values } = buildWhere(args?.where);
    const q = `SELECT COUNT(*) as count FROM "${this.tableName}" ${clause}`;
    const res = await pool.query(q, values);
    return parseInt(res.rows[0].count, 10);
  }

  async aggregate(args = {}) {
    const sums = args._sum ? Object.keys(args._sum) : [];
    if (sums.length === 0) return { _sum: {} };
    const selects = sums.map(s => `SUM("${s}") as _sum_${s}`).join(', ');
    const res = await pool.query(`SELECT ${selects} FROM "${this.tableName}"`);
    const result = { _sum: {} };
    sums.forEach(s => { result._sum[s] = parseInt(res.rows[0][`_sum_${s}`] || 0, 10); });
    return result;
  }
}

// --- PRISMA MOCK OBJECT ---
const prisma = {
  game: new Model('games'),
  category: new Model('categories'),
  adminUser: new Model('admin_users'),
  activityLog: new Model('activity_logs'),
  requestGame: new Model('game_requests'),
  reviewGame: new Model('review_games'),
  contactMessage: new Model('contact_messages'),
  instantGame: new Model('instant_games'),
  upcomingGame: new Model('upcoming_games'),
  setting: new Model('settings'),
  gameCategory: new Model('game_categories'),
  reviewGameCategory: new Model('review_game_categories'),
  upcomingGameCategory: new Model('upcoming_game_categories'),
  instantGameCategory: new Model('instant_game_categories'),

  async $queryRaw(strings, ...values) {
    const parts = Array.isArray(strings) ? strings : [strings];
    const query = parts.reduce((acc, str, i) => acc + str + (values[i] !== undefined ? `$${i + 1}` : ''), '');
    const res = await pool.query(query, values);
    return res.rows;
  }
};

export default prisma;
