import { motion, AnimatePresence } from 'framer-motion'
import { Award, Calendar, BookOpen, Layers, ShieldCheck, CheckCircle2, ChevronRight, FileText, BarChart2, Lightbulb, Compass, Users, Coins, Heart, BookMarked, HelpCircle, ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

export default function TapakLiman() {
  const [activeTopic, setActiveTopic] = useState(0)
  const [expandedBab, setExpandedBab] = useState(null)

  const stats = [
    { label: 'PILIHAN TOPIK SDGs', value: '10', desc: 'Rekomendasi Aksi Resmi' },
    { label: 'DURASI PELAKSANAAN', value: '8 MINGGU', desc: 'Minggu 9 s.d. 16' },
    { label: 'LUARAN WAJIB KELOMPOK', value: '3 KARYA', desc: 'Laporan, Poster, Video' },
  ]

  const acronym = [
    { char: 'T', word: 'Tanggap', desc: 'Peka dan sigap merespons isu sosial nyata di lingkungan masyarakat sasaran.' },
    { char: 'A', word: 'Adaptif', desc: 'Lincah menyesuaikan diri dengan dinamika sosial dan kearifan lokal warga desa.' },
    { char: 'P', word: 'Partisipatif', desc: 'Merangkul peran serta aktif dan kolaboratif dari masyarakat setempat.' },
    { char: 'A', word: 'Aksi Nyata', desc: 'Menghadirkan kontribusi fisik maupun edukatif yang berdaya guna secara langsung.' },
    { char: 'K', word: 'Kolaboratif', desc: 'Membangun sinergi kelompok lintas ilmu antar mahasiswa secara harmonis.' },
    { char: 'L', word: 'Lintas Ilmu', desc: 'Meleburkan saintek, sosial-humaniora, dan seni rupa desain dalam pemecahan masalah.' },
    { char: 'I', word: 'Inisiatif', desc: 'Mendorong daya cipta mandiri yang kreatif, solutif, dan efisien.' },
    { char: 'M', word: 'Nasionalis', desc: 'Dijiwai kecintaan mendalam pada tanah air berlandaskan ideologi Pancasila.' },
  ]

  const topics = [
    {
      no: 1,
      title: 'Pengembangan Ekonomi Desa (UMKM)',
      icon: <Coins className="text-amber-600" size={24} />,
      desc: 'Mahasiswa membantu masyarakat desa dalam mengembangkan usaha mikro, kecil, dan menengah (UMKM) melalui digital marketing, manajemen pembukuan modern, dan inovasi branding produk.',
      acts: 'Pelatihan e-commerce, digital branding, dan pembuatan katalog produk warga.',
      cost: 'Bahan baku demonstrasi produk, modul cetak panduan, & spanduk sosialisasi.',
      sdg: 'SDG 1: Tanpa Kemiskinan',
    },
    {
      no: 2,
      title: 'Literasi Digital Masyarakat Desa',
      icon: <Lightbulb className="text-blue-600" size={24} />,
      desc: 'Mengajarkan kecakapan dasar teknologi informasi kepada perangkat dan warga desa, termasuk keamanan berselancar digital, e-government, serta penggunaan internet sehat.',
      acts: 'Pelatihan dasar komputer, edukasi deteksi hoax, dan pembentukan website desa.',
      cost: 'Modul materi digital cetak, konsumsi warga peserta, & transportasi tim.',
      sdg: 'SDG 4: Pendidikan Berkualitas',
    },
    {
      no: 3,
      title: 'Pendidikan & Literasi Anak Desa',
      icon: <BookOpen className="text-emerald-600" size={24} />,
      desc: 'Mengadakan program bimbingan belajar interaktif, perintisan pojok baca/perpustakaan mini, serta metode eksperimen sains kreatif untuk menumbuhkan minat belajar anak.',
      acts: 'Eksperimen sains sederhana, kelas mendongeng karakter Pancasila, & donasi buku.',
      cost: 'Pembelian buku bacaan anak berkualitas, alat peraga sains, & rak buku portabel.',
      sdg: 'SDG 4: Pendidikan Berkualitas',
    },
    {
      no: 4,
      title: 'Kesehatan & Higienitas Masyarakat',
      icon: <CheckCircle2 className="text-rose-600" size={24} />,
      desc: 'Menyelenggarakan penyuluhan gizi seimbang, sanitasi dasar, serta pemeriksaan kesehatan umum guna meningkatkan taraf hidup bersih warga pedesaan.',
      acts: 'Penyuluhan stunting keluarga, gotong royong perbaikan sanitasi umum, & penyediaan tong sampah.',
      cost: 'Alat sanitasi peraga, bahan penyuluhan cetak, & sabun/alat kebersihan warga.',
      sdg: 'SDG 3: Kehidupan Sehat',
    },
    {
      no: 5,
      title: 'Penghijauan & Pelestarian Lingkungan',
      icon: <Compass className="text-green-600" size={24} />,
      desc: 'Melakukan penanaman bibit pohon produktif, edukasi pengolahan pupuk kompos mandiri, serta perintisan apotek hidup guna mereduksi degradasi lahan desa.',
      acts: 'Penanaman pohon produktif, workshop pengomposan mandiri, & plang edukasi lingkungan.',
      cost: 'Pembelian bibit pohon unggulan, pupuk organik, sekop mini, & biaya transportasi.',
      sdg: 'SDG 15: Ekosistem Daratan',
    },
    {
      no: 6,
      title: 'Pemberdayaan Perempuan Desa',
      icon: <Users className="text-indigo-600" size={24} />,
      desc: 'Memberikan pelatihan keterampilan produktif bernilai ekonomi kreatif untuk kelompok ibu-ibu PKK guna mendukung kemandirian finansial keluarga.',
      acts: 'Workshop kerajinan tangan daur ulang sampah, pelatihan manajemen usaha mikro, & branding.',
      cost: 'Bahan baku praktek menjahit/kerajinan, konsumsi warga, & transportasi tim.',
      sdg: 'SDG 5: Kesetaraan Gender',
    },
    {
      no: 7,
      title: 'Revitalisasi Seni dan Budaya Lokal',
      icon: <Award className="text-orange-600" size={24} />,
      desc: 'Mendokumentasikan dan mempublikasikan warisan kesenian daerah serta kerajinan tradisional untuk menjaga identitas kearifan lokal tetap hidup berkelanjutan.',
      acts: 'Pelatihan instrumen musik tradisional bagi anak, pembuatan film dokumentasi seni desa.',
      cost: 'Sewa perlengkapan pementasan mini, dokumentasi profesional, & konsumsi kegiatan.',
      sdg: 'SDG 11: Komunitas Berkelanjutan',
    },
    {
      no: 8,
      title: 'Penyuluhan Kesadaran Hukum Warga',
      icon: <FileText className="text-violet-600" size={24} />,
      desc: 'Edukasi pemahaman hukum keluarga dasar, hak warga negara, serta toleransi kerukunan umat beragama berdasarkan asas kebhinekaan Pancasila.',
      acts: 'Penyuluhan sadar hukum sengketa tanah/keluarga, pembuatan infografis hukum sipil.',
      cost: 'Cetak pamflet panduan hukum warga, konsumsi peserta, & transportasi pembicara.',
      sdg: 'SDG 16: Perdamaian & Keadilan',
    },
    {
      no: 9,
      title: 'Peningkatan Sarana Prasarana Fisik',
      icon: <Layers className="text-slate-600" size={24} />,
      desc: 'Gotong royong bersama warga merancang dan membenahi fasilitas umum berskala mikro yang mendesak demi kenyamanan dan keselamatan warga desa.',
      acts: 'Pembuatan rambu keselamatan jalan, perbaikan sarana pos ronda, & pengecatan fasilitas PAUD.',
      cost: 'Semen, pasir, cat kayu/besi tahan air, papan kayu petunjuk, & konsumsi kerja bakti.',
      sdg: 'SDG 9: Industri & Infrastruktur',
    },
    {
      no: 10,
      title: 'Manajemen Sampah & Bank Sampah',
      icon: <ShieldCheck className="text-teal-600" size={24} />,
      desc: 'Membangun kesadaran pemilihan sampah rumah tangga secara mandiri serta menginisiasi perintisan sistem bank sampah bernilai guna.',
      acts: 'Penyuluhan klasifikasi sampah, peragaan pembuatan ecobrick, & penyediaan tong sampah pilah.',
      cost: 'Tong sampah besar pilah 3 warna, masker sarung tangan pelindung, & stiker panduan.',
      sdg: 'SDG 12: Konsumsi & Produksi Bertanggung Jawab',
    }
  ]

  const timeline = [
    { week: 'Minggu 9', task: 'Rembuk Ide & Pembagian Kelompok', desc: 'Pembentukan tim kelas (maksimal 10 mahasiswa) dan pengajuan gagasan ide aksi berbasis pilar SDGs.' },
    { week: 'Minggu 10', task: 'Penyusunan Proposal Kerja', desc: 'Penyusunan draf proposal resmi lengkap dengan Rancangan Anggaran Biaya (RAB) dan lini masa kerja.' },
    { week: 'Minggu 11', task: 'Kolokium Asistensi Proposal', desc: 'Presentasi dan pertanggungjawaban rancangan program kelompok di hadapan Dosen Pembina Pancasila.' },
    { week: 'Minggu 12-13', task: 'Eksekusi Aksi Nyata Lapangan', desc: 'Turun ke lapangan (mitra sasaran luar/dalam kampus) untuk implementasi program sosial secara intensif.' },
    { week: 'Minggu 14', task: 'Penyusunan Laporan & Output', desc: 'Tahap finalisasi penyusunan laporan akademis komprehensif, desain poster ilmiah, serta penyuntingan video dokumenter.' },
    { week: 'Minggu 15', task: 'Presentasi Hasil & Unggah Edunex', desc: 'Unggah seluruh berkas luaran wajib ke sistem akademik Edunex ITB dan melaksanakan sidang evaluasi kelompok.' },
    { week: 'Minggu 16', task: 'Penilaian Akhir & Peer Review', desc: 'Evaluasi total efektivitas tim, penilaian orisinalitas luaran, serta pengisian evaluasi kinerja rekan sejawat (peer assessment).' }
  ]

  const babs = [
    { 
      id: 'bab1', 
      title: 'BAB I. PENDAHULUAN', 
      sub: 'Latar Belakang Urgensi Masalah, Rumusan Pertanyaan, & Tujuan Aksi', 
      detail: 'Menyajikan urgensi fenomena sosial di lapangan secara analitis, alasan mendasar pemilihan target sasaran pengabdian, serta merumuskan pertanyaan aksi yang solutif.' 
    },
    { 
      id: 'bab2', 
      title: 'BAB II. TINJAUAN PUSTAKA', 
      sub: 'Landasan Teori Akademik, Korelasi SDGs, & Nilai Pancasila', 
      detail: 'Menguraikan kajian ilmiah pendukung pengabdian, memetakan keterkaitan program dengan 10 pilar SDGs, serta menganalisis korelasi langsung butir-butir Pancasila yang diaktualisasikan.' 
    },
    { 
      id: 'bab3', 
      title: 'BAB III. METODE & PERENCANAAN', 
      sub: 'Metode Pendekatan, Persiapan Logistik, & Timeline Kerja', 
      detail: 'Deskripsi langkah pendekatan masyarakat, persiapan teknis/pembagian tugas internal tim, pengumpulan data awal, serta penyusunan timeline pelaksanaan lapangan secara mendetail.' 
    },
    { 
      id: 'bab4', 
      title: 'BAB IV. ANALISIS HASIL & PEMBAHASAN', 
      sub: 'Luaran Nyata, Evaluasi Dampak Sosial, & Kendala Lapangan', 
      detail: 'Menjabarkan hasil konkret yang dicapai, membandingkan efisiensi program sebelum vs sesudah aksi kelompok, mengevaluasi keberhasilan, serta menyajikan analisis kendala tak terduga.' 
    },
    { 
      id: 'bab5', 
      title: 'BAB V. PENUTUP & REKOMENDASI', 
      sub: 'Simpulan Utama Aksi & Rekomendasi Keberlanjutan Program', 
      detail: 'Kesimpulan final yang menjawab rumusan pertanyaan bab I, serta merumuskan saran realistis bagi perangkat desa setempat maupun pengembangan kelompok mahasiswa di masa depan.' 
    }
  ]

  const grading = [
    { name: 'Ketajaman Gagasan & Urgensi Masalah', weight: 25, desc: 'Orisinalitas ide, kedalaman analisis masalah, serta ketepatan penentuan sasaran warga.' },
    { name: 'Kesesuaian & Struktur Metodologi', weight: 20, desc: 'Kelayakan, efisiensi langkah, serta keselarasan metode dengan kendala yang dipecahkan.' },
    { name: 'Kualitas Luaran Wajib (Poster & Video)', weight: 20, desc: 'Estetika desain poster ilmiah, kejelasan narasi, dan kedalaman dokumenter video pengabdian.' },
    { name: 'Dampak Kemanfaatan & Keberlanjutan', weight: 15, desc: 'Dampak positif nyata bagi warga setempat serta kesiapan sistem dilanjutkan mandiri.' },
    { name: 'Manajemen Anggaran (RAB) & Jadwal', weight: 10, desc: 'Kewajaran perincian dana, efisiensi belanja, serta kedisiplinan pemenuhan timeline.' },
    { name: 'Evaluasi Rekan Sejawat (Peer Assessment)', weight: 10, desc: 'Tingkat kontribusi, keaktifan kolaborasi, dan tanggung jawab individu di dalam kelompok.' }
  ]

  return (
    <>
      <Helmet>
        <title>Panduan Resmi Proyek Tapak Liman WI1101 ITB</title>
        <meta name="description" content="Pedoman resmi pelaksanaan proyek pengabdian masyarakat Tapak Liman mata kuliah Pancasila WI1101 Institut Teknologi Bandung." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-[#fafafa]">
        
        {/* Soft elegant academic grid patterns */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(#002855_1.5px,transparent_1.5px),linear-gradient(90deg,#002855_1.5px,transparent_1.5px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-[#002855]/[0.015] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-60 w-[40rem] h-[40rem] bg-amber-500/[0.015] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* ================= ACADEMIC HERO SECTION ================= */}
          <div className="text-center mb-24 relative">
            <motion.div 
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-200/60 text-slate-800 text-[10px] font-extrabold uppercase tracking-widest mb-8 shadow-sm"
            >
              <img src="/itb.png" alt="ITB Logo" className="h-5 w-auto object-contain" />
              <div className="w-px h-3.5 bg-slate-200" />
              <span className="text-[#002855]">INSTITUT TEKNOLOGI BANDUNG</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900"
            >
              Pedoman Proyek Aktualisasi <br />
              <span className="bg-gradient-to-r from-[#002855] via-slate-800 to-amber-700 bg-clip-text text-transparent">"TAPAK LIMAN"</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="text-slate-500 font-medium text-xs sm:text-base max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Buku Pedoman Resmi Pengabdian Masyarakat Terintegrasi SDGs mata kuliah wajib Pancasila WI1101. Dirancang untuk menumbuhkan kepemimpinan sosial yang berbasis sains dan humaniora.
            </motion.p>

            {/* Premium Editorial Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-sm flex flex-col justify-between text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#002855]" />
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#002855] mb-1">{s.value}</span>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-0.5">{s.label}</span>
                  <span className="text-[10px] font-bold text-slate-500">{s.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================= THE PHILOSOPHY SECTION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            
            {/* Left Column: Macro Philosophy */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/50 shadow-sm text-left flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002855]/5 text-[#002855] text-[9px] font-extrabold uppercase tracking-widest mb-4">
                  ASPEK HISTORIS & FILOSOFIS
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-5">
                  Filosofi Flora & Ganesha ITB
                </h3>
                <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-8">
                  Nama **TAPAK LIMAN** (*Elephantopus scaber*) diambil dari nama sejenis daun tanaman tropis yang kokoh tumbuh subur di Nusantara. Dalam kurikulum Pancasila ITB, pemilihan nama ini merepresentasikan keselarasan ilmu pengetahuan dengan kepedulian sosial:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/60">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-extrabold text-sm mb-4">
                    👣
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">TAPAK (Jejak Pengabdian)</h4>
                  <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                    Mewakili jejak aksi pengabdian nyata, kontribusi ilmiah, serta integritas moral yang ditinggalkan kelompok mahasiswa bagi masyarakat penerima manfaat.
                  </p>
                </div>
                
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/60">
                  <div className="w-10 h-10 rounded-xl bg-[#002855]/10 text-[#002855] flex items-center justify-center font-extrabold text-sm mb-4">
                    🐘
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">LIMAN (Ganesha ITB)</h4>
                  <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                    Berarti Gajah, mewakili figur Ganesha lambang ITB selaku wadah pengembangan sains, teknologi, dan seni untuk memajukan kesejahteraan bangsa.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Acronym Presentation */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-slate-200/50 shadow-sm text-left flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/5 text-amber-700 text-[9px] font-extrabold uppercase tracking-widest mb-4">
                  PANDUAN NILAI ASERSIF
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">8 Karakter Tapak Liman</h3>
                <p className="text-slate-500 font-medium text-xs leading-relaxed mb-6">
                  Tim mahasiswa wajib menerapkan delapan pilar nilai dasar berikut selama berada di lingkungan masyarakat mitra:
                </p>
              </div>

              {/* Acronym List */}
              <div className="space-y-4 overflow-y-auto max-h-[18rem] pr-1 custom-scrollbar">
                {acronym.map((item) => (
                  <div key={item.char} className="flex gap-4 items-start border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                    <span className="w-8 h-8 rounded-lg bg-[#002855]/5 border border-[#002855]/10 text-[#002855] font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                      {item.char}
                    </span>
                    <div>
                      <h5 className="font-extrabold text-slate-950 text-xs mb-0.5">{item.word}</h5>
                      <p className="text-[10px] font-medium text-slate-500 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ================= 10 TOPIK UTAMA SECTION ================= */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 text-white text-[9px] font-extrabold uppercase tracking-widest mb-3">
                INTEGRASI SDGs & PANCASILA
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">10 Topik Pengabdian Resmi</h3>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1.5">Silakan pilih salah satu opsi topik di bawah:</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Selector Sidebar */}
              <div className="lg:col-span-1 flex flex-col gap-2 max-h-[34rem] overflow-y-auto pr-2 custom-scrollbar">
                {topics.map((t, idx) => (
                  <button
                    key={t.no}
                    onClick={() => setActiveTopic(idx)}
                    className={`p-4 text-left rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all border flex items-center gap-4 ${
                      activeTopic === idx 
                        ? 'bg-[#002855] border-[#002855] text-white shadow-md' 
                        : 'bg-white border-slate-200/50 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded flex items-center justify-center font-extrabold ${
                      activeTopic === idx ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {t.no}
                    </span>
                    <span className="truncate">{t.title}</span>
                  </button>
                ))}
              </div>

              {/* Right Column: Dynamic Visual Showcase */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/50 shadow-sm text-left flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-slate-50 rounded-bl-3xl flex items-center justify-center pointer-events-none">
                  {topics[activeTopic].icon}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="px-3 py-1 rounded bg-[#002855]/5 border border-[#002855]/10 text-[#002855] text-[9px] font-extrabold uppercase tracking-wider">
                      TOPIK AKSI {topics[activeTopic].no}
                    </span>
                    <span className="px-3 py-1 rounded bg-slate-900 text-white text-[9px] font-extrabold uppercase tracking-wider">
                      {topics[activeTopic].sdg}
                    </span>
                  </div>

                  <h4 className="text-2xl font-extrabold text-slate-900 mb-4 pr-16 leading-tight">
                    {topics[activeTopic].title}
                  </h4>

                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-8">
                    {topics[activeTopic].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[9px] font-extrabold text-[#002855] uppercase tracking-widest block mb-2">Aktivitas Nyata</span>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        {topics[activeTopic].acts}
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[9px] font-extrabold text-amber-700 uppercase tracking-widest block mb-2">Rencana Anggaran Kerja</span>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        {topics[activeTopic].cost}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/[0.06] border border-amber-500/10 rounded-xl">
                  <p className="text-[11px] font-bold text-amber-800 leading-snug">
                    📌 <strong>Informasi Asistensi:</strong> Bahas rancangan anggaran biaya (RAB) dan perizinan kelurahan dengan Dosen Pancasila kelas Anda pada kolokium Minggu ke-10.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= TIMELINE SECTION ================= */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002855]/5 text-[#002855] text-[9px] font-extrabold uppercase tracking-widest mb-3">
                ROADMAP AKSI KELOMPOK
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Timeline Tahapan Proyek</h3>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1.5">Urutan alur kerja mingguan proyek</p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-10 text-left max-w-4xl mx-auto">
              {timeline.map((step) => (
                <div key={step.week} className="relative">
                  {/* Timeline circle node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#002855] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#002855]" />
                  </div>
                  
                  <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-sm hover:border-[#002855]/30 transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white text-[9px] font-extrabold uppercase">
                        {step.week}
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-[#002855] transition-colors">
                      {step.task}
                    </h4>
                    <p className="text-[11px] sm:text-xs font-medium text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= ASSESSMENT & REPORT FORMAT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 text-left">
            
            {/* Left: Report Format (Sistematika Laporan) */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/50 shadow-sm">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 text-white text-[9px] font-extrabold uppercase tracking-widest mb-3">
                  FORMAT LAPORAN AKHIR
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                  <FileText className="text-[#002855]" size={22} /> Sistematika Laporan Proyek
                </h3>
              </div>

              <div className="space-y-3">
                {babs.map((bab) => {
                  const isOpen = expandedBab === bab.id
                  return (
                    <div key={bab.id} className="border border-slate-100 rounded-xl overflow-hidden transition-all">
                      <button
                        onClick={() => setExpandedBab(isOpen ? null : bab.id)}
                        className={`w-full p-4 text-left font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition-colors ${
                          isOpen ? 'bg-[#002855]/5 text-[#002855]' : 'bg-slate-50/50 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <span>{bab.title}</span>
                          <span className="block text-[9px] font-bold text-slate-400 normal-case mt-0.5">{bab.sub}</span>
                        </div>
                        <ChevronRight size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-90 text-[#002855]' : 'text-slate-400'}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white border-t border-slate-100 p-4"
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

            {/* Right: Grading Rubric (Kriteria Penilaian) */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/50 shadow-sm flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/5 text-amber-700 text-[9px] font-extrabold uppercase tracking-widest mb-3">
                    STANDAR EVALUASI NILAI
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <BarChart2 className="text-[#002855]" size={22} /> Kriteria Penilaian Proyek
                  </h3>
                </div>

                <div className="space-y-4">
                  {grading.map((g) => (
                    <div key={g.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-extrabold">
                        <span className="text-slate-700">{g.name}</span>
                        <span className="text-[#002855]">{g.weight}%</span>
                      </div>
                      
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
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Akumulasi Nilai Akhir</span>
                <span className="px-3 py-1 rounded bg-[#002855]/5 border border-[#002855]/10 text-[#002855] font-extrabold text-xs">
                  100% MAKSIMAL
                </span>
              </div>
            </div>
          </div>

          {/* ================= ACADEMIC CALLOUT ACTION ================= */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#002855] rounded-3xl p-8 sm:p-12 text-center text-white shadow-md relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(white_1.5px,transparent_1.5px),linear-gradient(90deg,white_1.5px,transparent_1.5px)] bg-[size:30px_30px] pointer-events-none" />
            
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">Siap Mengabdi untuk Indonesia?</h3>
            <p className="text-slate-300 font-bold text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8">
              Aktualisasikan butir-butir luhur Pancasila dalam wujud aksi nyata ilmiah yang bermanfaat langsung bagi kemakmuran dan masa depan masyarakat Indonesia.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/portal"
                className="px-6 py-3.5 bg-white text-[#002855] hover:bg-slate-50 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all active:scale-[0.98]"
              >
                Mulai Belajar Pancasila
              </a>
              <a 
                href="/leaderboard"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all active:scale-[0.98]"
              >
                Peringkat Mahasiswa
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
