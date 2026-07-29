'use client';
import React from 'react';

export default function GameHeader({ game }) {
  const imageSrc = game.cover_image || `/uploads/games/${game.id}/cover.jpg`;

  return (
    <div className="game-details-banner" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="banner-img-wrap" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, height: '100%', width: '100%' }}>
        <img 
          src={imageSrc} 
          alt={game.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x500/1a1d25/555?text=No+Banner'; }} 
        />
      </div>
      <div className="banner-overlay-gradient" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, background: 'linear-gradient(to top, var(--bg-color) 0%, transparent 60%, transparent 100%)', pointerEvents: 'none' }}></div>
      
      {/* Featured Badge - Top Left */}
      {game.is_featured === 1 && (
        <span 
          className="details-badge-el" 
          style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
        >
          Featured
        </span>
      )}

      <div className="banner-info-content" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '36px', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1 className="details-main-title">{game.name}</h1>
        {game.category && <p className="details-main-category">{game.category}</p>}
      </div>
    </div>
  );
}
