import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Wrench, LogIn, ArrowRight, Clock } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function MaintenancePage({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans" style={{ background: 'var(--edu-cream)' }}>
      <Helmet>
        <title>Pemeliharaan Sistem | Pancasila Edu</title>
      </Helmet>

      {/* Grid Pattern matching the rest of the application */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(var(--edu-navy) 1px, transparent 1px), linear-gradient(90deg, var(--edu-navy) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.04) 0%, transparent 70%)'
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center relative z-10"
      >
        {/* Beautiful Elegant White Card */}
        <div 
          className="bg-white rounded-[2.5rem] p-10 sm:p-12 border shadow-lg text-center"
          style={{ 
            borderColor: 'var(--edu-border)', 
            boxShadow: '0 20px 50px rgba(30, 41, 59, 0.04)' 
          }}
        >
          {/* Logo Branding */}
          <div className="flex items-center gap-3 justify-center mb-8">
            <img src="/garuda.svg" alt="Garuda Logo" className="h-9 w-auto" />
            <div className="flex flex-col text-left">
              <span className="font-black text-base tracking-tight uppercase" style={{ color: 'var(--edu-navy)' }}>Pancasila</span>
              <span className="text-[9px] font-bold tracking-widest opacity-60 uppercase" style={{ color: 'var(--edu-red)' }}>PORTAL EDUKASI</span>
            </div>
          </div>

          {/* Icon Circle */}
          <div className="w-20 h-20 rounded-[2rem] bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-8 shadow-inner border border-red-100">
            <Wrench size={36} className="animate-pulse" />
          </div>

          <div className="space-y-4 mb-8">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-amber-100 text-amber-800">
              Pemeliharaan Sistem
            </span>
            <h1 
              className="text-3xl sm:text-4xl font-black tracking-tight leading-none"
              style={{ color: 'var(--edu-navy)' }}
            >
              Portal Sedang <span style={{ color: 'var(--edu-red)' }}>Diperbarui</span>
            </h1>
            <p className="text-slate-500 font-bold text-sm leading-relaxed max-w-md mx-auto">
              Kami sedang melakukan peningkatan rutin untuk menghadirkan fitur-fitur baru dan pengalaman belajar yang lebih mulus untuk Anda.
            </p>
          </div>

          {/* Admin Custom Message Block */}
          {message && (
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 mb-8 text-left">
              <div className="flex items-center gap-2 mb-2 text-slate-400">
                <Clock size={12} />
                <span className="text-[10px] font-black uppercase tracking-wider">Pesan Dari Tim IT</span>
              </div>
              <p className="text-xs font-bold text-slate-700 leading-relaxed italic">
                "{message}"
              </p>
            </div>
          )}

          {/* Info Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-bold text-slate-500 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Koneksi Database & Keamanan Aktif</span>
          </div>
        </div>

        {/* Escape Hatch: Admin Access Link */}
        <div className="mt-8 text-center">
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.98] shadow-md shadow-slate-900/10"
          >
            <LogIn size={13} />
            <span>Masuk Sebagai Admin</span>
            <ArrowRight size={13} />
          </Link>
          <p className="text-[10px] text-slate-400 font-medium mt-3">
            Khusus guru, tutor, dan administrator Pancasila Edu
          </p>
        </div>
      </motion.div>
    </div>
  )
}
