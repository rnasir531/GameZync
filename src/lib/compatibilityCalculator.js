/**
 * Dynamic Dual-Target Hardware Compatibility Calculator v6.0
 * Computes exact match percentages for BOTH Minimum & Recommended Requirements vs User Hardware Specs.
 */

function parseGpuSpecs(gpuStr) {
  if (!gpuStr) return { score: 2000, vram: 2, isIntegrated: true };
  const str = gpuStr.toLowerCase();

  const isIntegrated = str.includes('intel') || str.includes('hd graphics') || 
                       str.includes('uhd') || str.includes('iris') || 
                       str.includes('integrated') || 
                       (str.includes('radeon') && !str.includes('rx') && !str.includes('vega 56') && !str.includes('vega 64'));

  // Dedicated High-End / Mid GPUs
  if (str.includes('4090') || str.includes('4080') || str.includes('7900 xt')) return { score: 25000, vram: 16, isIntegrated: false };
  if (str.includes('4070') || str.includes('3090') || str.includes('3080') || str.includes('6900')) return { score: 18000, vram: 12, isIntegrated: false };
  if (str.includes('3070') || str.includes('3060 ti') || str.includes('6700')) return { score: 14000, vram: 8, isIntegrated: false };
  if (str.includes('3060') || str.includes('2080') || str.includes('2070')) return { score: 11000, vram: 8, isIntegrated: false };
  if (str.includes('2060') || str.includes('1080') || str.includes('5700')) return { score: 8500, vram: 6, isIntegrated: false };
  if (str.includes('1660') || str.includes('1070') || str.includes('5600')) return { score: 6500, vram: 6, isIntegrated: false };
  if (str.includes('gtx 970') || str.includes('gtx 1060') || str.includes('rx 580') || str.includes('gtx 770') || str.includes('r9 280') || str.includes('rx 470')) return { score: 4800, vram: 4, isIntegrated: false };
  if (str.includes('gtx 1650') || str.includes('gtx 1050 ti') || str.includes('rx 570')) return { score: 4000, vram: 4, isIntegrated: false };
  if (str.includes('gtx 1050') || str.includes('gtx 960') || str.includes('rx 560') || str.includes('gtx 660') || str.includes('hd 7870')) return { score: 2800, vram: 2, isIntegrated: false };
  if (str.includes('gt 1030') || str.includes('gtx 750') || str.includes('8800 gt') || str.includes('9800 gt') || str.includes('hd 4870')) return { score: 1800, vram: 1, isIntegrated: false };

  // Integrated GPUs
  if (str.includes('iris xe') || str.includes('vega 8') || str.includes('radeon 680m')) return { score: 2500, vram: 2, isIntegrated: true };
  if (str.includes('uhd 630') || str.includes('uhd 620') || str.includes('hd 630')) return { score: 1800, vram: 1, isIntegrated: true };
  if (str.includes('hd graphics 520') || str.includes('hd 520') || str.includes('intel hd')) return { score: 1400, vram: 1, isIntegrated: true };

  let detectedVram = isIntegrated ? 1 : 2;
  const vramMatch = str.match(/(\d+)\s*(gb|mb)/);
  if (vramMatch) {
    const val = parseInt(vramMatch[1], 10);
    detectedVram = vramMatch[2] === 'mb' ? val / 1024 : val;
  }
  return { score: Math.max(1500, detectedVram * 1200), vram: detectedVram, isIntegrated };
}

