'use client';
import { useState, useEffect } from 'react';
import { animateThemeToggle } from '@/lib/themeToggleUtil';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    // Initial load
    const stored = localStorage.getItem('theme') || (document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    setTheme(stored);
  }, []);

  const toggleTheme = (e) => {
    animateThemeToggle(e, theme || 'dark', setTheme);
  };

  if (!theme) return <div style={{ width: '40px', height: '40px' }}></div>; // placeholder to prevent layout shift

  return (
    <button 
      onClick={toggleTheme} 
      className="btn" 
      style={{ 
        background: 'transparent', 
        border: 'none', 
        color: 'var(--text-color)', 
        fontSize: '20px', 
        cursor: 'pointer',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background 0.2s'
      }}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      {theme === 'dark' ? <i className="fa-regular fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
    </button>
  );
}
