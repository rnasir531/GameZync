'use client';

import { getOriginalGameImage } from '@/lib/gameImageMap';

export function normalizeImageUrl(url, title = 'Game') {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return getOriginalGameImage({ title });
  }
  let clean = url.trim();
  if (clean.startsWith('//')) {
    return `https:${clean}`;
  }
  if (clean.startsWith('http://')) {
    return clean.replace(/^http:\/\//i, 'https://');
  }
  return clean;
}

export default function GameCardMedia({ coverUrl, title, isInstantSection, isUpcomingSection, releaseYear, matchPercentage }) {
  const finalUrl = normalizeImageUrl(coverUrl, title);

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
        src={finalUrl} 
        alt={title} 
        loading="lazy" 
        decoding="async" 
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = getOriginalGameImage({ title: title || 'Game' }); 
        }}
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
