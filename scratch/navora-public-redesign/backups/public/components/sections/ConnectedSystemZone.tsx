import { motion } from 'framer-motion';
import { ServiceZone } from '@public/components/sections/ServiceZone';

const systems = [
  { label: 'YOUR TASK', color: '#6366f1' },
  { label: 'YOUR PROCESS', color: '#8b5cf6' },
  { label: 'YOUR SYSTEM', color: '#06b6d4' },
  { label: 'AUTOMATED', color: '#10b981' },
];

export function ConnectedSystemZone(): JSX.Element {
  return (
    <ServiceZone
      headline="WHAT TAKES TOO MUCH OF YOUR TIME?"
      subheadline="Every business works differently. Show us the task, process or workflow slowing you down and we'll design the system around how your business actually works."
    >
      <div className="relative max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {systems.map((sys, i) => (
            <motion.div
              key={sys.label}
              className="flex items-center gap-3 md:gap-4"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div
                className="relative px-4 py-2.5 md:px-5 md:py-3 rounded-xl border border-silver/10 bg-charcoal/40 backdrop-blur-sm overflow-hidden"
                style={{ boxShadow: `0 0 20px ${sys.color}12` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-soft-white relative z-10">
                  {sys.label}
                </span>
              </div>
              {i < systems.length - 1 && (
                <div className="hidden md:block w-5 h-px bg-gradient-to-r from-silver/25 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-10 p-5 md:p-6 rounded-2xl border border-electric-violet/15 bg-charcoal/25 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm md:text-base text-silver/60 leading-relaxed text-center max-w-xl mx-auto">
              Automated where it makes sense. Human when it matters. Our systems perform routine work, notify staff, escalate exceptions, and hand over smoothly when needed.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider text-graphite bg-soft-white rounded-full hover:bg-silver transition-colors"
            >
              SHOW US WHAT YOU WANT TO AUTOMATE
              <span className="text-electric-violet transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </ServiceZone>
  );
}
