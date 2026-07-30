'use client';

export default function GameCardMedia({ coverUrl, title, isInstantSection, isUpcomingSection, releaseYear, matchPercentage }) {
  let badgeColor = '#10b981';
  let badgeText = 'Smooth';

  if (matchPercentage !== null && matchPercentage !== undefined) {
    const val = Math.round(matchPercentage);
    if (val >= 90) {
      badgeColor = '#10b981';
      badgeText = `${val}% • Smooth`;
    } else if (val >= 70) {
      badgeColor = '#06b6d4';
      badgeText = `${val}% • Medium`;
    } else if (val >= 50) {
      badgeColor = '#f59e0b';
      badgeText = `${val}% • Low`;
    } else {
      badgeColor = '#ef4444';
      badgeText = `${val}% • Lag`;
    }
  }

  return (
    <div className="game-card-img-wrapper">
      <img 
        src={coverUrl} 
        alt={title} 
        loading="lazy" 
        decoding="async" 
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }}
      />

      {!isInstantSection && (
        <span className="game-badge">{isUpcomingSection ? 'Coming Soon' : releaseYear}</span>
      )}
      
      {matchPercentage !== null && matchPercentage !== undefined && (
        <div className="match-badge-sleek" style={{ background: badgeColor }}>
          <i className="fa-solid fa-gauge-high"></i> {badgeText}
        </div>
      )}
    </div>
  );
}
