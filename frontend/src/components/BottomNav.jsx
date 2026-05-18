import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Brain, LayoutDashboard, Search, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function BottomNav({ onOpenSearch }) {
  const location = useLocation()
  const { user } = useAuth()
  
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/portal', label: 'Materi', icon: BookOpen },
    { type: 'action', onClick: onOpenSearch, label: 'Cari', icon: Search },
    { to: '/leaderboard', label: 'Peringkat', icon: Trophy },
    { to: '/dashboard', label: 'Profil', icon: LayoutDashboard },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="glass-effect rounded-[2.5rem] shadow-2xl pointer-events-auto border border-white/40 overflow-hidden"
      >
        <div className="flex items-center justify-around p-2">
          {navItems.map((item, idx) => {
            const isAction = item.type === 'action'
            const isActive = !isAction && (location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to)))
            
            const Wrapper = isAction ? 'button' : Link
            const props = isAction ? { onClick: item.onClick } : { to: item.to }

            return (
              <Wrapper
                key={isAction ? 'search' : item.to}
                {...props}
                className="relative flex flex-col items-center gap-1 p-2.5 transition-all duration-300 min-w-[60px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-red-600/10 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-colors duration-300 ${isActive ? 'text-red-600' : 'text-slate-400'} ${isAction ? 'group-active:scale-90' : ''}`}
                />
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-red-600' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </Wrapper>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
