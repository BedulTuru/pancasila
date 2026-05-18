import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, BookOpen, Brain, Trophy, 
  BookMarked, ChevronRight, ChevronDown, 
  Search, LogOut, LayoutDashboard, 
  ShieldCheck, User, Settings, ArrowLeft
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function NavLink({ to, label, dropdown, active, transparentMode }) {
  const [isOpen, setIsOpen] = useState(false);

  if (dropdown) {
    return (
      <div 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="relative"
      >
        <button
          className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-colors duration-200 z-10 flex items-center gap-1.5 ${
            active 
              ? 'text-red-600'
              : (transparentMode ? 'text-slate-600 hover:text-red-600' : 'text-slate-500 hover:text-red-600')
          }`}
        >
          {label}
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          {active && (
            <motion.div
              layoutId="nav-indicator-pill"
              className="absolute inset-0 rounded-xl shadow-sm -z-10 bg-red-50 border border-red-100/50"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 overflow-hidden"
            >
              {dropdown.map((item) => {
                const isItemActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`block px-4 py-2.5 text-sm font-black rounded-xl transition-all mb-1 last:mb-0 border ${
                      isItemActive 
                        ? 'text-red-700 bg-red-100/50 shadow-sm border-red-200/50' 
                        : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-red-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-colors duration-200 z-10 ${
        active 
          ? 'text-red-600'
          : (transparentMode ? 'text-slate-600 hover:text-red-600' : 'text-slate-500 hover:text-red-600')
      }`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="nav-indicator-pill"
          className="absolute inset-0 rounded-xl shadow-sm -z-10 bg-red-50 border border-red-100/50"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(typeof window !== 'undefined' ? window.scrollY > 20 : false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, snapBack, isImpersonating } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Sync on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => { setMenuOpen(false); setUserMenuOpen(false) }, [location])

  if (['/login', '/register'].includes(location.pathname)) return null;

  const isHeroPage = location.pathname === '/'

  const links = [
    { to: '/portal', label: 'Portal', icon: BookOpen },
    { 
      to: '/quiz/range/4-7', 
      label: 'Kuis', 
      icon: Brain,
      dropdown: [
        { to: '/quiz/range/4-7', label: 'Kelas 7' },
        { to: '/quiz/range/8', label: 'Kelas 8' },
        { to: '/quiz/range/9', label: 'Kelas 9' },
      ]
    },
    { to: '/books', label: 'Buku', icon: BookMarked },
    { to: '/leaderboard', label: 'Peringkat', icon: Trophy },
  ]

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  const transparentMode = (isHeroPage && !scrolled)

  return (
    <>
      <motion.nav 
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 28, stiffness: 150, mass: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-700 ease-in-out ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-edu-border py-2'
            : isHeroPage
              ? 'bg-transparent py-4'
              : 'bg-white/90 backdrop-blur-md shadow-sm border-b border-edu-border py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between transition-all duration-500">
            {/* Logo / Back Button (Mobile) */}
            <div className="flex items-center gap-2">
              {/* Back button only on mobile for specific routes */}
              {(location.pathname.includes('/materials/') || 
                location.pathname.includes('/quiz-play/') || 
                location.pathname.includes('/quiz/range/') ||
                location.pathname.includes('/books')) && (
                <button 
                  onClick={() => navigate(-1)}
                  className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-900 active:scale-90 transition-all mr-1"
                >
                  <ArrowLeft size={18} />
                </button>
              )}

              <Link to="/" className="flex items-center gap-1 group">
                <div className="flex items-center gap-1 sm:gap-3">
                  <img src="/itb.png" alt="ITB" className="h-6 sm:h-10 w-auto" />
                  <div className="w-px h-4 sm:h-6 bg-slate-200" />
                  <img src="/garuda.svg" alt="Garuda" className="h-6 sm:h-10 w-auto" />
                  <span className="hidden sm:block font-black text-lg sm:text-2xl tracking-tighter transition-colors text-red-600">
                    Pancasila
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  {...link}
                  active={isActive(link.to)}
                  transparentMode={transparentMode}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-4">
              <button 
                className="hidden md:flex p-2 rounded-xl transition-all bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <Search size={18} />
              </button>
              
              {user ? (
                <div className="relative hidden lg:block" ref={userMenuRef}>
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full font-bold text-sm transition-all shadow-sm bg-red-600 text-white hover:shadow-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black italic">
                      {user.name?.charAt(0)}
                    </div>
                    <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-3 z-50"
                      >
                        <div className="px-4 py-3 border-b border-slate-50 mb-2">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                           <p className="text-sm font-bold text-red-600 truncate">{user.email}</p>
                        </div>

                        {isImpersonating && (
                          <button 
                            onClick={() => { snapBack(); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
                          >
                            <ArrowLeft size={18} /> Exit Impersonation
                          </button>
                        )}

                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-2xl transition-colors">
                          <LayoutDashboard size={18} /> Dashboard
                        </Link>
                        
                        <div className="h-px bg-slate-50 my-2" />
                        
                        <button 
                          onClick={() => { logout(); navigate('/login'); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                        >
                          <LogOut size={18} /> Keluar
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-2 sm:px-8 sm:py-3 bg-red-600 text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-sm uppercase tracking-widest hover:shadow-xl transition-all whitespace-nowrap"
                >
                  Masuk
                </Link>
              )}

              {/* Mobile menu toggle */}
              <button
                className={`lg:hidden p-2 rounded-xl transition-colors ${transparentMode ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden bg-white pt-24 px-6 flex flex-col gap-3 overflow-y-auto pb-10"
          >
            {/* Combined Profile Section in Mobile Menu */}
            {user ? (
              <div className="p-5 bg-red-50 rounded-[2rem] border border-red-100 mb-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-xl italic shadow-lg shadow-red-200">
                    {user.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-black text-red-400 uppercase tracking-widest">Signed in as</p>
                    <p className="font-bold text-slate-900 truncate">{user.name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center justify-center gap-2 py-3 bg-white rounded-xl text-xs font-bold text-slate-600 border border-slate-100 shadow-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    <LayoutDashboard size={14} /> Dashboard
                  </Link>
                  <button 
                    onClick={() => { logout(); navigate('/login'); setMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 py-3 bg-white rounded-xl text-xs font-bold text-red-500 border border-slate-100 shadow-sm"
                  >
                    <LogOut size={14} /> Keluar
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-5 bg-red-600 text-white rounded-[2rem] font-black text-center uppercase tracking-widest shadow-lg shadow-red-200 mb-2"
                onClick={() => setMenuOpen(false)}
              >
                Masuk ke Akun
              </Link>
            )}

            <div className="h-px bg-slate-100 my-2 mx-4" />

            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl font-bold text-slate-900"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center gap-4">
                  <link.icon size={20} className="text-red-600" />
                  {link.label}
                </div>
                <ChevronRight size={20} className="text-slate-300" />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
