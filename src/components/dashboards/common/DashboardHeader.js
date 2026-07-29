'use client';

export default function DashboardHeader({ title, subtitle, icon, sortOrder, setSortOrder, viewMode, setViewMode }) {
  return (
    <div className="section-header" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
      <div>
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          <i className={`fa-solid ${icon}`}></i> {title}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
          {subtitle}
        </p>
      </div>
      <div className="explorer-controls-wrapper" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div className="sorting-bar" style={{ display: 'flex', background: 'var(--filter-bg)', padding: '4px', borderRadius: '12px', gap: '4px' }}>
          <button 
            className={`sorting-btn ${sortOrder === 'asc' ? 'active' : ''}`} 
            onClick={() => setSortOrder('asc')} 
            title="Sort A-Z (Ascending)"
          >
            <i className="fa-solid fa-arrow-down-a-z"></i> A-Z
          </button>
          <button 
            className={`sorting-btn ${sortOrder === 'desc' ? 'active' : ''}`} 
            onClick={() => setSortOrder('desc')} 
            title="Sort Z-A (Descending)"
          >
            <i className="fa-solid fa-arrow-up-z-a"></i> Z-A
          </button>
        </div>
        <div className="view-switcher-bar d-none d-md-inline-flex global-view-switcher" style={{ background: 'var(--filter-bg)', padding: '4px', borderRadius: '12px', gap: '4px' }}>
          <button 
            className={`view-switcher-btn ${viewMode === 'grid' ? 'active' : ''}`} 
            onClick={() => setViewMode('grid')} 
            title="Cards View"
          >
            <i className="fa-solid fa-border-all"></i>
          </button>
          <button 
            className={`view-switcher-btn ${viewMode === 'list' ? 'active' : ''}`} 
            onClick={() => setViewMode('list')} 
            title="List View"
          >
            <i className="fa-solid fa-list"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
