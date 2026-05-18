import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, ArrowRight, Eye, BookOpen, Filter, FlaskConical, Leaf, Atom, Calculator,
  Code, Globe, Library, Sigma, BarChart, Triangle, Magnet, Zap, Flame, Settings,
  Activity, TestTubes, Beaker, Hexagon, Dna, Microscope, Heart, X, ChevronRight, AlertCircle
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { formatScientific } from '../utils/scientific'
import { MaterialCardSkeleton } from '../components/SkeletonLoader'
import { Helmet } from 'react-helmet-async'

const DIFFICULTY_LABEL = { EASY: 'Pemula', MEDIUM: 'Menengah', HARD: 'Lanjutan' }
const DIFFICULTY_STYLE = {
  EASY:   { bg: '#ECFDF5', color: '#065F46', dot: '#10B981' },
  MEDIUM: { bg: '#FFFBEB', color: '#92400E', dot: '#F59E0B' },
  HARD:   { bg: '#FFF1F2', color: '#881337', dot: '#F43F5E' },
}

const COLOR_GRADIENT = {
  '#0071e3': 'linear-gradient(145deg, #1D4ED8 0%, #3B82F6 100%)',
  '#ff9500': 'linear-gradient(145deg, #C2410C 0%, #EA580C 100%)',
  '#34c759': 'linear-gradient(145deg, #065F46 0%, #059669 100%)',
  '#af52de': 'linear-gradient(145deg, #6D28D9 0%, #8B5CF6 100%)',
}

const getTopicIcon = (title = '', category = '') => {
  const t = title.toLowerCase()
  if (t.includes('integral') || t.includes('kalkulus') || t.includes('turunan')) return Sigma
  if (t.includes('statistika') || t.includes('data')) return BarChart
  if (t.includes('geometri') || t.includes('bangun')) return Triangle
  if (t.includes('magnet') || t.includes('elektromagnetik')) return Magnet
  if (t.includes('listrik') || t.includes('dinamik') || t.includes('arus')) return Zap
  if (t.includes('termodinamika') || t.includes('suhu') || t.includes('kalor')) return Flame
  if (t.includes('optik') || t.includes('cahaya')) return Eye
  if (t.includes('mekanika') || t.includes('gerak') || t.includes('kinematika')) return Settings
  if (t.includes('gelombang') || t.includes('getaran') || t.includes('bunyi')) return Activity
  if (t.includes('organik') || t.includes('karbon')) return Hexagon
  if (t.includes('stoikiometri') || t.includes('reaksi')) return TestTubes
  if (t.includes('kesetimbangan') || t.includes('asam') || t.includes('basa')) return Beaker
  if (t.includes('genetika') || t.includes('evolusi') || t.includes('dna')) return Dna
  if (t.includes('sel') || t.includes('mikro')) return Microscope
  if (t.includes('anatomi') || t.includes('manusia') || t.includes('organ')) return Heart
  if (t.includes('ekologi') || t.includes('lingkungan')) return Leaf
  if (!category) return Library
  const c = category.toLowerCase()
  if (c.includes('kimia')) return FlaskConical
  if (c.includes('biologi') || c.includes('sains')) return Leaf
  if (c.includes('fisika')) return Atom
  if (c.includes('matematika') || c.includes('aljabar')) return Calculator
  if (c.includes('komputer') || c.includes('informatika')) return Code
  if (c.includes('sosial') || c.includes('sejarah') || c.includes('geografi')) return Globe
  return Library
}

// ─── MATERIAL CARD ────────────────────────────────────────────
function MaterialCard({ m, i, featured = false }) {
  const diff = m.difficulty || 'EASY'
  const diffStyle = DIFFICULTY_STYLE[diff] || DIFFICULTY_STYLE.EASY
  const gradient = COLOR_GRADIENT[m.category?.color] || 'linear-gradient(145deg, #334155, #475569)'
  const Icon = getTopicIcon(m.title, m.category?.name)

  if (featured) {
    // Wide featured card
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.45 }}>
        <Link to={`/materials/${m.slug}`}
          className="group relative flex flex-col sm:flex-row bg-white rounded-[2rem] overflow-hidden border border-slate-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
          {/* Cover */}
          <div className="sm:w-2/5 h-52 sm:h-auto relative flex-shrink-0 flex items-end p-6" style={{ background: gradient }}>
            <div className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
            <Icon size={180} strokeWidth={0.8}
              className="absolute -right-6 -bottom-6 text-white opacity-[0.15] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" />
            <span className="relative z-10 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white bg-black/25 backdrop-blur-sm">
              {DIFFICULTY_LABEL[diff]}
            </span>
          </div>
          {/* Content */}
          <div className="flex flex-col flex-1 p-8 justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: diffStyle.dot }} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: m.category?.color || '#334155' }}>
                  {m.category?.name || 'Umum'}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3">{formatScientific(m.title)}</h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{m.description}</p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-6">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Eye size={13} /> {(m.viewCount || 0).toLocaleString()} dilihat
              </span>
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest group-hover:gap-2 flex items-center gap-1 transition-all">
                Buka Materi <ChevronRight size={13} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: Math.min(i * 0.045, 0.28), duration: 0.4 }}>
      <Link to={`/materials/${m.slug}`}
        className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] h-full">
        <div className="h-40 relative overflow-hidden flex items-end p-5" style={{ background: gradient }}>
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
          <Icon size={100} strokeWidth={0.9}
            className="absolute -right-3 -bottom-3 text-white opacity-[0.18] transition-all duration-700 group-hover:scale-125 group-hover:rotate-12" />
          <span className="relative z-10 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white bg-black/25 backdrop-blur-sm">
            {DIFFICULTY_LABEL[diff]}
          </span>
        </div>

        <div className="flex flex-col flex-1 p-6">
          <span className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: m.category?.color || '#334155' }}>
            {m.category?.name || 'Umum'}
          </span>
          <h3 className="text-base font-black text-slate-900 leading-snug mb-2">{formatScientific(m.title)}</h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">{m.description}</p>
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Eye size={11} /> {(m.viewCount || 0).toLocaleString()}</span>
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
              Buka <ChevronRight size={11} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}



