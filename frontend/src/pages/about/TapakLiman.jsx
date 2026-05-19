import { motion } from 'framer-motion'
import { Award, Calendar, BookOpen, Layers, ShieldCheck, CheckCircle2, ChevronRight, FileText, BarChart2, Lightbulb, HelpCircle, Compass, Users, Coins } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

export default function TapakLiman() {
  const [hoveredLetter, setHoveredLetter] = useState(null)
  const [activeTopic, setActiveTopic] = useState(0)

  const acronym = [
    { char: 'T', word: 'Tanggap', desc: 'Peka terhadap isu sosial & kebutuhan nyata masyarakat.', color: 'from-red-500 to-rose-600' },
    { char: 'A', word: 'Adaptif', desc: 'Mampu menyesuaikan diri dengan dinamisnya kondisi lapangan.', color: 'from-orange-500 to-amber-600' },
    { char: 'P', word: 'Partisipatif', desc: 'Melibatkan aktif peran serta aktif warga sasaran.', color: 'from-amber-500 to-yellow-600' },
    { char: 'A', word: 'Aksi', desc: 'Tindakan nyata yang berkelanjutan & bukan sekadar wacana.', color: 'from-emerald-500 to-teal-600' },
    { char: 'K', word: 'Kolaboratif', desc: 'Bekerja sama lintas disiplin ilmu mahasiswa ITB.', color: 'from-blue-500 to-indigo-600' },
    { char: 'L', word: 'Lintas Ilmu', desc: 'Mengintegrasikan saintek dan seni dalam pengabdian.', color: 'from-violet-500 to-purple-600' },
    { char: 'I', word: 'Mandiri', desc: 'Mengandalkan kreativitas, inisiatif, dan kekuatan internal.', color: 'from-fuchsia-500 to-pink-600' },
    { char: 'N', word: 'Nasionalis', desc: 'Berlandaskan kecintaan mendalam pada tanah air & Pancasila.', color: 'from-rose-500 to-red-600' },
  ]

  const topics = [
    {
      no: 1,
      title: 'Pengembangan Ekonomi Desa (UMKM)',
      icon: <Coins className="text-amber-500" size={24} />,
      desc: 'Mahasiswa membantu masyarakat desa dalam mengembangkan usaha mikro, kecil, dan menengah (UMKM) melalui pelatihan pemasaran digital, manajemen keuangan, dan inovasi produk.',
      acts: 'Pelatihan pemasaran online, workshop manajemen keuangan, serta pendampingan branding dan kemasan produk.',
      cost: 'Pengadaan bahan baku demonstrasi, modul ajar cetak, alat presentasi, dan transportasi kelompok.'
    },
    {
      no: 2,
      title: 'Literasi Digital Masyarakat Desa',
      icon: <Lightbulb className="text-blue-500" size={24} />,
      desc: 'Mengajarkan keterampilan dasar teknologi informasi kepada warga desa, termasuk penggunaan komputer, internet secara produktif, dan media sosial secara bijak.',
      acts: 'Pelatihan dasar komputer, pembuatan email bisnis warga, serta kampanye internet sehat bebas hoaks.',
      cost: 'Penyediaan alat peraga teknologi, modul pelatihan cetak, dan biaya sewa ruang belajar desa.'
    },
    {
      no: 3,
      title: 'Pendidikan & Literasi Anak Desa',
      icon: <BookOpen className="text-emerald-500" size={24} />,
      desc: 'Mahasiswa mengadakan program bimbingan belajar kreatif serta kegiatan peningkatan literasi baca-tulis untuk anak-anak sekolah dasar di desa.',
      acts: 'Kelas bimbingan belajar sains gembira, sesi bercerita nusantara, serta perintisan pojok baca buku anak.',
      cost: 'Penyediaan ratusan buku bacaan, alat tulis belajar, papan tulis portabel, dan hadiah lomba kreativitas.'
    },
    {
      no: 4,
      title: 'Kesehatan Masyarakat Desa',
      icon: <CheckCircle2 className="text-red-500" size={24} />,
      desc: 'Menyelenggarakan kegiatan penyuluhan kesehatan dasar serta kebersihan lingkungan untuk meningkatkan kualitas hidup sehat warga.',
      acts: 'Penyuluhan gizi seimbang anak, demonstrasi pembuatan tempat sampah pilah, serta aksi bersih desa kolektif.',
      cost: 'Pembelian alat-alat kebersihan, cetak poster panduan kesehatan warga, serta perlengkapan sanitasi.'
    },
    {
      no: 5,
      title: 'Penghijauan & Pelestarian Alam',
      icon: <Compass className="text-green-600" size={24} />,
      desc: 'Kegiatan pembibitan, penanaman pohon produktif, serta edukasi ekologis guna menjaga ketahanan lahan dan mengurangi dampak perubahan iklim global.',
      acts: 'Penanaman bibit pohon buah/hutan, pembuatan taman apotek hidup desa, serta workshop daur ulang sampah organik.',
      cost: 'Pembelian puluhan bibit pohon unggul, pupuk organik, sekop, alat siram, serta spanduk edukasi lingkungan.'
    },
    {
      no: 6,
      title: 'Pemberdayaan Perempuan Desa',
      icon: <Users className="text-purple-500" size={24} />,
      desc: 'Memberikan pelatihan keterampilan produktif serta dasar-dasar manajemen kewirausahaan untuk meningkatkan kemandirian finansial kaum perempuan desa.',
      acts: 'Pelatihan menjahit / kerajinan tangan khas lokal, workshop dasar pemasaran produk kreatif, serta kemitraan kelompok.',
      cost: 'Pengadaan bahan baku praktek keterampilan, sewa mesin jahit/alat pendukung, dan konsumsi peserta.'
    },
    {
      no: 7,
      title: 'Seni dan Budaya Desa',
      icon: <Award className="text-rose-500" size={24} />,
      desc: 'Menghidupkan kembali kesenian daerah dan kerajinan tradisional guna melestarikan identitas kebudayaan lokal di tengah gempuran modernisasi.',
      acts: 'Penyelenggaraan pentas seni desa, pelatihan tari / musik tradisional untuk anak-anak, serta dokumentasi budaya.',
      cost: 'Penyewaan pakaian adat pertunjukan, perawatan alat musik lokal, serta media publikasi digital.'
    },
    {
      no: 8,
      title: 'Penyuluhan Hukum & Kewarganegaraan',
      icon: <FileText className="text-indigo-500" size={24} />,
      desc: 'Edukasi kesadaran hukum dasar, hak asasi manusia, serta pemahaman kewarganegaraan yang demokratis berlandaskan nilai-nilai Pancasila.',
      acts: 'Penyuluhan pencegahan KDRT, simulasi penyelesaian sengketa musyawarah warga, serta sesi konsultasi hukum gratis.',
      cost: 'Pencetakan buklet panduan hukum warga, biaya undang pemateri ahli, dan dekorasi aula pertemuan.'
    },
    {
      no: 9,
      title: 'Peningkatan Infrastruktur Desa',
      icon: <Layers className="text-slate-600" size={24} />,
      desc: 'Membantu merancang dan bergotong-royong memperbaiki fasilitas umum yang mendesak demi kenyamanan serta keselamatan aktivitas warga desa.',
      acts: 'Perbaikan jalan setapak berlubang, pembuatan dan pengecatan pos ronda baru, serta revitalisasi lapangan olahraga anak.',
      cost: 'Pembelian semen, pasir, cat kayu/tembok, kuas, perkakas bangunan, serta konsumsi gotong-royong warga.'
    },
    {
      no: 10,
      title: 'Kebersihan & Pengelolaan Sampah',
      icon: <ShieldCheck className="text-teal-600" size={24} />,
      desc: 'Membangun kesadaran sanitasi serta merintis sistem tata kelola sampah terpadu yang ramah lingkungan di pemukiman warga sekitar kampus.',
      acts: 'Workshop pemilahan sampah organik & anorganik, pembentukan bank sampah mandiri, serta aksi bersih selokan.',
      cost: 'Penyediaan tong sampah pilah besar, gerobak sampah dorong, masker pelindung, serta cetak stiker panduan.'
    }
  ]

  const timeline = [
    { week: 'Minggu 9', task: 'Penentuan Tema & Judul', desc: 'Setiap kelas dibagi menjadi kelompok beranggotakan maks 10 orang mahasiswa untuk merumuskan judul berlandaskan SDGs.' },
    { week: 'Minggu 10', task: 'Perumusan Proposal Proyek', desc: 'Menyusun rancangan proposal aksi pengabdian lengkap dengan road map, rencana anggaran, dan target sasaran.' },
    { week: 'Minggu 11', task: 'Presentasi Proposal Kelas', desc: 'Melakukan presentasi di hadapan Dosen Pancasila WI1101 untuk asistensi, feedback, dan persetujuan resmi.' },
    { week: 'Minggu 12-13', task: 'Implementasi Program Lapangan', desc: 'Meluncur langsung ke lokasi (dalam/luar kampus) untuk mengeksekusi program aksi nyata bersama masyarakat.' },
    { week: 'Minggu 14', task: 'Penyusunan Output & Laporan', desc: 'Menyusun laporan pelaksanaan, menyusun poster visual ilmiah, serta mengedit video perjalanan dokumentasi proyek.' },
    { week: 'Minggu 15', task: 'Pengumpulan & Presentasi Luaran', desc: 'Mengunggah seluruh luaran wajib (Laporan, Poster, Video) ke platform Edunex ITB serta melakukan presentasi akhir.' },
    { week: 'Minggu 16', task: 'Evaluasi & Penilaian Akhir', desc: 'Penilaian final berdasarkan inovasi proyek, efektivitas dokumentasi, kualitas poster, serta peer assessment kelompok.' },
  ]

  const grading = [
    { name: 'Kreativitas & Gagasan', weight: 25, color: 'bg-red-600 shadow-red-100', desc: 'Inovasi, ketajaman rumusan masalah, dan ketepatan pemilihan masyarakat sasaran.' },
    { name: 'Metode Aksi Nyata', weight: 20, color: 'bg-orange-500 shadow-orange-100', desc: 'Kesesuaian serta kepraktisan metodologi dalam menyelesaikan masalah di lapangan.' },
    { name: 'Manfaat & Keberlanjutan', weight: 15, color: 'bg-amber-500 shadow-amber-100', desc: 'Kontribusi riil untuk masyarakat, nilai tambah ekonomi/sosial, serta kelestarian program.' },
    { name: 'Luaran Wajib (Poster & Video)', weight: 20, color: 'bg-emerald-500 shadow-emerald-100', desc: 'Kualitas desain visual poster ilmiah serta kedalaman narasi video dokumentasi.' },
    { name: 'Jadwal & Anggaran', weight: 10, color: 'bg-blue-600 shadow-blue-100', desc: 'Kewajaran, kerincian rencana anggaran biaya, serta ketepatan alokasi waktu.' },
    { name: 'Peer Assessment', weight: 10, color: 'bg-purple-600 shadow-purple-100', desc: 'Penilaian kontribusi dan keaktifan bekerja sama dari rekan sejawat satu kelompok.' },
  ]

  return (
    <>
      <Helmet>
        <title>Tapak Liman WI1101 ITB - Buku Panduan Proyek Utama</title>
        <meta name="description" content="Portal Panduan Resmi Proyek Tapak Liman ITB mata kuliah Pancasila WI1101. Jelajahi 10 pilihan topik, timeline, sistematika laporan, kriteria penilaian." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
        
        {/* Decorative Grid Background and glowing blobs */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(var(--edu-navy)_1.5px,transparent_1.5px),linear-gradient(90deg,var(--edu-navy)_1.5px,transparent_1.5px)] bg-[size:40px_40px]" />
        <div className="absolute -top-32 -left-32 w-[35rem] h-[35rem] bg-red-200/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-amber-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[35rem] h-[35rem] bg-emerald-200/10 rounded-full blur-[100px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* 1. HERO SECTION (Breathtaking Visual Impact) */}
          <div className="text-center mb-20">
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-red-50/80 border border-red-100 text-red-700 text-xs font-black uppercase tracking-widest mb-8 shadow-sm backdrop-blur-sm"
            >
              <Award size={14} className="animate-pulse" /> TIM DOSEN MK PANCASILA ITB
            </motion.div>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl sm:text-7xl font-black tracking-tight leading-none mb-6"
              style={{ color: 'var(--edu-navy)' }}
            >
              PROYEK UTAMA <br className="hidden sm:block" />
              <span className="text-red-600 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">"TAPAK LIMAN"</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 font-bold text-sm sm:text-lg mt-4 max-w-3xl mx-auto leading-relaxed"
            >
              Panduan Resmi Pelaksanaan Pengabdian Masyarakat Mata Kuliah Pancasila (WI1101) Institut Teknologi Bandung. Mengaktualisasikan nilai dasar negara dalam aksi nyata SDGs.
            </motion.p>
          </div>

          {/* 2. THE PHILOSOPHY SHIELD (Frosted Glass luxury) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="lg:col-span-2 bg-white/70 backdrop-blur-md rounded-[3rem] p-10 sm:p-12 border border-white/50 shadow-2xl text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1 block">ETIMOLOGI & VISI</span>
                <h3 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
                  Mengapa Disebut "Tapak Liman"?
                </h3>
                <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-8">
                  Tapak Liman (*Elephantopus scaber*) adalah daun herbal tropis tangguh yang berkhasiat tinggi. Penamaan proyek ini dipilih secara cermat oleh Tim Dosen Pancasila ITB sebagai lambang filosofis yang mendalam:
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50/50 hover:bg-slate-50 rounded-3xl border border-slate-100 transition-all duration-300">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center font-black text-red-600 text-sm mb-4 shadow-sm">
                    👣
                  </div>
                  <h4 className="font-black text-slate-800 text-sm mb-2">TAPAK (Jejak Nyata)</h4>
                  <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                    Mewakili jejak aksi pengabdian konkret serta manfaat riil jangka panjang yang ditinggalkan mahasiswa untuk meningkatkan taraf hidup warga.
                  </p>
                </div>

                <div className="p-6 bg-slate-50/50 hover:bg-slate-50 rounded-3xl border border-slate-100 transition-all duration-300">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center font-black text-amber-600 text-sm mb-4 shadow-sm">
                    🐘
                  </div>
                  <h4 className="font-black text-slate-800 text-sm mb-2">LIMAN (Ganesha ITB)</h4>
                  <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                    Berarti Gajah, melambangkan sosok Ganesha kebanggaan almamater Institut Teknologi Bandung sebagai pelopor kemajuan ilmu, teknologi, dan seni.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Interactive KIRATA Accordion Card */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl text-left flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
              
              <div>
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1 block">AKRONIM KARAKTER</span>
                <h3 className="text-2xl font-black mb-3">Kirata "T-A-P-A-K L-I-M-A-N"</h3>
                <p className="text-slate-400 font-medium text-xs leading-relaxed mb-6">
                  Setiap huruf menggambarkan karakter kepemimpinan mahasiswa ITB yang wajib dicerminkan selama pengabdian:
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4 relative z-10">
                {acronym.map((item, idx) => (
                  <div 
                    key={item.char} 
                    onMouseEnter={() => setHoveredLetter(idx)}
                    onMouseLeave={() => setHoveredLetter(null)}
                    className="p-3 bg-white/10 rounded-2xl text-center cursor-pointer transition-all hover:bg-red-600 hover:scale-105 active:scale-95 border border-white/5 relative group"
                  >
                    <span className="font-black text-lg text-red-400 block group-hover:text-white">{item.char}</span>
                    <span className="text-[8px] font-black uppercase text-slate-300 block truncate group-hover:text-white">{item.word}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic explanation block */}
              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 h-20 flex items-center justify-center text-center">
                <p className="text-[11px] font-medium text-slate-300 leading-normal">
                  {hoveredLetter !== null 
                    ? acronym[hoveredLetter].desc 
                    : 'Arahkan kursor / sentuh salah satu huruf di atas untuk melihat maknanya.'
                  }
                </p>
              </div>
            </motion.div>
          </div>

          {/* 3. THE 10 TOPICS PRESETS (Ultimate UI Deck Grid) */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">PROGRAM PILIHAN SDGs</span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                10 Pilihan Topik Utama Proyek
              </h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                Pilih topik di bawah dan asistensi bersama dosen Anda
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Vertical Scroll/Pill Menu */}
              <div className="lg:col-span-1 flex flex-col gap-2 max-h-[35rem] overflow-y-auto pr-2 custom-scrollbar">
                {topics.map((t, idx) => (
                  <button
                    key={t.no}
                    onClick={() => setActiveTopic(idx)}
                    className={`p-4 text-left rounded-2xl font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all border flex items-center gap-4 ${
                      activeTopic === idx 
                        ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-200/50 scale-[1.02]' 
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

              {/* Big Featured Topic Display Card */}
              <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 p-8 sm:p-12 shadow-2xl text-left flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[3rem] flex items-center justify-center">
                  {topics[activeTopic].icon}
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider">
                      TOPIK {topics[activeTopic].no}
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
                      <span className="text-[9px] font-black text-red-600 uppercase tracking-widest block mb-2">Aktivitas Utama Proyek</span>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        {topics[activeTopic].acts}
                      </p>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest block mb-2">Estimasi Komponen Anggaran</span>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        {topics[activeTopic].cost}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50/50 border border-red-100/50 rounded-xl text-center sm:text-left">
                  <p className="text-[10px] font-bold text-red-700 leading-snug">
                    💡 <strong>Tips Kelompok:</strong> Kerucutkan topik di atas menjadi satu judul judul aksi spesifik (misal: "Literasi Internet Aman untuk Ibu-ibu UMKM Desa Sukawening") kemudian ajukan asistensi ke asisten kelas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. VISUAL TIMELINE (Stunning Flow) */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">ROADMAP PERKULIAHAN</span>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">Timeline Tahapan Aksi</h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Minggu Ke-9 hingga Minggu Ke-16</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map((step, idx) => (
                <motion.div
                  key={step.week}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-lg text-left flex flex-col justify-between hover:border-red-200 transition-all group hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase">
                        {step.week}
                      </span>
                      <span className="text-xs font-black text-slate-200 group-hover:text-red-100">
                        0{idx + 1}
                      </span>
                    </div>
                    <h4 className="font-black text-slate-800 text-sm mb-2 group-hover:text-red-700 transition-colors">
                      {step.task}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 5. SISTEMATIKA & PENILAIAN MATRIKS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 text-left">
            
            {/* Sistematika Penulisan Laporan */}
            <div className="bg-white rounded-[3rem] p-8 sm:p-10 border border-slate-100 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-1">PANDUAN ADMINISTRATIF</span>
                <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  <FileText className="text-red-600" /> Sistematika Laporan Proyek
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-3 border-b border-slate-50">
                    <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">I</div>
                    <div>
                      <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider mb-0.5">BAB I. PENDAHULUAN</h4>
                      <p className="text-[11px] font-medium text-slate-500">Membahas secara tajam Latar Belakang Masalah dan Rumusan Masalah yang ingin dipecahkan kelompok.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-3 border-b border-slate-50">
                    <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">II</div>
                    <div>
                      <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider mb-0.5">BAB II. TINJAUAN PUSTAKA</h4>
                      <p className="text-[11px] font-medium text-slate-500">Melampirkan kajian dasar teori pendukung serta tinjauan rujukan ilmiah menggunakan sistem rujukan Harvard.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-3 border-b border-slate-50">
                    <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">III</div>
                    <div>
                      <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider mb-0.5">BAB III. METODOLOGI & PERENCANAAN</h4>
                      <p className="text-[11px] font-medium text-slate-500">A. Metodologi, B. Rancangan Kegiatan (Tahap Persiapan awal, Pengumpulan Data Primer/Sekunder, serta Tahap Aksi Lapangan).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-3 border-b border-slate-50">
                    <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">IV</div>
                    <div>
                      <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider mb-0.5">BAB IV. HASIL & PEMBAHASAN</h4>
                      <p className="text-[11px] font-medium text-slate-500">A. Hasil Pelaksanaan Program, B. Analisis Pembahasan Keberhasilan Aksi serta kendala teknis lapangan.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">V</div>
                    <div>
                      <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider mb-0.5">BAB V. SIMPULAN & SARAN</h4>
                      <p className="text-[11px] font-medium text-slate-500">A. Simpulan evaluasi utuh kelompok, B. Saran tindak lanjut keberlanjutan demi kemaslahatan warga sasaran.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
                <span className="text-lg">📑</span>
                <p className="text-[10px] font-bold text-slate-400 leading-normal">
                  Lampiran Wajib: Halaman pengesahan tanda tangan asisten/ketua kelas dan dosen Pancasila kelas Anda.
                </p>
              </div>
            </div>

            {/* Matriks Penilaian Visual */}
            <div className="bg-slate-900 text-white rounded-[3rem] p-8 sm:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
              
              <div>
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">MATRIKS AKADEMIK</span>
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <BarChart2 className="text-red-400" /> Kriteria Penilaian Proposal & Proyek
                </h3>
                
                <div className="space-y-4">
                  {grading.map((g) => (
                    <div key={g.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-slate-300">{g.name}</span>
                        <span className="text-red-400">{g.weight}%</span>
                      </div>
                      
                      {/* Beautiful glowing bar */}
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${g.color}`} 
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
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Nilai Akumulasi</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 font-black text-xs">
                  100% MAKSIMAL
                </span>
              </div>
            </div>
          </div>

          {/* 6. CALL TO ACTION FOR MAHASISWA */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-600 to-rose-700 rounded-[3rem] p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden"
          >
            {/* Fine decoration lines */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.15)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.15)_1.5px,transparent_1.5px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-black/20 rounded-full blur-2xl" />

            <h3 className="text-3xl sm:text-4xl font-black mb-4">Ayo, Buat Perubahan Sosial Nyata!</h3>
            <p className="text-slate-100 font-bold text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
              Pancasila tidak hanya dibahas di dalam kelas kuliah. Mari kita wujudkan aksi nyata Tapak Liman yang membawa perubahan riil dan apresiasi terbaik untuk kelompok Anda!
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
                Lihat Peringkat Siswa
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
