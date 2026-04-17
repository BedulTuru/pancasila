import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const BENEFITS = [
  'Akses semua materi dan kuis tanpa biaya',
  'Lacak progres belajar secara otomatis',
  'Raih pencapaian dan naik di papan peringkat',
  'Konten diperbarui setiap bulan oleh tutor ITB',
]

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirm) return toast.error('Lengkapi semua field terlebih dahulu')
    if (password !== confirm) return toast.error('Konfirmasi password tidak cocok')
    if (password.length < 8) return toast.error('Password minimal 8 karakter')
    setLoading(true)
    try {
      await register(name, email, password)
      toast.success('Akun berhasil dibuat! Selamat belajar 🎉')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Gagal membuat akun')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--edu-cream)' }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0D47A1 0%, #1A1A2E 50%, #7B1010 100%)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #D4A017, transparent)' }} />
          <div className="absolute bottom-10 -left-10 w-60 h-60 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #C0392B, transparent)' }} />
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
          <h2 className="text-2xl font-bold text-white mb-6 leading-snug">
            Bergabung dengan komunitas<br />pelajar Indonesia
          </h2>
          <ul className="space-y-4">
            {BENEFITS.map(b => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--edu-gold)' }} />
                <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{b}</span>
              </li>
            ))}
          </ul>
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
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--edu-text)' }}>Buat akun baru</h1>
            <p style={{ color: 'var(--edu-muted)' }}>Gratis untuk semua pelajar Indonesia</p>
          </div>

          <form onSubmit={handle} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--edu-text)' }}>Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--edu-muted)' }} />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nama lengkap kamu"
                  className="input-edu pl-12"
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--edu-text)' }}>Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--edu-muted)' }} />
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
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--edu-text)' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--edu-muted)' }} />
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="input-edu pl-12 pr-12"
                  autoComplete="new-password"
                  required
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-gray-600"
                  style={{ color: 'var(--edu-muted)' }}>
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--edu-text)' }}>Konfirmasi Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--edu-muted)' }} />
                <input
                  type={show ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Ulangi password"
                  className="input-edu pl-12"
                  autoComplete="new-password"
                  required
                />
              </div>
              {confirm && password !== confirm && (
                <p className="text-xs mt-1.5" style={{ color: 'var(--edu-red)' }}>
                  Password tidak cocok
                </p>
              )}
            </div>

            <button
              type="submit"
              id="btn-register"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              style={{ background: 'var(--edu-navy)', boxShadow: '0 4px 20px rgba(21,101,192,0.3)' }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Buat Akun Gratis <ArrowRight size={18} /></>
              )}
            </button>

            <p className="text-center text-sm" style={{ color: 'var(--edu-muted)' }}>
              Sudah punya akun?{' '}
              <Link to="/login" className="font-bold transition-colors hover:underline"
                style={{ color: 'var(--edu-red)' }}>
                Masuk
              </Link>
            </p>
          </form>

          <p className="text-xs text-center mt-8" style={{ color: '#C4BFB9' }}>
            Dengan mendaftar, kamu setuju dengan syarat & ketentuan penggunaan platform ini.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
