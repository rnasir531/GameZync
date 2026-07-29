'use client';
import React from 'react';
import GameCard from '../common/GameCard';

export default function SuggestedGamesSection({ suggestedGames }) {
  if (!suggestedGames || suggestedGames.length === 0) return null;

  const gamesToDisplay = suggestedGames.slice(0, 4);

  return (
    <div className="suggested-games-section" style={{ marginTop: '32px', marginBottom: '16px' }}>
      <h2 className="suggested-title" style={{ marginBottom: '20px', fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: '800' }}>
        <i className="fa-solid fa-layer-group"></i> More Games You Might Like
      </h2>
      <div className="games-grid">
        {gamesToDisplay.map(sg => (
          <GameCard key={sg.id} game={sg} />
        ))}
      </div>
    </div>
  );
}
