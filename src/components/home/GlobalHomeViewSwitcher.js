'use client';
import { useState } from 'react';

export default function GlobalHomeViewSwitcher() {
  const [viewMode, setViewMode] = useState('grid');

  const toggleViewMode = (mode) => {
    setViewMode(mode);
    window.dispatchEvent(new CustomEvent('globalViewModeChange', { detail: mode }));
  };

  return (
    <div 
      className="global-home-switcher-container"
      style={{
        maxWidth: '1400px',
        margin: '16px auto 8px',
        padding: '0 20px',
        display: 'flex',
        justify: 'flex-end',
        alignItems: 'center'
      }}
    >
      <div 
        className="view-switcher-bar d-inline-flex" 
        style={{ 
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '4px 6px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
          gap: '4px'
        }}
      >
        <button 
          type="button"
          className={`view-switcher-btn ${viewMode === 'grid' ? 'active' : ''}`} 
          title="Grid View"
          onClick={() => toggleViewMode('grid')}
          style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '700' }}
        >
          <i className="fa-solid fa-border-all me-1"></i> Grid
        </button>
        <button 
          type="button"
          className={`view-switcher-btn ${viewMode === 'list' ? 'active' : ''}`} 
          title="List View"
          onClick={() => toggleViewMode('list')}
          style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '700' }}
        >
          <i className="fa-solid fa-list me-1"></i> List
        </button>
      </div>
    </div>
  );
}
