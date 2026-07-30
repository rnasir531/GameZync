'use client';
import React from 'react';
import Link from 'next/link';

export default function GameHeaderTitleBar({ game }) {
  const categoryList = game.categoryList || (
    game.category 
      ? game.category.split(',').map(c => ({ name: c.trim(), icon_class: 'fa-solid fa-tag' })) 
      : []
  );

  return (
    <div 
      className="game-header-info-bar-top" 
      style={{ 
        background: 'var(--card-bg)', 
        border: '1px solid var(--border-color)', 
        borderRadius: '20px', 
        padding: '20px 24px', 
        marginBottom: '24px', 
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}
    >
      <h1 
        className="game-details-title" 
        style={{ 
          margin: 0, 
          fontSize: 'clamp(1.4rem, 4.5vw, 2.1rem)', 
          fontWeight: '900', 
          lineHeight: '1.25', 
          color: 'var(--text-color)',
          letterSpacing: '-0.5px',
          wordBreak: 'break-word'
        }}
      >
        {game.name}
      </h1>
      
      <div className="game-meta-badges-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', maxWidth: '100%' }}>
        {/* 1. INDIVIDUAL SLEEK CATEGORY BADGES */}
        {categoryList.map((catObj, idx) => {
          const iconClass = catObj.icon_class
            ? (catObj.icon_class.startsWith('fa-') ? catObj.icon_class : `fa-solid ${catObj.icon_class}`)
            : 'fa-solid fa-tag';

          return (
            <Link 
              key={idx}
              href={`/library?category=${encodeURIComponent(catObj.name)}`} 
              className="meta-badge-pill category-pill"
              style={{ 
                cursor: 'pointer', 
                textDecoration: 'none', 
                color: '#10b981', 
                fontWeight: '800', 
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              title={`View all ${catObj.name} games`}
            >
              <i className={iconClass} style={{ fontSize: '11px', color: '#10b981' }}></i> {catObj.name}
            </Link>
          );
        })}

        {/* 2. RELEASE YEAR BADGE */}
        {game.release_year && (
          <Link 
            href={`/library?year=${game.release_year}`}
            className="meta-badge-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'var(--search-bg)',
              border: '1px solid var(--border-color)',
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--text-color)',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
            title={`View all games released in ${game.release_year}`}
          >
            <i className="fa-regular fa-calendar" style={{ color: '#10b981', fontSize: '12px' }}></i> Release Year: {game.release_year}
          </Link>
        )}

        {/* 3. DEVELOPER / PUBLISHER BADGE */}
        {game.developer_publisher && (
          <div 
            className="meta-badge-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'var(--search-bg)',
              border: '1px solid var(--border-color)',
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--text-color)',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
            title={game.developer_publisher}
          >
            <i className="fa-solid fa-building" style={{ color: '#10b981', fontSize: '12px', flexShrink: 0 }}></i> 
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Developer: {game.developer_publisher}</span>
          </div>
        )}

        {/* 4. FILE SIZE BADGE */}
        {game.file_size && (
          <div 
            className="meta-badge-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'var(--search-bg)',
              border: '1px solid var(--border-color)',
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--text-muted)'
            }}
          >
            <i className="fa-solid fa-hard-drive" style={{ color: '#10b981', fontSize: '12px' }}></i> {game.file_size}
          </div>
        )}
      </div>
    </div>
  );
}
