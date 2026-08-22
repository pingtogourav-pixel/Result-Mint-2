import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  return (
    <main className="page">
      <nav>
        <div className="logo">RESENTMENT</div>
        <span className="status">React + Vite</span>
      </nav>

      <section className="hero">
        <div className="eyebrow">DEPLOYMENT TEST</div>
        <h1>React is<br /><span>working.</span></h1>
        <p>
          If you're seeing this page on your Vercel URL, the fresh React + Vite
          setup has deployed successfully.
        </p>
        <div className="actions">
          <button onClick={() => alert('React is working perfectly!')}>
            Test React
          </button>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            Vite Docs ↗
          </a>
        </div>
      </section>

      <section className="cards">
        <article><strong>01</strong><h2>React</h2><p>Component-based frontend.</p></article>
        <article><strong>02</strong><h2>Vite</h2><p>Fast, clean production builds.</p></article>
        <article><strong>03</strong><h2>Vercel</h2><p>Automatic deployment from GitHub.</p></article>
      </section>

      <footer>Resentment · Test deployment</footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
