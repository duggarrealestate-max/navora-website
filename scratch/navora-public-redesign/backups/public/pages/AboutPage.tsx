import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section, SectionHeader, FloatingOrb } from '@public/components/ui/PagePrimitives';

const principles = [
  {
    title: 'Understand first',
    description: 'We listen more than we pitch. Before suggesting solutions, we learn how your business actually operates.',
    color: '#6366f1',
  },
  {
    title: 'Keep it practical',
    description: 'No over-engineering. Every feature is built because it solves a real problem, not because it looks impressive in a demo.',
    color: '#8b5cf6',
  },
  {
    title: 'Build for growth',
    description: 'Your business will change. Our systems are designed to grow with you, not lock you into a rigid structure.',
    color: '#06b6d4',
  },
  {
    title: 'Honest delivery',
    description: 'We set realistic expectations and meet them. No inflated timelines, no hidden costs, no surprises.',
    color: '#10b981',
  },
  {
    title: 'Direct relationship',
    description: 'From discovery to delivery, you work with the people building your system. No account managers, no handoffs.',
    color: '#f59e0b',
  },
];

export default function AboutPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#05070B] text-silver antialiased">
      <div className="h-16 md:h-20" />

      {/* Hero */}
      <Section className="pt-16 md:pt-24 pb-20 md:pb-28">
        <FloatingOrb className="-top-32 left-1/4 opacity-60" color="#6366f1" size={500} />
        <FloatingOrb className="top-20 -right-20 opacity-40" color="#8b5cf6" size={400} />

        <div className="max-w-4xl mx-auto">
          <motion.p
            className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-soft-cyan/80 uppercase mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            ABOUT NAVORA
          </motion.p>
          <motion.h1
            className="text-[clamp(36px,5vw,56px)] font-bold tracking-tight text-soft-white leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            The beginning of a new era.
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-silver/60 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Navora exists to close the gap between an impressive digital presence and the everyday systems a business needs to run well.
          </motion.p>
        </div>
      </Section>

      {/* Founder */}
      <Section className="pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative rounded-3xl border border-silver/10 bg-charcoal/40 backdrop-blur-xl overflow-hidden"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="flex-1">
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-soft-cyan/80 uppercase mb-4">
                    Founder
                  </p>
                  <h3 className="text-2xl font-bold text-soft-white tracking-tight mb-1">
                    Vikrant Chib
                  </h3>
                  <p className="text-sm text-silver/50 mb-6">United Kingdom</p>
                  <div className="space-y-4 text-sm text-silver/60 leading-relaxed">
                    <p>
                      Navora was founded on a simple observation: most businesses have a strong public face but fragile internal systems.
                    </p>
                    <p>
                      The website looks impressive. The marketing is on point. But behind the scenes, teams are juggling spreadsheets, manual emails, and disconnected tools. Growth is slowed by operational friction rather than a lack of demand.
                    </p>
                    <p>
                      We build systems that remove that friction.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-px md:bg-silver/10 md:py-8" />
                <div className="flex-1">
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-electric-violet uppercase mb-4">
                    Background
                  </p>
                  <div className="space-y-4 text-sm text-silver/60 leading-relaxed">
                    <p>
                      With experience spanning digital product design and business operations, Vikrant has worked with organisations across retail, wholesale, property and professional services.
                    </p>
                    <p>
                      The common thread: businesses that had outgrown their internal tools but did not know where to start.
                    </p>
                    <p>
                      Navora is the answer to that gap — honest, practical, and built for real businesses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Principles */}
      <Section className="pb-20 md:pb-32">
        <FloatingOrb className="top-20 -left-20 opacity-30" color="#8b5cf6" size={400} />
        <SectionHeader
          eyebrow="PRINCIPLES"
          title="How we work"
          subtitle="These are not values on a wall. They are how we show up every day."
        />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              className="rounded-2xl border border-silver/10 bg-charcoal/40 backdrop-blur-xl p-6 md:p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div
                className="w-8 h-8 rounded-lg border flex items-center justify-center mb-4"
                style={{ borderColor: `${principle.color}30`, backgroundColor: `${principle.color}10` }}
              >
                <span className="text-xs font-bold" style={{ color: principle.color }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h4 className="text-base font-semibold text-soft-white tracking-tight mb-2">
                {principle.title}
              </h4>
              <p className="text-sm text-silver/60 leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Philosophy */}
      <Section className="pb-20 md:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.blockquote
            className="text-2xl md:text-3xl font-medium text-soft-white/90 tracking-tight leading-snug mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            "The best system is the one your team actually uses — because it was built around them, not around software."
          </motion.blockquote>
          <motion.p
            className="text-sm text-silver/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            — Vikrant Chib, Founder
          </motion.p>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-soft-white tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            The beginning of a new era.
          </motion.h3>
          <motion.p
            className="text-sm text-silver/60 mb-8 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let us build the system your business deserves.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-wider text-graphite bg-soft-white rounded-full hover:bg-silver transition-colors"
            >
              START A PROJECT
              <span className="text-electric-violet transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
