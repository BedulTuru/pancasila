import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, Search, Filter, AlertCircle, Clock, Smartphone, MapPin, RefreshCw } from 'lucide-react'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

export default function AdminSecurityLogs() {
  const [filter, setFilter] = useState('')

  const { data: analytics, isLoading: loading, refetch, isFetching } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const res = await api.get('/admin/analytics')
      return res.data
    },
    staleTime: 1000 * 30, // 30 seconds
  })

  const logs = analytics?.recentActivity || []

  const filteredLogs = logs.filter(l => 
    l.action.toLowerCase().includes(filter.toLowerCase()) || 
    l.user?.name?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="min-h-screen pb-20 bg-slate-950">
      {/* ━━━ PAGE HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative pt-28 pb-14 overflow-hidden">
        {/* Intense Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Blue Sovereign Glow */}
        <div className="absolute inset-x-0 top-0 h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all mb-8">
            <ArrowLeft size={16} /> Command Interface
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-6">
                 <div className="px-3 py-1 rounded-lg bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    Audit Stream
                 </div>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter mb-4 uppercase leading-none">
                 The <span className="text-blue-500">Sentinel</span>
              </h1>
              <p className="text-slate-400 font-medium text-lg max-w-lg leading-relaxed">
                 Real-time forensic surveillance and behavioral forensics. Tracking every synchronized interaction within the Sovereign array.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  placeholder="DECRYPT_ACTIVITY_STREAM..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full bg-slate-900/60 pl-14 pr-8 py-5 rounded-[2.5rem] border border-white/5 focus:border-blue-500 outline-none transition-all shadow-2xl text-[10px] font-black text-white placeholder:text-slate-700 uppercase tracking-widest"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ━━━ CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-8">

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-slate-600 font-black uppercase tracking-[0.3em] text-[10px]">Synchronizing Forensic Stream...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredLogs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border transition-all hover:bg-white/[0.02] flex flex-col sm:flex-row sm:items-center gap-8 ${
                  log.action.includes('DELETE') ? 'border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]' : 'border-white/5'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl border ${
                  log.action.includes('LOGIN') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
                  log.action.includes('DELETE') ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                }`}>
                  {log.action.includes('LOGIN') ? <Shield size={28} /> : log.action.includes('DELETE') ? <AlertCircle size={28} /> : <Clock size={28} />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{new Date(log.createdAt).toLocaleString()}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                    <span className="text-[9px] font-black text-blue-500 italic tracking-widest">{log.ipAddress || 'STATIC_IP_HIDDEN'}</span>
                  </div>
                  <h3 className="text-lg font-black text-white italic tracking-tight leading-none">
                    <span className="text-blue-500 group-hover:underline underline-offset-4 decoration-blue-500/30">{log.user?.name || 'SYSTEM_DAEMON'}</span> {log.details}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <span className="inline-flex items-center gap-2 text-[8px] font-black bg-slate-950 text-slate-600 px-3 py-1.5 rounded-lg border border-white/5 uppercase tracking-widest">
                      <Smartphone size={10} /> {log.userAgent?.split(' ')[0] || 'UNIDENTIFIED_BROWSER'}
                    </span>
                    <span className="inline-flex items-center gap-2 text-[8px] font-black bg-slate-950 text-slate-600 px-3 py-1.5 rounded-lg border border-white/5 uppercase tracking-widest">
                      <MapPin size={10} /> SECTOR: GLOBAL_SENSING
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className={`text-[9px] font-black tracking-[0.3em] uppercase px-5 py-2 rounded-xl border ${
                    log.action.includes('LOGIN') ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' : 
                    log.action.includes('DELETE') ? 'border-red-500/20 text-red-500 bg-red-500/5' : 'border-blue-500/20 text-blue-500 bg-blue-500/5'
                  }`}>
                    {log.action}
                  </span>
                </div>
              </motion.div>
            ))}

            {filteredLogs.length === 0 && (
              <div className="text-center py-40 bg-slate-950/50 rounded-[3rem] border border-dashed border-white/5">
                <p className="text-slate-600 font-black uppercase tracking-widest text-[10px]">Zero forensic anomalies detected in current stream.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
