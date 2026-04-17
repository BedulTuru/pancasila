import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Video, 
  FileText, 
  ArrowRight, 
  Clock, 
  Star,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matRes, catRes] = await Promise.all([
          API.get('/materials'),
          API.get('/categories')
        ]);
        // MatRes returns { data, pagination } due to my backend index.ts
        setMaterials(matRes.data.data || []);
        setCategories(catRes.data || []);
      } catch (e) {
        console.error('Data loading failed', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || 
                         m.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || m.categoryId === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'VIDEO': return <Video size={18} />;
      case 'BOOK': return <BookMarked size={18} />;
      default: return <FileText size={18} />;
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'HARD': return 'text-red-500 bg-red-50';
      case 'MEDIUM': return 'text-amber-600 bg-amber-50';
      default: return 'text-emerald-600 bg-emerald-50';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-200">
                <BookOpen size={18} />
              </div>
              <span className="text-sm font-bold text-red-600 uppercase tracking-widest">Portal Materi</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
              Pusat Pengetahuan <br /> <span className="text-navy-600">Pancasila</span>
            </h1>
            <p className="mt-4 text-slate-500 max-w-md">
              Eksplorasi ribuan materi pembelajaran mulai dari video, buku digital, hingga modul eksklusif.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
          >
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Cari materi apa saja..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-600 outline-none transition-all shadow-sm"
                style={{ borderRadius: '99px' }}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto px-2 py-5 -my-5 scrollbar-hide">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`flex-shrink-0 px-6 py-2.5 text-sm font-bold transition-all ${
                  selectedCategory === 'all' ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 ring-1 ring-slate-200'
                }`}
                style={{ borderRadius: '99px' }}
              >
                Semua
              </button>
              {categories.slice(0, 4).map(cat => {
                const isActive = selectedCategory === cat.id;
                const catColor = cat.color || '#1565C0';
                return (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 px-6 py-2.5 text-sm font-bold transition-all ${isActive ? 'shadow-md ring-1' : 'hover:scale-105 ring-1 ring-slate-200 bg-white'}`}
                    style={{ 
                      backgroundColor: isActive ? catColor : 'white', 
                      color: isActive ? '#fff' : catColor,
                      borderColor: isActive ? catColor : 'transparent',
                      borderRadius: '99px'
                    }}
                  >
                    {cat.name}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-slate-600">Menyiapkan materi untukmu...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Materi tidak ditemukan</h3>
            <p className="text-slate-500">Coba gunakan kata kunci lain atau pilih kategori yang berbeda.</p>
          </div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            key={selectedCategory + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
              {filtered.map((m, i) => (
                <div
                  key={m.id}
                  onClick={() => navigate(`/materials/${m.slug}`)}
                  className="group bg-white rounded-[2.5rem] border border-slate-100 p-6 cursor-pointer hover:shadow-2xl hover:shadow-navy-100 transition-all duration-500 hover:-translate-y-2 flex flex-col relative overflow-hidden"
                >
                  {/* Category Badge overlay */}
                  <div className="absolute top-6 right-6 z-10">
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/90 backdrop-blur shadow-sm border border-slate-100"
                      style={{ color: m.category?.color || 'var(--edu-red)' }}>
                      {m.category?.name}
                    </span>
                  </div>

                  {/* Icon & Type */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: m.category?.color ? `${m.category.color}15` : '#EF444415' }}>
                      <div style={{ color: m.category?.color || '#EF4444' }}>
                        {getTypeIcon(m.type)}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block mb-0.5">Konten Eksklusif</span>
                      <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold inline-block ${getDifficultyColor(m.difficulty)}`}>
                        {m.difficulty}
                      </div>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-8 leading-relaxed">
                    {m.description || 'Pelajari materi ini untuk memperdalam pemahamanmu tentang nilai-nilai luhur Pancasila.'}
                  </p>

                  {/* Footer Card */}
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-slate-600">Terfavorit</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock size={14} />
                        <span className="text-xs font-semibold">5m baca</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        )}

        {/* Explore more CTA */}
        {!loading && filtered.length > 0 && (
          <div className="mt-20 p-12 rounded-[3rem] bg-navy-900 text-center relative overflow-hidden">
            <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Ingin melanjutkan belajar lagi?</h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">Kami terus menambahkan materi baru setiap minggunya untuk membantumu jadi siswa terbaik.</p>
              <button 
                onClick={() => navigate('/quizzes')}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all hover:-translate-y-1 shadow-xl shadow-red-900/20 flex items-center gap-3 mx-auto"
              >
                Coba Kuis Interaktif <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
