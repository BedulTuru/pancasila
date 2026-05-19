import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function ProtectedRoute({ children, roles }) {
  const { user, loading, isLoggingOut } = useAuth()
  const location = useLocation()
  const token = localStorage.getItem('token')

  if (loading || (token && !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--edu-cream)' }}>
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--edu-navy)' }}></div>
      </div>
    )
  }

  if (!user) {
    if (!isLoggingOut) {
      toast.error('Silakan login terlebih dahulu', { id: 'login-required' })
    }
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles && !roles.includes(user.role)) {
    toast.error('Anda tidak memiliki akses ke halaman ini', { id: 'unauthorized' })
    return <Navigate to="/dashboard" replace />
  }

  return children
}
