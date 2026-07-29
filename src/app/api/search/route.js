import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = `%${query}%`;

    // 1. Search Standard Games
    const { rows: games } = await db.query(`
      SELECT id, name as title, cover_image, status 
      FROM games 
      WHERE name ILIKE $1 AND status = 'published'
      LIMIT 5
    `, [searchTerm]);

    const formattedGames = games.map(g => ({
      id: g.id,
      title: g.title,
      image: g.cover_image,
      type: 'game',
      url: `/game/${g.id}`
    }));

    // 2. Search Instant Games
    const { rows: instant } = await db.query(`
      SELECT id, title, image_url, embed_url
      FROM instant_games
      WHERE title ILIKE $1
      LIMIT 3
    `, [searchTerm]);

    const formattedInstant = instant.map(i => ({
      id: i.id,
      title: i.title,
      image: i.image_url,
      type: 'instant',
      url: i.embed_url || `/instant-games`
    }));

    // 3. Search Upcoming Games
    const { rows: upcoming } = await db.query(`
      SELECT id, title, cover_image
      FROM upcoming_games
      WHERE title ILIKE $1
      LIMIT 3
    `, [searchTerm]);

    const formattedUpcoming = upcoming.map(u => ({
      id: u.id,
      title: u.title,
      image: u.cover_image,
      type: 'upcoming',
      url: `/upcoming-games`
    }));

    // Combine and limit results
    const results = [...formattedGames, ...formattedInstant, ...formattedUpcoming].slice(0, 8);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
  }
}
