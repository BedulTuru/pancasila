import { motion, AnimatePresence } from 'framer-motion'
import { Award, Calendar, BookOpen, Layers, ShieldCheck, CheckCircle2, ChevronRight, FileText, BarChart2, Lightbulb, Compass, Users, Coins, Heart, Star, Sparkles } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

export default function TapakLiman() {
  const [activeLetter, setActiveLetter] = useState(0)
  const [activeTopic, setActiveTopic] = useState(0)
  const [expandedBab, setExpandedBab] = useState(null)

  const stats = [
    { label: 'PILIHAN SDGs', value: '10 TOPIK', desc: 'Pedoman Aksi Resmi', theme: 'border-slate-100 bg-slate-50/50 text-slate-800' },
    { label: 'LINI MASA AKSI', value: '8 MINGGU', desc: 'Minggu 9 s.d. 16', theme: 'border-slate-100 bg-slate-50/50 text-slate-800' },
    { label: 'LUARAN KELOMPOK', value: '3 KARYA', desc: 'Laporan, Poster, Video', theme: 'border-slate-100 bg-slate-50/50 text-slate-800' },
  ]

  const acronym = [
    { char: 'T', word: 'Tanggap', desc: 'Peka dan sigap dalam merespons isu kemanusiaan serta dinamika sosial di lapangan.', bg: 'bg-rose-50 border-rose-100 text-rose-700' },
    { char: 'A', word: 'Adaptif', desc: 'Lincah menyesuaikan diri dengan kultur dan kearifan lokal warga desa mitra.', bg: 'bg-amber-50 border-amber-100 text-amber-700' },
    { char: 'P', word: 'Partisipatif', desc: 'Merangkul peran serta aktif dan kolaboratif dari seluruh lapisan masyarakat.', bg: 'bg-yellow-50 border-yellow-100 text-yellow-700' },
    { char: 'A', word: 'Aksi Nyata', desc: 'Menghadirkan solusi konkret yang berdaya guna secara fisik maupun edukatif.', bg: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
    { char: 'K', word: 'Kolaboratif', desc: 'Membangun sinergi kelompok lintas program studi secara harmonis.', bg: 'bg-blue-50 border-blue-100 text-blue-700' },
    { char: 'L', word: 'Lintas Ilmu', desc: 'Meleburkan sains, seni rupa desain, dan sosial-humaniora dalam pemecahan masalah.', bg: 'bg-violet-50 border-violet-100 text-violet-700' },
    { char: 'I', word: 'Inisiatif', desc: 'Mendorong daya cipta mandiri yang kreatif, solutif, dan efisien.', bg: 'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700' },
    { char: 'M', word: 'Nasionalis', desc: 'Dijiwai kecintaan mendalam pada tanah air berlandaskan ideologi Pancasila.', bg: 'bg-rose-50 border-rose-100 text-rose-700' },
  ]

  const topics = [
    {
      no: 1,
      title: 'Pengembangan Ekonomi Desa (UMKM)',
      icon: <Coins className="text-amber-600" size={24} />,
      desc: 'Membantu pelaku usaha mikro pedesaan dalam ekspansi pasar digital, penataan pembukuan kas modern, serta inovasi identitas kemasan produk agar berdaya saing tinggi.',
      acts: 'Pelatihan e-commerce, digital branding, dan pembuatan katalog produk warga.',
      cost: 'Bahan baku demonstrasi produk, cetak panduan bisnis, & spanduk sosialisasi.',
      sdg: 'SDG 1: Tanpa Kemiskinan',
    },
    {
      no: 2,
      title: 'Literasi Digital Masyarakat Desa',
      icon: <Lightbulb className="text-cyan-600" size={24} />,
      desc: 'Mengajarkan kecakapan dasar teknologi informasi kepada warga desa, termasuk keamanan berselancar digital, e-government, serta penggunaan internet sehat.',
      acts: 'Pelatihan dasar komputer, edukasi deteksi hoax, dan pembentukan website desa.',
      cost: 'Modul materi digital cetak, konsumsi warga peserta, & transportasi tim.',
      sdg: 'SDG 4: Pendidikan Berkualitas',
    },
    {
      no: 3,
      title: 'Pendidikan & Literasi Anak Desa',
      icon: <BookOpen className="text-emerald-600" size={24} />,
      desc: 'Mengadakan program belajar sains kreatif yang aplikatif, perintisan pojok baca/perpustakaan mini, serta metode mendongeng budi pekerti nusantara.',
      acts: 'Eksperimen sains sederhana, kelas mendongeng karakter Pancasila, & donasi buku.',
      cost: 'Pembelian buku bacaan berkualitas, alat peraga sains, & rak buku portabel.',
      sdg: 'SDG 4: Pendidikan Berkualitas',
    },
    {
      no: 4,
      title: 'Kesehatan & Higienitas Masyarakat',
      icon: <Heart className="text-rose-600" size={24} />,
      desc: 'Menyelenggarakan penyuluhan gizi seimbang pencegahan stunting, pembenahan sanitasi dasar, serta pemeriksaan kesehatan umum warga secara gratis.',
      acts: 'Penyuluhan stunting keluarga, gotong royong perbaikan sanitasi umum, & penyediaan tong sampah.',
      cost: 'Alat sanitasi peraga, bahan penyuluhan cetak, & sabun/alat kebersihan warga.',
      sdg: 'SDG 3: Kehidupan Sehat',
    },
    {
      no: 5,
      title: 'Penghijauan & Pelestarian Lingkungan',
      icon: <Compass className="text-green-600" size={24} />,
      desc: 'Melakukan penanaman bibit pohon produktif unggulan, pelatihan pembuatan pupuk kompos mandiri, serta pembuatan apotek hidup guna mereduksi degradasi lahan.',
      acts: 'Penanaman pohon produktif, workshop pengomposan mandiri, & plang edukasi lingkungan.',
      cost: 'Pembelian bibit pohon unggulan, pupuk organik, sekop mini, & biaya transportasi.',
      sdg: 'SDG 15: Ekosistem Daratan',
    },
    {
      no: 6,
      title: 'Pemberdayaan Perempuan Desa',
      icon: <Users className="text-violet-600" size={24} />,
      desc: 'Memberikan pelatihan keterampilan kreatif (kerajinan rajut/daur ulang) dan pembukuan sederhana guna memacu kemandirian ekonomi kaum ibu PKK.',
      acts: 'Workshop kerajinan tangan daur ulang sampah, pelatihan manajemen usaha mikro, & branding.',
      cost: 'Bahan baku praktek menjahit/kerajinan, konsumsi warga, & transportasi tim.',
      sdg: 'SDG 5: Kesetaraan Gender',
    },
    {
      no: 7,
      title: 'Revitalisasi Seni dan Budaya Lokal',
      icon: <Award className="text-orange-600" size={24} />,
      desc: 'Mendokumentasikan seni musik dan tari tradisional daerah melalui pembuatan konten kreatif agar warisan budaya nusantara terus berkembang dinamis.',
      acts: 'Pelatihan instrumen musik tradisional bagi anak, pembuatan film dokumentasi seni desa.',
      cost: 'Sewa perlengkapan pementasan mini, dokumentasi profesional, & konsumsi kegiatan.',
      sdg: 'SDG 11: Komunitas Berkelanjutan',
    },
    {
      no: 8,
      title: 'Penyuluhan Kesadaran Hukum Warga',
      icon: <FileText className="text-blue-600" size={24} />,
      desc: 'Edukasi pemahaman hukum keluarga, hak warga negara, kesadaran berkendara, serta persatuan kebhinekaan sosial berlandaskan Pancasila.',
      acts: 'Penyuluhan sadar hukum sengketa tanah/keluarga, pembuatan infografis hukum sipil.',
      cost: 'Cetak pamflet panduan hukum warga, konsumsi peserta, & transportasi pembicara.',
      sdg: 'SDG 16: Perdamaian & Keadilan',
    },
    {
      no: 9,
      title: 'Peningkatan Sarana Prasarana Fisik',
      icon: <Layers className="text-slate-600" size={24} />,
      desc: 'Gotong royong merancang dan membenahi fasilitas umum desa berskala mikro (seperti pos ronda, plang arah, atau halte) demi keselamatan warga.',
      acts: 'Pembuatan rambu keselamatan jalan, perbaikan sarana pos ronda, & pengecatan fasilitas PAUD.',
      cost: 'Semen, pasir, cat kayu/besi tahan air, papan kayu petunjuk, & konsumsi kerja bakti.',
      sdg: 'SDG 9: Industri & Infrastruktur',
    },
    {
      no: 10,
      title: 'Manajemen Sampah & Bank Sampah',
      icon: <ShieldCheck className="text-teal-600" size={24} />,
      desc: 'Mengedukasi pemilihan sampah organik/anorganik secara mandiri serta menginisiasi perintisan sistem bank sampah bernilai guna ekonomis.',
      acts: 'Penyuluhan klasifikasi sampah, peragaan pembuatan ecobrick, & penyediaan tong sampah pilah.',
      cost: 'Tong sampah besar pilah 3 warna, masker sarung tangan pelindung, & stiker panduan.',
      sdg: 'SDG 12: Konsumsi & Produksi Bertanggung Jawab',
    }
  ]

  const timeline = [
    { week: 'Minggu 9', task: 'Rembuk Gagasan Awal', desc: 'Pembentukan tim kolaborasi kelas (maks 10 orang) dan perumusan rancangan ide proyek berbasis SDGs.', color: 'border-slate-100 bg-slate-50/50 text-slate-800' },
    { week: 'Minggu 10', task: 'Penyusunan Proposal & RAB', desc: 'Merumuskan draf proposal komprehensif, rincian anggaran biaya logistik, serta linimasa eksekusi.', color: 'border-slate-100 bg-slate-50/50 text-slate-800' },
    { week: 'Minggu 11', task: 'Sidang Asistensi Kelompok', desc: 'Presentasi dan pertanggungjawaban rancangan proposal program di hadapan Dosen Pembimbing Pancasila.', color: 'border-slate-100 bg-slate-50/50 text-slate-800' },
    { week: 'Minggu 12-13', task: 'Implementasi Aksi Lapangan', desc: 'Turun langsung ke masyarakat desa sasaran guna merealisasikan pilar program pengabdian secara intensif.', color: 'border-slate-100 bg-slate-50/50 text-slate-800' },
    { week: 'Minggu 14', task: 'Penyusunan Karya Luaran', desc: 'Finalisasi pembuatan laporan akademis, rancangan poster ilmiah infografis, dan editing video dokumentasi.', color: 'border-slate-100 bg-slate-50/50 text-slate-800' },
    { week: 'Minggu 15', task: 'Sidang Hasil & Unggah Edunex', desc: 'Mengunggah seluruh luaran wajib kelompok ke portal akademik Edunex ITB dan melaksanakan presentasi akhir.', color: 'border-slate-100 bg-slate-50/50 text-slate-800' },
    { week: 'Minggu 16', task: 'Peer Review & Rekap Nilai', desc: 'Pengisian peer assessment keaktifan anggota tim serta rekapitulasi penilaian total dosen.', color: 'border-slate-100 bg-slate-50/50 text-slate-800' }
  ]

  const babs = [
    { 
      id: 'bab1', 
      title: 'BAB I. PENDAHULUAN', 
      sub: 'Latar Belakang Masalah, Urgensi Aksi, & Rumusan Pertanyaan', 
      detail: 'Menjabarkan fenomena sosial di lapangan secara tajam, mengulas analisis mendasar mengapa masalah tersebut krusial dipecahkan, serta merumuskan pertanyaan aksi kelompok.' 
    },
    { 
      id: 'bab2', 
      title: 'BAB II. TINJAUAN PUSTAKA', 
      sub: 'Kajian Teori Ilmiah, Landasan SDGs, & Butir Pancasila', 
      detail: 'Menguraikan landasan teori akademik pendukung pengabdian, memetakan keterkaitan dengan SDGs global, serta mengkorelasikan butir-butir Pancasila yang diaktualisasikan.' 
    },
    { 
      id: 'bab3', 
      title: 'BAB III. METODOLOGI & PERENCANAAN', 
      sub: 'Metode Pendekatan Sosial, Persiapan Logistik, & Lini Masa', 
      detail: 'Uraian metode pendekatan masyarakat (partisipatif), persiapan administratif/perizinan, pengumpulan data awal, serta penyusunan timeline pelaksanaan lapangan.' 
    },
    { 
      id: 'bab4', 
      title: 'BAB IV. HASIL DAN PEMBAHASAN', 
      sub: 'Realisasi Luaran, Perbandingan Dampak, & Evaluasi Kendala', 
      detail: 'Mendokumentasikan seluruh pencapaian fisik/non-fisik, menyandingkan kondisi sebelum vs sesudah program, serta mengulas analisis kendala lapangan dan solusinya.' 
    },
    { 
      id: 'bab5', 
      title: 'BAB V. PENUTUP & REKOMENDASI', 
      sub: 'Simpulan Utama Aksi & Saran Realistis Keberlanjutan', 
      detail: 'Simpulan menyeluruh atas pertanyaan Bab I yang berhasil dijawab, melampirkan rekomendasi bagi perangkat desa setempat maupun tim penerus mahasiswa berikutnya.' 
    }
  ]

  const grading = [
    { name: 'Ketajaman Analisis & Urgensi Masalah', weight: 25, desc: 'Inovasi, keaslian gagasan, serta ketepatan sasaran warga.' },
    { name: 'Sistematika Metodologi', weight: 20, desc: 'Kelayakan, efisiensi langkah, dan keselarasan metode aksi.' },
    { name: 'Kualitas Luaran Wajib (Poster & Video)', weight: 20, desc: 'Estetika desain poster ilmiah, kejelasan pesan, dan video dokumenter.' },
    { name: 'Dampak Sosial & Keberlanjutan', weight: 15, desc: 'Manfaat nyata berkelanjutan serta potensi dilanjutkan mandiri.' },
    { name: 'Ketertiban RAB & Timeline', weight: 10, desc: 'Kewajaran dana, efisiensi belanja, dan pemenuhan jadwal.' },
    { name: 'Penilaian Anggota Tim (Peer Assessment)', weight: 10, desc: 'Tingkat kolaborasi, tanggung jawab tugas, dan keaktifan anggota.' }
  ]

  return (
    <>
      <Helmet>
        <title>Pedoman Resmi Proyek Tapak Liman WI1101 ITB</title>
        <meta name="description" content="Pedoman resmi pelaksanaan proyek pengabdian masyarakat Tapak Liman mata kuliah Pancasila WI1101 ITB." />
      </Helmet>

      {/* Modern Bright Stark White Layout (No grid pattern at all) */}
      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-white text-slate-800">
        
        {/* Soft elegant atmospheric blurs only, no grid backgrounds */}
        <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-[#002855]/[0.02] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-60 w-[40rem] h-[40rem] bg-amber-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* ================= HERO AREA ================= */}
          <div className="text-center mb-24 relative">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm"
            >
              <img src="/itb.png" alt="ITB Logo" className="h-5 w-auto" />
              <div className="w-px h-3.5 bg-slate-200" />
              <span className="text-slate-700 font-black flex items-center gap-1.5">
                <Sparkles size={12} className="text-amber-500" /> PROGRAM PENGABDIAN WI1101
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-slate-900"
            >
              Buku Panduan Proyek <br />
              <span className="text-[#002855]">
                "TAPAK LIMAN"
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="text-slate-500 font-bold text-xs sm:text-base max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Pedoman resmi pelaksanaan program aksi pengabdian masyarakat berbasis SDGs terapan bagi mahasiswa Institut Teknologi Bandung.
            </motion.p>

            {/* Pristine Modern Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200/70 p-6 flex flex-col justify-between text-center shadow-sm hover:border-slate-300 transition-all duration-300"
                >
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 tracking-tight">{s.value}</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{s.label}</span>
                  <span className="text-[10px] font-bold text-slate-500">{s.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================= THE PHILOSOPHY SECTION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            
            {/* Left Box: Macro Philosophy */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/70 shadow-sm text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">MAKNA & FILOSOFI HISTORIS</span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#002855] mb-5 leading-tight">
                  Sinergi Tanaman Tapak Liman & Ganesha ITB
                </h3>
                <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-8">
                  Nama **TAPAK LIMAN** (*Elephantopus scaber*) memadukan dua landasan luhur pengabdian mahasiswa di lingkungan masyarakat sasaran:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-extrabold text-lg mb-4">
                    👣
                  </div>
                  <h4 className="font-black text-slate-900 text-sm mb-1.5">TAPAK (Jejak Aksi Kelompok)</h4>
                  <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                    Merepresentasikan jejak kontribusi konkret, aksi nyata fisik/non-fisik, serta teladan moral yang ditinggalkan kelompok mahasiswa bagi masyarakat penerima manfaat.
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-extrabold text-lg mb-4">
                    🐘
                  </div>
                  <h4 className="font-black text-slate-900 text-sm mb-1.5">LIMAN (Gajah Ganesha)</h4>
                  <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                    Berarti Gajah, lambang figur Ganesha selaku ikon ITB wadah pengembangan ilmu pengetahuan sains, teknologi, dan seni yang bermanfaat bagi bangsa.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Box: Elegant Switcher */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">PANDUAN NILAI KELOMPOK</span>
                <h3 className="text-xl font-black text-slate-900 mb-2">8 Karakter Utama</h3>
                <p className="text-slate-500 font-bold text-[10px] leading-relaxed mb-6">
                  Ketuk salah satu kotak huruf menyala di bawah untuk memunculkan penjelasan pilar nilai kelompok Anda:
                </p>
              </div>

              {/* Acronym Buttons */}
              <div className="grid grid-cols-4 gap-2.5 mb-6">
                {acronym.map((item, idx) => (
                  <button
                    key={item.char}
                    onClick={() => setActiveLetter(idx)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      activeLetter === idx 
                        ? 'border-slate-300 bg-slate-100 text-slate-900 scale-105 shadow-sm' 
                        : 'border-slate-100 bg-slate-50/50 text-slate-400 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-black text-base block">{item.char}</span>
                    <span className="text-[8px] font-black block truncate opacity-85">{item.word}</span>
                  </button>
                ))}
              </div>

              {/* Explanation Board */}
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 h-24 flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeLetter}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[11px] font-bold text-slate-600 leading-relaxed"
                  >
                    <strong>{acronym[activeLetter].word}</strong>: {acronym[activeLetter].desc}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ================= 10 TOPIK SDGs ================= */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 text-[9px] font-extrabold uppercase tracking-widest mb-3">
                10 TOPIK SDGs PILIHAN RESMI
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Katalog Pilihan Program Aksi</h3>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Ketuk nama topik di kiri untuk melihat penjelasan rincian:</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Selector */}
              <div className="lg:col-span-1 flex flex-col gap-2 max-h-[34rem] overflow-y-auto pr-2 custom-scrollbar">
                {topics.map((t, idx) => (
                  <button
                    key={t.no}
                    onClick={() => setActiveTopic(idx)}
                    className={`p-4 text-left rounded-xl font-black text-xs uppercase tracking-wider transition-all border flex items-center gap-4 ${
                      activeTopic === idx 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md scale-[1.01]' 
                        : 'bg-white border-slate-200/70 text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded flex items-center justify-center font-extrabold text-[10px] ${
                      activeTopic === idx ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {t.no}
                    </span>
                    <span className="truncate">{t.title}</span>
                  </button>
                ))}
              </div>

              {/* Right Visual Details Display */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/70 shadow-sm text-left flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-slate-50 rounded-bl-3xl flex items-center justify-center pointer-events-none">
                  {topics[activeTopic].icon}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 text-[9px] font-black uppercase tracking-wider">
                      TOPIK AKSI {topics[activeTopic].no}
                    </span>
                    <span className="px-3 py-1 rounded bg-[#002855] text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                      {topics[activeTopic].sdg}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 pr-16 leading-tight">
                    {topics[activeTopic].title}
                  </h4>

                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-8">
                    {topics[activeTopic].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Aktivitas Lapangan</span>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        {topics[activeTopic].acts}
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Komponen Rencana Anggaran</span>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        {topics[activeTopic].cost}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-700 leading-snug">
                    📌 <strong>Informasi Proposal:</strong> Rincian Anggaran Biaya (RAB) dan perizinan lurah sasaran akan dibahas bersama Dosen Pancasila pada asistensi proposal Minggu ke-10.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= TIMELINE SECTION ================= */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 text-[9px] font-extrabold uppercase tracking-widest mb-3">
                LINI MASA AKSI KELOMPOK
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Roadmap Pelaksanaan Proyek</h3>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Urutan pengerjaan mingguan proyek Tapak Liman</p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8 text-left max-w-3xl mx-auto">
              {timeline.map((step) => (
                <div key={step.week} className="relative">
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-800 flex items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  </div>
                  
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-all group relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white text-[9px] font-black uppercase">
                        {step.week}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-slate-900 mb-1 group-hover:text-[#002855] transition-colors">
                      {step.task}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SISTEMATIKA & PENILAIAN ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 text-left">
            
            {/* Sistematika Laporan */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-200/70 shadow-sm">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 text-white text-[9px] font-extrabold uppercase tracking-widest mb-3">
                  SISTEMATIKA AKADEMIS
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <FileText className="text-[#002855]" size={24} /> Sistematika Laporan Akhir
                </h3>
              </div>

              <div className="space-y-3">
                {babs.map((bab) => {
                  const isOpen = expandedBab === bab.id
                  return (
                    <div key={bab.id} className="border border-slate-100 rounded-xl overflow-hidden transition-all bg-slate-50/20">
                      <button
                        onClick={() => setExpandedBab(isOpen ? null : bab.id)}
                        className={`w-full p-4 text-left font-black text-xs uppercase tracking-wider flex items-center justify-between transition-colors ${
                          isOpen ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <div>
                          <span className="block font-black text-slate-900 text-[11px]">{bab.title}</span>
                          <span className="block text-[9px] font-bold text-slate-400 normal-case mt-0.5">{bab.sub}</span>
                        </div>
                        <ChevronRight size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-90 text-[#002855]' : 'text-slate-500'}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white border-t border-slate-100 p-4"
                          >
                            <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
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

            {/* Kriteria Penilaian */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-200/70 shadow-sm flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 text-[9px] font-extrabold uppercase tracking-widest mb-3">
                    STANDAR EVALUASI NILAI
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                    <BarChart2 className="text-[#002855]" size={24} /> Kriteria Evaluasi Nilai
                  </h3>
                </div>

                <div className="space-y-4">
                  {grading.map((g) => (
                    <div key={g.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-slate-700">{g.name}</span>
                        <span className="text-[#002855]">{g.weight}%</span>
                      </div>
                      
                      {/* Premium light progress bar */}
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-[#002855]" 
                          style={{ width: `${g.weight}%` }} 
                        />
                      </div>
                      <p className="text-[10px] font-bold text-slate-400">
                        {g.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Akumulasi Nilai Akhir</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 text-white font-black text-xs">
                  100% MAKSIMAL
                </span>
              </div>
            </div>
          </div>

          {/* ================= LUXURY WHITE CALLOUT ACTION ================= */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-10 sm:p-16 text-center border border-slate-200/80 shadow-md shadow-slate-100/50"
          >
            <h3 className="text-2xl sm:text-4xl font-black mb-4 text-slate-900 tracking-tight">Mari Mulai Aksi Nyata Anda!</h3>
            <p className="text-slate-500 font-bold text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8">
              Pancasila bukanlah sekadar materi teoritis tertulis biasa, melainkan wujud rasa persaudaraan dan gotong royong yang kita salurkan langsung demi kesejahteraan masyarakat Indonesia.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/portal"
                className="px-8 py-4 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-sm"
              >
                Mulai Belajar Pancasila
              </a>
              <a 
                href="/leaderboard"
                className="px-8 py-4 bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98]"
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
