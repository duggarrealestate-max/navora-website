import { useRef, type ReactNode } from 'react';
import { useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../styles/system-experience.css';

/** Isolated subpage atmosphere; never mounted by the homepage. */
export function SystemPage({ children, quiet = false, className = '' }: { children: ReactNode; quiet?: boolean; className?: string }) {
  return <div className={`nx-page ${quiet ? 'nx-quiet' : ''} ${className}`}><div className="nx-atmosphere" aria-hidden="true"><i /><i /><i /></div><div className="nx-content">{children}</div></div>;
}
export function SystemIntro({ number, label, title, children }: { number: string; label: string; title: ReactNode; children: ReactNode }) {
  return <header className="nv-container nx-intro"><div className="nx-kicker"><span>{number} / NAVORA</span><span>{label}</span></div><div className="nx-intro-row"><h1>{title}</h1><p>{children}</p></div></header>;
}
export function Signal({ children }: { children: ReactNode }) { return <span className="nx-signal"><i aria-hidden="true" />{children}</span>; }
export function SystemFrame({ children, className = '', label }: { children: ReactNode; className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: .1 });
  return <div ref={ref} className={`nx-frame ${className}`} data-visible={visible}><div className="nx-frame-bar"><span><b aria-hidden="true">⌘</b> {label}</span><Signal>Illustrative example</Signal></div>{children}</div>;
}
export function SystemClose({ title = 'Start with one useful change.', children = 'Bring the work that slows you down. We will explore the strongest first opportunity together.' }: { title?: string; children?: ReactNode }) {
  return <section className="nv-container nx-close"><div><p className="nx-label">NEXT / YOUR BUSINESS</p><h2>{title}</h2><p>{children}</p></div><Link className="nx-button" to="/contact">Tell us what slows you down <span aria-hidden="true">↗</span></Link></section>;
}
export function RecordLines({ lines }: { lines: string[] }) { return <ul className="nx-record">{lines.map((line, index) => <li key={line}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{line}</li>)}</ul>; }
