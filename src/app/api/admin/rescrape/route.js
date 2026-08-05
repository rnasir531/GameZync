import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { scrapeSteamRIP } from '@/lib/scrapers/steamrip';
import { slugify } from '@/lib/slug';

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
    const gameSlug = slugify(game.name);
    
    // Construct probable SteamRIP URLs
    const probableUrls = [
      `https://steamrip.com/${gameSlug}-free-download/`,
      `https://steamrip.com/${gameSlug}-free/`,
      `https://steamrip.com/${gameSlug}/`
    ];

    let scrapedData = null;
    for (const url of probableUrls) {
      try {
        const result = await scrapeSteamRIP(url);
        if (result && (result.gofileLink || result.torrentLink)) {
          scrapedData = result;
          break;
        }
      } catch (e) {
        // try next url
      }
    }

    if (!scrapedData || (!scrapedData.gofileLink && !scrapedData.torrentLink)) {
      return NextResponse.json({ error: `Could not auto re-scrape fresh links for "${game.name}". Please edit manually.` }, { status: 400 });
    }

    const directLink = scrapedData.gofileLink || '';
    const torrentLink = scrapedData.torrentLink || '';

    // Update DB with fresh download links and clear broken status
    await pool.query(`
      UPDATE games 
      SET direct_download_link = COALESCE(NULLIF($1, ''), direct_download_link),
          torrent_link = COALESCE(NULLIF($2, ''), torrent_link),
          is_broken = 0
      WHERE id = $3
    `, [directLink, torrentLink, game.id]);

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
