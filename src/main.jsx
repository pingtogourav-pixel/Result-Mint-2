import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const services = [
  ['01', 'Performance Marketing', 'Paid acquisition engineered around profitable growth, not vanity metrics.'],
  ['02', 'Creative & Content', 'Scroll-stopping concepts, hooks and testing systems built for performance.'],
  ['03', 'Analytics & Intelligence', 'GA4, tracking, dashboards and insights that turn data into decisions.'],
  ['04', 'Landing Pages & CRO', 'High-converting experiences designed to remove friction and increase action.'],
]

const cases = [
  { type: 'E-COMMERCE', title: 'Scaling profitable acquisition', result: '3.2×', label: 'ROAS' },
  { type: 'EDTECH', title: 'More qualified leads, less waste', result: '42%', label: 'LOWER CPA' },
  { type: 'SAAS', title: 'Turning paid traffic into pipeline', result: '2.5×', label: 'MORE LEADS' },
]

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({top: 0, behavior: 'smooth'})
}

function Link({to, children, className=''}) {
  return <a href={to} className={className} onClick={(e)=>{e.preventDefault();navigate(to)}}>{children}</a>
}

function Nav({page}) {
  return <header className="nav">
    <div className="nav-inner">
      <Link to="/" className="logo"><img src="/result-mint-logo.png" alt="Result Mint" /><span>RESULT<span>MINT</span></span></Link>
      <nav>
        <Link to="/" className={page==='/'?'active':''}>Home</Link>
        <Link to="/services" className={page==='/services'?'active':''}>Services</Link>
        <Link to="/case-studies" className={page==='/case-studies'?'active':''}>Case Studies</Link>
        <Link to="/contact" className="nav-button">Let's Talk <b>↗</b></Link>
      </nav>
    </div>
  </header>
}

function Reveal({children,className=''}) {
  return <div className={`reveal ${className}`}>{children}</div>
}

function Home() {
  return <>
    <section className="hero">
      <div className="noise"/>
      <div className="orb orb-one"/><div className="orb orb-two"/>
      <div className="hero-grid"/>
      <Reveal><div className="eyebrow"><span className="pulse-dot"/> PERFORMANCE MARKETING / GROWTH</div></Reveal>
      <Reveal className="delay-1"><h1>We don't chase<br/><span>attention.</span><br/>We chase <em>results.</em></h1></Reveal>
      <Reveal className="delay-2"><p className="hero-copy">Result Mint builds growth systems where strategy, creative, media and data work together to turn marketing spend into measurable business outcomes.</p></Reveal>
      <Reveal className="delay-3"><div className="actions"><Link to="/contact" className="button primary">Start a project <b>↗</b></Link><Link to="/case-studies" className="button ghost">See our work</Link></div></Reveal>
      <div className="scroll-cue"><span/> Scroll to explore</div>
      <div className="hero-marquee"><div>STRATEGY • CREATIVE • PERFORMANCE • DATA • GROWTH • STRATEGY • CREATIVE • PERFORMANCE • DATA • GROWTH • </div></div>
    </section>

    <section className="manifesto">
      <Reveal><div className="eyebrow">01 / THE MINDSET</div></Reveal>
      <Reveal className="delay-1"><h2>Marketing should feel less like <span>guesswork</span> and more like an unfair advantage.</h2></Reveal>
      <Reveal className="delay-2"><p>We connect the dots between what your audience sees, what they click and what your business earns.</p></Reveal>
    </section>

    <section className="section">
      <Reveal><div className="section-label">02 / WHAT WE DO</div></Reveal>
      <div className="section-title-row">
        <Reveal className="delay-1"><h2>One team.<br/><i>Every lever.</i></h2></Reveal>
        <Reveal className="delay-2"><p>From the first impression to the final conversion, we build the system around the result.</p></Reveal>
      </div>
      <div className="service-grid">
        {services.map(([n,t,d])=><Link to="/services" className="service-card" key={n}>
          <span className="service-number">{n}</span>
          <div><h3>{t}</h3><p>{d}</p></div><span className="arrow">↗</span>
        </Link>)}
      </div>
    </section>

    <section className="impact">
      <div className="impact-glow"/>
      <Reveal><div className="section-label">03 / SELECTED IMPACT</div></Reveal>
      <div className="stats">
        <Reveal><div><strong>3.2×</strong><span>ROAS</span></div></Reveal>
        <Reveal className="delay-1"><div><strong>42%</strong><span>LOWER CPA</span></div></Reveal>
        <Reveal className="delay-2"><div><strong>2.5×</strong><span>MORE LEADS</span></div></Reveal>
      </div>
    </section>

    <section className="section">
      <div className="section-title-row">
        <Reveal><div><div className="section-label">04 / SELECTED WORK</div><h2>Proof over <i>promises.</i></h2></div></Reveal>
        <Link to="/case-studies" className="text-link">View case studies ↗</Link>
      </div>
      <div className="case-grid">
        {cases.map((c,i)=><Link to="/case-studies" className="case-card" key={c.title}>
          <div className="case-top"><span>0{i+1}</span><span>{c.type}</span></div>
          <h3>{c.title}</h3>
          <div className="case-bottom"><strong>{c.result}</strong><span>{c.label}</span></div>
        </Link>)}
      </div>
    </section>

    <CTA/>
  </>
}

