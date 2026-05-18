import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const res = await api.get('/auth/me')
      setUser(res.data)
    } catch (error) {
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const logout = () => {
    setIsLoggingOut(true)
    localStorage.removeItem('token')
    localStorage.removeItem('admin_token')
    setUser(null)
    // Reset after a delay to allow navigation to complete
    setTimeout(() => setIsLoggingOut(false), 1000)
  }

  const impersonate = (targetToken) => {
    const currentToken = localStorage.getItem('token')
    if (!localStorage.getItem('admin_token')) {
      localStorage.setItem('admin_token', currentToken)
    }
    localStorage.setItem('token', targetToken)
    fetchUser()
  }

  const snapBack = () => {
    const adminToken = localStorage.getItem('admin_token')
    if (adminToken) {
      localStorage.setItem('token', adminToken)
      localStorage.removeItem('admin_token')
      fetchUser()
    }
  }

  const isImpersonating = !!localStorage.getItem('admin_token')

  return (
    <AuthContext.Provider value={{ 
      user, loading, isLoggingOut, login, register, logout, fetchUser, 
      impersonate, snapBack, isImpersonating 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
