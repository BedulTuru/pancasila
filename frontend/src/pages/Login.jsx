import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  let from = location.state?.from?.pathname || '/dashboard'
  if (from === '/login') {
    from = '/dashboard'
  }

  // Auto-redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from])

  const handle = async (e) => {
    e.preventDefault()
    setError(false)
    if (!email || !password) return toast.error('Isi email dan password terlebih dahulu')
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Berhasil masuk!')
      
      // Attempt standard navigation
      navigate(from, { replace: true })
      
      // Force fallback if still stuck after 1s
      setTimeout(() => {
        if (window.location.pathname === '/login') {
          window.location.href = from
        }
      }, 800)
    } catch (err) {
      setError(true)
      console.error('Login Error:', err)
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Email atau password salah. Cek koneksi internet.'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--edu-cream)' }}>
      {/* Background patterns - Full Screen Restored for User Preference */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(var(--edu-navy) 1px, transparent 1px), linear-gradient(90deg, var(--edu-navy) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        willChange: 'transform, opacity'
      }} />
      
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(212,160,23,0.06) 0%, transparent 65%)'
      }} />

      {/* Centered Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row">
          {/* Left Branding Panel */}
          <div 
            className="hidden lg:flex lg:w-5/12 flex-col justify-between p-16 contain-layout"
            style={{ width: '41.666667%', minWidth: '400px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10, x: 0 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ 
                transform: 'translate3d(0,0,0)', 
                willChange: 'transform, opacity',
              }}
              className="flex flex-col h-full justify-center gap-16 overflow-visible"
            >
              <div className="relative">
                <Link to="/" className="flex items-center gap-4 group w-fit">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className="p-2.5 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center gap-3"
                  >
                    <img src="/itb.png" alt="ITB Logo" className="h-10 w-auto" style={{ imageRendering: 'auto' }} />
                    <div className="w-px h-6 bg-slate-100" />
                    <img src="/garuda.svg" alt="Garuda Logo" className="h-10 w-auto" style={{ imageRendering: 'auto' }} />
                  </motion.div>
                  <div className="flex flex-col text-left">
                    <span className="font-black text-xl tracking-tight uppercase" style={{ color: 'var(--edu-navy)' }}>Pancasila</span>
                    <span className="text-xs font-bold tracking-widest opacity-60" style={{ color: 'var(--edu-red)' }}>PORTAL EDUKASI</span>
                  </div>
                </Link>
              </div>

              <div className="max-w-sm">
                <h2 
                  className="text-5xl font-black leading-[1.1] mb-8 tracking-tighter" 
                  style={{ color: 'var(--edu-navy)', fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  "Pendidikan adalah senjata <span style={{ color: 'var(--edu-red)' }}>paling kuat</span> untuk mengubah dunia."
                </h2>
                
                <div className="flex items-center gap-3 mb-10 text-navy-700/40">
                  <div className="h-px w-8 bg-current opacity-20" />
                  <span className="text-xs font-black tracking-widest uppercase">Nelson Mandela</span>
                </div>
                
                <div 
                  className="p-6 rounded-[2rem] bg-white border border-white shadow-md inline-flex items-center gap-5"
                  style={{ transform: 'translate3d(0,0,0)' }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    <GraduationCap style={{ color: 'var(--edu-navy)' }} size={24} />
                  </div>
                  <div>
                    <div className="font-black text-sm" style={{ color: 'var(--edu-navy)' }}>Gratis Selamanya</div>
                    <div className="text-[10px] font-bold opacity-50 uppercase tracking-wider">Akses penuh materi & kuis tanpa biaya</div>
                  </div>
                </div>
              </div>


            </motion.div>
          </div>

        {/* Right Form Panel */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 15, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full max-w-md py-12"
            style={{ transform: 'translate3d(0,0,0)', willChange: 'transform, opacity' }}
          >
            {/* Mobile Header Overlay (if any) */}
            <div className="lg:hidden mb-12 text-center flex flex-col items-center">
              <img src="/garuda.svg" alt="Logo" className="h-14 w-auto mb-4" />
              <h1 className="text-2xl font-black tracking-tight uppercase" style={{ color: 'var(--edu-navy)' }}>Pancasila Edu</h1>
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-black tracking-tight mb-3" style={{ color: 'var(--edu-navy)' }}>Selamat Datang</h2>
              <p className="text-lg font-medium" style={{ color: 'var(--edu-muted)' }}>Masuk untuk melanjutkan belajarmu.</p>
            </div>

            <motion.form 
              onSubmit={handle} 
              animate={error ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <AlertCircle className="text-red-600" size={18} />
                      </div>
                      <p className="text-sm font-bold text-red-700 leading-tight">
                        Email atau password salah. Silakan coba lagi.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--edu-navy)' }}>Alamat Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--edu-muted)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className={`input-edu pl-12 ${error ? 'border-red-500 bg-red-50' : ''}`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--edu-navy)' }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--edu-muted)' }} />
                  <input
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className={`input-edu pl-12 pr-12 ${error ? 'border-red-500 bg-red-50' : ''}`}
                    required
                  />
                  <button type="button" onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-red-700"
                    style={{ color: 'var(--edu-muted)' }}>
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl font-black text-white transition-all duration-200 flex items-center justify-center gap-3 hover:-translate-y-0.5"
                  style={{ background: 'var(--edu-red)', boxShadow: 'var(--shadow-red)' }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Masuk Sekarang <ArrowRight size={20} /></>
                  )}
                </button>
              </div>

              <div className="text-center pt-4">
                <p className="font-bold text-sm" style={{ color: 'var(--edu-muted)' }}>
                  Belum punya akun?{' '}
                  <Link to="/register" className="text-red-600 hover:underline underline-offset-4 decoration-2">
                    Daftar Gratis
                  </Link>
                </p>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
