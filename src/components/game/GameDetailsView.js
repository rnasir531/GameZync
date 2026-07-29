'use client';
import dynamic from 'next/dynamic';
import GameHeroMediaGallery from './GameHeroMediaGallery';
import GameRequirements from './GameRequirements';
import DownloadSection from './DownloadSection';

const GameTrailerSection = dynamic(() => import('./GameTrailerSection'), { loading: () => <div className="p-3 text-center text-muted">Loading Trailer...</div> });
const SuggestedGamesSection = dynamic(() => import('./SuggestedGamesSection'), { loading: () => <div className="p-3 text-center text-muted">Loading Recommendations...</div> });

export default function GameDetailsView({ game, suggestedGames }) {
  return (
    <section className="game-details-section" style={{ paddingBottom: '20px' }}>
      {/* 1. Header Info Bar & Split Media Gallery */}
      <GameHeroMediaGallery game={game} />
      
      {/* 2. FULL WIDTH: ABOUT THE GAME SECTION */}
      {game.description && (
        <div className="details-info-card full-width-info-card" style={{ marginBottom: '24px' }}>
          <h2 className="details-card-title"><i className="fa-solid fa-circle-info"></i> About the Game</h2>
          <div className="details-desc-paragraph" dangerouslySetInnerHTML={{ __html: game.description }} />
        </div>
      )}
      
      {/* 3. FULL WIDTH: OFFICIAL YOUTUBE TRAILER SECTION */}
      {game.trailer_url && (
        <GameTrailerSection trailerUrl={game.trailer_url} gameName={game.name} />
      )}

      {/* 4. FULL WIDTH: SYSTEM REQUIREMENTS ROW */}
      <div className="full-width-info-card" style={{ marginBottom: '32px' }}>
        <GameRequirements game={game} />
      </div>

      {/* 5. CENTERED: DOWNLOAD BUTTONS & LINKS */}
      <div className="centered-download-container" style={{ marginBottom: '48px', paddingBottom: '20px' }}>
        <DownloadSection game={game} />
      </div>
      
      {/* 6. SUGGESTED GAMES GRID */}
      <SuggestedGamesSection suggestedGames={suggestedGames} />
    </section>
  );
}
