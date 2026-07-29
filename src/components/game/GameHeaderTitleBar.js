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
        padding: '24px 30px', 
        marginBottom: '24px', 
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      <h1 
        className="game-details-title" 
        style={{ 
          margin: 0, 
          fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', 
          fontWeight: '900', 
          lineHeight: '1.25', 
          color: 'var(--text-color)',
          letterSpacing: '-0.5px',
          wordBreak: 'break-word'
        }}
      >
        {game.name}
      </h1>
      
      <div className="game-meta-badges-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', maxWidth: '100%' }}>
        {/* 1. ALL CATEGORIES COMBINED IN ONE GLOWING EMERALD GLASS CONTAINER BOX */}
        {categoryList.length > 0 && (
          <div 
            className="categories-combined-box" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 18px', 
              borderRadius: '30px', 
              background: 'rgba(16, 185, 129, 0.14)', 
              border: '1.5px solid rgba(16, 185, 129, 0.45)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.12)',
              flexWrap: 'wrap',
              maxWidth: '100%'
            }}
          >
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>
              Categories:
            </span>
            {categoryList.map((catObj, idx) => {
              const iconClass = catObj.icon_class
                ? (catObj.icon_class.startsWith('fa-') ? catObj.icon_class : `fa-solid ${catObj.icon_class}`)
                : 'fa-solid fa-tag';

              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <span style={{ color: 'rgba(16, 185, 129, 0.6)', fontSize: '11px', fontWeight: 'bold' }}>•</span>}
                  <Link 
                    href={`/library?category=${encodeURIComponent(catObj.name)}`} 
                    style={{ 
                      cursor: 'pointer', 
                      textDecoration: 'none', 
                      color: '#10b981', 
                      fontWeight: '800', 
                      fontSize: '13px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      whiteSpace: 'nowrap'
                    }}
                    title={`View all ${catObj.name} games`}
                  >
                    <i className={iconClass} style={{ fontSize: '12px', color: '#10b981' }}></i> {catObj.name}
                  </Link>
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* 2. YEAR SEPARATE PILL */}
        {game.release_year && (
          <Link 
            href={`/library?year=${game.release_year}`}
            className="meta-badge-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 18px',
              borderRadius: '30px',
              background: 'var(--search-bg)',
              border: '1px solid var(--border-color)',
              fontSize: '13px',
              fontWeight: '800',
              color: 'var(--text-color)',
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
            }}
            title={`View all games released in ${game.release_year}`}
          >
            <i className="fa-regular fa-calendar" style={{ color: '#10b981', fontSize: '13px' }}></i> 
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>Year:</span> {game.release_year}
          </Link>
        )}

        {/* 3. DEVELOPER / PUBLISHER PILL */}
        {game.developer_publisher && (
          <div 
            className="meta-badge-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '30px',
              background: 'var(--search-bg)',
              border: '1px solid var(--border-color)',
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--text-color)',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
            }}
            title={game.developer_publisher}
          >
            <i className="fa-solid fa-building" style={{ color: '#10b981', fontSize: '13px', flexShrink: 0 }}></i> 
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', flexShrink: 0 }}>Publisher:</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.developer_publisher}</span>
          </div>
        )}

        {/* 4. FILE SIZE PILL */}
        {game.file_size && (
          <div 
            className="meta-badge-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 18px',
              borderRadius: '30px',
              background: 'var(--search-bg)',
              border: '1px solid var(--border-color)',
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--text-muted)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
            }}
          >
            <i className="fa-solid fa-hard-drive" style={{ color: '#10b981', fontSize: '13px' }}></i> 
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>Size:</span> {game.file_size}
          </div>
        )}
      </div>
    </div>
  );
}
