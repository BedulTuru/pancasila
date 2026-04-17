import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HelpCircle, Plus, Edit, Trash2, Eye, ArrowLeft, Brain, Play } from 'lucide-react'
import api from '../utils/api'
import toast from 'react-hot-toast'

export default function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', categoryId: '', difficulty: 'EASY',
    timeLimit: 3600, passingScore: 70, shuffle: true, isPublished: false, questions: []
  })

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [quizRes, catRes] = await Promise.all([
        api.get('/quizzes', { params: { limit: 100 } }),
        api.get('/categories'),
      ])
      setQuizzes(quizRes.data.data)
      setCategories(catRes.data)
    } catch (error) {
      toast.error('Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/quizzes', form)
      toast.success('Kuis berhasil dibuat')
      setShowModal(false)
      setForm({ title: '', description: '', categoryId: '', difficulty: 'EASY', timeLimit: 3600, passingScore: 70, shuffle: true, isPublished: false, questions: [] })
      fetchData()
    } catch (error) {
      toast.error('Gagal membuat kuis')
    }
  }

  const deleteQuiz = async (id) => {
    if (!confirm('Yakin ingin menghapus?')) return
    try {
      await api.delete(`/quizzes/${id}`)
      toast.success('Kuis dihapus')
      fetchData()
    } catch (error) {
      toast.error('Gagal menghapus')
    }
  }

  const addQuestion = () => {
    setForm(f => ({
      ...f,
      questions: [...f.questions, { content: '', hint: '', explanation: '', points: 1, options: [
        { content: '', isCorrect: false }, { content: '', isCorrect: false },
        { content: '', isCorrect: false }, { content: '', isCorrect: false }
      ]}]
    }))
  }

  const updateQuestion = (idx, field, value) => {
    const updated = [...form.questions]
    updated[idx][field] = value
    setForm(f => ({ ...f, questions: updated }))
  }

  const updateOption = (qIdx, oIdx, field, value) => {
    const updated = [...form.questions]
    updated[qIdx].options[oIdx][field] = value
    setForm(f => ({ ...f, questions: updated }))
  }

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
        {/* Amber glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 75% 60%, rgba(245,158,11,0.06) 0%, transparent 55%)',
        }} />

        {/* Decorative icon */}
        <Brain
          size={260}
          strokeWidth={1}
          className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.04] rotate-[5deg]"
          style={{ color: 'var(--edu-navy)' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 transition-colors hover:text-black relative z-20"
            style={{ color: 'var(--edu-muted)' }}>
            <ArrowLeft size={16} /> Kembali ke Dashboard
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Amber accent line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 rounded-full bg-amber-500" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">
                Assessment System
              </p>
            </div>
            <h1 
              className="text-4xl md:text-5xl font-black mb-3"
              style={{ color: 'var(--edu-text)', fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: 1.08 }}
            >
              Manajemen Kuis
            </h1>
            <p className="text-base font-medium max-w-lg" style={{ color: 'var(--edu-muted)' }}>
              Kelola ujian dan bank soal portal. Konfigurasi waktu, ketuntasan, dan acak soal.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ━━━ CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-slate-100">
                 <Brain size={18} className="text-amber-500" />
               </div>
               <div>
                 <h2 className="text-lg font-bold" style={{ color: 'var(--edu-text)' }}>Koleksi Kuis</h2>
                 <p className="text-xs font-medium" style={{ color: 'var(--edu-muted)' }}>{quizzes.length} arsip tersedia</p>
               </div>
             </div>
             
             <button
               onClick={() => setShowModal(true)}
               className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-amber-600 bg-amber-50 hover:bg-amber-500 hover:text-white transition-all text-sm font-bold shadow-sm"
             >
               <Plus size={18} /> <span className="hidden sm:inline">Tambah Baru</span>
             </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">

              {loading ? (
                <div className="p-8 text-center">
                  <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {quizzes.map(quiz => (
                    <div key={quiz.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                          <HelpCircle size={24} className="text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{quiz.title}</div>
                          <div className="text-sm text-slate-500">{quiz.category?.name} · {quiz._count?.questions || 0} soal</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          quiz.isPublished 
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {quiz.isPublished ? 'Published' : 'Draft'}
                        </span>
                        <Link to={`/quiz-play/${quiz.slug}`} className="p-2 rounded-xl hover:bg-emerald-50 transition-colors text-emerald-500">
                          <Play size={18} />
                        </Link>
                        <button onClick={() => deleteQuiz(quiz.id)} className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {showModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-6">Tambah Kuis Baru</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Judul</label>
                      <input 
                        type="text" 
                        value={form.title} 
                        onChange={e => setForm({...form, title: e.target.value})} 
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori</label>
                      <select 
                        value={form.categoryId} 
                        onChange={e => setForm({...form, categoryId: e.target.value})} 
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                        required
                      >
                        <option value="">Pilih</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi</label>
                    <input 
                      type="text" 
                      value={form.description} 
                      onChange={e => setForm({...form, description: e.target.value})} 
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tingkat</label>
                      <select 
                        value={form.difficulty} 
                        onChange={e => setForm({...form, difficulty: e.target.value})} 
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                      >
                        <option value="EASY">Mudah</option>
                        <option value="MEDIUM">Sedang</option>
                        <option value="HARD">Sulit</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Waktu (menit)</label>
                      <input 
                        type="number" 
                        value={form.timeLimit / 60} 
                        onChange={e => setForm({...form, timeLimit: parseInt(e.target.value) * 60})} 
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Lulus (%)</label>
                      <input 
                        type="number" 
                        value={form.passingScore} 
                        onChange={e => setForm({...form, passingScore: parseInt(e.target.value)})} 
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={form.shuffle} 
                        onChange={e => setForm({...form, shuffle: e.target.checked})} 
                        className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm font-semibold text-slate-700">Acak soal</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={form.isPublished} 
                        onChange={e => setForm({...form, isPublished: e.target.checked})} 
                        className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm font-semibold text-slate-700">Publish</span>
                    </label>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-slate-700">Soal</label>
                      <button type="button" onClick={addQuestion} className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">+ Tambah Soal</button>
                    </div>
                    {form.questions.map((q, qi) => (
                      <div key={qi} className="border-2 border-slate-200 rounded-xl p-4 mb-3 bg-slate-50">
                        <input 
                          type="text" 
                          placeholder={`Soal ${qi + 1}`} 
                          value={q.content} 
                          onChange={e => updateQuestion(qi, 'content', e.target.value)} 
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 mb-2"
                          required 
                        />
                        <input 
                          type="text" 
                          placeholder="Hint (opsional)" 
                          value={q.hint} 
                          onChange={e => updateQuestion(qi, 'hint', e.target.value)} 
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 mb-2"
                        />
                        <div className="space-y-2">
                          {q.options.map((opt, oi) => (
                            <div key={oi} className="flex items-center gap-2">
                              <input 
                                type="radio" 
                                name={`correct-${qi}`} 
                                checked={opt.isCorrect} 
                                onChange={() => {
                                  const updated = [...form.questions]
                                  updated[qi].options.forEach((o, idx) => o.isCorrect = idx === oi)
                                  setForm(f => ({ ...f, questions: updated }))
                                }} 
                                className="w-4 h-4"
                              />
                              <input 
                                type="text" 
                                placeholder={`Opsi ${String.fromCharCode(65+oi)}`} 
                                value={opt.content} 
                                onChange={e => updateOption(qi, oi, 'content', e.target.value)} 
                                className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-800 placeholder-slate-400"
                                required 
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-colors">Batal</button>
                    <button type="submit" className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 shadow-lg shadow-purple-500/30 transition-all">Simpan</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
      </div>
    </div>
  )
}
