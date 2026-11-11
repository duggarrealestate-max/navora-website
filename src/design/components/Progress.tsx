import type { ReactNode } from 'react';
import { cn } from './utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  _size?: 'sm' | 'md';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export function ProgressBar({
  value,
  max = 100,
  className,
  _size = 'md',
  variant = 'default',
}: ProgressBarProps): JSX.Element {
  const percent = Math.min((value / max) * 100, 100);
  const variantColor: Record<string, string> = {
    default: 'bg-text-secondary',
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };

  return (
    <div className={cn('w-full bg-background-secondary rounded-md overflow-hidden', className)}>
      <div
        className={cn(
          'h-2 transition-all duration-300',
          variantColor[variant],
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressRing({
  value,
  max = 100,
  size = 24,
  strokeWidth = 3,
  className,
}: ProgressRingProps): JSX.Element {
  const percent = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const offset = circumference - (circumference * percent) / 100;

  return (
    <svg
      width={size}
      height={size}
      className={cn('transform -rotate-90', className)}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="var(--color-border)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="var(--color-primary)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ label, value, icon, className }: StatCardProps): JSX.Element {
  return (
    <div className={cn('bg-surface border border-border rounded-md p-4 text-center', className)}>
      {icon && <div className="mb-2 flex justify-center opacity-70">{icon}</div>}
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-sm text-text-secondary mt-1">{label}</p>
    </div>
  );
}
