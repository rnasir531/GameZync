/**
 * lib/getSettings.js
 * ─────────────────────────────────────────────────────────────
 * Backwards-compatibility re-export.
 * New code should import from '@/services/settingsService' directly.
 * ─────────────────────────────────────────────────────────────
 */
export { getSettings as getCachedSettings, invalidateSettingsCache } from '@/services/settingsService';
