import { motion } from 'framer-motion'
import { Award, Calendar, BookOpen, Layers, ShieldCheck, HelpCircle, Users, CheckCircle2, ChevronRight, FileText, BarChart2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

export default function TapakLiman() {
  const [activeTopicTab, setActiveTopicTab] = useState(0)

  const acronym = [
    { char: 'T', word: 'Tanggap', desc: 'Peka terhadap isu dan kebutuhan nyata di masyarakat.' },
    { char: 'A', word: 'Adaptif', desc: 'Mampu menyesuaikan diri dengan kondisi lapangan.' },
    { char: 'P', word: 'Partisipatif', desc: 'Melibatkan aktif peran serta warga sasaran.' },
    { char: 'A', word: 'Aksi', desc: 'Tindakan nyata yang memberikan dampak keberlanjutan.' },
    { char: 'K', word: 'Kolaboratif', desc: 'Bekerja sama dalam tim dan lintas pihak secara harmonis.' },
    { char: 'L', word: 'Lintas Ilmu', desc: 'Mengintegrasikan berbagai disiplin ilmu mahasiswa ITB.' },
    { char: 'I', word: 'Mandiri', desc: 'Mengandalkan kreativitas, kemandirian, dan inisiatif kelompok.' },
    { char: 'N', word: 'Nasionalis', desc: 'Berlandaskan kecintaan pada tanah air dan Pancasila.' },
  ]

  const topics = [
    {
      no: 1,
      title: 'Pengembangan Ekonomi Desa (UMKM)',
      desc: 'Mahasiswa membantu masyarakat desa dalam mengembangkan usaha mikro, kecil, dan menengah (UMKM) melalui pelatihan pemasaran digital, manajemen keuangan, dan inovasi produk.',
      acts: 'Pelatihan pemasaran online, workshop keuangan, dan pendampingan inovasi produk.',
      cost: 'Pengadaan bahan pelatihan, alat presentasi, dan biaya transportasi.'
    },
    {
      no: 2,
      title: 'Literasi Digital Masyarakat Desa',
      desc: 'Mengajarkan keterampilan dasar teknologi informasi kepada warga desa, termasuk penggunaan komputer, internet, dan media sosial secara bijak.',
      acts: 'Pelatihan dasar komputer, pembuatan email, dan literasi internet sehat untuk usaha.',
      cost: 'Penyediaan alat-alat teknologi, bahan ajar, dan transportasi.'
    },
    {
      no: 3,
      title: 'Pendidikan & Literasi Anak Desa',
      desc: 'Mahasiswa mengadakan program bimbingan belajar dan kegiatan literasi untuk anak-anak sekolah dasar di desa.',
      acts: 'Kelas bimbingan belajar, pembacaan buku cerita, dan lomba literasi anak.',
      cost: 'Penyediaan buku, alat tulis, dan hadiah lomba.'
    },
    {
      no: 4,
      title: 'Kesehatan Masyarakat Desa',
      desc: 'Menyelenggarakan kegiatan penyuluhan kesehatan dan kebersihan lingkungan untuk meningkatkan kesadaran masyarakat tentang hidup sehat.',
      acts: 'Penyuluhan kesehatan, pembersihan lingkungan, dan distribusi alat kebersihan.',
      cost: 'Pembelian alat kebersihan, cetak materi penyuluhan, dan biaya transportasi.'
    },
    {
      no: 5,
      title: 'Penghijauan & Pelestarian Alam',
      desc: 'Kegiatan penanaman pohon dan edukasi lingkungan untuk mengurangi dampak perubahan iklim dan menjaga kelestarian alam.',
      acts: 'Penanaman pohon, pembuatan taman desa, dan edukasi pelestarian lingkungan.',
      cost: 'Pembelian bibit pohon, alat tanam, dan biaya transportasi.'
    },
    {
      no: 6,
      title: 'Pemberdayaan Perempuan Desa',
      desc: 'Memberikan pelatihan keterampilan dan pengembangan usaha bagi perempuan desa untuk meningkatkan kemandirian ekonomi mereka.',
      acts: 'Pelatihan menjahit / kerajinan, manajemen usaha kecil, dan pemasaran produk.',
      cost: 'Pengadaan alat pelatihan, bahan praktek, dan biaya transportasi.'
    },
    {
      no: 7,
      title: 'Seni dan Budaya Desa',
      desc: 'Menghidupkan kembali seni dan budaya lokal melalui kegiatan seni pertunjukan dan workshop kerajinan tradisional.',
      acts: 'Pertunjukan seni, pelatihan seni tradisional, dan pameran kerajinan.',
      cost: 'Penyediaan bahan kerajinan, alat musik tradisional, dan biaya transportasi.'
    },
    {
      no: 8,
      title: 'Penyuluhan Hukum & Kewarganegaraan',
      desc: 'Edukasi hukum dasar dan hak-hak warga negara kepada masyarakat desa untuk meningkatkan kesadaran hukum.',
      acts: 'Penyuluhan hukum, simulasi kasus hukum, dan konsultasi dasar gratis.',
      cost: 'Penyediaan bahan cetak, alat presentasi, dan biaya transportasi.'
    },
    {
      no: 9,
      title: 'Peningkatan Infrastruktur Desa',
      desc: 'Bekerjasama dengan masyarakat desa untuk memperbaiki fasilitas umum seperti jalan desa, pos ronda, atau fasilitas olahraga.',
      acts: 'Pembangunan atau perbaikan jalan setapak, pengecatan pos ronda, dan perbaikan lapangan.',
      cost: 'Pembelian bahan bangunan, alat kerja, dan biaya transportasi.'
    },
    {
      no: 10,
      title: 'Kebersihan & Pengelolaan Sampah',
      desc: 'Menginisiasi program kebersihan lingkungan dan pengelolaan sampah di lingkungan kampus atau desa sekitar untuk lingkungan sehat.',
      acts: 'Sosialisasi kebersihan, aksi bersih desa secara kolektif, dan perintisan bank sampah.',
      cost: 'Pembelian alat kebersihan, kantong sampah, dan biaya transportasi.'
    }
  ]

  const timeline = [
    { week: 'Minggu 9', task: 'Penentuan Tema, Perumusan Judul, & Presentasi Judul' },
    { week: 'Minggu 10', task: 'Merumuskan Proposal Proyek Kelompok' },
    { week: 'Minggu 11', task: 'Presentasi Proposal di Depan Dosen' },
    { week: 'Minggu 12-13', task: 'Implementasi Program Aksi Nyata di Lokasi' },
    { week: 'Minggu 14', task: 'Penyusunan Luaran (Laporan, Poster, Video)' },
    { week: 'Minggu 15', task: 'Presentasi Hasil Kegiatan & Pengumpulan Luaran di Edunex' },
    { week: 'Minggu 16', task: 'Evaluasi & Penilaian Akhir Proyek' },
  ]

  const criteria = [
    { category: 'Kreativitas', items: 'Gagasan, Perumusan Masalah, Ketepatan masyarakat sasaran', max: 25 },
    { category: 'Metode yang diusulkan', items: 'Kesesuaian metode pemecahan masalah', max: 20 },
    { category: 'Manfaat bagi masyarakat', items: 'Kontribusi untuk masyarakat, potensi nilai tambah, sustainability', max: 15 },
    { category: 'Luaran Wajib', items: 'Laporan Kegiatan, Poster Kegiatan, dan Video Dokumentasi', max: 20 },
    { category: 'Jadwal & Anggaran', items: 'Lengkap, jelas, rasional, rinci, dan wajar', max: 10 },
    { category: 'Peer Assessment', items: 'Penilaian kontribusi antar teman satu kelompok', max: 10 },
  ]

  return (
    <>
      <Helmet>
        <title>Panduan Proyek Tapak Liman - WI1101 ITB</title>
        <meta name="description" content="Panduan resmi Proyek Tapak Liman ITB mata kuliah Pancasila WI1101. Cari tahu timeline, topik, sistematika laporan, dan kriteria penilaian." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(var(--edu-navy)_1px,transparent_1px),linear-gradient(90deg,var(--edu-navy)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-0 -left-40 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-black uppercase tracking-widest mb-6"
            >
              <Award size={14} /> PANDUAN PROYEK WI1101 ITB
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-5xl font-black tracking-tight"
              style={{ color: 'var(--edu-navy)' }}
            >
              Proyek Pancasila <span className="text-red-600">"Tapak Liman"</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-bold text-sm sm:text-base mt-4 max-w-3xl mx-auto leading-relaxed"
            >
              Buku panduan aktualisasi nilai-nilai Pancasila dalam tindakan nyata melalui proyek pengabdian masyarakat oleh Institut Teknologi Bandung.
            </motion.p>
          </div>

          {/* Philosophy Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-xl text-left"
            >
              <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-red-600" /> Arti Filosofis Tapak Liman
              </h3>
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed mb-6">
                Nama <strong className="text-slate-900 font-black">TAPAK LIMAN</strong> didasarkan pada gabungan makna filosofis:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-red-600 text-sm uppercase tracking-wider mb-2">TAPAK (Jejak)</h4>
                  <p className="text-xs font-bold text-slate-500 leading-relaxed">
                    Mewakili jejak aksi pengabdian nyata dan langkah konkret yang ditinggalkan mahasiswa untuk kemaslahatan masyarakat.
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-2">LIMAN (Gajah)</h4>
                  <p className="text-xs font-bold text-slate-500 leading-relaxed">
                    Mewakili gajah Ganesha yang merupakan lambang kebanggaan Institut Teknologi Bandung sebagai pelopor ilmu pengetahuan.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">KIRATA FILOSOFI</span>
                <h3 className="text-2xl font-black mt-2 mb-4">Akronim Aksi</h3>
                <p className="text-slate-300 font-medium text-xs leading-relaxed">
                  Gerakan ini juga dibentuk sebagai perwujudan karakter mahasiswa ITB yang unggul dan nasionalis.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-6">
                {acronym.map(a => (
                  <div key={a.char} className="p-2 bg-white/10 rounded-xl text-center group cursor-help relative">
                    <span className="font-black text-base text-red-400 block">{a.char}</span>
                    <span className="text-[8px] font-bold text-slate-300 block leading-none truncate">{a.word}</span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-3 bg-slate-950 rounded-xl shadow-xl border border-white/10 text-left opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                      <p className="text-[10px] font-black text-red-400 uppercase mb-1">{a.word}</p>
                      <p className="text-[9px] font-bold text-slate-300 leading-normal">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Timeline Proyek */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Timeline Proyek</h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Alur Pelaksanaan Proyek Tapak Liman</p>
            </div>
            
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-xl overflow-hidden text-left">
              <div className="relative pl-6 border-l-2 border-red-200 space-y-8">
                {timeline.map((t, idx) => (
                  <div key={t.week} className="relative">
                    {/* Circle Dot */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-red-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-lg bg-red-50 border border-red-100 text-red-700 text-[10px] font-black uppercase mb-1">
                        {t.week}
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-slate-800">{t.task}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 10 Topik Proyek */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">10 Pilihan Topik Proyek</h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Pilar Aksi Berdasarkan SDGs & Nilai Pancasila</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sidebar Tabs */}
              <div className="md:col-span-1 flex flex-col gap-2">
                {topics.map((top, idx) => (
                  <button
                    key={top.no}
                    onClick={() => setActiveTopicTab(idx)}
                    className={`p-4 text-left rounded-2xl font-bold text-xs uppercase tracking-wider transition-all border flex items-center justify-between ${
                      activeTopicTab === idx 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                        : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{top.no}. {top.title}</span>
                    <ChevronRight size={14} className={activeTopicTab === idx ? 'text-red-400' : 'text-slate-300'} />
                  </button>
                ))}
              </div>

              {/* Display Content Card */}
              <div className="md:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl text-left flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center font-black text-xs">
                      {topics[activeTopicTab].no}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TOPIK PILIHAN PROYEK</span>
                  </div>
                  
                  <h4 className="text-xl font-black text-slate-800 leading-tight mb-4">
                    {topics[activeTopicTab].title}
                  </h4>
                  
                  <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed mb-6">
                    {topics[activeTopicTab].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100/50">
                      <h5 className="font-black text-[10px] text-slate-800 uppercase tracking-wider mb-1">Aktivitas Utama</h5>
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{topics[activeTopicTab].acts}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100/50">
                      <h5 className="font-black text-[10px] text-slate-800 uppercase tracking-wider mb-1">Komponen Anggaran</h5>
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{topics[activeTopicTab].cost}</p>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] font-bold text-slate-400 italic">
                  *Silakan kerucutkan topik di atas menjadi judul proyek yang spesifik melalui asistensi dosen/asisten kelas.
                </p>
              </div>
            </div>
          </div>

          {/* Sistematika & Luaran */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 text-left">
            {/* Sistematika Laporan */}
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-xl">
              <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <FileText className="text-red-600" /> Sistematika Laporan Proyek
              </h3>
              
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-50">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Bagian Awal (Administrasi)</h4>
                  <p className="text-xs font-medium text-slate-500">Halaman Sampul (Cover), Daftar Isi, Halaman Pengesahan (Persetujuan Dosen & Asisten).</p>
                </div>
                <div className="pb-3 border-b border-slate-50">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1">BAB I: PENDAHULUAN</h4>
                  <p className="text-xs font-medium text-slate-500">A. Latar Belakang Masalah, B. Rumusan Masalah.</p>
                </div>
                <div className="pb-3 border-b border-slate-50">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1">BAB II: TINJAUAN PUSTAKA</h4>
                  <p className="text-xs font-medium text-slate-500">Teori 1, Teori 2, dst. (Referensi ilmiah yang mendukung).</p>
                </div>
                <div className="pb-3 border-b border-slate-50">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1">BAB III: METODOLOGI & PERENCANAAN</h4>
                  <p className="text-xs font-medium text-slate-500">A. Metodologi, B. Rancangan Kegiatan (Persiapan, Pengumpulan Data, Implementasi).</p>
                </div>
                <div className="pb-3 border-b border-slate-50">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1">BAB IV: HASIL & PEMBAHASAN</h4>
                  <p className="text-xs font-medium text-slate-500">A. Hasil Kegiatan, B. Analisis & Pembahasan.</p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1">BAB V: SIMPULAN & SARAN</h4>
                  <p className="text-xs font-medium text-slate-500">A. Simpulan, B. Saran untuk keberlanjutan program.</p>
                </div>
              </div>
            </div>

            {/* Luaran Wajib */}
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  <Layers className="text-red-400" /> Luaran Wajib Proyek
                </h3>
                <p className="text-slate-300 font-medium text-xs sm:text-sm leading-relaxed mb-6">
                  Setiap kelompok wajib mengumpulkan tiga jenis luaran utama pada minggu ke-15 melalui platform Edunex ITB:
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <h4 className="font-black text-xs text-red-400 uppercase tracking-wider mb-1">1. Laporan Kegiatan</h4>
                    <p className="text-[11px] font-medium text-slate-300">Proposal awal/rencana aksi, laporan kegiatan, serta roadmap pelaksanaan yang efisien dan rasional.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <h4 className="font-black text-xs text-red-400 uppercase tracking-wider mb-1">2. Poster Kegiatan</h4>
                    <p className="text-[11px] font-medium text-slate-300">Poster visual beresolusi tinggi yang merangkum keseluruhan latar belakang, metodologi, dan hasil pengabdian.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <h4 className="font-black text-xs text-red-400 uppercase tracking-wider mb-1">3. Video Dokumentasi</h4>
                    <p className="text-[11px] font-medium text-slate-300">Rekaman utuh proses perencanaan, implementasi lapangan, atau presentasi kelompok berdurasi pendek.</p>
                  </div>
                </div>
              </div>
              
              <p className="text-[10px] font-bold text-slate-500 italic mt-6">
                *Penulisan rujukan pustaka wajib menggunakan sistem Harvard atau Vancouver.
              </p>
            </div>
          </div>

          {/* Kriteria Penilaian */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
                <BarChart2 className="text-red-600" /> Kriteria Penilaian
              </h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Matriks Penilaian Kelompok & Proposal</p>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-black text-xs uppercase tracking-wider">
                      <th className="py-4 px-6">Aspek Kriteria Penilaian</th>
                      <th className="py-4 px-6">Deskripsi / Komponen</th>
                      <th className="py-4 px-6 text-center">Nilai Maksimal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteria.map((c, idx) => (
                      <tr key={idx} className="border-b border-slate-100 font-medium text-xs text-slate-600 hover:bg-slate-50/50">
                        <td className="py-4 px-6 font-black text-slate-800">{c.category}</td>
                        <td className="py-4 px-6 text-slate-500 leading-relaxed">{c.items}</td>
                        <td className="py-4 px-6 text-center font-black text-slate-800 bg-slate-50/30">{c.max}</td>
                      </tr>
                    ))}
                    <tr className="bg-red-50/30 font-black text-xs text-slate-800">
                      <td className="py-4 px-6 text-red-600">TOTAL EVALUASI</td>
                      <td className="py-4 px-6 text-slate-500">Nilai Akumulasi Proyek Keseluruhan</td>
                      <td className="py-4 px-6 text-center text-red-600 bg-red-50/50">100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
