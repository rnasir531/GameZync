'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AdminAddGame from '@/components/admin/forms/AddGameForm';

export default function SingleScraperPanel({ source = 'steamrip', categories = [] }) {
  const [url, setUrl] = useState('');
  const [autoSave, setAutoSave] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [bulkMessage, setBulkMessage] = useState('');
  const [error, setError] = useState('');
  const [bulkError, setBulkError] = useState('');
  const [scrapedGame, setScrapedGame] = useState(null);
  const [savedBulkGames, setSavedBulkGames] = useState([]);

  const buttonStyle = {
    borderRadius: '10px', padding: '14px 28px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '10px', 
    border: 'none', background: 'var(--primary-gradient)', color: '#fff', boxShadow: '0 4px 14px rgba(16,185,129,0.3)', 
    cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
  };

  const handleScrapeSingle = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    setScrapedGame(null);

    if (!url.includes(source)) {
      setError(`Please provide a valid ${source === 'steamrip' ? 'SteamRIP' : 'GameTrex'} URL.`);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, autoSave })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to scrape');

      setMessage(data.message);
      if (!data.autoSaved) {
        setScrapedGame(data.game);
      }
      setUrl('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRunBulkScraper = async (limitCount = 5) => {
    setBulkLoading(true);
    setBulkMessage('');
    setBulkError('');
    setSavedBulkGames([]);

    try {
      const res = await fetch('/api/admin/scrape-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, limit: limitCount, autoSaveToArchive: true })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to run bulk scraper');

      setBulkMessage(data.message);
      if (data.savedGames) {
        setSavedBulkGames(data.savedGames);
      }
    } catch (err) {
      setBulkError(err.message);
    } finally {
      setBulkLoading(false);
    }
  };

  const titleText = source === 'steamrip' ? 'SteamRIP Auto-Scraper' : 'GameTrex Auto-Scraper';
  const placeholderText = source === 'steamrip' 
    ? 'Paste SteamRIP Game Link (e.g. https://steamrip.com/elden-ring-free-download/)' 
    : 'Paste GameTrex Game Link (e.g. https://gametrex.com/game/)';

  return (
    <>
      {/* CARD 1: FULL AUTOMATED CATALOG CRAWLER (ONE-CLICK BULK SCRAPE) */}
      <div className="dashboard-panel shadow-sm" style={{ padding: '0', overflow: 'hidden', marginBottom: '32px', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'linear-gradient(145deg, #0f172a 0%, #090d16 100%)' }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(16, 185, 129, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <i className="fa-solid fa-robot text-primary" style={{ fontSize: '22px' }}></i> Full {source === 'steamrip' ? 'SteamRIP' : 'GameTrex'} Catalog Bulk Auto-Crawler
            </h4>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>
              Automatically scans homepage, skips games already in your database, fetches all specs/links, and saves new games directly to <strong>📦 Archive Box</strong>!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              disabled={bulkLoading}
              onClick={() => handleRunBulkScraper(5)}
              style={{
                borderRadius: '10px',
                padding: '12px 20px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(16, 185, 129, 0.5)',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                cursor: bulkLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { if (!bulkLoading) e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'; }}
              onMouseOut={(e) => { if (!bulkLoading) e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)'; }}
            >
              <i className={`fa-solid ${bulkLoading ? 'fa-spinner fa-spin' : 'fa-bolt'}`}></i>
              {bulkLoading ? 'Auto Crawling SteamRIP...' : '🚀 Auto Scrape 5 Latest Games'}
            </button>

            <button
              type="button"
              disabled={bulkLoading}
              onClick={() => handleRunBulkScraper(10)}
              style={{
                borderRadius: '10px',
                padding: '12px 20px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                background: 'var(--primary-gradient)',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                cursor: bulkLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <i className={`fa-solid ${bulkLoading ? 'fa-spinner fa-spin' : 'fa-spider'}`}></i>
              {bulkLoading ? 'Auto Crawling SteamRIP...' : '🔥 Auto Scrape 10 Latest Games'}
            </button>
          </div>
        </div>

        {bulkLoading && (
          <div style={{ padding: '24px 32px', background: 'rgba(16, 185, 129, 0.06)', borderBottom: '1px solid rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', gap: '14px', fontSize: '14px', fontWeight: 'bold' }}>
            <i className="fa-solid fa-circle-notch fa-spin fa-2x"></i>
            <div>
              Auto Crawling SteamRIP catalog... Checking database for duplicate games... Extracting specs & download links...
              <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'normal', marginTop: '2px' }}>Please wait 10-25 seconds depending on count. All new games will land directly in your Archive Box!</div>
            </div>
          </div>
        )}

        {bulkError && (
          <div style={{ padding: '16px 32px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '14px', fontWeight: 'bold' }}>
            <i className="fa-solid fa-triangle-exclamation me-2"></i> {bulkError}
          </div>
        )}

        {bulkMessage && (
          <div style={{ padding: '20px 32px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderBottom: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span><i className="fa-solid fa-circle-check me-2"></i> {bulkMessage}</span>
              <Link href="/admin/games" className="btn btn-sm btn-success" style={{ fontWeight: 'bold', padding: '6px 16px', borderRadius: '8px' }}>
                📦 Go To Archive Box
              </Link>
            </div>

            {savedBulkGames.length > 0 && (
              <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                {savedBulkGames.map((g, idx) => (
                  <div key={idx} style={{ background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={g.cover_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f'} alt={g.name} style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ color: '#fff', fontSize: '13px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.name}</div>
                      <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '700' }}>Status: Archived</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CARD 2: SINGLE GAME LINK SCRAPER */}
      <div className="dashboard-panel shadow-sm" style={{ padding: '0', overflow: 'hidden', marginBottom: '32px' }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fa-solid fa-link text-primary"></i> Single Game URL Scraper
          </h4>
          
          {/* AUTO-SAVE TO ARCHIVE BOX TOGGLE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(245, 158, 11, 0.1)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <input 
              type="checkbox" 
              id="autoSaveToggle" 
              checked={autoSave} 
              onChange={e => setAutoSave(e.target.checked)} 
              style={{ width: '16px', height: '16px', accentColor: '#f59e0b', cursor: 'pointer' }}
            />
            <label htmlFor="autoSaveToggle" style={{ fontSize: '12.5px', fontWeight: '700', color: '#f59e0b', cursor: 'pointer', margin: 0 }}>
              Auto-Save Directly to Archive Box
            </label>
          </div>
        </div>

        <div style={{ padding: '32px' }}>
          <form onSubmit={handleScrapeSingle} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '320px' }}>
              <input 
                type="url" 
                className="form-control"
                placeholder={placeholderText}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff', padding: '14px 20px', borderRadius: '10px', width: '100%', fontSize: '14px' }}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn"
              disabled={loading}
              style={{ ...buttonStyle, minWidth: '240px', justifyContent: 'center' }}
            >
              {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Scraping to Archive...</> : <><i className="fa-solid fa-box-archive"></i> {autoSave ? 'Fetch & Save to Archive Box' : 'Fetch & Review'}</>}
            </button>
          </form>
          
          {error && <div className="mt-4 shadow-sm" style={{ padding: '16px 20px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', marginTop: '24px' }}><i className="fa-solid fa-triangle-exclamation me-2"></i> {error}</div>}
          {message && <div className="mt-4 shadow-sm" style={{ padding: '16px 20px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.2)', marginTop: '24px' }}><i className="fa-solid fa-circle-check me-2"></i> {message}</div>}
        </div>
      </div>

      {scrapedGame && (
        <div style={{ marginTop: '40px' }}>
          <AdminAddGame game={scrapedGame} categories={categories} />
        </div>
      )}
    </>
  );
}
