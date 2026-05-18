import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts'
import {
  ArrowLeft, Users, BookOpen, Brain, Activity, TrendingUp,
  ShieldCheck, Zap, Download
} from 'lucide-react'
import api from '../utils/api'
import toast from 'react-hot-toast'

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || '/admin'

const CHART_COLORS = ['#3b82f6', '#10B981', '#f59e0b', '#8b5cf6', '#ec4899']

export default function AdminAnalytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const res = await api.get('/admin/analytics')
      setData(res.data)
    } catch {
      toast.error('Gagal memuat data analitik')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      const res = await api.get('/admin/export/users', { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'pancasila_users.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Laporan berhasil diunduh!')
    } catch {
      toast.error('Gagal mengunduh laporan')
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--edu-cream)' }}>
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const stats = [
    { label: 'Total Pengguna', value: data?.totals.users, icon: Users, bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Total Materi', value: data?.totals.materials, icon: BookOpen, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Total Kuis Dikerjakan', value: data?.totals.attempts, icon: Brain, bg: 'bg-amber-50', text: 'text-amber-600' },
    { label: 'Rata-rata Kelulusan', value: `${data?.avgPassRate || 0}%`, icon: ShieldCheck, bg: 'bg-purple-50', text: 'text-purple-600' },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: 'var(--edu-cream)' }}>
      {/* ━━━ PAGE HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all mb-6">
          <ArrowLeft size={18} /> Kembali ke Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-3">
               <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-100 text-blue-600 shadow-sm border border-blue-200">
                  <TrendingUp size={24} strokeWidth={2} />
               </div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">Analitik Platform</h1>
            </div>
            <p className="text-slate-500 font-medium text-base max-w-xl">
               Pantau perkembangan belajar siswa, statistik penggunaan, dan performa materi secara keseluruhan.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <button
              onClick={handleExport}
              className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95 flex items-center gap-2"
            >
              <Download size={18} strokeWidth={2.5} /> Ekspor Laporan CSV
            </button>
          </motion.div>
        </div>
      </div>

      {/* ━━━ CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.text}`}>
                <stat.icon size={24} strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value ?? '—'}</h3>
              <p className="text-sm font-bold text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Over Time */}
          <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Activity size={20} strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Aktivitas Akses Materi</h3>
            </div>
            <div className="h-[300px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.popularMaterials?.slice(0, 7) || []}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="title" hide />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '12px', 
                      border: '2px solid #f1f5f9',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                    itemStyle={{ color: '#0f172a', fontWeight: '700', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="viewCount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Zap size={20} strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Distribusi Materi per Topik</h3>
            </div>
            <div className="h-[300px] w-full flex items-center relative z-10">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.categoryStats || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="_count.materials"
                  >
                    {(data?.categoryStats || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="rgba(255,255,255,1)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        borderRadius: '12px', 
                        border: '2px solid #f1f5f9',
                        fontSize: '12px',
                        fontWeight: '700'
                     }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-3 flex-1 pl-4 overflow-hidden relative z-10">
                {(data?.categoryStats || []).map((cat, i) => (
                  <div key={cat.name} className="flex items-center gap-2 min-w-0">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <span className="text-sm font-bold text-slate-600 truncate">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Logs */}
        <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b-2 border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl border border-slate-200">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Catatan Aktivitas Terbaru</h3>
            </div>
            <Link to={`${ADMIN_PATH}/logs`} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-xl">
              Lihat Semua Log
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b-2 border-slate-100">
                <tr>
                  {['Waktu', 'Pengguna', 'Aktivitas', 'Aksi'].map(h => (
                    <th key={h} className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                {(data?.recentActivity || []).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5 text-sm font-medium text-slate-500">
                      {new Date(log.createdAt).toLocaleTimeString('id-ID')}
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">
                             {log.user?.name?.charAt(0) || 'S'}
                          </div>
                          <span className="text-sm font-bold text-slate-900">{log.user?.name || 'Sistem'}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-600">
                       {log.details}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${
                        log.action.includes('LOGIN') ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 
                        log.action.includes('DELETE') ? 'bg-red-50 border-red-200 text-red-600' : 
                        'bg-blue-50 border-blue-200 text-blue-600'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
