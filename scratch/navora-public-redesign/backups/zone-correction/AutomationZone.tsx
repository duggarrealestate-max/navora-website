import { motion } from 'framer-motion';
import { ServiceZone } from '@public/components/sections/ServiceZone';

const steps = [
  { label: 'CUSTOMER ENQUIRY', color: '#6366f1', icon: '○' },
  { label: 'NEED UNDERSTOOD', color: '#8b5cf6', icon: '◇' },
  { label: 'INFO COLLECTED', color: '#06b6d4', icon: '△' },
  { label: 'ACTION / BOOKING', color: '#10b981', icon: '□' },
  { label: 'RECORD UPDATED', color: '#f59e0b', icon: '⬡' },
  { label: 'OWNER SEES RESULT', color: '#22c55e', icon: '◆' },
];

export function AutomationZone(): JSX.Element {
  return (
    <ServiceZone
      headline="CONVERT"
      subheadline="Qualify, recommend, and book. Seamlessly hand over to your team when it matters."
    >
      <div className="relative max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.div
                className="flex flex-col items-center"
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
                <span className="text-[9px] font-semibold tracking-[0.2em] text-silver/60 uppercase mt-2">{step.label}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden md:block w-10 h-px mx-2"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.08 + 0.3 }}
                  style={{ backgroundColor: step.color, opacity: 0.5 }}
                />
              )}
              {i < steps.length - 1 && (
                <motion.div
                  className="md:hidden w-px h-5 mx-auto my-1.5"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: i * 0.08 + 0.3 }}
                  style={{ backgroundColor: step.color, opacity: 0.5 }}
                />
              )}
            </div>
          ))}
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
