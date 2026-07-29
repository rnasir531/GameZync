import { NextResponse } from 'next/server';
import db from '@/lib/db';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows: games } = await db.query(`
      SELECT id, name, cover_image, created_at, direct_download_link
      FROM games
      WHERE status = 'draft'
      ORDER BY created_at DESC
    `);
    
    return NextResponse.json({ success: true, games });
  } catch (error) {
    console.error('Error fetching pending games:', error);
    return NextResponse.json({ error: 'Failed to fetch pending games' }, { status: 500 });
  }
}
