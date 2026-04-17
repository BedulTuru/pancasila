import { Link, useLocation } from 'react-router-dom'
import { MapPin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const location = useLocation()
  if (['/login', '/register'].includes(location.pathname)) return null;

  return (
    <footer style={{ background: '#1A1A2E', color: 'white' }}>
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <img 
                src="/garuda.svg" 
                alt="Logo Garuda Pancasila" 
                className="h-12 w-auto transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-base text-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Portal Edukasi
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--edu-gold)' }}>Pancasila</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '280px' }}>
              Platform bimbingan belajar gratis untuk pelajar Indonesia. Mewujudkan nilai Keadilan Sosial bagi seluruh rakyat Indonesia melalui pemerataan akses pendidikan.
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <MapPin size={14} />
              <span>Institut Teknologi Bandung</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: 'rgba(255,255,255,0.9)', letterSpacing: '0.06em' }}>
              Belajar
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/portal', label: 'Portal Materi' },
                { to: '/quiz/easy', label: 'Kuis Pemula' },
                { to: '/quiz/medium', label: 'Kuis Menengah' },
                { to: '/quiz/hard', label: 'Kuis Lanjutan' },
                { to: '/books', label: 'Perpustakaan' },
              ].map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: 'rgba(255,255,255,0.9)', letterSpacing: '0.06em' }}>
              Tentang
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Tapak Liman ITB', href: '#' },
                { label: 'Nilai Pancasila', href: '#' },
                { label: 'SDG 4 & 10', href: '#' },
                { label: 'Persyaratan', href: '#' },
              ].map(link => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: 'rgba(255,255,255,0.9)', letterSpacing: '0.06em' }}>
              Akun
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/login', label: 'Masuk' },
                { to: '/register', label: 'Daftar Gratis' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/leaderboard', label: 'Papan Peringkat' },
              ].map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © 2026 Portal Edukasi Pancasila · Proyek Tapak Liman ITB
          </p>
        </div>
      </div>
    </footer>
  )
}
