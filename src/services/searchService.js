/**
 * services/searchService.js
 * ─────────────────────────────────────────────────────────────
 * Search business logic across games, instant games & upcoming.
 * ─────────────────────────────────────────────────────────────
 */

import {
  searchGames,
  searchInstantGames,
  searchUpcomingGames,
} from '@/lib/db/queries';
import { getGameUrl, getInstantGameUrl } from '@/lib/slug';
import { SEARCH_TOTAL_LIMIT } from '@/config/constants';

/**
 * Unified search across all game types.
 * @param {string} searchTerm
 * @returns {Promise<Array>}
 */
export async function searchAll(searchTerm) {
  const [gamesResult, instantResult, upcomingResult] = await Promise.all([
    searchGames(searchTerm),
    searchInstantGames(searchTerm),
    searchUpcomingGames(searchTerm),
  ]);

  const formattedGames = (gamesResult.rows || []).map((g) => ({
    id: g.id,
    title: g.title,
    image: g.cover_image,
    type: 'game',
    url: getGameUrl({ id: g.id, name: g.title }),
  }));

  const formattedInstant = (instantResult.rows || []).map((i) => ({
    id: i.id,
    title: i.title,
    image: i.image_url,
    type: 'instant',
    url: getInstantGameUrl({ id: i.id, title: i.title }),
  }));

  const formattedUpcoming = (upcomingResult.rows || []).map((u) => ({
    id: u.id,
    title: u.title,
    image: u.cover_image,
    type: 'upcoming',
    url: `/upcoming-games`,
  }));

  return [...formattedGames, ...formattedInstant, ...formattedUpcoming].slice(
    0,
    SEARCH_TOTAL_LIMIT
  );
}
