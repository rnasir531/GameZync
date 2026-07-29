import { NextResponse } from 'next/server';
import crypto from 'crypto';
import db from '@/lib/db';

const SECRET = process.env.DOWNLOAD_SECRET || 'playfusion-secure-download-secret-2026';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    const timestamp = searchParams.get('timestamp');
    const token = searchParams.get('token');
    const action = searchParams.get('action');

    // Handle inline increment fire-and-forget
    if (action === 'incrementOnly' && id) {
      db.query('UPDATE games SET downloads = downloads + 1 WHERE id = $1', [parseInt(id)]).catch(() => {});
      return NextResponse.json({ success: true });
    }

    if (!id || !type || !timestamp || !token) {
      return new NextResponse('Missing parameters', { status: 400 });
    }

    // Verify token
    const message = `${id}:${type}:${timestamp}`;
    const expectedToken = crypto.createHmac('sha256', SECRET).update(message).digest('hex');

    if (token !== expectedToken) {
      return new NextResponse('Invalid or tampered secure token', { status: 403 });
    }

    // Verify time elapsed
    const elapsed = Date.now() - parseInt(timestamp, 10);
    if (elapsed < 13000) {
      return new NextResponse('Please wait the full 15 seconds.', { status: 403 });
    }
    if (elapsed > 7200000) {
      return new NextResponse('Download session expired.', { status: 403 });
    }

    // Fetch the actual URL
    const { rows } = await db.query('SELECT name, direct_download_link, torrent_link FROM games WHERE id = $1', [parseInt(id)]);
    
    if (rows.length === 0) {
      return new NextResponse('Game not found in database', { status: 404 });
    }

    const game = rows[0];
    const url = type === 'torrent' ? game.torrent_link : game.direct_download_link;

    if (!url) {
      return new NextResponse('Download link is not available.', { status: 404 });
    }

    // Update download count statistics asynchronously
    db.query('UPDATE games SET downloads = downloads + 1 WHERE id = $1', [parseInt(id)]).catch(() => {});

    // Redirect to the actual download link securely
    // This ensures the user must go through our 30s timer and token check
    return NextResponse.redirect(url);

  } catch (error) {
    console.error('Proxy download error:', error);
    return new NextResponse('Internal server error during file proxy.', { status: 500 });
  }
}
