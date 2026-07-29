'use client';
import { useState, useEffect } from 'react';

export default function PaginationControls({ currentPage, totalPages, onPageChange }) {
  const [jumpInput, setJumpInput] = useState('');

  useEffect(() => {
    setJumpInput('');
  }, [currentPage]);

  if (!totalPages || totalPages <= 1) return null;

  const handleGoSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(jumpInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setJumpInput('');
    }
  };

  return (
    <div className="pagination-wrapper">
      {/* MOBILE RESPONSIVE NAV BAR: PREVIOUS | PAGE X OF Y | NEXT */}
      <div className="mobile-pagination-nav">
        <button 
          className="pagination-action-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <i className="fa-solid fa-chevron-left"></i> Previous
        </button>

        <span className="page-indicator-mobile">
          Page {currentPage} of {totalPages}
        </span>

        <button 
          className="pagination-action-btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* DESKTOP NUMBERED PAGE PILLS */}
      <div className="desktop-page-numbers" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
          .map((page, idx, array) => {
            const prevPage = array[idx - 1];
            const showEllipsis = prevPage && page - prevPage > 1;

            return (
              <div key={page} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {showEllipsis && <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>...</span>}
                <button
                  className={`pagination-num-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </div>
            );
          })}
      </div>

      {/* GO TO PAGE JUMP FORM */}
      <form onSubmit={handleGoSubmit} className="goto-page-form">
        <input 
          type="number" 
          min="1" 
          max={totalPages}
          value={jumpInput}
          onChange={(e) => setJumpInput(e.target.value)}
          placeholder={`Go to page (1-${totalPages})...`}
          className="goto-page-input"
        />
        <button type="submit" className="goto-page-btn">
          Go
        </button>
      </form>
    </div>
  );
}
