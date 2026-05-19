import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCheck, Sparkles, BookOpen, Send, CheckCircle2, ChevronRight, Award } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function Persyaratan() {
  const [activeTab, setActiveTab] = useState('siswa')

  const requirements = {
    siswa: {
      title: 'Persyaratan untuk Siswa Belajar',
      subtitle: 'Semua pelajar tingkat SMP/Sederajat di Indonesia berhak mendapatkan akses penuh gratis.',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      items: [
        'Sedang menempuh pendidikan tingkat SMP/MTs/Sederajat (Kelas 7, 8, atau 9).',
        'Memiliki perangkat belajar pendukung (HP Android/iOS atau Laptop).',
        'Memiliki koneksi internet yang stabil untuk mengakses materi dan kuis.',
        'Mempunyai alamat email aktif untuk registrasi dan melacak pencapaian level.',
        'Berkomitmen menjaga sopan santun di kolom diskusi interaktif.',
      ]
    },
    tutor: {
      title: 'Persyaratan Tutor & Kontributor',
      subtitle: 'Mahasiswa, alumni ITB, atau akademisi profesional yang ingin mengabdi dan berkontribusi.',
      icon: Award,
      color: 'bg-red-50 text-red-600 border-red-100',
      items: [
        'Mahasiswa aktif, alumni ITB, atau praktisi akademis dari perguruan tinggi terakreditasi.',
        'Mempunyai pemahaman kuat terhadap kurikulum matematika/IPA/IPS tingkat SMP.',
        'Berkomitmen membuat materi ajar yang kreatif, inklusif, dan bebas unsur SARA.',
        'Mengalokasikan waktu minimal 2 jam per minggu untuk meninjau diskusi siswa.',
        'Melampirkan Curriculum Vitae (CV) singkat dan surat motivasi pengabdian.',
      ]
    },
    relawan: {
      title: 'Persyaratan Relawan Pengembang',
      subtitle: 'Software Engineer, UI/UX Designer, dan pegiat IT yang ingin memperkuat infrastruktur portal.',
      icon: Sparkles,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      items: [
        'Mempunyai keterampilan teknis di bidang Web Development (React, Node.js, Prisma, Tailwind).',
        'Memahami dasar-dasar UI/UX Design modern dan performa aplikasi web.',
        'Memiliki akun GitHub aktif untuk kolaborasi kode repositori open-source.',
        'Berkomitmen tinggi terhadap integritas keamanan data privasi siswa.',
        'Siap bekerja sama secara kolaboratif dalam tim jarak jauh (remote team).',
      ]
    }
  }

  const activeData = requirements[activeTab]

  return (
    <>
      <Helmet>
        <title>Persyaratan & Ketentuan - Portal Pancasila Edu</title>
        <meta name="description" content="Ketahui persyaratan bergabung sebagai siswa belajar, tutor kontributor, atau relawan pengembang di Pancasila Edu." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
        <div className="absolute top-20 -left-40 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-black uppercase tracking-widest mb-6"
            >
              <UserCheck size={14} /> GABUNG GERAKAN PENDIDIKAN
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900"
            >
              Persyaratan & <span className="text-red-600">Panduan</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-bold text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed"
            >
              Pilihlah peran Anda hari ini untuk berkontribusi mencerdaskan bangsa bersama mahasiswa ITB di ekosistem digital terpadu ini.
            </motion.p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-10 p-1.5 bg-slate-100 rounded-3xl max-w-lg mx-auto border border-slate-200/50">
            {Object.keys(requirements).map((tab) => {
              const isActive = activeTab === tab
              const labels = { siswa: 'Siswa SMP', tutor: 'Tutor Ajar', relawan: 'Relawan IT' }
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 relative ${
                    isActive ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-req-tab"
                      className="absolute inset-0 bg-slate-900 rounded-2xl shadow-md"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{labels[tab]}</span>
                </button>
              )
            })}
          </div>

          {/* Guidelines Details Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 p-8 sm:p-12 shadow-xl text-left"
            >
              {/* Tab Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-slate-100 mb-8">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-sm ${activeData.color}`}>
                  <activeData.icon size={26} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                    {activeData.title}
                  </h3>
                  <p className="text-slate-400 font-bold text-xs sm:text-sm mt-0.5">
                    {activeData.subtitle}
                  </p>
                </div>
              </div>

              {/* Requirements Checklist */}
              <div className="space-y-4 mb-8">
                {activeData.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Callout */}
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs font-bold text-slate-500 text-center sm:text-left max-w-sm">
                  {activeTab === 'siswa' 
                    ? 'Siap melangkah ke jalur akselerasi prestasi belajar Anda?' 
                    : 'Punya pertanyaan lebih lanjut seputar alur kerja pengabdian?'}
                </p>
                
                {activeTab === 'siswa' ? (
                  <a
                    href="/register"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98] shadow-md shadow-red-100"
                  >
                    Daftar Sekarang <ChevronRight size={14} strokeWidth={2.5} />
                  </a>
                ) : (
                  <a
                    href="mailto:tapakliman.itb@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98]"
                  >
                    Hubungi Kami <Send size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </>
  )
}
