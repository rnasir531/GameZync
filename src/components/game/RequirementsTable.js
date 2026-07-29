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
    { icon: 'fa-brands fa-windows', label: 'OPERATING SYSTEM', value: minOs },
    { icon: 'fa-solid fa-microchip', label: 'PROCESSOR (CPU)', value: minCpu },
    { icon: 'fa-solid fa-memory', label: 'MEMORY (RAM)', value: minRam },
    { icon: 'fa-solid fa-vr-cardboard', label: 'GRAPHICS CARD (GPU)', value: minGpu },
    { icon: 'fa-solid fa-compact-disc', label: 'DIRECTX', value: minDirectX },
    { icon: 'fa-solid fa-hard-drive', label: 'STORAGE SPACE', value: minStorage },
  ];

  const specRowsRec = hasRecSpecs ? [
    { icon: 'fa-brands fa-windows', label: 'OPERATING SYSTEM', value: game.rec_os || minOs },
    { icon: 'fa-solid fa-microchip', label: 'PROCESSOR (CPU)', value: cleanCpuString(game.rec_cpu) },
    { icon: 'fa-solid fa-memory', label: 'MEMORY (RAM)', value: cleanRamString(game.rec_ram, '16 GB RAM') },
    { icon: 'fa-solid fa-vr-cardboard', label: 'GRAPHICS CARD (GPU)', value: game.rec_gpu },
    { icon: 'fa-solid fa-compact-disc', label: 'DIRECTX', value: game.rec_directx || minDirectX },
    { icon: 'fa-solid fa-hard-drive', label: 'STORAGE SPACE', value: game.rec_storage || minStorage },
  ] : [];

  const renderSpecGrid = (specList, accentColor = '#10b981') => (
    <div 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '12px' 
      }}
    >
      {specList.map((item, idx) => (
        <div 
          key={idx}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'var(--search-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '14px 16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease'
          }}
        >
          <div 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: accentColor === '#10b981' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(6, 182, 212, 0.12)',
              border: `1px solid ${accentColor === '#10b981' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(6, 182, 212, 0.3)'}`,
              color: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              flexShrink: 0
            }}
          >
            <i className={item.icon}></i>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
            <span style={{ fontSize: '9.5px', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
              {item.label}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-color)', lineHeight: '1.35', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  // SINGLE REQUIREMENT MODE: Clean grid of 6 spec cards
  if (!hasRecSpecs) {
    return (
      <div className="details-info-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px 24px', marginTop: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
        <h2 className="details-card-title" style={{ color: 'var(--text-color)', fontSize: '1.35rem', fontWeight: '900', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-microchip" style={{ color: 'var(--primary-color)' }}></i> System Requirements
        </h2>

        {renderSpecGrid(specRowsMin, '#10b981')}
      </div>
    );
  }

  // DUAL REQUIREMENT MODE: Side-by-Side Minimum & Recommended Cards
  return (
    <div className="details-info-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px 24px', marginTop: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
      <h2 className="details-card-title" style={{ color: 'var(--text-color)', fontSize: '1.35rem', fontWeight: '900', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <i className="fa-solid fa-microchip" style={{ color: 'var(--primary-color)' }}></i> System Requirements
      </h2>

      <div 
        className="requirements-split-grid" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px' 
        }}
      >
        {/* MINIMUM REQUIREMENTS */}
        <div className="req-box min-req">
          <h3 className="req-box-header min-header" style={{ color: '#10b981', fontSize: '1rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-shield-halved" style={{ fontSize: '14px' }}></i> MINIMUM REQUIREMENTS
          </h3>
          {renderSpecGrid(specRowsMin, '#10b981')}
        </div>

        {/* RECOMMENDED REQUIREMENTS */}
        <div className="req-box rec-req">
          <h3 className="req-box-header rec-header" style={{ color: '#06b6d4', fontSize: '1rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-rocket" style={{ fontSize: '14px' }}></i> RECOMMENDED REQUIREMENTS
          </h3>
          {renderSpecGrid(specRowsRec, '#06b6d4')}
        </div>
      </div>
    </div>
  );
}
