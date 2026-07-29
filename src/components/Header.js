'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import HeaderLogo from './header/HeaderLogo';
import HeaderNavLinks from './header/HeaderNavLinks';
import HeaderActions from './header/HeaderActions';
import MobileBottomBar from './common/MobileBottomBar';
import RequestGameModal from './common/RequestGameModal';
import { animateThemeToggle } from '@/lib/themeToggleUtil';

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState('light');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then(res => {
        if (!res.ok) return {};
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) return {};
        return res.json();
      })
      .then(data => setSettings(data))
      .catch(err => console.error('Header settings fetch error:', err));
  }, []);

  useEffect(() => {
    const handleOpenModal = () => setIsRequestModalOpen(true);
    window.addEventListener('openRequestModal', handleOpenModal);
    return () => window.removeEventListener('openRequestModal', handleOpenModal);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark-theme');
      setTheme('dark');
      if (!storedTheme) localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = (e) => {
    animateThemeToggle(e, theme, setTheme);
  };

  const isActive = (path) => pathname === path ? 'active' : '';

  const navItems = [
    { path: '/library', label: 'Library', icon: 'fa-gamepad' },
    { path: '/instant', label: 'Instant Games', icon: 'fa-bolt-lightning' },
    { path: '/categories', label: 'Categories', icon: 'fa-tags' },
    { path: '/system-matcher', label: 'Matcher', icon: 'fa-microchip' }
  ];

  return (
    <>
      {settings?.ad_header && (
        <div className="header-ad-container" dangerouslySetInnerHTML={{ __html: settings.ad_header }} style={{ textAlign: 'center', background: 'var(--card-bg)' }}></div>
      )}
      
      <header className="topbar">
        <div className="topbar-inner">
          <HeaderLogo settings={settings} />
          
          <HeaderNavLinks navItems={navItems} isActive={isActive} />
          
          <HeaderActions 
            theme={theme} 
            toggleTheme={toggleTheme} 
            onRequestModalOpen={() => setIsRequestModalOpen(true)}
          />
        </div>
      </header>

      {/* FLOATING MOBILE BOTTOM NAVIGATION DOCK */}
      <MobileBottomBar onRequestModalOpen={() => setIsRequestModalOpen(true)} />

      <RequestGameModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />
    </>
  );
}
