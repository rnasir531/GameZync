'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fireConfetti } from '@/components/ui/ConfettiTrigger';

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
    const proxyUrl = `/api/download/proxy?id=${game.id}&type=${type}&timestamp=${timestamp}&token=${token}`;
    
    setTimeout(() => {
      setDownloadUrl(proxyUrl);
      setIsLoading(false);
      try {
        fireConfetti();
      } catch (e) {}
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

          {/* Alternative Link & Report Dead Link Actions */}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link 
                href={`/download/${game.id}?type=${type === 'torrent' ? 'direct' : 'torrent'}`}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
              >
                <i className={`fa-solid ${type === 'torrent' ? 'fa-bolt' : 'fa-magnet'}`}></i> Switch to {type === 'torrent' ? 'Direct' : 'Torrent'} Download
              </Link>
              
              <button
                type="button"
                onClick={async (e) => {
                  try {
                    e.currentTarget.disabled = true;
                    e.currentTarget.innerText = 'Reporting...';
                    const res = await fetch('/api/reports', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ game_id: game.id })
                    });
                    const data = await res.json();
                    if (res.ok) {
                      alert('🚩 Report submitted! Admin has been notified to re-upload / fix this game link.');
                    } else {
                      alert(data.error || 'Failed to submit report.');
                    }
                  } catch (err) {
                    alert('Could not submit report.');
                  }
                }}
                style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-flag"></i> Link Dead? Report to Admin
              </button>
            </div>
          </div>
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
