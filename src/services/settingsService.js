/**
 * services/settingsService.js
 * ─────────────────────────────────────────────────────────────
 * Site settings with in-memory caching.
 * Replaces lib/getSettings.js — import from here going forward.
 * ─────────────────────────────────────────────────────────────
 */

import { getSiteSettings } from '@/lib/db/queries';
import { SETTINGS_CACHE_TTL_MS } from '@/config/constants';

let cachedSettings = null;
let lastCacheTime = 0;

/**
 * Get all site settings, with TTL-based in-memory cache.
 */
export async function getSettings() {
  const now = Date.now();
  if (cachedSettings && now - lastCacheTime < SETTINGS_CACHE_TTL_MS) {
    return cachedSettings;
  }

  try {
    const { rows } = await getSiteSettings();
    const settings = rows.reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});
    cachedSettings = settings;
    lastCacheTime = now;
    return settings;
  } catch (e) {
    console.error('[Settings] Fetch error:', e);
    return cachedSettings || {};
  }
}

/**
 * Filter settings to only publicly-safe keys.
 */
export function getPublicSettings(allSettings) {
  const publicSettings = {};
  Object.keys(allSettings).forEach((key) => {
    if (
      key.startsWith('social_') ||
      key.startsWith('appearance_') ||
      key.startsWith('seo_') ||
      key === 'site_name' ||
      key === 'site_description' ||
      key === 'contact_email' ||
      key === 'ad_header' ||
      key === 'ad_footer'
    ) {
      publicSettings[key] = allSettings[key];
    }
  });
  return publicSettings;
}

/**
 * Invalidate the settings cache (call after admin updates settings).
 */
export function invalidateSettingsCache() {
  cachedSettings = null;
  lastCacheTime = 0;
}
