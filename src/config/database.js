/**
 * config/database.js
 * ─────────────────────────────────────────────────────────────
 * Database connection configuration.
 * To switch database engines or providers, edit only this file
 * (and lib/db/index.js if changing from PostgreSQL).
 * ─────────────────────────────────────────────────────────────
 */

export const DB_CONFIG = {
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:1234@localhost:5432/ns_gamers',
  pool: {
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  },
};

// JWT / Auth
export const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_local_dev';
export const SESSION_COOKIE_NAME = 'admin_session';
export const SESSION_DURATION_SECONDS = 60 * 60 * 24; // 24 hours

// Download security
export const DOWNLOAD_SECRET = process.env.DOWNLOAD_SECRET || 'playfusion-secure-download-secret-2026';
export const DOWNLOAD_MIN_WAIT_MS = 13000;   // 13 seconds minimum wait
export const DOWNLOAD_MAX_AGE_MS  = 7200000; // 2 hours expiry
