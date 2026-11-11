import { NavLink } from 'react-router-dom';
import { cn } from '@design/components/utils';
import { Icon } from '@design/components/Icon';
import type { IconName } from '@design/components/Icon';
import type { NavSection } from '@shared/types/industry';

interface SidebarProps {
  nav: NavSection[];
  _currentVertical: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function Sidebar({
  nav,
  _currentVertical,
  isCollapsed = false,
  className,
}: SidebarProps): JSX.Element {
  return (
    <aside
      className={cn(
        'flex flex-col h-screen overflow-y-auto',
        'bg-background-secondary border-r border-border',
        'transition-all duration-200',
        isCollapsed ? 'w-16' : 'w-60',
        className,
      )}
    >
      <div className="h-14 flex items-center px-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-white">W</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-primary tracking-tight">WHOLESALE OS</span>
              <span className="text-[10px] text-text-tertiary uppercase tracking-widest">B2B Commerce</span>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        {nav.map((section) => (
          <div key={section.id} className="mb-4">
            {!isCollapsed && (
              <p className="text-[10px] font-semibold text-text-tertiary uppercase tracking-widest px-4 mb-1.5">
                {section.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 text-sm rounded-sm mx-2',
                      'transition-all duration-150',
                      'hover:bg-surface-hover hover:text-text-primary',
                      'text-text-secondary',
                      'data-[active=true]:bg-primary data-[active=true]:text-white data-[active=true]:font-medium',
                      isCollapsed && 'justify-center',
                    )}
                    title={item.label}
                  >
                    <Icon name={item.icon as IconName} size={16} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        {!isCollapsed ? (
          <div className="bg-surface-hover rounded-md p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-sm bg-primary/20 flex items-center justify-center">
                <span className="text-[10px] text-primary">AI</span>
              </div>
              <span className="text-xs font-medium text-text-primary">AI Owner Co-Pilot</span>
            </div>
            <p className="text-[11px] text-text-tertiary mb-2.5 leading-relaxed">
              Your business copilot is ready to help you make smarter decisions.
            </p>
            <button className="w-full text-xs font-medium text-primary hover:text-primary-hover text-left transition-colors">
              Open Co-Pilot →
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-5 h-5 rounded-sm bg-primary/20 flex items-center justify-center" title="AI Co-Pilot">
              <span className="text-[10px] text-primary">AI</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          {!isCollapsed && (
            <span className="text-[11px] text-text-tertiary">Demo mode active</span>
          )}
        </div>
      </div>
    </aside>
  );
}