export default function Portal() {
  const [selected, setSelected] = useState('')
  const [selectedRange, setSelectedRange] = useState('')
  const [search, setSearch] = useState('')

  // Categories Query
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories')
      return res.data
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  // Materials Query
  const { data: materialsRes, isLoading: initialLoading, isError: error, isFetching } = useQuery({
    queryKey: ['materials', selected, selectedRange],
    queryFn: async () => {
      const res = await api.get('/materials', { 
        params: { 
          limit: 50, 
          categoryId: selected || undefined,
          targetRange: selectedRange || undefined
        } 
      })
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const materials = materialsRes?.data || []

  const filtered = materials.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.description?.toLowerCase().includes(search.toLowerCase())
  )

  const activeCategory = categories.find(c => c.id === selected)
  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--edu-cream)' }}>

      {/* ─── HEADER — editorial, less mechanical ───────────── */}
      <div className="relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
        <div className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(220,38,38,0.07) 0%, transparent 60%)' }} />
        <BookOpen size={400} strokeWidth={0.6}
          className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: '#1E293B', opacity: 0.04 }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-36 pb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="max-w-2xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-3">
                Materi Pilihan &nbsp;·&nbsp; {materials.length} topik tersedia
              </p>
              <h1 className="font-black tracking-tight leading-none mb-5"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', color: 'var(--edu-text)', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Portal<br />
                <span style={{ color: '#DC2626' }}>Materi.</span>
              </h1>
              <p className="text-base text-slate-500 max-w-md leading-relaxed font-medium">
                Ratusan materi pilihan untuk mendalami nilai-nilai Pancasila — gratis, terstruktur, dan disusun oleh pengajar profesional.
              </p>
            </motion.div>

            {/* Search — clean, no overdesign */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="relative w-full lg:w-96">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Cari materi..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full bg-white pl-12 pr-10 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-red-200 transition-all font-semibold text-slate-800 text-sm shadow-sm" />
              {search && (
                <button onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={15} />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── BODY: sidebar + content ────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-10">
        <div className="grid lg:grid-cols-12 gap-10">

          {/* ── SIDEBAR ───────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-1">Kategori</p>

                <button onClick={() => setSelected('')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left text-sm font-bold ${
                    !selected ? 'bg-white shadow-sm text-slate-900 border border-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                  }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  Semua Materi
                </button>

                {categories.map(cat => {
                  const isActive = selected === cat.id
                  return (
                    <button key={cat.id} onClick={() => setSelected(cat.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left text-sm font-bold ${
                        isActive ? 'bg-white shadow-sm text-slate-900 border border-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                      }`}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cat.color || '#334155' }} />
                      {cat.name}
                    </button>
                  )
                })}
              </div>

              {/* Class Selection */}
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-1">Jenjang Kelas</p>
                
                <button onClick={() => setSelectedRange('')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left text-sm font-bold ${
                    !selectedRange ? 'bg-white shadow-sm text-slate-900 border border-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                  }`}>
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${!selectedRange ? 'bg-red-600' : 'bg-slate-300'}`} />
                  Semua Kelas
                </button>

                {[
                  { k: '4-7', l: 'Kelas 7' },
                  { k: '8', l: 'Kelas 8' },
                  { k: '9', l: 'Kelas 9' }
                ].map(r => (
                  <button key={r.k} onClick={() => setSelectedRange(r.k)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left text-sm font-bold ${
                      selectedRange === r.k ? 'bg-white shadow-sm text-slate-900 border border-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                    }`}>
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${selectedRange === r.k ? 'bg-red-600' : 'bg-slate-300'}`} />
                    {r.l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── CONTENT ───────────────────────────────────── */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-lg font-black text-slate-900">
                {activeCategory ? activeCategory.name : 'Terbaru untuk Kamu'}
              </h2>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {filtered.length} tersedia
              </span>
            </div>

            {initialLoading ? (
              <div className="space-y-6">
                <MaterialCardSkeleton />
                <div className="grid md:grid-cols-2 gap-5">
                  {[...Array(4)].map((_, i) => <MaterialCardSkeleton key={i} />)}
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-24">
                <AlertCircle size={40} className="mx-auto mb-4 text-red-300" />
                <h3 className="text-xl font-black text-slate-900 mb-2">Gagal Memuat</h3>
                <p className="text-slate-400 text-sm mb-6">Terjadi masalah saat mengambil data materi.</p>
                <button onClick={() => setSelected('')}
                  className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-all">
                  Coba Lagi
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <Filter size={40} className="mx-auto mb-4 text-slate-300" />
                <h3 className="text-xl font-black text-slate-900 mb-2">Tidak Ditemukan</h3>
                <p className="text-slate-400 text-sm">Belum ada materi untuk kategori ini.</p>
              </div>
            ) : (
              <motion.div key={selected + search} initial={{ opacity: 0 }} animate={{ opacity: isFetching ? 0.4 : 1 }} transition={{ duration: 0.2 }}>
                {/* Featured card */}
                {featured && (
                  <div className="mb-5">
                    <MaterialCard m={featured} i={0} featured />
                  </div>
                )}
                {/* Grid of the rest */}
                {rest.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-5">
                    {rest.map((m, i) => (
                      <MaterialCard key={m.id} m={m} i={i + 1} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
