'use client';

export default function GamesTablePagination({
  totalItems,
  startIndex,
  endIndex,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  handlePageChange
}) {
  if (totalItems <= 0) return null;

  return (
    <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
      {/* Left: Entry Counts & Per Page Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#94a3b8' }}>
        <span>
          Showing <strong style={{ color: '#f8fafc' }}>{startIndex + 1}</strong> to <strong style={{ color: '#f8fafc' }}>{endIndex}</strong> of <strong style={{ color: '#f8fafc' }}>{totalItems}</strong> games
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="adminPerPageSelect" style={{ margin: 0 }}>Per Page:</label>
          <select
            id="adminPerPageSelect"
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', padding: '4px 8px', fontSize: '12.5px', outline: 'none', cursor: 'pointer' }}
          >
            <option value={15} style={{ background: '#111' }}>15</option>
            <option value={30} style={{ background: '#111' }}>30</option>
            <option value={50} style={{ background: '#111' }}>50</option>
            <option value={100} style={{ background: '#111' }}>100</option>
          </select>
        </div>
      </div>

      {/* Right: Page Navigation Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: currentPage === 1 ? '#64748b' : '#f8fafc', padding: '6px 14px', borderRadius: '8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: '600' }}
        >
          <i className="fa-solid fa-chevron-left me-1"></i> Prev
        </button>

        {/* Dynamic Page Buttons */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum = i + 1;
          if (totalPages > 5) {
            if (currentPage > 3) pageNum = currentPage - 2 + i;
            if (pageNum > totalPages) pageNum = totalPages - 4 + i;
          }
          if (pageNum <= 0) pageNum = i + 1;

          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className="btn btn-sm"
              style={{
                background: currentPage === pageNum ? '#10b981' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${currentPage === pageNum ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '700',
                minWidth: '34px',
                boxShadow: currentPage === pageNum ? '0 2px 10px rgba(16, 185, 129, 0.4)' : 'none'
              }}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-sm"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: currentPage === totalPages ? '#64748b' : '#f8fafc', padding: '6px 14px', borderRadius: '8px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: '600' }}
        >
          Next <i className="fa-solid fa-chevron-right ms-1"></i>
        </button>
      </div>
    </div>
  );
}
