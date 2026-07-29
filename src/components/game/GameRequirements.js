'use client';
import React, { useState, useEffect } from 'react';
import { calculateCompatibility } from '@/lib/compatibilityCalculator';
import { getUserData, saveUserData } from '@/lib/clientStorage';
import HardwareMatchScoreCard from './HardwareMatchScoreCard';
import RequirementsTable from './RequirementsTable';

export default function GameRequirements({ game }) {
  const [userSpecs, setUserSpecs] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const scanSystemHardware = () => {
    let ramGB = 8;
    let cores = 4;
    let osName = 'Windows 10/11 64-bit';
    let gpuName = 'Intel(R) HD Graphics 520';

    if (typeof window !== 'undefined') {
      ramGB = navigator.deviceMemory || 8;
      cores = navigator.hardwareConcurrency || 4;

      if (navigator.userAgent.includes('Mac')) osName = 'macOS';
      if (navigator.userAgent.includes('Linux')) osName = 'Linux';

      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            let rawGpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            if (rawGpu.startsWith('ANGLE')) {
              const parts = rawGpu.split(',');
              if (parts.length > 1) {
                gpuName = parts[1].split('(0x')[0].split('Direct3D')[0].trim();
              } else {
                gpuName = rawGpu.split('(0x')[0].split('Direct3D')[0].trim();
              }
            } else {
              gpuName = rawGpu.split('(0x')[0].split('Direct3D')[0].trim();
            }
          }
        }
      } catch (e) {}
    }

    let cpuModel = 'Intel Core i5-6200U @ 2.30GHz';
    const gpuLower = gpuName.toLowerCase();
    if (gpuLower.includes('hd graphics 520') || gpuLower.includes('hd 520')) {
      cpuModel = 'Intel Core i5-6200U @ 2.30GHz';
    } else if (gpuLower.includes('gtx 1650')) {
      cpuModel = 'Intel Core i5-10400F @ 2.90GHz';
    } else if (gpuLower.includes('rtx 3060')) {
      cpuModel = 'Intel Core i7-11700K @ 3.60GHz';
    } else {
      cpuModel = `Intel Core i5 (Cores: ${cores})`;
    }

    gpuName = gpuName.replace(/\s*\(0x[0-9a-fA-F]+\)/gi, '').trim();

    return {
      gpu: gpuName,
      cpu: cpuModel,
      ram: ramGB,
      os: osName
    };
  };

  const runTest = (specs) => {
    setIsTesting(true);
    setTimeout(() => {
      const activeSpecs = specs || scanSystemHardware();
      setUserSpecs(activeSpecs);
      const result = calculateCompatibility(activeSpecs, game);
      setMatchResult(result);
      setIsTesting(false);
    }, 400);
  };

  useEffect(() => {
    let savedSpecs = getUserData('nsgames_specs', null);
    if (!savedSpecs) {
      savedSpecs = scanSystemHardware();
      saveUserData('nsgames_specs', savedSpecs);
    }
    runTest(savedSpecs);
  }, [game]);

  const handleRunTest = () => {
    const scanned = scanSystemHardware();
    saveUserData('nsgames_specs', scanned);
    runTest(scanned);
  };

  return (
    <div className="game-requirements-container">
      {/* 1. MATCH SCORE CARD */}
      <HardwareMatchScoreCard 
        userSpecs={userSpecs} 
        matchResult={matchResult} 
        isTesting={isTesting} 
        handleRunTest={handleRunTest} 
      />

      {/* 2. SYSTEM REQUIREMENTS TABLE */}
      <RequirementsTable game={game} />
    </div>
  );
}
