'use client';

import GameCard from '../../common/GameCard';

export default function DashboardRamSection({ tag, title, ramValue, games, gridClass, sectionId, marginTop = false }) {
  if (!games || games.length === 0) return null;

  return (
    <section className="games-row-section premium-spacing" style={marginTop ? { marginTop: '40px' } : {}}>
      <div className="section-header mb-4 w-100" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}>
        <div style={{ flex: 1, minWidth: 0, paddingRight: '20px' }}>
          <span className="subtitle" style={{ display: 'block', marginBottom: '5px' }}>
            <i className="fa-solid fa-memory me-2"></i> {tag}
          </span>
          <h2 className="section-title" style={{ marginBottom: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
          <a href={`/library?ram=${ramValue}`} className="view-all-btn high-end-view-all">
            View All &nbsp;<i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i>
          </a>
        </div>
      </div>
      <div className={gridClass} id={sectionId}>
        {games.map(game => <GameCard key={game.id} game={game} />)}
      </div>
    </section>
  );
}
