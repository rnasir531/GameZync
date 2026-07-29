'use client';
import React from 'react';

export default function GameSidebarThumbnails({ sidebarMedia, handleSelectImage, gameName, selectedIndex }) {
  if (!sidebarMedia || sidebarMedia.length === 0) return null;

  return (
    <div className="hero-thumbnails-sidebar">
      <div className="sidebar-header-title">
        <i className="fa-solid fa-images"></i> MEDIA GALLERY
      </div>
      <div className="thumbnails-list">
        {sidebarMedia.map((item, i) => (
          <div 
            key={i} 
            className={`thumbnail-card-item ${selectedIndex === item.origIdx ? 'active' : ''}`}
            onClick={() => handleSelectImage(item.origIdx)}
            title={`View Image ${i + 2}`}
          >
            <img 
              src={item.url} 
              alt={`${gameName} Screenshot ${i + 1}`}
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'; }}
              loading="lazy"
            />
            <div className="thumbnail-active-overlay">
              <i className="fa-solid fa-expand"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
