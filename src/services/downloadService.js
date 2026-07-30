/**
 * services/downloadService.js
 * ─────────────────────────────────────────────────────────────
 * Secure download link verification logic.
 * ─────────────────────────────────────────────────────────────
 */

import crypto from 'crypto';
import { DOWNLOAD_SECRET, DOWNLOAD_MIN_WAIT_MS, DOWNLOAD_MAX_AGE_MS } from '@/config/database';
import { getDownloadLinks, trackDownload } from './gameService';

/**
 * Generate a secure HMAC token for a download session.
 */
export function generateDownloadToken(id, type, timestamp) {
  return crypto
    .createHmac('sha256', DOWNLOAD_SECRET)
    .update(`${id}:${type}:${timestamp}`)
    .digest('hex');
}

/**
 * Verify a download request and return the URL if valid.
 * @returns {{ url: string } | { error: string, status: number }}
 */
export async function verifyAndGetDownloadUrl({ id, type, timestamp, token }) {
  if (!id || !type || !timestamp || !token) {
    return { error: 'Missing parameters', status: 400 };
  }

  const expectedToken = generateDownloadToken(id, type, timestamp);
  if (token !== expectedToken) {
    return { error: 'Invalid or tampered secure token', status: 403 };
  }

  const elapsed = Date.now() - parseInt(timestamp, 10);
  if (elapsed < DOWNLOAD_MIN_WAIT_MS) {
    return { error: 'Please wait the full 15 seconds before requesting the link.', status: 403 };
  }
  if (elapsed > DOWNLOAD_MAX_AGE_MS) {
    return { error: 'Download session expired. Please refresh the page and wait again.', status: 403 };
  }

  const game = await getDownloadLinks(parseInt(id));
  if (!game) return { error: 'Game not found in database', status: 404 };

  const url = type === 'torrent' ? game.torrent_link : game.direct_download_link;
  if (!url) return { error: 'Download link is not available for this type.', status: 404 };

  trackDownload(parseInt(id));

  return { url };
}
