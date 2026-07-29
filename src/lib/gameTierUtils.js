/**
 * Game Hardware Tier Classification Utils
 * Strict mutual exclusivity:
 * - Low End Games: RAM <= 8 GB (and non-heavy AAA GPUs)
 * - High End Games: RAM > 8 GB (or heavy AAA GPUs)
 */

export const parseRamInGB = (ramStr) => {
  if (!ramStr) return 4;
  const str = String(ramStr).toLowerCase();
  const val = parseFloat(str);
  if (isNaN(val) || val <= 0) return 4;
  if (str.includes('mb')) return val / 1024;
  return val;
};

export const isLowEndGame = (game) => {
  if (!game) return true;
  const ram = parseRamInGB(game.ram);
  const gpu = (game.graphics_card || game.graphics || '').toLowerCase();
  const cpu = (game.processor || '').toLowerCase();
  
  // Heavy AAA GPU indicators
  const isHeavyGpu = gpu.includes('rtx') || 
                     gpu.includes('3060') || 
                     gpu.includes('3070') || 
                     gpu.includes('3080') || 
                     gpu.includes('4070') || 
                     gpu.includes('4080') || 
                     gpu.includes('4090') || 
                     gpu.includes('2060') || 
                     gpu.includes('2070') || 
                     gpu.includes('2080') || 
                     gpu.includes('1080') || 
                     gpu.includes('6700') || 
                     gpu.includes('6800') || 
                     gpu.includes('6900');

  // Heavy AAA CPU indicators
  const isHeavyCpu = cpu.includes('i7-1') || cpu.includes('i9') || cpu.includes('ryzen 7') || cpu.includes('ryzen 9');

  if (isHeavyGpu || isHeavyCpu || ram > 8) {
    return false;
  }
  
  return ram <= 8;
};

export const isHighEndGame = (game) => {
  return !isLowEndGame(game);
};
