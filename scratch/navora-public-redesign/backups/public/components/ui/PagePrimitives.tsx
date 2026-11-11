import { motion } from 'framer-motion';
import { cn } from '@design/components/utils';
interface FloatingOrbProps {
  className?: string;
  color?: string;
  size?: number;
}

export function FloatingOrb({ className = '', color = '#6366f1', size = 400 }: FloatingOrbProps): JSX.Element {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
    />
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div';
}

export function Section({ children, className = '', id, as = 'section' }: SectionProps): JSX.Element {
  const Comp = as;
  return (
    <Comp id={id} className={`relative z-20 px-6 md:px-8 ${className}`}>
      {children}
    </Comp>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, align = 'center', className = '' }: SectionHeaderProps): JSX.Element {
  return (
    <div className={`max-w-4xl mx-auto mb-12 md:mb-16 ${align === 'left' ? 'text-left mx-0' : 'text-center'} ${className}`}>
      {eyebrow && (
        <motion.p
          className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-soft-cyan/80 uppercase mb-4 md:mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className="text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-soft-white leading-[1.05]"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 md:mt-6 text-sm md:text-base text-silver/60 leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', accent = '#6366f1', hover = true }: GlassCardProps): JSX.Element {
  return (
    <motion.div
      className={cn(
        'relative rounded-2xl border border-silver/10 bg-charcoal/40 backdrop-blur-xl overflow-hidden',
        hover ? 'hover:border-silver/20 transition-colors duration-300' : '',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accent}08 0%, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface ProcessNodeProps {
  step: string;
  label: string;
  description?: string;
  active?: boolean;
  className?: string;
}

export function ProcessNode({ step, label, description, active, className = '' }: ProcessNodeProps): JSX.Element {
  return (
    <motion.div
      className={`relative flex flex-col items-center text-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={cn(
          'w-14 h-14 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center relative overflow-hidden transition-all duration-500',
          active ? 'border-soft-cyan/30 bg-soft-cyan/10' : 'border-silver/10 bg-charcoal/40'
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <span className={`text-sm font-bold tracking-wider ${active ? 'text-soft-cyan' : 'text-silver/60'}`}>
          {step}
        </span>
      </div>
      <span className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-soft-white/80 uppercase">
        {label}
      </span>
      {description && (
        <p className="mt-1.5 text-[11px] text-silver/50 max-w-[160px] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
