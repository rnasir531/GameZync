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

  const onScanClick = () => {
    if (isMobile) {
      alert("💻 Mobile Notice: System Matcher tests PC hardware specs for PC gaming compatibility. Please open GameZync on your PC to scan your desktop/laptop specs!");
      return;
    }
    handleRunTest();
  };

  // MOBILE VIEW: SHOW ONLY CLEAN SCAN PC BUTTON & MOBILE NOTICE (NO SPECS LIST, NO SCORE RING)
  if (isMobile) {
    return (
      <div 
        className="hardware-match-hero-card" 
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '20px 22px',
          marginBottom: '24px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div 
              style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '14px', 
                background: 'rgba(16, 185, 129, 0.12)', 
                border: '1px solid rgba(16, 185, 129, 0.3)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <i className="fa-solid fa-microchip" style={{ fontSize: '20px', color: '#10b981' }}></i>
            </div>
            <div>
              <h4 style={{ margin: 0, fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: '2px' }}>
                System Matcher
              </h4>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-muted)' }}>
                Test PC hardware compatibility for this game.
              </p>
            </div>
          </div>

          <button 
            onClick={onScanClick} 
            disabled={isTesting}
            style={{
              background: '#10b981',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '13px',
              borderRadius: '12px',
              padding: '10px 20px',
              border: 'none',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isTesting ? <><i className="fas fa-spinner fa-spin"></i> Scanning PC...</> : <><i className="fa-solid fa-radar"></i> Scan PC Specs</>}
          </button>
        </div>
      </div>
    );
  }

  // DESKTOP VIEW: IF USER HAS NOT SCANNED PC YET -> INITIAL CALL TO ACTION
  if (!userSpecs || !userSpecs.gpu || !userSpecs.cpu) {
    return (
      <div 
        className="hardware-match-hero-card" 
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '24px 28px',
          marginBottom: '32px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div 
            style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '16px', 
              background: 'rgba(16, 185, 129, 0.12)', 
              border: '1px solid rgba(16, 185, 129, 0.3)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <i className="fa-solid fa-microchip" style={{ fontSize: '24px', color: '#10b981' }}></i>
          </div>
          <div>
            <h4 style={{ margin: 0, fontWeight: '800', fontSize: '1.25rem', color: 'var(--text-color)', marginBottom: '4px' }}>
              Check Hardware Compatibility
            </h4>
            <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-muted)' }}>
              Scan your PC specs using System Matcher to see exact percentage compatibility score for this game.
            </p>
          </div>
        </div>

        <button 
          onClick={onScanClick} 
          disabled={isTesting}
          style={{
            background: '#10b981',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '13.5px',
            borderRadius: '12px',
            padding: '12px 24px',
            border: 'none',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isTesting ? <><i className="fas fa-spinner fa-spin"></i> Scanning PC...</> : <><i className="fa-solid fa-radar"></i> Scan PC Specs</>}
        </button>
      </div>
    );
  }

  if (!matchResult) return null;

  // DESKTOP VIEW: FULL SCORE RING + SPECS LIST
  const score = typeof matchResult.minScore === 'number' && !isNaN(matchResult.minScore) 
    ? Math.min(100, Math.max(0, Math.round(matchResult.minScore))) 
    : (typeof matchResult.overallScore === 'number' ? matchResult.overallScore : 0);

  const strokeOffset = (283 - (283 * score) / 100).toString();
  const strokeColor = score >= 70 ? '#10b981' : (score >= 50 ? '#f59e0b' : '#ef4444');

  return (
    <div 
      className="hardware-match-hero-card" 
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        padding: '24px 28px',
        marginBottom: '32px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* SINGLE MATCH SCORE RING */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative', width: '76px', height: '76px', flexShrink: 0 }}>
            <svg width="76" height="76" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border-color)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="45" fill="none"
                stroke={strokeColor}
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px', color: 'var(--text-color)' }}>
              {score}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: strokeColor, letterSpacing: '0.5px', marginBottom: '4px' }}>
              HARDWARE COMPATIBILITY MATCH
            </div>
            <div style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-color)' }}>
              {score >= 70 ? 'Can Run Smoothly' : (score >= 50 ? 'Playable on Low/Medium' : 'Below Required Specifications')}
            </div>
          </div>
        </div>

        {/* RE-SCAN BUTTON */}
        <button 
          onClick={onScanClick} 
          disabled={isTesting}
          style={{
            background: '#10b981',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '13.5px',
            borderRadius: '12px',
            padding: '12px 24px',
            border: 'none',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isTesting ? <><i className="fas fa-spinner fa-spin"></i> Scanning...</> : <><i className="fa-solid fa-rotate"></i> Re-Scan PC</>}
        </button>
      </div>

      {/* DESKTOP SPECS LIST */}
      {userSpecs && (
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--text-muted)' }}>
          <div><strong style={{ color: 'var(--text-color)' }}>GPU:</strong> {userSpecs.gpu}</div>
          <div><strong style={{ color: 'var(--text-color)' }}>CPU:</strong> {userSpecs.cpu}</div>
          <div><strong style={{ color: 'var(--text-color)' }}>RAM:</strong> {userSpecs.ram} GB</div>
        </div>
      )}
    </div>
  );
}
