import { Icon } from '@design/components/Icon';
import type { IconName } from '@design/components/Icon';
import { cn } from '@design/components/utils';

interface TopbarProps {
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
  user?: { name: string; role?: string; avatar?: string };
  notifications?: Array<{ id: string; title: string; message: string; unread: boolean }>;
  onNotificationClick?: (id: string) => void;
  onSearch?: () => void;
  rightActions?: React.ReactNode;
  className?: string;
}

export function Topbar({
  onToggleSidebar,
  sidebarCollapsed,
  user,
  notifications = [],
  onNotificationClick,
  onSearch,
  rightActions,
  className,
}: TopbarProps): JSX.Element {
  return (
    <header
      className={cn(
        'h-12 flex items-center justify-between',
        'bg-surface border-b border-border',
        'px-4',
        'flex-shrink-0',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1.5 text-text-secondary hover:text-text-primary rounded-md hover:bg-surface-hover transition-colors"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon name="menu" size={18} />
          </button>
        )}
        {onSearch && (
          <button
            onClick={onSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary rounded-md hover:bg-surface-hover transition-colors"
            aria-label="Search"
          >
            <Icon name="search" size={14} />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-text-tertiary bg-surface-hover border border-border rounded">
              ⌘K
            </kbd>
          </button>
        )}
      </div>

      <div className="flex items-center gap-1">
        {rightActions}
        <button
          className="p-1.5 text-text-secondary hover:text-text-primary rounded-md hover:bg-surface-hover transition-colors"
          aria-label="Create new"
          title="Create"
        >
          <Icon name="plus" size={18} />
        </button>

        <button
          className="p-1.5 text-text-secondary hover:text-text-primary rounded-md hover:bg-surface-hover transition-colors"
          aria-label="Help"
          title="Help"
        >
          <Icon name="alert" size={18} />
        </button>

        {notifications.length > 0 && (
          <NotificationDropdown notifications={notifications} _onClick={onNotificationClick} />
        )}

        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}

function NotificationDropdown({
  notifications = [],
  _onClick,
}: {
  notifications: TopbarProps['notifications'];
  _onClick?: (id: string) => void;
}): JSX.Element {
  if (!notifications || notifications.length === 0) return <></>;

  return (
    <div className="relative">
      <button
        className="relative p-1.5 text-text-secondary hover:text-text-primary rounded-md hover:bg-surface-hover transition-colors"
        aria-label="Notifications"
      >
        <Icon name="alert" size={18} />
        {notifications.some((n) => n.unread) && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full" />
        )}
      </button>
    </div>
  );
}

function UserMenu({ user }: { user: NonNullable<TopbarProps['user']> }): JSX.Element {
  return (
    <button
      className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-surface-hover transition-colors"
      aria-label={`User menu for ${user.name}`}
    >
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-sm" />
      ) : (
        <div className="w-6 h-6 rounded-sm bg-primary flex items-center justify-center text-[10px] font-bold text-white">
          {user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)}
        </div>
      )}
      <div className="hidden md:flex flex-col items-start">
        <span className="text-xs font-medium text-text-primary leading-tight">{user.name}</span>
        {user.role && <span className="text-[10px] text-text-tertiary leading-tight">{user.role}</span>}
      </div>
    </button>
  );
}

export function CommandPalette({
  isOpen,
  onClose,
  items,
  onSelectItem,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ id: string; label: string; category: string; icon: IconName }>;
  onSelectItem: (id: string) => void;
}): JSX.Element {
  if (!isOpen) return <></>;

  return (
    <div
      className="fixed inset-0 z-modal flex items-start justify-center pt-20 px-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface border border-border rounded-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-b border-border">
          <input
            type="search"
            placeholder="Search commands, customers, orders..."
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
            autoFocus
          />
        </div>
        <div className="p-2 space-y-0.5 max-h-80 overflow-y-auto">
          {items.slice(0, 6).map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-md transition-colors"
              onClick={() => {
                onSelectItem(item.id);
                onClose();
              }}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
              <span className="ml-auto text-xs text-text-tertiary">{item.category}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
