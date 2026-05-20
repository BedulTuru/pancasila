import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Plus, Edit, Trash2, Eye, ArrowLeft, BookOpen, Check, X } from 'lucide-react'
import api from '../utils/api'
import toast from 'react-hot-toast'
import FileUpload from '../components/FileUpload'

export default function AdminMaterials() {
  const [materials, setMaterials] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', content: '', description: '', categoryId: '', difficulty: 'EASY', targetRange: '4-7', isPublished: false, type: 'ARTICLE', fileUrl: '', driveUrl: '' })
  const [editingId, setEditingId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

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
      if (editingId) {
        await api.put(`/materials/${editingId}`, form)
        toast.success('Materi berhasil diperbarui')
      } else {
        await api.post('/materials', form)
        toast.success('Materi berhasil dibuat')
      }
      setShowModal(false)
      setEditingId(null)
      setForm({ title: '', content: '', description: '', categoryId: '', difficulty: 'EASY', targetRange: '4-7', isPublished: false, type: 'ARTICLE', fileUrl: '', driveUrl: '' })
      fetchData()
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.[0]?.msg || 
                       err.response?.data?.error || 
                       (editingId ? 'Gagal memperbarui materi' : 'Gagal membuat materi');
      toast.error(errorMsg);
    }
  }

  const handleEdit = (mat) => {
    setEditingId(mat.id)
    setForm({
      title: mat.title,
      content: mat.content,
      description: mat.description || '',
      categoryId: mat.categoryId,
      difficulty: mat.difficulty,
      targetRange: mat.targetRange || '4-7',
      isPublished: mat.isPublished,
      type: mat.type || 'ARTICLE',
      fileUrl: mat.fileUrl || '',
      driveUrl: mat.driveUrl || ''
    })
    setShowModal(true)
  }

  const togglePublish = async (mat) => {
    try {
      await api.put(`/materials/${mat.id}`, {
        title: mat.title,
        content: mat.content,
        description: mat.description || '',
        coverImage: mat.coverImage || '',
        videoUrl: mat.videoUrl || '',
        driveUrl: mat.driveUrl || '',
        fileUrl: mat.fileUrl || '',
        categoryId: mat.categoryId,
        difficulty: mat.difficulty,
        type: mat.type || 'ARTICLE',
        isPublished: !mat.isPublished
      })
      toast.success('Status diperbarui')
      fetchData()
    } catch (err) {
      console.error('Failed to toggle publish status:', err)
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
    <div className="min-h-screen pt-28 pb-20" style={{ background: 'var(--edu-cream)' }}>
      {/* ━━━ PAGE HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all mb-6">
          <ArrowLeft size={18} /> Kembali ke Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-3">
               <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-100 text-blue-600 shadow-sm border border-blue-200">
                  <BookOpen size={24} strokeWidth={2} />
               </div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kelola Materi</h1>
            </div>
            <p className="text-slate-500 font-medium text-base max-w-xl">
               Kelola modul pembelajaran, artikel, dan pustaka digital untuk seluruh siswa.
            </p>
          </motion.div>

          <button
            onClick={() => {
              setEditingId(null)
              setForm({ title: '', content: '', description: '', categoryId: '', difficulty: 'EASY', targetRange: '4-7', isPublished: false, type: 'ARTICLE', fileUrl: '', driveUrl: '' })
              setShowModal(true)
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus size={18} strokeWidth={2.5} /> Tambah Materi Baru
          </button>
        </div>
      </div>

      {/* ━━━ CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <div className="flex items-center gap-2 mb-6">
             <div className="text-sm font-bold text-slate-500 flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Total Materi: <span className="text-slate-900">{materials.length}</span>
             </div>
          </div>

          <div className="bg-white rounded-[2rem] border-2 border-slate-100 overflow-hidden shadow-sm min-h-[400px]">
            {loading ? (
              <div className="p-32 flex justify-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : materials.length === 0 ? (
              <div className="py-24 text-center">
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-slate-50 border-2 border-slate-100 text-slate-300 mb-8 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                   <FileText size={48} strokeWidth={1} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Pustaka Materi Masih Kosong</h3>
                <p className="text-sm font-medium text-slate-500 max-w-xs mx-auto leading-relaxed">
                   Mulailah membangun kurikulum SMP yang unggul dengan menambahkan materi pembelajaran pertama Anda.
                </p>
                <button 
                  onClick={() => setShowModal(true)}
                  className="mt-8 px-6 py-2.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all active:scale-95"
                >
                  Buat Materi Pertama
                </button>
              </div>
            ) : (
              <div className="divide-y-2 divide-slate-50">
                {materials.map((mat, idx) => (
                  <motion.div 
                    key={mat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="group p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 bg-white transition-transform group-hover:scale-105 duration-300">
                          {mat.type === 'BOOK' ? (
                            <BookOpen size={24} className="text-blue-500" />
                          ) : (
                            <FileText size={24} className="text-slate-600" />
                          )}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${mat.isPublished ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                          {mat.isPublished && <Check size={12} strokeWidth={3} className="text-white" />}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded-md border border-slate-200 bg-white text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                             {mat.type}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                          {mat.title}
                        </h3>
                         <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">
                                 {mat.targetRange === '4-7' ? 'Kelas 7' : mat.targetRange === '8' ? 'Kelas 8' : 'Kelas 9'}
                              </span>
                           </div>
                        </div>
                      </div>

                    <div className="flex items-center gap-4 flex-shrink-0 self-end lg:self-center">
                      <div className="flex items-center bg-white rounded-xl p-1 border-2 border-slate-100 shadow-sm">
                        <Link to={`/materials/${mat.slug}`} className="p-2 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-blue-600 transition-all" title="Lihat Materi">
                          <Eye size={18} />
                        </Link>
                        <button onClick={() => handleEdit(mat)} className="p-2 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-amber-600 transition-all" title="Edit Materi">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => deleteMaterial(mat.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all" title="Hapus Materi">
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <button 
                        onClick={() => togglePublish(mat)}
                        className={`min-w-[120px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                          mat.isPublished 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' 
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {mat.isPublished ? 'Dipublikasikan' : 'Disembunyikan'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Modal Tambah/Edit */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-white rounded-3xl w-full ${previewMode ? 'max-w-5xl' : 'max-w-2xl'} max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden transition-all duration-500`}
            >
              <div className="p-6 border-b-2 border-slate-100 flex justify-between items-center bg-white z-10">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingId ? 'Edit Materi' : 'Tambah Materi Baru'}
                  </h2>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button 
                      onClick={() => setPreviewMode(false)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${!previewMode ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                      Editor
                    </button>
                    <button 
                      onClick={() => setPreviewMode(true)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${previewMode ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                      Preview
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowModal(false)
                    setEditingId(null)
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 flex overflow-hidden bg-slate-50">
                {/* Form Editor */}
                <div className={`flex-1 overflow-y-auto p-8 custom-scrollbar ${previewMode ? 'lg:max-w-md border-r-2 border-slate-100' : ''}`}>
                  <form id="form-materi" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Judul Materi</label>
                        <input
                          type="text"
                          value={form.title}
                          onChange={e => setForm({ ...form, title: e.target.value })}
                          className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-blue-500 outline-none transition-all"
                          placeholder="Contoh: Sejarah Pancasila"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
                          <select
                            value={form.categoryId}
                            onChange={e => setForm({ ...form, categoryId: e.target.value })}
                            className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-blue-500 outline-none transition-all"
                            required
                          >
                            <option value="">Pilih Kategori</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Tipe</label>
                          <select
                            value={form.type}
                            onChange={e => setForm({ ...form, type: e.target.value })}
                            className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-blue-500 outline-none transition-all"
                          >
                            <option value="ARTICLE">Artikel</option>
                            <option value="BOOK">Buku (PDF)</option>
                            <option value="VIDEO">Video</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Kesulitan</label>
                          <select
                            value={form.difficulty}
                            onChange={e => setForm({ ...form, difficulty: e.target.value })}
                            className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-blue-500 outline-none transition-all"
                          >
                            <option value="EASY">Pemula</option>
                            <option value="MEDIUM">Menengah</option>
                            <option value="HARD">Mahir</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Target Kelas</label>
                          <select
                            value={form.targetRange}
                            onChange={e => setForm({ ...form, targetRange: e.target.value })}
                            className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-blue-500 outline-none transition-all"
                          >
                            <option value="4-7">Kelas 7</option>
                            <option value="8">Kelas 8</option>
                            <option value="9">Kelas 9</option>
                          </select>
                        </div>
                      </div>

                      {form.type === 'BOOK' && (
                        <div className="space-y-5">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Unggah File PDF Buku (Maksimal 10MB)</label>
                            <FileUpload
                              value={form.fileUrl}
                              onChange={url => setForm({ ...form, fileUrl: url })}
                              placeholder="Seret & letakkan file PDF Buku di sini, atau klik untuk memilih"
                            />
                          </div>

                          <div className="relative">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Atau Tautan Google Drive (Untuk Berkas Besar &gt; 10MB / 100MB)</label>
                            <input
                              type="url"
                              value={form.driveUrl}
                              onChange={e => setForm({ ...form, driveUrl: e.target.value })}
                              className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                              placeholder="Contoh: https://drive.google.com/file/d/.../view?usp=sharing"
                            />
                            <p className="text-[10px] text-slate-400 mt-2 font-medium leading-relaxed">
                              *Unggah berkas PDF tebal (di atas 10MB atau 100MB) ke Google Drive Anda, pastikan akses berbagi diaktifkan ke <strong>"Siapa saja yang memiliki link"</strong>, lalu tempel tautannya di atas.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Ringkasan</label>
                        <input
                          type="text"
                          value={form.description}
                          onChange={e => setForm({ ...form, description: e.target.value })}
                          className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-blue-500 outline-none transition-all"
                          placeholder="Deskripsi singkat..."
                        />
                      </div>

                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">Isi Materi (Markdown)</label>
                         <textarea
                           value={form.content}
                           onChange={e => setForm({ ...form, content: e.target.value })}
                           className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-4 text-slate-900 text-sm font-mono focus:border-blue-500 outline-none transition-all h-64 custom-scrollbar"
                           placeholder="Tulis isi materi..."
                           required
                         />
                      </div>

                      <label className="flex items-center gap-4 cursor-pointer p-5 rounded-2xl bg-white border-2 border-slate-200 transition-all hover:border-blue-300 hover:bg-blue-50/50 group">
                        <input
                          type="checkbox"
                          checked={form.isPublished}
                          onChange={e => setForm({ ...form, isPublished: e.target.checked })}
                          className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900">Publikasikan Segera</p>
                          <p className="text-[10px] font-medium text-slate-500 mt-0.5">Materi akan langsung terlihat oleh siswa.</p>
                        </div>
                      </label>
                    </div>
                  </form>
                </div>

                {/* Live Preview Side */}
                {previewMode && (
                  <div className="hidden lg:block flex-1 overflow-y-auto p-12 bg-white custom-scrollbar">
                    <div className="prose prose-slate max-w-none">
                       <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4 block">Real-time Preview</span>
                       <h1 className="text-4xl font-black text-slate-900 mb-4">{form.title || 'Judul Materi...'}</h1>
                       
                       <div className="flex items-center gap-3 mb-8">
                         <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">{form.type}</span>
                         <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{form.difficulty}</span>
                       </div>

                       <p className="text-lg text-slate-500 font-medium italic mb-10 pb-10 border-b border-slate-100 leading-relaxed">
                         {form.description || 'Deskripsi materi akan muncul di sini...'}
                       </p>

                       <div className="markdown-content">
                          {form.content ? (
                            <div className="whitespace-pre-wrap font-sans text-slate-800 text-lg leading-relaxed">
                              {form.content}
                            </div>
                          ) : (
                            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
                               <p className="text-slate-300 font-bold italic text-sm tracking-widest uppercase">Menunggu konten ditulis...</p>
                            </div>
                          )}
                       </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t-2 border-slate-100 bg-white flex flex-col sm:flex-row justify-end gap-3 z-10">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all text-sm">
                  Batal
                </button>
                <button type="submit" form="form-materi" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-sm shadow-blue-200">
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
