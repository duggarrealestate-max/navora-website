import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@design/components/utils';
import { Icon } from '@design/components/Icon';
import type { IconName } from '@design/components/Icon';
import { Button } from '@design/components/Button';

const navItems: Array<{ id: string; label: string; to: string; icon: IconName }> = [
  { id: 'home', label: 'Home', to: '/retailer', icon: 'commerce' },
  { id: 'catalogue', label: 'Catalogue', to: '/retailer/catalogue', icon: 'commandCenter' },
  { id: 'quick-order', label: 'Quick Order', to: '/retailer/quick-order', icon: 'orders' },
  { id: 'orders', label: 'Orders', to: '/retailer/orders', icon: 'calendar' },
  { id: 'saved', label: 'Saved Lists', to: '/retailer/saved', icon: 'copy' },
  { id: 'invoices', label: 'Invoices', to: '/retailer/invoices', icon: 'download' },
  { id: 'credit', label: 'Credit', to: '/retailer/credit', icon: 'check' },
  { id: 'ai-assistant', label: 'AI Assistant', to: '/retailer/ai-assistant', icon: 'ai' },
  { id: 'account', label: 'Account', to: '/retailer/account', icon: 'customers' },
];

interface RetailerShellProps {
  children: React.ReactNode;
  cartItemCount?: number;
  onCartClick?: () => void;
}

export function RetailerShell({ children, cartItemCount = 0, onCartClick }: RetailerShellProps): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-white">TP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-text-primary tracking-tight">TRADEPILOT</span>
            <span className="text-[10px] text-text-tertiary uppercase tracking-widest">ABC Accessories — Trade Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface-hover rounded-md mr-2">
            <span className="text-xs text-text-secondary">Logged in as:</span>
            <span className="text-xs font-medium text-text-primary">ABC Mobiles</span>
            <span className="text-xs text-text-tertiary">·</span>
            <span className="text-xs text-warning font-medium">Gold</span>
          </div>
          <button
            onClick={onCartClick}
            className="relative p-2 text-text-secondary hover:text-text-primary rounded-md hover:bg-surface-hover transition-colors"
          >
            <Icon name="commerce" size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            Return to Wholesaler
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-48 bg-surface border-r border-border flex-shrink-0 hidden md:flex flex-col">
          <nav className="flex-1 py-3 space-y-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to || (item.to !== '/retailer' && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-sm mx-2 transition-all',
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  )}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>

      <nav className="md:hidden bg-surface border-t border-border flex justify-around py-2 flex-shrink-0">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.to || location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.id}
              to={item.to}
              className={cn(
                'flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] transition-all',
                isActive ? 'text-primary' : 'text-text-secondary'
              )}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
