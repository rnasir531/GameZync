'use client';
import { useState, useEffect } from 'react';

export default function PwaInstallBtn() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.warn('PWA SW Registration:', err);
      });
    }

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowModal(true);
    }
  };

  if (!isMounted) return null;

  if (isInstalled) {
    return (
      <div 
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '20px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid var(--primary-color)',
          color: 'var(--primary-color)',
          fontSize: '12px',
          fontWeight: '700'
        }}
        title="PlayFusion Desktop App Installed"
      >
        <i className="fa-solid fa-circle-check"></i>
        <span>Desktop App Active</span>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="btn install-app-btn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '12px',
          background: 'var(--accent-gradient)',
          color: '#fff',
          fontWeight: '800',
          fontSize: '13px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 14px var(--primary-glow)',
          transition: 'all 0.25s ease'
        }}
        title="Install PlayFusion PRO as Windows Desktop App"
      >
        <i className="fa-solid fa-desktop"></i>
        <span>Install App</span>
      </button>

      {/* PWA INSTALLATION INSTRUCTION MODAL */}
      {showModal && (
        <div 
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              animation: 'scaleUp 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-color)' }}>
                <i className="fa-solid fa-desktop text-primary"></i> Install Desktop App
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              PlayFusion PRO ko apne Windows PC par standalone Desktop Application ke tor par install karne ke liye:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '14px', background: 'var(--search-bg)', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', flexShrink: 0 }}>1</div>
                <span style={{ fontSize: '13.5px', color: 'var(--text-color)', fontWeight: '600' }}>
                  Apne browser (Chrome/Edge) ke top address bar par <strong>Install Icon (⊕ / Computer Icon)</strong> par click karein.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '14px', background: 'var(--search-bg)', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', flexShrink: 0 }}>2</div>
                <span style={{ fontSize: '13.5px', color: 'var(--text-color)', fontWeight: '600' }}>
                  <strong>"Install PlayFusion PRO"</strong> button select karein.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '14px', background: 'var(--search-bg)', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', flexShrink: 0 }}>3</div>
                <span style={{ fontSize: '13.5px', color: 'var(--text-color)', fontWeight: '600' }}>
                  PlayFusion PRO aap ke Windows Taskbar &amp; Start Menu par native app ki tarah add ho jayegi!
                </span>
              </div>
            </div>

            <button 
              onClick={() => setShowModal(false)}
              className="btn"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                background: 'var(--accent-gradient)',
                color: '#fff',
                fontWeight: '800',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
