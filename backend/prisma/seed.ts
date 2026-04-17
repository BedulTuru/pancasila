import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'matematika' },
      update: {},
      create: { name: 'Matematika', slug: 'matematika', icon: '📐', color: '#0071e3', order: 1 },
    }),
    prisma.category.upsert({
      where: { slug: 'fisika' },
      update: {},
      create: { name: 'Fisika', slug: 'fisika', icon: '⚡', color: '#ff9500', order: 2 },
    }),
    prisma.category.upsert({
      where: { slug: 'kimia' },
      update: {},
      create: { name: 'Kimia', slug: 'kimia', icon: '🧪', color: '#34c759', order: 3 },
    }),
    prisma.category.upsert({
      where: { slug: 'biologi' },
      update: {},
      create: { name: 'Biologi', slug: 'biologi', icon: '🧬', color: '#af52de', order: 4 },
    }),
  ]);

  console.log('✅ Categories created');

  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pancasila.edu' },
    update: {},
    create: { email: 'admin@pancasila.edu', password: hashedPassword, name: 'Administrator', role: 'ADMIN' },
  });

  const tutor = await prisma.user.upsert({
    where: { email: 'tutor@pancasila.edu' },
    update: {},
    create: { email: 'tutor@pancasila.edu', password: hashedPassword, name: 'Guru Pancasila', role: 'TUTOR' },
  });

  console.log('✅ Users created');

  const materials = [
    {
      title: 'Aljabar Linear Dasar',
      slug: 'aljabar-linear-dasar',
      content: '# Aljabar Linear Dasar\n\n## Pendahuluan\nAljabar linear adalah cabang matematika yang mempelajari vektor, ruang vektor, transformasi linear, dan sistem persamaan linear.\n\n## Topik Utama\n1. Vektor dan Operasi Vektor\n2. Matriks dan Operasinya\n3. Sistem Persamaan Linear\n4. Determinan\n5. Eigenvalue dan Eigenvector\n\n## Contoh Soal\nTentukan hasil penjumlahan vektor **a** = (1, 2, 3) dan **b** = (4, 5, 6).\n\n**Jawaban:**\n**a** + **b** = (1+4, 2+5, 3+6) = (5, 7, 9)',
      description: 'Pengenalan aljabar linear untuk pemula',
      categoryId: categories[0].id,
      authorId: tutor.id,
      difficulty: 'EASY',
      isPublished: true,
    },
    {
      title: 'Kinematika dan Dinamika',
      slug: 'kinematika-dinamika',
      content: '# Kinematika dan Dinamika\n\n## Kinematika\nKinematika adalah cabang fisika yang mempelajari gerak benda tanpa memperhatikan penyebab gerak.\n\n### Rumus Dasar\n- **Kecepatan rata-rata**: v = Δx/Δt\n- **Percepatan**: a = Δv/Δt\n- **Gerak lurus beraturan**: x = x₀ + vt\n- **Gerak lurus berubah beraturan**: x = x₀ + v₀t + ½at²\n\n## Dinamika\n### Hukum Newton\n1. **Hukum I**: Benda diam tetap diam, benda bergerak tetap bergerak lurus beraturan.\n2. **Hukum II**: F = ma\n3. **Hukum III**: Aksi = Reaksi',
      description: 'Memahami gerak benda dan hukum-hukum yang mengaturnya',
      categoryId: categories[1].id,
      authorId: tutor.id,
      difficulty: 'MEDIUM',
      isPublished: true,
    },
    {
      title: 'Stoikiometri Reaksi',
      slug: 'stoikiometri-reaksi',
      content: '# Stoikiometri Reaksi Kimia\n\n## Konsep Dasar\nStoikiometri adalah perhitungan kimia yang berkaitan dengan jumlah zat dalam reaksi kimia.\n\n### Hukum Kekekalan Massa\nMassa total reaktan = Massa total produk\n\n## Contoh\nBerapa gram H₂O yang dihasilkan dari 4 gram H₂?\n\n**2H₂ + O₂ → 2H₂O**\n\nMol H₂ = 4/2 = 2 mol\nMassa H₂O = 2 × 18 = 36 gram',
      description: 'Perhitungan kimia dalam reaksi',
      categoryId: categories[2].id,
      authorId: tutor.id,
      difficulty: 'MEDIUM',
      isPublished: true,
    },
    {
      title: 'Sel dan Fungsinya',
      slug: 'sel-dan-fungsinya',
      content: '# Sel dan Fungsinya\n\n## Pengertian Sel\nSel adalah unit terkecil dari makhluk hidup yang dapat melakukan kehidupan sendiri.\n\n## Struktur Sel\n### Sel Prokariotik\n- Tidak memiliki membran inti\n- Contoh: bakteri\n\n### Sel Eukariotik\n- Memiliki membran inti\n- Contoh: sel hewan, sel tumbuhan\n\n## Organel Sel\n1. **Nucleus**: Mengontrol aktivitas sel\n2. **Mitokondria**: Pusat respirasi sel\n3. **Ribosom**: Tempat sintesis protein\n4. **Retikulum Endoplasma**: Transportasi materi\n5. **Golgi Apparatus**: Modifikasi dan pengemasan protein',
      description: 'Memahami struktur dan fungsi sel',
      categoryId: categories[3].id,
      authorId: tutor.id,
      difficulty: 'EASY',
      isPublished: true,
    },
  ];

  for (const mat of materials) {
    await prisma.material.upsert({ where: { slug: mat.slug }, update: {}, create: mat });
  }

  console.log('✅ Materials created');

  const quizzes = [
    {
      title: 'Kuis Aljabar Linear',
      slug: 'kuis-aljabar-linear',
      description: 'Test pengetahuan aljabar linear dasar',
      categoryId: categories[0].id,
      authorId: tutor.id,
      difficulty: 'EASY',
      isPublished: true,
      questions: [
        { content: 'Berapa hasil dari vektor (1, 2) + (3, 4)?', hint: 'Jumlahkan komponen yang sesuai', explanation: '(1+3, 2+4) = (4, 6)', points: 1, options: [{ content: '(4, 6)', isCorrect: true, order: 0 }, { content: '(3, 8)', isCorrect: false, order: 1 }, { content: '(2, 6)', isCorrect: false, order: 2 }, { content: '(4, 5)', isCorrect: false, order: 3 }] },
        { content: 'Determinan matriks [[2, 1], [3, 4]] adalah?', hint: 'Gunakan rumus ad - bc', explanation: 'Determinan = (2×4) - (1×3) = 8 - 3 = 5', points: 1, options: [{ content: '5', isCorrect: true, order: 0 }, { content: '11', isCorrect: false, order: 1 }, { content: '8', isCorrect: false, order: 2 }, { content: '7', isCorrect: false, order: 3 }] },
      ],
    },
    {
      title: 'Kuis Fisika Dasar',
      slug: 'kuis-fisika-dasar',
      description: 'Test pemahaman kinematika dan dinamika',
      categoryId: categories[1].id,
      authorId: tutor.id,
      difficulty: 'MEDIUM',
      isPublished: true,
      questions: [
        { content: 'Satuan percepatan dalam SI adalah?', hint: 'Percepatan = perubahan kecepatan per waktu', explanation: 'Percepatan = m/s²', points: 1, options: [{ content: 'm/s²', isCorrect: true, order: 0 }, { content: 'm/s', isCorrect: false, order: 1 }, { content: 'kg', isCorrect: false, order: 2 }, { content: 'N', isCorrect: false, order: 3 }] },
        { content: 'Hukum Newton II menyatakan bahwa F = m × a, di mana F adalah?', hint: 'Satuan gaya adalah Newton', explanation: 'F adalah gaya yang diukur dalam Newton (N)', points: 1, options: [{ content: 'Gaya (Newton)', isCorrect: true, order: 0 }, { content: 'Frekuensi', isCorrect: false, order: 1 }, { content: 'Fluks', isCorrect: false, order: 2 }, { content: 'Fase', isCorrect: false, order: 3 }] },
      ],
    },
  ];

  for (const quiz of quizzes) {
    const existingQuiz = await prisma.quiz.findUnique({ where: { slug: quiz.slug } });
    if (!existingQuiz) {
      await prisma.quiz.create({
        data: {
          title: quiz.title, slug: quiz.slug, description: quiz.description,
          categoryId: quiz.categoryId, authorId: quiz.authorId,
          difficulty: quiz.difficulty, isPublished: quiz.isPublished,
          questions: { create: quiz.questions.map((q, idx) => ({ content: q.content, hint: q.hint, explanation: q.explanation, order: idx, points: q.points, options: { create: q.options } })) },
        },
      });
    }
  }

  console.log('✅ Quizzes created');

  const achievements = [
    { name: 'Pemula', description: 'Selesaikan 1 kuis', icon: '🌱', points: 10, criteria: JSON.stringify({ type: 'QUIZZES_COMPLETED', count: 1 }) },
    { name: 'Pelajar', description: 'Selesaikan 5 kuis', icon: '📚', points: 50, criteria: JSON.stringify({ type: 'QUIZZES_COMPLETED', count: 5 }) },
    { name: 'Ahli', description: 'Selesaikan 10 kuis', icon: '🏆', points: 100, criteria: JSON.stringify({ type: 'QUIZZES_COMPLETED', count: 10 }) },
    { name: 'Konsisten', description: 'Login 3 hari berturut-turut', icon: '🔥', points: 30, criteria: JSON.stringify({ type: 'STREAK_DAYS', count: 3 }) },
    { name: 'Pembaca', description: 'Selesaikan 1 materi', icon: '📖', points: 10, criteria: JSON.stringify({ type: 'MATERIALS_COMPLETED', count: 1 }) },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({ where: { name: achievement.name }, update: {}, create: achievement });
  }

  console.log('✅ Achievements created');

  await prisma.announcement.upsert({
    where: { id: 'welcome-announcement' },
    update: {},
    create: {
      id: 'welcome-announcement',
      title: 'Selamat Datang di Portal Edukasi Pancasila',
      content: 'Portal ini adalah wujud implementasi nilai Pancasila, khususnya Sila ke-5 tentang Keadilan Sosial.',
      priority: 1, isActive: true,
    },
  });

  console.log('\n🎉 Database seeded successfully!\n');
  console.log('📝 Sample accounts:');
  console.log('   Admin: admin@pancasila.edu / admin123');
  console.log('   Tutor: tutor@pancasila.edu / admin123');
}

main().catch((e) => { console.error('Seeding failed:', e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
