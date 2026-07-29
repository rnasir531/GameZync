import { NextResponse } from 'next/server';
import { fetchSteamRIPCatalog } from '@/lib/scrapers/steamrip/fetchCatalog';
import { fetchGameTrexCatalog } from '@/lib/scrapers/gametrex/fetchCatalog';
import { scrapeSteamRIP } from '@/lib/scrapers/steamrip/scrapeGame';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const { url, source = 'steamrip', limit = 5, autoSaveToArchive = true } = await request.json();

    const fetchUrl = url || (source === 'gametrex' ? 'https://gametrex.com/' : 'https://steamrip.com/');
    
    if (source === 'steamrip' && !fetchUrl.includes('steamrip.com')) {
       return NextResponse.json({ error: 'Only SteamRIP URLs are supported for SteamRIP source.' }, { status: 400 });
    }
    
    // Fetch existing game names to prevent duplicate scraping
    const { rows: existingGames } = await pool.query('SELECT name FROM games');
    const existingNames = new Set(existingGames.map(g => g.name.toLowerCase().trim()));

    // 1. Fetch Catalog links from SteamRIP/GameTrex main pages
    let catalogItems = [];
    if (source === 'gametrex' || fetchUrl.includes('gametrex.com')) {
      catalogItems = await fetchGameTrexCatalog(fetchUrl, existingNames);
    } else {
      catalogItems = await fetchSteamRIPCatalog(fetchUrl, existingNames);
    }

    if (!catalogItems || catalogItems.length === 0) {
      return NextResponse.json({
        success: true,
        savedCount: 0,
        message: 'No new un-scraped games found on SteamRIP homepage. All latest games are already saved in your database!'
      });
    }

    const itemsToProcess = catalogItems.slice(0, limit);
    const savedGames = [];
    const skippedGames = [];

    // 2. Loop & Scrape details for each game and save directly to Archive Box
    for (const item of itemsToProcess) {
      try {
        let scrapedData = null;
        if (source === 'steamrip') {
          scrapedData = await scrapeSteamRIP(item.url);
        } else {
          continue;
        }

        if (!scrapedData || (!scrapedData.gofileLink && !scrapedData.torrentLink)) {
          skippedGames.push(item.title);
          continue;
        }

        const gameTitle = scrapedData.title || item.title;

        // Double check exact title
        const { rows: checkExact } = await pool.query('SELECT id FROM games WHERE LOWER(name) = LOWER($1) LIMIT 1', [gameTitle]);
        if (checkExact.length > 0) {
          skippedGames.push(gameTitle);
          continue;
        }

        const gameObj = {
          name: gameTitle,
          game_version: scrapedData.game_version || 'v1.0',
          release_year: scrapedData.releaseYear || new Date().getFullYear(),
          developer_publisher: scrapedData.developer || 'Unknown',
          category: scrapedData.category || 'Action',
          cover_image: scrapedData.coverImage || item.image || '',
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

        // Insert into database with status = 'archived'
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

        savedGames.push({ id: inserted[0].id, ...gameObj });
        existingNames.add(gameTitle.toLowerCase().trim());
      } catch (err) {
        console.error(`Error auto scraping ${item.title}:`, err);
        skippedGames.push(item.title);
      }
    }

    return NextResponse.json({
      success: true,
      savedCount: savedGames.length,
      skippedCount: skippedGames.length,
      message: `🎉 Bulk Auto-Scrape Complete! Scraped & Saved ${savedGames.length} new games directly to Archive Box. (${skippedGames.length} duplicates/invalid skipped).`,
      savedGames
    });

  } catch (error) {
    console.error('Catalog Fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch catalog. ' + error.message }, { status: 500 });
  }
}
