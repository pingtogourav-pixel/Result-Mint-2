import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { company, services, industries, brands, testimonials, cases, companyStory } from './data.js';

const pathName = () => window.location.pathname.replace(/\/+$/, '') || '/';

function usePath() {
  const [path, setPath] = useState(pathName());
  useEffect(() => {
    const onChange = () => setPath(pathName());
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);
  return path;
}

function Link({ to, children, className = '', onClick }) {
  const handle = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
    onClick?.();
  };
  return <a href={to} className={className} onClick={handle}>{children}</a>;
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('visible');
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function slugify(value) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/\//g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function Logo() {
  return <Link to="/" className="brand" aria-label="Result Mint home">
    <img src="/result-mint-logo.svg" alt="Result Mint" />
  </Link>;
}

function Header({ path }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const active = (target) => path === target || path.startsWith(`${target}/`);
  return <header className="header">
    <div className="header-inner">
      <Logo />
      <button className={`hamb ${open ? 'open' : ''}`} onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>
        <span/><span/><span/>
      </button>
      <nav className={open ? 'open' : ''}>
        <Link to="/" className={active('/') ? 'active' : ''}>Home</Link>
        <Link to="/services" className={active('/services') ? 'active' : ''}>Services</Link>
        <Link to="/case-studies" className={active('/case-studies') ? 'active' : ''}>Case Studies</Link>
        <Link to="/industries" className={active('/industries') ? 'active' : ''}>Industries</Link>
        <Link to="/clients" className={active('/clients') ? 'active' : ''}>Clients</Link>
        <Link to="/about" className={active('/about') ? 'active' : ''}>About</Link>
        <Link to="/contact" className="nav-cta">Let’s Talk <b>↗</b></Link>
      </nav>
    </div>
  </header>;
}

function PageHero({ kicker, title, intro }) {
  return <section className="page-hero">
    <div className="page-grid"/><div className="page-glow"/>
    <div className="page-hero-inner">
      <Reveal><div className="kicker"><i/> {kicker}</div></Reveal>
      <Reveal className="delay-1"><h1>{title}</h1></Reveal>
      <Reveal className="delay-2"><p>{intro}</p></Reveal>
    </div>
  </section>;
}

function CTA({ title = <>Let’s make<br/><em>something move.</em></> }) {
  return <section className="mega-cta">
    <div className="cta-glow"/>
    <Reveal><div className="section-label">READY TO MOVE</div><h2>{title}</h2><p>Tell us what you’re trying to achieve. We’ll start with the business problem, not a media plan.</p><Link to="/contact" className="btn lime">Start a conversation ↗</Link></Reveal>
  </section>;
}

function Footer() {
  return <footer>
    <div className="footer-grid">
      <div><Logo/><p>Performance marketing, creator-led growth and measurement built around outcomes.</p></div>
      <div><span>EXPLORE</span><Link to="/services">Services</Link><Link to="/case-studies">Case Studies</Link><Link to="/industries">Industries</Link><Link to="/clients">Clients</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></div>
      <div><span>CONTACT</span><div className="footer-contact-links"><a href={`tel:${company.phone}`}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a></div><p>Bengaluru, India</p></div>
    </div>
    <div className="footer-bottom"><small>© {new Date().getFullYear()} Result Mint</small><small>Since 2019 · Growth, engineered.</small></div>
  </footer>;
}

