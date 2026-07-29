'use client';
import React, { useState, useEffect } from 'react';

export default function HardwareMatchScoreCard({ userSpecs, matchResult, isTesting, handleRunTest }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
      setIsMobile(mobileCheck);
    }
  }, []);

  // 1. MOBILE USERS: SHOW DIRECT INFORMATIVE MESSAGE CARD
  if (isMobile) {
    return (
      <div 
        className="hardware-match-hero-card" 
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '18px 20px',
          marginBottom: '24px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '12px', 
              background: 'rgba(16, 185, 129, 0.12)', 
              border: '1px solid rgba(16, 185, 129, 0.25)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <i className="fa-solid fa-laptop-code" style={{ fontSize: '19px', color: '#10b981' }}></i>
          </div>
          <div>
            <h4 style={{ margin: '0 0 3px', fontWeight: '800', fontSize: '1rem', color: 'var(--text-color)' }}>
              Hardware Compatibility Scan
            </h4>
            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Hardware specs scanning works on <strong style={{ color: 'var(--text-color)' }}>PC / Laptop browsers only</strong>. Open GameZync on your PC to test compatibility.
            </p>
          </div>
        </div>
      </div>
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
        borderRadius: '24px',
        padding: '24px 28px',
        marginBottom: '28px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div 
            style={{ 
              width: '76px', 
              height: '76px', 
              borderRadius: '50%', 
              background: isPlayable ? 'rgba(16, 185, 129, 0.14)' : 'rgba(239, 68, 68, 0.14)', 
              border: `2.5px solid ${isPlayable ? '#10b981' : '#ef4444'}`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              flexShrink: 0,
              boxShadow: isPlayable ? '0 0 20px rgba(16, 185, 129, 0.3)' : '0 0 20px rgba(239, 68, 68, 0.3)'
            }}
          >
            <span style={{ fontSize: '22px', fontWeight: '900', color: isPlayable ? '#10b981' : '#ef4444' }}>{overallPercentage}%</span>
            <span style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Score</span>
          </div>

          <div>
            <h4 style={{ margin: '0 0 4px', fontWeight: '800', fontSize: '1.2rem', color: 'var(--text-color)' }}>
              {isPlayable ? '✅ Great News! Your PC Can Run This Game' : '⚠️ Specs Fall Below Minimum Requirements'}
            </h4>
            <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-muted)' }}>
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
