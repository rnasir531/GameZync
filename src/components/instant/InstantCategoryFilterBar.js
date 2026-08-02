'use client';

export default function InstantCategoryFilterBar({ categories, categoryFilter, setCategoryFilter, onResetPage }) {
  return (
    <div className="instant-filter-bar" id="instant-filter-bar" style={{ marginBottom: '24px' }}>
      {categories.map(cat => (
        <button 
          key={cat}
          onClick={() => {
            setCategoryFilter(cat);
            if (onResetPage) onResetPage();
          }}
          className={`instant-filter-btn ${categoryFilter === cat ? 'active' : ''}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
