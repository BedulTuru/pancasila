import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://pancasila-edu-backend-production.up.railway.app/api'

// Prevent duplicate redirects when multiple concurrent requests fail with 401
let isRedirectingToLogin = false

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Kirim kunci rahasia admin jika terdeteksi di lingkungan
    const adminSecret = import.meta.env.VITE_ADMIN_SECRET_KEY
    if (adminSecret) {
      config.headers['X-Admin-Secret-Key'] = adminSecret
    }
    
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/login')
    const isLoginPage = window.location.pathname === '/login'

    if (error.response?.status === 401 && !isRedirectingToLogin && !isLoginRequest && !isLoginPage) {
      isRedirectingToLogin = true
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
