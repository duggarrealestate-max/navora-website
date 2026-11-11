import { motion } from 'framer-motion';
import { cn } from '@design/components/utils';

interface FloatingTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function FloatingText({
  text,
  className = '',
  delay = 0,
  duration = 4,
  yOffset = 8,
}: FloatingTextProps): JSX.Element {
  return (
    <motion.span
      className={cn('inline-block text-soft-white/90', className)}
      animate={{
        y: [-yOffset, yOffset, -yOffset],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {text}
    </motion.span>
  );
}
