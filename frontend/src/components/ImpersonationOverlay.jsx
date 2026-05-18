import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Zap, ArrowLeftCircle, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function ImpersonationOverlay() {
  const { user, isImpersonating, snapBack } = useAuth()

  if (!isImpersonating) return null

  const handleSnapBack = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          snapBack()
          resolve()
        }, 800)
      }),
      {
        loading: 'Menyiapkan transisi...',
        success: 'Sesi kembali ke mode Admin.',
        error: 'Transisi gagal.',
      }
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-sm px-4"
      >
        <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white flex-shrink-0">
             <ShieldAlert size={20} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-[8px] font-black text-red-500 uppercase tracking-widest mb-0.5">Mode Impersonasi Aktif</div>
            <div className="text-xs font-bold text-white truncate">
              User: <span className="text-slate-400 font-medium">{user?.name}</span>
            </div>
          </div>

          <button
            onClick={handleSnapBack}
            className="px-4 py-2 bg-white rounded-lg font-black text-[9px] text-slate-950 uppercase tracking-widest transition-all hover:bg-red-600 hover:text-white"
          >
            Snap Back
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
