import { motion, AnimatePresence } from 'framer-motion'
import { Radio, X, Bell, ShieldAlert, ChevronRight } from 'lucide-react'
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
        console.warn('Operational signal lost. Retrying...');
        return null;
      }
    },
    refetchInterval: 5000, 
    retry: 3,
    enabled: true 
  })

  // If the broadcast content changes, reset dismissal and trigger "Hard" alerts
  useEffect(() => {
    if (!config?.broadcastActive) {
      setLocalBroadcastId(null)
      return
    }

    const currentId = `${config.broadcastTitle}_${config.broadcastMsg}_${config.broadcastPriority}`
    if (currentId !== localBroadcastId) {
      // Check if this specific broadcast was previously dismissed in this browser
      const dismissedId = localStorage.getItem('last_dismissed_broadcast')
      if (dismissedId === currentId) {
        setIsDismissed(true)
      } else {
        setIsDismissed(false)
      }
      
      setLocalBroadcastId(currentId)

      // Only trigger alerts (sound/notification) if NOT already dismissed
      if (dismissedId !== currentId) {
        // 1. Audio Protocol
        sound.playSignal(config.broadcastPriority || 0)

        // 2. OS Notification Protocol
        if ("Notification" in window) {
          if (Notification.permission === "granted") {
            new Notification(`[EXECUTIVE] ${config.broadcastTitle}`, {
              body: config.broadcastMsg,
              icon: '/favicon.ico' 
            })
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission()
          }
        }
      }
    }
  }, [config, localBroadcastId])

  const handleDismiss = () => {
    sound.init()
    setIsDismissed(true)
    sound.playPop('success')
    // Persist dismissal for this specific broadcast ID
    if (localBroadcastId) {
      localStorage.setItem('last_dismissed_broadcast', localBroadcastId)
    }
  }

  if (isLoading || !config?.broadcastActive || isDismissed) return null

  return (
    <>
      <AnimatePresence>
        {config?.broadcastPriority === 2 && !isDismissed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center"
          >
              <motion.div 
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 max-w-2xl w-full"
              >
                 <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-2xl mx-auto flex items-center justify-center text-white mb-10 shadow-3xl">
                    <ShieldAlert size={32} strokeWidth={1.5} />
                 </div>
                 <h1 className="text-3xl lg:text-4xl font-black text-white italic tracking-tighter mb-4 uppercase">
                    PRIORITY_STRATEGIC_SIGNAL
                 </h1>
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.6em] mb-12">
                   Direct_Override_Protocol_Engaged
                </p>

                <div className="bg-slate-900 border border-white/5 rounded-[2rem] p-12 mb-12 shadow-2xl">
                   <h2 className="text-xs font-black text-blue-500 uppercase mb-6 tracking-[0.3em]">{config.broadcastTitle}</h2>
                   <p className="text-xl font-medium text-white leading-relaxed tracking-tight">{config.broadcastMsg}</p>
                </div>

                <button 
                  onClick={handleDismiss}
                  className="px-14 py-5 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-slate-200 transition-all flex items-center gap-4 mx-auto shadow-2xl"
                >
                  SYNCHRONIZE_CONFIGURATION <ChevronRight size={14} strokeWidth={3} />
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. STANDARD BROADCAST ARRAY BANNER */}
      <AnimatePresence>
        {(!config?.broadcastPriority || config.broadcastPriority < 2) && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xl px-4"
          >
            <div className="bg-slate-950/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-3xl p-1 overflow-hidden">
              <div className="bg-slate-900/40 rounded-[1.7rem] p-6 flex items-start gap-5 relative overflow-hidden">
                <div className="p-3 bg-slate-950 border border-white/10 text-white rounded-xl shadow-2xl shrink-0">
                   <Radio size={18} strokeWidth={1.5} />
                </div>

                <div className="flex-1 min-w-0 pr-10">
                   <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-none">
                        {config.broadcastTitle || 'TRANSMISSION'}
                      </h3>
                      <div className={`px-2 py-0.5 text-[6px] font-black uppercase tracking-widest rounded leading-none border ${
                        config.broadcastPriority === 1 ? 'border-amber-500/30 text-amber-500 bg-amber-500/5' : 'border-blue-500/30 text-blue-500 bg-blue-500/5'
                      }`}>
                         {config.broadcastPriority === 1 ? 'URGENT_SIGNAL' : 'OPERATIONAL_UPDATE'}
                      </div>
                   </div>
                   <p className="text-[11px] font-medium text-slate-400 leading-relaxed tracking-tight">
                      {config.broadcastMsg}
                   </p>
                   <div className="mt-4 flex items-center gap-6">
                      <div className="text-[7px] font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-1.5 font-mono">
                         <span className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                         SIGNAL_VALIDATED
                      </div>
                      <button 
                         onClick={() => {
                           sound.init()
                           setIsDismissed(true)
                           sound.playPop('success')
                         }}
                         className="text-[8px] font-black text-white uppercase tracking-[0.3em] hover:text-blue-400 transition-colors"
                      >
                         SYNCHRONIZE_PROTOCOL
                      </button>
                   </div>
                </div>

                <button 
                   onClick={() => setIsDismissed(true)}
                   className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
                >
                   <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
