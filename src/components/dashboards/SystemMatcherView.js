'use client';

import { useState, useEffect } from 'react';
import { saveUserData, getUserData, clearUserData } from '@/lib/clientStorage';
import { calculateCompatibility, getCompatibilityStatus } from '@/lib/compatibilityCalculator';
import SystemSpecsForm from './matcher/SystemSpecsForm';
import MatchResultsList from './matcher/MatchResultsList';

export default function SystemMatcherView({ allGames }) {
  const [scanState, setScanState] = useState('empty'); // 'empty' | 'scanning' | 'detected'
  const [specs, setSpecs] = useState({ os: '', processor: '', graphics: '', ram: '', os_raw: '', processor_raw: '', graphics_raw: '', ram_raw: '' });
  const [isFinding, setIsFinding] = useState(false);
  const [matchedGames, setMatchedGames] = useState(null);

  useEffect(() => {
    const saved = getUserData('nsgames_specs');
    if (saved) {
      setSpecs(saved);
      setScanState('detected');
    }
  }, []);

  const handleScan = () => {
    setScanState('scanning');
    
    // Hardware scan simulation
    setTimeout(() => {
      const ramGB = navigator.deviceMemory || 8;
      const cores = navigator.hardwareConcurrency || 4;
      
      let gpuName = 'Standard Integrated Graphics';
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          let rawGpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (rawGpu.startsWith('ANGLE')) {
            const parts = rawGpu.split(',');
            if (parts.length > 1) {
              gpuName = parts[1].split('(0x')[0].split('Direct3D')[0].trim();
            } else {
              gpuName = rawGpu;
            }
          } else {
            gpuName = rawGpu;
          }
        }
      } catch (e) {}

      let osName = 'Windows 10 Pro 64-bit';
      if (navigator.userAgent.includes('Mac')) osName = 'macOS';
      if (navigator.userAgent.includes('Linux')) osName = 'Linux';

      let cpuModel = `Intel Core i5-6200U @ 2.30GHz`;
      const gpuLower = gpuName.toLowerCase();
      if (gpuLower.includes('hd graphics 520')) {
        cpuModel = 'Intel Core i5-6200U @ 2.30GHz';
      } else if (gpuLower.includes('uhd')) {
        cpuModel = cores >= 8 ? 'Intel Core i7-10700K @ 3.80GHz' : 'Intel Core i5-10400 @ 2.90GHz';
      } else if (gpuLower.includes('radeon')) {
        cpuModel = cores >= 12 ? 'AMD Ryzen 9 5900X @ 3.70GHz' : 'AMD Ryzen 5 5600G @ 3.90GHz';
      } else if (gpuLower.includes('rtx') || gpuLower.includes('gtx')) {
        cpuModel = cores >= 16 ? 'Intel Core i9-13900K @ 3.00GHz' : (cores >= 12 ? 'Intel Core i7-12700K @ 3.60GHz' : 'Intel Core i5-12400F @ 2.50GHz');
      } else {
        if (cores >= 16) cpuModel = 'Intel Core i9-13900K @ 3.00GHz';
        else if (cores >= 12) cpuModel = 'AMD Ryzen 9 5900X @ 3.70GHz';
        else if (cores >= 8) cpuModel = 'Intel Core i7-9700K @ 3.60GHz';
        else if (cores >= 6) cpuModel = 'AMD Ryzen 5 3600 @ 3.60GHz';
        else if (cores >= 4) cpuModel = 'Intel Core i5-6200U @ 2.30GHz';
        else cpuModel = 'Intel Core i3-7100 @ 3.90GHz';
      }

      const detected = {
        os: osName,
        processor: cpuModel,
        graphics: gpuName,
        ram: ramGB.toString(),
        os_raw: osName,
        processor_raw: cpuModel,
        graphics_raw: gpuName,
        ram_raw: `${ramGB} GB`
      };
      
      setSpecs(detected);
      setScanState('detected');
      
      saveUserData('nsgames_specs', detected);
    }, 1200);
  };

  const rescan = () => {
    setScanState('empty');
    setMatchedGames(null);
    clearUserData('nsgames_specs');
    handleScan();
  };

  const findGames = (e) => {
    e.preventDefault();
    setIsFinding(true);
    
    setTimeout(() => {
      const matchedWithPercentage = (allGames || []).map(g => {
        const result = calculateCompatibility(specs, g);
        const matchPercentage = typeof result === 'object' ? (result.recScore !== undefined ? result.recScore : result.minScore) : result;
        return {
          ...g,
          matchPercentage,
          matchStatus: typeof result === 'object' ? result.statusText : 'Playable'
        };
      })
      .filter(g => g.matchPercentage >= 40)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

      setMatchedGames(matchedWithPercentage);
      setIsFinding(false);
    }, 600);
  };

  return (
    <div className="static-page-container" id="system-matcher-view" style={{ paddingBottom: '10px', animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <div className="matcher-hero" style={{ marginBottom: '20px' }}>
        <h2 style={{ fontWeight: 800, marginBottom: '6px', color: 'var(--text-color)' }}>
          <i className="fa-solid fa-microchip" style={{ color: 'var(--primary-color)' }}></i> Can I Run It?
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-color)', opacity: 0.7, margin: 0 }}>
          Check if games will run smoothly on your PC.
        </p>
      </div>

      {/* SPECS FORM (SINGLE UNIFIED CARD CONTAINER) */}
      <div style={{ maxWidth: '840px', margin: '0 auto 20px' }}>
        <SystemSpecsForm 
          scanState={scanState}
          specs={specs}
          isFinding={isFinding}
          handleScan={handleScan}
          rescan={rescan}
          findGames={findGames}
        />
      </div>

      {/* MATCH RESULTS GRID (FULL 100% PAGE WIDTH) */}
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <MatchResultsList matchedGames={matchedGames} />
      </div>
    </div>
  );
}