function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setQuoteIndex(v => (v + 1) % testimonials.length), 6500);
    return () => clearInterval(id);
  }, []);
  const q = testimonials[quoteIndex];
  return <>
    <section className="hero">
      <div className="hero-grid"/><div className="hero-glow"/>
      <div className="hero-inner">
        <Reveal><div className="kicker"><i/> PERFORMANCE / GROWTH / DATA</div></Reveal>
        <Reveal className="delay-1"><h1>We don’t chase<br/><span>attention.</span><br/><em>We chase results.</em></h1></Reveal>
        <Reveal className="delay-2"><p>Result Mint builds measurable growth systems across performance marketing, creator partnerships, analytics and conversion.</p></Reveal>
        <Reveal className="delay-3"><div className="hero-actions"><Link to="/contact" className="btn lime">Start a conversation ↗</Link><Link to="/case-studies" className="btn dark">Explore our work ↗</Link></div></Reveal>
      </div>
      <div className="hero-scroll">SCROLL ↓</div>
    </section>

    <section className="stats-wrap"><div className="section-shell"><div className="section-label">RESULT MINT / AT A GLANCE</div><div className="stats-row">
      {[[company.since,'Operating since'],[company.campaigns,'Campaigns managed'],[company.budget,'Budget handled'],[company.team,'Team members']].map(([v,l]) => <div key={l}><strong>{v}</strong><span>{l}</span></div>)}
    </div></div></section>

    <section className="section-shell credibility"><Reveal><div className="section-label">BRANDS WE’VE WORKED WITH</div><h2>Built alongside brands<br/><em>that expect more.</em></h2><p className="section-intro">A selection of brands we’ve partnered with across performance, creator and growth programs.</p></Reveal><div className="brand-wall">{brands.map((b,i)=><Reveal key={b}><span style={{'--d': `${i*70}ms`}}>{b}</span></Reveal>)}</div></section>

    <section className="manifesto"><div className="section-shell"><Reveal><div className="section-label">THE RESULT MINT STANDARD</div><h2>{companyStory.belief}</h2><p>Creativity earns attention. Data tells us what to do with it. Performance proves whether it worked.</p></Reveal></div></section>

    <section className="section-shell services-teaser"><Reveal><div className="split-head"><div><div className="section-label">WHAT WE DO</div><h2>Growth is a<br/><em>system.</em></h2></div><Link to="/services" className="text-link">View all 12 services ↗</Link></div></Reveal><div className="service-grid">{services.slice(0,6).map(([t,d],i)=><Reveal key={t}><Link to={`/services/${slugify(t)}`} className="service-card"><small>0{i+1}</small><h3>{t}</h3><p>{d}</p><b>↗</b></Link></Reveal>)}</div></section>

    <section className="section-shell system-band"><Reveal><div className="section-label">THE GROWTH SYSTEM</div><h2>Connect acquisition,<br/><em>creative, data & conversion.</em></h2></Reveal><div className="system-steps">{[['01','Acquire','Paid media, search, creators and lead generation.'],['02','Create','Creative systems that earn attention and keep testing.'],['03','Measure','GA4, analytics and attribution that show the signal.'],['04','Convert','CRO, landing pages and checkout experiences built to move.']].map(([n,t,d])=><Reveal key={n}><div><span>{n}</span><h3>{t}</h3><p>{d}</p></div></Reveal>)}</div></section>

    <section className="section-shell industries-preview"><Reveal><div className="section-label">INDUSTRIES</div><h2>Experience across<br/><em>fast-moving markets.</em></h2></Reveal><div className="industry-grid">{industries.map((x,i)=><Link key={x} to={`/industries/${slugify(x)}`}><span>{String(i+1).padStart(2,'0')}</span>{x}<b>↗</b></Link>)}</div></section>

    <section className="section-shell results-preview"><Reveal><div className="split-head"><div><div className="section-label">SELECTED RESULTS</div><h2>Proof over<br/><em>promises.</em></h2></div><Link to="/case-studies" className="text-link">Explore all case studies ↗</Link></div></Reveal><div className="result-grid">{cases.map((c,i)=><Reveal key={c.slug}><Link to={`/case-studies/${c.slug}`} className="result-card"><small>0{i+1} / {c.type}</small><h3>{c.client}</h3><p>{c.title}</p><span>Open full case study ↗</span></Link></Reveal>)}</div></section>

    <section className="testimonial-band"><div className="section-shell"><Reveal><div className="section-label">CLIENT VOICE</div><div className="testimonial"><div className="quote">“</div><blockquote>{q[1]}</blockquote><strong>{q[0]}</strong><div className="quote-nav"><button onClick={() => setQuoteIndex((quoteIndex - 1 + testimonials.length) % testimonials.length)}>←</button><span>{String(quoteIndex + 1).padStart(2,'0')} / {String(testimonials.length).padStart(2,'0')}</span><button onClick={() => setQuoteIndex((quoteIndex + 1) % testimonials.length)}>→</button></div></div></Reveal></div></section>

    <section className="section-shell about-teaser"><Reveal><div className="section-label">ABOUT RESULT MINT</div><h2>Built for brands<br/><em>ready to scale.</em></h2><div className="about-copy"><p>{companyStory.why}</p><p>{companyStory.problem}</p></div><Link to="/about" className="text-link">Our story ↗</Link></Reveal></section>
    <CTA/>
  </>;
}

