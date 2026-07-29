'use client';
import React, { useState, useEffect } from 'react';

export default function HardwareMatchScoreCard({ userSpecs, matchResult, isTesting, handleRunTest }) {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
      setIsMobile(mobileCheck);
    }
  }, []);

  const onScanClick = () => {
    if (isMobile) {
      setShowMobileModal(true);
      return;
    }
    handleRunTest();
  };

  // 1. MOBILE OR UNSCANNED DESKTOP VIEW: SHOW SPIN SCANNER CONSOLE WITH SATELLITE DISH ANIMATION
  if (isMobile || !userSpecs || (!userSpecs.gpu && !userSpecs.graphics && !userSpecs.processor && !userSpecs.cpu)) {
    return (
      <>
        <div className="scanner-console" style={{ marginBottom: '24px' }}>
          <div className="scanner-content">
            <div className="scanner-ring">
              <i className="fa-solid fa-satellite-dish pulse-icon"></i>
            </div>
            <h3 className="scanner-title">HARDWARE SCANNER</h3>
            <p className="scanner-text">
              Test your PC hardware specifications against this game to check exact compatibility score.
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
              onClick={onScanClick}
              disabled={isTesting}
            >
              {isTesting ? (
                <><i className="fas fa-spinner fa-spin"></i> SCANNING PC...</>
              ) : (
                <><i className="fa-solid fa-satellite-dish pulse-icon"></i> INITIATE PC SCAN</>
              )}
            </button>
          </div>
        </div>

        {/* CUSTOM ULTRA-SLEEK CYBER POPUP MODAL FOR MOBILE USERS */}
        {isMobile && showMobileModal && (
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
                  borderRadius: '20px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.25)'
                }}
              >
                <i className="fa-solid fa-laptop-code" style={{ fontSize: '28px', color: '#10b981' }}></i>
              </div>

              <h3 style={{ margin: '0 0 10px', fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-color)', fontFamily: 'var(--font-heading)' }}>
                PC Required for Scan
              </h3>

              <p style={{ margin: '0 0 22px', fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Hardware specs scanning works on <strong style={{ color: 'var(--text-color)' }}>PC / Laptop browsers only</strong>. Mobile specs (Android / iOS) cannot be scanned for PC game compatibility.
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
                  padding: '12px 20px',
                  borderRadius: '14px',
                  border: 'none',
                  boxShadow: '0 4px 16px var(--primary-glow)',
                  cursor: 'pointer',
                  letterSpacing: '0.5px'
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

  if (!matchResult) return null;

  // 2. SCANNED DESKTOP VIEW: SCORE RING & BREAKDOWN
  const overallPercentage = matchResult.recScore !== undefined ? matchResult.recScore : matchResult.minScore;
  const isPlayable = overallPercentage >= 50;

  return (
    <div 
      className="hardware-match-hero-card" 
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        padding: '24px 28px',
        marginBottom: '32px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div 
            style={{ 
              width: '72px', 
              height: '72px', 
              borderRadius: '50%', 
              background: isPlayable ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', 
              border: `2px solid ${isPlayable ? '#10b981' : '#ef4444'}`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              flexShrink: 0
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: '900', color: isPlayable ? '#10b981' : '#ef4444' }}>{overallPercentage}%</span>
            <span style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Match</span>
          </div>

          <div>
            <h4 style={{ margin: 0, fontWeight: '800', fontSize: '1.25rem', color: 'var(--text-color)', marginBottom: '4px' }}>
              {isPlayable ? 'Great News! Your PC Can Run This Game' : 'Your PC Specs fall below requirements'}
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              Hardware scanned successfully. Overall compatibility score is <strong>{overallPercentage}%</strong>.
            </p>
          </div>
        </div>

        <button 
          onClick={onScanClick} 
          disabled={isTesting}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-color)',
            fontWeight: '700',
            fontSize: '13px',
            borderRadius: '12px',
            padding: '10px 20px',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isTesting ? <><i className="fas fa-spinner fa-spin"></i> Rescanning...</> : <><i className="fa-solid fa-rotate-right"></i> Rescan PC</>}
        </button>
      </div>
    </div>
  );
}
