import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Plus, Edit, Trash2, Eye, ArrowLeft, BookOpen, PenTool } from 'lucide-react'
import api from '../utils/api'
import toast from 'react-hot-toast'

export default function AdminMaterials() {
  const [materials, setMaterials] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', content: '', description: '', categoryId: '', difficulty: 'EASY', isPublished: false })

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [matRes, catRes] = await Promise.all([
        api.get('/materials', { params: { limit: 100 } }),
        api.get('/categories'),
      ])
      setMaterials(matRes.data.data || [])
      setCategories(catRes.data || [])
    } catch {
      toast.error('Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/materials', form)
      toast.success('Materi berhasil dibuat')
      setShowModal(false)
      setForm({ title: '', content: '', description: '', categoryId: '', difficulty: 'EASY', isPublished: false })
      fetchData()
    } catch {
      toast.error('Gagal membuat materi')
    }
  }

  const togglePublish = async (id, current) => {
    try {
      await api.put(`/materials/${id}`, { isPublished: !current })
      toast.success('Status diperbarui')
      fetchData()
    } catch {
      toast.error('Gagal memperbarui status')
    }
  }

  const deleteMaterial = async (id) => {
    if (!confirm('Yakin ingin menghapus materi ini secara permanen?')) return
    try {
      await api.delete(`/materials/${id}`)
      toast.success('Materi dihapus')
      fetchData()
    } catch {
      toast.error('Gagal menghapus')
    }
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
        {/* Navy glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 75% 60%, rgba(26,54,93,0.06) 0%, transparent 55%)',
        }} />

        {/* Decorative icon */}
        <BookOpen
          size={260}
          strokeWidth={1}
          className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.04] rotate-[-5deg]"
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
            {/* Navy accent line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 rounded-full" style={{ background: 'var(--edu-navy)' }} />
              <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--edu-navy)' }}>
                Knowledge Base
              </p>
            </div>
            <h1 
              className="text-4xl md:text-5xl font-black mb-3"
              style={{ color: 'var(--edu-text)', fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: 1.08 }}
            >
              Manajemen Materi
            </h1>
            <p className="text-base font-medium max-w-lg" style={{ color: 'var(--edu-muted)' }}>
              Kelola pusat pustaka dan kurikulum portal. Tambah atau sunting materi dengan cepat.
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
                 <PenTool size={18} style={{ color: 'var(--edu-navy)' }} />
               </div>
               <div>
                 <h2 className="text-lg font-bold" style={{ color: 'var(--edu-text)' }}>Koleksi Materi</h2>
                 <p className="text-xs font-medium" style={{ color: 'var(--edu-muted)' }}>{materials.length} arsip tersedia</p>
               </div>
             </div>
             
             <button
               onClick={() => setShowModal(true)}
               className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white transition-all hover:-translate-y-px text-sm font-bold shadow-md"
               style={{ background: 'var(--edu-navy)', boxShadow: 'var(--shadow-navy)' }}
             >
               <Plus size={18} /> <span className="hidden sm:inline">Tambah Baru</span>
             </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            {/* List */}
            {loading ? (
              <div className="p-16 flex justify-center">
                <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--edu-navy)', borderTopColor: 'transparent' }} />
              </div>
            ) : materials.length === 0 ? (
              <div className="p-12 text-center text-gray-400">Belum ada materi.</div>
            ) : (
              <div className="divide-y" style={{ borderColor: 'var(--edu-border)' }}>
                {materials.map(mat => (
                  <div key={mat.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex flex-shrink-0 items-center justify-center mt-1"
                        style={{ background: '#E3EEFF' }}>
                        <FileText size={20} style={{ color: 'var(--edu-navy)' }} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-base truncate mb-1" style={{ color: 'var(--edu-text)' }}>{mat.title}</div>
                        <div className="flex items-center flex-wrap gap-2 text-xs font-semibold" style={{ color: 'var(--edu-muted)' }}>
                          <span className="px-2 py-0.5 rounded-md" style={{ background: 'var(--edu-cream)' }}>{mat.category?.name || 'Umum'}</span>
                          <span>•</span>
                          <span>{mat.difficulty}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <button 
                        onClick={() => togglePublish(mat.id, mat.isPublished)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          mat.isPublished 
                            ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' 
                            : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {mat.isPublished ? 'Live' : 'Draft'}
                      </button>
                      <div className="h-6 w-px bg-gray-200 mx-1" />
                      <Link to={`/materials/${mat.slug}`} className="p-2 inline-block rounded-xl hover:bg-gray-200 transition-colors" title="Lihat">
                        <Eye size={18} style={{ color: 'var(--edu-muted)' }} />
                      </Link>
                      <button className="p-2 rounded-xl hover:bg-gray-200 transition-colors" title="Edit">
                        <Edit size={18} style={{ color: 'var(--edu-muted)' }} />
                      </button>
                      <button onClick={() => deleteMaterial(mat.id)} className="p-2 rounded-xl hover:bg-red-50 transition-colors" title="Hapus">
                        <Trash2 size={18} style={{ color: 'var(--edu-red)' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Modal Tambah */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: 'var(--edu-border)' }}>
                <h2 className="text-xl font-bold" style={{ color: 'var(--edu-text)' }}>Tambah Materi Baru</h2>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form id="form-materi" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--edu-text)' }}>Judul Materi</label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        className="input-edu"
                        placeholder="Contoh: Aljabar Linear Dasar"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--edu-text)' }}>Kategori</label>
                      <select
                        value={form.categoryId}
                        onChange={e => setForm({ ...form, categoryId: e.target.value })}
                        className="input-edu"
                        required
                      >
                        <option value="">Pilih Kategori</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--edu-text)' }}>Tingkat Kesulitan</label>
                      <select
                        value={form.difficulty}
                        onChange={e => setForm({ ...form, difficulty: e.target.value })}
                        className="input-edu"
                      >
                        <option value="EASY">Mudah (Pemula)</option>
                        <option value="MEDIUM">Sedang (Menengah)</option>
                        <option value="HARD">Sulit (Lanjutan)</option>
                      </select>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--edu-text)' }}>Deskripsi Singkat</label>
                      <input
                        type="text"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        className="input-edu"
                        placeholder="Ringkasan singkat tentang materi ini..."
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--edu-text)' }}>Konten (Markdown)</label>
                      <textarea
                        value={form.content}
                        onChange={e => setForm({ ...form, content: e.target.value })}
                        className="input-edu h-64 font-mono text-sm"
                        placeholder="# Judul Utama&#10;&#10;Tuliskan isi materi disini menggunakan format Markdown..."
                        required
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center pt-2">
                      <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border-2 transition-colors hover:bg-gray-50 w-full" style={{ borderColor: 'var(--edu-border)' }}>
                        <input
                          type="checkbox"
                          checked={form.isPublished}
                          onChange={e => setForm({ ...form, isPublished: e.target.checked })}
                          className="w-5 h-5 rounded"
                        />
                        <div>
                          <p className="font-bold text-sm" style={{ color: 'var(--edu-text)' }}>Langsung Publikasikan?</p>
                          <p className="text-xs" style={{ color: 'var(--edu-muted)' }}>Materi akan langsung bisa dilihat oleh pelajar</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t flex flex-col-reverse sm:flex-row justify-end gap-3" style={{ borderColor: 'var(--edu-border)' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline">
                  Batal
                </button>
                <button type="submit" form="form-materi" className="btn-navy">
                  Simpan Materi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
