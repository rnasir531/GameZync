'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const GamesTableClient = dynamic(() => import('@/components/admin/tables/GamesTableClient'), { loading: () => <div className="p-4 text-center">Loading...</div> });
const InstantGamesTableClient = dynamic(() => import('@/components/admin/tables/InstantGamesTableClient'), { loading: () => <div className="p-4 text-center">Loading...</div> });
const CategoriesTableClient = dynamic(() => import('@/components/admin/tables/CategoriesTableClient'), { loading: () => <div className="p-4 text-center">Loading...</div> });

export default function GamesTabsClient({ games = [], instantGames = [], categories = [], allCategories = [] }) {
  const [activeTab, setActiveTab] = useState(0); // Default to Published Games

  const publishedGames = games.filter(g => g.status === 'published' || !g.status);
  const archivedGames = games.filter(g => g.status === 'archived');
  const featuredGames = publishedGames.filter(g => g.is_featured);

  const tabs = [
    { name: 'Published Games', icon: 'fa-gamepad', badge: publishedGames.length },
    { name: 'Instant Games', icon: 'fa-bolt-lightning', badge: instantGames.length },
    { name: 'Featured Games', icon: 'fa-star', badge: featuredGames.length },
    { name: 'Archive Box', icon: 'fa-box-archive', badge: archivedGames.length },
    { name: 'Categories', icon: 'fa-tags', badge: allCategories.length },
  ];

  return (
    <div className="container-fluid p-0" style={{ color: '#cbd5e1' }}>

      {/* Header/Tabs Panel */}
      <div className="dashboard-panel" style={{ padding: '24px', marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontWeight: 'bold', color: 'var(--text-color)', margin: 0 }}>
            <i className="fa-solid fa-folder-open text-primary me-2"></i> Manage Content
          </h3>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline-primary"
            style={{ borderRadius: '8px', padding: '10px 20px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(16, 185, 129, 0.5)', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; }}
          >
            <i className="fa-solid fa-rotate-right"></i> Refresh Data
          </button>
        </div>

        {/* 5-COLUMN EVEN GRID ROW WITHOUT SCROLLBAR */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px', width: '100%' }}>
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`btn ${activeTab === idx ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: activeTab === idx ? 'var(--primary-gradient)' : 'var(--search-bg)',
                color: activeTab === idx ? '#fff' : 'var(--text-color)',
                boxShadow: activeTab === idx
                  ? 'inset 1px 1px 2px rgba(255,255,255,0.3), inset -1px -2px 3px rgba(0,0,0,0.3), 0 4px 10px var(--primary-glow)'
                  : 'none',
                transition: 'all 0.2s ease',
                width: '100%'
              }}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              {tab.name}
              <span style={{
                background: activeTab === idx ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                color: activeTab === idx ? '#fff' : 'var(--text-muted)',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '11.5px',
                fontWeight: '800'
              }}>
                {tab.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content" style={{ minHeight: '400px' }}>
        {activeTab === 0 && (
          <div className="fade-in">
            <GamesTableClient games={publishedGames} />
          </div>
        )}
        {activeTab === 1 && (
          <div className="fade-in">
            <InstantGamesTableClient instantGames={instantGames} categories={categories} />
          </div>
        )}
        {activeTab === 2 && (
          <div className="fade-in">
            <GamesTableClient games={featuredGames} isFeaturedTab={true} />
          </div>
        )}
        {activeTab === 3 && (
          <div className="fade-in">
            <GamesTableClient games={archivedGames} isArchivedTab={true} />
          </div>
        )}
        {activeTab === 4 && (
          <div className="fade-in">
            <CategoriesTableClient categories={allCategories} />
          </div>
        )}
      </div>
    </div>
  );
}
