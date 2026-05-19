import { motion, AnimatePresence } from 'framer-motion'
import { Award, Calendar, BookOpen, Layers, ShieldCheck, CheckCircle2, ChevronRight, FileText, BarChart2, Lightbulb, Compass, Users, Coins, Heart, Star, Sparkles, ChevronDown } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

export default function TapakLiman() {
  const [activeLetter, setActiveLetter] = useState(0)
  const [activeTopic, setActiveTopic] = useState(0)
  const [expandedBab, setExpandedBab] = useState(null)

  const stats = [
    { label: 'PILIHAN SDGs', value: '10 TOPIK', desc: 'UMKM hingga Ekologi', color: 'from-cyan-400 to-blue-500' },
    { label: 'LINI MASA AKSI', value: '8 MINGGU', desc: 'Minggu 9 s.d. 16', color: 'from-amber-400 to-orange-500' },
    { label: 'LUARAN KELOMPOK', value: '3 KARYA', desc: 'Laporan, Poster, Video', color: 'from-emerald-400 to-teal-500' },
  ]

  const acronym = [
    { char: 'T', word: 'Tanggap', desc: 'Peka dan sigap dalam merespons isu kemanusiaan serta dinamika sosial di lapangan.', glow: 'rgba(239, 68, 68, 0.4)', color: 'text-red-400 border-red-500/30 bg-red-500/5' },
    { char: 'A', word: 'Adaptif', desc: 'Lincah menyesuaikan diri dengan kultur dan kearifan lokal warga desa mitra.', glow: 'rgba(245, 158, 11, 0.4)', color: 'text-amber-400 border-amber-500/30 bg-amber-500/5' },
    { char: 'P', word: 'Partisipatif', desc: 'Merangkul peran serta aktif dan kolaboratif dari seluruh lapisan masyarakat.', glow: 'rgba(234, 179, 8, 0.4)', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5' },
    { char: 'A', word: 'Aksi Nyata', desc: 'Menghadirkan solusi konkret yang berdaya guna secara fisik maupun edukatif.', glow: 'rgba(16, 185, 129, 0.4)', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5' },
    { char: 'K', word: 'Kolaboratif', desc: 'Membangun sinergi kelompok lintas program studi secara harmonis.', glow: 'rgba(59, 130, 246, 0.4)', color: 'text-blue-400 border-blue-500/30 bg-blue-500/5' },
    { char: 'L', word: 'Lintas Ilmu', desc: 'Meleburkan sains, seni rupa desain, dan sosial-humaniora dalam pemecahan masalah.', glow: 'rgba(139, 92, 246, 0.4)', color: 'text-violet-400 border-violet-500/30 bg-violet-500/5' },
    { char: 'I', word: 'Inisiatif', desc: 'Mendorong daya cipta mandiri yang kreatif, solutif, dan efisien.', glow: 'rgba(217, 70, 239, 0.4)', color: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/5' },
    { char: 'M', word: 'Nasionalis', desc: 'Dijiwai kecintaan mendalam pada tanah air berlandaskan ideologi Pancasila.', glow: 'rgba(244, 63, 94, 0.4)', color: 'text-rose-400 border-rose-500/30 bg-rose-500/5' },
  ]

  const topics = [
    {
      no: 1,
      title: 'Pengembangan Ekonomi Desa (UMKM)',
      icon: <Coins className="text-amber-400" size={26} />,
      desc: 'Membantu pelaku usaha mikro pedesaan dalam ekspansi pasar digital, penataan pembukuan kas modern, serta inovasi identitas kemasan produk agar berdaya saing global.',
      acts: 'Pelatihan e-commerce, digital branding, dan pembuatan katalog produk warga.',
      cost: 'Bahan baku demonstrasi produk, cetak panduan bisnis, & spanduk sosialisasi.',
      sdg: 'SDG 1: Tanpa Kemiskinan',
      glow: 'group-hover:border-amber-500/40 shadow-amber-500/5'
    },
    {
      no: 2,
      title: 'Literasi Digital Masyarakat Desa',
      icon: <Lightbulb className="text-cyan-400" size={26} />,
      desc: 'Mengajarkan kecakapan dasar teknologi informasi kepada warga desa, termasuk keamanan berselancar digital, e-government, serta penggunaan internet sehat.',
      acts: 'Pelatihan dasar komputer, edukasi deteksi hoax, dan pembentukan website desa.',
      cost: 'Modul materi digital cetak, konsumsi warga peserta, & transportasi tim.',
      sdg: 'SDG 4: Pendidikan Berkualitas',
      glow: 'group-hover:border-cyan-500/40 shadow-cyan-500/5'
    },
    {
      no: 3,
      title: 'Pendidikan & Literasi Anak Desa',
      icon: <BookOpen className="text-emerald-400" size={26} />,
      desc: 'Mengadakan program belajar sains kreatif yang aplikatif, perintisan pojok baca/perpustakaan mini, serta metode mendongeng budi pekerti nusantara.',
      acts: 'Eksperimen sains sederhana, kelas mendongeng karakter Pancasila, & donasi buku.',
      cost: 'Pembelian buku bacaan berkualitas, alat peraga sains, & rak buku portabel.',
      sdg: 'SDG 4: Pendidikan Berkualitas',
      glow: 'group-hover:border-emerald-500/40 shadow-emerald-500/5'
    },
    {
      no: 4,
      title: 'Kesehatan & Higienitas Masyarakat',
      icon: <Heart className="text-rose-400" size={26} />,
      desc: 'Menyelenggarakan penyuluhan gizi seimbang pencegahan stunting, pembenahan sanitasi dasar, serta pemeriksaan kesehatan umum warga secara gratis.',
      acts: 'Penyuluhan stunting keluarga, gotong royong perbaikan sanitasi umum, & penyediaan tong sampah.',
      cost: 'Alat sanitasi peraga, bahan penyuluhan cetak, & sabun/alat kebersihan warga.',
      sdg: 'SDG 3: Kehidupan Sehat',
      glow: 'group-hover:border-rose-500/40 shadow-rose-500/5'
    },
    {
      no: 5,
      title: 'Penghijauan & Pelestarian Lingkungan',
      icon: <Compass className="text-green-400" size={26} />,
      desc: 'Melakukan penanaman bibit pohon produktif unggulan, pelatihan pembuatan pupuk kompos mandiri, serta pembuatan apotek hidup guna mereduksi degradasi lahan.',
      acts: 'Penanaman pohon produktif, workshop pengomposan mandiri, & plang edukasi lingkungan.',
      cost: 'Pembelian bibit pohon unggulan, pupuk organik, sekop mini, & biaya transportasi.',
      sdg: 'SDG 15: Ekosistem Daratan',
      glow: 'group-hover:border-green-500/40 shadow-green-500/5'
    },
    {
      no: 6,
      title: 'Pemberdayaan Perempuan Desa',
      icon: <Users className="text-violet-400" size={26} />,
      desc: 'Memberikan pelatihan keterampilan kreatif (kerajinan rajut/daur ulang) dan pembukuan sederhana guna memacu kemandirian ekonomi kaum ibu PKK.',
      acts: 'Workshop kerajinan tangan daur ulang sampah, pelatihan manajemen usaha mikro, & branding.',
      cost: 'Bahan baku praktek menjahit/kerajinan, konsumsi warga, & transportasi tim.',
      sdg: 'SDG 5: Kesetaraan Gender',
      glow: 'group-hover:border-violet-500/40 shadow-violet-500/5'
    },
    {
      no: 7,
      title: 'Revitalisasi Seni dan Budaya Lokal',
      icon: <Award className="text-orange-400" size={26} />,
      desc: 'Mendokumentasikan seni musik dan tari tradisional daerah melalui pembuatan konten kreatif agar warisan budaya nusantara terus berkembang dinamis.',
      acts: 'Pelatihan instrumen musik tradisional bagi anak, pembuatan film dokumentasi seni desa.',
      cost: 'Sewa perlengkapan pementasan mini, dokumentasi profesional, & konsumsi kegiatan.',
      sdg: 'SDG 11: Komunitas Berkelanjutan',
      glow: 'group-hover:border-orange-500/40 shadow-orange-500/5'
    },
    {
      no: 8,
      title: 'Penyuluhan Kesadaran Hukum Warga',
      icon: <FileText className="text-blue-400" size={26} />,
      desc: 'Edukasi pemahaman hukum keluarga, hak warga negara, kesadaran berkendara, serta persatuan kebhinekaan sosial berlandaskan Pancasila.',
      acts: 'Penyuluhan sadar hukum sengketa tanah/keluarga, pembuatan infografis hukum sipil.',
      cost: 'Cetak pamflet panduan hukum warga, konsumsi peserta, & transportasi pembicara.',
      sdg: 'SDG 16: Perdamaian & Keadilan',
      glow: 'group-hover:border-blue-500/40 shadow-blue-500/5'
    },
    {
      no: 9,
      title: 'Peningkatan Sarana Prasarana Fisik',
      icon: <Layers className="text-slate-400" size={26} />,
      desc: 'Gotong royong merancang dan membenahi fasilitas umum desa berskala mikro (seperti pos ronda, plang arah, atau halte) demi keselamatan warga.',
      acts: 'Pembuatan rambu keselamatan jalan, perbaikan sarana pos ronda, & pengecatan fasilitas PAUD.',
      cost: 'Semen, pasir, cat kayu/besi tahan air, papan kayu petunjuk, & konsumsi kerja bakti.',
      sdg: 'SDG 9: Industri & Infrastruktur',
      glow: 'group-hover:border-slate-500/40 shadow-slate-500/5'
    },
    {
      no: 10,
      title: 'Manajemen Sampah & Bank Sampah',
      icon: <ShieldCheck className="text-teal-400" size={26} />,
      desc: 'Mengedukasi pemilihan sampah organik/anorganik secara mandiri serta menginisiasi perintisan sistem bank sampah bernilai guna ekonomis.',
      acts: 'Penyuluhan klasifikasi sampah, peragaan pembuatan ecobrick, & penyediaan tong sampah pilah.',
      cost: 'Tong sampah besar pilah 3 warna, masker sarung tangan pelindung, & stiker panduan.',
      sdg: 'SDG 12: Konsumsi & Produksi Bertanggung Jawab',
      glow: 'group-hover:border-teal-500/40 shadow-teal-500/5'
    }
  ]

  const timeline = [
    { week: 'Minggu 9', task: 'Rembuk Gagasan Awal', desc: 'Pembentukan tim kolaborasi kelas (maks 10 orang) dan perumusan rancangan ide proyek berbasis SDGs.', color: 'from-red-400 to-rose-600' },
    { week: 'Minggu 10', task: 'Penyusunan Proposal & RAB', desc: 'Merumuskan draf proposal komprehensif, rincian anggaran biaya logistik, serta linimasa eksekusi.', color: 'from-orange-400 to-amber-600' },
    { week: 'Minggu 11', task: 'Kolokium Sidang Asistensi', desc: 'Presentasi dan pertanggungjawaban rancangan proposal program di hadapan Dosen Pembimbing Pancasila.', color: 'from-yellow-400 to-orange-500' },
    { week: 'Minggu 12-13', task: 'Implementasi Aksi Lapangan', desc: 'Turun langsung ke masyarakat desa sasaran guna merealisasikan pilar program pengabdian secara intensif.', color: 'from-emerald-400 to-teal-600' },
    { week: 'Minggu 14', task: 'Penyusunan Karya Luaran', desc: 'Finalisasi pembuatan laporan akademis, rancangan poster ilmiah infografis, dan editing video dokumentasi.', color: 'from-cyan-400 to-blue-600' },
    { week: 'Minggu 15', task: 'Sidang Hasil & Unggah Edunex', desc: 'Mengunggah seluruh luaran wajib kelompok ke portal akademik Edunex ITB dan melaksanakan presentasi akhir.', color: 'from-violet-400 to-purple-600' },
    { week: 'Minggu 16', task: 'Peer Review & Rekap Nilai', desc: 'Pengisian peer assessment keaktifan anggota tim serta rekapitulasi penilaian total dosen.', color: 'from-fuchsia-400 to-pink-600' }
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
    { name: 'Penilaian Anggota Tim (Peer Assessment)', weight: 10, desc: 'Tingkat kolaborasi, tanggung jawab tugas, dan keaktifan individu.' }
  ]

  return (
    <>
      <Helmet>
        <title>Pedoman Masterpiece Tapak Liman WI1101 ITB</title>
        <meta name="description" content="Pedoman interaktif berestetika tinggi Proyek Tapak Liman mata kuliah Pancasila WI1101 Institut Teknologi Bandung." />
      </Helmet>

      {/* Futuristic Dark Space Theme Canvas */}
      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-[#060814] text-slate-100">
        
        {/* Neon mesh gradients for stunning first impression */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:45px_45px]" />
        <div className="absolute -top-40 -right-40 w-[55rem] h-[55rem] bg-gradient-to-tr from-indigo-500/10 via-violet-500/10 to-fuchsia-500/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -left-40 w-[45rem] h-[45rem] bg-gradient-to-bl from-emerald-500/10 via-teal-500/5 to-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-20 right-10 w-[50rem] h-[50rem] bg-gradient-to-tr from-amber-500/5 via-orange-500/10 to-rose-500/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* ================= HERO AREA ================= */}
          <div className="text-center mb-24 relative">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-8 shadow-2xl"
            >
              <img src="/itb.png" alt="ITB Logo" className="h-5 w-auto" />
              <div className="w-px h-3.5 bg-white/20" />
              <span className="text-rose-400 flex items-center gap-1.5">
                <Sparkles size={12} className="animate-pulse" /> PANDUAN UTAMA WI1101
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
            >
              Pedoman Proyek Aksi <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 bg-clip-text text-transparent filter drop-shadow-[0_0_25px_rgba(244,63,94,0.3)]">
                "TAPAK LIMAN"
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="text-slate-400 font-bold text-xs sm:text-base max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Transformasikan nilai luhur ideologi Pancasila ke dalam kontribusi sosial nyata berbasis kurikulum terapan SDGs Universitas Keilmuan ITB.
            </motion.p>

            {/* Glowing Mesh Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  className="backdrop-blur-xl bg-white/[0.03] rounded-2xl border border-white/10 p-6 flex flex-col justify-between text-center relative overflow-hidden group hover:border-white/20 transition-all duration-300"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${s.color}`} />
                  <span className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight filter drop-shadow-md">{s.value}</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{s.label}</span>
                  <span className="text-[10px] font-bold text-slate-500">{s.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================= INTERACTIVE PHILOSOPHY CONSOLE ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            
            {/* Left Box: Concept Glass */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 backdrop-blur-xl bg-white/[0.02] rounded-[2.5rem] p-8 sm:p-12 border border-white/10 shadow-2xl text-left flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-44 h-44 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-2">MAKNA HISTORIS UTAMA</span>
                <h3 className="text-2xl sm:text-4xl font-black text-white mb-5 leading-tight">
                  Integrasi Daun Tropis & Karakter Ganesha ITB
                </h3>
                <p className="text-slate-400 font-medium text-xs sm:text-sm leading-relaxed mb-8">
                  Nama **TAPAK LIMAN** (*Elephantopus scaber*) memadukan dua landasan luhur pengabdian mahasiswa di lingkungan masyarakat sasaran:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-colors">
                  <span className="text-2xl mb-3 block filter drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">👣</span>
                  <h4 className="font-black text-white text-sm mb-1.5">TAPAK (Jejak Aksi)</h4>
                  <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                    Merepresentasikan jejak aksi konkret, kontribusi solusi ilmiah, serta warisan nilai integritas luhur yang kelompok mahasiswa hadirkan bagi masyarakat sasaran.
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-colors">
                  <span className="text-2xl mb-3 block filter drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">🐘</span>
                  <h4 className="font-black text-white text-sm mb-1.5">LIMAN (Lambang Ganesha)</h4>
                  <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                    Berarti Gajah, melambangkan Ganesha logo ITB selaku dinamisator sains, teknologi, dan seni untuk mengabdi pada kemakmuran dan masa depan bangsa.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Box: Futuristic 8-Letter Acronym Console */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/[0.02] rounded-[2.5rem] p-8 border border-white/10 shadow-2xl text-left flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10">
                <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest block mb-2">KARAKTER UTAMA</span>
                <h3 className="text-xl font-black mb-2 text-white">Console 8 Karakter</h3>
                <p className="text-slate-500 font-bold text-[10px] leading-relaxed mb-6">
                  Ketuk salah satu kotak huruf menyala di bawah untuk memunculkan nilai pilar kepemimpinan kelompok Anda:
                </p>
              </div>

              {/* Glowing Interactive Alphabet Keys */}
              <div className="grid grid-cols-4 gap-2.5 relative z-10 mb-6">
                {acronym.map((item, idx) => (
                  <button
                    key={item.char}
                    onClick={() => setActiveLetter(idx)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      activeLetter === idx 
                        ? `${item.color} border-white/30 scale-105 filter drop-shadow-[0_0_15px_${item.glow}]` 
                        : 'border-white/5 bg-white/[0.01] text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    style={{
                      boxShadow: activeLetter === idx ? `0 0 15px ${item.glow}` : 'none'
                    }}
                  >
                    <span className="font-black text-base block">{item.char}</span>
                    <span className="text-[8px] font-black block truncate opacity-70">{item.word}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Console Text Frame */}
              <div className="p-5 bg-white/[0.01] rounded-xl border border-white/5 h-24 flex items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent animate-pulse pointer-events-none" />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeLetter}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[11px] font-bold text-slate-300 leading-relaxed relative z-10"
                  >
                    <strong>{acronym[activeLetter].word}</strong>: {acronym[activeLetter].desc}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ================= 10 GLOWING SDG TOPICS ================= */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-extrabold uppercase tracking-widest mb-3">
                INTEGRASI TARGET SDGs GLOBAL
              </div>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">10 Topik Pengabdian Kelompok</h3>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Pilih menu di bawah untuk melihat rincian aktivitas:</p>
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
                        ? 'bg-gradient-to-r from-rose-600 to-amber-600 border-rose-500 text-white shadow-xl filter drop-shadow-[0_0_15px_rgba(244,63,94,0.25)] scale-[1.01]' 
                        : 'bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/[0.03] hover:text-white'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded flex items-center justify-center font-extrabold text-[10px] ${
                      activeTopic === idx ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-500'
                    }`}>
                      {t.no}
                    </span>
                    <span className="truncate">{t.title}</span>
                  </button>
                ))}
              </div>

              {/* Right Visual Details Display */}
              <div className="lg:col-span-2 backdrop-blur-xl bg-white/[0.02] rounded-[2.5rem] p-8 sm:p-10 border border-white/10 shadow-2xl text-left flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-white/[0.02] rounded-bl-3xl flex items-center justify-center pointer-events-none">
                  {topics[activeTopic].icon}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-slate-300 text-[9px] font-black uppercase tracking-wider">
                      TOPIK UTAMA {topics[activeTopic].no}
                    </span>
                    <span className="px-3 py-1 rounded bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider filter drop-shadow-[0_0_8px_rgba(220,38,38,0.3)]">
                      {topics[activeTopic].sdg}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black text-white mb-4 pr-16 leading-tight">
                    {topics[activeTopic].title}
                  </h4>

                  <p className="text-slate-400 font-medium text-xs sm:text-sm leading-relaxed mb-8">
                    {topics[activeTopic].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="p-5 bg-white/[0.01] border border-white/5 rounded-xl">
                      <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest block mb-2">Aktivitas Lapangan</span>
                      <p className="text-xs font-bold text-slate-300 leading-relaxed">
                        {topics[activeTopic].acts}
                      </p>
                    </div>

                    <div className="p-5 bg-white/[0.01] border border-white/5 rounded-xl">
                      <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest block mb-2">Anggaran Biaya Kerja</span>
                      <p className="text-xs font-bold text-slate-300 leading-relaxed">
                        {topics[activeTopic].cost}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/[0.05] border border-amber-500/10 rounded-xl">
                  <p className="text-[10px] sm:text-[11px] font-bold text-amber-400 leading-snug">
                    📌 <strong>Peringatan Asistensi:</strong> Pastikan Anda membahas Rencana Anggaran Biaya (RAB) dan dokumen kelayakan lapangan bersama asisten kelas Pancasila Anda pada Minggu ke-10.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= TIMELINE SECTION ================= */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[9px] font-extrabold uppercase tracking-widest mb-3">
                LINI MASA AKSI KELOMPOK
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white">Peta Perjalanan Proyek</h3>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Urutan tahapan pengerjaan Tapak Liman</p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-8 text-left max-w-3xl mx-auto">
              {timeline.map((step) => (
                <div key={step.week} className="relative">
                  {/* Timeline circle node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#060814] border-2 border-rose-500 flex items-center justify-center shadow-[0_0_10px_rgba(244,63,94,0.4)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  </div>
                  
                  <div className="backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-white/5 p-6 hover:border-white/10 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-500 to-amber-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase">
                        {step.week}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-white mb-1 group-hover:text-rose-400 transition-colors">
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

          {/* ================= SISTEMATIKA & PENILAIAN GLOW ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 text-left">
            
            {/* Format Laporan */}
            <div className="backdrop-blur-xl bg-white/[0.02] rounded-[2.5rem] p-8 sm:p-10 border border-white/10 shadow-2xl">
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[9px] font-extrabold uppercase tracking-widest mb-3">
                  SISTEMATIKA AKADEMIS
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <FileText className="text-rose-400" size={24} /> Sistematika Laporan Akhir
                </h3>
              </div>

              <div className="space-y-3">
                {babs.map((bab) => {
                  const isOpen = expandedBab === bab.id
                  return (
                    <div key={bab.id} className="border border-white/5 rounded-xl overflow-hidden transition-all bg-white/[0.01]">
                      <button
                        onClick={() => setExpandedBab(isOpen ? null : bab.id)}
                        className={`w-full p-4 text-left font-black text-xs uppercase tracking-wider flex items-center justify-between transition-colors ${
                          isOpen ? 'bg-white/5 text-rose-400' : 'hover:bg-white/5 text-slate-400'
                        }`}
                      >
                        <div>
                          <span className="block font-black text-white text-[11px]">{bab.title}</span>
                          <span className="block text-[9px] font-bold text-slate-500 normal-case mt-0.5">{bab.sub}</span>
                        </div>
                        <ChevronRight size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-90 text-rose-400' : 'text-slate-500'}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white/[0.01] border-t border-white/5 p-4"
                          >
                            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
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
            <div className="backdrop-blur-xl bg-white/[0.02] rounded-[2.5rem] p-8 sm:p-10 border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-extrabold uppercase tracking-widest mb-3">
                    STANDAR EVALUASI
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <BarChart2 className="text-amber-400" size={24} /> Kriteria Evaluasi Nilai
                  </h3>
                </div>

                <div className="space-y-4">
                  {grading.map((g) => (
                    <div key={g.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-slate-300">{g.name}</span>
                        <span className="text-amber-400">{g.weight}%</span>
                      </div>
                      
                      {/* Neon glowing progress bar */}
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500" 
                          style={{ width: `${g.weight}%`, boxShadow: '0 0 10px rgba(245,158,11,0.5)' }} 
                        />
                      </div>
                      <p className="text-[10px] font-bold text-slate-500">
                        {g.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Akumulasi Nilai Akhir</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-amber-400 font-black text-xs filter drop-shadow-[0_0_10px_rgba(245,158,11,0.3)] animate-pulse">
                  100% MAKSIMAL
                </span>
              </div>
            </div>
          </div>

          {/* ================= NEON GLOWING ACTION BANNER ================= */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-900/40 via-violet-950/40 to-slate-950/40 rounded-[2.5rem] p-10 sm:p-16 text-center border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl sm:text-4xl font-black mb-4 text-white tracking-tight">Mari Mulai Eksekusi Aksi Nyata Anda!</h3>
            <p className="text-slate-400 font-bold text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8">
              Pancasila bukanlah butir ingatan beku, melainkan wujud kepedulian yang kita salurkan langsung ke genggaman masyarakat pelosok demi Indonesia Maju.
            </p>

            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <a 
                href="/portal"
                className="px-8 py-4 bg-gradient-to-r from-rose-600 to-amber-600 hover:shadow-2xl rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all active:scale-[0.98] filter drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]"
              >
                Mulai Belajar Pancasila
              </a>
              <a 
                href="/leaderboard"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-slate-300 transition-all active:scale-[0.98]"
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
