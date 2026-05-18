import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Search, UserX, ArrowLeft, Download, Activity } from 'lucide-react'
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

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ background: 'var(--edu-cream)' }}>
      {/* ━━━ PAGE HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all mb-6">
          <ArrowLeft size={18} /> Kembali ke Dashboard
        </Link>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
               <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-100 text-blue-600 shadow-sm border border-blue-200">
                  <Users size={24} strokeWidth={2} />
               </div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kelola Pengguna</h1>
            </div>
            <p className="text-slate-500 font-medium text-base max-w-xl">
               Kelola akses, lihat aktivitas, dan awasi seluruh pengguna terdaftar di dalam platform.
            </p>
          </div>

          <button 
            onClick={async () => {
              try {
                const res = await api.get('/admin/export/users', { responseType: 'blob' });
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'data_pengguna.csv');
                document.body.appendChild(link);
                link.click();
                toast.success('Data pengguna berhasil diunduh');
              } catch {
                toast.error('Gagal mengunduh data pengguna');
              }
            }}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Download size={18} strokeWidth={2.5} /> Export CSV
          </button>
        </motion.div>
      </div>

      {/* ━━━ CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="w-full bg-white pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition-all shadow-sm text-sm font-medium text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border-2 border-slate-100 overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-20 text-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b-2 border-slate-100">
                      <tr>
                        <th className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Identitas</th>
                        <th className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Aktivitas</th>
                        <th className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Peran</th>
                        <th className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-50">
                      {users.map((user, idx) => (
                        <motion.tr 
                          key={user.id} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.02 }}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-sm border ${
                                user.role === 'ADMIN' ? 'bg-red-100 border-red-200 text-red-600' :
                                user.role === 'TUTOR' ? 'bg-purple-100 border-purple-200 text-purple-600' :
                                'bg-slate-100 border-slate-200 text-slate-600'
                              }`}>
                                <span>{user.name?.charAt(0)}</span>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-900 mb-0.5">{user.name}</div>
                                <div className="text-xs font-medium text-slate-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="space-y-1.5">
                              <div className="text-xs font-medium text-slate-600 flex items-center gap-2">
                                Login: {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Belum pernah'}
                              </div>
                              <div className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                                <Activity size={14} /> Streak: {user.loginStreak} Hari
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                              user.role === 'ADMIN' ? 'bg-red-100 text-red-600' :
                              user.role === 'TUTOR' ? 'bg-purple-100 text-purple-600' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                               <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                               <span className={`text-xs font-bold uppercase tracking-wider ${user.isActive ? 'text-emerald-600' : 'text-red-600'}`}>
                                 {user.isActive ? 'Aktif' : 'Diblokir'}
                               </span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <button
                              onClick={() => {
                                if(confirm(`Apakah Anda yakin ingin ${user.isActive ? 'memblokir' : 'mengaktifkan kembali'} pengguna ini?`)) {
                                  toggleUserStatus(user.id, user.isActive)
                                }
                              }}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                user.isActive 
                                  ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                                  : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                              }`}
                            >
                              <UserX size={14} />
                              {user.isActive ? 'Blokir' : 'Pulihkan'}
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {pagination.totalPages > 1 && (
                  <div className="p-6 border-t-2 border-slate-100 flex items-center justify-between bg-slate-50">
                    <span className="text-sm font-bold text-slate-500">
                      Halaman {pagination.page} dari {pagination.totalPages}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 rounded-lg border-2 border-slate-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-300 text-sm font-bold text-slate-700 transition-all"
                      >
                        Sebelumnya
                      </button>
                      <button
                        onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                        disabled={page === pagination.totalPages}
                        className="px-4 py-2 rounded-lg border-2 border-slate-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-300 text-sm font-bold text-slate-700 transition-all"
                      >
                        Selanjutnya
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
