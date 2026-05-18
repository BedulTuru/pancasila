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
      where: { slug: 'ipa' },
      update: {},
      create: { name: 'Ilmu Pengetahuan Alam', slug: 'ipa', icon: '🔬', color: '#34c759', order: 2 },
    }),
    prisma.category.upsert({
      where: { slug: 'ips' },
      update: {},
      create: { name: 'Ilmu Pengetahuan Sosial', slug: 'ips', icon: '🌍', color: '#ff9500', order: 3 },
    }),
    prisma.category.upsert({
      where: { slug: 'ppkn' },
      update: {},
      create: { name: 'Pendidikan Pancasila', slug: 'ppkn', icon: '🦅', color: '#af52de', order: 4 },
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
    create: { email: 'tutor@pancasila.edu', password: hashedPassword, name: 'Guru Pendamping', role: 'TUTOR' },
  });

  console.log('✅ Users created');

  const materials = [
    {
      title: 'Aljabar Dasar Kelas 7',
      slug: 'aljabar-dasar-kelas-7',
      content: '# Aljabar Dasar Kelas 7\n\n## Pendahuluan\nAljabar adalah cabang matematika yang menggunakan huruf atau simbol untuk mewakili angka. Ini membantu kita menyelesaikan masalah yang angkanya belum diketahui.\n\n## Konsep Utama\n1. **Variabel**: Simbol (biasanya huruf seperti x, y, z) yang mewakili suatu nilai.\n2. **Koefisien**: Angka yang mengalikan variabel (misal: angka 3 pada 3x).\n3. **Konstanta**: Angka tetap yang tidak memiliki variabel.\n4. **Suku**: Bagian dari bentuk aljabar yang dipisahkan oleh tanda + atau -.\n\n## Contoh Soal\nSederhanakan bentuk aljabar berikut: 3x + 5y - x + 2y\n\n**Jawaban:**\nKelompokkan suku sejenis:\n= (3x - x) + (5y + 2y)\n= 2x + 7y',
      description: 'Pengenalan konsep aljabar untuk siswa kelas 7 Sekolah Menengah Pertama.',
      categoryId: categories[0].id,
      authorId: tutor.id,
      difficulty: 'EASY',
      isPublished: true,
    },
    {
      title: 'Sistem Pencernaan Manusia',
      slug: 'sistem-pencernaan-manusia',
      content: '# Sistem Pencernaan Manusia\n\n## Proses Pencernaan\nPencernaan adalah proses memecah makanan menjadi molekul-molekul kecil yang dapat diserap oleh tubuh.\n\n### Organ Pencernaan Utama\n1. **Mulut**: Proses pencernaan mekanik (gigi) dan kimiawi (enzim ptialin).\n2. **Kerongkongan (Esofagus)**: Mendorong makanan ke lambung (gerak peristaltik).\n3. **Lambung**: Pencernaan kimiawi menggunakan asam lambung (HCl) dan enzim pepsin.\n4. **Usus Halus**: Penyerapan sari-sari makanan utama.\n5. **Usus Besar**: Penyerapan air dan pembusukan sisa makanan.\n\n## Enzim Penting\n- **Amilase**: Mengubah amilum menjadi glukosa.\n- **Lipase**: Mengubah lemak menjadi asam lemak.\n- **Tripsin**: Mengubah protein menjadi asam amino.',
      description: 'Mengenal organ dan fungsi sistem pencernaan pada manusia.',
      categoryId: categories[1].id,
      authorId: tutor.id,
      difficulty: 'MEDIUM',
      isPublished: true,
    },
    {
      title: 'Sejarah Proklamasi Kemerdekaan',
      slug: 'sejarah-proklamasi-kemerdekaan',
      content: '# Sejarah Proklamasi Kemerdekaan Indonesia\n\n## Peristiwa Rengasdengklok\nPada tanggal 16 Agustus 1945, golongan muda mengamankan Soekarno dan Hatta ke Rengasdengklok. Tujuannya adalah menjauhkan mereka dari pengaruh Jepang dan mendesak proklamasi segera dilaksanakan.\n\n## Penyusunan Teks Proklamasi\nDirumuskan di rumah Laksamana Maeda di Jakarta oleh Soekarno, Hatta, dan Ahmad Soebardjo. Teks kemudian diketik oleh Sayuti Melik.\n\n## Detik-Detik Proklamasi\n- **Tanggal**: 17 Agustus 1945\n- **Pukul**: 10.00 WIB\n- **Lokasi**: Jalan Pegangsaan Timur No. 56, Jakarta\n- Pembacaan dilakukan oleh Ir. Soekarno didampingi Drs. Moh. Hatta, diikuti pengibaran bendera Merah Putih oleh Latief Hendraningrat dan Suhud.',
      description: 'Perjalanan bangsa Indonesia menuju kemerdekaan 17 Agustus 1945.',
      categoryId: categories[2].id,
      authorId: tutor.id,
      difficulty: 'MEDIUM',
      isPublished: true,
    },
    {
      title: 'Makna Sila-Sila Pancasila',
      slug: 'makna-sila-sila-pancasila',
      content: '# Makna Sila-Sila Pancasila\n\n## Kedudukan Pancasila\nPancasila adalah dasar negara dan ideologi bangsa Indonesia. Sebagai pelajar, penting mengamalkan nilai-nilainya.\n\n### Nilai yang Terkandung\n1. **Ketuhanan Yang Maha Esa**: Menghormati kebebasan beragama dan toleransi antar umat.\n2. **Kemanusiaan yang Adil dan Beradab**: Mengakui persamaan derajat, hak, dan kewajiban setiap manusia.\n3. **Persatuan Indonesia**: Menjaga kerukunan, cinta tanah air, dan rela berkorban demi bangsa.\n4. **Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan...**: Mengutamakan musyawarah untuk mencapai mufakat dalam setiap keputusan.\n5. **Keadilan Sosial bagi Seluruh Rakyat Indonesia**: Bersikap adil, menghormati hak orang lain, dan suka menolong.',
      description: 'Memahami makna dari setiap sila Pancasila dalam kehidupan sehari-hari.',
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
      title: 'Kuis Aljabar Dasar',
      slug: 'kuis-aljabar-dasar',
      description: 'Uji pemahamanmu tentang variabel, koefisien, dan operasi aljabar.',
      categoryId: categories[0].id,
      authorId: tutor.id,
      difficulty: 'EASY',
      isPublished: true,
      questions: [
        { content: 'Berapakah koefisien dari x pada bentuk aljabar 5x - 2y + 7?', hint: 'Koefisien adalah angka yang mendampingi variabel.', explanation: 'Angka yang mendampingi variabel x adalah 5.', points: 1, options: [{ content: '5', isCorrect: true, order: 0 }, { content: '2', isCorrect: false, order: 1 }, { content: '7', isCorrect: false, order: 2 }, { content: 'x', isCorrect: false, order: 3 }] },
        { content: 'Bentuk paling sederhana dari 4a + 2b - 2a + 3b adalah?', hint: 'Kelompokkan suku-suku yang sejenis.', explanation: '(4a - 2a) + (2b + 3b) = 2a + 5b', points: 1, options: [{ content: '2a + 5b', isCorrect: true, order: 0 }, { content: '6a + 5b', isCorrect: false, order: 1 }, { content: '2a - b', isCorrect: false, order: 2 }, { content: '2a + b', isCorrect: false, order: 3 }] },
      ],
    },
    {
      title: 'Kuis Sejarah Kemerdekaan',
      slug: 'kuis-sejarah-kemerdekaan',
      description: 'Uji pengetahuanmu tentang peristiwa proklamasi kemerdekaan Indonesia.',
      categoryId: categories[2].id,
      authorId: tutor.id,
      difficulty: 'MEDIUM',
      isPublished: true,
      questions: [
        { content: 'Siapakah tokoh yang mengetik naskah proklamasi kemerdekaan?', hint: 'Tokoh ini merupakan golongan muda yang menyempurnakan tulisan tangan Soekarno.', explanation: 'Sayuti Melik adalah tokoh yang mengetik naskah proklamasi.', points: 1, options: [{ content: 'Sayuti Melik', isCorrect: true, order: 0 }, { content: 'Ahmad Soebardjo', isCorrect: false, order: 1 }, { content: 'Sutan Sjahrir', isCorrect: false, order: 2 }, { content: 'Latief Hendraningrat', isCorrect: false, order: 3 }] },
        { content: 'Di mana naskah proklamasi dirumuskan oleh Soekarno, Hatta, dan Ahmad Soebardjo?', hint: 'Tempat tersebut merupakan rumah seorang perwira Angkatan Laut Jepang.', explanation: 'Perumusan naskah proklamasi dilakukan di rumah Laksamana Maeda di Jakarta.', points: 1, options: [{ content: 'Rumah Laksamana Maeda', isCorrect: true, order: 0 }, { content: 'Rengasdengklok', isCorrect: false, order: 1 }, { content: 'Jalan Pegangsaan Timur No. 56', isCorrect: false, order: 2 }, { content: 'Gedung Chuo Sangi-in', isCorrect: false, order: 3 }] },
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
      content: 'Portal ini adalah sarana belajar asik dan interaktif untuk seluruh siswa Sekolah Menengah Pertama berprestasi. Selamat bereksplorasi!',
      priority: 1, isActive: true,
    },
  });

  console.log('\n🎉 Database seeded successfully!\n');
  console.log('📝 Sample accounts:');
  console.log('   Admin: admin@pancasila.edu / admin123');
  console.log('   Tutor: tutor@pancasila.edu / admin123');
}

main().catch((e) => { console.error('Seeding failed:', e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
