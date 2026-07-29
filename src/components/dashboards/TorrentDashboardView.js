'use client';

import { useState, useMemo } from 'react';
import GameCard from '../common/GameCard';

export default function TorrentDashboardView({ allGames }) {
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const sortedGames = useMemo(() => {
    return [...allGames].sort((a, b) => {
      const aTitle = a.name || a.title || '';
      const bTitle = b.name || b.title || '';
      return sortOrder === 'asc' 
        ? aTitle.localeCompare(bTitle) 
        : bTitle.localeCompare(aTitle);
    });
  }, [allGames, sortOrder]);

  const gridClass = viewMode === 'list' ? 'games-grid view-list-active' : 'games-grid-3-col view-cards-active';

  return (
    <section className="home-section" id="torrent-dashboard" style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <div className="section-header" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            <i className="fa-solid fa-magnet"></i> Torrent Games
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
            Games available for download via Torrent.
          </p>
        </div>
        <div className="explorer-controls-wrapper" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div className="sorting-bar" style={{ display: 'flex', background: 'var(--filter-bg)', padding: '4px', borderRadius: '12px', gap: '4px' }}>
            <button 
              className={`sorting-btn ${sortOrder === 'asc' ? 'active' : ''}`} 
              onClick={() => setSortOrder('asc')} 
              title="Sort A-Z (Ascending)"
            >
              <i className="fa-solid fa-arrow-down-a-z"></i> A-Z
            </button>
            <button 
              className={`sorting-btn ${sortOrder === 'desc' ? 'active' : ''}`} 
              onClick={() => setSortOrder('desc')} 
              title="Sort Z-A (Descending)"
            >
              <i className="fa-solid fa-arrow-up-z-a"></i> Z-A
            </button>
          </div>
          <div className="view-switcher-bar d-none d-md-inline-flex global-view-switcher" style={{ background: 'var(--filter-bg)', padding: '4px', borderRadius: '12px', gap: '4px' }}>
            <button 
              className={`view-switcher-btn ${viewMode === 'grid' ? 'active' : ''}`} 
              onClick={() => setViewMode('grid')} 
              title="Cards View"
            >
              <i className="fa-solid fa-border-all"></i>
            </button>
            <button 
              className={`view-switcher-btn ${viewMode === 'list' ? 'active' : ''}`} 
              onClick={() => setViewMode('list')} 
              title="List View"
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      {sortedGames.length > 0 && (
        <section className="games-row-section premium-spacing">
          <div className={gridClass} id="torrent-games-grid">
            {sortedGames.map(game => <GameCard key={game.id} game={game} />)}
          </div>
        </section>
      )}

      {allGames.length === 0 && (
        <div className="text-muted w-100 p-4 text-center">No torrent games found.</div>
      )}
    </section>
  );
}
