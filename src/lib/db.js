import { Pool } from 'pg';

let pool;

const NEON_CLOUD_URL = "postgresql://neondb_owner:npg_EdzXi8o0Lxvh@ep-fancy-sunset-axchfabb.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require";

if (!globalThis.pgPool) {
  const envUrl = process.env.DATABASE_URL || '';
  const isLocalhost = !envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1');

  // Use Neon Cloud DB connection string when on Vercel or when localhost env is passed
  const finalUrl = (!isLocalhost && envUrl) ? envUrl : NEON_CLOUD_URL;
  
  const instance = new Pool({
    connectionString: finalUrl,
    ssl: { rejectUnauthorized: false },
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
