'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DownloadTimerClient({ game, type, timestamp, token }) {
  const [timeLeft, setTimeLeft] = useState(15);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !downloadUrl && !error && !isLoading) {
      fetchDownloadLink();
    }
  }, [timeLeft, downloadUrl, error, isLoading]);

  const fetchDownloadLink = () => {
    setIsLoading(true);
    // Instead of fetching the URL from the server and exposing it to the client,
    // we set the URL to our secure proxy endpoint. This implements the 'cURL method'
    // where the server fetches the file and streams it directly to the user.
    const proxyUrl = `/api/download/proxy?id=${game.id}&type=${type}&timestamp=${timestamp}&token=${token}`;
    
    // Slight delay to simulate generation and allow UI to transition smoothly
    setTimeout(() => {
      setDownloadUrl(proxyUrl);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="download-timer-card details-info-card" style={{ maxWidth: '600px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      
      <div style={{ width: '100%', maxWidth: '200px', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--component-shadow)' }}>
        <img onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }} src={game.cover_image} alt={game.name} style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} />
      </div>
      
      <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>{game.name}</h2>
      <p style={{ color: 'var(--text-muted)', margin: 0 }}>
        {type === 'torrent' ? 'Torrent Download' : 'Direct Download'}
      </p>

      {error ? (
        <div style={{ background: 'rgba(255, 23, 68, 0.1)', color: 'var(--danger-color)', padding: '16px', borderRadius: '8px', width: '100%', border: '1px solid rgba(255, 23, 68, 0.2)' }}>
          <i className="fa-solid fa-circle-exclamation"></i> {error}
          <div style={{ marginTop: '12px' }}>
            <button className="back-btn" onClick={() => window.location.reload()} style={{ padding: '8px 16px', background: 'var(--danger-color)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Retry
            </button>
          </div>
        </div>
      ) : downloadUrl ? (
        <div style={{ width: '100%', animation: 'fadeInUp 0.4s ease' }}>
          <div style={{ background: 'rgba(0, 200, 83, 0.1)', color: 'var(--success-color)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: 'bold' }}>
            <i className="fa-solid fa-circle-check"></i> Link Generated Successfully!
          </div>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="huge-download-btn" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', animation: 'pulse 2s infinite' }}>
            <i className="fa-solid fa-download"></i> Click Here to Download
          </a>
        </div>
      ) : (
        <div style={{ width: '100%' }}>
          <div style={{ fontSize: '48px', fontWeight: '900', color: 'var(--primary-color)', marginBottom: '10px' }}>
            {timeLeft}
          </div>
          <p style={{ color: 'var(--text-muted)' }}>
            Please wait while your secure download link is being generated...
          </p>
          <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden', marginTop: '16px' }}>
            <div style={{ 
              height: '100%', 
              background: 'var(--accent-gradient)', 
              width: `${((15 - timeLeft) / 15) * 100}%`,
              transition: 'width 1s linear'
            }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
