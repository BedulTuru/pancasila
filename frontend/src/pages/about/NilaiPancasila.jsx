import { motion } from 'framer-motion'
import { BookOpen, Compass, ChevronRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function NilaiPancasila() {
  const silas = [
    {
      number: 1,
      title: 'Ketuhanan Yang Maha Esa',
      sub: 'Sila Ke-1',
      // Authentic Logo: Golden Star on a Black Shield
      symbol: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 shadow-md rounded-2xl overflow-hidden border border-slate-200">
          {/* Black Shield Base */}
          <rect width="100" height="100" fill="#1E2022" />
          {/* Golden Star */}
          <path 
            d="M50 15 L60 42 L88 42 L66 58 L74 85 L50 68 L26 85 L34 58 L12 42 L40 42 Z" 
            fill="#FFD700" 
            stroke="#FF8C00" 
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
          {/* Inner details for 3D gold effect */}
          <path d="M50 15 L50 68 L74 85 Z" fill="#FFA500" opacity="0.4" />
          <path d="M50 15 L50 68 L26 85 Z" fill="#FFF" opacity="0.2" />
        </svg>
      ),
      desc: 'Pengakuan atas keberadaan Tuhan Yang Maha Esa. Mengembangkan toleransi, saling menghormati, dan kebebasan menjalankan ibadah sesuai agama masing-masing di lingkungan belajar ITB.',
      accent: 'border-slate-200 bg-white/95 text-slate-800',
    },
    {
      number: 2,
      title: 'Kemanusiaan Yang Adil dan Beradab',
      sub: 'Sila Ke-2',
      // Authentic Logo: Gold Chain (17 links) on a Red Shield
      symbol: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 shadow-md rounded-2xl overflow-hidden border border-red-200">
          {/* Red Shield Base */}
          <rect width="100" height="100" fill="#DC2626" />
          {/* Gold Chain (Interlocking circles representation) */}
          <circle cx="50" cy="50" r="26" fill="none" stroke="#FFD700" strokeWidth="6" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="#FFA500" strokeWidth="4" />
          {/* Interlocking links decoration */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 22 * Math.cos(rad);
            const y = 50 + 22 * Math.sin(rad);
            return (
              <circle 
                key={i} 
                cx={x} 
                cy={y} 
                r="5" 
                fill="#FFD700" 
                stroke="#B45309" 
                strokeWidth="1.5" 
              />
            )
          })}
        </svg>
      ),
      desc: 'Menghargai harkat dan martabat sesama manusia. Menerapkan keadilan, kesetaraan hak, serta adab sopan santun yang tinggi dalam berkolaborasi lintas disiplin ilmu.',
      accent: 'border-red-200 bg-red-50/10 text-red-700',
    },
    {
      number: 3,
      title: 'Persatuan Indonesia',
      sub: 'Sila Ke-3',
      // Authentic Logo: Banyan Tree (Pohon Beringin) on a White Shield
      symbol: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 shadow-md rounded-2xl overflow-hidden border border-slate-200">
          {/* White Shield Base */}
          <rect width="100" height="100" fill="#FFFFFF" />
          {/* Banyan Tree Foliage (Green) */}
          <path 
            d="M50 15 C30 15 25 35 25 48 C25 55 32 55 35 55 C32 60 42 62 45 60 C42 66 58 66 55 60 C58 62 68 60 65 55 C68 55 75 55 75 48 C75 35 70 15 50 15 Z" 
            fill="#15803D" 
            stroke="#166534" 
            strokeWidth="2" 
          />
          {/* Hanging roots */}
          <path d="M36 50 V60 M42 52 V63 M58 52 V63 M64 50 V60" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
          {/* Tree Trunk & Roots (Black/Dark Brown) */}
          <path 
            d="M48 55 L47 75 L40 82 L42 84 L48 78 L52 78 L58 84 L60 82 L53 75 L52 55 Z" 
            fill="#1E293B" 
          />
        </svg>
      ),
      desc: 'Mengutamakan kepentingan bangsa di atas kepentingan pribadi atau golongan. Menjunjung tinggi persatuan tanah air di tengah keanekaragaman latar belakang budaya mahasiswa.',
      accent: 'border-slate-200 bg-white/95 text-slate-800',
    },
    {
      number: 4,
      title: 'Kerakyatan Yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan / Perwakilan',
      sub: 'Sila Ke-4',
      // Authentic Logo: Bull Head (Kepala Banteng) on a Red Shield
      symbol: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 shadow-md rounded-2xl overflow-hidden border border-red-200">
          {/* Red Shield Base */}
          <rect width="100" height="100" fill="#DC2626" />
          {/* Horns (White with black tips) */}
          <path d="M30 45 C15 30 25 15 35 15 C40 15 42 22 38 28 C32 38 38 45 42 45 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
          <path d="M70 45 C85 30 75 15 65 15 C60 15 58 22 62 28 C68 38 62 45 58 45 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
          <path d="M35 15 C30 15 22 25 28 35 Z" fill="#1E293B" />
          <path d="M65 15 C70 15 78 25 72 35 Z" fill="#1E293B" />
          {/* Head (Black) */}
          <path 
            d="M32 45 C32 68 40 85 50 85 C60 85 68 68 68 45 C68 42 60 40 50 40 C40 40 32 42 32 45 Z" 
            fill="#1E293B" 
          />
          {/* Nose/Muzzle details */}
          <ellipse cx="50" cy="74" rx="10" ry="6" fill="#475569" />
          <circle cx="45" cy="74" r="2" fill="#1E293B" />
          <circle cx="55" cy="74" r="2" fill="#1E293B" />
        </svg>
      ),
      desc: 'Mengedepankan musyawarah untuk mufakat dalam setiap pengambilan keputusan kelompok. Menghormati pendapat orang lain tanpa adanya paksaan kehendak.',
      accent: 'border-red-200 bg-red-50/10 text-red-700',
    },
    {
      number: 5,
      title: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia',
      sub: 'Sila Ke-5',
      // Authentic Logo: Rice & Cotton (Padi & Kapas) on a White Shield
      symbol: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 shadow-md rounded-2xl overflow-hidden border border-slate-200">
          {/* White Shield Base */}
          <rect width="100" height="100" fill="#FFFFFF" />
          {/* Stems */}
          <path d="M42 82 Q46 65 34 25 M58 82 Q54 65 66 25" stroke="#15803D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          
          {/* Rice (Left Side - Yellow) */}
          {[30, 40, 50, 60, 70].map((y, i) => (
            <g key={`rice-${i}`}>
              <path d={`M ${38 - i*2} ${y} Q ${32 - i*2} ${y-6} ${38 - i*2} ${y-12} Q ${44 - i*2} ${y-6} ${38 - i*2} ${y}`} fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
            </g>
          ))}
          
          {/* Cotton (Right Side - Green/White) */}
          {[35, 50, 65].map((y, i) => (
            <g key={`cotton-${i}`}>
              {/* White Cotton Petals */}
              <circle cx={60 + i*2} cy={y} r="7" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
              <circle cx={65 + i*2} cy={y-4} r="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
              <circle cx={55 + i*2} cy={y-4} r="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
              {/* Green base leaf */}
              <path d={`M ${55 + i*2} ${y+2} L ${60 + i*2} ${y+8} L ${65 + i*2} ${y+2} Z`} fill="#15803D" />
            </g>
          ))}
        </svg>
      ),
      desc: 'Bersikap adil kepada sesama rekan belajar, menyeimbangkan hak serta kewajiban akademis, serta bergotong-royong membantu teman yang mengalami kesulitan.',
      accent: 'border-slate-200 bg-white/95 text-slate-800',
    },
  ]

  return (
    <>
      <Helmet>
        <title>Nilai Luhur Pancasila - Portal Pancasila Edu</title>
        <meta name="description" content="Pahami pengamalan nilai luhur Pancasila (Sila 1-5) dengan lambang resmi Garuda Pancasila di ekosistem pendidikan." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(var(--edu-navy)_1px,transparent_1px),linear-gradient(90deg,var(--edu-navy)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          {/* Header */}
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
              className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900"
            >
              Butir Pengamalan <span className="text-red-600">Nilai Pancasila</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-bold text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed"
            >
              Visualisasi makna filosofis lima dasar negara Indonesia lengkap dengan lambang resmi tameng dada Burung Garuda Pancasila.
            </motion.p>
          </div>

          {/* Sila List Cards */}
          <div className="space-y-6">
            {silas.map((s, idx) => (
              <motion.div
                key={s.number}
                initial={{ x: idx % 2 === 0 ? -30 : 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx + 0.2 }}
                className={`bg-white rounded-[2.5rem] border p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 transition-all ${s.accent}`}
              >
                {/* Authentic High-Fidelity SVG Emblem */}
                <div className="shrink-0 flex items-center justify-center">
                  {s.symbol}
                </div>

                {/* Sila Info */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
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
