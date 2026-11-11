import { createContext, useContext, type ReactNode } from 'react';
import { cn } from './utils';

interface TabsContext {
  value: string;
  onValueChange: (val: string) => void;
}

const TabsContext = createContext<TabsContext | undefined>(undefined);

function useTabsContext(): TabsContext {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsTrigger/TabsContent must be used within Tabs');
  return ctx;
}

interface TabsProps {
  value: string;
  onValueChange: (val: string) => void;
  children: ReactNode;
  className?: string;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps): JSX.Element {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn('space-y-4', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: TabsListProps): JSX.Element {
  return (
    <div
      className={cn(
        'flex items-center gap-1 p-1 bg-background-secondary rounded-md',
        'border border-border',
        className,
      )}
      role="tablist"
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className, disabled }: TabsTriggerProps): JSX.Element {
  const { value: selected, onValueChange } = useTabsContext();
  const isActive = selected === value;

  return (
    <button
      type="button"
      role="tab"
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={cn(
        'px-4 py-2 text-sm font-medium rounded-md',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary',
        isActive
          ? 'bg-primary text-background shadow'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: TabsContentProps): JSX.Element | null {
  const { value: selected } = useTabsContext();
  if (selected !== value) return null;

  return (
    <div role="tabpanel" className={cn('pt-2', className)}>
      {children}
    </div>
  );
}
