/**
 * config/constants.js
 * ─────────────────────────────────────────────────────────────
 * App-wide magic numbers and string constants.
 * Change pagination, limits, cache durations — all in one place.
 * ─────────────────────────────────────────────────────────────
 */

// Pagination
export const GAMES_PER_PAGE         = 20;
export const INSTANT_GAMES_PER_PAGE = 20;
export const ADMIN_ITEMS_PER_PAGE   = 20;

// Search
export const SEARCH_GAMES_LIMIT   = 5;
export const SEARCH_INSTANT_LIMIT = 3;
export const SEARCH_UPCOMING_LIMIT = 3;
export const SEARCH_TOTAL_LIMIT   = 8;

// Suggestions / Recommendations
export const SUGGESTED_GAMES_LIMIT  = 5;
export const INSTANT_SUGGESTIONS_COUNT = 10;

// Cache
export const SETTINGS_CACHE_TTL_MS = 60 * 1000; // 60 seconds

// Spam Protection
export const REPORT_COOLDOWN_INTERVAL = '1 day';

// Statuses
export const STATUS_PUBLISHED = 'published';
export const STATUS_UNREAD    = 'unread';
export const STATUS_PENDING   = 'pending';
