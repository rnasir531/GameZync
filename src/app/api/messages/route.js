import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const data = await req.json();
    
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Ensure contact_messages table exists
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

    // Insert contact message
    const { rows } = await query(`
      INSERT INTO contact_messages (name, email, subject, message, status)
      VALUES ($1, $2, $3, $4, 'unread')
      RETURNING *
    `, [data.name, data.email, data.subject || null, data.message]);

    return NextResponse.json({ success: true, message: rows ? rows[0] : null });
  } catch (error) {
    console.error('Contact Message Error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { rows } = await query(`SELECT * FROM contact_messages ORDER BY created_at DESC`);
    return NextResponse.json({ messages: rows || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
