import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function PortalEdu() {
  const [materials, setMaterials] = useState([])
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const m = await axios.get('http://localhost:4000/api/materials')
        const q = await axios.get('http://localhost:4000/api/quizzes')
        setMaterials(m.data)
        setQuizzes(q.data)
      } catch (e) {
        console.error('Portal load error', e)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="portal-edu" style={{ padding: '20px 40px' }}>
      <h1 style={{ textAlign: 'center' }}>Portal Edukasi Lokal</h1>
      <section style={{ marginTop: 20 }}>
        <h2>Daftar Materi</h2>
        <div className="grid materials-grid">
          {materials.map((m) => (
            <div className="card" key={m.id}>
              <div>
                <strong>{m.title}</strong>
                <div style={{ fontSize: 12, color: '#666' }}>{m.subject} • {m.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ marginTop: 20 }}>
        <h2>Kuis Latihan</h2>
        <div className="grid quizzes-grid">
          {quizzes.map((qq) => (
            <div className="card" key={qq.id}>
              <div>
                <strong>{qq.title}</strong>
                <div style={{ fontSize: 12, color: '#666' }}>{qq.subject}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