function Services() {
  return <><PageHero kicker="RESULT MINT / SERVICES" title={<>Everything growth<br/><em>needs to work.</em></>} intro="From acquisition to attribution, Result Mint connects the parts of growth that are too often treated separately."/>
    <section className="section-shell service-directory"><Reveal><div className="directory-grid">{services.map(([t,d],i)=><Link key={t} to={`/services/${slugify(t)}`} className="directory-card"><span>{String(i+1).padStart(2,'0')}</span><div><h2>{t}</h2><p>{d}</p><small>Explore capability ↗</small></div></Link>)}</div></Reveal></section>
    <section className="section-shell process"><Reveal><div className="section-label">OUR APPROACH</div><h2>Diagnose. Build. Test.<br/><em>Scale. Optimize.</em></h2></Reveal><div className="process-grid">{[['01','Diagnose','Understand the business, funnel, economics and measurement gaps.'],['02','Build','Bring strategy, creative, media and tracking into one system.'],['03','Test','Run structured experiments and learn from the signal.'],['04','Scale','Double down on what works and protect efficiency.'],['05','Optimize','Keep improving the system as the business evolves.']].map(([n,t,d])=><Reveal key={n}><div className="process-card"><span>{n}</span><h3>{t}</h3><p>{d}</p></div></Reveal>)}</div></section><CTA/>
  </>;
}

function ServiceDetail({ name }) {
  const item = services.find(s => slugify(s[0]) === name);
  if (!item) return <NotFound/>;
  const [title, desc] = item;
  const related = services.filter(s => s[0] !== title).slice(0,4);
  return <><PageHero kicker={`RESULT MINT / ${title.toUpperCase()}`} title={<>{title}<br/><em>built to perform.</em></>} intro={desc}/>
    <section className="section-shell detail-intro"><div className="detail-two"><Reveal><div><div className="section-label">WHAT IT MEANS</div><h2>One capability.<br/><em>Connected to the system.</em></h2><p>We approach {title.toLowerCase()} as part of the wider growth engine—connected to creative, measurement, conversion and business outcomes.</p></div></Reveal><Reveal><div className="highlight-panel"><span>RESULT MINT / {title.toUpperCase()}</span><strong>Strategy → Execution → Measurement → Optimization</strong><p>Built around clarity, testing and accountability.</p></div></Reveal></div></section>
    <section className="section-shell related"><Reveal><div className="section-label">MORE CAPABILITIES</div><h2>Keep the system<br/><em>connected.</em></h2></Reveal><div className="related-grid">{related.map(([t])=><Link key={t} to={`/services/${slugify(t)}`}><span>↗</span><b>{t}</b></Link>)}</div></section><CTA/>
  </>;
}

function CaseStudies() {
  return <><PageHero kicker="RESULT MINT / CASE STUDIES" title={<>Proof, not<br/><em>promises.</em></>} intro="Five detailed examples of creator-led and performance-focused growth work. Open each one for the full story."/><section className="section-shell case-directory"><div className="case-stack">{cases.map((c,i)=><Reveal key={c.slug}><Link to={`/case-studies/${c.slug}`} className="case-line"><span>0{i+1}</span><div><small>{c.type}</small><h2>{c.client}</h2><p>{c.title}</p></div><b>View case study ↗</b></Link></Reveal>)}</div></section><CTA/></>;
}

