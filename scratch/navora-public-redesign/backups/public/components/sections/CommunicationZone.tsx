import { motion } from 'framer-motion';
import { ServiceZone } from '@public/components/sections/ServiceZone';

const messages = [
  { label: 'FOLLOW-UP SENT', desc: 'Checking in after service', delay: 0, color: '#6366f1' },
  { label: 'FEEDBACK RECEIVED', desc: 'Customer replied positively', delay: 0.12, color: '#8b5cf6' },
  { label: 'REVIEW REQUESTED', desc: 'Automated prompt sent', delay: 0.24, color: '#06b6d4' },
  { label: 'REMINDER SCHEDULED', desc: 'For next appointment', delay: 0.36, color: '#10b981' },
  { label: 'RE-ENGAGEMENT', desc: 'Offer sent to repeat customer', delay: 0.48, color: '#22c55e' },
];

export function CommunicationZone(): JSX.Element {
  return (
    <ServiceZone
      headline="RETAIN"
      subheadline="Support, reminders, and feedback. Keep your customers engaged and coming back."
    >
      <div className="max-w-lg mx-auto space-y-2.5">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.label}
            className="flex items-center gap-4 p-4 rounded-xl border border-silver/8 bg-charcoal/25 backdrop-blur-sm group"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: msg.delay }}
          >
            <div
              className="w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0"
              style={{ borderColor: `${msg.color}30`, backgroundColor: `${msg.color}10` }}
            >
              <span className="text-[10px] font-bold" style={{ color: msg.color }}>{i + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-soft-white/85 tracking-wide">{msg.label}</p>
              <p className="text-[11px] text-silver/50 mt-0.5">{msg.desc}</p>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-soft-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </ServiceZone>
  );
}
