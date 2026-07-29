'use client';
import { useState } from 'react';
import SingleScraperPanel from '@/components/admin/scraper/SingleScraperPanel';

export default function ScraperClient({ categories = [] }) {
  const [activeTab, setActiveTab] = useState('steamrip'); // 'steamrip' | 'gametrex'

  return (
    <div className="admin-container">
      <div style={{ marginBottom: '24px' }}>
        <h2 className="m-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
          <i className="fa-solid fa-spider text-primary"></i> Auto-Scraper
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Fetch games automatically from supported sources using single URL scraping.
        </p>
      </div>

      <div className="admin-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button 
          onClick={() => setActiveTab('steamrip')}
          style={{ 
            padding: '12px 24px', 
            background: activeTab === 'steamrip' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', 
            color: activeTab === 'steamrip' ? 'var(--primary-color)' : '#aaa', 
            border: 'none', 
            borderBottom: activeTab === 'steamrip' ? '2px solid var(--primary-color)' : '2px solid transparent', 
            borderRadius: '8px 8px 0 0', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
        >
          <i className="fa-solid fa-steam"></i> SteamRIP
        </button>
        <button 
          onClick={() => setActiveTab('gametrex')}
          style={{ 
            padding: '12px 24px', 
            background: activeTab === 'gametrex' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', 
            color: activeTab === 'gametrex' ? 'var(--primary-color)' : '#aaa', 
            border: 'none', 
            borderBottom: activeTab === 'gametrex' ? '2px solid var(--primary-color)' : '2px solid transparent', 
            borderRadius: '8px 8px 0 0', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
        >
          <i className="fa-solid fa-gamepad"></i> GameTrex
        </button>
      </div>

      <SingleScraperPanel source={activeTab} categories={categories} />
    </div>
  );
}
