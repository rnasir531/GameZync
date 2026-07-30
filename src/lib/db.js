/**
 * lib/db.js
 * ─────────────────────────────────────────────────────────────
 * Backwards-compatibility re-export.
 * New code should import from '@/lib/db' (which resolves to lib/db/index.js).
 * ─────────────────────────────────────────────────────────────
 */
export { query, default } from './db/index';
