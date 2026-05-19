import { motion } from 'framer-motion'
import { Award, Compass, BookOpen, Scale, ArrowRight, ShieldCheck, CheckCircle2, Globe, Heart, Check } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function SDG() {
  const sdg4Highlights = [
    {
      title: 'Inklusivitas Total',
      desc: 'Membuka akses pendidikan tanpa memandang suku, agama, ras, dan latar belakang sosial pelajar di seluruh penjuru Nusantara.',
      icon: <Globe className="text-red-500" size={20} />
    },
    {
      title: 'Modul Pembelajaran ITB',
      desc: 'Materi kurikulum SMP kelas 7 s.d 9 dirancang terstruktur oleh mahasiswa ITB agar mudah dipahami secara mendalam.',
      icon: <BookOpen className="text-red-500" size={20} />
    },
    {
      title: 'Bimbingan Latihan & Kuis',
      desc: 'Ratusan soal latihan adaptif dengan pembahasan interaktif instan guna mempercepat pemahaman materi.',
      icon: <Award className="text-red-500" size={20} />
    }
  ]

  const sdg10Highlights = [
    {
      title: '100% Bebas Biaya',
      desc: 'Menghapus penghalang finansial pendidikan dengan menjamin akses gratis selamanya tanpa biaya pendaftaran tersembunyi.',
      icon: <Scale className="text-pink-500" size={20} />
    },
    {
      title: 'Teknologi Ramah Kuota',
      desc: 'Situs web dirancang super ringan dan hemat kuota agar dapat diakses lancar menggunakan HP berspesifikasi rendah di daerah terpencil.',
      icon: <Compass className="text-pink-500" size={20} />
    },
    {
      title: 'Pemerataan Daerah 3T',
      desc: 'Fokus mendistribusikan ilmu pengetahuan ke kawasan Tertinggal, Terdepan, dan Terluar untuk memperkecil ketimpangan pendidikan.',
      icon: <Heart className="text-pink-500" size={20} />
    }
  ]

  return (
    <>
      <Helmet>
        <title>Dukungan SDGs (SDG 4 & SDG 10) - Portal Pancasila Edu</title>
        <meta name="description" content="Komitmen nyata Portal Pancasila Edu dalam mendukung Sustainable Development Goals PBB khususnya Pendidikan Berkualitas dan Pengurangan Kesenjangan." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
        
        {/* Abstract micro-grid pattern for deep high-fidelity aesthetics */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(var(--edu-navy)_1.5px,transparent_1.5px),linear-gradient(90deg,var(--edu-navy)_1.5px,transparent_1.5px)] bg-[size:45px_45px]" />
        
        {/* Soft floating background light blobs */}
        <div className="absolute top-10 -right-60 w-[45rem] h-[45rem] bg-gradient-to-tr from-red-200/10 to-rose-200/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 -left-60 w-[40rem] h-[40rem] bg-gradient-to-bl from-pink-200/10 to-orange-100/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* ================= HEADER SECTION ================= */}
          <div className="text-center mb-24 relative">
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border border-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-widest mb-8 shadow-md"
            >
              <ShieldCheck className="text-emerald-600" size={16} /> 
              <span>UNITED NATIONS PARTNERSHIP</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl sm:text-7xl font-black tracking-tight leading-none mb-6 text-slate-900"
            >
              Mendukung Misi Global <br />
              <span className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">SDG 4 & SDG 10</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-bold text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed"
            >
              Pancasila Edu bertindak nyata menyelaraskan butir Keadilan Sosial bagi Seluruh Rakyat Indonesia dengan agenda PBB dalam mewujudkan pemerataan ilmu pengetahuan universal.
            </motion.p>
          </div>

          {/* ================= CARD INITIATIVE 1: SDG 4 ================= */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] border border-slate-100 p-8 sm:p-14 shadow-2xl mb-16 text-left relative overflow-hidden group hover:border-red-200 transition-all duration-300"
          >
            {/* Corner Decorative Gradient Ring */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-[3rem] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Column: Big Majestic SDG Logo */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-[2.5rem] border border-red-100 shadow-2xl p-4 flex items-center justify-center relative overflow-hidden mb-6"
                >
                  <img src="/sdg4.png" alt="SDG 4 Logo" className="w-full h-full object-contain rounded-[1.8rem]" />
                </motion.div>
                
                <span className="px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider mb-2">
                  TARGET NO. 4
                </span>
                <h4 className="text-xl font-black text-slate-800">Pendidikan Berkualitas</h4>
              </div>

              {/* Right Column: Detailed High-Fidelity Information */}
              <div className="lg:col-span-8">
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-2">PILAR KEADILAN SOSIAL</span>
                <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight">
                  Menjamin Mutu Pembelajaran Inklusif & Merata
                </h3>
                
                <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-8">
                  Pendidikan berkualitas adalah fondasi kemajuan peradaban. Pancasila Edu berkomitmen menghadirkan kurikulum bimbingan belajar berkualitas tinggi tanpa sekat ekonomi, memadukan sains, humaniora, dan pembentukan karakter Pancasila.
                </p>

                {/* Sub Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  {sdg4Highlights.map((hl) => (
                    <div key={hl.title} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-red-50/20 hover:border-red-100 transition-colors">
                      <div className="mb-3">{hl.icon}</div>
                      <h5 className="font-black text-slate-800 text-xs mb-1.5">{hl.title}</h5>
                      <p className="text-[10px] font-medium text-slate-400 leading-relaxed">{hl.desc}</p>
                    </div>
                  ))}
                </div>

                {/* pancasila correlation badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                  <Check size={12} className="text-red-500" /> Keselarasan: Sila ke-5 (Keadilan Sosial)
                </div>
              </div>

            </div>
          </motion.div>

          {/* ================= CARD INITIATIVE 2: SDG 10 ================= */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] border border-slate-100 p-8 sm:p-14 shadow-2xl mb-16 text-left relative overflow-hidden group hover:border-pink-200 transition-all duration-300"
          >
            {/* Corner Decorative Gradient Ring */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-bl-[3rem] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Column: Big Majestic SDG Logo */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-[2.5rem] border border-pink-100 shadow-2xl p-4 flex items-center justify-center relative overflow-hidden mb-6"
                >
                  <img src="/sdg10.png" alt="SDG 10 Logo" className="w-full h-full object-contain rounded-[1.8rem]" />
                </motion.div>
                
                <span className="px-4 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-[10px] font-black uppercase tracking-wider mb-2">
                  TARGET NO. 10
                </span>
                <h4 className="text-xl font-black text-slate-800">Berkurangnya Kesenjangan</h4>
              </div>

              {/* Right Column: Detailed High-Fidelity Information */}
              <div className="lg:col-span-8">
                <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest block mb-2">PEMERATAAN HAK BELAJAR</span>
                <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight">
                  Demokratisasi Ilmu untuk Pelajar Indonesia
                </h3>
                
                <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-8">
                  Ketimpangan ekonomi tidak boleh membatasi kecerdasan anak bangsa. Pancasila Edu meruntuhkan dinding pembatas bimbel mahal dengan menawarkan sistem pembelajaran digital gratis berkualitas demi mencapai kesetaraan mutlak.
                </p>

                {/* Sub Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  {sdg10Highlights.map((hl) => (
                    <div key={hl.title} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-pink-50/20 hover:border-pink-100 transition-colors">
                      <div className="mb-3">{hl.icon}</div>
                      <h5 className="font-black text-slate-800 text-xs mb-1.5">{hl.title}</h5>
                      <p className="text-[10px] font-medium text-slate-400 leading-relaxed">{hl.desc}</p>
                    </div>
                  ))}
                </div>

                {/* pancasila correlation badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                  <Check size={12} className="text-pink-500" /> Keselarasan: Sila ke-3 (Persatuan Indonesia)
                </div>
              </div>

            </div>
          </motion.div>

          {/* ================= GRAND CALLOUT FOOTER BANNER ================= */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[3rem] p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="text-3xl font-black mb-3">Membangun Jembatan Akses Pendidikan</h3>
            <p className="text-slate-300 font-bold text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8">
              Portal Pancasila Edu mewadahi sinergi keilmuan akademisi ITB langsung ke genggaman para siswa SMP di seluruh penjuru pelosok Nusantara secara cuma-cuma demi Indonesia Maju yang adil sejahtera.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-[10px] font-black uppercase tracking-wider">
              <div className="px-6 py-3.5 rounded-xl bg-white/10 border border-white/10 text-slate-300">
                Pendidikan Inklusif
              </div>
              <ArrowRight className="hidden sm:block text-emerald-400" />
              <div className="px-6 py-3.5 rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/20">
                SDG 2030 Indonesia Terwujud
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
