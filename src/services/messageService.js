/**
 * services/messageService.js
 * ─────────────────────────────────────────────────────────────
 * Contact message submission logic.
 * ─────────────────────────────────────────────────────────────
 */

import { insertContactMessage, getAllContactMessages } from '@/lib/db/queries';
import { query } from '@/lib/db';

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

/**
 * Submit a contact message.
 * @returns {{ success: boolean, message?: object, error?: string }}
 */
export async function submitContactMessage(data) {
  if (!data.name || !data.email || !data.message) {
    return { error: 'Name, email, and message are required' };
  }

  await ensureTable();

  const { rows } = await insertContactMessage(
    data.name,
    data.email,
    data.subject,
    data.message
  );

  return { success: true, message: rows?.[0] || null };
}

/**
 * Get all contact messages.
 */
export async function getContactMessages() {
  const { rows } = await getAllContactMessages();
  return rows || [];
}
