import pool from '@/lib/db';

let cachedSettings = null;
let lastCacheTime = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds

export async function getCachedSettings() {
  const now = Date.now();
  if (cachedSettings && (now - lastCacheTime < CACHE_TTL)) {
    return cachedSettings;
  }

  try {
    const { rows } = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    const settings = rows.reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});
    cachedSettings = settings;
    lastCacheTime = now;
    return settings;
  } catch (e) {
    console.error('Error fetching settings cache:', e);
    return cachedSettings || {};
  }
}

export function invalidateSettingsCache() {
  cachedSettings = null;
  lastCacheTime = 0;
}
