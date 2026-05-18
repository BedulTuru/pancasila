import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HelpCircle, Plus, Edit, Trash2, Eye, ArrowLeft, Brain, Play, Check, X } from 'lucide-react'
import api from '../utils/api'
import toast from 'react-hot-toast'

export default function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', categoryId: '', difficulty: 'EASY', targetRange: '4-7',
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
      setForm({ title: '', description: '', categoryId: '', difficulty: 'EASY', targetRange: '4-7', timeLimit: 3600, passingScore: 70, shuffle: true, isPublished: false, questions: [] })
      fetchData()
    } catch (err) {
      const errorMsg = err.response?.data?.error || 
                       err.response?.data?.errors?.[0]?.msg || 
                       'Gagal membuat kuis';
      toast.error(errorMsg);
    }
  }

  const deleteQuiz = async (id) => {
    if (!confirm('Yakin ingin menghapus kuis ini?')) return
    try {
      await api.delete(`/quizzes/${id}`)
      toast.success('Kuis dihapus')
      fetchData()
    } catch (error) {
      toast.error('Gagal menghapus kuis')
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
    <div className="min-h-screen pt-28 pb-20" style={{ background: 'var(--edu-cream)' }}>
      {/* ━━━ PAGE HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all mb-6">
          <ArrowLeft size={18} /> Kembali ke Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-3">
               <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-purple-100 text-purple-600 shadow-sm border border-purple-200">
                  <Brain size={24} strokeWidth={2} />
               </div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kelola Kuis</h1>
            </div>
            <p className="text-slate-500 font-medium text-base max-w-xl">
               Buat dan atur evaluasi pembelajaran, soal pilihan ganda, dan ujian komprehensif.
            </p>
          </motion.div>

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-purple-700 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus size={18} strokeWidth={2.5} /> Tambah Kuis Baru
          </button>
        </div>
      </div>

      {/* ━━━ CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <div className="flex items-center gap-2 mb-6">
             <div className="text-sm font-bold text-slate-500 flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                Total Kuis: <span className="text-slate-900">{quizzes.length}</span>
             </div>
          </div>

          <div className="bg-white rounded-[2rem] border-2 border-slate-100 overflow-hidden shadow-sm min-h-[400px]">
              {loading ? (
                <div className="p-32 flex justify-center">
                  <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              ) : quizzes.length === 0 ? (
                <div className="py-24 text-center">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-slate-50 border-2 border-slate-100 text-slate-300 mb-8 overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                     <HelpCircle size={48} strokeWidth={1} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Belum Ada Kuis Evaluasi</h3>
                  <p className="text-sm font-medium text-slate-500 max-w-xs mx-auto leading-relaxed">
                     Ukur tingkat pemahaman siswa dengan membuat kuis interaktif pertama Anda sekarang.
                  </p>
                  <button 
                    onClick={() => setShowModal(true)}
                    className="mt-8 px-6 py-2.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-purple-600 transition-all active:scale-95"
                  >
                    Buat Kuis Pertama
                  </button>
                </div>
              ) : (
                <div className="divide-y-2 divide-slate-50">
                  {quizzes.map((quiz, idx) => (
                    <motion.div 
                      key={quiz.id} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                          <HelpCircle size={28} className="text-purple-500" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">{quiz.title}</div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-500 uppercase">{quiz.category?.name}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                               {quiz.targetRange === '4-7' ? 'Kelas 7' : quiz.targetRange === '8' ? 'Kelas 8' : 'Kelas 9'}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <span className="text-xs font-bold text-slate-500">{quiz._count?.questions || 0} Soal</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${quiz.isPublished ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                           <span className={`text-xs font-bold uppercase tracking-wider ${quiz.isPublished ? 'text-emerald-600' : 'text-slate-500'}`}>
                             {quiz.isPublished ? 'Aktif' : 'Draft'}
                           </span>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-white rounded-xl p-1 border-2 border-slate-100 shadow-sm">
                          <Link to={`/quiz-play/${quiz.slug}`} className="p-2 rounded-lg hover:bg-emerald-50 text-slate-500 hover:text-emerald-600 transition-all" title="Mainkan Kuis">
                            <Play size={18} />
                          </Link>
                          <button onClick={() => deleteQuiz(quiz.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all" title="Hapus Kuis">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Modal Tambah Kuis */}
          {showModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col"
              >
                {/* Header */}
                <div className="p-6 bg-white flex justify-between items-center border-b-2 border-slate-100 shrink-0">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Buat Kuis Baru</h2>
                    <p className="text-sm font-medium text-slate-500">Isi detail kuis beserta soal-soalnya.</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form id="form-quiz" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50 custom-scrollbar">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">Judul Kuis</label>
                      <input 
                        type="text" 
                        value={form.title} 
                        onChange={e => setForm({...form, title: e.target.value})} 
                        className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-xl text-slate-900 text-sm focus:border-purple-500 outline-none transition-all placeholder:text-slate-400"
                        placeholder="Contoh: Ujian Tengah Semester"
                        required 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">Kategori Topik</label>
                      <select 
                        value={form.categoryId} 
                        onChange={e => setForm({...form, categoryId: e.target.value})} 
                        className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-xl text-slate-900 text-sm focus:border-purple-500 outline-none transition-all"
                        required
                      >
                        <option value="">Pilih Kategori</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-2 block">Deskripsi Singkat</label>
                    <textarea 
                      value={form.description} 
                      onChange={e => setForm({...form, description: e.target.value})} 
                      className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-xl text-slate-900 text-sm focus:border-purple-500 outline-none transition-all placeholder:text-slate-400 min-h-[100px]"
                      placeholder="Jelaskan tujuan kuis ini..."
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">Tingkat Kesulitan</label>
                      <select 
                        value={form.difficulty} 
                        onChange={e => setForm({...form, difficulty: e.target.value})} 
                        className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-xl text-slate-900 text-sm focus:border-purple-500 outline-none transition-all"
                      >
                        <option value="EASY">Pemula (Easy)</option>
                        <option value="MEDIUM">Menengah (Medium)</option>
                        <option value="HARD">Mahir (Hard)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">Target Kelas</label>
                      <select 
                        value={form.targetRange} 
                        onChange={e => setForm({...form, targetRange: e.target.value})} 
                        className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-xl text-slate-900 text-sm focus:border-purple-500 outline-none transition-all"
                      >
                        <option value="4-7">Kelas 7</option>
                        <option value="8">Kelas 8</option>
                        <option value="9">Kelas 9</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">Batas Waktu (Menit)</label>
                      <input 
                        type="number" 
                        value={form.timeLimit / 60} 
                        onChange={e => setForm({...form, timeLimit: parseInt(e.target.value) * 60})} 
                        className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-xl text-slate-900 text-sm focus:border-purple-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 mb-2 block">Nilai Lulus (%)</label>
                      <input 
                        type="number" 
                        value={form.passingScore} 
                        onChange={e => setForm({...form, passingScore: parseInt(e.target.value)})} 
                        className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-xl text-slate-900 text-sm focus:border-purple-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={form.shuffle} 
                        onChange={e => setForm({...form, shuffle: e.target.checked})} 
                        className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                      <span className="text-sm font-bold text-slate-700">Acak Urutan Soal</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={form.isPublished} 
                        onChange={e => setForm({...form, isPublished: e.target.checked})} 
                        className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                      <span className="text-sm font-bold text-slate-700">Publikasikan Segera</span>
                    </label>
                  </div>

                  <div className="space-y-6 pt-4 border-t-2 border-slate-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">Daftar Soal</h3>
                      <button type="button" onClick={addQuestion} className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 px-4 py-2 rounded-lg">+ Tambah Soal</button>
                    </div>
                    <div className="space-y-6">
                      {form.questions.length === 0 && (
                        <div className="text-center py-10 bg-white border-2 border-slate-200 border-dashed rounded-2xl">
                          <p className="text-sm font-bold text-slate-500">Belum ada soal ditambahkan.</p>
                        </div>
                      )}
                      {form.questions.map((q, qi) => (
                        <motion.div 
                          key={qi} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm"
                        >
                          <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Soal #{qi + 1}</label>
                            <input 
                              type="text" 
                              placeholder="Masukkan pertanyaan di sini..." 
                              value={q.content} 
                              onChange={e => updateQuestion(qi, 'content', e.target.value)} 
                              className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-xl text-slate-900 text-sm focus:border-purple-500 outline-none transition-all placeholder:text-slate-400"
                              required 
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options.map((opt, oi) => (
                              <div key={oi} className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${opt.isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-slate-50 border-slate-200'}`}>
                                <input 
                                  type="radio" 
                                  name={`correct-${qi}`} 
                                  checked={opt.isCorrect} 
                                  onChange={() => {
                                    const updated = [...form.questions]
                                    updated[qi].options.forEach((o, idx) => o.isCorrect = idx === oi)
                                    setForm(f => ({ ...f, questions: updated }))
                                  }} 
                                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                                />
                                <input 
                                  type="text" 
                                  placeholder={`Pilihan ${String.fromCharCode(65+oi)}`} 
                                  value={opt.content} 
                                  onChange={e => updateOption(qi, oi, 'content', e.target.value)} 
                                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none font-medium"
                                  required 
                                />
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </form>

                <div className="p-6 bg-white flex justify-end gap-3 border-t-2 border-slate-100 shrink-0 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                  <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all text-sm">Batal</button>
                  <button type="submit" form="form-quiz" className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold text-sm shadow-sm shadow-purple-200 hover:bg-purple-700 transition-all active:scale-95">Simpan Kuis</button>
                </div>
              </motion.div>
            </div>
          )}
      </div>
    </div>
  )
}
