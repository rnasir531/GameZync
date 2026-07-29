'use client';
import Link from 'next/link';

export default function HeaderLogo({ settings }) {
  return (
    <Link 
      href="/" 
      className="logo" 
      style={{ 
        cursor: 'pointer', 
        display: 'inline-flex', 
        alignItems: 'center', 
        textDecoration: 'none', 
        flexShrink: 0 
      }}
    >
      <div className="header-logo-badge">
        <span className="logo-brand-text">
          <span style={{ color: 'var(--text-color)', fontWeight: '900' }}>GAMERS</span>
          <span style={{ color: '#10b981', fontWeight: '900', filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))', marginLeft: '3px' }}>CAFE</span>
        </span>
      </div>
    </Link>
  );
}
