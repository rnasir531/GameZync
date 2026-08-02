'use client';

export default function InstantGamesHeader({ activeGame, viewMode, setViewMode }) {
  return (
    <div className="instant-games-header" id="instant-games-grid-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
      <div>
        <span className="subtitle">No Download Required</span>
        <h2 className="section-title">
          <i className="fa-solid fa-bolt-lightning" style={{ color: 'var(--primary-color)' }}></i>
          &nbsp;{activeGame ? 'More Instant Play Games' : 'Instant Play Games'}
        </h2>
        <p className="instant-games-desc" style={{ marginTop: '6px' }}>
          Explore classic &amp; online games — click any game to play instantly in your browser.
        </p>
      </div>

      {/* VIEW SWITCHER BAR (CARDS vs LIST) */}
      <div className="view-switcher-bar" style={{ display: 'flex', background: 'var(--filter-bg)', padding: '4px', borderRadius: '12px', gap: '4px', flexShrink: 0 }}>
        <button 
          onClick={() => setViewMode('cards')} 
          className={`view-switcher-btn ${viewMode === 'cards' ? 'active' : ''}`}
          title="Cards Grid View"
          style={{ textDecoration: 'none' }}
        >
          <i className="fa-solid fa-table-cells"></i> Cards
        </button>
        <button 
          onClick={() => setViewMode('list')} 
          className={`view-switcher-btn ${viewMode === 'list' ? 'active' : ''}`}
          title="Horizontal List View"
          style={{ textDecoration: 'none' }}
        >
          <i className="fa-solid fa-list"></i> List
        </button>
      </div>
    </div>
  );
}
