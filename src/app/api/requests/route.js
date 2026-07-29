import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const data = await req.json();
    
    if (!data.game_name && !data.title && !data.name) {
      return NextResponse.json({ error: 'Game name is required' }, { status: 400 });
    }

    const gameName = data.game_name || data.title || data.name;
    const email = data.email || null;
    const detail = data.detail || data.details || data.message || '';

    // Ensure the table exists on Cloud DB
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

    // Insert the request
    const { rows } = await query(`
      INSERT INTO game_requests (game_name, email, detail, status)
      VALUES ($1, $2, $3, 'unread')
      RETURNING *
    `, [gameName, email, detail]);

    return NextResponse.json({ success: true, request: rows ? rows[0] : null });
  } catch (error) {
    console.error('Request Game Error:', error);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { rows } = await query(`SELECT * FROM game_requests ORDER BY created_at DESC`);
    return NextResponse.json({ requests: rows || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}
