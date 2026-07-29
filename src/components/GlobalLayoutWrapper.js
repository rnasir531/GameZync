'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function GlobalLayoutWrapper({ children, siteSettings }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.warn('PWA SW:', err));
    }
  }, []);

  if (isAdmin) {
    return <>{children}</>;
  }

  if (siteSettings?.maintenance_mode === 'true') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-color)', color: 'var(--text-color)', textAlign: 'center', padding: '20px' }}>
        <i className="fa-solid fa-person-digging text-warning" style={{ fontSize: '80px', marginBottom: '20px' }}></i>
        <h1 style={{ fontWeight: 'bold', fontSize: '36px', marginBottom: '10px' }}>Site Under Maintenance</h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '600px' }}>
          We are currently performing scheduled maintenance to improve your experience. We will be back online shortly. Thank you for your patience!
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="page-wrapper">
        <div className="main-content">
          {children}
        </div>
        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
}
