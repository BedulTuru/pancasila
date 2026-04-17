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

// ─── CRITICAL FIX: DO NOT interpolate Tailwind colors dynamically ──────────────
// Dynamic classes like `bg-${color}-50` are purged in production by Tailwind.
// Use hardcoded style objects instead.
const STAT_STYLES = [
  { bg: '#E3EEFF', color: 'var(--edu-navy)' },    // Total Siswa
  { bg: '#EAFAF1', color: '#1E8449' },              // Materi Belajar
  { bg: '#FEF8E7', color: '#9B7210' },              // Kuis Terjawab
  { bg: '#FDECEA', color: 'var(--edu-red)' },       // Tingkat Kelulusan
]

const CHART_COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#3B82F6', '#EC4899']

export default function AdminAnalytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const res = await api.get('/analytics')
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
      <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--edu-navy)', borderTopColor: 'transparent' }} />
    </div>
  )

  const stats = [
    { label: 'Total Siswa', value: data?.totals.users, icon: Users, trend: '+12%' },
    { label: 'Materi Belajar', value: data?.totals.materials, icon: BookOpen, trend: '+5' },
    { label: 'Kuis Terjawab', value: data?.totals.attempts, icon: Brain, trend: '+84' },
    { label: 'Tingkat Kelulusan', value: `${data?.avgPassRate || 0}%`, icon: ShieldCheck, trend: 'Stabil' },
  ]

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
        {/* Violet glow for analytics */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 75% 60%, rgba(139,92,246,0.08) 0%, transparent 55%)',
        }} />

        {/* Decorative icon */}
        <Activity
          size={260}
          strokeWidth={1}
          className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.04] rotate-[-5deg]"
          style={{ color: 'var(--edu-navy)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
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
              {/* Violet accent line */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 rounded-full bg-violet-500" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">
                  Platform Insights
                </p>
              </div>
              <h1 
                className="text-4xl md:text-5xl font-black mb-3"
                style={{ color: 'var(--edu-text)', fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: 1.08 }}
              >
                Statistik <span className="text-violet-600">&amp; Analitik</span>
              </h1>
              <p className="text-base font-medium max-w-lg" style={{ color: 'var(--edu-muted)' }}>
                Laporan aktivitas dan performa platform secara real-time. Pantau pertumbuhan dan konversi pelajar.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white transition-all text-sm font-bold shadow-sm"
              >
                <Download size={18} /> Export Laporan
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ━━━ CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-8">

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border shadow-sm hover:shadow-md transition-shadow"
              style={{ borderColor: 'var(--edu-border)' }}
            >
              <div className="flex items-center justify-between mb-4">
                {/* FIXED: use inline style instead of dynamic Tailwind class */}
                <div className="p-3 rounded-2xl" style={{ background: STAT_STYLES[i].bg }}>
                  <stat.icon size={24} style={{ color: STAT_STYLES[i].color }} />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{ background: '#EAFAF1', color: '#1E8449' }}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--edu-muted)' }}>{stat.label}</p>
              <h3 className="text-3xl font-black" style={{ color: 'var(--edu-text)' }}>{stat.value ?? '—'}</h3>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          {/* Activity Over Time */}
          <div className="bg-white p-8 rounded-[2rem] border shadow-sm" style={{ borderColor: 'var(--edu-border)' }}>
            <div className="flex items-center gap-2 mb-8">
              <Activity size={20} className="text-violet-500" />
              <h3 className="text-xl font-bold" style={{ color: 'var(--edu-text)' }}>Aktivitas Konten</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.popularMaterials?.slice(0, 7) || []}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="title" hide />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="viewCount" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-8 rounded-[2rem] border shadow-sm" style={{ borderColor: 'var(--edu-border)' }}>
            <div className="flex items-center gap-2 mb-8">
              <Zap size={20} style={{ color: '#9B7210' }} />
              <h3 className="text-xl font-bold" style={{ color: 'var(--edu-text)' }}>Distribusi Kategori</h3>
            </div>
            <div className="h-[300px] w-full flex items-center">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.categoryStats || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="_count.materials"
                  >
                    {(data?.categoryStats || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-3 flex-1 pl-2 overflow-hidden">
                {(data?.categoryStats || []).map((cat, i) => (
                  <div key={cat.name} className="flex items-center gap-2 min-w-0">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <span className="text-sm font-medium truncate" style={{ color: 'var(--edu-muted)' }}>{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Logs */}
        <div className="bg-white rounded-[2rem] border shadow-sm overflow-hidden" style={{ borderColor: 'var(--edu-border)' }}>
          <div className="p-8 border-b flex items-center justify-between" style={{ borderColor: 'var(--edu-border)' }}>
            <div className="flex items-center gap-2">
              <TrendingUp size={20} style={{ color: 'var(--edu-navy)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--edu-text)' }}>Log Aktivitas Terkini</h3>
            </div>
            <Link to={`${ADMIN_PATH}/logs`} className="text-sm font-bold hover:underline" style={{ color: 'var(--edu-navy)' }}>
              Lihat Semua Log
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead style={{ background: 'var(--edu-cream)' }}>
                <tr>
                  {['Waktu', 'Pengguna', 'Aksi', 'Detail'].map(h => (
                    <th key={h} className="px-8 py-4 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--edu-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(data?.recentActivity || []).map((log) => (
                  <tr key={log.id} className="border-t hover:bg-slate-50 transition-colors" style={{ borderColor: 'var(--edu-border)' }}>
                    <td className="px-8 py-4 text-xs" style={{ color: 'var(--edu-muted)' }}>
                      {new Date(log.createdAt).toLocaleString('id-ID')}
                    </td>
                    <td className="px-8 py-4 font-bold" style={{ color: 'var(--edu-text)' }}>{log.user?.name || 'Sistem'}</td>
                    <td className="px-8 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold`} style={{
                        background: log.action.includes('LOGIN') ? '#EAFAF1' : log.action.includes('DELETE') ? '#FDECEA' : '#E3EEFF',
                        color: log.action.includes('LOGIN') ? '#1E8449' : log.action.includes('DELETE') ? 'var(--edu-red)' : 'var(--edu-navy)',
                      }}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-sm" style={{ color: 'var(--edu-muted)' }}>{log.details}</td>
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
