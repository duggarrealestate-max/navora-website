import { motion } from 'framer-motion';
import { ServiceZone } from '@public/components/sections/ServiceZone';

const steps = [
  { label: 'CUSTOMER ENQUIRY', color: '#6366f1', icon: '○' },
  { label: 'REQUEST UNDERSTOOD', color: '#8b5cf6', icon: '◇' },
  { label: 'DETAILS COLLECTED', color: '#06b6d4', icon: '△' },
  { label: 'REPLY OR BOOKING', color: '#10b981', icon: '□' },
  { label: 'CUSTOMER DETAILS SAVED', color: '#f59e0b', icon: '⬡' },
  { label: 'TEAM SEES RESULT', color: '#22c55e', icon: '◆' },
];

export function AutomationZone(): JSX.Element {
  return (
    <ServiceZone
      headline="CONVERT"
      subheadline="Help customers take the next step. Prepare a reply or booking, and ask your team to approve important decisions."
    >
      <div className="relative z-20 max-w-6xl mx-auto overflow-hidden rounded-2xl border border-silver/20 p-5 md:p-8" style={{ backgroundColor: '#111214' }}>
        <div className="overflow-x-auto pb-3 -mx-2 px-2">
        <div className="min-w-[760px] flex items-start justify-center gap-2 md:gap-3">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.div
                className="flex-1 min-w-0 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-silver/10 bg-charcoal/40 backdrop-blur-sm flex items-center justify-center relative overflow-hidden"
                  style={{ boxShadow: `0 0 25px ${step.color}15` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <span className="text-lg md:text-xl font-light text-soft-white/90 relative z-10">{step.icon}</span>
                </div>
                <span className="text-[9px] font-semibold tracking-[0.12em] text-silver/70 uppercase mt-2 text-center leading-tight max-w-[150px]">{step.label}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden md:block flex-none w-10 h-px mt-10"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.08 + 0.3 }}
                  style={{ backgroundColor: step.color, opacity: 0.5 }}
                />
              )}
            </div>
          ))}
        </div>
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <div className="relative w-full max-w-md h-1 rounded-full bg-charcoal/60 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-electric-violet via-soft-cyan to-soft-cyan"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </ServiceZone>
  );
}
