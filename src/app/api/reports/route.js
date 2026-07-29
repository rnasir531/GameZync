import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const { game_id } = await request.json();
    
    if (!game_id) {
      return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Ensure dead_link_reports table exists
    await query(`
      CREATE TABLE IF NOT EXISTS dead_link_reports (
        id SERIAL PRIMARY KEY,
        game_id INT NOT NULL,
        user_ip TEXT,
        status TEXT DEFAULT 'pending',
        report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check for spam (1 report per game per IP per 24 hours)
    const { rows: existing } = await query(`
      SELECT id FROM dead_link_reports 
      WHERE game_id = $1 AND user_ip = $2 AND report_date > NOW() - INTERVAL '1 day'
    `, [game_id, ip]);

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'You have already reported this game recently.' }, { status: 429 });
    }

    await query(`
      INSERT INTO dead_link_reports (game_id, user_ip, status) 
      VALUES ($1, $2, 'pending')
    `, [game_id, ip]);

    return NextResponse.json({ success: true, message: 'Report submitted successfully. Thank you!' });
  } catch (error) {
    console.error('Error submitting report:', error);
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
  }
}
