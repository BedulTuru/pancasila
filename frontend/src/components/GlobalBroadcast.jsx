import { motion, AnimatePresence } from 'framer-motion'
import { Radio, X, Bell, ShieldAlert, AlertTriangle } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { useState, useEffect } from 'react'
import { sound } from '../utils/audio'

export default function GlobalBroadcast() {
  const [isDismissed, setIsDismissed] = useState(false)
  const [localBroadcastId, setLocalBroadcastId] = useState(null)

  const { data: config, isLoading } = useQuery({
    queryKey: ['system-broadcast'],
    queryFn: async () => {
      try {
        const res = await api.get(`/portal/config?t=${Date.now()}`) 
        return res.data
      } catch (err) {
        console.warn('Signal lost. Retrying...');
        return null;
      }
    },
    refetchInterval: 5000, 
    retry: 3,
    enabled: true 
  })

  // Reset dismissal if config changes
  useEffect(() => {
    if (!config?.broadcastActive) {
      setLocalBroadcastId(null)
      return
    }

    const currentId = `${config.broadcastTitle}_${config.broadcastMsg}_${config.broadcastPriority}`
    if (currentId !== localBroadcastId) {
      const dismissedId = localStorage.getItem('last_dismissed_broadcast')
      if (dismissedId === currentId) {
        setIsDismissed(true)
      } else {
        setIsDismissed(false)
      }
      
      setLocalBroadcastId(currentId)

      if (dismissedId !== currentId) {
        // Trigger alert audio
        sound.playSignal(config.broadcastPriority || 0)
      }
    }
  }, [config, localBroadcastId])

  const handleDismiss = () => {
    sound.init()
    setIsDismissed(true)
    sound.playPop('success')
    if (localBroadcastId) {
      localStorage.setItem('last_dismissed_broadcast', localBroadcastId)
    }
  }

  if (isLoading || !config?.broadcastActive || isDismissed) return null

  const isOverride = config.broadcastPriority === 2
  const isUrgent = config.broadcastPriority === 1

  return (
    <>
      <AnimatePresence>
        {/* 1. OVERRIDE STRATEGIC BROADCAST (FULL SCREEN MODAL) */}
        {isOverride && !isDismissed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 text-center"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-lg w-full rounded-[2.5rem] p-8 sm:p-10 border border-red-100 shadow-2xl text-center mx-4 relative"
            >
              <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-2xl mx-auto flex items-center justify-center text-red-600 mb-6">
                <ShieldAlert size={28} />
              </div>
              
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-red-100 text-red-800 uppercase tracking-widest">
                PENGUMUMAN PENTING SISTEM
              </span>

              <h2 className="text-xl sm:text-2xl font-black mt-4 mb-2 tracking-tight text-slate-800">
                {config.broadcastTitle || 'Pemberitahuan Sistem'}
              </h2>
              
              <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                {config.broadcastMsg}
              </p>

              <button 
                onClick={handleDismiss}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.98]"
              >
                Saya Mengerti
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. STANDARD / URGENT BANNER (RESPONSIVE AND FLOATING ELEGANTLY) */}
      <AnimatePresence>
        {!isOverride && !isDismissed && (
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            className="fixed top-24 left-4 right-4 md:left-auto md:right-8 z-[9999] w-auto md:w-[28rem]"
          >
            <div 
              className={`bg-white/95 backdrop-blur-md border rounded-[2rem] shadow-xl p-5 relative flex items-start gap-4 transition-all ${
                isUrgent ? 'border-amber-200 bg-amber-50/10' : 'border-blue-200 bg-blue-50/10'
              }`}
            >
              {/* Status Indicator Icon */}
              <div className={`p-3 rounded-xl border shrink-0 ${
                isUrgent ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-blue-50 border-blue-100 text-blue-600'
              }`}>
                {isUrgent ? <AlertTriangle size={18} /> : <Bell size={18} />}
              </div>

              {/* Broadcast Content */}
              <div className="flex-1 min-w-0 pr-6 text-left">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider truncate">
                    {config.broadcastTitle || 'PENGUMUMAN'}
                  </h3>
                  <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded ${
                    isUrgent ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {isUrgent ? 'PENTING' : 'INFORMASI'}
                  </span>
                </div>
                
                <p className="text-xs font-medium text-slate-500 leading-relaxed mb-3">
                  {config.broadcastMsg}
                </p>

                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isUrgent ? 'bg-amber-400' : 'bg-blue-400 animate-ping'}`} />
                    Pancasila Edu
                  </span>
                  
                  <button 
                    onClick={handleDismiss}
                    className="text-[9px] font-black text-slate-800 hover:text-red-600 uppercase tracking-wider transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>

              {/* Close Button X */}
              <button 
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
