'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomBar({ onRequestModalOpen }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path) => (mounted && pathname === path) ? 'active' : '';

  return (
    <nav className="mobile-bottom-dock d-lg-none" suppressHydrationWarning>
      <div className="dock-inner">
        <Link href="/" className={`dock-item ${isActive('/')}`}>
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </Link>

        <Link href="/library" className={`dock-item ${isActive('/library')}`}>
          <i className="fa-solid fa-gamepad"></i>
          <span>Library</span>
        </Link>

        <Link href="/instant" className={`dock-item ${isActive('/instant')}`}>
          <i className="fa-solid fa-bolt-lightning"></i>
          <span>Instant</span>
        </Link>

        <Link href="/categories" className={`dock-item ${isActive('/categories')}`}>
          <i className="fa-solid fa-tags"></i>
          <span>Categories</span>
        </Link>

        <Link href="/system-matcher" className={`dock-item ${isActive('/system-matcher')}`}>
          <i className="fa-solid fa-microchip"></i>
          <span>Matcher</span>
        </Link>

        <button 
          className="dock-item dock-request-btn"
          onClick={onRequestModalOpen}
        >
          <i className="fa-solid fa-plus-circle"></i>
          <span>Request</span>
        </button>
      </div>
    </nav>
  );
}