function CaseDetail({ slug }) {
  const c = cases.find(x => x.slug === slug);
  if (!c) return <NotFound/>;
  return <><PageHero kicker={`CASE STUDY / ${c.type}`} title={<>{c.client}<br/><em>{c.title}</em></>} intro="The challenge, the system and the outcome."/>
    <section className="section-shell case-detail"><Link to="/case-studies" className="back">← Back to case studies</Link><div className="detail-two"><Reveal><div><div className="section-label">THE CHALLENGE</div><p className="lead">{c.problem}</p></div></Reveal><Reveal><div><div className="section-label">SERVICES USED</div><div className="chips">{c.services.map(s=><span key={s}>{s}</span>)}</div></div></Reveal></div><div className="detail-two second"><Reveal><div><div className="section-label">WHAT RESULT MINT DID</div><p>{c.approach}</p></div></Reveal><Reveal><div className="outcome"><div className="section-label">THE OUTCOME</div><h2>{c.result}</h2></div></Reveal></div><Reveal><div className="detail-quote"><div className="quote">“</div><blockquote>{c.quote}</blockquote><strong>{c.client}</strong></div></Reveal></section><CTA/>
  </>;
}

function Industries() {
  return <><PageHero kicker="RESULT MINT / INDUSTRIES" title={<>Growth across<br/><em>fast-moving markets.</em></>} intro="Experience across the categories where acquisition, retention and conversion matter every day."/><section className="section-shell industries-page"><div className="industry-directory">{industries.map((x,i)=><Reveal key={x}><Link to={`/industries/${slugify(x)}`}><span>{String(i+1).padStart(2,'0')}</span><h2>{x}</h2><p>Growth systems tailored to the economics, customer journey and pace of this market.</p><b>Explore industry ↗</b></Link></Reveal>)}</div></section><CTA/></>;
}

function IndustryDetail({ name }) {
  const label = industries.find(x => slugify(x) === name);
  if (!label) return <NotFound/>;
  return <><PageHero kicker={`RESULT MINT / ${label.toUpperCase()}`} title={<>{label}<br/><em>with the right growth system.</em></>} intro="We combine acquisition, creative, measurement and conversion around the realities of this market."/><section className="section-shell detail-intro"><div className="detail-two"><Reveal><div><div className="section-label">MARKET LENS</div><h2>Different markets.<br/><em>Different signals.</em></h2><p>Our work starts with the economics and customer journey of the category—not a one-size-fits-all channel checklist.</p></div></Reveal><Reveal><div className="highlight-panel"><span>RESULT MINT / INDUSTRY</span><strong>{label}</strong><p>Acquisition, measurement, creative and conversion connected into one system.</p></div></Reveal></div></section><section className="section-shell related"><Reveal><div className="section-label">RELEVANT SERVICES</div><h2>The growth stack<br/><em>around the category.</em></h2></Reveal><div className="related-grid">{services.slice(0,6).map(([t])=><Link key={t} to={`/services/${slugify(t)}`}><span>↗</span><b>{t}</b></Link>)}</div></section><CTA/></>;
}

function Clients() {
  return <><PageHero kicker="RESULT MINT / CLIENTS" title={<>Built with brands<br/><em>that expect more.</em></>} intro="A selection of brands we’ve worked with across performance, creator and growth programs."/><section className="section-shell client-page"><div className="client-list">{brands.map((x,i)=><Reveal key={x}><div className="client-row"><span>{String(i+1).padStart(2,'0')}</span><h2>{x}</h2><Link to="/case-studies">View work ↗</Link></div></Reveal>)}</div></section><section className="testimonial-band"><div className="section-shell"><div className="section-label">CLIENT VOICE</div><div className="client-quotes">{testimonials.slice(0,6).map(([b,q])=><Reveal key={b}><blockquote>“{q}”<footer>{b}</footer></blockquote></Reveal>)}</div></div></section><CTA/></>;
}

