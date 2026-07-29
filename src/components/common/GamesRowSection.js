'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GameCard from './GameCard';

export default function GamesRowSection({ 
  title, 
  subtitle, 
  icon, 
  games, 
  showSwitcher = false, 
  viewAllLink, 
  isInstantSection = false,
  isUpcomingSection = false
}) {
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const handleViewChange = (e) => {
      if (!isInstantSection) {
        setViewMode(e.detail);
      }
    };
    window.addEventListener('globalViewModeChange', handleViewChange);
    return () => window.removeEventListener('globalViewModeChange', handleViewChange);
  }, [isInstantSection]);

  const toggleViewMode = (mode) => {
    if (!isInstantSection) {
      setViewMode(mode);
      window.dispatchEvent(new CustomEvent('globalViewModeChange', { detail: mode }));
    }
  };

  const gridClass = viewMode === 'list' ? 'games-grid view-list-active' : 'games-grid view-cards-active';

  return (
    <section className="games-row-section premium-spacing">
      <div className="section-header mb-4 w-100" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Top Row: Subtitle & Switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="subtitle" style={{ margin: 0, fontSize: '11px', letterSpacing: '1px' }}>
            <i className={icon}></i>&nbsp; {subtitle}
          </span>
          
          {showSwitcher ? (
            <div className="view-switcher-bar d-inline-flex global-view-switcher" style={{ width: 'max-content', transform: 'scale(0.9)' }}>
              <button 
                className={`view-switcher-btn ${viewMode === 'grid' ? 'active' : ''}`} 
                title="Grid View"
                onClick={() => toggleViewMode('grid')}
              >
                <i className="fa-solid fa-border-all"></i>
              </button>
              <button 
                className={`view-switcher-btn ${viewMode === 'list' ? 'active' : ''}`} 
                title="List View"
                onClick={() => toggleViewMode('list')}
              >
                <i className="fa-solid fa-list"></i>
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/* Bottom Row: Heading & View All */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <h2 className="section-title" style={{ margin: 0, fontSize: 'clamp(17px, 4.5vw, 24px)', fontWeight: '800', lineHeight: '1.2', whiteSpace: 'normal', wordBreak: 'break-word' }}>
            {title}
          </h2>
          {viewAllLink && (
            <Link href={viewAllLink} className="view-all-btn" style={{ textDecoration: 'none', flexShrink: 0, fontSize: '12px', padding: '6px 14px', whiteSpace: 'nowrap' }}>
              View All &nbsp;<i className="fa-solid fa-arrow-right"></i>
            </Link>
          )}
        </div>
      </div>
      
      <div className={gridClass}>
        {games.map(game => (
          <GameCard key={game.id} game={game} isInstantSection={isInstantSection} isUpcomingSection={isUpcomingSection} />
        ))}
        {games.length === 0 && (
          <div className="text-muted w-100 p-4 text-center">No games found in this category yet.</div>
        )}
      </div>
    </section>
  );
}
