'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error(err));
  }, []);

  const isActive = (path) => pathname === path ? 'active' : '';

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-section">
          <ul className="sidebar-links">
            <li className={isActive('/')} title="Go Home" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <i className="fa-solid fa-compass c-primary"></i> <span>Home</span>
            </li>
            <hr className="sidebar-divider" />
            
            <li className={isActive('/library')} title="Browse Library" onClick={() => navigate('/library')} style={{ cursor: 'pointer' }}>
              <i className="fa-solid fa-layer-group c-success"></i> <span>Library</span>
            </li>
            
            <li className={isActive('/instant')} title="Play Web Games" onClick={() => navigate('/instant')} style={{ cursor: 'pointer' }}>
              <i className="fa-solid fa-bolt-lightning c-warning"></i> <span>Instant Games</span>
            </li>
            
            <li className={isActive('/torrent-games')} title="Torrent Games" onClick={() => navigate('/torrent-games')} style={{ cursor: 'pointer' }}>
              <i className="fa-solid fa-magnet c-primary"></i> <span>Torrent Games</span>
            </li>
            
            <hr className="sidebar-divider" />
            
            <li className={isActive('/categories')} title="Explore Categories" onClick={() => navigate('/categories')} style={{ cursor: 'pointer' }}>
              <i className="fa-solid fa-tags c-info"></i> <span>Categories</span>
            </li>
            
            <hr className="sidebar-divider" />
            
            <li className={isActive('/low-end')} title="Low Specs Games" onClick={() => navigate('/low-end')} style={{ cursor: 'pointer' }}>
              <i className="fa-solid fa-laptop-code c-special1"></i> <span>Low End Games</span>
            </li>
            
            <li className={isActive('/high-end')} title="High Specs Games" onClick={() => navigate('/high-end')} style={{ cursor: 'pointer' }}>
              <i className="fa-solid fa-display c-special2"></i> <span>High End Games</span>
            </li>
            
            <hr className="sidebar-divider" />
            
            <li className={isActive('/system-matcher')} title="Can I Run It?" onClick={() => navigate('/system-matcher')} style={{ cursor: 'pointer' }}>
              <i className="fa-solid fa-microchip c-danger"></i> <span>System Matcher</span>
            </li>
          </ul>
        </div>
        <div className="sidebar-section">
          <hr className="sidebar-divider" />
          <ul className="sidebar-links">
            <li className={isActive('/submit-game')} title="Submit Your Game" onClick={() => navigate('/submit-game')} style={{ cursor: 'pointer' }}>
              <i className="fa-solid fa-upload c-success"></i> <span>Submit Game</span>
            </li>
          </ul>
        </div>
        
        {/* Social Links from DB settings if available */}
        {settings && (settings.discord_link || settings.youtube_link || settings.telegram_link) && (
          <div className="sidebar-section sidebar-socials" style={{ padding: '15px 20px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px', display: 'block', marginBottom: '10px' }}>Join Community</span>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {settings.discord_link && (
                <a href={settings.discord_link} target="_blank" rel="noopener noreferrer" style={{ color: '#5865F2', fontSize: '18px' }} title="Discord">
                  <i className="fa-brands fa-discord"></i>
                </a>
              )}
              {settings.youtube_link && (
                <a href={settings.youtube_link} target="_blank" rel="noopener noreferrer" style={{ color: '#FF0000', fontSize: '18px' }} title="YouTube">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              )}
              {settings.telegram_link && (
                <a href={settings.telegram_link} target="_blank" rel="noopener noreferrer" style={{ color: '#0088cc', fontSize: '18px' }} title="Telegram">
                  <i className="fa-brands fa-telegram"></i>
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
