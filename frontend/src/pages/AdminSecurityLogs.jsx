import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, Search, Filter, AlertCircle, Clock, Smartphone, MapPin } from 'lucide-react'
import api from '../utils/api'
import toast from 'react-hot-toast'

export default function AdminSecurityLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      // Backend api.get('/analytics') has recentActivity, but let's assume we have a dedicated log endpoint 
      // or we just use the logs from the analytics for now.
      const res = await api.get('/analytics')
      setLogs(res.data.recentActivity || [])
    } catch {
      toast.error('Gagal mengambil log keamanan')
    } finally {
      setLoading(false)
    }
  }

  const filteredLogs = logs.filter(l => 
    l.action.toLowerCase().includes(filter.toLowerCase()) || 
    l.user?.name?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--edu-cream)' }}>
      {/* ━━━ PAGE HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div 
        className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: 'var(--edu-cream)' }}
      >
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.045] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(var(--edu-navy) 1px, transparent 1px), linear-gradient(90deg, var(--edu-navy) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at 60% 50%, black 40%, transparent 80%)',
        }} />
        {/* Blue glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 75% 60%, rgba(37,99,235,0.06) 0%, transparent 55%)',
        }} />

        {/* Decorative icon */}
        <Shield
          size={260}
          strokeWidth={1}
          className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.04] rotate-[-5deg]"
          style={{ color: 'var(--edu-navy)' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 transition-colors hover:text-black relative z-20"
            style={{ color: 'var(--edu-muted)' }}>
            <ArrowLeft size={16} /> Kembali ke Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              {/* Blue accent line */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 rounded-full bg-blue-500" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
                  Security Audit
                </p>
              </div>
              <h1 
                className="text-4xl md:text-5xl font-black mb-3"
                style={{ color: 'var(--edu-text)', fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: 1.08 }}
              >
                Log Keamanan
              </h1>
              <p className="text-base font-medium max-w-lg" style={{ color: 'var(--edu-muted)' }}>
                Pemantauan aktivitas sistem dan jejak digital pengguna secara mendalam dan real-time.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="text"
                  placeholder="Cari aksi atau pengguna..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full bg-white pl-11 pr-6 py-3.5 rounded-full border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-md shadow-slate-100/50 text-sm font-medium placeholder:text-slate-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ━━━ CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-8">

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin mb-4" style={{ borderColor: 'var(--edu-navy)', borderTopColor: 'transparent' }} />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Memuat riwayat keamanan...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLogs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white p-6 rounded-[1.8rem] border shadow-sm flex flex-col sm:flex-row sm:items-center gap-6 transition-all hover:shadow-md ${
                  log.action.includes('DELETE') ? 'border-red-100' : 'border-gray-100'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  log.action.includes('LOGIN') ? 'bg-green-50 text-green-600' : 
                  log.action.includes('DELETE') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {log.action.includes('LOGIN') ? <Shield size={24} /> : log.action.includes('DELETE') ? <AlertCircle size={24} /> : <Clock size={24} />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black uppercase tracking-tighter text-gray-400">{new Date(log.createdAt).toLocaleString()}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-xs font-bold text-gray-600">{log.ipAddress || 'Unknown IP'}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 group">
                    <span className="text-blue-600">{log.user?.name || 'Sistem'}</span> {log.details}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                      <Smartphone size={10} /> {log.userAgent?.split(' ')[0] || 'Browser Unknown'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                      <MapPin size={10} /> Lokasi: ID (Auto)
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border ${
                    log.action.includes('LOGIN') ? 'border-green-200 text-green-600 bg-green-50' : 
                    log.action.includes('DELETE') ? 'border-red-200 text-red-600 bg-red-50' : 'border-blue-200 text-blue-600 bg-blue-50'
                  }`}>
                    {log.action}
                  </span>
                </div>
              </motion.div>
            ))}

            {filteredLogs.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                <p className="text-gray-400">Tidak ada log aktivitas yang ditemukan.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
