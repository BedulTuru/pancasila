import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, Search, AlertCircle, Clock, Smartphone, Globe } from 'lucide-react'
import api from '../utils/api'
import { useQuery } from '@tanstack/react-query'

export default function AdminSecurityLogs() {
  const [filter, setFilter] = useState('')

  const { data: analytics, isLoading: loading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const res = await api.get('/admin/analytics')
      return res.data
    },
    staleTime: 1000 * 30, // 30 seconds
  })

  const logs = analytics?.recentActivity || []

  const filteredLogs = logs.filter(l => 
    l.action?.toLowerCase().includes(filter.toLowerCase()) || 
    l.user?.name?.toLowerCase().includes(filter.toLowerCase()) ||
    l.details?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: 'var(--edu-cream)' }}>
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Back Link */}
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-600 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          <span>Kembali Ke Dashboard</span>
        </Link>

        {/* Title and Search Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b" style={{ borderColor: 'var(--edu-border)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-slate-900 text-white uppercase tracking-widest">
                LOG AUDIT
              </span>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-red-100 text-red-800 uppercase tracking-widest">
                KEAMANAN SISTEM
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight" style={{ color: 'var(--edu-navy)' }}>
              Riwayat Aktivitas & Keamanan
            </h1>
            <p className="text-slate-500 font-bold text-sm max-w-xl">
              Audit jejak aktivitas administrator, proses login pengguna, serta perubahan parameter sistem Pancasila Edu demi menjaga integritas portal.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Cari log atau nama..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-white pl-11 pr-4 py-3 rounded-2xl border outline-none transition-all text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:border-slate-400"
              style={{ borderColor: 'var(--edu-border)', boxShadow: 'var(--shadow-sm)' }}
            />
          </div>
        </div>

        {/* Logs Stream */}
        <div className="mt-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2rem] border" style={{ borderColor: 'var(--edu-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin mb-4" style={{ borderColor: 'var(--edu-navy)' }} />
              <p className="text-slate-400 font-bold text-xs">Memuat log aktivitas...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLogs.map((log, i) => {
                const isLogin = log.action?.includes('LOGIN');
                const isDelete = log.action?.includes('DELETE') || log.action?.includes('REMOVE');
                const isUpdate = log.action?.includes('UPDATE') || log.action?.includes('EDIT') || log.action?.includes('CREATE');

                let badgeColor = 'bg-blue-50 text-blue-700 border-blue-100';
                if (isLogin) badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-100';
                if (isDelete) badgeColor = 'bg-red-50 text-red-700 border-red-100';
                if (isUpdate) badgeColor = 'bg-amber-50 text-amber-700 border-amber-100';

                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-white p-6 rounded-[2rem] border flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all hover:border-slate-300"
                    style={{ borderColor: 'var(--edu-border)', boxShadow: 'var(--shadow-sm)' }}
                  >
                    <div className="flex items-start gap-4 text-left">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                        isLogin ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                        isDelete ? 'bg-red-50 border-red-100 text-red-600' :
                        'bg-blue-50 border-blue-100 text-blue-600'
                      }`}>
                        {isLogin ? <Shield size={22} /> : isDelete ? <AlertCircle size={22} /> : <Clock size={22} />}
                      </div>

                      {/* Content details */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-slate-400">
                            {new Date(log.createdAt).toLocaleString('id-ID')}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-[10px] font-bold text-slate-500 font-mono">
                            IP: {log.ipAddress || 'Sistem'}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-800 leading-snug">
                          <span className="text-red-600 font-black">{log.user?.name || 'Sistem Otomatis'}</span> {log.details}
                        </h3>

                        {/* Telemetry info */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 text-[9px] font-bold bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md border border-slate-100">
                            <Smartphone size={10} />
                            <span>{log.userAgent?.split(' ')[0] || 'Browser'}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[9px] font-bold bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md border border-slate-100">
                            <Globe size={10} />
                            <span>Koneksi Aman</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="shrink-0 flex items-center">
                      <span className={`text-[10px] font-black tracking-wider uppercase px-4 py-1.5 rounded-full border ${badgeColor}`}>
                        {log.action}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {filteredLogs.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed" style={{ borderColor: 'var(--edu-border)' }}>
                  <p className="text-slate-400 font-bold text-sm">Tidak ada log aktivitas yang ditemukan.</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
