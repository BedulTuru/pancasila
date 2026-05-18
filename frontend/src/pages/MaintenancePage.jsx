import { motion } from 'framer-motion'
import { ShieldAlert, Radio, Zap } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function MaintenancePage({ message }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <Helmet>
        <title>SISTEM OFFLINE | Pancasila Edu</title>
      </Helmet>

      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center relative z-10"
      >
        <div className="flex justify-center gap-6 mb-12">
           <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-red-500 shadow-2xl">
              <ShieldAlert size={32} />
           </div>
           <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-red-600/20">
              <Radio size={32} className="animate-pulse" />
           </div>
           <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-blue-500 shadow-2xl">
              <Zap size={32} />
           </div>
        </div>

        <div className="space-y-4 mb-12">
           <div className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase">Status Sistem: Pemeliharaan</div>
           <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
              System <span className="text-red-600">Off-line</span>
           </h1>
           <p className="text-slate-400 font-medium text-lg max-w-md mx-auto leading-relaxed">
              {message || 'Sistem sedang dalam pemeliharaan rutin untuk meningkatkan performa dan keamanan platform.'}
           </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-md mb-8">
           <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                 <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              </div>
              <div>
                 <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Status Koneksi</div>
                 <div className="text-xs font-bold text-slate-200">Menunggu pemulihan koneksi database...</div>
              </div>
           </div>
        </div>

        <div className="text-[10px] font-mono font-black text-slate-700 uppercase tracking-[0.3em]">
           Otentikasi Diperlukan untuk Melanjutkan
        </div>
      </motion.div>

      {/* HUD Framing */}
      <div className="fixed top-8 left-8 text-[10px] font-black text-slate-800 uppercase tracking-widest pointer-events-none">
        System_Security_Active
      </div>
      <div className="fixed bottom-8 right-8 text-[10px] font-black text-slate-800 uppercase tracking-widest pointer-events-none">
        Build_ID: PANCASILA_V2_PROD
      </div>
    </div>
  )
}
