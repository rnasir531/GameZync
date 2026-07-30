/**
 * services/reportService.js
 * ─────────────────────────────────────────────────────────────
 * Dead-link report submission logic.
 * ─────────────────────────────────────────────────────────────
 */

import { checkExistingReport, insertReport } from '@/lib/db/queries';
import { query } from '@/lib/db';

/**
 * Ensure the reports table exists (idempotent).
 */
async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS dead_link_reports (
      id SERIAL PRIMARY KEY,
      game_id INT NOT NULL,
      user_ip TEXT,
      status TEXT DEFAULT 'pending',
      report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

/**
 * Submit a dead-link report.
 * @returns {{ success: boolean, error?: string }}
 */
export async function submitReport(gameId, userIp) {
  if (!gameId) return { error: 'Game ID is required' };

  await ensureTable();

  const { rows: existing } = await checkExistingReport(gameId, userIp);
  if (existing && existing.length > 0) {
    return { error: 'You have already reported this game recently.' };
  }

  await insertReport(gameId, userIp);
  return { success: true, message: 'Report submitted successfully. Thank you!' };
}
