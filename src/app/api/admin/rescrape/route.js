import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { autoRescrapeFreshLink } from '@/lib/scrapers/autoRescrape';

export async function POST(request) {
  try {
    const { game_id } = await request.json();

    if (!game_id) {
      return NextResponse.json({ error: 'Game ID required' }, { status: 400 });
    }

    const { rows } = await pool.query('SELECT id, name FROM games WHERE id = $1', [parseInt(game_id)]);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    const game = rows[0];
    const result = await autoRescrapeFreshLink(game.id, game.name);

    if (!result) {
      return NextResponse.json({ error: `Could not auto re-scrape fresh links for "${game.name}". Please edit manually.` }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      game_id: game.id,
      message: `🎉 Successfully re-scraped & updated fresh download links for "${game.name}"! (Broken status cleared).`
    });

  } catch (error) {
    console.error('Re-scrape error:', error);
    return NextResponse.json({ error: 'Re-scrape failed: ' + error.message }, { status: 500 });
  }
}
