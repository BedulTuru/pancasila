import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Portal from './pages/Portal'
import QuizAge from './pages/QuizAge'
import Books from './pages/Books'
import Leaderboard from './pages/Leaderboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MaterialDetail from './pages/MaterialDetail'
import QuizPlay from './pages/QuizPlay'
import AdminUsers from './pages/AdminUsers'
import AdminMaterials from './pages/AdminMaterials'
import AdminQuizzes from './pages/AdminQuizzes'
import AdminAnalytics from './pages/AdminAnalytics'
import AdminSecurityLogs from './pages/AdminSecurityLogs'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || '/admin'

import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { sound } from './utils/audio'
import { Check, AlertCircle } from 'lucide-react'
import { useToasterStore } from 'react-hot-toast'

function SoundWatcher() {
  const { toasts } = useToasterStore()
  const processedIds = React.useRef(new Set())

  React.useEffect(() => {
    toasts.forEach(t => {
      if (t.id && !processedIds.current.has(t.id)) {
        processedIds.current.add(t.id)
        sound.playPop(t.type === 'error' ? 'error' : 'success')
      }
    })

    // Clean up old IDs to prevent memory leak (optional but good practice)
    if (processedIds.current.size > 20) {
      const currentIds = new Set(toasts.map(t => t.id))
      for (let id of processedIds.current) {
        if (!currentIds.has(id)) processedIds.current.delete(id)
      }
    }
  }, [toasts])

  return null
}

function AppContent() {
  const location = useLocation()
  
  return (
    <div className="min-h-screen flex flex-col">
      <SoundWatcher />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="/quiz/:difficulty" element={<QuizAge />} />
              <Route path="/books" element={<Books />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/materials/:slug" element={<MaterialDetail />} />
              <Route path="/quiz-play/:slug" element={<QuizPlay />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path={`${ADMIN_PATH}/analytics`} element={
                <ProtectedRoute roles={['ADMIN']}>
                  <AdminAnalytics />
                </ProtectedRoute>
              } />
              <Route path={`${ADMIN_PATH}/logs`} element={
                <ProtectedRoute roles={['ADMIN']}>
                  <AdminSecurityLogs />
                </ProtectedRoute>
              } />
              <Route path={`${ADMIN_PATH}/users`} element={
                <ProtectedRoute roles={['ADMIN']}>
                  <AdminUsers />
                </ProtectedRoute>
              } />
              <Route path={`${ADMIN_PATH}/materials`} element={
                <ProtectedRoute roles={['ADMIN', 'TUTOR']}>
                  <AdminMaterials />
                </ProtectedRoute>
              } />
              <Route path={`${ADMIN_PATH}/quizzes`} element={
                <ProtectedRoute roles={['ADMIN', 'TUTOR']}>
                  <AdminQuizzes />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'premium-toast animate-toast-in',
          duration: 4000,
          success: {
            className: 'premium-toast premium-toast-success animate-toast-in',
            icon: <div className="premium-toast-icon"><Check size={20} strokeWidth={3} /></div>,
          },
          error: {
            className: 'premium-toast premium-toast-error animate-toast-in',
            icon: <div className="premium-toast-icon"><AlertCircle size={20} strokeWidth={3} /></div>,
          },
        }}
      />
    </div>
  )
}

// Global crash capture for debugging White Screens
window.addEventListener('error', (e) => {
  console.error('[Global Error]', e.message, e.error?.stack);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('[Global Promise Rejection]', e.reason);
});

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log to console for the developer to see
    console.error("APP CRASHED:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          backgroundColor: '#fff1f1', 
          color: '#800', 
          fontFamily: 'monospace', 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ 
            maxWidth: '800px', 
            background: 'white', 
            padding: '30px', 
            borderRadius: '20px', 
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            border: '2px solid #fcc'
          }}>
            <h1 style={{ margin: '0 0 20px 0', fontSize: '24px' }}>⚠️ KRITIKAL ERROR: Sistem Terhenti</h1>
            <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
              Aplikasi mengalami kegagalan render. Detail teknis di bawah ini sangat penting untuk perbaikan:
            </p>
            <div style={{ 
              backgroundColor: '#333', 
              color: '#0f0', 
              padding: '20px', 
              borderRadius: '10px', 
              overflow: 'auto', 
              maxHeight: '300px',
              fontSize: '12px',
              margin: '20px 0'
            }}>
              <strong>Message:</strong> {this.state.error?.toString()}
              <br/><br/>
              <strong>Stack:</strong>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.errorInfo?.componentStack}</pre>
            </div>
            <button 
              onClick={() => window.location.reload()}
              style={{ 
                backgroundColor: '#d32f2f', 
                color: 'white', 
                border: 'none', 
                padding: '15px 30px', 
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              MUAT ULANG APLIKASI
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <RootErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </RootErrorBoundary>
  )
}

createRoot(document.getElementById('root')).render(<App />)
