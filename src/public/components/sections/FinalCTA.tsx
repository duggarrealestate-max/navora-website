import { motion } from 'framer-motion';

export function FinalCTA(): JSX.Element {
  return (
    <section
      data-scroll-zone
      className="relative z-20 min-h-screen flex items-center justify-center px-6 md:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-soft-white leading-[0.95] mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-150px' }}
          transition={{ duration: 0.9 }}
        >
          WHAT COULD
          <br />
          YOUR BUSINESS
          <br />
          DO AUTOMATICALLY?
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-silver/50 max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Tell us what slows your business down.
          <br />
          We will design the system around it.
        </motion.p>

        <motion.a
          href="/contact"
          className="group inline-flex items-center gap-3 px-9 py-4 text-sm font-semibold tracking-wider text-graphite bg-soft-white rounded-full hover:bg-silver transition-colors"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          START YOUR PROJECT
          <span className="text-electric-violet transition-transform group-hover:translate-x-0.5">→</span>
        </motion.a>
      </div>
    </section>
  );
}