function parseCpuSpecs(cpuStr) {
  if (!cpuStr) return { score: 4000 };
  const str = cpuStr.toLowerCase();

  if (str.includes('i9') || str.includes('ryzen 9') || str.includes('13900') || str.includes('7950')) return { score: 20000 };
  if (str.includes('i7-13700') || str.includes('i7-12700') || str.includes('5900x') || str.includes('7800x3d')) return { score: 16000 };
  if (str.includes('i7-10700') || str.includes('i5-13400') || str.includes('5600x')) return { score: 12000 };
  if (str.includes('i5-12400') || str.includes('i5-10400') || str.includes('3600')) return { score: 9000 };
  if (str.includes('i7-9700') || str.includes('i5-9400') || str.includes('2600')) return { score: 7000 };
  if (str.includes('i5-2500k') || str.includes('fx-6300') || str.includes('i5-3470')) return { score: 5500 };
  if (str.includes('i5-6200u') || str.includes('i5-6400') || str.includes('i3-10100') || str.includes('q6600')) return { score: 4500 };
  if (str.includes('i3-7100') || str.includes('i3-6100') || str.includes('core 2 duo')) return { score: 3200 };

  return { score: 4000 };
}

export function calculateCompatibility(user, game) {
  if (!user || !game) {
    return {
      minScore: 0,
      recScore: 0,
      overallScore: 0,
      isPlayable: false,
      statusText: 'Insufficient Hardware Data'
    };
  }

  const gpuString = user.gpu || user.graphics_raw || user.graphics || '';
  const cpuString = user.cpu || user.processor_raw || user.processor || '';
  const userGpu = parseGpuSpecs(gpuString);
  const userCpu = parseCpuSpecs(cpuString);
  const userRam = parseFloat(user.ram) || 8;

  // Minimum Target
  const minGpu = parseGpuSpecs(game.graphics_card || game.graphics || game.min_gpu);
  const minCpu = parseCpuSpecs(game.processor || game.min_cpu);
  const minRam = parseFloat(game.ram || game.min_ram) || 4;

  // Recommended Target
  const recGpu = parseGpuSpecs(game.rec_gpu || game.graphics_card || game.graphics);
  const recCpu = parseCpuSpecs(game.rec_cpu || game.processor);
  const recRam = parseFloat(game.rec_ram) || (minRam * 2);

  // Minimum Score Ratios
  let minGpuPct = Math.min(100, Math.round((userGpu.score / Math.max(minGpu.score, 1)) * 100));
  let minCpuPct = Math.min(100, Math.round((userCpu.score / Math.max(minCpu.score, 1)) * 100));
  let minRamPct = Math.min(100, Math.round((userRam / Math.max(minRam, 1)) * 100));
  let minWeighted = (minGpuPct * 0.50) + (minCpuPct * 0.30) + (minRamPct * 0.20);
  if (userGpu.isIntegrated && minGpu.score > 3000) minWeighted = Math.min(minWeighted, 45);
  let minScore = Math.max(15, Math.min(100, Math.round(minWeighted)));

  // Recommended Score Ratios
  let recGpuPct = Math.min(100, Math.round((userGpu.score / Math.max(recGpu.score, 1)) * 100));
  let recCpuPct = Math.min(100, Math.round((userCpu.score / Math.max(recCpu.score, 1)) * 100));
  let recRamPct = Math.min(100, Math.round((userRam / Math.max(recRam, 1)) * 100));
  let recWeighted = (recGpuPct * 0.50) + (recCpuPct * 0.30) + (recRamPct * 0.20);
  if (userGpu.isIntegrated && recGpu.score > 3000) recWeighted = Math.min(recWeighted, 25);
  let recScore = Math.max(10, Math.min(100, Math.round(recWeighted)));

  const status = getCompatibilityStatus(minScore, recScore);

  return {
    minScore,
    recScore,
    overallScore: recScore,
    isPlayable: minScore >= 60,
    statusText: status.label
  };
}

export function getCompatibilityStatus(minScore, recScore) {
  if (recScore >= 80) return { label: 'Can Run Smoothly on High/Ultra', color: '#10b981' };
  if (recScore >= 50) return { label: 'Can Run Well on Medium Settings', color: '#06b6d4' };
  if (minScore >= 60) return { label: 'Can Run on Low Settings', color: '#f59e0b' };
  return { label: 'Hardware Below Recommended (Lag Expected)', color: '#ef4444' };
}
