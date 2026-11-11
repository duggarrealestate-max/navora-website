import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section, SectionHeader, FloatingOrb } from '@public/components/ui/PagePrimitives';

const systemStages = [
  { label: 'ENQUIRIES', sub: 'Capture every lead', color: '#6366f1' },
  { label: 'SALES', sub: 'Qualify and convert', color: '#8b5cf6' },
  { label: 'BOOKINGS', sub: 'Reservations & orders', color: '#06b6d4' },
  { label: 'OPERATIONS', sub: 'Workflow & delivery', color: '#10b981' },
  { label: 'CUSTOMERS', sub: 'Retain and grow', color: '#f59e0b' },
  { label: 'INSIGHTS', sub: 'Real-time visibility', color: '#ec4899' },
];

const capabilities = [
  {
    title: 'Premium Websites',
    desc: 'Bespoke digital presence designed to attract, engage and convert your ideal customers.',
    features: ['Conversion-focused design', 'Industry-specific UX', 'Performance-first build', 'CMS or headless'],
    color: '#6366f1',
  },
  {
    title: 'Customer & Trade Portals',
    desc: 'Secure, branded portals that let customers browse, order and track — without calling your team.',
    features: ['Self-service ordering', 'Account management', 'Document access', 'Role-based access'],
    color: '#8b5cf6',
  },
  {
    title: 'Enquiry & Sales Management',
    desc: 'Every enquiry captured, qualified and routed. Nothing falls through the cracks.',
    features: ['Multi-channel capture', 'AI qualification', 'Lead scoring', 'Follow-up automation'],
    color: '#06b6d4',
  },
  {
    title: 'Booking & Ordering Systems',
    desc: 'From reservations to complex orders — streamline intake with intelligent forms and workflows.',
    features: ['Smart availability', 'Quote-to-order', 'Repeat ordering', 'Status tracking'],
    color: '#10b981',
  },
  {
    title: 'Workflow Automation',
    desc: 'Routine work handled automatically. Your team focuses on exceptions and relationships.',
    features: ['Trigger-based actions', 'Task routing', 'Escalation rules', 'Audit trails'],
    color: '#f59e0b',
  },
  {
    title: 'Management Dashboards',
    desc: 'Live business visibility with real-time metrics, alerts and operational oversight.',
    features: ['KPI tracking', 'Trend analysis', 'Team performance', 'Export & reporting'],
    color: '#ec4899',
  },
];

export default function SolutionsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#05070B] text-silver antialiased">
      <div className="h-16 md:h-20" />

      {/* Hero: Connected System */}
      <Section className="pt-16 md:pt-24 pb-20 md:pb-32 overflow-hidden">
        <FloatingOrb className="-top-32 left-1/4 opacity-60" color="#6366f1" size={500} />
        <FloatingOrb className="top-20 -right-20 opacity-40" color="#8b5cf6" size={400} />

        <div className="max-w-6xl mx-auto">
          <motion.p
            className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-soft-cyan/80 uppercase mb-4 md:mb-6 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            ONE CONNECTED SYSTEM
          </motion.p>
          <motion.h1
            className="text-[clamp(36px,5vw,64px)] font-bold tracking-tight text-soft-white leading-[1.05] text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            We build connected digital systems
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-silver/60 text-center max-w-2xl mx-auto leading-relaxed mb-16"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            That help businesses attract customers, organise work and operate smoothly.
          </motion.p>

          {/* Connected system flow */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px">
              <div className="h-full bg-gradient-to-r from-transparent via-silver/15 to-transparent" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4">
              {systemStages.map((stage, i) => (
                <motion.div
                  key={stage.label}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <div
                    className="w-16 h-16 md:w-16 md:h-16 rounded-2xl border border-silver/10 bg-charcoal/40 backdrop-blur-sm flex items-center justify-center relative z-10"
                    style={{ boxShadow: `0 0 30px ${stage.color}15` }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent" />
                    <span
                      className="text-[10px] md:text-xs font-bold tracking-[0.15em] relative z-10 text-center leading-tight"
                      style={{ color: stage.color }}
                    >
                      {stage.label}
                    </span>
                  </div>
                  <span className="mt-3 text-[10px] text-silver/50">{stage.sub}</span>
                  {i < systemStages.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-2 text-silver/20">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-[-45deg]">
                        <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Capabilities */}
      <Section className="py-20 md:py-32">
        <FloatingOrb className="top-40 -left-32 opacity-40" color="#8b5cf6" size={450} />
        <SectionHeader
          eyebrow="CAPABILITIES"
          title="Built around how your business actually works"
          subtitle="Every system we design connects to the next. No handoffs, no data silos, no rekeying."
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              className="group relative rounded-2xl border border-silver/10 bg-charcoal/40 backdrop-blur-xl overflow-hidden p-6 md:p-8"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div
                  className="w-10 h-10 rounded-xl border flex items-center justify-center mb-5"
                  style={{ borderColor: `${cap.color}30`, backgroundColor: `${cap.color}10` }}
                >
                  <span className="text-sm font-bold" style={{ color: cap.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-soft-white tracking-tight mb-2">
                  {cap.title}
                </h3>
                <p className="text-sm text-silver/60 leading-relaxed mb-4">
                  {cap.desc}
                </p>
                <ul className="space-y-1.5">
                  {cap.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[11px] text-silver/50">
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: cap.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Integrations */}
      <Section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-soft-cyan/15 bg-soft-cyan/5 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-soft-cyan animate-pulse" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-soft-cyan uppercase">
              Integrations
            </span>
          </motion.div>
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-soft-white tracking-tight mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Connects to the tools you already use
          </motion.h3>
          <motion.p
            className="text-sm text-silver/60 max-w-xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We integrate with your existing platforms rather than forcing you to replace everything. Your data flows where it needs to.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {['Accounting', 'CRM', 'Payments', 'Email', 'WhatsApp', 'Maps', 'Analytics', 'Storage'].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full border border-silver/10 bg-charcoal/30 text-[11px] font-medium text-silver/60 tracking-wide"
              >
                {tool}
              </span>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-soft-white tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Ready to connect your systems?
          </motion.h3>
          <motion.p
            className="text-sm text-silver/60 mb-8 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Tell us about your business and we will design a system around it.
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
