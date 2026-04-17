import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const handle = async (e) => {
    e.preventDefault()
    if (!email || !password) return toast.error('Isi email dan password terlebih dahulu')
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Berhasil masuk!')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.error || 'Email atau password salah')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--edu-cream)' }}>
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1A1A2E 0%, #0D2060 60%, #7B1010 100%)' }}>
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #C0392B, transparent)' }} />
          <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #D4A017, transparent)' }} />
        </div>

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/garuda.svg" alt="Logo" className="h-10 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-white text-sm">Portal Edukasi</span>
              <span className="text-xs" style={{ color: 'var(--edu-gold)' }}>Pancasila</span>
            </div>
          </Link>
        </div>

        <div className="relative z-10">
          <blockquote className="mb-8">
            <p className="text-2xl font-bold leading-relaxed text-white mb-4">
              "Pendidikan adalah senjata paling kuat yang dapat kamu gunakan untuk mengubah dunia."
            </p>
            <footer className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>— Nelson Mandela</footer>
          </blockquote>
          <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: 'rgba(212,160,23,0.2)' }}>🎓</div>
            <div>
              <p className="text-sm font-semibold text-white">Gratis Selamanya</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Akses penuh tanpa biaya berlangganan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-3 mb-10 lg:hidden">
            <img src="/garuda.svg" alt="Logo" className="h-9 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm" style={{ color: 'var(--edu-text)' }}>Portal Edukasi</span>
              <span className="text-xs font-medium" style={{ color: 'var(--edu-red)' }}>Pancasila</span>
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--edu-text)' }}>Selamat datang kembali</h1>
            <p style={{ color: 'var(--edu-muted)' }}>Masuk untuk melanjutkan belajarmu</p>
          </div>

          <form onSubmit={handle} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--edu-text)' }}>
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2" size={18}
                  style={{ color: 'var(--edu-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="input-edu pl-12"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--edu-text)' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={18}
                  style={{ color: 'var(--edu-muted)' }} />
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password kamu"
                  className="input-edu pl-12 pr-12"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-gray-600"
                  style={{ color: 'var(--edu-muted)' }}
                  aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="btn-login"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              style={{ background: 'var(--edu-red)', boxShadow: '0 4px 20px rgba(192,57,43,0.3)' }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Masuk ke Akun <ArrowRight size={18} /></>
              )}
            </button>

            <p className="text-center text-sm" style={{ color: 'var(--edu-muted)' }}>
              Belum punya akun?{' '}
              <Link to="/register" className="font-bold transition-colors hover:underline"
                style={{ color: 'var(--edu-navy)' }}>
                Daftar Gratis
              </Link>
            </p>
          </form>

          <p className="text-xs text-center mt-8" style={{ color: '#C4BFB9' }}>
            Dengan masuk, kamu menyetujui syarat penggunaan platform ini.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
