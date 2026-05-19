import { motion } from 'framer-motion'
import { Award, ShieldAlert, Sparkles, BookOpen, Compass, ChevronRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function NilaiPancasila() {
  const silas = [
    {
      number: 1,
      title: 'Ketuhanan Yang Maha Esa',
      sub: 'The Pillar of Spirituality',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-amber-500 stroke-amber-600" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      desc: 'Meyakini keberadaan Tuhan Yang Maha Esa dan membina toleransi umat beragama di lingkungan belajar demi harmoni bersama.',
      accent: 'border-amber-100 bg-amber-50/10 text-amber-600',
    },
    {
      number: 2,
      title: 'Kemanusiaan Yang Adil dan Beradab',
      sub: 'The Pillar of Humanity',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-red-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" strokeDasharray="4 4" />
          <path d="M12 2v20M2 12h20" />
          <circle cx="12" cy="12" r="3" className="fill-red-500" />
        </svg>
      ),
      desc: 'Menghargai martabat manusia secara adil, bersikap sopan santun dalam berinteraksi sosial di forum diskusi pembelajaran.',
      accent: 'border-red-100 bg-red-50/10 text-red-600',
    },
    {
      number: 3,
      title: 'Persatuan Indonesia',
      sub: 'The Pillar of Unity',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-emerald-600" strokeWidth="2">
          <path d="M12 2C8 2 4 6 4 10c0 4.5 4 10 8 12 4-2 8-7.5 8-12 0-4-4-8-8-8z" />
          <circle cx="12" cy="10" r="3" className="fill-emerald-100" />
        </svg>
      ),
      desc: 'Mengedepankan persatuan dan kesatuan di atas perbedaan suku, ras, atau golongan demi kemajuan masa depan bangsa Indonesia.',
      accent: 'border-emerald-100 bg-emerald-50/10 text-emerald-600',
    },
    {
      number: 4,
      title: 'Kerakyatan Yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan / Perwakilan',
      sub: 'The Pillar of Democracy',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-blue-600" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      desc: 'Mengutamakan musyawarah untuk mencapai mufakat dalam pengambilan keputusan bersama, menghargai setiap saran/pendapat orang lain.',
      accent: 'border-blue-100 bg-blue-50/10 text-blue-600',
    },
    {
      number: 5,
      title: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia',
      sub: 'The Pillar of Social Justice',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-purple-600" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      desc: 'Berbuat adil kepada sesama, menyeimbangkan hak dan kewajiban belajar, serta aktif membagi ilmu untuk kemaslahatan bersama.',
      accent: 'border-purple-100 bg-purple-50/10 text-purple-600',
    },
  ]

  return (
    <>
      <Helmet>
        <title>Nilai Luhur Pancasila - Portal Pancasila Edu</title>
        <meta name="description" content="Pahami pengamalan nilai luhur Pancasila (Sila 1-5) dalam ekosistem pendidikan gratis berkualitas oleh ITB." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
        {/* Background Decorative */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(var(--edu-navy)_1px,transparent_1px),linear-gradient(90deg,var(--edu-navy)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-black uppercase tracking-widest mb-6"
            >
              <Compass size={14} /> PANDUAN KARAKTER GENERASI MUDA
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-5xl font-black tracking-tight"
              style={{ color: 'var(--edu-navy)' }}
            >
              Pengamalan <span className="text-red-600">Nilai Pancasila</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-bold text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed"
            >
              Pancasila bukan sekadar hafalan, melainkan panduan sikap moral luhur yang kita integrasikan langsung dalam sistem belajar-mengajar di portal ini.
            </motion.p>
          </div>

          {/* Interactive Cards */}
          <div className="space-y-6">
            {silas.map((s, idx) => (
              <motion.div
                key={s.number}
                initial={{ x: idx % 2 === 0 ? -30 : 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx + 0.2 }}
                className={`bg-white/90 backdrop-blur-md rounded-[2.5rem] border p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 transition-all ${s.accent}`}
              >
                {/* Symbol Wrap */}
                <div className="w-20 h-20 shrink-0 rounded-3xl bg-white border border-slate-100 shadow-md flex items-center justify-center">
                  {s.symbol}
                </div>

                {/* Sila Info */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                      Sila ke-{s.number}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {s.sub}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-tight mb-3">
                    {s.title}
                  </h3>
                  
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Educational Callout */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-slate-100 p-8 sm:p-12 shadow-xl text-center max-w-3xl mx-auto"
          >
            <div className="w-12 h-12 bg-red-50 rounded-2xl mx-auto flex items-center justify-center text-red-600 mb-6 border border-red-100">
              <BookOpen size={22} />
            </div>
            
            <h3 className="text-xl font-black mb-3" style={{ color: 'var(--edu-navy)' }}>
              Belajar Bersama dengan Karakter Terbaik
            </h3>
            
            <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mb-8">
              Melalui kuis Pancasila, tantangan belajar harian, dan forum diskusi yang sehat di portal ini, kita senantiasa memupuk profil pelajar Pancasila yang cerdas, toleran, dan berintegritas tinggi.
            </p>

            <a 
              href="/portal"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-950 text-white rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              Mulai Belajar Sekarang <ChevronRight size={14} strokeWidth={2.5} />
            </a>
          </motion.div>

        </div>
      </div>
    </>
  )
}
