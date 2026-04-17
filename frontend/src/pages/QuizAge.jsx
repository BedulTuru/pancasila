import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Clock, Brain, AlertCircle, Zap, FileText, Search, X } from 'lucide-react'
import api from '../utils/api'
import toast from 'react-hot-toast'

const LEVEL_CONFIG = {
  easy:   { title: 'Pemula',   age: 'SD & SMP',     accent: '#10B981', light: '#ECFDF5', border: '#A7F3D0', muted: '#065F46' },
  medium: { title: 'Menengah', age: 'SMP & SMA',     accent: '#F59E0B', light: '#FFFBEB', border: '#FDE68A', muted: '#92400E' },
  hard:   { title: 'Lanjutan', age: 'SMA & PTN',     accent: '#EF4444', light: '#FFF1F2', border: '#FECACA', muted: '#881337' },
}

export default function QuizAge() {
  const { difficulty } = useParams()
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const config = LEVEL_CONFIG[difficulty] || LEVEL_CONFIG.easy

  useEffect(() => {
    setLoading(true)
    api.get('/quizzes', { params: { difficulty: difficulty.toUpperCase(), limit: 50 } })
      .then(r => setQuizzes(r.data.data || []))
      .catch(() => toast.error('Gagal memuat kuis'))
      .finally(() => setLoading(false))
  }, [difficulty])

  const filteredQuizzes = quizzes.filter(q =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--edu-cream)' }}>

      {/* ─── HEADER ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
        {/* Organic blobs — not a mechanical grid */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top right, ${config.accent}18 0%, transparent 60%)` }} />
        <Brain size={380} strokeWidth={0.7}
          className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: config.accent, opacity: 0.07 }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-36 pb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: config.accent }}>
                ✦ Uji Pemahaman &nbsp;·&nbsp; {config.age}
              </p>
              <h1 className="font-black tracking-tight leading-none mb-5"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', color: 'var(--edu-text)', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Kuis<br />
                <span style={{ color: config.accent }}>{config.title}.</span>
              </h1>
              <p className="text-base text-slate-500 max-w-md leading-relaxed font-medium">
                {difficulty === 'easy' && 'Mulai perjalananmu. Kuis-kuis ini dirancang untuk membangun fondasi yang kuat.'}
                {difficulty === 'medium' && 'Uji pemahamanmu yang lebih dalam. Setiap kuis mendekatkanmu ke puncak peringkat.'}
                {difficulty === 'hard' && 'Tantangan untuk yang serius. Kuasai topik-topik kompleks dan raih posisi teratas.'}
              </p>
            </motion.div>

            {/* Search */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="relative w-full lg:w-80">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Cari kuis..."
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white pl-11 pr-9 py-3.5 rounded-2xl border border-slate-200 outline-none focus:ring-2 transition-all font-semibold text-slate-800 text-sm shadow-sm"
                style={{ focusRingColor: config.accent }} />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── BODY ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-12 gap-10">

          {/* ── SIDEBAR ────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-1">Tingkat</p>

              {Object.entries(LEVEL_CONFIG).map(([k, v]) => {
                const isActive = k === difficulty
                return (
                  <Link key={k} to={`/quiz/${k}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-bold ${
                      isActive
                        ? 'bg-white shadow-sm text-slate-900 border border-slate-100'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                    }`}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: v.accent }} />
                    <div>
                      <span className="block">{v.title}</span>
                      <span className="text-[10px] font-normal text-slate-400">{v.age}</span>
                    </div>
                  </Link>
                )
              })}

            </div>
          </div>

          {/* ── QUIZ LIST ──────────────────────────────────── */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-lg font-black text-slate-900">
                Kuis {config.title}
              </h2>
              <span className="text-xs font-bold text-slate-400">{filteredQuizzes.length} kuis tersedia</span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => <div key={i} className="h-32 skeleton rounded-3xl" />)}
              </div>
            ) : filteredQuizzes.length === 0 ? (
              <div className="text-center py-24">
                <AlertCircle size={40} className="mx-auto mb-4 text-slate-300" />
                <h3 className="text-xl font-black text-slate-900 mb-2">Kuis Kosong</h3>
                <p className="text-slate-400 text-sm">
                  {searchTerm ? 'Tidak ada kuis yang cocok dengan pencarianmu.' : 'Belum ada kuis untuk tingkat ini.'}
                </p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="space-y-4">
                  {filteredQuizzes.map((q, i) => (
                    <motion.div key={q.id}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ delay: Math.min(i * 0.05, 0.4) }}
                      className="group bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">

                      {/* Left accent stripe with the difficulty color */}
                      <div className="flex">
                        <div className="w-1 shrink-0" style={{ background: config.accent }} />

                        <div className="flex-1 px-7 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                          <div className="flex-1 min-w-0">
                            {/* Category + XP badge */}
                            <div className="flex items-center gap-2 mb-2.5">
                              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-600">
                                {q.category?.name || 'Umum'}
                              </span>
                              <span className="flex items-center gap-1 text-[9px] font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                                <Zap size={9} fill="currentColor" /> +100 XP
                              </span>
                            </div>

                            <h3 className="text-xl font-black text-slate-900 mb-1.5 leading-tight">{q.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">{q.description}</p>

                            {/* Meta */}
                            <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400">
                              <span className="flex items-center gap-1.5">
                                <FileText size={12} /> {q._count?.questions || 0} Soal
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock size={12} /> {Math.floor((q.timeLimit || 3600) / 60)} Menit
                              </span>
                            </div>
                          </div>

                          {/* CTA */}
                          <Link to={`/quiz-play/${q.slug}`}
                            className="shrink-0 flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-sm text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
                            style={{ background: config.accent, boxShadow: `0 8px 20px -6px ${config.accent}55` }}>
                            Mulai
                            <Play size={15} className="fill-current" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
