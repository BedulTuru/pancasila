import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Plus, Edit, Trash2, ArrowLeft, X, Palette, Tag, Hash } from 'lucide-react'
import api from '../utils/api'
import toast from 'react-hot-toast'

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#64748b'
]

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ name: '', slug: '', icon: 'Layers', color: '#3b82f6', order: 0 })

  useEffect(() => { fetchCategories() }, [])

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories')
      setCategories(res.data || [])
    } catch {
      toast.error('Gagal memuat kategori')
    } finally {
      setLoading(false)
    }
  }

  const handleNameChange = (name) => {
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setForm(prev => ({ ...prev, name, slug }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, form)
        toast.success('Kategori diperbarui')
      } else {
        await api.post('/categories', form)
        toast.success('Kategori dibuat')
      }
      setShowModal(false)
      setEditingId(null)
      setForm({ name: '', slug: '', icon: 'Layers', color: '#3b82f6', order: 0 })
      fetchCategories()
    } catch (err) {
      const errorMsg = err.response?.data?.error || 
                       err.response?.data?.errors?.[0]?.msg || 
                       'Gagal menyimpan kategori';
      toast.error(errorMsg);
    }
  }

  const handleEdit = (cat) => {
    setEditingId(cat.id)
    setForm({
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon || 'Layers',
      color: cat.color || '#3b82f6',
      order: cat.order || 0
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus kategori ini?')) return
    try {
      await api.delete(`/categories/${id}`)
      toast.success('Kategori dihapus')
      fetchCategories()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Gagal menghapus kategori')
    }
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
               <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-100 text-indigo-600 shadow-sm border border-indigo-200">
                  <Layers size={24} strokeWidth={2} />
               </div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kelola Topik</h1>
            </div>
            <p className="text-slate-500 font-medium text-base max-w-xl">
               Kelola kategori dan topik pembelajaran untuk mengelompokkan materi dan kuis.
            </p>
          </motion.div>

          <button
            onClick={() => {
              setEditingId(null)
              setForm({ name: '', slug: '', icon: 'Layers', color: '#3b82f6', order: 0 })
              setShowModal(true)
            }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus size={18} strokeWidth={2.5} /> Tambah Topik
          </button>
        </div>
      </div>

      {/* ━━━ CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {loading ? (
          <div className="p-20 flex justify-center">
             <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white rounded-[2rem] border-2 border-slate-100 p-32 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-50 border-2 border-slate-100 text-slate-400 mb-6">
              <Layers size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Belum ada topik</h3>
            <p className="text-sm font-medium text-slate-500">Silakan tambahkan topik baru untuk mengelompokkan konten.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white rounded-[2rem] p-8 border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Dekorasi tipis */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] -mr-8 -mt-8 rotate-12 transition-transform group-hover:rotate-0" style={{ color: cat.color }}>
                    <Layers size={150} />
                  </div>

                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 duration-300"
                      style={{ backgroundColor: cat.color }}>
                      <Layers size={24} />
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleEdit(cat)} className="p-2.5 rounded-xl bg-slate-50 border-2 border-slate-100 text-slate-500 hover:text-indigo-600 transition-all">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="p-2.5 rounded-xl bg-slate-50 border-2 border-slate-100 text-slate-500 hover:text-red-600 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">{cat.name}</h3>
                    <div className="text-xs font-bold text-slate-400 mb-6">Slug: {cat.slug}</div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{cat._count?.materials || 0}</span>
                        <span className="text-xs font-medium text-slate-500">Materi</span>
                      </div>
                      <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{cat._count?.quizzes || 0}</span>
                        <span className="text-xs font-medium text-slate-500">Kuis</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ━━━ MODAL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-slate-100 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative"
            >
              <div className="p-6 flex justify-between items-center border-b-2 border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingId ? 'Edit Topik' : 'Topik Baru'}
                  </h2>
                  <p className="text-sm font-medium text-slate-500">Isi informasi topik pembelajaran.</p>
                </div>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-slate-50">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Tag size={16} className="text-indigo-500" /> Nama Topik
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => handleNameChange(e.target.value)}
                    placeholder="Contoh: Sejarah"
                    className="w-full bg-white border-2 border-slate-200 px-4 py-3 rounded-xl text-slate-900 text-sm focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Hash size={16} className="text-indigo-500" /> Slug URL
                  </label>
                  <input
                    required
                    type="text"
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value })}
                    className="w-full bg-slate-100 border-2 border-slate-200 px-4 py-3 rounded-xl text-slate-600 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <Palette size={16} className="text-indigo-500" /> Warna Penanda
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {PRESET_COLORS.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setForm({ ...form, color })}
                        className={`w-8 h-8 rounded-full transition-all border-2 ${form.color === color ? 'border-slate-400 scale-110 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-700 transition-all active:scale-95"
                  >
                    Simpan Topik
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
