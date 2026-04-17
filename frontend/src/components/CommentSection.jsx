import React, { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Reply, User, Shield, ShieldCheck } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

// ─── CRITICAL FIX: CommentItem must be defined OUTSIDE the parent component ───
// Defining it inside caused React to see a new component type on every render,
// which forced it to unmount & remount every comment (causing the flicker bug).
const CommentItem = memo(({ comment, isReply = false, onReply }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex gap-4 ${isReply ? 'mt-4 ml-12' : 'mt-8'}`}
  >
    <div className="flex-shrink-0">
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden">
        {comment.user?.avatar ? (
          <img src={comment.user.avatar} alt="" className="w-full h-full object-cover" />
        ) : (
          <User size={20} />
        )}
      </div>
    </div>
    <div className="flex-1">
      <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 group relative">
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            {comment.user?.name}
            {comment.user?.role === 'ADMIN' && (
              <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Admin</span>
            )}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {new Date(comment.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          {comment.content}
        </p>

        {!isReply && onReply && (
          <button
            onClick={() => onReply({ id: comment.id, name: comment.user?.name })}
            className="mt-3 flex items-center gap-1.5 text-xs font-bold text-navy-600 hover:text-red-600 transition-colors"
          >
            <Reply size={14} /> Balas
          </button>
        )}
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  </motion.div>
));

CommentItem.displayName = 'CommentItem';

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const CommentSection = memo(({ initialComments = [], materialId, quizId, onCommentAdded }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null); // { id, name }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = useCallback((target) => {
    setReplyTo(target);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Silakan login untuk berdiskusi');
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await api.post('/comments', {
        content: newComment,
        materialId,
        quizId,
        parentId: replyTo?.id || null
      });

      const addedComment = res.data;

      if (replyTo) {
        setComments(prev => prev.map(c => {
          if (c.id === replyTo.id) {
            return { ...c, replies: [...(c.replies || []), addedComment] };
          }
          return c;
        }));
      } else {
        setComments(prev => [addedComment, ...prev]);
      }

      setNewComment('');
      setReplyTo(null);
      toast.success('Komentar terkirim!');
      if (onCommentAdded) onCommentAdded();
    } catch {
      toast.error('Gagal mengirim komentar');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-20 pt-16 border-t border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white shadow-lg">
            <MessageSquare size={20} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Ruang Diskusi</h2>
        </div>
        <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
          <Shield size={14} className="text-emerald-500" /> Sensor Otomatis Aktif
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm mb-12">
        <AnimatePresence>
          {replyTo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between bg-navy-50 text-navy-700 px-4 py-2 rounded-xl mb-4 text-xs font-bold border border-navy-100"
            >
              <span>Membalas ke: <span className="text-navy-900">{replyTo.name}</span></span>
              <button
                onClick={() => setReplyTo(null)}
                className="text-navy-400 hover:text-red-600 transition-colors"
              >
                Batalkan
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={user ? "Bagikan pemikiranmu atau tanyakan sesuatu..." : "Silakan login untuk ikut berdiskusi..."}
              disabled={!user || isSubmitting}
              className="w-full bg-slate-50 border-none ring-1 ring-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-slate-400 min-h-[100px] resize-none"
            />
            <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <ShieldCheck size={12} /> Penyaring Konten Aktif
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400 italic">
              * Gunakan bahasa yang sopan dan mendidik.
            </div>
            <button
              type="submit"
              disabled={!user || isSubmitting || !newComment.trim()}
              className="px-6 py-3 bg-navy-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-navy-100/50 hover:bg-navy-900 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:translate-y-0 flex items-center gap-2"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'} <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200">
            <MessageSquare size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-400">Belum ada diskusi di sini. Jadilah yang pertama!</p>
          </div>
        )}
      </div>
    </section>
  );
});

CommentSection.displayName = 'CommentSection';

export default CommentSection;
