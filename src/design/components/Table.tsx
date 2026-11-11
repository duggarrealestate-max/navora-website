import type { ReactNode, ThHTMLAttributes, HTMLAttributes, TdHTMLAttributes } from 'react';
import { cn } from './utils';

interface TableProps {
  children: ReactNode;
  className?: string;
  _stickyHeader?: boolean;
}

export function Table({ children, className, _stickyHeader }: TableProps): JSX.Element {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto',
        'border border-border rounded-md',
        'bg-surface',
        className,
      )}
    >
      <table className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  );
}

interface TableHeadProps {
  children: ReactNode;
  sticky?: boolean;
}

export function TableHead({ children, sticky }: TableHeadProps): JSX.Element {
  return (
    <thead className={cn(sticky && 'sticky top-0 bg-surface-tertiary z-10')}>
      {children}
    </thead>
  );
}

interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

export function TableHeader({ children, sortable, sorted, onSort, className, ...props }: TableHeaderProps): JSX.Element {
  return (
    <th
      className={cn(
        'text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider',
        'border-b border-border',
        sortable && 'cursor-pointer select-none hover:text-text-primary transition-colors',
        sorted === 'asc' && 'text-primary',
        sorted === 'desc' && 'text-primary',
        className,
      )}
      onClick={sortable && onSort ? onSort : undefined}
      {...props}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortable && sorted && (
          <span className="text-xs">{sorted === 'asc' ? '↑' : '↓'}</span>
        )}
      </div>
    </th>
  );
}

export function TableBody({ children }: { children: ReactNode }): JSX.Element {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  hover?: boolean;
}

export function TableRow({ children, hover, className, ...props }: TableRowProps): JSX.Element {
  return (
    <tr
      className={cn(
        hover && 'hover:bg-surface-hover transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className, ...props }: TdHTMLAttributes<HTMLTableCellElement>): JSX.Element {
  return (
    <td className={cn('py-3 px-4', className)} {...props}>
      {children}
    </td>
  );
}
