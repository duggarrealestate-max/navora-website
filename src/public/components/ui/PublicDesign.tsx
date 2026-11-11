import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ y: reduced ? 0 : 18 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay }}>{children}</motion.div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="nv-eyebrow"><span aria-hidden="true" />{children}</p>;
}

export function PageIntro({ index, eyebrow, title, children }: { index: string; eyebrow: string; title: ReactNode; children: ReactNode }) {
  return <header className="nv-page-intro nv-container"><Reveal><Eyebrow>{eyebrow}</Eyebrow><div className="nv-intro-grid"><h1>{title}</h1><div className="nv-intro-aside"><span className="nv-index" aria-hidden="true">{index} / NAVORA</span><p>{children}</p></div></div></Reveal></header>;
}

export function ActionLink({ to = '/contact', children = 'Find your first automation', secondary = false }: { to?: string; children?: ReactNode; secondary?: boolean }) {
  return <Link className={`nv-button${secondary ? ' nv-button-secondary' : ''}`} to={to}>{children}<span aria-hidden="true">↗</span></Link>;
}

export function ClosingNote({ title = 'Start with the work that gets in your way.', children = 'One practical opportunity. A connected system. More room for your team to do what matters.' }: { title?: string; children?: ReactNode }) {
  return <section className="nv-container nv-closing"><Reveal className="nv-closing-inner"><div><Eyebrow>A practical first step</Eyebrow><h2>{title}</h2><p>{children}</p></div><ActionLink /></Reveal></section>;
}

export function Status({ children, success = false }: { children: ReactNode; success?: boolean }) {
  return <span className={`nv-status${success ? ' nv-status-success' : ''}`}><span aria-hidden="true" />{children}</span>;
}
