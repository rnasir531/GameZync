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
        gap: '10px',
        textDecoration: 'none', 
        flexShrink: 0 
      }}
    >
      <img 
        src="/gamezync-logo.png" 
        alt="GameZync Logo" 
        style={{ 
          width: '38px', 
          height: '38px', 
          borderRadius: '50%',
          objectFit: 'cover',
          border: '1.5px solid rgba(16, 185, 129, 0.5)',
          boxShadow: '0 0 14px rgba(16, 185, 129, 0.35)'
        }} 
      />
      <div className="header-logo-badge">
        <span className="logo-brand-text">
          <span style={{ color: 'var(--text-color)', fontWeight: '900' }}>GAME</span>
          <span style={{ color: '#10b981', fontWeight: '900', filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))' }}>ZYNC</span>
        </span>
      </div>
    </Link>
  );
}