function About() {
  return <><PageHero kicker="RESULT MINT / ABOUT" title={<>Built for brands<br/><em>ready to scale.</em></>} intro="Result Mint started in 2019 with a simple observation: great-looking marketing doesn’t always create great business outcomes."/><section className="section-shell about-page"><div className="story-block"><Reveal><div className="section-label">WHY WE EXIST</div><h2>Closing the gap between<br/><em>attention and action.</em></h2><p>{companyStory.why}</p><p>{companyStory.problem}</p></Reveal></div><div className="belief-grid">{[['Creativity','Earns attention.'],['Data','Tells us what to do with it.'],['Performance','Proves whether it worked.']].map(([t,d])=><Reveal key={t}><div><strong>{t}</strong><p>{d}</p></div></Reveal>)}</div><Reveal><div className="vision"><div className="section-label">WHERE WE’RE GOING</div><h2>To become the<br/><em>gold standard for growth.</em></h2><p>{companyStory.vision}</p></div></Reveal><div className="about-stats">{[[company.team,'Team members'],[company.campaigns,'Campaigns managed'],[company.budget,'Budget handled']].map(([v,l])=><div key={l}><strong>{v}</strong><span>{l}</span></div>)}</div></section><CTA/></>;
}

function Contact() {
  const [sent,setSent] = useState(false);
  return <><PageHero kicker="RESULT MINT / CONTACT" title={<>Let’s make<br/><em>something move.</em></>} intro="Tell us what you’re trying to achieve. We’ll start with the business problem, not a media plan."/><section className="section-shell contact-page"><div className="contact-grid"><Reveal><div className="contact-info"><div className="section-label">GET IN TOUCH</div><div className="contact-links"><a className="phone" href={`tel:${company.phone}`}>{company.phone} ↗</a><a className="email" href={`mailto:${company.email}`}>{company.email} ↗</a></div><div className="address"><small>VISIT US</small><p>{company.address}</p></div></div></Reveal><Reveal><form onSubmit={e=>{e.preventDefault();setSent(true);}}><label>Name *<input required name="name" placeholder="Your name"/></label><label>Work email *<input required type="email" name="email" placeholder="you@company.com"/></label><label>Company *<input required name="company" placeholder="Company name"/></label><label>Website<input name="website" placeholder="https://"/></label><label>What can we help with? *<select required name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.map(([x])=><option key={x}>{x}</option>)}</select></label><label>Tell us about your goals *<textarea required name="message" rows="6" placeholder="What are you trying to achieve?"></textarea></label><button className="btn lime" type="submit">{sent ? 'Enquiry saved ↗' : 'Send enquiry ↗'}</button><small className="form-note">The form is ready for a Formspree or backend connection later without redesigning this page.</small></form></Reveal></div></section></>;
}

function NotFound() { return <div className="notfound"><div className="section-label">404</div><h1>That page<br/><em>doesn’t exist.</em></h1><Link to="/" className="btn lime">Back home ↗</Link></div>; }

function App() {
  const path = usePath();
  let view;
  if (path === '/') view = <Home/>;
  else if (path === '/services') view = <Services/>;
  else if (path.startsWith('/services/')) view = <ServiceDetail name={path.split('/')[2]}/>;
  else if (path === '/case-studies') view = <CaseStudies/>;
  else if (path.startsWith('/case-studies/')) view = <CaseDetail slug={path.split('/')[2]}/>;
  else if (path === '/industries') view = <Industries/>;
  else if (path.startsWith('/industries/')) view = <IndustryDetail name={path.split('/')[2]}/>;
  else if (path === '/clients') view = <Clients/>;
  else if (path === '/about') view = <About/>;
  else if (path === '/contact') view = <Contact/>;
  else view = <NotFound/>;
  return <><Header path={path}/><main>{view}</main><Footer/></>;
}

createRoot(document.getElementById('root')).render(<App/>);
