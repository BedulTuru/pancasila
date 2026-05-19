import { motion, AnimatePresence } from 'framer-motion'
import { Award, Calendar, BookOpen, Layers, ShieldCheck, CheckCircle2, ChevronRight, FileText, BarChart2, Lightbulb, Compass, Users, Coins, HelpCircle, ArrowRight, ArrowDown } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

export default function TapakLiman() {
  const [hoveredLetter, setHoveredLetter] = useState(null)
  const [activeTopic, setActiveTopic] = useState(0)
  const [expandedBab, setExpandedBab] = useState(null)

  const stats = [
    { label: 'Pilihan Topik SDGs', value: '10', desc: 'UMKM hingga Lingkungan' },
    { label: 'Minggu Pelaksanaan', value: '8', desc: 'Minggu 9 s.d. 16' },
    { label: 'Luaran Utama Wajib', value: '3', desc: 'Laporan, Poster, Video' },
  ]

  const acronym = [
    { char: 'T', word: 'Tanggap', desc: 'Peka & sigap merespons isu sosial di lapangan.', color: 'from-rose-500 to-red-600', shadow: 'rgba(239, 68, 68, 0.2)' },
    { char: 'A', word: 'Adaptif', desc: 'Lincah menyesuaikan diri dengan dinamika warga.', color: 'from-orange-500 to-amber-600', shadow: 'rgba(245, 158, 11, 0.2)' },
    { char: 'P', word: 'Partisipatif', desc: 'Merangkul peran serta aktif masyarakat sasaran.', color: 'from-amber-500 to-yellow-600', shadow: 'rgba(234, 179, 8, 0.2)' },
    { char: 'A', word: 'Aksi', desc: 'Menghadirkan aksi nyata konkret, bukan wacana.', color: 'from-emerald-500 to-teal-600', shadow: 'rgba(16, 185, 129, 0.2)' },
    { char: 'K', word: 'Kolaboratif', desc: 'Sinergi harmonis mahasiswa lintas program studi.', color: 'from-blue-500 to-indigo-600', shadow: 'rgba(59, 130, 246, 0.2)' },
    { char: 'L', word: 'Lintas Ilmu', desc: 'Melebur saintek, desain, & seni dalam pengabdian.', color: 'from-violet-500 to-purple-600', shadow: 'rgba(139, 92, 246, 0.2)' },
    { char: 'I', word: 'Mandiri', desc: 'Inisiatif kelompok yang tangguh & kreatif.', color: 'from-fuchsia-500 to-pink-600', shadow: 'rgba(217, 70, 239, 0.2)' },
    { char: 'N', word: 'Nasionalis', desc: 'Dijiwai kecintaan mendalam pada NKRI & Pancasila.', color: 'from-rose-500 to-red-600', shadow: 'rgba(244, 63, 94, 0.2)' },
  ]

  const topics = [
    {
      no: 1,
      title: 'Pengembangan Ekonomi Desa (UMKM)',
      icon: <Coins className="text-amber-500" size={28} />,
      desc: 'Mahasiswa membantu masyarakat desa dalam mengembangkan usaha mikro, kecil, dan menengah (UMKM) melalui pelatihan pemasaran digital, manajemen keuangan, dan inovasi produk.',
      acts: 'Pelatihan pemasaran online, workshop keuangan, & pendampingan inovasi kemasan.',
      cost: 'Bahan baku demo produk, modul cetak, alat peraga presentasi, & biaya transportasi.',
      sdg: 'SDG 1: Tanpa Kemiskinan',
      theme: 'border-amber-100 bg-amber-50/20 text-amber-800'
    },
    {
      no: 2,
      title: 'Literasi Digital Masyarakat Desa',
      icon: <Lightbulb className="text-blue-500" size={28} />,
      desc: 'Mengajarkan keterampilan dasar teknologi informasi kepada warga desa, termasuk penggunaan komputer, internet secara produktif, dan media sosial secara bijak.',
      acts: 'Pelatihan komputer dasar, perintisan email warga, & edukasi keamanan digital.',
      cost: 'Modul digital cetak, sewa proyektor, kabel jaringan peraga, & transportasi.',
      sdg: 'SDG 4: Pendidikan Berkualitas',
      theme: 'border-blue-100 bg-blue-50/20 text-blue-800'
    },
    {
      no: 3,
      title: 'Pendidikan & Literasi Anak Desa',
      icon: <BookOpen className="text-emerald-500" size={28} />,
      desc: 'Mahasiswa mengadakan program bimbingan belajar kreatif serta kegiatan peningkatan literasi baca-tulis untuk anak-anak sekolah dasar di desa.',
      acts: 'Eksperimen sains menyenangkan, mendongeng nusantara, & perintisan pojok baca.',
      cost: 'Penyediaan buku bacaan anak, alat tulis tulis, papan tulis portabel, & hadiah lomba.',
      sdg: 'SDG 4: Pendidikan Berkualitas',
      theme: 'border-emerald-100 bg-emerald-50/20 text-emerald-800'
    },
    {
      no: 4,
      title: 'Kesehatan Masyarakat Desa',
      icon: <CheckCircle2 className="text-red-500" size={28} />,
      desc: 'Menyelenggarakan kegiatan penyuluhan kesehatan dasar serta kebersihan lingkungan untuk meningkatkan kualitas hidup sehat warga.',
      acts: 'Penyuluhan gizi keluarga, pembersihan fasilitas MCK desa, & sanitasi lingkungan.',
      cost: 'Alat sanitasi peraga, bahan penyuluhan cetak, & sabun/alat kebersihan warga.',
      sdg: 'SDG 3: Kehidupan Sehat',
      theme: 'border-red-100 bg-red-50/20 text-red-800'
    },
    {
      no: 5,
      title: 'Penghijauan & Pelestarian Alam',
      icon: <Compass className="text-green-600" size={28} />,
      desc: 'Kegiatan pembibitan, penanaman pohon produktif, serta edukasi ekologis guna menjaga ketahanan lahan dan mengurangi dampak perubahan iklim global.',
      acts: 'Penanaman puluhan bibit pohon buah, perintisan apotek hidup, & edukasi kompos.',
      cost: 'Pembelian bibit pohon unggul, pupuk organik, sekop, alat siram, & spanduk ekologis.',
      sdg: 'SDG 15: Ekosistem Daratan',
      theme: 'border-green-100 bg-green-50/20 text-green-800'
    },
    {
      no: 6,
      title: 'Pemberdayaan Perempuan Desa',
      icon: <Users className="text-purple-500" size={28} />,
      desc: 'Memberikan pelatihan keterampilan produktif serta dasar-dasar manajemen kewirausahaan untuk meningkatkan kemandirian finansial kaum perempuan desa.',
      acts: 'Pelatihan kerajinan rajut/jahit, manajemen pembukuan sederhana, & branding produk.',
      cost: 'Bahan baku praktek menjahit/kerajinan, konsumsi warga, & transportasi tim.',
      sdg: 'SDG 5: Kesetaraan Gender',
      theme: 'border-purple-100 bg-purple-50/20 text-purple-800'
    },
    {
      no: 7,
      title: 'Seni dan Budaya Desa',
      icon: <Award className="text-rose-500" size={28} />,
      desc: 'Menghidupkan kembali kesenian daerah dan kerajinan tradisional guna melestarikan identitas kebudayaan lokal di tengah gempuran modernisasi.',
      acts: 'Pelatihan musik/tarian tradisional anak desa, pementasan mini, & video dokumentasi.',
      cost: 'Sewa baju adat pentas, perbaikan alat musik tradisional, & konsumsi kegiatan.',
      sdg: 'SDG 11: Kota & Komunitas Berkelanjutan',
      theme: 'border-rose-100 bg-rose-50/20 text-rose-800'
    },
    {
      no: 8,
      title: 'Penyuluhan Hukum & Kewarganegaraan',
      icon: <FileText className="text-indigo-500" size={28} />,
      desc: 'Edukasi kesadaran hukum dasar, hak asasi manusia, serta pemahaman kewarganegaraan yang demokratis berlandaskan nilai-nilai Pancasila.',
      acts: 'Penyuluhan kesadaran hukum rumah tangga, musyawarah sengketa warga, & poster hukum.',
      cost: 'Cetak brosur hukum warga, konsumsi peserta, & transportasi pembicara.',
      sdg: 'SDG 16: Perdamaian & Keadilan',
      theme: 'border-indigo-100 bg-indigo-50/20 text-indigo-800'
    },
    {
      no: 9,
      title: 'Peningkatan Infrastruktur Desa',
      icon: <Layers className="text-slate-600" size={28} />,
      desc: 'Membantu merancang dan bergotong-royong memperbaiki fasilitas umum yang mendesak demi kenyamanan serta keselamatan aktivitas warga desa.',
      acts: 'Pengecoran jalan berlubang, pembuatan pos ronda baru, & pengecatan lapangan olahraga.',
      cost: 'Pembelian semen, pasir, cat kayu/besi, alat tukang, & konsumsi gotong-royong.',
      sdg: 'SDG 9: Industri & Infrastruktur',
      theme: 'border-slate-200 bg-slate-50/50 text-slate-800'
    },
    {
      no: 10,
      title: 'Kebersihan & Pengelolaan Sampah',
      icon: <ShieldCheck className="text-teal-600" size={28} />,
      desc: 'Membangun kesadaran sanitasi serta merintis sistem tata kelola sampah terpadu yang ramah lingkungan di pemukiman warga sekitar kampus.',
      acts: 'Penyuluhan pilah sampah organik, pembentukan bank sampah, & aksi bersih selokan.',
      cost: 'Pembelian tong sampah pilah besar, gerobak dorong, masker pelindung, & stiker edukasi.',
      sdg: 'SDG 12: Konsumsi & Produksi Bertanggung Jawab',
      theme: 'border-teal-100 bg-teal-50/20 text-teal-800'
    }
  ]

  const timeline = [
    { week: 'Minggu 9', task: 'Penentuan Tema & Judul', desc: 'Pembagian kelompok kelas (maks 10 orang) dan pengajuan ide judul aksi berbasis SDGs.' },
    { week: 'Minggu 10', task: 'Penyusunan Proposal', desc: 'Menyusun proposal lengkap dengan rancangan anggaran biaya (RAB) dan road map kegiatan.' },
    { week: 'Minggu 11', task: 'Presentasi Proposal', desc: 'Asistensi & pertanggungjawaban rancangan program di hadapan Dosen Pancasila.' },
    { week: 'Minggu 12-13', task: 'Implementasi Program', desc: 'Meluncur ke lapangan (dalam/luar kampus) untuk aksi sosial nyata bersama masyarakat.' },
    { week: 'Minggu 14', task: 'Penyusunan Luaran', desc: 'Menulis draf laporan, merancang poster ilmiah, & mengedit video kompilasi perjalanan.' },
    { week: 'Minggu 15', task: 'Presentasi & Edunex', desc: 'Mengunggah file laporan akhir ke portal Edunex ITB dan melaksanakan presentasi kelompok.' },
    { week: 'Minggu 16', task: 'Evaluasi & Nilai', desc: 'Rekapitulasi nilai kelompok, penilaian video/poster, serta pengisian lembar peer assessment.' }
  ]

  const babs = [
    { 
      id: 'bab1', 
      title: 'BAB I. PENDAHULUAN', 
      sub: 'A. Latar Belakang Masalah, B. Rumusan Masalah', 
      detail: 'Menyajikan secara tajam latar belakang fenomena sosial di lapangan, analisis urgensi mengapa masalah tersebut harus segera dipecahkan kelompok Anda, serta rumusan pertanyaan masalah yang sistematis.' 
    },
    { 
      id: 'bab2', 
      title: 'BAB II. TINJAUAN PUSTAKA', 
      sub: 'Kajian Teori Ilmiah & Studi Terdahulu', 
      detail: 'Berisi landasan teori ilmiah, konsep pengabdian sosial, serta korelasi butir-butir Pancasila dengan topik SDGs. Rujukan wajib mengikuti format penulisan standar akademik Harvard.' 
    },
    { 
      id: 'bab3', 
      title: 'BAB III. METODOLOGI & PERENCANAAN', 
      sub: 'Metodologi, Persiapan, Pengumpulan Data, & Implementasi', 
      detail: 'A. Deskripsi metode pendekatan masyarakat. B. Rencana aksi konkret yang meliputi tahap persiapan administratif, teknik pengumpulan data lapangan, hingga lini masa implementasi program.' 
    },
    { 
      id: 'bab4', 
      title: 'BAB IV. HASIL & PEMBAHASAN', 
      sub: 'A. Hasil Program Aksi Nyata, B. Analisis Pembahasan', 
      detail: 'Mendokumentasikan seluruh luaran nyata program, membandingkan kondisi sebelum vs sesudah intervensi kelompok, serta mengevaluasi tingkat partisipasi dan kepuasan warga sasaran.' 
    },
    { 
      id: 'bab5', 
      title: 'BAB V. SIMPULAN & SARAN', 
      sub: 'A. Simpulan Utama, B. Saran Keberlanjutan', 
      detail: 'Simpulan menyeluruh atas rumusan masalah yang terjawab, serta melampirkan saran konkret yang realistis bagi kelompok mahasiswa selanjutnya atau pihak perangkat desa setempat.' 
    }
  ]

  const grading = [
    { name: 'Kreativitas & Gagasan', weight: 25, color: 'from-red-500 to-rose-600', desc: 'Inovasi, ketajaman rumusan masalah, & ketepatan sasaran masyarakat.' },
    { name: 'Kesesuaian Metode', weight: 20, color: 'from-orange-500 to-amber-600', desc: 'Kesesuaian serta kepraktisan metodologi dalam memecahkan masalah.' },
    { name: 'Manfaat & Keberlanjutan', weight: 15, color: 'from-amber-500 to-yellow-600', desc: 'Kontribusi riil bagi warga serta potensi program dilanjutkan mandiri.' },
    { name: 'Luaran (Poster & Video)', weight: 20, color: 'from-emerald-500 to-teal-600', desc: 'Estetika poster ilmiah & kualitas video dokumentasi implementasi.' },
    { name: 'Jadwal & Anggaran', weight: 10, color: 'from-blue-500 to-indigo-600', desc: 'Kewajaran, kerincian rencana anggaran biaya (RAB), & efisiensi waktu.' },
    { name: 'Peer Assessment', weight: 10, color: 'from-purple-500 to-pink-600', desc: 'Penilaian keaktifan bekerja sama dari rekan satu kelompok Anda.' }
  ]

  return (
    <>
      <Helmet>
        <title>Panduan Tapak Liman WI1101 ITB - Buku Pedoman Resmi</title>
        <meta name="description" content="Pedoman resmi Proyek Tapak Liman ITB mata kuliah Pancasila WI1101. Cari tahu 10 pilihan topik, timeline, sistematika laporan, & kriteria penilaian." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
        
        {/* Abstract shapes & micro-grids for stunning UI/UX depth */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(var(--edu-navy)_1.5px,transparent_1.5px),linear-gradient(90deg,var(--edu-navy)_1.5px,transparent_1.5px)] bg-[size:50px_50px]" />
        <div className="absolute top-0 -left-60 w-[45rem] h-[45rem] bg-gradient-to-tr from-red-200/10 to-rose-200/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -right-60 w-[40rem] h-[40rem] bg-gradient-to-bl from-amber-200/20 to-orange-100/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[45rem] h-[45rem] bg-gradient-to-tr from-emerald-200/10 to-teal-200/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* ================= HERO AREA ================= */}
          <div className="text-center mb-24 relative">
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border border-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-widest mb-8 shadow-md"
            >
              {/* ITB Miniature Emblem */}
              <img src="/itb.png" alt="ITB Logo" className="h-5 w-auto" />
              <div className="w-px h-3 bg-slate-200" />
              <span className="text-red-600">WI1101 MATA KULIAH PANCASILA</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl sm:text-8xl font-black tracking-tight leading-none mb-6 text-slate-900"
            >
              Pedoman Proyek <br />
              <span className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">"TAPAK LIMAN"</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-bold text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Buku pedoman resmi aktualisasi nilai-nilai luhur Pancasila dalam aksi nyata pengabdian masyarakat oleh Tim Dosen Pancasila Institut Teknologi Bandung.
            </motion.p>

            {/* Premium Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 p-6 shadow-xl flex flex-col justify-between text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-rose-600" />
                  <span className="text-3xl sm:text-4xl font-black text-slate-800 mb-1">{s.value}</span>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider mb-0.5">{s.label}</span>
                  <span className="text-[9px] font-bold text-slate-400">{s.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================= THE PHILOSOPHY ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            
            {/* Left large description */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-[3rem] p-10 sm:p-12 border border-slate-100 shadow-2xl text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">ASPEK HISTORIS & MAKNA</span>
                <h3 className="text-3xl font-black text-slate-950 mb-6">
                  Filosofi Daun & Ganesha ITB
                </h3>
                <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-8">
                  Nama **TAPAK LIMAN** (*Elephantopus scaber*) diambil dari nama sejenis tumbuhan obat tropis tangguh berkhasiat tinggi yang kokoh hidup di bumi nusantara. Pemilihan nama ini memadukan dua landasan nilai luhur:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <span className="text-2xl mb-3 block">👣</span>
                  <h4 className="font-black text-slate-800 text-sm mb-1.5">TAPAK (Jejak Aksi)</h4>
                  <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                    Mewakili jejak aksi pengabdian nyata, langkah kaki konkret, serta warisan nilai kebaikan yang ditinggalkan kelompok mahasiswa bagi kesejahteraan warga desa sasaran.
                  </p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <span className="text-2xl mb-3 block">🐘</span>
                  <h4 className="font-black text-slate-800 text-sm mb-1.5">LIMAN (Ganesha ITB)</h4>
                  <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                    Berarti Gajah, merepresentasikan figur Dewa Ganesha lambang Institut Teknologi Bandung selaku dinamisator ilmu sains, teknologi, dan seni yang berguna bagi bangsa.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive Tile Accordion */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl text-left flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.05)_1.5px,transparent_1.5px)] bg-[size:40px_40px] pointer-events-none" />
              
              <div>
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">ACRONYM SYLLABUS</span>
                <h3 className="text-2xl font-black mb-2">Kirata Delapan Aksi</h3>
                <p className="text-slate-400 font-medium text-xs leading-relaxed mb-6">
                  Dekati salah satu ubin huruf di bawah untuk membaca wujud nilai kepemimpinan pengabdian kelompok Anda:
                </p>
              </div>

              {/* Acronym Grid */}
              <div className="grid grid-cols-4 gap-2.5 relative z-10">
                {acronym.map((item, idx) => (
                  <div
                    key={item.char}
                    onMouseEnter={() => setHoveredLetter(idx)}
                    onMouseLeave={() => setHoveredLetter(null)}
                    className="p-3.5 bg-white/10 rounded-2xl text-center cursor-pointer transition-all hover:bg-red-600 hover:scale-105 active:scale-95 border border-white/5 relative group"
                  >
                    <span className="font-black text-lg text-red-400 block group-hover:text-white transition-colors">{item.char}</span>
                    <span className="text-[8px] font-black uppercase text-slate-400 block truncate group-hover:text-white transition-colors">{item.word}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Description Box */}
              <div className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/5 h-24 flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={hoveredLetter}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[11px] font-medium text-slate-300 leading-relaxed"
                  >
                    {hoveredLetter !== null 
                      ? acronym[hoveredLetter].desc 
                      : 'Arahkan kursor atau ketuk salah satu kotak huruf di atas untuk membaca maknanya.'
                    }
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ================= 10 TOPIK UTAMA ================= */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">SDGs & PANCASILA PILAR</span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">10 Pilihan Rencana Topik</h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                Navigasi pilihan program resmi tim dosen Pancasila ITB
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Selector Sidebar */}
              <div className="lg:col-span-1 flex flex-col gap-2 max-h-[36rem] overflow-y-auto pr-2 custom-scrollbar">
                {topics.map((t, idx) => (
                  <button
                    key={t.no}
                    onClick={() => setActiveTopic(idx)}
                    className={`p-4 text-left rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all border flex items-center gap-4 ${
                      activeTopic === idx 
                        ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-200/50 scale-[1.01]' 
                        : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black ${
                      activeTopic === idx ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {t.no}
                    </span>
                    <span className="truncate">{t.title}</span>
                  </button>
                ))}
              </div>

              {/* Right Visual Details Display */}
              <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 sm:p-12 border border-slate-100 shadow-2xl text-left flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[3rem] flex items-center justify-center pointer-events-none">
                  {topics[activeTopic].icon}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-[9px] font-black uppercase tracking-wider">
                      TOPIK {topics[activeTopic].no}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-wider">
                      {topics[activeTopic].sdg}
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight mb-4 pr-16">
                    {topics[activeTopic].title}
                  </h4>

                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-8">
                    {topics[activeTopic].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[9px] font-black text-red-600 uppercase tracking-widest block mb-2">Aktivitas Utama Kelompok</span>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        {topics[activeTopic].acts}
                      </p>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest block mb-2">Komponen Rencana Anggaran</span>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        {topics[activeTopic].cost}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-red-50/50 border border-red-100/50 rounded-2xl text-center sm:text-left">
                  <p className="text-[11px] font-bold text-red-700 leading-snug">
                    📌 <strong>Langkah Selanjutnya:</strong> Rumuskan proposal dan tentukan roadmap aksi Anda bersama asisten kelas Pancasila Anda pada Minggu ke-10.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= TIMELINE STAGE ================= */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">PROGRES PERKULIAHAN</span>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">Garis Waktu Tahapan Proyek</h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Timeline mingguan pelaksanaan Tapak Liman</p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-red-100 space-y-10 text-left">
              {timeline.map((step, idx) => (
                <div key={step.week} className="relative">
                  {/* Outer circle dot */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-red-600 flex items-center justify-center shadow-md">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                  </div>
                  
                  <div className="bg-white rounded-[2rem] border border-slate-100 p-6 sm:p-8 shadow-xl max-w-4xl hover:border-red-200 transition-all group">
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase">
                        {step.week}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-slate-800 mb-1 group-hover:text-red-700 transition-colors">
                      {step.task}
                    </h4>
                    <p className="text-xs font-medium text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= MATRIKS PENILAIAN & SISTEMATIKA ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 text-left">
            
            {/* Sistematika Laporan Accordion */}
            <div className="bg-white rounded-[3rem] p-8 sm:p-10 border border-slate-100 shadow-2xl">
              <div>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">FORMAT AKADEMIK</span>
                <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  <FileText className="text-red-600" /> Sistematika Laporan Proyek
                </h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">Ketuk nama bab untuk membaca penjelasan isi:</p>
              </div>

              <div className="space-y-3">
                {babs.map((bab) => {
                  const isOpen = expandedBab === bab.id
                  return (
                    <div key={bab.id} className="border border-slate-100 rounded-2xl overflow-hidden transition-all">
                      <button
                        onClick={() => setExpandedBab(isOpen ? null : bab.id)}
                        className={`w-full p-5 text-left font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-between transition-colors ${
                          isOpen ? 'bg-red-50 text-red-700' : 'bg-slate-50/50 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <span>{bab.title}</span>
                          <span className="block text-[9px] font-bold text-slate-400 normal-case mt-0.5">{bab.sub}</span>
                        </div>
                        <ChevronRight size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-90 text-red-600' : 'text-slate-400'}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white border-t border-slate-50 p-5"
                          >
                            <p className="text-[11px] sm:text-xs font-medium text-slate-500 leading-relaxed">
                              {bab.detail}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Matriks Penilaian Rings */}
            <div className="bg-slate-900 text-white rounded-[3rem] p-8 sm:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(white_1.5px,transparent_1.5px),linear-gradient(90deg,white_1.5px,transparent_1.5px)] bg-[size:30px_30px] pointer-events-none" />
              
              <div>
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">EVALUASI AKADEMIK</span>
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <BarChart2 className="text-red-400" /> Kriteria Evaluasi Nilai Proyek
                </h3>

                <div className="space-y-4">
                  {grading.map((g) => (
                    <div key={g.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-slate-300">{g.name}</span>
                        <span className="text-red-400">{g.weight}%</span>
                      </div>
                      
                      {/* Bar indicator */}
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${g.color}`} 
                          style={{ width: `${g.weight * 4}%` }} 
                        />
                      </div>
                      <p className="text-[9px] font-medium text-slate-500 leading-snug">
                        {g.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Akumulasi Nilai</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 font-black text-xs">
                  100% MAKSIMAL
                </span>
              </div>
            </div>
          </div>

          {/* ================= GABUNG SEKARANG CALLOUT ================= */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-600 to-rose-700 rounded-[3rem] p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.15)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.15)_1.5px,transparent_1.5px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-black/20 rounded-full blur-2xl pointer-events-none" />

            <h3 className="text-3xl sm:text-4xl font-black mb-4">Mari Eksekusi Aksi Nyata Anda!</h3>
            <p className="text-slate-100 font-bold text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
              Pancasila bukan sekadar butir ingatan tertulis, melainkan wujud rasa persaudaraan dan keadilan yang kita salurkan langsung ke masyarakat pelosok.
            </p>

            <div className="inline-flex flex-wrap justify-center gap-4">
              <a 
                href="/portal"
                className="px-8 py-4 bg-white text-red-700 hover:bg-slate-50 hover:shadow-xl rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98]"
              >
                Mulai Belajar Pancasila
              </a>
              <a 
                href="/leaderboard"
                className="px-8 py-4 bg-black/30 hover:bg-black/45 border border-white/20 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98]"
              >
                Papan Peringkat Belajar
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
