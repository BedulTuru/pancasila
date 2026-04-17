import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, BookOpen, Brain, Trophy, BookMarked, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  if (['/login', '/register'].includes(location.pathname)) return null;

  const isHeroPage = location.pathname === '/'

  const links = [
    { to: '/portal', label: 'Portal', icon: BookOpen },
    { to: '/quiz/easy', label: 'Kuis', icon: Brain },
    { to: '/books', label: 'Buku', icon: BookMarked },
    { to: '/leaderboard', label: 'Peringkat', icon: Trophy },
  ]

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  const transparentMode = isHeroPage && !scrolled
  const navTextClass = transparentMode ? 'text-edu-navy' : 'text-edu-text'
  const navTextColor = transparentMode ? 'var(--edu-navy)' : 'var(--edu-text)'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : isHeroPage
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md shadow-sm'
        }`}
        style={scrolled || !isHeroPage ? { borderBottom: '1px solid var(--edu-border)' } : {}}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3.5 group" aria-label="Kembali ke beranda">
              <img
                src="/garuda.svg"
                alt="Logo Garuda Pancasila"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
              />
              <div className="hidden sm:flex flex-col justify-center">
                <span 
                  className={`font-black text-[17px] leading-none tracking-tight transition-colors duration-300 ${transparentMode ? 'text-slate-800' : 'text-slate-900'}`}
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  Portal Edukasi
                </span>
                <span 
                  className={`text-[10px] font-extrabold tracking-[0.25em] uppercase mt-1.5 transition-colors duration-300 ${transparentMode ? 'text-slate-500' : 'text-red-600'}`}
                >
                  Pancasila
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 p-1 bg-white/50 border border-slate-200/50 rounded-2xl backdrop-blur-md">
              {links.map(({ to, label }) => {
                const active = isActive(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-colors duration-200 z-10 ${
                      active 
                        ? 'text-slate-900' 
                        : transparentMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator-pill"
                        className="absolute inset-0 rounded-xl bg-slate-100 shadow-sm border border-slate-200/50 -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      transparentMode
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-black/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {user.name}
                  </Link>
                  <button
                    onClick={logout}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      transparentMode
                        ? 'text-slate-500 hover:text-slate-800'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-4 py-2 text-sm font-bold transition-all ${
                      transparentMode
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px"
                    style={{ background: 'var(--edu-red)', boxShadow: 'var(--shadow-red)' }}
                  >
                    Daftar Gratis
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg transition-colors"
                style={{ color: navTextColor }}
                aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-16"
            style={{ background: 'var(--edu-cream)' }}
          >
            <div className="max-w-6xl mx-auto px-5 py-6">
              {/* Mobile nav links */}
              <div className="space-y-1 mb-6">
                {links.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all ${isActive(to) ? 'text-white' : 'hover:bg-white'
                      }`}
                    style={isActive(to) ? { background: 'var(--edu-red)' } : { color: 'var(--edu-text)' }}
                  >
                    <span className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive(to) ? 'bg-white/20' : ''
                        }`}
                        style={!isActive(to) ? { background: 'var(--edu-cream-dark)' } : {}}
                      >
                        <Icon size={20} className={isActive(to) ? 'text-white' : ''}
                          style={!isActive(to) ? { color: 'var(--edu-red)' } : {}}
                        />
                      </div>
                      <span className="text-base font-semibold">{label}</span>
                    </span>
                    <ChevronRight size={18} className={isActive(to) ? 'text-white/70' : 'text-gray-300'} />
                  </Link>
                ))}
              </div>

              {/* Mobile auth */}
              <div className="pt-5 border-t" style={{ borderColor: 'var(--edu-border)' }}>
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      className="block p-4 rounded-2xl text-center font-semibold text-white"
                      style={{ background: 'var(--edu-navy)' }}
                    >
                      Dashboard — {user.name}
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full p-4 text-left rounded-2xl font-medium border-2 transition-colors hover:bg-red-50"
                      style={{ color: 'var(--edu-red)', borderColor: '#F4C0BB' }}
                    >
                      Keluar
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      className="block p-4 text-center rounded-2xl font-semibold border-2 transition-colors hover:bg-white"
                      style={{ borderColor: 'var(--edu-border)', color: 'var(--edu-text)' }}
                    >
                      Masuk
                    </Link>
                    <Link
                      to="/register"
                      className="block p-4 text-center rounded-2xl font-semibold text-white"
                      style={{ background: 'var(--edu-red)' }}
                    >
                      Daftar Gratis
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
