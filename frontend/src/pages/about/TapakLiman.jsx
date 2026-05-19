import { motion } from 'framer-motion'
import { Sparkles, MapPin, Compass, ShieldAlert, Award, Star } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function TapakLiman() {
  const pillars = [
    {
      title: 'Pendidikan Setara',
      desc: 'Membuka akses bimbingan belajar gratis berkualitas standar mahasiswa ITB untuk seluruh adik-adik SMP di daerah 3T.',
      icon: Sparkles,
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: 'Gotong Royong',
      desc: 'Membangun karakter kepedulian sosial melalui aksi kolaboratif nyata antara dunia akademis dan masyarakat luas.',
      icon: Compass,
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Karakter Unggul',
      desc: 'Menanamkan nilai-nilai luhur Pancasila dalam setiap modul ajar untuk membentuk generasi muda yang cerdas dan beradab.',
      icon: Award,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Bakti Almamater',
      desc: 'Wujud pengabdian tulus mahasiswa ITB sebagai pelopor sains dan teknologi untuk memajukan kesejahteraan bangsa.',
      icon: Star,
      color: 'from-blue-500 to-blue-600',
    },
  ]

  return (
    <>
      <Helmet>
        <title>Tapak Liman ITB - Portal Pancasila Edu</title>
        <meta name="description" content="Mengenal gerakan Tapak Liman ITB, kolaborasi pengabdian mahasiswa untuk memajukan pendidikan setara berlandaskan Pancasila." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
        {/* Background Gradients & Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(var(--edu-navy)_1px,transparent_1px),linear-gradient(90deg,var(--edu-navy)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-black uppercase tracking-widest mb-6"
            >
              <Award size={14} /> KOLABORASI MAHASISWA ITB
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-5xl font-black tracking-tight"
              style={{ color: 'var(--edu-navy)' }}
            >
              Mengenal <span className="text-red-600">Tapak Liman ITB</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-bold text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed"
            >
              Gerakan kolaboratif pengabdian masyarakat oleh mahasiswa ITB untuk mendiseminasikan nilai-nilai luhur Pancasila melalui pendidikan gratis berkualitas.
            </motion.p>
          </div>

          {/* Intro Card */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-slate-100 p-8 sm:p-12 shadow-xl mb-12 flex flex-col md:flex-row items-center gap-8 sm:gap-12"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-red-50 border border-red-100 rounded-[2rem] flex items-center justify-center shadow-lg shadow-red-100/50">
              <img src="/itb.png" alt="ITB Logo" className="h-16 w-auto" />
            </div>
            
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl font-black mb-3" style={{ color: 'var(--edu-navy)' }}>
                Jejak Nyata untuk Pendidikan Bangsa
              </h3>
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
                Nama <strong className="text-slate-800 font-black">"Tapak Liman"</strong> diambil dari filosofi tumbuhan obat tradisional Indonesia yang kokoh menapak bumi meski sering diinjak. Seperti filosofi tersebut, gerakan ini bertujuan untuk turun langsung ke masyarakat akar rumput, menancapkan fondasi pendidikan yang kuat, dan menciptakan perubahan sosial yang berkelanjutan di seluruh nusantara.
              </p>
            </div>
          </motion.div>

          {/* Pillars Title */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--edu-navy)' }}>
              Empat Pilar Gerakan Tapak Liman
            </h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
              Prinsip Aksi Nyata Kolaborasi Pendidikan
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {pillars.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx + 0.3 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white/80 backdrop-blur-sm rounded-[2rem] border border-slate-100 p-8 text-left shadow-lg flex gap-5"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                  <p.icon size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-lg mb-2">{p.title}</h4>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Callout */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <h3 className="text-xl sm:text-2xl font-black mb-3">Mari Bergerak Bersama Kami!</h3>
            <p className="text-slate-300 font-medium text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-6">
              Saatnya menuangkan idealisme mahasiswa menjadi aksi nyata. Jadilah relawan tutor atau dukung platform pembelajaran gratis ini demi terwujudnya masa depan cerah anak-anak bangsa.
            </p>
            <div className="inline-flex gap-4">
              <a 
                href="/register"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
              >
                Gabung Sekarang
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
