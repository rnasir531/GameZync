/**
 * services/requestService.js
 * ─────────────────────────────────────────────────────────────
 * Game request submission logic.
 * ─────────────────────────────────────────────────────────────
 */

import { insertGameRequest, getAllGameRequests } from '@/lib/db/queries';
import { query } from '@/lib/db';

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS game_requests (
      id SERIAL PRIMARY KEY,
      game_name TEXT NOT NULL,
      email TEXT,
      detail TEXT,
      status TEXT DEFAULT 'unread',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

/**
 * Submit a game request.
 * @returns {{ success: boolean, request?: object, error?: string }}
 */
export async function submitGameRequest(data) {
  const gameName = data.game_name || data.title || data.name;
  if (!gameName) return { error: 'Game name is required' };

  await ensureTable();

  const { rows } = await insertGameRequest(
    gameName,
    data.email || null,
    data.detail || data.details || data.message || ''
  );

  return { success: true, request: rows?.[0] || null };
}

/**
 * Get all submitted game requests.
 */
export async function getGameRequests() {
  const { rows } = await getAllGameRequests();
  return rows || [];
}
