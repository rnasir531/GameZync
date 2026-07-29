'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LiveSearch from '../common/LiveSearch';

export default function HeaderActions({ theme, toggleTheme, onRequestModalOpen }) {
  const router = useRouter();
  const [isRolling, setIsRolling] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRandomClick = async () => {
    if (isRolling) return;
    setIsRolling(true);
    try {
      let excludeParam = '';
      if (typeof window !== 'undefined') {
        const match = window.location.pathname.match(/\/game\/([^\/]+)/);
        if (match && match[1]) {
          excludeParam = `&exclude=${encodeURIComponent(match[1])}`;
        }
      }
      const res = await fetch(`/api/games/random?t=${Date.now()}${excludeParam}`, {
        cache: 'no-store',
        headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });
      const data = await res.json();
      if (data.success && data.gameId) {
        window.location.href = `/game/${data.gameId}`;
      }
    } catch (err) {
      console.error('Randomizer error:', err);
    } finally {
      setTimeout(() => setIsRolling(false), 800);
    }
  };

  return (
    <div className="topbar-actions" suppressHydrationWarning>
      <LiveSearch />
      
      <button 
        className={`icon-btn random-action-btn ${isRolling ? 'rolling' : ''}`} 
        onClick={handleRandomClick} 
        title="Discover Random Game"
      >
        <i className="fa-solid fa-dice-five"></i>
      </button>

      <button className="icon-btn theme-toggle-btn" onClick={toggleTheme} title="Toggle Dark/Light Mode" suppressHydrationWarning>
        {mounted && theme === 'dark' ? (
          <div className="celestial-scene sun-scene">
            <i className="fa-solid fa-sun sun-body"></i>
            <i className="fa-solid fa-cloud cloud-tiny cloud-1"></i>
            <i className="fa-solid fa-cloud cloud-tiny cloud-2"></i>
          </div>
        ) : (
          <div className="celestial-scene moon-scene">
            <i className="fa-solid fa-moon moon-body"></i>
            <i className="fa-solid fa-star star-tiny star-1"></i>
            <i className="fa-solid fa-star star-tiny star-2"></i>
            <i className="fa-solid fa-star star-tiny star-3"></i>
          </div>
        )}
      </button>

      <button className="request-btn d-none d-lg-flex" onClick={onRequestModalOpen}>
        <i className="fa-solid fa-plus-circle"></i> <span>Request</span>
      </button>
    </div>
  );
}
