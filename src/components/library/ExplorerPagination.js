'use client';
import React from 'react';
import Link from 'next/link';

export default function ExplorerPagination({ currentPage, totalPages, buildPageUrl, handleGoToPage, pageInput, setPageInput }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', gap: '12px', flexWrap: 'wrap' }}>
      {currentPage > 1 && (
        <Link 
          href={buildPageUrl(currentPage - 1)} 
          className="btn pagination-btn-action" 
          style={{ 
            padding: '10px 22px', 
            background: 'var(--card-bg)', 
            color: 'var(--text-color)', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            fontWeight: '700',
            fontSize: '14px',
            transition: 'all 0.2s ease', 
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}
        >
          <i className="fa-solid fa-chevron-left" style={{ marginRight: '8px', color: 'var(--primary-color)' }}></i> Previous
        </Link>
      )}
      
      <span style={{ display: 'flex', alignItems: 'center', padding: '0 15px', color: 'var(--text-muted)', fontWeight: '700', fontSize: '14px' }}>
        Page {currentPage} of {totalPages}
      </span>
      
      <form onSubmit={handleGoToPage} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input 
          type="number" 
          min="1" 
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          placeholder="Go to..."
          style={{ 
            width: '90px', 
            padding: '10px 14px', 
            background: 'var(--search-bg)', 
            border: '1px solid var(--border-color)', 
            color: 'var(--text-color)', 
            borderRadius: '12px', 
            outline: 'none',
            fontSize: '14px',
            fontWeight: '600'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '10px 18px', 
            background: 'var(--primary-color)', 
            color: '#ffffff', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontWeight: '800',
            fontSize: '14px',
            boxShadow: '0 4px 12px var(--primary-glow)'
          }}
        >
          Go
        </button>
      </form>
      
      {currentPage < totalPages && (
        <Link 
          href={buildPageUrl(currentPage + 1)} 
          className="btn pagination-btn-action" 
          style={{ 
            padding: '10px 22px', 
            background: 'var(--card-bg)', 
            color: 'var(--text-color)', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            fontWeight: '700',
            fontSize: '14px',
            transition: 'all 0.2s ease', 
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}
        >
          Next <i className="fa-solid fa-chevron-right" style={{ marginLeft: '8px', color: 'var(--primary-color)' }}></i>
        </Link>
      )}
    </div>
  );
}
