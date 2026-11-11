import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@design/components/utils';

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'SOLUTIONS', href: '/solutions' },
  { label: 'INDUSTRIES', href: '/industries' },
  { label: 'HOW IT WORKS', href: '/how-it-works' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

export function PublicShell(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070B] text-silver antialiased">
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'top-4 mx-4 md:mx-8 rounded-2xl bg-charcoal/60 backdrop-blur-2xl border border-silver/8'
            : 'top-0 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-8">
              <a
                href="/"
                className="flex items-center flex-shrink-0"
                aria-label="Navora — home"
              >
                <img
                  src="/brand/navora-logo.png"
                  alt="Navora"
                  className="h-12 md:h-14 lg:h-16 w-auto object-contain"
                  loading="eager"
                  decoding="async"
                />
              </a>
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = link.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={cn(
                        'px-3 py-2 text-[11px] font-medium tracking-wider transition-colors',
                        isActive ? 'text-soft-white' : 'text-silver/50 hover:text-soft-white'
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-soft-cyan"
                          layoutId="nav-indicator"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="hidden md:block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider text-graphite bg-soft-white rounded-full hover:bg-silver transition-colors"
              >
                START A PROJECT
                <span className="text-electric-violet">→</span>
              </Link>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-8 h-8 flex items-center justify-center text-soft-white"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <motion.span
                className="absolute w-5 h-px bg-soft-white"
                animate={{
                  rotate: mobileOpen ? 45 : 0,
                  y: mobileOpen ? 0 : -4,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute w-5 h-px bg-soft-white"
                animate={{
                  opacity: mobileOpen ? 0 : 1,
                  scaleX: mobileOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute w-5 h-px bg-soft-white"
                animate={{
                  rotate: mobileOpen ? -45 : 0,
                  y: mobileOpen ? 0 : 4,
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-graphite/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-4 right-4 bg-charcoal/90 backdrop-blur-2xl border border-silver/10 rounded-2xl p-6"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = link.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={cn(
                        'block px-4 py-3 rounded-xl text-sm font-medium tracking-wider transition-all',
                        isActive
                          ? 'text-soft-white bg-white/5'
                          : 'text-silver/60 hover:text-soft-white hover:bg-white/[0.02]'
                      )}
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  to="/contact"
                  className="mt-4 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold tracking-wider text-graphite bg-soft-white rounded-xl hover:bg-silver transition-colors"
                >
                  START A PROJECT
                  <span className="text-electric-violet">→</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative"><Outlet /></main>

      <footer className="relative z-20 border-t border-silver/8 bg-charcoal/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <img
                src="/brand/navora-logo.png"
                alt="Navora"
                className="h-10 md:h-12 w-auto object-contain mb-4"
                loading="lazy"
                decoding="async"
              />
              <p className="text-[11px] text-silver/50 leading-relaxed max-w-xs">
                The beginning of a new era.
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-silver/40 uppercase mb-3">Navigate</p>
              <nav className="space-y-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-[11px] text-silver/50 hover:text-soft-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="md:col-span-2">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-silver/40 uppercase mb-3">Legal</p>
              <nav className="space-y-1.5">
                <Link to="/privacy" className="block text-[11px] text-silver/50 hover:text-soft-white transition-colors">Privacy</Link>
                <Link to="/terms" className="block text-[11px] text-silver/50 hover:text-soft-white transition-colors">Terms</Link>
              </nav>
            </div>
            <div className="md:col-span-4">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-silver/40 uppercase mb-3">Contact</p>
              <div className="space-y-1.5">
                <p className="text-[11px] text-silver/50">United Kingdom</p>
                <p className="text-[11px] text-silver/50">Via contact form</p>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-silver/8 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[10px] text-silver/30">Navora. All rights reserved.</p>
            <p className="text-[10px] text-silver/30">Built in the United Kingdom.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

