'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HardwareMatchScoreCard({ userSpecs, matchResult, isTesting, handleRunTest }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileScanning, setMobileScanning] = useState(false);
  const [showMobileNotice, setShowMobileNotice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
      setIsMobile(mobileCheck);
    }
  }, []);

  const handleMobileScan = () => {
    setMobileScanning(true);
    setTimeout(() => {
      setMobileScanning(false);
      setShowMobileNotice(true);
    }, 1200);
  };

  // 1. MOBILE USERS: INTERACTIVE SCANNER CARD WITH SPINNER & SYSTEM MATCHER NOTICE POPUP
  if (isMobile) {
    return (
      <>
        <div className="scanner-console" style={{ marginBottom: '24px', padding: '20px 16px' }}>
          <div className="scanner-content">
            <div className="scanner-ring" style={{ width: '56px', height: '56px', marginBottom: '12px' }}>
              <i className="fa-solid fa-satellite-dish pulse-icon" style={{ fontSize: '22px' }}></i>
            </div>
            <h3 className="scanner-title" style={{ fontSize: '1rem', marginBottom: '6px' }}>HARDWARE COMPATIBILITY SCANNER</h3>
            <p className="scanner-text" style={{ fontSize: '12.5px', marginBottom: '14px' }}>
              Scan your system hardware specifications to check if your device meets the requirements to run this game smoothly.
            </p>

            <div className="scanner-highlights" style={{ marginBottom: '16px', gap: '6px' }}>
              <div className="scan-badge" style={{ fontSize: '10px', padding: '4px 8px' }}><i className="fa-brands fa-windows"></i> OS</div>
              <div className="scan-badge" style={{ fontSize: '10px', padding: '4px 8px' }}><i className="fa-solid fa-microchip"></i> CPU</div>
              <div className="scan-badge" style={{ fontSize: '10px', padding: '4px 8px' }}><i className="fa-solid fa-vr-cardboard"></i> GPU</div>
              <div className="scan-badge" style={{ fontSize: '10px', padding: '4px 8px' }}><i className="fa-solid fa-memory"></i> RAM</div>
            </div>

            <button 
              type="button" 
              className="scanner-btn" 
              onClick={handleMobileScan}
              disabled={mobileScanning}
              style={{ width: '100%', padding: '12px 18px', fontSize: '13px' }}
            >
              {mobileScanning ? (
                <><i className="fas fa-spinner fa-spin me-2"></i> SCANNING SYSTEM HARDWARE...</>
              ) : (
                <><i className="fa-solid fa-satellite-dish pulse-icon me-2"></i> INITIATE SYSTEM SCAN</>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NOTICE MODAL POPUP */}
        {showMobileNotice && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99999,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setShowMobileNotice(false)}
          >
            <div 
              style={{
                background: 'var(--panel-bg, #111622)',
                border: '1px solid var(--primary-color, #10b981)',
                borderRadius: '20px',
                padding: '24px 20px',
                maxWidth: '420px',
                width: '100%',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                textAlign: 'center',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                style={{ 
                  width: '54px', 
                  height: '54px', 
                  borderRadius: '50%', 
                  background: 'rgba(16, 185, 129, 0.15)', 
                  border: '1.5px solid rgba(16, 185, 129, 0.4)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <i className="fa-solid fa-laptop-code" style={{ fontSize: '24px', color: '#10b981' }}></i>
              </div>

              <h4 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-color)' }}>
                PC Compatibility Notice
              </h4>

              <p style={{ margin: '0 0 20px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Hardware specs auto-detection is designed for <strong style={{ color: 'var(--text-color)' }}>PC & Laptop browsers</strong>. Open <strong style={{ color: '#10b981' }}>Gamer's Cafe</strong> on your desktop computer to scan your hardware specs.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link 
                  href="/system-matcher" 
                  className="scanner-btn" 
                  style={{ textDecoration: 'none', textAlign: 'center', width: '100%', padding: '12px' }}
                >
                  <i className="fa-solid fa-microchip me-2"></i> Open System Matcher
                </Link>

                <button 
                  type="button" 
                  onClick={() => setShowMobileNotice(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    padding: '10px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // 2. DESKTOP / PC USERS - UNSCANNED STATE: SHOW SPINNING SATELLITE DISH SCANNER CONSOLE
  if (!userSpecs || (!userSpecs.gpu && !userSpecs.graphics && !userSpecs.processor && !userSpecs.cpu)) {
    return (
      <div className="scanner-console" style={{ marginBottom: '24px' }}>
        <div className="scanner-content">
          <div className="scanner-ring">
            <i className="fa-solid fa-satellite-dish pulse-icon"></i>
          </div>
          <h3 className="scanner-title">HARDWARE COMPATIBILITY SCANNER</h3>
          <p className="scanner-text">
            Test your PC specifications against this game to check exact percentage chances it will run smoothly.
          </p>

          <div className="scanner-highlights">
            <div className="scan-badge"><i className="fa-brands fa-windows"></i> OS</div>
            <div className="scan-badge"><i className="fa-solid fa-microchip"></i> CPU</div>
            <div className="scan-badge"><i className="fa-solid fa-vr-cardboard"></i> GPU</div>
            <div className="scan-badge"><i className="fa-solid fa-memory"></i> RAM</div>
          </div>

          <button 
            type="button" 
            className="scanner-btn" 
            onClick={handleRunTest}
            disabled={isTesting}
          >
            {isTesting ? (
              <><i className="fas fa-spinner fa-spin me-2"></i> SCANNING PC SPECS...</>
            ) : (
              <><i className="fa-solid fa-satellite-dish pulse-icon me-2"></i> INITIATE PC SCAN</>
            )}
          </button>
        </div>
      </div>
    );
  }

  if (!matchResult) return null;

  // 3. DESKTOP / PC USERS - SCANNED STATE: SHOW PERCENTAGE SCORE & COMPATIBILITY RESULT
  const overallPercentage = matchResult.recScore !== undefined ? matchResult.recScore : matchResult.minScore;
  const isPlayable = overallPercentage >= 50;

  return (
    <div 
      className="hardware-match-hero-card" 
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderLeft: `4px solid ${isPlayable ? '#10b981' : '#ef4444'}`,
        borderRadius: '20px',
        padding: '20px 24px',
        marginBottom: '24px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div 
            style={{ 
              width: '68px', 
              height: '68px', 
              borderRadius: '50%', 
              background: isPlayable ? 'rgba(16, 185, 129, 0.14)' : 'rgba(239, 68, 68, 0.14)', 
              border: `2.5px solid ${isPlayable ? '#10b981' : '#ef4444'}`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              flexShrink: 0,
              boxShadow: isPlayable ? '0 0 25px rgba(16, 185, 129, 0.35)' : '0 0 25px rgba(239, 68, 68, 0.35)'
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: '900', color: isPlayable ? '#10b981' : '#ef4444' }}>{overallPercentage}%</span>
            <span style={{ fontSize: '8.5px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Score</span>
          </div>

          <div>
            <h4 style={{ margin: '0 0 3px', fontWeight: '900', fontSize: '1.2rem', color: 'var(--text-color)', letterSpacing: '-0.3px' }}>
              {isPlayable ? '✅ Great News! Your PC Can Run This Game' : '⚠️ Specs Fall Below Minimum Requirements'}
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              There is a <strong style={{ color: isPlayable ? '#10b981' : '#ef4444' }}>{overallPercentage}% chance</strong> this game will run smoothly on your PC hardware.
            </p>
          </div>
        </div>

        <button 
          onClick={handleRunTest} 
          disabled={isTesting}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            color: 'var(--text-color)',
            fontWeight: '700',
            fontSize: '13px',
            borderRadius: '50px',
            padding: '10px 22px',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.25s ease'
          }}
        >
          {isTesting ? <><i className="fas fa-spinner fa-spin"></i> Rescanning...</> : <><i className="fa-solid fa-rotate-right"></i> Rescan PC</>}
        </button>
      </div>
    </div>
  );
}
