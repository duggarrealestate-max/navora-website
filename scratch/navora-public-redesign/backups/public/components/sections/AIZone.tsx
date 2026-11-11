import { motion } from 'framer-motion';
import { ServiceZone } from '@public/components/sections/ServiceZone';

export function AIZone(): JSX.Element {
  return (
    <ServiceZone
      headline="ENGAGE"
      subheadline="Fast responses, understanding needs, and collecting information without human effort."
    >
      <div className="relative max-w-2xl mx-auto">
        <div className="p-6 md:p-8 rounded-2xl border border-silver/10 bg-charcoal/30 backdrop-blur-md">
          <div className="space-y-5 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-soft-cyan" />
                <p className="text-[9px] font-semibold tracking-[0.25em] text-silver/50 uppercase">Customer Enquiry</p>
              </div>
              <p className="text-sm text-soft-white/85 italic pl-3.5">"Do you have availability next Tuesday?"</p>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-electric-violet/40 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-electric-violet animate-pulse" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-electric-violet/40 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-violet" />
                <p className="text-[9px] font-semibold tracking-[0.25em] text-soft-cyan/80 uppercase">System Response</p>
              </div>
              <p className="text-sm text-soft-cyan/90 pl-3.5">"Yes, we have 2:00 PM or 4:00 PM. Which works best for you?"</p>
            </motion.div>

            <motion.div
              className="mt-5 p-4 rounded-xl bg-soft-cyan/8 border border-soft-cyan/15"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.2em] text-soft-cyan uppercase">Information Collected</p>
                  <p className="text-[11px] text-silver/60 mt-1">Ready for the next step</p>
                </div>
                <div className="w-8 h-8 rounded-lg border border-soft-cyan/20 bg-soft-cyan/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-soft-cyan">OK</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ServiceZone>
  );
}
