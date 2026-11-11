import { motion } from 'framer-motion';
import { cn } from '@design/components/utils';

interface FloatingPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  x?: number;
  y?: number;
  rotation?: number;
  delay?: number;
  accent?: string;
}

export function FloatingPanel({
  title,
  children,
  className = '',
  x = 0,
  y = 0,
  rotation = 0,
  delay = 0,
  accent = '#6366f1',
}: FloatingPanelProps): JSX.Element {
  return (
    <motion.div
      className={cn(
        'relative w-60 md:w-64 p-4 rounded-xl border border-silver/10 bg-charcoal/50 backdrop-blur-lg',
        'shadow-[0_0_30px_rgba(99,102,241,0.06)]',
        className
      )}
      initial={{ opacity: 0, x, y, rotate: rotation }}
      animate={{
        opacity: 1,
        x: [x - 4, x + 4, x - 4],
        y: [y - 3, y + 3, y - 3],
        rotate: [rotation - 0.3, rotation + 0.3, rotation - 0.3],
      }}
      transition={{
        duration: 7,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-electric-violet/5 via-transparent to-soft-cyan/5 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent" />
      <h4 className="relative text-[9px] font-semibold tracking-[0.25em] uppercase mb-2.5" style={{ color: accent }}>
        {title}
      </h4>
      <div className="relative text-[11px] text-silver/75 leading-relaxed space-y-1.5">
        {children}
      </div>
    </motion.div>
  );
}

export function FloatingInterface(): JSX.Element {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <FloatingPanel
        title="NEW ENQUIRY"
        x={100}
        y={70}
        rotation={-1.5}
        delay={0.2}
        accent="#6366f1"
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-soft-cyan" />
            <span className="text-soft-white/85">Customer message received</span>
          </div>
          <p className="text-silver/60 italic text-[10px] pl-3">"I'm interested in your services."</p>
          <div className="h-px bg-silver/10 my-1.5" />
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-electric-violet" />
            <span className="text-soft-cyan/90">AI responding...</span>
          </div>
        </div>
      </FloatingPanel>

      <FloatingPanel
        title="CRM LEAD"
        x={-130}
        y={150}
        rotation={1.2}
        delay={0.5}
        accent="#8b5cf6"
      >
        <div className="flex items-center justify-between">
          <span className="text-soft-white/90 text-[11px] font-medium">NEW LEAD</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-soft-cyan/10 text-soft-cyan border border-soft-cyan/20">Qualified</span>
        </div>
        <p className="text-silver/50 text-[10px] mt-1.5">Follow-up scheduled automatically</p>
      </FloatingPanel>

      <FloatingPanel
        title="AUTOMATION"
        x={160}
        y={240}
        rotation={-0.8}
        delay={0.8}
        accent="#06b6d4"
      >
        <div className="space-y-1 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-soft-cyan shadow-[0_0_4px_#06b6d4]" />
            <span className="text-silver/75">Lead Captured</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-electric-violet shadow-[0_0_4px_#8b5cf6]" />
            <span className="text-silver/75">AI Response Sent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-soft-cyan shadow-[0_0_4px_#06b6d4]" />
            <span className="text-silver/75">CRM Updated</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-electric-violet shadow-[0_0_4px_#8b5cf6]" />
            <span className="text-silver/75">Appointment Set</span>
          </div>
        </div>
      </FloatingPanel>

      <FloatingPanel
        title="DASHBOARD"
        x={-90}
        y={360}
        rotation={1.5}
        delay={1.1}
        accent="#10b981"
      >
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <p className="text-[9px] text-silver/45 uppercase tracking-wider">Leads</p>
            <p className="text-base font-semibold text-soft-white mt-0.5 tracking-tight">1,247</p>
          </div>
          <div>
            <p className="text-[9px] text-silver/45 uppercase tracking-wider">Appointments</p>
            <p className="text-base font-semibold text-soft-white mt-0.5 tracking-tight">384</p>
          </div>
          <div className="col-span-2">
            <p className="text-[9px] text-silver/45 uppercase tracking-wider">Conversion</p>
            <p className="text-base font-semibold text-soft-cyan mt-0.5 tracking-tight">28.4%</p>
          </div>
        </div>
      </FloatingPanel>
    </div>
  );
}
