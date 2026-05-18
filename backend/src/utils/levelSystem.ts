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
  QUIZ_PASS: 30,
  QUIZ_PERFECT: 50,
  MATERIAL_READ: 10,
  DAILY_LOGIN: 5,
};

export const LEVEL_CATEGORIES = [
  { minLevel: 1, title: 'Siswa Baru', subtitle: 'Baru memulai perjalanan belajar di tingkat Sekolah Menengah Pertama.', color: '#64748b' },
  { minLevel: 10, title: 'Pelajar Aktif', subtitle: 'Mulai rajin mengeksplorasi ilmu pengetahuan.', color: '#0f766e' },
  { minLevel: 25, title: 'Bintang Kelas', subtitle: 'Menonjol dan menjadi teladan bagi teman-teman.', color: '#1d4ed8' },
  { minLevel: 50, title: 'Juara Sekolah', subtitle: 'Berprestasi tinggi dengan wawasan yang luas.', color: '#7c3aed' },
  { minLevel: 100, title: 'Siswa Teladan Nasional', subtitle: 'Generasi emas Sekolah Menengah Pertama kebanggaan bangsa.', color: '#be123c' },
];

export function getLevelData(level: number) {
  return [...LEVEL_CATEGORIES].reverse().find(c => level >= c.minLevel) || LEVEL_CATEGORIES[0];
}

export function getLevelDisplay(level: number) {
  const data = getLevelData(level);
  return `${data.title} (Level ${level})`;
}