function PageShell({label,title,intro,children}) {
  return <>
    <section className="page-hero">
      <div className="hero-grid"/>
      <Reveal><div className="eyebrow"><span className="pulse-dot"/> {label}</div></Reveal>
      <Reveal className="delay-1"><h1>{title}</h1></Reveal>
      <Reveal className="delay-2"><p>{intro}</p></Reveal>
    </section>
    <main className="section page-content">{children}</main>
  </>
}

function Services() {
  return <PageShell label="RESULT MINT / SERVICES" title={<>Growth is a<br/><em>system.</em></>} intro="We bring acquisition, creative, analytics and conversion under one roof — with one goal: make growth more predictable.">
    <div className="service-list">
      {services.map(([n,t,d],i)=><Reveal key={n}><article><span>{n}</span><div><h2>{t}</h2><p>{d}</p><div className="tags"><span>Strategy</span><span>Testing</span><span>Optimization</span></div></div><b>↗</b></article></Reveal>)}
    </div>
    <CTA/>
  </PageShell>
}

function CaseStudies() {
  return <PageShell label="RESULT MINT / CASE STUDIES" title={<>Numbers tell<br/><em>the story.</em></>} intro="A few example outcomes. These are placeholders for now and should be replaced with verified Result Mint client results before publishing.">
    <div className="case-list">
      {cases.map((c,i)=><Reveal key={c.title}><article><div className="case-index">0{i+1}</div><div><span className="eyebrow">{c.type}</span><h2>{c.title}</h2><p>Challenge → strategy → testing → measurable outcome.</p></div><div className="big-number"><strong>{c.result}</strong><span>{c.label}</span></div></article></Reveal>)}
    </div>
    <CTA/>
  </PageShell>
}

function Contact() {
  return <PageShell label="RESULT MINT / CONTACT" title={<>Let's make<br/><em>something move.</em></>} intro="Tell us what you're trying to achieve. We'll bring the questions, opportunities and next steps.">
    <div className="contact-grid">
      <Reveal><div className="contact-copy"><div className="section-label">START HERE</div><h2>Have a growth problem worth solving?</h2><p>Launching, scaling or rebuilding your acquisition engine? Tell us where you are and where you want to go.</p><a href="mailto:hello@resultmint.in">hello@resultmint.in ↗</a><div className="contact-address"><span>VISIT US</span><p>BHIVE, Mahalakshmi Chambers, 29, Mahatma Gandhi Rd,<br/>next to Trinity Metro Station, opposite Kotak Bank,<br/>Yellappa Garden, Yellappa Chetty Layout,<br/>Sivanchetti Gardens, Bengaluru, Karnataka 560001</p></div></div></Reveal>
      <Reveal className="delay-1"><form onSubmit={(e)=>{e.preventDefault();alert('Your form is working. We can connect it to your preferred form service next.')}}>
        <label>Name<input required placeholder="Your name"/></label>
        <label>Work email<input required type="email" placeholder="you@company.com"/></label>
        <label>Company<input placeholder="Company name"/></label>
        <label>What are you looking to solve?<textarea rows="5" placeholder="Tell us about the project..."/></label>
        <button className="button primary" type="submit">Send enquiry <b>↗</b></button>
      </form></Reveal>
    </div>
  </PageShell>
}

function CTA() {
  return <section className="cta"><div className="cta-ring"/><div className="section-label">05 / NEXT MOVE</div><h2>Ready to make<br/><em>growth happen?</em></h2><Link to="/contact" className="button light">Let's talk <b>↗</b></Link></section>
}

function Footer() {
  return <footer><div className="footer-main"><div><div className="logo footer-logo"><img src="/result-mint-logo.png" alt="Result Mint" /><span>RESULT<span>MINT</span></span></div><p>Growth, engineered.</p></div><Link to="/contact" className="footer-cta">Start a conversation ↗</Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Result Mint</span><span>Performance marketing / Growth</span></div></footer>
}

function App() {
  const [path,setPath]=useState(window.location.pathname.replace(/\/+$/,'')||'/')
  useEffect(()=>{const fn=()=>setPath(window.location.pathname.replace(/\/+$/,'')||'/');window.addEventListener('popstate',fn);return()=>window.removeEventListener('popstate',fn)},[])
  useEffect(()=>{const els=document.querySelectorAll('.reveal');const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>obs.observe(e));return()=>obs.disconnect()},[path])
  let content=path==='/services'?<Services/>:path==='/case-studies'?<CaseStudies/>:path==='/contact'?<Contact/>:<Home/>
  return <><Nav page={path}/>{content}<Footer/></>
}

createRoot(document.getElementById('root')).render(<App/>)
