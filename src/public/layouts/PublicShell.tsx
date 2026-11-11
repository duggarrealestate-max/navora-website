import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import '../styles/navora.css';

const links = [ ['HOME', '/'], ['SOLUTIONS', '/solutions'], ['INDUSTRIES', '/industries'], ['HOW IT WORKS', '/how-it-works'], ['ABOUT', '/about'], ['CONTACT', '/contact'] ];

export function PublicShell(): JSX.Element {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open) {
      element.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { element.close(); document.body.style.overflow = previous; toggle.current?.focus(); };
    }
    element.close();
  }, [open]);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const resize = () => { if (query.matches) setOpen(false); };
    query.addEventListener('change', resize);
    return () => query.removeEventListener('change', resize);
  }, []);
  return <MotionConfig reducedMotion="user"><div className="navora">
    <a className="nv-skip" href="#navora-main">Skip to content</a>
    <header className="nv-header"><div className="nv-header-inner">
      <Link to="/" className="nv-brand" aria-label="Navora home"><img src="/brand/navora-logo.png" alt="Navora" width="84" height="56" /></Link>
      <nav className="nv-desktop-nav" aria-label="Main navigation">{links.map(([label, to]) => <Link key={to} to={to} aria-current={pathname === to ? 'page' : undefined}>{label}</Link>)}</nav>
      <Link className="nv-header-cta" to="/contact">TELL US WHAT SLOWS YOU DOWN <span aria-hidden="true">→</span></Link>
      <button className="nv-menu-toggle" ref={toggle} aria-label="Open navigation" aria-expanded={open} aria-controls="nv-mobile-navigation" onClick={() => setOpen(true)}><span /><span /></button>
    </div></header>
    <dialog ref={dialog} id="nv-mobile-navigation" className="nv-mobile-menu" aria-label="Public navigation" onCancel={() => setOpen(false)} onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="nv-menu-top"><img src="/brand/navora-logo.png" alt="Navora" width="84" height="56" /><button className="nv-close" aria-label="Close navigation" onClick={() => setOpen(false)}>×</button></div>
      <nav aria-label="Mobile navigation">{links.map(([label, to], i) => <Link key={to} to={to} aria-current={pathname === to ? 'page' : undefined} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<span aria-hidden="true">→</span></Link>)}</nav>
      <Link className="nv-button" to="/contact" onClick={() => setOpen(false)}>TELL US WHAT SLOWS YOU DOWN <span aria-hidden="true">→</span></Link>
      <p className="nv-menu-signoff">Built around your business.</p>
    </dialog>
    <main id="navora-main" tabIndex={-1}><Outlet /></main>
    <footer className="nv-footer"><div className="nv-container"><div className="nv-footer-top"><div className="nv-footer-brand"><Link to="/" aria-label="Navora home"><img src="/brand/navora-logo.png" alt="Navora" width="66" height="44" loading="lazy" /></Link><p>Built around your business.</p></div><Link className="nv-footer-action" to="/contact">Tell us what slows you down <span aria-hidden="true">→</span></Link></div><div className="nv-footer-bottom"><nav aria-label="Footer navigation">{links.map(([label,to]) => <Link key={to} to={to}>{label}</Link>)}</nav><div className="nv-footer-legal"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><span>United Kingdom</span></div></div></div></footer>
  </div></MotionConfig>;
}

