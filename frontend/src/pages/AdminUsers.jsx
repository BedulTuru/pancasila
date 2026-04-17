import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Search, UserX, ArrowLeft, Download } from 'lucide-react'
import api from '../utils/api'
import toast from 'react-hot-toast'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    fetchUsers()
  }, [page, search])

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users', { params: { page, limit: 20, search: search || undefined } })
      setUsers(res.data.data)
      setPagination(res.data.pagination)
    } catch (error) {
      toast.error('Gagal memuat pengguna')
    } finally {
      setLoading(false)
    }
  }

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await api.patch(`/admin/users/${userId}`, { isActive: !currentStatus })
      toast.success('Status pengguna diperbarui')
      fetchUsers()
    } catch (error) {
      toast.error('Gagal memperbarui status')
    }
  }

  const getRoleStyle = (role) => {
    switch (role) {
      case 'ADMIN': return 'bg-rose-100 text-rose-700 border border-rose-200'
      case 'TUTOR': return 'bg-purple-100 text-purple-700 border border-purple-200'
      default: return 'bg-blue-100 text-blue-700 border border-blue-200'
    }
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--edu-cream)' }}>
      {/* ━━━ PAGE HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div 
        className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: 'var(--edu-cream)' }}
      >
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.045] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(var(--edu-navy) 1px, transparent 1px), linear-gradient(90deg, var(--edu-navy) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at 60% 50%, black 40%, transparent 80%)',
        }} />
        {/* Emerald glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 75% 60%, rgba(16,185,129,0.06) 0%, transparent 55%)',
        }} />

        {/* Decorative icon */}
        <Users
          size={260}
          strokeWidth={1}
          className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.05] rotate-[5deg]"
          style={{ color: 'var(--edu-navy)' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 transition-colors hover:text-black relative z-20"
            style={{ color: 'var(--edu-muted)' }}>
            <ArrowLeft size={16} /> Kembali ke Dashboard
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Emerald accent line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 rounded-full bg-emerald-500" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
                Data Central
              </p>
            </div>
            <h1 
              className="text-4xl md:text-5xl font-black mb-3"
              style={{ color: 'var(--edu-text)', fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: 1.08 }}
            >
              Manajemen Pengguna
            </h1>
            <p className="text-base font-medium max-w-lg" style={{ color: 'var(--edu-muted)' }}>
              Kelola akses dan aktivitas seluruh anggota portal edukasi dengan mudah dan terkontrol.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ━━━ CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="w-full bg-white pl-11 pr-6 py-3.5 rounded-full border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-md shadow-slate-100/50 text-sm font-medium placeholder:text-slate-300"
              />
            </div>
            <button 
              onClick={async () => {
                try {
                  const res = await api.get('/admin/export/users', { responseType: 'blob' });
                  const url = window.URL.createObjectURL(new Blob([res.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', 'pancasila_users.csv');
                  document.body.appendChild(link);
                  link.click();
                  toast.success('Data berhasil diekspor!');
                } catch {
                  toast.error('Gagal mengekspor data');
                }
              }}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all text-sm font-bold shadow-sm"
              title="Export to CSV"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-16 text-center">
                <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: 'var(--edu-navy)', borderTopColor: 'transparent' }} />
              </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Pengguna</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Aktivitas</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Kontrol</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {users.map(user => (
                          <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black shadow-sm ring-4 ring-offset-1 ${
                                  user.role === 'ADMIN' ? 'bg-rose-100 text-rose-700 ring-rose-50' :
                                  user.role === 'TUTOR' ? 'bg-purple-100 text-purple-700 ring-purple-50' :
                                  'bg-slate-100 text-slate-700 ring-slate-50'
                                }`}>
                                  <span>{user.name?.charAt(0)}</span>
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-800">{user.name}</div>
                                  <div className="text-sm text-slate-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-xs font-medium text-slate-500">
                                <div>Login: {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : '-'}</div>
                                <div className="text-orange-600">Streak: {user.loginStreak} hari</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleStyle(user.role)}`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                user.isActive 
                                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                                  : 'bg-rose-100 text-rose-700 border border-rose-200'
                              }`}>
                                {user.isActive ? 'Aktif' : 'DIBLOKIR'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => {
                                  if(confirm(`Yakin ingin ${user.isActive ? 'MEMBLOKIR' : 'MENGAKTIFKAN'} user ini?`)) {
                                    toggleUserStatus(user.id, user.isActive)
                                  }
                                }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                  user.isActive 
                                    ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white' 
                                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                                }`}
                              >
                                <UserX size={14} />
                                {user.isActive ? 'Ban Account' : 'Unban'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {pagination.totalPages > 1 && (
                    <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-500">
                        Halaman {pagination.page} dari {pagination.totalPages}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="px-4 py-2 rounded-xl border-2 border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 font-medium text-slate-700 transition-colors"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                          disabled={page === pagination.totalPages}
                          className="px-4 py-2 rounded-xl border-2 border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 font-medium text-slate-700 transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
  )
}
