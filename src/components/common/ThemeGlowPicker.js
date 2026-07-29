'use client';
import { useState, useEffect } from 'react';

const GLOW_THEMES = [
  { id: 'emerald', name: 'Emerald Cyber', color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', glow: 'rgba(16, 185, 129, 0.4)' },
  { id: 'cyan', name: 'Cyber Cyan', color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', glow: 'rgba(6, 182, 212, 0.4)' },
  { id: 'violet', name: 'Violet Neon', color: '#a855f7', gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', glow: 'rgba(168, 85, 247, 0.4)' },
  { id: 'amber', name: 'Fire Amber', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', glow: 'rgba(245, 158, 11, 0.4)' },
];

export default function ThemeGlowPicker() {
  const [activeTheme, setActiveTheme] = useState('emerald');
  const [isOpen, setIsOpen] = useState(false);

  const applyGlowTheme = (themeObj) => {
    if (!themeObj) return;
    const root = document.documentElement;
    root.style.setProperty('--primary-color', themeObj.color);
    root.style.setProperty('--primary-hover', themeObj.color);
    root.style.setProperty('--primary-glow', themeObj.glow);
    root.style.setProperty('--accent-gradient', themeObj.gradient);
    localStorage.setItem('playfusion_glow_theme', themeObj.id);
    setActiveTheme(themeObj.id);
  };

  useEffect(() => {
    const savedId = localStorage.getItem('playfusion_glow_theme') || 'emerald';
    const found = GLOW_THEMES.find(t => t.id === savedId) || GLOW_THEMES[0];
    applyGlowTheme(found);
  }, []);

  const currentThemeObj = GLOW_THEMES.find(t => t.id === activeTheme) || GLOW_THEMES[0];

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="icon-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Custom UI Accent Glow Theme"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: `2px solid ${currentThemeObj.color}`,
          background: 'var(--card-bg)',
          color: currentThemeObj.color,
          boxShadow: `0 0 12px ${currentThemeObj.color}44`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '15px',
          transition: 'all 0.25s ease'
        }}
      >
        <i className="fa-solid fa-palette"></i>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '48px',
          right: '0',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '12px',
          width: '190px',
          zIndex: 1000,
          boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          animation: 'fadeInUp 0.25s ease'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fa-solid fa-wand-magic-sparkles"></i> UI Accent Theme
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {GLOW_THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => {
                  applyGlowTheme(theme);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  background: activeTheme === theme.id ? `${theme.color}20` : 'transparent',
                  border: activeTheme === theme.id ? `1px solid ${theme.color}` : '1px solid transparent',
                  color: 'var(--text-color)',
                  fontSize: '13px',
                  fontWeight: activeTheme === theme.id ? '800' : '600',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: theme.gradient, boxShadow: `0 0 8px ${theme.color}` }}></span>
                {theme.name}
                {activeTheme === theme.id && <i className="fa-solid fa-check" style={{ marginLeft: 'auto', color: theme.color, fontSize: '12px' }}></i>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
