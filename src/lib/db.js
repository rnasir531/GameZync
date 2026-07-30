import { Pool } from 'pg';

let pool;

if (!globalThis.pgPool) {
  const envUrl = process.env.DATABASE_URL || "postgresql://postgres:1234@localhost:5432/ns_gamers";
  const isLocalhost = envUrl.includes('localhost') || envUrl.includes('127.0.0.1');

  const instance = new Pool({
    connectionString: envUrl,
    ...(isLocalhost ? {} : { ssl: { rejectUnauthorized: false } }),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

  const rawQuery = instance.query.bind(instance);
  instance.query = async (...args) => {
    try {
      return await rawQuery(...args);
    } catch (err) {
      console.error('Database Query Error:', err.message);
      return { rows: [], rowCount: 0 };
    }
  };

  globalThis.pgPool = instance;
}

pool = globalThis.pgPool;

export async function query(text, params) {
  try {
    return await pool.query(text, params);
  } catch (err) {
    console.error('Safe query error:', err.message);
    return { rows: [], rowCount: 0 };
  }
}

export default pool;
