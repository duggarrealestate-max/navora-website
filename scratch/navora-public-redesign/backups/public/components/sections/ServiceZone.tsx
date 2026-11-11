import { motion } from 'framer-motion';

interface ServiceZoneProps {
  headline: string;
  subheadline?: string;
  children: React.ReactNode;
  className?: string;
}

export function ServiceZone({ headline, subheadline, children, className = '' }: ServiceZoneProps): JSX.Element {
  return (
    <section
      data-scroll-zone
      className={`relative z-20 min-h-screen flex items-center justify-center px-6 md:px-8 ${className}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-soft-white leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-150px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {headline}
        </motion.h2>
        {subheadline && (
          <motion.p
            className="text-base md:text-lg text-silver/60 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {subheadline}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
