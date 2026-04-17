/**
 * SISTEM LEVEL ORGANIK
 * Rumus: Level = floor(sqrt(XP / 100)) + 1
 * Level 1: 0 XP
 * Level 2: 100 XP
 * Level 3: 400 XP
 * Level 4: 900 XP
 * ... dst.
 */

export function calculateLevel(xp: number): number {
  if (xp <= 0) return 1;
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function getXPForNextLevel(currentLevel: number): number {
  return Math.pow(currentLevel, 2) * 100;
}

export function getXPProgressInLevel(xp: number): number {
  const currentLevel = calculateLevel(xp);
  const xpForCurrent = getXPForNextLevel(currentLevel - 1);
  const xpForNext = getXPForNextLevel(currentLevel);
  
  const totalInLevel = xpForNext - xpForCurrent;
  const progressInLevel = xp - xpForCurrent;
  
  return Math.round((progressInLevel / totalInLevel) * 100);
}

export const XP_REWARDS = {
  QUIZ_PASS: 200,
  QUIZ_PERFECT: 500,
  MATERIAL_READ: 50,
  DAILY_LOGIN: 20,
};

export const LEVEL_CATEGORIES = [
  { minLevel: 1, title: 'Warga Belajar', subtitle: 'Baru memulai perjalanan intelektual.', color: '#64748b' },
  { minLevel: 10, title: 'Kader Penggerak', subtitle: 'Mulai memahami esensi bernegara.', color: '#0f766e' },
  { minLevel: 25, title: 'Pilar Muda', subtitle: 'Menjadi teladan bagi sesama pelajar.', color: '#1d4ed8' },
  { minLevel: 50, title: 'Cendekia Pancasila', subtitle: 'Memiliki visi kebangsaan yang tajam.', color: '#7c3aed' },
  { minLevel: 100, title: 'Penjaga Nalar', subtitle: 'Penjaga nilai luhur bangsa di era digital.', color: '#be123c' },
];

export function getLevelData(level: number) {
  return [...LEVEL_CATEGORIES].reverse().find(c => level >= c.minLevel) || LEVEL_CATEGORIES[0];
}

export function getLevelDisplay(level: number) {
  const data = getLevelData(level);
  return `${data.title} (Level ${level})`;
}
