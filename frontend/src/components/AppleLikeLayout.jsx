import React from 'react'

export default function AppleLikeLayout({ children }) {
  return (
    <div className="apple-shell">
      <header className="topnav">
        <div className="logo">Pancasila</div>
        <nav>
          <a href="#">Overview</a>
          <a href="#/docs">Docs</a>
          <a href="#">About</a>
        </nav>
        <button className="cta">Get Started</button>
      </header>
      {children}
    </div>
  )
}
