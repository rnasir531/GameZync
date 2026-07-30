/**
 * config/site.js
 * ─────────────────────────────────────────────────────────────
 * All site-wide constants in one place.
 * To rebrand or move to a new domain, edit only this file.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE_NAME = "Gamer's Cafe";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://game-zync.vercel.app';
export const SITE_DESCRIPTION = "Download and play free PC games instantly. Browse thousands of titles across all genres.";
export const SITE_KEYWORDS = "free pc games, download games, pc game download, free games 2024, gamers cafe";

export const OG_IMAGE_URL = `${SITE_URL}/opengraph-image.jpg`;
export const TWITTER_HANDLE = '@GameZync';

export const DEFAULT_COVER_FALLBACK = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop';
