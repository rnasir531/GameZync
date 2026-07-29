'use client';
import React, { useState } from 'react';
import GameHeaderTitleBar from './GameHeaderTitleBar';
import GameSidebarThumbnails from './GameSidebarThumbnails';

export default function GameHeroMediaGallery({ game }) {
  const coverImage = game.cover_image || `/uploads/games/${game.id}/cover.jpg`;
  const additionalImages = game.images ? game.images.split(',').map(s => s.trim()).filter(Boolean) : [];
  
  const allMedia = Array.from(new Set([coverImage, ...additionalImages]));
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const sidebarMedia = allMedia.map((url, origIdx) => ({ url, origIdx })).filter(item => item.origIdx !== selectedIndex);

  const handleSelectImage = (targetIndex) => {
    if (targetIndex === selectedIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setSelectedIndex(targetIndex);
      setIsFading(false);
    }, 180);
  };

  return (
    <div className="game-hero-container">
      {/* 1. GAME NAME & CATEGORIES SECTION */}
      <GameHeaderTitleBar game={game} />
      
      {/* 2. SPLIT LAYOUT: MAIN HERO IMAGE (LEFT) + SIDEBAR THUMBNAILS (RIGHT) */}
      <div className="game-hero-media-split">
        <div className="hero-main-picture-card">
          <img 
            src={allMedia[selectedIndex] || coverImage} 
            alt={game.name} 
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }}
            className={isFading ? 'fading' : ''}
          />
          {game.is_featured === 1 && (
            <span className="hero-featured-badge">
              <i className="fa-solid fa-fire"></i> FEATURED
            </span>
          )}
        </div>

        {/* 3. SIDEBAR MEDIA GALLERY THUMBNAILS */}
        <GameSidebarThumbnails 
          sidebarMedia={sidebarMedia} 
          handleSelectImage={handleSelectImage} 
          gameName={game.name}
          selectedIndex={selectedIndex}
        />
      </div>
    </div>
  );
}
