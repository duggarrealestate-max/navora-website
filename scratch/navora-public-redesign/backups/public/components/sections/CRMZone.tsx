import { motion } from 'framer-motion';
import { ServiceZone } from '@public/components/sections/ServiceZone';

const cards = [
  { status: 'TASK APPEARS', color: '#6366f1', count: 12, desc: 'Incoming' },
  { status: 'INFO CHECKED', color: '#8b5cf6', count: 8, desc: 'Verified' },
  { status: 'RECORD UPDATED', color: '#06b6d4', count: 5, desc: 'System synced' },
  { status: 'TEAM NOTIFIED', color: '#10b981', count: 3, desc: 'Assigned' },
  { status: 'COMPLETED', color: '#22c55e', count: 24, desc: 'Done' },
];

export function CRMZone(): JSX.Element {
  return (
    <ServiceZone
      headline="DELIVER"
      subheadline="Internal task coordination, scheduling, and operational updates handled automatically."
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto">
        {cards.map((card, i) => (
          <motion.div
            key={card.status}
            className="relative p-4 rounded-xl border border-silver/10 bg-charcoal/30 backdrop-blur-sm group overflow-hidden"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div
              className="w-2 h-2 rounded-full mb-3"
              style={{ backgroundColor: card.color, boxShadow: `0 0 8px ${card.color}50` }}
            />
            <p className="text-[9px] font-semibold tracking-[0.2em] text-silver/50 uppercase mb-1">
              {card.status}
            </p>
            <p className="text-2xl font-bold text-soft-white tracking-tight">{card.count}</p>
            <p className="text-[10px] text-silver/45 mt-1">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </ServiceZone>
  );
}
