/**
 * SISTEM LEVEL FRONTEND (Mirrored from Backend)
 */

export function calculateLevel(xp) {
  if (!xp || xp <= 0) return 1;
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function getXPForNextLevel(currentLevel) {
  return Math.pow(currentLevel, 2) * 100;
}

export function getXPProgressInLevel(xp) {
  const currentLevel = calculateLevel(xp);
  const xpForCurrent = getXPForNextLevel(currentLevel - 1);
  const xpForNext = getXPForNextLevel(currentLevel);
  
  const totalInLevel = xpForNext - xpForCurrent;
  const progressInLevel = xp - xpForCurrent;
  
  return Math.round((progressInLevel / totalInLevel) * 100);
}

export const LEVEL_CATEGORIES = [
  { minLevel: 1, title: 'Warga Belajar', subtitle: 'Baru memulai perjalanan intelektual.', color: '#64748b', bg: 'bg-slate-100', text: 'text-slate-600' },
  { minLevel: 10, title: 'Kader Penggerak', subtitle: 'Mulai memahami esensi bernegara.', color: '#0f766e', bg: 'bg-teal-100', text: 'text-teal-700' },
  { minLevel: 25, title: 'Pilar Muda', subtitle: 'Menjadi teladan bagi sesama pelajar.', color: '#1d4ed8', bg: 'bg-blue-100', text: 'text-blue-700' },
  { minLevel: 50, title: 'Cendekia Pancasila', subtitle: 'Memiliki visi kebangsaan yang tajam.', color: '#7c3aed', bg: 'bg-violet-100', text: 'text-violet-700' },
  { minLevel: 100, title: 'Penjaga Nalar', subtitle: 'Penjaga nilai luhur bangsa di era digital.', color: '#be123c', bg: 'bg-rose-100', text: 'text-rose-700' },
];

export function getLevelData(level) {
  return [...LEVEL_CATEGORIES].reverse().find(c => level >= c.minLevel) || LEVEL_CATEGORIES[0];
}

export function getLevelDisplay(level) {
  const data = getLevelData(level);
  return `${data.title} (Lvl ${level})`;
}
