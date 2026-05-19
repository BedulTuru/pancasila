import { motion } from 'framer-motion'
import { Award, Compass, BookOpen, Scale, ArrowRight, ShieldCheck } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function SDG() {
  return (
    <>
      <Helmet>
        <title>Dukungan SDGs (SDG 4 & 10) - Portal Pancasila Edu</title>
        <meta name="description" content="Kemitraan platform pembelajaran Pancasila Edu dalam mendukung Sustainable Development Goals (SDG 4 & 10) demi pendidikan merata berkualitas." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
        {/* Background Gradients */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(var(--edu-navy)_1px,transparent_1px),linear-gradient(90deg,var(--edu-navy)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-10 -right-40 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest mb-6"
            >
              <ShieldCheck size={14} /> SUSTAINABLE DEVELOPMENT GOALS
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900"
            >
              Dukungan terhadap <span className="text-emerald-600">SDG 4 & 10</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-bold text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed"
            >
              Pancasila Edu berkomitmen penuh mendukung program pembangunan berkelanjutan PBB melalui penyediaan pendidikan berkualitas dan penghapusan kesenjangan sosial.
            </motion.p>
          </div>

          {/* Core Goals Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* SDG 4 */}
            <motion.div 
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-red-100 shadow-xl flex flex-col text-left justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center font-black text-2xl border border-red-100 mb-6 shadow-sm">
                  4
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-4">
                  SDG 4: Pendidikan Berkualitas
                </h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                  Menjamin kualitas pendidikan yang inklusif dan merata, serta mempromosikan kesempatan belajar sepanjang hayat untuk semua anak-anak Indonesia.
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8">
                  <h4 className="font-black text-xs text-slate-800 uppercase tracking-wider mb-2">Aksi Nyata Platform:</h4>
                  <ul className="text-slate-500 font-medium text-xs space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      Modul pembelajaran komprehensif untuk SMP Kelas 7, 8, dan 9.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      Kuis adaptif dengan pembahasan materi yang mendalam dan mudah dipahami.
                    </li>
                  </ul>
                </div>
              </div>
              
              <span className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-1.5">
                QUALITY EDUCATION <Scale size={12} />
              </span>
            </motion.div>

            {/* SDG 10 */}
            <motion.div 
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-emerald-100 shadow-xl flex flex-col text-left justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center font-black text-2xl border border-emerald-100 mb-6 shadow-sm">
                  10
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-4">
                  SDG 10: Berkurangnya Kesenjangan
                </h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                  Mengurangi kesenjangan di dalam dan antarnegara dengan memastikan semua anak, tanpa memandang latar belakang ekonomi, memiliki hak belajar yang setara.
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8">
                  <h4 className="font-black text-xs text-slate-800 uppercase tracking-wider mb-2">Aksi Nyata Platform:</h4>
                  <ul className="text-slate-500 font-medium text-xs space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      100% Gratis selamanya, tanpa biaya registrasi tersembunyi apa pun.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      Akses fleksibel dari handphone ramah kuota untuk pelajar di pelosok daerah.
                    </li>
                  </ul>
                </div>
              </div>

              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1.5">
                REDUCED INEQUALITIES <Scale size={12} />
              </span>
            </motion.div>
          </div>

          {/* Visual Bridge callout */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-900 rounded-[2.5rem] p-10 sm:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            
            <h3 className="text-2xl font-black mb-3">Menjembatani Kesenjangan dengan Pendidikan</h3>
            <p className="text-slate-300 font-medium text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
              Pancasila Edu bertindak sebagai jembatan yang menghubungkan materi bimbingan belajar berkualitas tinggi standar kampus ITB ke genggaman anak-anak sekolah menengah pertama di pelosok Nusantara.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-black uppercase tracking-wider">
              <div className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white">
                Sains & Teknologi
              </div>
              <ArrowRight className="hidden sm:block text-emerald-400" />
              <div className="px-6 py-3 rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/20">
                Pendidikan Indonesia Setara
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
