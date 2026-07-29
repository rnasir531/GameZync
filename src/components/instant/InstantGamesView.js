'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import GameCard from '../common/GameCard';
import PaginationControls from '../common/PaginationControls';

export default function InstantGamesView({ allGames }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const playId = searchParams.get('play');
  
  const [activeGame, setActiveGame] = useState(null);
  const iframeRef = useRef(null);

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Sync activeGame with play URL search param
  useEffect(() => {
    if (playId && allGames.length > 0) {
      const found = allGames.find(g => String(g.id) === String(playId));
      if (found) {
        setActiveGame(found);
        setTimeout(() => {
          const playerElem = document.getElementById('instant-player-hero');
          if (playerElem) {
            playerElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [playId, allGames]);

  // Extract unique categories dynamically
  const catsSet = new Set(['All']);
  allGames.forEach(g => {
    if (g.category) {
      g.category.split(',').forEach(c => {
        const catName = c.trim();
        if (catName) catsSet.add(catName);
      });
    }
  });
  const cats = Array.from(catsSet);

  const handleSelectGame = (game) => {
    setActiveGame(game);
    router.push(`/instant?play=${game.id}`, { scroll: false });
    setTimeout(() => {
      const playerElem = document.getElementById('instant-player-hero');
      if (playerElem) {
        playerElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleClosePlayer = () => {
    setActiveGame(null);
    router.push('/instant', { scroll: false });
  };

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      iframeRef.current.requestFullscreen().catch(() => {});
    }
  };

  // Filter games based on selected category
  let processedGames = [...allGames];
  if (categoryFilter !== 'All') {
    processedGames = processedGames.filter(g => g.category && g.category.toLowerCase().includes(categoryFilter.toLowerCase()));
  }

  // Sort games based on selected order
  if (sortOrder === 'asc') {
    processedGames.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === 'desc') {
    processedGames.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    processedGames.sort((a, b) => b.id - a.id);
  }

  const totalPages = Math.ceil(processedGames.length / itemsPerPage);
  const currentGames = processedGames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const elem = document.getElementById('instant-games-grid-title');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="instant-games-view" id="instant-games-view" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      
      {/* ACTIVE GAME HERO PLAYER WINDOW */}
      {activeGame && (
        <div className="instant-player-hero" id="instant-player-hero" style={{ marginBottom: '40px' }}>
          <div className="player-header">
            <div className="player-title-box">
              <h3 style={{ margin: 0, fontWeight: '800', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-gamepad" style={{ color: 'var(--primary-color)' }}></i>
                {activeGame.name || activeGame.title}
              </h3>
              {activeGame.category && (
                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary-color)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700' }}>
                  {activeGame.category}
                </span>
              )}
            </div>

            <div className="player-actions" style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={toggleFullscreen} 
                className="player-btn fullscreen-btn"
                title="Toggle Fullscreen"
              >
                <i className="fa-solid fa-expand"></i> Fullscreen
              </button>
              <button 
                onClick={handleClosePlayer} 
                className="player-btn close-btn"
                title="Close Game"
              >
                <i className="fa-solid fa-xmark"></i> Close
              </button>
            </div>
          </div>

          <div className="player-iframe-wrapper" ref={iframeRef}>
            <iframe
              src={activeGame.embed_url || activeGame.url}
              title={activeGame.name || activeGame.title}
              allow="autoplay; fullscreen; keyboard; gamepad"
              allowFullScreen
              className="instant-iframe"
            />
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="instant-games-header">
        <div>
          <span className="subtitle">No Download Required</span>
          <h2 className="section-title">
            <i className="fa-solid fa-bolt-lightning" style={{ color: 'var(--primary-color)' }}></i>
            &nbsp;{activeGame ? 'More Instant Play Games' : 'Instant Play Games'}
          </h2>
        </div>
        <p className="instant-games-desc">
          {allGames.length}+ classic &amp; online games — click any game to play instantly in your browser.
        </p>
      </div>

      {/* CATEGORY FILTER BAR */}
      <div className="instant-filter-bar" id="instant-filter-bar">
        {cats.map(cat => (
          <button 
            key={cat}
            onClick={() => {
              setCategoryFilter(cat);
              setCurrentPage(1);
            }}
            className={`instant-filter-btn ${categoryFilter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }} id="instant-games-grid-title">
        <p className="instant-count-label" id="instant-count-label" style={{ margin: 0, fontSize: '14px' }}>
          Showing <strong>{currentGames.length}</strong> of <strong>{processedGames.length}</strong> games
        </p>
        
        <div className="sorting-bar" style={{ display: 'flex', background: 'var(--filter-bg)', padding: '4px', borderRadius: '12px', gap: '4px' }}>
          <button onClick={() => setSortOrder('recent')} className={`sorting-btn ${sortOrder === 'recent' ? 'active' : ''}`} title="Sort Recent">
            <i className="fa-solid fa-clock-rotate-left"></i> Recent
          </button>
          <button onClick={() => setSortOrder('asc')} className={`sorting-btn ${sortOrder === 'asc' ? 'active' : ''}`} title="Sort A-Z (Ascending)">
            <i className="fa-solid fa-arrow-down-a-z"></i> A-Z
          </button>
          <button onClick={() => setSortOrder('desc')} className={`sorting-btn ${sortOrder === 'desc' ? 'active' : ''}`} title="Sort Z-A (Descending)">
            <i className="fa-solid fa-arrow-up-z-a"></i> Z-A
          </button>
        </div>
      </div>
      
      {/* GAMES GRID */}
      <div className="games-grid view-cards-active" id="instant-games-grid">
        {currentGames.map(game => (
          <div key={game.id} onClick={() => handleSelectGame(game)}>
            <GameCard 
              game={game} 
              isInstantSection={true} 
            />
          </div>
        ))}
        {currentGames.length === 0 && (
          <div className="text-muted w-100 p-4 text-center" style={{ gridColumn: '1 / -1' }}>No games found.</div>
        )}
      </div>

      {/* REUSABLE PAGINATION CONTROLS */}
      <PaginationControls 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
