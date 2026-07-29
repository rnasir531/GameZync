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

  // MOBILE VIEW: SHOW ONLY CLEAN SCAN PC BUTTON & SLEEK CUSTOM POPUP MODAL
  if (isMobile) {
    return (
      <>
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

        {/* CUSTOM ULTRA-SLEEK CYBER POPUP MODAL */}
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
              {/* Close Icon Button */}
              <button
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
                System Matcher evaluates <strong>PC hardware specs</strong> for PC gaming compatibility. Please open <strong>GameZync</strong> on your PC or Laptop to test your desktop specs!
              </p>

              <button 
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
      </>
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
