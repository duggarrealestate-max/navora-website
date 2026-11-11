import { useState, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { cn } from './utils';

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  onSearch?: (val: string) => void;
  className?: string;
  debounceMs?: number;
}

export function Search({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSearch,
  className,
  debounceMs = 300,
}: SearchProps): JSX.Element {
  const [internal, setInternal] = useState(value);

  useEffect(() => {
    setInternal(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInternal(e.target.value);
    onChange?.(e.target.value);
  };

  useEffect(() => {
    if (!onSearch) return;
    const timer = setTimeout(() => onSearch(internal), debounceMs);
    return () => clearTimeout(timer);
  }, [internal, onSearch, debounceMs]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(internal);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <input
        type="search"
        value={internal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          'w-full bg-surface border border-border rounded-md',
          'pl-10 pr-3 py-2 text-sm',
          'text-text-primary placeholder:text-text-tertiary',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
          'transition-colors',
        )}
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
        🔍
      </span>
    </div>
  );
}
