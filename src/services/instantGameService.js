/**
 * services/instantGameService.js
 * ─────────────────────────────────────────────────────────────
 * Business logic for instant (browser-playable) games.
 * ─────────────────────────────────────────────────────────────
 */

import { getAllInstantGames } from '@/lib/db/queries';
import { slugify } from '@/lib/slug';

/**
 * Fetch all instant games, normalized for frontend use.
 */
export async function fetchAllInstantGames() {
  const { rows } = await getAllInstantGames();
  return rows.map((g) => ({
    ...g,
    isInstant: true,
    url: g.embed_url,
    img: g.image_url,
    name: g.title,
  }));
}

/**
 * Resolve an instant game from a URL param.
 * Supports numeric ID, pure slug, and old id-slug format.
 */
export async function fetchInstantGameByParam(paramId) {
  const allGames = await fetchAllInstantGames();
  const cleanParam = decodeURIComponent(paramId).toLowerCase().trim();
  const numericId = parseInt(paramId, 10);

  // Fast path: exact numeric ID
  if (!isNaN(numericId) && String(numericId) === paramId) {
    const found = allGames.find((g) => Number(g.id) === numericId);
    if (found) return found;
  }

  // Slug match fallback
  return allGames.find((g) => {
    const s = slugify(g.title);
    return (
      s === cleanParam ||
      String(g.id) === cleanParam ||
      `${g.id}-${s}` === cleanParam
    );
  });
}
