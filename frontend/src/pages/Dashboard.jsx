import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Brain, Trophy, Flame, TrendingUp, ArrowRight, Users, FileText, Award, ShieldCheck, Activity, Star, Zap, Download } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { getLevelData, getXPProgressInLevel, getXPForNextLevel } from '../utils/levelSystem'
import toast from 'react-hot-toast'

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || '/admin'

export default function Dashboard() {
  const { user } = useAuth()
  const [progress, setProgress] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [feedbackText, setFeedbackText] = useState('')
  const [sendingFeedback, setSendingFeedback] = useState(false)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [progRes, achRes] = await Promise.all([
        api.get('/progress'),
        api.get('/achievements/mine'),
      ])
      setProgress(progRes.data)
      setAchievements(achRes.data)
    } catch {
      // silently fail, show empty state
    } finally {
      setLoading(false)
    }
  }

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
      bg: '#E3EEFF',
    },
    {
      label: 'Streak Login',
      value: `${user?.loginStreak || 0} hari`,
      icon: Flame,
      accent: 'var(--edu-red)',
      bg: '#FDECEA',
    },
  ]
  const currentLevel = user?.level || 1;
  const levelData = getLevelData(currentLevel);
  const xpProgress = getXPProgressInLevel(user?.xp || 0);
  const nextLevelXP = getXPForNextLevel(currentLevel);

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: 'var(--edu-cream)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header greeting */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-600 uppercase tracking-wider">
                Status Kewargaan
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${levelData.bg} ${levelData.text} uppercase tracking-wider`}>
                {levelData.title}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight" style={{ color: 'var(--edu-text)' }}>
              Halo, {user ? <span className="text-red-600">{user.name}</span> : <div className="inline-block w-48 h-10 skeleton align-middle" />}!
            </h1>
            <p style={{ color: 'var(--edu-muted)' }} className="max-w-md font-medium">
              {levelData.subtitle} Terus asah pemahamanmu agar menjadi <span className="text-slate-900 font-bold">Warga Negara Unggul</span>.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border shadow-sm w-full md:w-80 min-w-[300px]">
             <div className="flex justify-between items-end mb-3">
                <div>
                   <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Progress Level {currentLevel}</span>
                   <span className="text-sm font-black text-slate-900">{user?.xp} <span className="text-slate-400 font-medium">/ {nextLevelXP} XP</span></span>
                </div>
                <div className="text-right">
                   <span className="text-2xl font-black text-red-600">{xpProgress}%</span>
                </div>
             </div>
             <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  className="h-full bg-gradient-to-r from-red-600 to-red-400"
                />
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
              <div key={i} className="h-32 rounded-2xl skeleton" />
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
                  { to: '/portal', label: 'Portal Materi', sub: 'Baca & pelajari', icon: BookOpen, accent: 'var(--edu-navy)', bg: '#E3EEFF' },
                  { to: '/quiz/easy', label: 'Kuis', sub: 'Uji pemahaman', icon: Brain, accent: '#7e22ce', bg: '#F3E8FF' },
                  { to: '/leaderboard', label: 'Peringkat', sub: 'Lihat ranking', icon: Trophy, accent: '#9B7210', bg: '#FEF8E7' },
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
                <div className="space-y-3">
                  {[1, 2, 3].map(i => <div key={i} className="h-14 skeleton" />)}
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

            {/* Admin Panel (conditional) */}
            {(user?.role === 'ADMIN' || user?.role === 'TUTOR') && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative border border-slate-200 mb-6"
                style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)' }}
              >
                {/* Subtle decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-100 blur-[50px] rounded-full" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <ShieldCheck size={28} className="text-slate-900" />
                    <h2 className="text-2xl font-bold text-slate-900">Pusat Kendali <span className="text-slate-500 font-medium">Administrasi</span></h2>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 mb-8 tracking-[0.2em] uppercase">Akses Keamanan Terenkripsi</p>
                  
                  <div className="grid gap-3 mt-8">
                    {[
                      { to: `/admin/export/users`, label: 'Export Data Siswa', desc: 'Unduh laporan aktivitas & skor CSV', icon: Download, accent: 'emerald', show: user?.role === 'ADMIN', isLink: false },
                      { to: `${ADMIN_PATH}/analytics`, label: 'Analitik Platform', desc: 'Pantau grafik pertumbuhan pengguna', icon: TrendingUp, accent: 'violet', show: user?.role === 'ADMIN', special: true, isLink: true },
                      { to: `${ADMIN_PATH}/users`, label: 'Kontrol Pengguna', desc: 'Blokir, beri akses, dan peran admin', icon: Users, accent: 'blue', show: user?.role === 'ADMIN', isLink: true },
                      { to: `${ADMIN_PATH}/materials`, label: 'Pusat Materi Belajar', desc: 'Edit artikel, kategori, dan modul', icon: FileText, accent: 'amber', show: true, isLink: true },
                    ].filter(i => i.show).map(item => {
                      const accentColors = {
                        emerald: 'text-emerald-600 bg-emerald-50 ring-emerald-100',
                        violet: 'text-violet-600 bg-violet-50 ring-violet-100',
                        blue: 'text-blue-600 bg-blue-50 ring-blue-100',
                        amber: 'text-amber-600 bg-amber-50 ring-amber-100',
                      };
                      
                      const Wrapper = item.isLink ? Link : 'button';
                      const linkProps = item.isLink ? { to: item.to } : {
                        onClick: async () => {
                           try {
                              const res = await api.get('/admin/export/users', { responseType: 'blob' });
                              const url = window.URL.createObjectURL(new Blob([res.data]));
                              const link = document.createElement('a'); link.href = url;
                              link.setAttribute('download', 'users.csv'); document.body.appendChild(link);
                              link.click();
                           } catch { toast.error('Gagal export data') }
                        }
                      };

                      return (
                        <Wrapper
                          key={item.label}
                          {...linkProps}
                          className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 w-full text-left outline-none focus:ring-4 focus:ring-slate-100"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ring-1 transition-transform duration-300 group-hover:scale-110 ${accentColors[item.accent]}`}>
                              <item.icon size={20} strokeWidth={2.5} />
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 text-sm mb-0.5">{item.label}</div>
                              <div className="text-[11px] font-medium text-slate-400">{item.desc}</div>
                            </div>
                          </div>
                          <div className="hidden sm:flex w-8 h-8 rounded-full border border-slate-100 items-center justify-center bg-slate-50 text-slate-300 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300 shrink-0">
                            <ArrowRight size={14} />
                          </div>
                        </Wrapper>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* User Feedback Card — Stable Version (No Framer Motion for stability) */}
            {user?.role !== 'ADMIN' && user?.role !== 'TUTOR' && (
              <div className="feedback-card">
                {/* Dekorasi - Hidden from pointer to prevent flicker */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
                  <Activity size={90} />
                </div>

                <h3 className="text-xl font-bold mb-2">Punya saran untuk kami?</h3>
                <p className="text-blue-100/60 text-sm mb-6 leading-relaxed">
                  Portal ini dibangun untukmu. Ceritakan saran atau laporkan bug agar kami bisa memperbaikinya.
                </p>

                <div className="space-y-4">
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Tulis pesanmu di sini..."
                    className="feedback-textarea"
                    rows={4}
                  />
                  <button
                    disabled={sendingFeedback}
                    onClick={async () => {
                      if (!feedbackText.trim()) return toast.error('Pesan tidak boleh kosong');
                      setSendingFeedback(true);
                      try {
                        await api.post('/feedback', { content: feedbackText, category: 'SUGGESTION' });
                        toast.success('Terima kasih atas saran Anda! 🎉');
                        setFeedbackText('');
                      } catch {
                        toast.error('Gagal mengirim pesan, coba lagi.');
                      } finally {
                        setSendingFeedback(false);
                      }
                    }}
                    className="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 btn-feedback"
                  >
                    <span className="w-5 flex justify-center flex-shrink-0 pointer-events-none text-lg">
                      {sendingFeedback ? '⏳' : '✉️'}
                    </span>
                    <span className="pointer-events-none">
                      {sendingFeedback ? 'Sedang Mengirim...' : 'Kirim Pesan Ke Admin'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
