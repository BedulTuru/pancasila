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
  { minLevel: 1, title: 'Siswa Baru', subtitle: 'Baru memulai perjalanan belajar di tingkat Sekolah Menengah Pertama.', color: '#64748b', bg: 'bg-slate-100', text: 'text-slate-600' },
  { minLevel: 10, title: 'Pelajar Aktif', subtitle: 'Mulai rajin mengeksplorasi ilmu pengetahuan.', color: '#0f766e', bg: 'bg-teal-100', text: 'text-teal-700' },
  { minLevel: 25, title: 'Bintang Kelas', subtitle: 'Menonjol dan menjadi teladan bagi teman-teman.', color: '#1d4ed8', bg: 'bg-blue-100', text: 'text-blue-700' },
  { minLevel: 50, title: 'Juara Sekolah', subtitle: 'Berprestasi tinggi dengan wawasan yang luas.', color: '#7c3aed', bg: 'bg-violet-100', text: 'text-violet-700' },
  { minLevel: 100, title: 'Siswa Teladan Nasional', subtitle: 'Generasi emas Sekolah Menengah Pertama kebanggaan bangsa.', color: '#be123c', bg: 'bg-rose-100', text: 'text-rose-700' },
];

export function getLevelData(level) {
  return [...LEVEL_CATEGORIES].reverse().find(c => level >= c.minLevel) || LEVEL_CATEGORIES[0];
}

export function getLevelDisplay(level) {
  const data = getLevelData(level);
  return `${data.title} (Lvl ${level})`;
}
