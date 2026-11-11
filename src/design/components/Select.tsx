import type { SelectHTMLAttributes } from 'react';
import { useId } from 'react';
import { cn } from './utils';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  placeholder?: string;
}

export function Select({ label, error, placeholder, className, id, ...props }: SelectProps): JSX.Element {
  const generatedId = useId();
  const selectId = id || generatedId;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            'w-full bg-surface border border-border rounded-md',
            'px-3 py-2 text-sm appearance-none',
            'text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
            'transition-all duration-150',
            error && 'border-error focus:ring-error',
            className,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {props.children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}
