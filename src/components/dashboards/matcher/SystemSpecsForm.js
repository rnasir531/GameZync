'use client';
import { useState, useEffect } from 'react';

export default function SystemSpecsForm({
  scanState,
  specs,
  isFinding,
  handleScan,
  rescan,
  findGames
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
      setIsMobile(checkMobile);
    }
  }, []);

  const onInitiateScanClick = (e) => {
    if (isMobile) {
      e.preventDefault();
      setShowMobileModal(true);
      return;
    }
    handleScan();
  };

  const onRescanClick = (e) => {
    if (isMobile) {
      e.preventDefault();
      setShowMobileModal(true);
      return;
    }
    rescan();
  };

  return (
    <form id="systemMatcherForm" onSubmit={findGames}>
      {(scanState === 'empty' || isMobile) && (
        <div id="matcherEmptyState" className="scanner-console">
          <div className="scanner-content">
            <div className="scanner-ring">
              <i className="fa-solid fa-satellite-dish pulse-icon"></i>
            </div>
            <h4 className="scanner-title">Hardware Scanner</h4>
            <p className="scanner-text">
              We securely scan your system to recommend games that will run perfectly. Detection includes:
            </p>
            <div className="scanner-highlights">
              <span className="scan-badge"><i className="fa-brands fa-windows"></i> OS</span>
              <span className="scan-badge"><i className="fa-solid fa-microchip"></i> CPU</span>
              <span className="scan-badge"><i className="fa-solid fa-vr-cardboard"></i> GPU</span>
              <span className="scan-badge"><i className="fa-solid fa-memory"></i> RAM</span>
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" className="scanner-btn" onClick={onInitiateScanClick}>
                <i className="fa-solid fa-radar"></i> INITIATE PC SCAN
              </button>
            </div>
          </div>
        </div>
      )}

      {scanState === 'scanning' && !isMobile && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
          <h4>Detecting Hardware...</h4>
          <p style={{ color: 'var(--text-muted)' }}>Querying WebGL context and system navigator...</p>
        </div>
      )}

      {scanState === 'detected' && !isMobile && (
        <div id="matcherDetectedState">
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
              <i className="fa-solid fa-circle-check text-success" style={{ fontSize: '1.8rem', color: '#10b981' }}></i>
              <h4 style={{ color: 'var(--text-color)', fontWeight: 800, fontFamily: 'var(--font-heading)', fontSize: '1.5rem', margin: 0 }}>Scan Complete</h4>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Hardware detected successfully.</p>
          </div>
          
          <div className="compact-specs-panel">
            <div className="spec-item">
              <div className="spec-icon"><i className="fa-brands fa-windows"></i></div>
              <div className="spec-info">
                <span className="spec-label">OS</span>
                <span className="spec-value" title="Windows OS">{specs.os_raw || specs.os || 'Windows 10/11 64-bit'}</span>
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-icon"><i className="fa-solid fa-microchip"></i></div>
              <div className="spec-info">
                <span className="spec-label">Processor</span>
                <span className="spec-value" title="CPU">{specs.processor_raw || specs.processor || 'Intel Core i5-6200U @ 2.30GHz'}</span>
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-icon"><i className="fa-solid fa-vr-cardboard"></i></div>
              <div className="spec-info">
                <span className="spec-label">Graphics</span>
                <span className="spec-value" title="GPU">{specs.graphics_raw || specs.graphics || 'Intel(R) HD Graphics 520'}</span>
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-icon"><i className="fa-solid fa-memory"></i></div>
              <div className="spec-info">
                <span className="spec-label">Memory</span>
                <span className="spec-value" title="RAM">{specs.ram_raw || (specs.ram ? `${specs.ram} GB` : '16 GB')}</span>
              </div>
            </div>
          </div>

          <div className="text-center" style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <button type="button" className="matcher-btn" onClick={onRescanClick} style={{ marginTop: 0, background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '12px 25px', borderRadius: '50px', fontSize: '0.95rem' }}>
              <i className="fa-solid fa-rotate-right me-2"></i> Rescan
            </button>
            <button type="submit" className="matcher-btn" disabled={isFinding} style={{ marginTop: 0, background: 'var(--text-color)', color: 'var(--card-bg)', padding: '12px 25px', borderRadius: '50px', fontSize: '0.95rem' }}>
              {isFinding ? <i className="fa-solid fa-spinner fa-spin me-2"></i> : <i className="fa-solid fa-search me-2"></i>} Find Games
            </button>
          </div>
        </div>
      )}

      {/* CUSTOM ULTRA-SLEEK CYBER POPUP MODAL FOR MOBILE USERS */}
      {showMobileModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.25s ease'
          }}
          onClick={() => setShowMobileModal(false)}
        >
          <div 
            style={{
              background: 'var(--card-bg)',
              border: '1.5px solid var(--border-color)',
              borderRadius: '24px',
              padding: '30px 24px',
              maxWidth: '380px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 25px rgba(16, 185, 129, 0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowMobileModal(false)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <i className="fa-solid fa-times"></i>
            </button>

            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
                border: '1.5px solid rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                fontSize: '28px',
                color: '#10b981',
                boxShadow: '0 0 24px rgba(16, 185, 129, 0.25)'
              }}
            >
              <i className="fa-solid fa-laptop"></i>
            </div>

            <h3 style={{ margin: '0 0 10px', fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-color)' }}>
              PC Specs Required
            </h3>

            <p style={{ margin: '0 0 24px', fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              System Matcher evaluates <strong>PC hardware specs</strong> for PC gaming compatibility. Please open <strong>GameZync</strong> on your PC or Laptop to scan your desktop hardware!
            </p>

            <button 
              type="button"
              onClick={() => setShowMobileModal(false)}
              style={{
                width: '100%',
                background: 'var(--accent-gradient)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '14px',
                padding: '12px',
                borderRadius: '14px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px var(--primary-glow)'
              }}
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
