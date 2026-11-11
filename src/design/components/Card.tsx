import type { ReactNode } from 'react';
import { cn } from './utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevated?: boolean;
}

const paddingClasses = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({
  children,
  className,
  onClick,
  hover = false,
  padding = 'md',
  elevated = false,
}: CardProps): JSX.Element {
  return (
    <div
      className={cn(
        'bg-surface border border-border',
        'rounded-md',
        'transition-all duration-200',
        paddingClasses[padding],
        elevated && 'shadow-lg',
        onClick && 'cursor-pointer',
        hover && 'hover:border-border-hover hover:shadow-md cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
