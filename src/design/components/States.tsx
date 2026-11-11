import type { ReactNode } from 'react';
import { cn } from './utils';

interface LoadingStateProps {
  message?: string;
  className?: string;
  rows?: number;
}

export function LoadingState({ message = 'Loading...', rows = 3, className }: LoadingStateProps): JSX.Element {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <p className="text-sm text-text-secondary">{message}</p>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-surface-hover rounded animate-pulse"
          style={{ width: `${80 - i * 10}%` }}
        />
      ))}
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = 'No data yet',
  description = 'There\'s nothing to show here.',
  icon,
  action,
  className,
}: EmptyStateProps): JSX.Element {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      {icon && <div className="mb-4 text-6xl opacity-30">{icon}</div>}
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary mt-1 max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred.',
  onRetry,
  className,
}: ErrorStateProps): JSX.Element {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="mb-4 text-4xl opacity-30">⚠</div>
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary mt-1 max-w-sm">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 px-4 py-2 text-sm bg-primary text-background rounded-md hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      )}
    </div>
  );
}
