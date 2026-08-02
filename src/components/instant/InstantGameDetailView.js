'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getInstantGameUrl } from '@/lib/slug';
import InstantGamePlayerHero from './player/InstantGamePlayerHero';
import InstantGameSuggestedGrid from './player/InstantGameSuggestedGrid';

export default function InstantGameDetailView({ activeGame, allGames }) {
  const router = useRouter();

  const handleSelectSuggested = (game) => {
    router.push(getInstantGameUrl(game));
  };

  return (
    <section className="instant-game-detail-container" style={{ animation: 'fadeInUp 0.5s ease', maxWidth: '1280px', margin: '0 auto', padding: '20px 15px' }}>
      <style>{`
        .suggested-grid-responsive {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 1200px) {
          .suggested-grid-responsive {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 900px) {
          .suggested-grid-responsive {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .suggested-grid-responsive {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .player-header {
            padding: 14px 16px !important;
          }
          .player-header h2 {
            font-size: 17px !important;
          }
          .suggested-instant-games-section {
            padding: 16px !important;
          }
        }
      `}</style>

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

      {/* Modular Player Hero (Iframe + Controls) */}
      <InstantGamePlayerHero activeGame={activeGame} />

      {/* Modular Suggested Instant Games Grid */}
      <InstantGameSuggestedGrid 
        activeGame={activeGame} 
        allGames={allGames} 
        onSelectSuggested={handleSelectSuggested} 
      />
    </section>
  );
}
