import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(null)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(null)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/quizzes')
        setQuizzes(res.data)
      } catch (e) {
        console.error('Failed to load quizzes', e)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizzes()
  }, [])

  const startQuiz = (quiz) => {
    setCurrent(quiz)
    setAnswers(new Array(quiz.questions.length).fill(null))
    setScore(null)
  }

  const selectAnswer = (idx) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[current?.questions.findIndex((q) => true) ? 0 : 0] = idx // placeholder, will adjust below
      // Properly map to current question index
      const qi = (current?.questions.findIndex((q) => q.id) ?? 0)
      next[qi] = idx
      return next
    })
  }

  const submit = () => {
    if (!current) return
    // compute score
    let s = 0
    current.questions.forEach((q, i) => {
      if (answers[i] === q.answerIndex) s++
    })
    setScore(s)
  }

  if (loading) return <div>Memuat kuis...</div>
  if (!current) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] pb-20">
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
          {/* Amber glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 75% 60%, rgba(245,158,11,0.06) 0%, transparent 55%)',
          }} />

          {/* Decorative icon */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.05] rotate-[10deg]">
             <svg xmlns="http://www.w3.org/2000/svg" width="260" height="260" viewBox="0 0 24 24" fill="none" stroke="var(--edu-navy)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.002 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
            <div className="animate-fade-in-up">
              {/* Amber accent line */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 rounded-full bg-amber-500" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">
                  Asah Kemampuanmu
                </p>
              </div>
              <h1 
                className="text-4xl md:text-5xl font-black mb-3"
                style={{ color: 'var(--edu-text)', fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: 1.08 }}
              >
                Kuis Interaktif
              </h1>
              <p className="text-base font-medium max-w-lg" style={{ color: 'var(--edu-muted)' }}>
                Uji pemahamanmu tentang materi kewarganegaraan dengan berbagai kuis menantang. Kumpulkan skor tertinggi dan puncaki peringkat nasional!
              </p>
            </div>
          </div>
        </div>

        {/* Content list */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 line-clamp-none">
            {quizzes.map((q) => (
              <div className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 relative overflow-hidden" key={q.id}>
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-xl font-bold text-slate-800 mb-2 truncate group-hover:text-amber-600 transition-colors">{q.title}</h3>
                <p className="text-sm text-slate-500 mb-6">{q.questions?.length || 10} Pertanyaan Tersedia</p>
                
                <div className="flex justify-end">
                  <button 
                    onClick={() => startQuiz(q)}
                    className="flex items-center gap-2 bg-slate-50 hover:bg-amber-500 text-slate-600 hover:text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm"
                  >
                    Mulai Sekarang <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // render current quiz
  const quiz = current
  const qIndex = answers.findIndex((a) => a !== null)
  const currentIndex = qIndex >= 0 ? qIndex : 0
  const total = quiz.questions.length
  const currentQuestion = quiz.questions[currentIndex]

  return (
    <div className="quizzes-page" style={{ padding: '20px 40px' }}>
      <h2>Kuis: {quiz.title}</h2>
      <div className="quiz-area card" style={{ padding: 20 }}>
        <div style={{ fontWeight: 600 }}>{currentQuestion?.q}</div>
        <div style={{ marginTop: 12 }}>
          {currentQuestion?.options.map((opt, idx) => {
            const isSelected = answers[currentIndex] === idx
            return (
              <button
                key={idx}
                onClick={() => {
                  const newAns = [...answers]
                  newAns[currentIndex] = idx
                  setAnswers(newAns)
                }}
                style={{ display: 'block', margin: '6px 0', background: isSelected ? '#e6f0ff' : '#fff' }}
              >
                {opt}
              </button>
            )
          })}
        </div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
          <span>Soal {currentIndex + 1} dari {total}</span>
          <button onClick={() => setCurrent(null)}>Kembali</button>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button onClick={submit}>Submit Nilai</button>
        </div>
        {score !== null && (
          <div style={{ marginTop: 12 }}>
            Skor: {score} / {total}
          </div>
        )}
      </div>
    </div>
  )
}
