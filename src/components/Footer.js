'use client';
import { useState, useEffect } from 'react';
import FooterCtaBanner from './footer/FooterCtaBanner';
import FooterMainColumns from './footer/FooterMainColumns';
import FooterBottomBar from './footer/FooterBottomBar';

export default function Footer() {
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
      .catch(err => console.error('Footer settings fetch error:', err));
  }, []);

  return (
    <>
      {settings?.ad_footer && (
        <div 
          className="footer-ad-container" 
          dangerouslySetInnerHTML={{ __html: settings.ad_footer }} 
          style={{ textAlign: 'center', marginBottom: '20px' }}
        ></div>
      )}
      
      <footer className="site-footer">
        <FooterMainColumns settings={settings} />
        <FooterBottomBar settings={settings} />
      </footer>
    </>
  );
}
