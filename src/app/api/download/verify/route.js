import { NextResponse } from 'next/server';
import crypto from 'crypto';
import db from '@/lib/db';

const SECRET = process.env.DOWNLOAD_SECRET || 'playfusion-secure-download-secret-2026';

export async function POST(request) {
  try {
    const { id, type, timestamp, token } = await request.json();

    if (!id || !type || !timestamp || !token) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Verify token
    const message = `${id}:${type}:${timestamp}`;
    const expectedToken = crypto.createHmac('sha256', SECRET).update(message).digest('hex');

    if (token !== expectedToken) {
      return NextResponse.json({ error: 'Invalid or tampered secure token' }, { status: 403 });
    }

    // Verify time elapsed (allow at least 13 seconds to account for network delays for a 15s timer)
    const elapsed = Date.now() - parseInt(timestamp, 10);
    if (elapsed < 13000) {
      return NextResponse.json({ error: 'Please wait the full 15 seconds before requesting the link.' }, { status: 403 });
    }

    // If it's too old (e.g. > 2 hours), reject it to prevent reusing links forever
    if (elapsed > 7200000) {
      return NextResponse.json({ error: 'Download session expired. Please refresh the page and wait again.' }, { status: 403 });
    }

    // Fetch the actual URL
    const { rows } = await db.query('SELECT direct_download_link, torrent_link FROM games WHERE id = $1', [parseInt(id)]);
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Game not found in database' }, { status: 404 });
    }

    const game = rows[0];
    const url = type === 'torrent' ? game.torrent_link : game.direct_download_link;

    if (!url) {
      return NextResponse.json({ error: 'Download link is not available for this type.' }, { status: 404 });
    }

    // Update download count statistics asynchronously
    db.query('UPDATE games SET downloads = downloads + 1 WHERE id = $1', [parseInt(id)]).catch(() => {});

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Download verification error:', error);
    return NextResponse.json({ error: 'Internal server error while verifying download.' }, { status: 500 });
  }
}
