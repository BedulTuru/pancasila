import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Brain, Trophy, Flame, TrendingUp, ArrowRight, Users, FileText, Award, ShieldCheck, Activity, Star, Zap, Download, Layers, Bell, CheckCircle, Wrench, Lightbulb, Bug, MessageSquare, Send, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { getLevelData, getXPProgressInLevel, getXPForNextLevel } from '../utils/levelSystem'
import toast from 'react-hot-toast'
import { StatCardSkeleton, MaterialCardSkeleton } from '../components/SkeletonLoader'

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || '/admin'

export default function Dashboard() {
  const { user } = useAuth()
  const { data: progressRes, isLoading: loadingProgress } = useQuery({
    queryKey: ['user-progress'],
    queryFn: async () => {
      const res = await api.get('/portal/progress')
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const { data: achievementsRes, isLoading: loadingAchievements } = useQuery({
    queryKey: ['user-achievements'],
    queryFn: async () => {
      const res = await api.get('/achievements/mine')
      return res.data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const progress = progressRes || null
  const achievements = achievementsRes || []
  const loading = loadingProgress || loadingAchievements

  const [feedbackText, setFeedbackText] = useState('')
  const [sendingFeedback, setSendingFeedback] = useState(false)
  const [feedbackCategory, setFeedbackCategory] = useState('SUGGESTION')

  const { data: announcements, isLoading: loadingAnnouncementsList } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await api.get('/announcements')
      return res.data
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  })

  const stats = [
    {
      label: 'Level Saat Ini',
      value: `Lvl ${user?.level || 1}`,
      icon: Star,
      accent: '#9B7210',
      bg: '#FEF8E7',
    },
    {
      label: 'Total Poin XP',
      value: user?.xp || 0,
      icon: Zap,
      accent: '#7e22ce',
      bg: '#F3E8FF',
    },
    {
      label: 'Materi Selesai',
      value: progress?.materialsCompleted || 0,
      icon: BookOpen,
      accent: 'var(--edu-navy)',
      bg: 'rgba(30,64,175,0.08)',
    },
    {
      label: 'Streak Login',
      value: `${user?.loginStreak || 0} hari`,
      icon: Flame,
      accent: 'var(--edu-red)',
      bg: 'rgba(220,38,38,0.08)',
    },
  ]
  const currentLevel = user?.level || 1;
  const levelData = getLevelData(currentLevel);
  const xpProgress = getXPProgressInLevel(user?.xp || 0) || 0;
  const nextLevelXP = getXPForNextLevel(currentLevel) || 100;

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: 'var(--edu-cream)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header greeting */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-600 uppercase tracking-wider">
                Status Siswa
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${levelData.bg} ${levelData.text} uppercase tracking-wider`}>
                {user?.role === 'ADMIN' ? 'ADMIN UTAMA' : levelData.title}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight" style={{ color: 'var(--edu-text)' }}>
              Halo, {user ? <span className="text-red-600">{user.name}</span> : <div className="inline-block w-48 h-10 skeleton align-middle" />}!
            </h1>
            <p style={{ color: 'var(--edu-muted)' }} className="max-w-md font-medium">
              {levelData.subtitle} Terus asah pemahamanmu agar menjadi <span className="text-slate-900 font-bold">Siswa Sekolah Menengah Pertama Unggul</span>.
            </p>
          </div>
        </motion.div>

        {/* Learning Journey Roadmap - Premium RPG Feel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Jalur Pembelajaranmu</h2>
              <p className="text-xs font-medium text-slate-400">Teruslah belajar untuk membuka pencapaian baru</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
               <Zap size={14} className="text-amber-500 fill-amber-500" />
               <span className="text-xs font-black text-slate-700">{user?.xp} <span className="text-slate-300">XP</span></span>
            </div>
          </div>

          <div className="relative overflow-x-auto pb-16 pt-4 no-scrollbar">
            <div className="flex items-center gap-4 min-w-[800px] px-2">
              {[
                { lvl: currentLevel - 1, label: 'Selesai', active: false, done: true },
                { lvl: currentLevel, label: levelData.title, active: true, done: false, progress: xpProgress },
                { lvl: currentLevel + 1, label: getLevelData(currentLevel + 1).title, active: false, done: false },
                { lvl: currentLevel + 2, label: 'Lanjutan', active: false, done: false },
                { lvl: currentLevel + 3, label: 'Mastery', active: false, done: false },
              ].map((step, i) => (
                <Fragment key={i}>
                  {/* Node */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className={`relative z-10 w-44 h-56 rounded-[2.5rem] p-6 border-2 flex flex-col items-center text-center justify-between transition-all duration-500 ${
                      step.active 
                        ? 'bg-white border-red-600 shadow-2xl shadow-red-200 -translate-y-2' 
                        : step.done 
                          ? 'bg-slate-50 border-slate-200 opacity-60 grayscale'
                          : 'bg-white border-slate-100 opacity-40 grayscale-0'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                      step.active ? 'bg-red-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step.done ? <CheckCircle size={24} /> : <span className="font-black text-lg">{step.lvl}</span>}
                    </div>
                    
                    <div>
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${step.active ? 'text-red-600' : 'text-slate-400'}`}>
                        {step.active ? 'Sekarang' : step.done ? 'Selesai' : 'Terkunci'}
                      </div>
                      <div className="text-sm font-black text-slate-900 leading-tight">
                        {step.label}
                      </div>
                    </div>

                    {step.active && (
                      <div className="w-full mt-4">
                        <div className="flex justify-between text-[9px] font-black mb-1">
                          <span className="text-slate-400">{xpProgress}%</span>
                          <span className="text-red-600">NAIK LEVEL</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${xpProgress}%` }}
                             className="h-full bg-red-600"
                           />
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Connector */}
                  {i < 4 && (
                    <div className="flex-1 h-1 min-w-[20px] bg-slate-100 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: step.done ? '100%' : step.active ? `${xpProgress}%` : '0%' }}
                        className="absolute inset-0 bg-red-600"
                      />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <StatCardSkeleton key={i} />
            ))
          ) : (
            stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-5 border transition-all"
                style={{ borderColor: 'var(--edu-border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: stat.bg }}>
                  <stat.icon size={22} style={{ color: stat.accent }} />
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-0.5" style={{ color: 'var(--edu-text)' }}>
                  {stat.value}
                </div>
                <div className="text-xs font-medium" style={{ color: 'var(--edu-muted)' }}>{stat.label}</div>
              </div>
            ))
          )}
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left col: quick actions + progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border"
              style={{ borderColor: 'var(--edu-border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <h2 className="font-bold text-lg mb-5" style={{ color: 'var(--edu-text)' }}>Mulai Belajar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { to: '/portal', label: 'Portal Materi', sub: 'Baca & pelajari', icon: BookOpen, accent: 'var(--edu-navy)', bg: 'rgba(30,64,175,0.08)' },
                  { to: '/quiz/range/4-7', label: 'Kuis', sub: 'Uji pemahaman', icon: Brain, accent: '#7e22ce', bg: 'rgba(126,34,206,0.08)' },
                  { to: '/leaderboard', label: 'Peringkat', sub: 'Lihat ranking', icon: Trophy, accent: 'var(--edu-gold)', bg: 'rgba(180,131,9,0.08)' },
                ].map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ borderColor: item.bg, background: `${item.bg}66` }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: item.bg }}>
                      <item.icon size={20} style={{ color: item.accent }} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm truncate" style={{ color: 'var(--edu-text)' }}>{item.label}</div>
                      <div className="text-xs" style={{ color: 'var(--edu-muted)' }}>{item.sub}</div>
                    </div>
                    <ArrowRight size={14} className="ml-auto flex-shrink-0 transition-transform group-hover:translate-x-1"
                      style={{ color: item.accent }} />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Learning Progress */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border"
              style={{ borderColor: 'var(--edu-border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-lg" style={{ color: 'var(--edu-text)' }}>Progres Belajar</h2>
                <TrendingUp size={18} style={{ color: '#1E8449' }} />
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map(i => <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-xl" />)}
                </div>
              ) : progress?.progress && Array.isArray(progress.progress) && progress.progress.length > 0 ? (
                <div className="space-y-3">
                  {progress.progress.slice(0, 5).map(p => {
                    if (!p || !p.material) return null;
                    return (
                      <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl"
                        style={{ background: 'var(--edu-cream)' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: '#E3EEFF' }}>
                        <BookOpen size={15} style={{ color: 'var(--edu-navy)' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate mb-1" style={{ color: 'var(--edu-text)' }}>
                          {p.material?.title}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--edu-border)' }}>
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${p.progress}%`, background: 'linear-gradient(90deg, var(--edu-red), #e05252)' }}
                            />
                          </div>
                          <span className="text-xs font-bold flex-shrink-0" style={{ color: 'var(--edu-navy)' }}>
                            {p.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp size={40} className="mx-auto mb-3" style={{ color: '#C4BFB9' }} />
                  <p className="font-medium mb-1" style={{ color: 'var(--edu-text)' }}>Belum ada progres</p>
                  <p className="text-sm mb-4" style={{ color: 'var(--edu-muted)' }}>Mulai baca materi pertamamu!</p>
                  <Link to="/portal" className="btn-navy text-sm">
                    Cari Materi <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right col: achievements + admin */}
          <div className="space-y-6">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border"
              style={{ borderColor: 'var(--edu-border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-lg" style={{ color: 'var(--edu-text)' }}>Pencapaian</h2>
                <Award size={18} style={{ color: '#9B7210' }} />
              </div>

              {loading ? (
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-square skeleton rounded-2xl" />
                  ))}
                </div>
              ) : achievements.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {achievements.map(a => (
                    <div 
                      key={a.id} 
                      className="group flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-[1.5rem] transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-200 relative overflow-hidden" 
                      title={a.achievement?.name}
                    >
                      {/* Decorative soft glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/0 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 relative z-10 transition-transform duration-300 group-hover:-translate-y-1 bg-amber-50 border border-amber-100 shadow-inner group-hover:bg-amber-100">
                        <span className="drop-shadow-sm">{a.achievement?.icon}</span>
                      </div>
                      <div className="text-[11px] font-bold text-center leading-tight px-1 z-10" style={{ color: 'var(--edu-text)' }}>
                        {a.achievement?.name}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm" style={{ color: 'var(--edu-muted)' }}>
                    Selesaikan kuis dan materi untuk mendapatkan pencapaian pertamamu!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Admin Control Center — Modern Bento Grid Version */}
            {(user?.role === 'ADMIN' || user?.role === 'TUTOR') && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <div className="flex items-center justify-between mb-5">
                   <div className="flex items-center gap-2">
                      <ShieldCheck size={20} className="text-slate-900" />
                      <h2 className="font-bold text-lg text-slate-900">Pusat Kendali</h2>
                   </div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Access</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { 
                      internallyTo: `${ADMIN_PATH}/materials`, 
                      label: 'Materi', 
                      desc: 'Edit & terbitkan modul', 
                      icon: FileText, 
                      accent: 'amber', 
                      colSpan: 'col-span-2',
                      show: true 
                    },
                    { 
                      internallyTo: `${ADMIN_PATH}/quizzes`, 
                      label: 'Kuis', 
                      desc: 'Kelola soal', 
                      icon: Brain, 
                      accent: 'purple', 
                      colSpan: 'col-span-1',
                      show: true 
                    },
                    { 
                      internallyTo: `${ADMIN_PATH}/categories`, 
                      label: 'Topik', 
                      desc: 'Atur kategori', 
                      icon: Layers, 
                      accent: 'indigo', 
                      colSpan: 'col-span-1',
                      show: true 
                    },
                    { 
                      internallyTo: `${ADMIN_PATH}/analytics`, 
                      label: 'Analitik', 
                      desc: 'Cek performa', 
                      icon: TrendingUp, 
                      accent: 'violet', 
                      colSpan: 'col-span-1',
                      show: user?.role === 'ADMIN' 
                    },
                    { 
                      internallyTo: `${ADMIN_PATH}/users`, 
                      label: 'User', 
                      desc: 'Kelola akses', 
                      icon: Users, 
                      accent: 'blue', 
                      colSpan: 'col-span-1',
                      show: user?.role === 'ADMIN' 
                    },
                    { 
                      internallyTo: `${ADMIN_PATH}/maintenance`, 
                      label: 'Sistem & Pengaduan', 
                      desc: 'Kelola pemeliharaan & saran', 
                      icon: Wrench, 
                      accent: 'orange', 
                      colSpan: 'col-span-2',
                      show: user?.role === 'ADMIN' 
                    },
                    { 
                      type: 'action',
                      label: 'Export Data Siswa', 
                      desc: 'Unduh laporan CSV', 
                      icon: Download, 
                      accent: 'emerald', 
                      colSpan: 'col-span-2',
                      show: user?.role === 'ADMIN' 
                    },
                  ].filter(i => i.show).map((item, idx) => {
                    const colors = {
                      amber: 'text-amber-600 bg-amber-50 ring-amber-100/50',
                      purple: 'text-purple-600 bg-purple-50 ring-purple-100/50',
                      indigo: 'text-indigo-600 bg-indigo-50 ring-indigo-100/50',
                      violet: 'text-violet-600 bg-violet-50 ring-violet-100/50',
                      blue: 'text-blue-600 bg-blue-50 ring-blue-100/50',
                      emerald: 'text-emerald-600 bg-emerald-50 ring-emerald-100/50',
                      orange: 'text-orange-600 bg-orange-50 ring-orange-100/50',
                    };

                    const isAction = item.type === 'action';
                    const Wrapper = isAction ? 'button' : Link;
                    const props = isAction ? {
                      onClick: async () => {
                         try {
                            const res = await api.get('/admin/export/users', { responseType: 'blob' });
                            const url = window.URL.createObjectURL(new Blob([res.data]));
                            const link = document.createElement('a'); link.href = url;
                            link.setAttribute('download', 'users.csv'); document.body.appendChild(link);
                            link.click();
                         } catch { toast.error('Gagal export data') }
                      }
                    } : { to: item.internallyTo };

                    return (
                      <Wrapper
                        key={item.label}
                        {...props}
                        className={`${item.colSpan} group relative flex flex-col p-4 bg-white border border-slate-100 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40 hover:border-slate-300 overflow-hidden text-left outline-none`}
                      >
                         {/* Subtle Glow Effect */}
                         <div className={`absolute -right-4 -top-4 w-12 h-12 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity bg-current ${colors[item.accent].split(' ')[0]}`} />
                         
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ring-1 transition-transform group-hover:scale-110 ${colors[item.accent]}`}>
                            <item.icon size={18} strokeWidth={2.2} />
                         </div>
                         
                         <div className="font-bold text-slate-800 text-xs sm:text-sm mb-0.5">{item.label}</div>
                         <div className="text-[10px] sm:text-[11px] font-medium text-slate-400 line-clamp-1">{item.desc}</div>
                         
                         <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-1">
                            <ArrowRight size={12} className="text-slate-400" />
                         </div>
                      </Wrapper>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* User Feedback Card — Premium Futuristic Version */}
            {user?.role !== 'ADMIN' && user?.role !== 'TUTOR' && (
              <div 
                className="relative rounded-[2.5rem] p-8 overflow-hidden border transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, #0b0f19 0%, #111827 100%)',
                  borderColor: 
                    feedbackCategory === 'SUGGESTION' ? 'rgba(245, 158, 11, 0.2)' :
                    feedbackCategory === 'BUG' ? 'rgba(239, 68, 68, 0.2)' :
                    'rgba(59, 130, 246, 0.2)',
                  boxShadow: 
                    feedbackCategory === 'SUGGESTION' ? '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 40px rgba(245, 158, 11, 0.05)' :
                    feedbackCategory === 'BUG' ? '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 40px rgba(239, 68, 68, 0.05)' :
                    '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 40px rgba(59, 130, 246, 0.05)'
                }}
              >
                {/* Ambient Glow Background Effect */}
                <div 
                  className={`absolute -right-24 -top-24 w-60 h-60 rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-500 ${
                    feedbackCategory === 'SUGGESTION' ? 'bg-amber-500' :
                    feedbackCategory === 'BUG' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}
                />

                <div className="relative z-10">
                  <h3 className="text-xl font-black text-white italic tracking-tight mb-2 uppercase leading-none">
                    Punya <span className={
                      feedbackCategory === 'SUGGESTION' ? 'text-amber-400' :
                      feedbackCategory === 'BUG' ? 'text-red-400' :
                      'text-blue-400'
                    }>saran atau keluhan</span>?
                  </h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider mb-6">
                    Bantu kami meningkatkan kualitas portal pembelajaran Pancasila Edu.
                  </p>

                  {/* Dynamic Interactive Tabs */}
                  <div className="flex gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => setFeedbackCategory('SUGGESTION')}
                      className={`flex-1 py-3.5 px-2 rounded-2xl border font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                        feedbackCategory === 'SUGGESTION'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                          : 'bg-white/[0.02] border-white/5 text-slate-500 hover:bg-white/[0.05] hover:text-slate-300'
                      }`}
                    >
                      <Lightbulb size={12} className={feedbackCategory === 'SUGGESTION' ? 'animate-pulse' : ''} />
                      Saran
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackCategory('BUG')}
                      className={`flex-1 py-3.5 px-2 rounded-2xl border font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                        feedbackCategory === 'BUG'
                          ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                          : 'bg-white/[0.02] border-white/5 text-slate-500 hover:bg-white/[0.05] hover:text-slate-300'
                      }`}
                    >
                      <Bug size={12} className={feedbackCategory === 'BUG' ? 'animate-bounce' : ''} />
                      Bug / Error
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackCategory('MESSAGE')}
                      className={`flex-1 py-3.5 px-2 rounded-2xl border font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                        feedbackCategory === 'MESSAGE'
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                          : 'bg-white/[0.02] border-white/5 text-slate-500 hover:bg-white/[0.05] hover:text-slate-300'
                      }`}
                    >
                      <MessageSquare size={12} />
                      Lainnya
                    </button>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder={
                        feedbackCategory === 'SUGGESTION' ? 'Tulis saran, ide kreatif, atau fitur baru yang ingin kamu kembangkan...' :
                        feedbackCategory === 'BUG' ? 'Jelaskan bug atau kendala teknis yang kamu temukan, misal kuis lemot atau gambar tidak muncul...' :
                        'Tulis pesan atau pertanyaan umum yang ingin kamu tanyakan ke Admin...'
                      }
                      className={`w-full p-4 rounded-2xl border bg-black/40 focus:bg-black/60 outline-none text-xs font-bold leading-relaxed text-white placeholder:text-slate-600 transition-all ${
                        feedbackCategory === 'SUGGESTION' ? 'border-white/5 focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.05)]' :
                        feedbackCategory === 'BUG' ? 'border-white/5 focus:border-red-400 focus:shadow-[0_0_20px_rgba(239,68,68,0.05)]' :
                        'border-white/5 focus:border-blue-400 focus:shadow-[0_0_20px_rgba(59,130,246,0.05)]'
                      }`}
                      rows={4}
                    />
                    
                    <button
                      disabled={sendingFeedback}
                      onClick={async () => {
                        if (!feedbackText.trim()) return toast.error('Pesan tidak boleh kosong');
                        setSendingFeedback(true);
                        try {
                          await api.post('/discussion/feedback', { content: feedbackText, category: feedbackCategory });
                          toast.success('Terima kasih atas saran Anda! 🎉');
                          setFeedbackText('');
                        } catch {
                          toast.error('Gagal mengirim pesan, coba lagi.');
                        } finally {
                          setSendingFeedback(false);
                        }
                      }}
                      className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group/btn text-white ${
                        feedbackCategory === 'SUGGESTION' ? 'bg-amber-600 hover:bg-amber-500 shadow-lg shadow-amber-500/20 active:scale-[0.98]' :
                        feedbackCategory === 'BUG' ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/20 active:scale-[0.98]' :
                        'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 active:scale-[0.98]'
                      }`}
                    >
                      {sendingFeedback ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Send size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      )}
                      <span>
                        {sendingFeedback ? 'Sedang Mengirim...' : 'Kirim Pesan Ke Admin'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
