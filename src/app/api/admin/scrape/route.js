import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { scrapeSteamRIP } from '@/lib/scrapers/steamrip';
import { scrapeGameTrex } from '@/lib/scrapers/gametrex';

export async function POST(request) {
  try {
    const { url, autoSave } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'Please provide a valid URL.' }, { status: 400 });
    }

    // ── 1. FAST PRE-CHECK: Prevent scraping if game already exists in DB ──
    const urlSlug = url.split('/').filter(Boolean).pop() || '';
    const cleanKeyword = urlSlug
      .replace(/-free-download|-download|-free/gi, '')
      .replace(/-/g, ' ')
      .trim();

    if (cleanKeyword.length > 2) {
      const { rows: preCheckGames } = await pool.query(
        `SELECT id, name, status FROM games WHERE LOWER(name) = LOWER($1) LIMIT 1`,
        [cleanKeyword]
      );

      if (preCheckGames.length > 0) {
        const existing = preCheckGames[0];
        const statusText = existing.status === 'archived' ? 'Archive Box' : 'Published Games';
        return NextResponse.json({
          error: `⚠️ "${existing.name}" is ALREADY saved in your database (Status: ${statusText}, ID: #${existing.id}). Duplicate scraping skipped!`
        }, { status: 400 });
      }
    }

    // ── 2. Perform Web Scraping ──
    let scrapedData = null;
    let source = '';

    if (url.includes('steamrip.com')) {
      source = 'steamrip';
      scrapedData = await scrapeSteamRIP(url);
    } else if (url.includes('gametrex.com')) {
      source = 'gametrex';
      scrapedData = await scrapeGameTrex(url);
    } else {
      return NextResponse.json({ error: 'Unsupported URL. Please provide a SteamRIP or GameTrex URL.' }, { status: 400 });
    }

    if (!scrapedData.gofileLink && !scrapedData.torrentLink) {
      return NextResponse.json({ error: 'No valid download link (Direct or Torrent) found for this game.' }, { status: 400 });
    }

    const gameObj = {
      name: scrapedData.title,
      game_version: scrapedData.game_version || 'v1.0',
      release_year: scrapedData.releaseYear || new Date().getFullYear(),
      developer_publisher: scrapedData.developer || 'Unknown',
      category: scrapedData.category || 'Action',
      cover_image: scrapedData.coverImage || '',
      images: scrapedData.images || '',
      description: scrapedData.description || '',
      os: scrapedData.os || '',
      processor: scrapedData.processor || '',
      ram: scrapedData.ram || '8 GB',
      graphics_card: scrapedData.graphics || '',
      directx: scrapedData.directx || '',
      storage: scrapedData.storage || '50 GB',
      direct_download_link: scrapedData.gofileLink || '',
      torrent_link: scrapedData.torrentLink || ''
    };

    // ── 3. EXACT TITLE CHECK: Ensure game isn't already in DB ──
    const { rows: existingExact } = await pool.query(
      'SELECT id, name, status FROM games WHERE LOWER(name) = LOWER($1) LIMIT 1',
      [gameObj.name]
    );

    if (existingExact.length > 0) {
      const existing = existingExact[0];
      const statusText = existing.status === 'archived' ? 'Archive Box' : 'Published Games';
      return NextResponse.json({
        error: `⚠️ "${existing.name}" is ALREADY saved in your database (Status: ${statusText}, ID: #${existing.id}). Duplicate scraping skipped!`
      }, { status: 400 });
    }

    // ── 4. Save to Archive Box if autoSave enabled ──
    if (autoSave) {
      const { rows: inserted } = await pool.query(`
        INSERT INTO games (
          name, game_version, release_year, developer_publisher, category,
          cover_image, images, description, os, processor, ram,
          graphics_card, directx, storage, direct_download_link, torrent_link, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING id
      `, [
        gameObj.name, gameObj.game_version, gameObj.release_year, gameObj.developer_publisher, gameObj.category,
        gameObj.cover_image, gameObj.images, gameObj.description, gameObj.os, gameObj.processor, gameObj.ram,
        gameObj.graphics_card, gameObj.directx, gameObj.storage, gameObj.direct_download_link, gameObj.torrent_link, 'archived'
      ]);

      return NextResponse.json({
        success: true,
        autoSaved: true,
        insertedId: inserted[0].id,
        message: `📦 Success! Scraped and Saved "${gameObj.name}" directly to Archive Box (ID: #${inserted[0].id})! You can inspect and publish it whenever you're ready.`,
        game: gameObj
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Game scraped successfully! Please review the details below.',
      game: gameObj
    });

  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json({ error: 'Failed to scrape the website. ' + error.message }, { status: 500 });
  }
}
