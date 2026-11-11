import { motion } from 'framer-motion';
import { ServiceZone } from '@public/components/sections/ServiceZone';

const metrics = [
  { label: 'PENDING WORK', value: '—', color: '#6366f1', trend: 'Example' },
  { label: 'OPPORTUNITIES', value: '—', color: '#06b6d4', trend: 'Example' },
  { label: 'NEXT STEPS', value: '—', color: '#8b5cf6', trend: 'Example' },
  { label: 'ACTIVE TASKS', value: '—', color: '#10b981', trend: 'Example' },
];

export function DashboardZone(): JSX.Element {
  return (
    <ServiceZone
      headline="GROW"
      subheadline="See what is working, what needs attention and where your team could save more time."
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-4xl mx-auto">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="relative p-5 rounded-2xl border border-silver/10 bg-charcoal/30 backdrop-blur-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <p className="text-[9px] font-semibold tracking-[0.25em] text-silver/45 uppercase mb-3">
              {metric.label}
            </p>
            <p
              className="text-3xl md:text-4xl font-bold text-soft-white tracking-tight"
              style={{ textShadow: `0 0 20px ${metric.color}30` }}
            >
              {metric.value}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] font-medium text-soft-cyan/80">{metric.trend}</span>
              <span className="text-[9px] text-silver/40">view only</span>
            </div>
          </motion.div>
        ))}
      </div>
    </ServiceZone>
  );
}
