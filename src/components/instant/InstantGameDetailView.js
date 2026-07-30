'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import GameCard from '../common/GameCard';
import { useRouter } from 'next/navigation';

export default function InstantGameDetailView({ activeGame, allGames }) {
  const router = useRouter();
  const iframeRef = useRef(null);
  const [isLoadingFrame, setIsLoadingFrame] = useState(true);

  // Generate 10 random suggested games excluding current game
  const [suggestedGames, setSuggestedGames] = useState(() => {
    const candidates = allGames.filter(g => String(g.id) !== String(activeGame.id));
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  });

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      iframeRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleSelectSuggested = (game) => {
    router.push(`/instant/${game.id}`);
  };

  const playUrl = activeGame?.embed_url || activeGame?.url || '';

  return (
    <section className="instant-game-detail-container" style={{ animation: 'fadeInUp 0.5s ease', maxWidth: '1280px', margin: '0 auto', padding: '20px 15px' }}>
      
      {/* Back Button */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/instant"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--text-color)', padding: '10px 18px', borderRadius: '12px',
            fontSize: '13.5px', fontWeight: '700', textDecoration: 'none', transition: 'all 0.2s'
          }}
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Instant Games
        </Link>
      </div>

      {/* GAME PLAYER WINDOW HERO */}
      <div className="instant-player-hero" style={{ marginBottom: '30px', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.4)' }}>
        <div className="player-header" style={{ padding: '20px 24px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className="player-title-box" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-gamepad" style={{ color: 'var(--primary-color)' }}></i>
              {activeGame.name || activeGame.title}
            </h2>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              {activeGame.category && (
                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary-color)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '20px', padding: '4px 14px', fontSize: '12px', fontWeight: '700' }}>
                  {activeGame.category}
                </span>
              )}
              {activeGame.source && (
                <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', padding: '4px 14px', fontSize: '12px', fontWeight: '700' }}>
                  <i className="fa-solid fa-globe me-1"></i> {activeGame.source}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {playUrl && (
              <a
                href={playUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '10px 18px', borderRadius: '10px', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i> Open Direct
              </a>
            )}
            <button 
              onClick={toggleFullscreen} 
              className="player-btn fullscreen-btn"
              style={{ background: 'var(--primary-gradient)', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
            >
              <i className="fa-solid fa-expand"></i> Fullscreen
            </button>
          </div>
        </div>

        {/* IFRAME WRAPPER WITH LOADING SPINNER OVERLAY */}
        <div className="player-iframe-wrapper" ref={iframeRef} style={{ position: 'relative', width: '100%', aspectRatio: '16/9', minHeight: '520px', background: '#090d16' }}>
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
            style={{ width: '100%', height: '100%', border: 'none', minHeight: '520px' }}
          />
        </div>

        {activeGame.description && (
          <div style={{ padding: '18px 24px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
            <p style={{ margin: 0 }}>{activeGame.description}</p>
          </div>
        )}
      </div>

      {/* 2 ROWS OF SUGGESTED INSTANT GAMES ONLY */}
      {suggestedGames.length > 0 && (
        <div className="suggested-instant-games-section" style={{ padding: '28px', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-fire text-danger"></i>
              Suggested Instant Games
            </h3>
            <button
              onClick={() => {
                const candidates = allGames.filter(g => String(g.id) !== String(activeGame.id));
                const shuffled = [...candidates].sort(() => 0.5 - Math.random());
                setSuggestedGames(shuffled.slice(0, 10));
              }}
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-color)', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <i className="fa-solid fa-shuffle"></i> Shuffle Suggestions
            </button>
          </div>

          {/* 2 Rows Grid (10 Games) */}
          <div className="games-grid view-cards-active instant-games-grid-mobile">
            {suggestedGames.map(sGame => (
              <div key={sGame.id} onClick={() => handleSelectSuggested(sGame)} style={{ cursor: 'pointer' }}>
                <GameCard 
                  game={sGame} 
                  isInstantSection={true} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
