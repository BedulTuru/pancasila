import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Docs() {
  const [docs, setDocs] = useState([])
  const [file, setFile] = useState(null)

  useEffect(() => {
    fetchDocs()
  }, [])

  const fetchDocs = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/docs')
      setDocs(res.data)
    } catch (e) {
      console.error('Failed to fetch docs', e)
    }
  }

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const upload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('pdf', file)
    try {
      await axios.post('http://localhost:4000/api/docs/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      fetchDocs()
      setFile(null)
    } catch (e) {
      console.error('Upload failed', e)
    }
  }

  return (
    <div className="docs-page">
      <h2>Dokumen Proyek</h2>
      <div className="upload">
        <input type="file" accept="application/pdf" onChange={onFileChange} />
        <button onClick={upload}>Upload PDF</button>
      </div>
      <ul className="docs-list">
        {docs.map((d) => (
          <li key={d.id}>
            <a href={d.url} target="_blank" rel="noreferrer">{d.name}</a> <span className="meta">{d.size ? (d.size / 1024).toFixed(1) + ' KB' : ''}</span>
          </li>
        ))}
      </ul>
      <div className="docs-preview" aria-label="preview-area">
        <p>Panduan: pilih dokumen untuk dibuka di tab baru.</p>
      </div>
    </div>
  )
}
