/**
 * lib/db/queries.js
 * ─────────────────────────────────────────────────────────────
 * Named, reusable SQL query functions.
 * Services import from here — keeping raw SQL in one place.
 * If you switch to an ORM (Prisma, Drizzle), replace this file.
 * ─────────────────────────────────────────────────────────────
 */

import { query } from './index';
import {
  STATUS_PUBLISHED,
  SUGGESTED_GAMES_LIMIT,
  INSTANT_SUGGESTIONS_COUNT,
  SEARCH_GAMES_LIMIT,
  SEARCH_INSTANT_LIMIT,
  SEARCH_UPCOMING_LIMIT,
} from '@/config/constants';

// ─── GAMES ──────────────────────────────────────────────────

export const getGameById = (id) =>
  query(
    `SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) AS category
     FROM games g
     LEFT JOIN game_categories gc ON g.id = gc.game_id
     LEFT JOIN categories c ON gc.category_id = c.id
     WHERE g.id = $1
     GROUP BY g.id`,
    [id]
  );

export const getAllPublishedGames = () =>
  query(
    `SELECT g.*, COALESCE(STRING_AGG(c.name, ', '), g.category) AS category
     FROM games g
     LEFT JOIN game_categories gc ON g.id = gc.game_id
     LEFT JOIN categories c ON gc.category_id = c.id
     GROUP BY g.id`
  );

export const getRandomGame = (excludeId) => {
  if (excludeId) {
    return query(
      `SELECT id, name FROM games WHERE status = $1 AND id != $2 ORDER BY RANDOM() LIMIT 1`,
      [STATUS_PUBLISHED, excludeId]
    );
  }
  return query(
    `SELECT id, name FROM games WHERE status = $1 ORDER BY RANDOM() LIMIT 1`,
    [STATUS_PUBLISHED]
  );
};

export const getSuggestedGames = (gameId) =>
  query(
    `SELECT id, name, cover_image, category, release_year
     FROM games
     WHERE id != $1 AND status = $2
     ORDER BY created_at DESC
     LIMIT ${SUGGESTED_GAMES_LIMIT}`,
    [gameId, STATUS_PUBLISHED]
  );

export const searchGames = (term) =>
  query(
    `SELECT id, name as title, cover_image, status
     FROM games
     WHERE name ILIKE $1 AND status = $2
     LIMIT ${SEARCH_GAMES_LIMIT}`,
    [`%${term}%`, STATUS_PUBLISHED]
  );

export const incrementGameViews = (id) =>
  query(`UPDATE games SET views = views + 1 WHERE id = $1`, [id]);

export const incrementGameDownloads = (id) =>
  query(`UPDATE games SET downloads = downloads + 1 WHERE id = $1`, [id]);

export const getGameDownloadLinks = (id) =>
  query(`SELECT direct_download_link, torrent_link FROM games WHERE id = $1`, [id]);

// ─── INSTANT GAMES ──────────────────────────────────────────

export const getAllInstantGames = () =>
  query(
    `SELECT i.*, COALESCE(STRING_AGG(c.name, ', '), i.category) as category
     FROM instant_games i
     LEFT JOIN instant_game_categories ic ON i.id = ic.game_id
     LEFT JOIN categories c ON ic.category_id = c.id
     GROUP BY i.id
     ORDER BY i.created_at DESC`
  );

export const searchInstantGames = (term) =>
  query(
    `SELECT id, title, image_url, embed_url
     FROM instant_games
     WHERE title ILIKE $1
     LIMIT ${SEARCH_INSTANT_LIMIT}`,
    [`%${term}%`]
  );

// ─── CATEGORIES ─────────────────────────────────────────────

export const getAllCategories = () =>
  query(`SELECT * FROM categories ORDER BY name ASC`);

export const getCategoryNamesByIds = async (ids) => {
  const names = [];
  for (const id of ids) {
    if (id) {
      const { rows } = await query(
        `SELECT name FROM categories WHERE id = $1 LIMIT 1`,
        [parseInt(id, 10)]
      );
      if (rows?.[0]) names.push(rows[0].name);
    }
  }
  return names;
};

// ─── SETTINGS ───────────────────────────────────────────────

export const getSiteSettings = () =>
  query(`SELECT setting_key, setting_value FROM site_settings`);

// ─── UPCOMING GAMES ─────────────────────────────────────────

export const searchUpcomingGames = (term) =>
  query(
    `SELECT id, title, cover_image
     FROM upcoming_games
     WHERE title ILIKE $1
     LIMIT ${SEARCH_UPCOMING_LIMIT}`,
    [`%${term}%`]
  );

// ─── USERS (Admin) ──────────────────────────────────────────

export const getAdminUserByUsername = (username) =>
  query(`SELECT * FROM admin_users WHERE username = $1 LIMIT 1`, [username]);

// ─── GAME MATCHER ────────────────────────────────────────────

export const getMatchingGames = (ram, storage, os) =>
  query(
    `SELECT * FROM games
     WHERE status = $1
       AND (ram IS NULL OR ram <= $2)
       AND (storage IS NULL OR storage <= $3)
       AND (os IS NULL OR os ILIKE $4)
     LIMIT 20`,
    [STATUS_PUBLISHED, ram, storage, `%${os.includes('Windows') ? 'Windows' : os}%`]
  );

// ─── REPORTS ─────────────────────────────────────────────────

export const checkExistingReport = (gameId, ip) =>
  query(
    `SELECT id FROM dead_link_reports
     WHERE game_id = $1 AND user_ip = $2 AND report_date > NOW() - INTERVAL '1 day'`,
    [gameId, ip]
  );

export const insertReport = (gameId, ip) =>
  query(
    `INSERT INTO dead_link_reports (game_id, user_ip, status) VALUES ($1, $2, 'pending')`,
    [gameId, ip]
  );

// ─── REQUESTS ────────────────────────────────────────────────

export const insertGameRequest = (gameName, email, detail) =>
  query(
    `INSERT INTO game_requests (game_name, email, detail, status)
     VALUES ($1, $2, $3, 'unread') RETURNING *`,
    [gameName, email, detail]
  );

export const getAllGameRequests = () =>
  query(`SELECT * FROM game_requests ORDER BY created_at DESC`);

// ─── MESSAGES ────────────────────────────────────────────────

export const insertContactMessage = (name, email, subject, message) =>
  query(
    `INSERT INTO contact_messages (name, email, subject, message, status)
     VALUES ($1, $2, $3, $4, 'unread') RETURNING *`,
    [name, email, subject || null, message]
  );

export const getAllContactMessages = () =>
  query(`SELECT * FROM contact_messages ORDER BY created_at DESC`);
