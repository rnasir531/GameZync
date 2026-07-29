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
      {/* Sleek Cyber Border Badge Container */}
      <div className="header-logo-badge">
        <span className="logo-brand-text">
          <span style={{ color: '#ffffff', textShadow: '0 0 10px rgba(255,255,255,0.4)' }}>GAME</span>
          <span style={{ color: '#10b981', textShadow: '0 0 12px rgba(16, 185, 129, 0.6)' }}>ZYNC</span>
        </span>
      </div>
    </Link>
  );
}
