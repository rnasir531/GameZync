import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const excludeId = searchParams.get('exclude');

    let queryText = `SELECT id FROM games WHERE status = 'published'`;
    let queryParams = [];

    if (excludeId) {
      const parsedId = parseInt(excludeId, 10);
      if (!isNaN(parsedId)) {
        queryText += ` AND id != $1`;
        queryParams.push(parsedId);
      }
    }

    queryText += ` ORDER BY RANDOM() LIMIT 1;`;

    const { rows } = await db.query(queryText, queryParams);

    if (!rows || rows.length === 0) {
      const { rows: fallbackRows } = await db.query(`SELECT id FROM games WHERE status = 'published' ORDER BY RANDOM() LIMIT 1;`);
      if (!fallbackRows || fallbackRows.length === 0) {
        return NextResponse.json({ success: false, message: 'No games available' }, { status: 404 });
      }
      return NextResponse.json(
        { success: true, gameId: fallbackRows[0].id },
        { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
      );
    }

    return NextResponse.json(
      { success: true, gameId: rows[0].id },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
    );
  } catch (error) {
    console.error('Random API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
