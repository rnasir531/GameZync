import { NextResponse } from 'next/server';
import pool from '@/lib/db';
export const dynamic = 'force-dynamic';

async function ensureColumn() {
  try {
    await pool.query(`ALTER TABLE games ADD COLUMN IF NOT EXISTS is_broken INT DEFAULT 0`);
  } catch (err) {
    console.error('Failed ensuring is_broken column:', err);
  }
}

// Special Dedicated Health Check for Gofile Links
async function checkGofileLink(url) {
  const match = url.match(/gofile\.io\/d\/([a-zA-Z0-9_-]+)/i);
  if (!match || !match[1]) return true;

  const contentId = match[1];
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    // 1. Query Gofile official contents API
    const apiRes = await fetch(`https://api.gofile.io/contents/${contentId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      },
      signal: controller.signal,
      cache: 'no-store'
    }).catch(() => null);

    clearTimeout(timer);

    if (apiRes) {
      if (apiRes.status === 404 || apiRes.status === 410) return false;
      
      const data = await apiRes.json().catch(() => null);
      if (data && data.status) {
        if (data.status.includes('notFound') || data.status.includes('error')) {
          return false; // DEAD LINK!
        }
        if (data.status === 'ok') {
          return true; // ALIVE LINK!
        }
      }
    }

    // 2. Fallback: Fetch Gofile html page directly
    const pageRes = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PlayFusion/1.0' },
      cache: 'no-store'
    }).catch(() => null);

    if (pageRes) {
      if (pageRes.status === 404 || pageRes.status === 410) return false;
      const html = await pageRes.text().catch(() => '');
      if (html.includes('error-notFound') || html.includes('This upload does not exist') || html.includes('fileNotExisting')) {
        return false; // DEAD LINK!
      }
    }
  } catch (err) {
    console.error('Gofile link check error:', err);
  }
  return true;
}

// Universal Fast Link Health Checker
async function checkUrlHealth(url) {
  if (!url || typeof url !== 'string') return true;
  const cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) return true;

  // Dedicated handler for Gofile links
  if (cleanUrl.toLowerCase().includes('gofile.io')) {
    return await checkGofileLink(cleanUrl);
  }

  // Universal GET / HEAD check for all other download providers
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(cleanUrl, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PlayFusion/1.0' },
      signal: controller.signal,
      cache: 'no-store'
    }).catch(() => null);

    clearTimeout(timer);

    if (!res) return true;

    if (res.status === 404 || res.status === 410) {
      return false; // DEAD LINK!
    }

    return true;
  } catch (err) {
    return true;
  }
}

export async function GET() {
  await ensureColumn();
  
  try {
    const { rows: games } = await pool.query(`
      SELECT id, name, direct_download_link, torrent_link, is_broken 
      FROM games 
      WHERE status = 'published'
    `);

    let checkedCount = 0;
    let brokenCount = 0;
    const brokenGameIds = [];

    // Scan games in parallel chunks of 25 for maximum accuracy
    const chunkSize = 25;
    for (let i = 0; i < games.length; i += chunkSize) {
      const chunk = games.slice(i, i + chunkSize);
      
      await Promise.all(chunk.map(async (game) => {
        checkedCount++;
        const hasDirect = !!(game.direct_download_link && game.direct_download_link.trim());
        const hasTorrent = !!(game.torrent_link && game.torrent_link.trim());

        let isDirectOk = true;
        let isTorrentOk = true;

        if (hasDirect) {
          isDirectOk = await checkUrlHealth(game.direct_download_link);
        }

        if (hasTorrent && game.torrent_link.startsWith('http')) {
          isTorrentOk = await checkUrlHealth(game.torrent_link);
        }

        // Flag as broken (1) if either direct or torrent link is dead
        const isBroken = (!isDirectOk || !isTorrentOk) ? 1 : 0;

        if (isBroken === 1) {
          brokenCount++;
          brokenGameIds.push(game.id);
        }

        await pool.query('UPDATE games SET is_broken = $1 WHERE id = $2', [isBroken, game.id]);
      }));
    }

    return NextResponse.json({
      success: true,
      scanned: checkedCount,
      brokenCount: brokenCount,
      brokenGameIds: brokenGameIds
    });
  } catch (err) {
    console.error('Error scanning link health:', err);
    return NextResponse.json({ error: 'Failed scanning links' }, { status: 500 });
  }
}

// POST endpoint to manually toggle or update broken link status for a game
export async function POST(request) {
  await ensureColumn();
  try {
    const { game_id, is_broken } = await request.json();
    if (!game_id) {
      return NextResponse.json({ error: 'Game ID required' }, { status: 400 });
    }

    const brokenVal = is_broken ? 1 : 0;
    await pool.query('UPDATE games SET is_broken = $1 WHERE id = $2', [brokenVal, game_id]);

    return NextResponse.json({ success: true, game_id, is_broken: brokenVal });
  } catch (err) {
    console.error('Error updating link status:', err);
    return NextResponse.json({ error: 'Failed to update link status' }, { status: 500 });
  }
}
