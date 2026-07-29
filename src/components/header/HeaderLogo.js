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
      <img 
        src="/gamezync-banner-logo.png" 
        alt="GameZync" 
        style={{ 
          height: '40px', 
          width: 'auto',
          maxWidth: '190px',
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))'
        }} 
      />
    </Link>
  );
}
