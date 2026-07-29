import { notFound } from 'next/navigation';
import crypto from 'crypto';
import db from '@/lib/db';
import DownloadTimerClient from '@/components/download/DownloadTimerClient';

const SECRET = process.env.DOWNLOAD_SECRET || 'playfusion-secure-download-secret-2026';

export async function generateMetadata({ params }) {
  const p = await params;
  const { rows } = await db.query(`SELECT name FROM games WHERE id = $1 LIMIT 1`, [parseInt(p.id)]);
  if (!rows[0]) return { title: 'Download Not Found' };
  return {
    title: `Download ${rows[0].name} - NS Games`,
  };
}

export default async function DownloadWaitPage({ params, searchParams }) {
  const p = await params;
  const s = await searchParams;
  const gameId = parseInt(p.id);
  const type = s.type || 'direct'; // 'direct' or 'torrent'

  const { rows } = await db.query(`
    SELECT id, name, cover_image, direct_download_link, torrent_link 
    FROM games 
    WHERE id = $1 LIMIT 1
  `, [gameId]);

  const game = rows[0];
  if (!game) notFound();

  // Validate if the requested download type actually exists
  if (type === 'torrent' && !game.torrent_link) notFound();
  if (type === 'direct' && !game.direct_download_link) notFound();

  // Generate secure token
  const timestamp = Date.now().toString();
  const message = `${gameId}:${type}:${timestamp}`;
  const token = crypto.createHmac('sha256', SECRET).update(message).digest('hex');

  // We do NOT send the actual download link to the client.
  const publicGameData = {
    id: game.id,
    name: game.name,
    cover_image: game.cover_image
  };

  return (
    <section className="download-wait-section premium-spacing" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <DownloadTimerClient 
        game={publicGameData} 
        type={type} 
        timestamp={timestamp} 
        token={token} 
      />
    </section>
  );
}
