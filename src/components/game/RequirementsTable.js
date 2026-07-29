'use client';
import React from 'react';

const cleanRamString = (val, fallback) => {
  if (!val) return fallback;
  const str = String(val).trim();
  if (/gb/i.test(str) && /ram/i.test(str)) return str;
  if (/gb/i.test(str)) return `${str} RAM`;
  return `${str} GB RAM`;
};

const cleanCpuString = (str) => {
  if (!str) return 'Intel Core i5 / AMD FX';
  return str.replace(/ryzen 5 ryzen 5/gi, 'Ryzen 5')
            .replace(/ryzen 3 ryzen 3/gi, 'Ryzen 3')
            .replace(/ryzen 7 ryzen 7/gi, 'Ryzen 7')
            .replace(/core i5 core i5/gi, 'Core i5')
            .replace(/core i7 core i7/gi, 'Core i7')
            .trim();
};

export default function RequirementsTable({ game }) {
  // Read exact real database fields
  const minOs = game.os || game.min_os || 'Windows 10 (64-bit)';
  const minCpu = cleanCpuString(game.processor || game.min_cpu || 'Intel Core i5 / AMD FX');
  const minRam = cleanRamString(game.ram, '8 GB RAM');
  const minGpu = game.graphics_card || game.graphics || game.min_gpu || 'NVIDIA GTX 760 / AMD Radeon R9';
  const minDirectX = game.directx || game.min_directx || 'Version 11';
  const minStorage = game.storage || (game.file_size ? `${game.file_size} available space` : '50 GB available space');

  // Strict check: Only render Recommended box if Recommended Specs exist in DB!
  const hasRecSpecs = !!(game.rec_cpu || game.rec_gpu || game.rec_os || game.rec_ram);

  const specRowsMin = [
    { label: 'OS:', value: minOs },
    { label: 'Processor:', value: minCpu },
    { label: 'Memory:', value: minRam },
    { label: 'Graphics:', value: minGpu },
    { label: 'DirectX:', value: minDirectX },
    { label: 'Storage:', value: minStorage },
  ];

  const specRowsRec = hasRecSpecs ? [
    { label: 'OS:', value: game.rec_os || minOs },
    { label: 'Processor:', value: cleanCpuString(game.rec_cpu) },
    { label: 'Memory:', value: cleanRamString(game.rec_ram, '16 GB RAM') },
    { label: 'Graphics:', value: game.rec_gpu },
    { label: 'DirectX:', value: game.rec_directx || minDirectX },
    { label: 'Storage:', value: game.rec_storage || minStorage },
  ] : [];

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '90px 1fr',
    gap: '10px',
    alignItems: 'baseline',
    fontSize: '13px',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    minWidth: 0,
    overflowWrap: 'anywhere',
    wordBreak: 'break-word'
  };

  const labelStyle = {
    color: 'var(--text-color)',
    fontWeight: '800',
    flexShrink: 0
  };

  const valueStyle = {
    color: 'var(--text-muted)',
    minWidth: 0,
    overflowWrap: 'anywhere',
    wordBreak: 'break-word'
  };

  // SINGLE REQUIREMENT MODE: Clean, non-repetitive single-card layout
  if (!hasRecSpecs) {
    return (
      <div className="details-info-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px 20px', marginTop: '32px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
        <h2 className="details-card-title" style={{ color: 'var(--text-color)', fontSize: '1.35rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-microchip" style={{ color: 'var(--primary-color)' }}></i> System Requirements
        </h2>

        <div className="req-box" style={{ background: 'var(--search-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '20px 22px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px 24px' }}>
            {specRowsMin.map((row, idx) => (
              <div key={idx} style={rowStyle}>
                <span style={labelStyle}>{row.label}</span>
                <span style={valueStyle}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // DUAL REQUIREMENT MODE: Side-by-Side Minimum & Recommended Cards
  return (
    <div className="details-info-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px 20px', marginTop: '32px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
      <h2 className="details-card-title" style={{ color: 'var(--text-color)', fontSize: '1.35rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <i className="fa-solid fa-microchip" style={{ color: 'var(--primary-color)' }}></i> System Requirements
      </h2>

      <div 
        className="requirements-split-grid" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px' 
        }}
      >
        {/* MINIMUM REQUIREMENTS */}
        <div className="req-box min-req" style={{ background: 'var(--search-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '20px 22px', overflow: 'hidden' }}>
          <h3 className="req-box-header min-header" style={{ color: '#10b981', fontSize: '1rem', fontWeight: '800', marginBottom: '18px', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-shield-halved" style={{ fontSize: '14px' }}></i> MINIMUM REQUIREMENTS
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {specRowsMin.map((row, idx) => (
              <div key={idx} style={rowStyle}>
                <span style={labelStyle}>{row.label}</span>
                <span style={valueStyle}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RECOMMENDED REQUIREMENTS */}
        <div className="req-box rec-req" style={{ background: 'var(--search-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '20px 22px', overflow: 'hidden' }}>
          <h3 className="req-box-header rec-header" style={{ color: '#06b6d4', fontSize: '1rem', fontWeight: '800', marginBottom: '18px', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-rocket" style={{ fontSize: '14px' }}></i> RECOMMENDED REQUIREMENTS
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {specRowsRec.map((row, idx) => (
              <div key={idx} style={rowStyle}>
                <span style={labelStyle}>{row.label}</span>
                <span style={valueStyle}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
