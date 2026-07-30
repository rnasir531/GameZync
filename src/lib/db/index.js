/**
 * lib/db/index.js
 * ─────────────────────────────────────────────────────────────
 * DATABASE ENGINE LAYER — The ONLY file to change when
 * switching database engines (PostgreSQL → MySQL / Supabase / MongoDB).
 *
 * Current engine: Neon PostgreSQL via pg (node-postgres)
 * ─────────────────────────────────────────────────────────────
 */

import { Pool } from 'pg';
import { DB_CONFIG } from '@/config/database';

let pool;

if (!globalThis.pgPool) {
  const isLocalhost =
    DB_CONFIG.connectionString.includes('localhost') ||
    DB_CONFIG.connectionString.includes('127.0.0.1');

  const instance = new Pool({
    connectionString: DB_CONFIG.connectionString,
    ...DB_CONFIG.pool,
    ...(isLocalhost ? {} : { ssl: { rejectUnauthorized: false } }),
  });

  // Wrap query with silent error handling so a bad query never crashes the app
  const rawQuery = instance.query.bind(instance);
  instance.query = async (...args) => {
    try {
      return await rawQuery(...args);
    } catch (err) {
      console.error('[DB] Query Error:', err.message);
      return { rows: [], rowCount: 0 };
    }
  };

  globalThis.pgPool = instance;
}

pool = globalThis.pgPool;

/**
 * Execute a parameterized SQL query.
 * @param {string} text  - SQL query string
 * @param {Array}  params - Query parameters
 * @returns {Promise<{rows: Array, rowCount: number}>}
 */
export async function query(text, params) {
  try {
    return await pool.query(text, params);
  } catch (err) {
    console.error('[DB] Safe query error:', err.message);
    return { rows: [], rowCount: 0 };
  }
}

export default pool;
