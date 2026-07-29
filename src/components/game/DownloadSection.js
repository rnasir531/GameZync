import React from 'react';
import Link from 'next/link';
import ReportLinkButton from './ReportLinkButton';

export default function DownloadSection({ game }) {
  if (!game.direct_download_link && !game.torrent_link) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {game.direct_download_link && (
        <Link href={`/download/${game.id}?type=direct`} className="huge-download-btn" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <i className="fa-solid fa-cloud-arrow-down"></i> Direct Download
        </Link>
      )}
      
      {game.torrent_link && (
        <Link href={`/download/${game.id}?type=torrent`} className="huge-download-btn" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', background: 'var(--primary-color)' }}>
          <i className="fa-solid fa-magnet"></i> Torrent Download
        </Link>
      )}
      
      <ReportLinkButton gameId={game.id} />
    </div>
  );
}
