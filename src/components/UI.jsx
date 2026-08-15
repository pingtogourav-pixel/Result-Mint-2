import React from 'react';import {Link} from 'react-router-dom';import {ArrowUpRight,Check,Sparkles} from 'lucide-react';
export const Reveal=({children,className=''})=><div className={'reveal '+className}>{children}</div>;
export const Eyebrow=({children})=><div className="eyebrow">{children}</div>;
export const Button=({to,children,variant='primary'})=><Link className={'btn '+variant} to={to}>{children}<ArrowUpRight size={16}/></Link>;
export const SectionHead=({eyebrow,title,copy})=><div className="sectionhead"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>;
export const Metric=({v,l,accent})=><div className={'metric '+(accent?'accent':'')}><strong>{v}</strong><span>{l}</span></div>;
export const ServiceCard=({i,title,copy,items,to})=><Reveal><div className="servicecard"><div className="service-no">0{i}</div><h3>{title}</h3><p>{copy}</p><div className="pills">{items.map(x=><span key={x}>{x}</span>)}</div><Link className="arrow" to={to}>Explore service <ArrowUpRight size={15}/></Link></div></Reveal>;
export const List=({items})=><ul className="list">{items.map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul>;
export const Badge=({children})=><span className="badge"><Sparkles size={13}/>{children}</span>;
