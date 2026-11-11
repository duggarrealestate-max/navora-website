import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section, SectionHeader, FloatingOrb } from '@public/components/ui/PagePrimitives';

const industries = [
  {
    id: 'wholesale',
    title: 'Wholesale & Manufacturing',
    subtitle: 'Trade-first digital infrastructure',
    description: 'Trade-account applications, product catalogues, customer-specific pricing, repeat orders, quotation workflows and stock visibility.',
    color: '#6366f1',
    examples: [
      'Trade-account applications',
      'Product catalogue',
      'Customer-specific pricing',
      'Repeat orders',
      'Quotation workflow',
      'Order updates',
      'Stock visibility',
      'Sales follow-up',
    ],
    accent: 'from-indigo-500/10 via-transparent to-transparent',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    subtitle: 'Buyer qualification and property matching',
    description: 'Buyer qualification, property matching, viewing coordination, follow-up automation and advisor dashboards.',
    color: '#8b5cf6',
    examples: [
      'Buyer qualification',
      'Property matching',
      'Viewing coordination',
      'Follow-up',
      'Advisor dashboard',
    ],
    accent: 'from-violet-500/10 via-transparent to-transparent',
  },
  {
    id: 'hospitality',
    title: 'Restaurants & Hospitality',
    subtitle: 'Reservations and guest communication',
    description: 'Reservations, guest questions, confirmations, customer communication and feedback collection.',
    color: '#06b6d4',
    examples: [
      'Reservations',
      'Guest questions',
      'Confirmations',
      'Customer communication',
      'Feedback',
    ],
    accent: 'from-cyan-500/10 via-transparent to-transparent',
  },
  {
    id: 'retail',
    title: 'Retail & E-commerce',
    subtitle: 'Product discovery and customer retention',
    description: 'Product discovery, order communication, customer support, retention programmes and insights.',
    color: '#10b981',
    examples: [
      'Product discovery',
      'Order communication',
      'Customer support',
      'Retention',
      'Insights',
    ],
    accent: 'from-emerald-500/10 via-transparent to-transparent',
  },
];

export default function IndustriesPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#05070B] text-silver antialiased">
      <div className="h-16 md:h-20" />

      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <FloatingOrb className="-top-20 left-1/3 opacity-50" color="#6366f1" size={500} />
        <FloatingOrb className="top-10 -right-20 opacity-30" color="#8b5cf6" size={400} />
        <SectionHeader
          eyebrow="INDUSTRIES"
          title="Built for how your industry actually works"
          subtitle="We design systems around the specific workflows, terminology and expectations of each sector."
        />
      </Section>

      {/* Industry cards */}
      <Section className="pb-20 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.id}
              className="group relative rounded-2xl border border-silver/10 bg-charcoal/40 backdrop-blur-xl overflow-hidden"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${industry.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10 p-6 md:p-8">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-soft-white tracking-tight mb-1">
                      {industry.title}
                    </h3>
                    <p className="text-[11px] font-medium tracking-wider text-silver/50 uppercase">
                      {industry.subtitle}
                    </p>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                    style={{
                      backgroundColor: industry.color,
                      boxShadow: `0 0 12px ${industry.color}60`,
                    }}
                  />
                </div>
                <p className="text-sm text-silver/60 leading-relaxed mb-6">
                  {industry.description}
                </p>
                <div className="space-y-2">
                  {industry.examples.map((example) => (
                    <div key={example} className="flex items-center gap-2.5">
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: industry.color }}
                      />
                      <span className="text-[11px] text-silver/60">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Wholesale emphasis */}
      <Section className="pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative rounded-3xl border border-indigo-500/15 bg-charcoal/40 backdrop-blur-xl overflow-hidden p-8 md:p-12"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/8 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#6366f1', boxShadow: '0 0 10px #6366f180' }}
                />
                <span className="text-[10px] font-semibold tracking-[0.25em] text-indigo-400 uppercase">
                  Primary Focus
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-soft-white tracking-tight mb-3">
                Wholesale & Manufacturing
              </h3>
              <p className="text-sm text-silver/60 leading-relaxed mb-6 max-w-2xl">
                Our deepest expertise is in wholesale. We understand trade-account dynamics, product catalogues, customer-specific pricing, repeat-order patterns and the speed at which wholesale teams need to move.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Trade Accounts', 'Product Catalogues', 'Pricing Rules', 'Repeat Orders', 'Quotations', 'Stock Visibility'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg border border-indigo-500/15 bg-indigo-500/5 text-[11px] font-medium text-indigo-300 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
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
            Which industry describes you best?
          </motion.h3>
          <motion.p
            className="text-sm text-silver/60 mb-8 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Every conversation starts with understanding your specific workflow.
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
