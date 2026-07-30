/**
 * services/gameService.js
 * ─────────────────────────────────────────────────────────────
 * All business logic related to standard PC games.
 * API routes & pages call this — never the DB directly.
 * ─────────────────────────────────────────────────────────────
 */

import {
  getGameById,
  getAllPublishedGames,
  getRandomGame as dbGetRandomGame,
  getSuggestedGames as dbGetSuggestedGames,
  incrementGameViews,
  incrementGameDownloads,
  getGameDownloadLinks,
} from '@/lib/db/queries';
import { query } from '@/lib/db';
import { slugify } from '@/lib/slug';
import { getCategoryData } from '@/lib/categoryData';

/**
 * Resolve a game from a URL param that could be:
 *  - numeric ID ("485")
 *  - pure slug ("ghost-of-tsushima")
 *  - old id-slug format ("485-ghost-of-tsushima") [backwards compat]
 */
export async function fetchGameByParam(paramId) {
  const cleanParam = decodeURIComponent(paramId).toLowerCase().trim();
  const numericId = parseInt(paramId, 10);

  // Fast path: exact numeric ID
  if (!isNaN(numericId) && String(numericId) === paramId) {
    const { rows } = await getGameById(numericId);
    if (rows[0]) return rows[0];
  }

  // Slug match fallback
  const { rows: allGames } = await getAllPublishedGames();
  return allGames.find((g) => {
    const s = slugify(g.name);
    return (
      s === cleanParam ||
      String(g.id) === cleanParam ||
      `${g.id}-${s}` === cleanParam
    );
  });
}

/**
 * Get a random published game, optionally excluding one ID.
 */
export async function getRandomGame(excludeId) {
  const parsedExclude = excludeId ? parseInt(excludeId, 10) : null;
  const validExclude = !isNaN(parsedExclude) ? parsedExclude : null;

  const { rows } = await dbGetRandomGame(validExclude);

  if (!rows || rows.length === 0) {
    // Fallback: any random game
    const { rows: fallback } = await dbGetRandomGame(null);
    if (!fallback || fallback.length === 0) return null;
    return fallback[0];
  }
  return rows[0];
}

/**
 * Get suggested games for a game detail page.
 */
export async function getSuggestedGames(gameId) {
  const { rows } = await dbGetSuggestedGames(gameId);
  return rows.map((g) => ({ ...g, img: g.cover_image }));
}

/**
 * Build enriched game data with category list for the detail view.
 */
export async function getEnrichedGame(game) {
  let catDbMap = {};
  try {
    const { rows: dbCats } = await query(`SELECT * FROM categories`);
    dbCats.forEach((c) => {
      if (c.name) catDbMap[c.name.trim().toLowerCase()] = c.icon || c.icon_class;
    });
  } catch (_) {}

  const categoryNames = game.category
    ? game.category.split(',').map((c) => c.trim()).filter(Boolean)
    : [];

  const categoryList = categoryNames.map((name) => {
    const dbIcon = catDbMap[name.toLowerCase()];
    const defaultData = getCategoryData(name);
    return { name, icon_class: dbIcon || defaultData.icon || 'fa-solid fa-tags' };
  });

  return { ...game, categoryList };
}

/**
 * Fire-and-forget view counter increment.
 */
export function trackView(gameId) {
  incrementGameViews(gameId).catch(() => {});
}

/**
 * Fire-and-forget download counter increment.
 */
export function trackDownload(gameId) {
  incrementGameDownloads(gameId).catch(() => {});
}

/**
 * Get download links for a game.
 */
export async function getDownloadLinks(gameId) {
  const { rows } = await getGameDownloadLinks(gameId);
  return rows[0] || null;
}
