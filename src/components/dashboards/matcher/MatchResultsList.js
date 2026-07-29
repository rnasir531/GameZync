'use client';
import { useState, useEffect } from 'react';
import GameCard from '../../common/GameCard';
import PaginationControls from '../../common/PaginationControls';

export default function MatchResultsList({ matchedGames }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 3 rows x 5 cards = 15 games per page

  useEffect(() => {
    setCurrentPage(1);
  }, [matchedGames]);

  if (matchedGames === null) return null;

  const totalPages = Math.ceil(matchedGames.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGames = matchedGames.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const elem = document.getElementById('matcherResultsContainer');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div id="matcherResultsContainer" style={{ marginTop: '30px' }}>
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '10px', 
          marginBottom: '20px', 
          paddingBottom: '14px', 
          borderBottom: '1px solid var(--border-color)' 
        }}
      >
        <h4 
          id="matcherResultsTitle" 
          style={{ 
            margin: 0, 
            fontWeight: '800', 
            fontSize: 'clamp(1.05rem, 4vw, 1.35rem)', 
            color: 'var(--text-color)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {matchedGames.length > 0 ? (
            <><i className="fa-solid fa-circle-check" style={{ color: '#10b981' }}></i> Found {matchedGames.length} Playable Games</>
          ) : (
            <><i className="fa-solid fa-circle-xmark text-danger"></i> No Matching Games Found</>
          )}
        </h4>

        {totalPages > 1 && (
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', opacity: 0.9 }}>
            Page {currentPage} of {totalPages} ({matchedGames.length} Total)
          </span>
        )}
      </div>
      
      {matchedGames.length > 0 ? (
        <>
          <div className="games-grid view-cards-active" id="matcherResultsGrid">
            {currentGames.map(game => (
              <GameCard key={game.id} game={game} matchPercentage={game.matchPercentage} />
            ))}
          </div>

          {/* REUSABLE PAGINATION WITH GO TO PAGE FEATURE */}
          <PaginationControls 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      ) : (
        <div style={{ background: 'var(--card-bg)', padding: '40px 20px', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
          <i className="fa-solid fa-ghost" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '15px' }}></i>
          <h5 style={{ color: 'var(--text-color)' }}>Your system might struggle with our current library.</h5>
          <p style={{ color: 'var(--text-muted)' }}>Try checking out our Low End or Instant Games sections instead.</p>
        </div>
      )}
    </div>
  );
}
