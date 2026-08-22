import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const services = [
  ['01', 'Performance Marketing', 'Meta, Google and full-funnel acquisition built around profitable growth.'],
  ['02', 'Creative Strategy', 'Concepts, hooks and creative testing designed to turn attention into action.'],
  ['03', 'Analytics & Measurement', 'GA4, tracking and reporting that make every marketing decision clearer.'],
  ['04', 'Landing Pages & CRO', 'Conversion-focused experiences built to remove friction and improve outcomes.'],
]

const cases = [
  { type: 'E-commerce', title: 'Scaling profitable acquisition', result: '3.2×', label: 'ROAS' },
  { type: 'EdTech', title: 'More qualified leads, less waste', result: '42%', label: 'Lower CPA' },
  { type: 'SaaS', title: 'Turning paid traffic into pipeline', result: '2.5×', label: 'More leads' },
]

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

function Link({ to, children, className = '' }) {
  return <a href={to} className={className} onClick={(e) => { e.preventDefault(); navigate(to) }}>{children}</a>
}

function Nav({ page }) {
  return <header className="nav">
    <div className="nav-inner">
      <Link to="/" className="brand">RESENTMENT<span>.</span></Link>
      <nav>
        <Link to="/" className={page === '/' ? 'active' : ''}>Home</Link>
        <Link to="/services" className={page === '/services' ? 'active' : ''}>Services</Link>
        <Link to="/case-studies" className={page === '/case-studies' ? 'active' : ''}>Case Studies</Link>
        <Link to="/contact" className="nav-cta">Let's Talk ↗</Link>
      </nav>
    </div>
  </header>
}

function Footer() {
  return <footer>
    <div className="footer-top">
      <div><div className="brand">RESENTMENT<span>.</span></div><p>Growth without the guesswork.</p></div>
      <Link to="/contact" className="footer-link">Start a conversation ↗</Link>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Resentment</span><span>Performance marketing & growth</span></div>
  </footer>
}

function Home() {
  return <>
    <section className="hero">
      <div className="hero-glow" />
      <div className="eyebrow">PERFORMANCE MARKETING / GROWTH</div>
      <h1>Make your<br /><em>marketing</em><br />matter.</h1>
      <p className="hero-copy">We build acquisition systems that turn attention into customers — with strategy, creative and data working as one.</p>
      <div className="actions"><Link to="/contact" className="button primary">Start a project ↗</Link><Link to="/case-studies" className="button ghost">See our work</Link></div>
      <div className="hero-note">Built for brands that are ready to grow, not just advertise.</div>
    </section>

    <section className="statement">
      <div className="section-kicker">THE IDEA</div>
      <h2>Good marketing gets attention.<br /><span>Great marketing earns growth.</span></h2>
    </section>

    <section className="section">
      <div className="section-head"><div><div className="section-kicker">WHAT WE DO</div><h2>Everything connected.</h2></div><p>From first impression to final conversion, we connect the pieces that make growth happen.</p></div>
      <div className="service-grid">{services.map(([n,t,d]) => <Link to="/services" className="service-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><b>↗</b></Link>)}</div>
    </section>

    <section className="results">
      <div className="section-kicker">SELECTED IMPACT</div>
      <div className="result-grid">
        <div><strong>3.2×</strong><span>ROAS</span></div><div><strong>42%</strong><span>Lower CPA</span></div><div><strong>2.5×</strong><span>More leads</span></div>
      </div>
    </section>

    <section className="section cases-preview">
      <div className="section-head"><div><div className="section-kicker">SELECTED WORK</div><h2>Results over rhetoric.</h2></div><Link to="/case-studies" className="text-link">View all case studies ↗</Link></div>
      <div className="case-grid">{cases.map(c => <Link to="/case-studies" className="case-card" key={c.title}><div className="case-meta">{c.type}<span>CASE STUDY</span></div><h3>{c.title}</h3><div className="case-result"><strong>{c.result}</strong><span>{c.label}</span></div></Link>)}</div>
    </section>

    <CTA />
  </>
}

function Services() {
  return <PageShell title={<>Growth is a<br /><em>system.</em></>} intro="We combine acquisition, creative, analytics and conversion into one connected growth engine.">
    <div className="service-list">{services.map(([n,t,d]) => <article key={n}><span>{n}</span><div><h2>{t}</h2><p>{d}</p><ul><li>Strategy & planning</li><li>Testing & optimization</li><li>Clear performance reporting</li></ul></div></article>)}</div>
    <CTA />
  </PageShell>
}

function CaseStudies() {
  return <PageShell title={<>Proof, not<br /><em>promises.</em></>} intro="A few examples of the outcomes our growth approach is built to create. Replace these placeholders with your verified client results.">
    <div className="case-list">{cases.map((c,i) => <article key={c.title}><div className="case-number">0{i+1}</div><div><span className="eyebrow">{c.type}</span><h2>{c.title}</h2><p>Challenge → strategy → testing → measurable result.</p></div><div className="big-result"><strong>{c.result}</strong><span>{c.label}</span></div></article>)}</div>
    <CTA />
  </PageShell>
}

function Contact() {
  return <PageShell title={<>Let's make<br /><em>something move.</em></>} intro="Tell us what you're trying to achieve. We'll come back with the questions, opportunities and next steps that matter.">
    <div className="contact-grid">
      <div className="contact-info"><div className="section-kicker">START HERE</div><h2>Have a growth problem worth solving?</h2><p>Whether you're launching, scaling or rebuilding your acquisition engine, we'd love to hear what you're working on.</p><a href="mailto:hello@resentment.in">hello@resentment.in ↗</a></div>
      <form onSubmit={(e)=>{e.preventDefault(); alert('Thanks! Your message form is ready to connect to your preferred form service.')}}>
        <label>Name<input required placeholder="Your name" /></label>
        <label>Work email<input required type="email" placeholder="you@company.com" /></label>
        <label>Company<input placeholder="Company name" /></label>
        <label>What are you looking to solve?<textarea rows="5" placeholder="Tell us a little about the project..." /></label>
        <button className="button primary" type="submit">Send enquiry ↗</button>
      </form>
    </div>
  </PageShell>
}

function PageShell({ title, intro, children }) {
  return <><section className="page-hero"><div className="eyebrow">RESENTMENT / {location.pathname.slice(1).toUpperCase() || 'HOME'}</div><h1>{title}</h1><p>{intro}</p></section><main className="section page-content">{children}</main></>
}

function CTA() {
  return <section className="cta"><div className="section-kicker">NEXT MOVE</div><h2>Ready to make<br /><em>growth happen?</em></h2><Link to="/contact" className="button light">Let's talk ↗</Link></section>
}

function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/+$/, '') || '/')
  useEffect(() => { const onPop=()=>setPath(window.location.pathname.replace(/\/+$/, '')||'/'); window.addEventListener('popstate', onPop); return ()=>window.removeEventListener('popstate', onPop)}, [])
  let content = path === '/services' ? <Services/> : path === '/case-studies' ? <CaseStudies/> : path === '/contact' ? <Contact/> : <Home/>
  return <><Nav page={path}/>{content}<Footer/></>
}

createRoot(document.getElementById('root')).render(<App />)
