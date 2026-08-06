import pool from '@/lib/db';
import { scrapeSteamRIP } from '@/lib/scrapers/steamrip';
import { slugify } from '@/lib/slug';

/**
 * Check if a Gofile link is dead (404 / inactive / deleted)
 */
export async function checkGofileIsDead(url) {
  if (!url || typeof url !== 'string' || !url.toLowerCase().includes('gofile.io')) {
    return false;
  }

  const match = url.match(/gofile\.io\/d\/([a-zA-Z0-9_-]+)/i);
  if (!match || !match[1]) return false;

  const contentId = match[1];

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

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
      if (apiRes.status === 404 || apiRes.status === 410) return true; // DEAD
      
      const data = await apiRes.json().catch(() => null);
      if (data && data.status) {
        if (data.status.includes('notFound') || data.status.includes('error')) {
          return true; // DEAD LINK!
        }
        if (data.status === 'ok') {
          return false; // ALIVE LINK!
        }
      }
    }

    // 2. Fallback: Fetch Gofile HTML page directly
    const pageRes = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PlayFusion/1.0' },
      cache: 'no-store'
    }).catch(() => null);

    if (pageRes) {
      if (pageRes.status === 404 || pageRes.status === 410) return true; // DEAD
      const html = await pageRes.text().catch(() => '');
      if (
        html.includes('error-notFound') || 
        html.includes('This upload does not exist') || 
        html.includes('fileNotExisting') || 
        html.includes('This content does not exist') || 
        html.includes('could not be found')
      ) {
        return true; // DEAD LINK!
      }
    }
  } catch (err) {
    console.error('Check Gofile link error:', err);
  }

  return false;
}

/**
 * Automatically re-scrape SteamRIP for a game to get a fresh working link & update DB
 */
export async function autoRescrapeFreshLink(gameId, gameName) {
  if (!gameId || !gameName) return null;

  const gameSlug = slugify(gameName);
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
      // try next URL
    }
  }

  if (!scrapedData || (!scrapedData.gofileLink && !scrapedData.torrentLink)) {
    // Flag as broken in DB if auto re-scrape failed
    await pool.query('UPDATE games SET is_broken = 1 WHERE id = $1', [parseInt(gameId)]).catch(() => {});
    return null;
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
  `, [directLink, torrentLink, parseInt(gameId)]);

  return { directLink, torrentLink };
}
