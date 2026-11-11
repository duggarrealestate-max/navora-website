import { motion } from 'framer-motion';

export function HeroSection(): JSX.Element {
  return (
    <section data-scroll-zone className="relative z-20 min-h-[100svh] flex items-center px-6 md:px-8 lg:px-16">
      <div className="w-full flex flex-col justify-center h-full pt-24 md:pt-0">
        {/* Top nav spacer */}
        <div className="h-16 md:h-20" />

        {/* Main hero composition: left content, centre symbol, right interfaces */}
        <div className="w-full max-w-[1440px] mx-auto mb-8 md:mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT — eyebrow, headline, supporting text, CTAs */}
            <div className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1">
              <motion.p
                className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-soft-cyan/80 uppercase mb-4 md:mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
              >
                INTELLIGENT BUSINESS SYSTEMS
              </motion.p>

              <motion.h1
                className="text-[clamp(36px,4vw,72px)] font-bold tracking-tighter text-soft-white leading-[1.0] whitespace-normal min-[1440px]:whitespace-nowrap"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.9, delay: 0.35 },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <span>WE BUILD </span>
                <span className="bg-gradient-to-r from-soft-cyan to-electric-violet bg-clip-text text-transparent">FOR THE FUTURE.</span>
              </motion.h1>

              <motion.p
                className="mt-4 md:mt-6 text-sm md:text-base text-silver/60 leading-relaxed max-w-[460px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55 }}
              >
                Intelligent systems and automation that help your business attract, engage, convert, deliver, retain and grow.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mt-6 md:mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.75 }}
              >
                <a
                  href="#final-cta"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wider text-graphite bg-soft-white rounded-full hover:bg-silver transition-colors"
                >
                  EXPLORE SOLUTIONS
                  <span className="text-electric-violet transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="#web-design"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wider text-soft-white/80 border border-silver/15 rounded-full hover:border-silver/40 hover:bg-silver/5 transition-all"
                >
                  HOW IT WORKS
                </a>
              </motion.div>
            </div>

            {/* RIGHT — floating digital interfaces */}
            <div className="lg:col-span-4 xl:col-span-3 order-3 hidden lg:block relative">
              <FloatingHeroInterfaces />
            </div>
          </div>
        </div>

        {/* Bottom row — website previews + scroll cue */}
        <div className="absolute bottom-8 md:bottom-12 left-6 md:left-8 lg:left-16 right-6 md:right-8 lg:right-16">
          <div className="max-w-[1440px] mx-auto flex items-end justify-between">
            <FloatingWebsitePreviews />
            <motion.div
              className="hidden md:flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
            >
              <span className="text-[10px] font-semibold tracking-[0.25em] text-silver/40 uppercase" style={{ writingMode: 'vertical-rl' }}>
                Scroll to explore
              </span>
              <motion.div
                className="w-px h-8 bg-gradient-to-b from-silver/30 to-transparent"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


function FloatingHeroInterfaces(): JSX.Element {
  return (
    <div className="relative h-[420px]">
      {/* Card 1 - Analytics */}
      <motion.div
        className="absolute top-0 right-0 w-64 p-5 rounded-2xl border border-silver/10 bg-charcoal/40 backdrop-blur-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ duration: 7, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <p className="text-[9px] font-semibold tracking-[0.25em] text-silver/50 uppercase mb-3">Business Overview</p>
        <div className="space-y-2.5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-silver/50">Leads</p>
              <p className="text-lg font-semibold text-soft-white">1,247</p>
            </div>
            <div className="w-8 h-8 rounded-lg border border-silver/10 bg-charcoal/30 flex items-center justify-center">
              <div className="w-4 h-4 rounded border border-soft-cyan/30 bg-soft-cyan/10" />
            </div>
          </div>
          <div className="h-8 flex items-end gap-0.5">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-soft-cyan/20" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Card 2 - AI Enquiry */}
      <motion.div
        className="absolute top-44 left-0 w-60 p-5 rounded-2xl border border-silver/10 bg-charcoal/40 backdrop-blur-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ duration: 7.5, delay: 0.7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <p className="text-[9px] font-semibold tracking-[0.25em] text-electric-violet uppercase mb-3">New Enquiry</p>
        <div className="space-y-3 text-left">
          <div>
            <p className="text-[9px] text-silver/50 mb-1">Customer</p>
            <p className="text-xs text-soft-white/85 italic">"I'm interested in your services."</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-electric-violet/40 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-electric-violet animate-pulse" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-electric-violet/40 to-transparent" />
          </div>
          <div>
            <p className="text-[9px] text-soft-cyan/70 mb-1">AI Response</p>
            <p className="text-xs text-soft-cyan/90">"Great — tell me what you need help with."</p>
          </div>
        </div>
      </motion.div>

      {/* Card 3 - Automation */}
      <motion.div
        className="absolute bottom-0 right-8 w-56 p-5 rounded-2xl border border-silver/10 bg-charcoal/40 backdrop-blur-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{ duration: 6.5, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <p className="text-[9px] font-semibold tracking-[0.25em] text-soft-cyan/80 uppercase mb-3">Automation</p>
        <div className="space-y-2 text-[11px]">
          {['NEW LEAD', 'AI RESPONSE', 'CRM', 'APPOINTMENT'].map((step) => (
            <div key={step} className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-soft-cyan/80" />
              <span className="text-silver/70">{step}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FloatingWebsitePreviews(): JSX.Element {
  const items = [
    { title: 'REAL ESTATE', color: '#6366f1', lines: ['Property enquiries', 'Buyer requirements', 'Viewing coordination'] },
    { title: 'RESTAURANTS', color: '#06b6d4', lines: ['Reservations', 'Customer questions', 'Confirmations'] },
    { title: 'RETAIL & WHOLESALE', color: '#10b981', lines: ['Retailer enquiries', 'Order workflows', 'Sales follow-up'] },
  ];

  return (
    <div className="flex items-end gap-3 md:gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          className="w-28 md:w-36 aspect-[4/3] rounded-xl border border-silver/10 bg-charcoal/40 backdrop-blur-md overflow-hidden"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          transition={{ duration: 6, delay: 1.2 + i * 0.12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="h-3 bg-charcoal/60 border-b border-silver/10 flex items-center px-1.5 gap-0.5">
            <span className="w-1 h-1 rounded-full bg-silver/20" />
            <span className="w-1 h-1 rounded-full bg-silver/20" />
            <span className="w-1 h-1 rounded-full bg-silver/20" />
          </div>
          <div className="p-2 space-y-1">
            <p className="text-[7px] md:text-[8px] font-semibold tracking-widest text-soft-white/70">{item.title}</p>
            <div className="w-full h-6 rounded bg-gradient-to-br from-white/5 to-transparent border border-silver/5" />
            <div className="space-y-0.5">
              {item.lines.map((line, lineIndex) => (
                <div key={line} className="h-0.5 rounded-full bg-silver/8" style={{ width: `${60 + ((i * 11 + lineIndex * 7 + 13) % 30)}%` }} />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
