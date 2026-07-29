'use client';
import React, { useState, useEffect } from 'react';
import GameCard from '../common/GameCard';

export default function SuggestedGamesSection({ suggestedGames }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  if (!suggestedGames || suggestedGames.length === 0) return null;

  // Mobile view: 4 cards (2x2 grid) | Laptop / Desktop view: 5 cards (5-column grid)
  const gamesToDisplay = isMobile ? suggestedGames.slice(0, 4) : suggestedGames.slice(0, 5);

  return (
    <div className="suggested-games-section" style={{ marginTop: '28px', marginBottom: '0px' }}>
      <h2 className="suggested-title" style={{ marginBottom: '20px', fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: '800' }}>
        <i className="fa-solid fa-layer-group" style={{ color: 'var(--primary-color)' }}></i> More Games You Might Like
      </h2>
      <div className="games-grid-5-col">
        {gamesToDisplay.map(sg => (
          <GameCard key={sg.id} game={sg} />
        ))}
      </div>
    </div>
  );
}
