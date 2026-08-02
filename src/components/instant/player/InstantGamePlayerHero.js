'use client';

import { useState, useRef } from 'react';

export default function InstantGamePlayerHero({ activeGame }) {
  const iframeRef = useRef(null);
  const [isLoadingFrame, setIsLoadingFrame] = useState(true);

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      iframeRef.current.requestFullscreen().catch(() => {});
    }
  };

  const playUrl = activeGame?.embed_url || activeGame?.url || '';

  return (
    <div className="instant-player-hero" style={{ marginBottom: '30px', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.4)' }}>
      <div className="player-header" style={{ padding: '18px 24px', background: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div className="player-title-box" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '-0.3px' }}>
            <i className="fa-solid fa-gamepad" style={{ color: 'var(--primary-color)' }}></i>
            {activeGame.name || activeGame.title}
          </h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            {activeGame.category && activeGame.category.split(',').map((cat, idx) => (
              <span key={idx} style={{ background: 'rgba(16, 185, 129, 0.12)', color: 'var(--primary-color)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '20px', padding: '4px 14px', fontSize: '12px', fontWeight: '700' }}>
                {cat.trim()}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={toggleFullscreen} 
          className="player-btn fullscreen-btn"
          style={{ background: 'var(--primary-gradient)', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
        >
          <i className="fa-solid fa-expand"></i> Fullscreen
        </button>
      </div>

      {/* IFRAME WRAPPER WITH LOADING SPINNER OVERLAY */}
      <div className="player-iframe-wrapper" ref={iframeRef} style={{ position: 'relative', width: '100%', aspectRatio: '16/9', minHeight: '320px', maxHeight: '80vh', background: '#090d16' }}>
        {isLoadingFrame && (
          <div style={{ position: 'absolute', inset: 0, background: '#090d16', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', zIndex: 10 }}>
            <div style={{ width: '48px', height: '48px', border: '4px solid rgba(16,185,129,0.2)', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <span style={{ color: '#cbd5e1', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>
              <i className="fa-solid fa-gamepad me-2 text-emerald-400"></i> Loading Game Canvas...
            </span>
          </div>
        )}
        <iframe
          src={playUrl}
          title={activeGame.name || activeGame.title}
          allow="autoplay; fullscreen; microphone; camera; midi; encrypted-media; floor-pointer; geolocation; gyroscope; accelerometer"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoadingFrame(false)}
          style={{ width: '100%', height: '100%', border: 'none', minHeight: '320px' }}
        />
      </div>

      {activeGame.description && (
        <div style={{ padding: '18px 24px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
          <p style={{ margin: 0 }}>{activeGame.description}</p>
        </div>
      )}
    </div>
  );
}
