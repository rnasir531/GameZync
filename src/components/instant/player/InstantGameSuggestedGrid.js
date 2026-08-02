'use client';

import { useState } from 'react';
import GameCard from '@/components/common/GameCard';

export default function InstantGameSuggestedGrid({ activeGame, allGames, onSelectSuggested }) {
  const [suggestedGames, setSuggestedGames] = useState(() => {
    const candidates = allGames.filter(g => String(g.id) !== String(activeGame.id));
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  });

  const handleShuffle = () => {
    const candidates = allGames.filter(g => String(g.id) !== String(activeGame.id));
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    setSuggestedGames(shuffled.slice(0, 10));
  };

  if (suggestedGames.length === 0) return null;

  return (
    <div className="suggested-instant-games-section" style={{ padding: '24px', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-fire text-danger"></i>
          Suggested Instant Games
        </h3>
        <button
          onClick={handleShuffle}
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-color)', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <i className="fa-solid fa-shuffle"></i> Shuffle Suggestions
        </button>
      </div>

      <div className="suggested-grid-responsive">
        {suggestedGames.map(sGame => (
          <div key={sGame.id} onClick={() => onSelectSuggested(sGame)} style={{ cursor: 'pointer', minWidth: 0 }}>
            <GameCard 
              game={sGame} 
              isInstantSection={true} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
