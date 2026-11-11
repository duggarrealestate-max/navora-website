import { cn } from '@design/components/utils';
import type { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Header({ title, subtitle, action, children, className }: HeaderProps): JSX.Element {
  return (
    <div className={cn('flex items-start sm:items-center justify-between gap-4 mb-6', className)}>
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-text-primary tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-text-secondary mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps): JSX.Element {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div>
        <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
        {description && <p className="text-xs text-text-tertiary mt-0.5">{description}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

interface StatGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 2 | 3 | 4 | 5;
}

export function StatGrid({ children, className, cols = 4 }: StatGridProps): JSX.Element {
  const colClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  };
  return (
    <div className={cn('grid gap-3', colClasses[cols], className)}>
      {children}
    </div>
  );
}
