import type { ReactNode } from 'react';
import { cn } from './utils';
import { Badge, type BadgeVariant } from './Badge';

interface KPIProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  status?: BadgeVariant;
  className?: string;
}

export function KPI({ label, value, change, trend, icon, status = 'default', className }: KPIProps): JSX.Element {
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-text-tertiary',
  };

  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-md p-4',
        'flex items-start justify-between gap-3',
        className,
      )}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-text-primary mt-1 tracking-tight">{value}</p>
        {change && (
          <p className={cn('text-xs mt-1.5 flex items-center gap-1', trend && trendColors[trend])}>
            {trend && (
              <span className="text-xs">{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}</span>
            )}
            {change}
          </p>
        )}
      </div>
      {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
      {status !== 'default' && (
        <Badge variant={status} size="sm" className="ml-auto mt-1">
          {status}
        </Badge>
      )}
    </div>
  );
}
