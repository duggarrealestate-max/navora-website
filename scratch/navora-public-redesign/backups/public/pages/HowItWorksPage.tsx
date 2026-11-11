import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Section, SectionHeader, FloatingOrb } from '@public/components/ui/PagePrimitives';
import { Link } from 'react-router-dom';

const stages = [
  {
    num: '01',
    title: 'UNDERSTAND',
    subtitle: 'Learn how your business really works',
    description: 'We start by listening. Not just what you say you need, but how your team actually operates day-to-day. Where are the bottlenecks? What takes too long? What falls through the cracks?',
    details: ['Stakeholder interviews', 'Process observation', 'Bottleneck mapping', 'Pain-point prioritisation'],
    color: '#6366f1',
  },
  {
    num: '02',
    title: 'MAP',
    subtitle: 'Design the blueprint for your system',
    description: 'We translate what we learned into a clear system architecture. Every handoff, every data flow, every touchpoint with your customer is mapped before we write a single line of code.',
    details: ['Workflow diagrams', 'Data flow design', 'Interface wireframes', 'Integration plan'],
    color: '#8b5cf6',
  },
  {
    num: '03',
    title: 'DESIGN',
    subtitle: 'Shape interfaces that feel natural',
    description: 'The system should work the way your team thinks. We design interfaces that match your terminology, your priorities and your customers expectations.',
    details: ['UI/UX design', 'Brand alignment', 'Accessibility review', 'Prototype testing'],
    color: '#06b6d4',
  },
  {
    num: '04',
    title: 'BUILD',
    subtitle: 'Construct the system in focused sprints',
    description: 'We build in transparent, reviewable stages. You see progress every week. Change is expected and accommodated. Nothing ships without your sign-off.',
    details: ['Iterative development', 'Weekly demos', 'Continuous feedback', 'Quality assurance'],
    color: '#10b981',
  },
  {
    num: '05',
    title: 'CONNECT',
    subtitle: 'Link to the tools you already use',
    description: 'Your new system should work alongside what you already have. We connect accounting, CRM, email, maps, payment systems and whatever else your business relies on.',
    details: ['API integrations', 'Data migration', 'Third-party sync', 'Security review'],
    color: '#f59e0b',
  },
  {
    num: '06',
    title: 'LAUNCH',
    subtitle: 'Go live with confidence and support',
    description: 'Launch day is just the start. We stay close through the critical first weeks, making sure the system performs and your team is confident using it.',
    details: ['Controlled rollout', 'Team training', 'Performance monitoring', 'Ongoing support'],
    color: '#ec4899',
  },
];

export default function HowItWorksPage(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="min-h-screen bg-[#05070B] text-silver antialiased" ref={containerRef}>
      <div className="h-16 md:h-20" />

      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <FloatingOrb className="-top-20 left-1/4 opacity-50" color="#6366f1" size={500} />
        <FloatingOrb className="top-10 -right-20 opacity-30" color="#8b5cf6" size={400} />
        <SectionHeader
          eyebrow="THE PROCESS"
          title="Start with the strongest bottleneck, prove the value, then connect more."
        />
      </Section>

      {/* Journey timeline */}
      <Section className="pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto relative">
          {/* Progress line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-silver/8">
            <motion.div
              className="w-full bg-gradient-to-b from-soft-cyan via-electric-violet to-soft-cyan"
              style={{ scaleY: lineProgress, transformOrigin: 'top' }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.num}
                className="relative md:pl-24"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
              >
                {/* Timeline node */}
                <div className="hidden md:flex absolute left-5 top-6 w-6 h-6 rounded-full border-2 border-charcoal items-center justify-center"
                  style={{ borderColor: `${stage.color}50`, backgroundColor: `${stage.color}15` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color, boxShadow: `0 0 8px ${stage.color}80` }} />
                </div>

                <div className="rounded-2xl border border-silver/10 bg-charcoal/40 backdrop-blur-xl overflow-hidden">
                  <div className="relative p-6 md:p-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="text-xs font-bold tracking-wider"
                          style={{ color: stage.color }}
                        >
                          {stage.num}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-silver/15 to-transparent" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-soft-white tracking-tight mb-1">
                        {stage.title}
                      </h3>
                      <p className="text-sm font-medium text-silver/50 mb-3">
                        {stage.subtitle}
                      </p>
                      <p className="text-sm text-silver/60 leading-relaxed mb-5">
                        {stage.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {stage.details.map((detail) => (
                          <span
                            key={detail}
                            className="px-3 py-1.5 rounded-lg border border-silver/10 bg-charcoal/30 text-[11px] text-silver/50"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Principle */}
      <Section className="pb-20 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="relative rounded-3xl border border-electric-violet/15 bg-charcoal/40 backdrop-blur-xl overflow-hidden p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-violet/8 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-electric-violet uppercase mb-4">
                Our approach
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-soft-white tracking-tight mb-4">
                Start with the strongest bottleneck, prove the value, then connect more.
              </h3>
              <p className="text-sm text-silver/60 leading-relaxed max-w-xl mx-auto">
                We do not rebuild everything at once. We identify the one area that will deliver the clearest return, fix it first, then expand from a position of proven value.
              </p>
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
            Where should we start?
          </motion.h3>
          <motion.p
            className="text-sm text-silver/60 mb-8 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Tell us about your biggest operational bottleneck and we will show you how to solve it.
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
