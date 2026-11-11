import type { NavSection } from '@shared/types/industry';
import type { IconName } from '@design/components/Icon';

const navSections: NavSection[] = [
  {
    id: 'main',
    label: 'MAIN',
    items: [
      { id: 'command-centre', label: 'Command Centre', to: '/command-centre', icon: 'commandCenter' as IconName, section: 'main' },
      { id: 'commerce', label: 'Commerce', to: '/commerce', icon: 'commerce' as IconName, section: 'main' },
      { id: 'customers', label: 'Customers', to: '/customers', icon: 'customers' as IconName, section: 'main' },
      { id: 'orders', label: 'Orders', to: '/orders', icon: 'orders' as IconName, section: 'main' },
      { id: 'inventory', label: 'Inventory', to: '/inventory', icon: 'inventory' as IconName, section: 'main' },
    ],
  },
  {
    id: 'growth',
    label: 'GROWTH',
    items: [
      { id: 'retention', label: 'Retention', to: '/retention', icon: 'retention' as IconName, section: 'growth' },
      { id: 'automation', label: 'Automation', to: '/automation', icon: 'automation' as IconName, section: 'growth' },
      { id: 'ai-sales-assistant', label: 'AI Sales Assistant', to: '/ai-sales-assistant', icon: 'ai' as IconName, section: 'growth' },
      { id: 'analytics', label: 'Analytics', to: '/analytics', icon: 'commerce' as IconName, section: 'growth' },
    ],
  },
  {
    id: 'external',
    label: 'EXTERNAL',
    items: [
      { id: 'discovery', label: 'TradePilot Discovery', to: '/discovery', icon: 'commandCenter' as IconName, section: 'external' },
    ],
  },
  {
    id: 'system',
    label: 'SYSTEM',
    items: [
      { id: 'team', label: 'Team', to: '/team', icon: 'team' as IconName, section: 'system' },
      { id: 'integrations', label: 'Integrations', to: '/integrations', icon: 'settings' as IconName, section: 'system' },
      { id: 'settings', label: 'Settings', to: '/settings', icon: 'settings' as IconName, section: 'system' },
    ],
  },
];

interface CommandItem {
  id: string;
  label: string;
  category: string;
  to?: string;
  action?: string;
  icon: IconName;
}

const commandItems: CommandItem[] = [
  { id: 'nav:command-centre', label: 'Command Centre', category: 'Navigate', to: '/command-centre', icon: 'commandCenter' },
  { id: 'nav:commerce', label: 'Commerce', category: 'Navigate', to: '/commerce', icon: 'commerce' },
  { id: 'nav:customers', label: 'Customers', category: 'Navigate', to: '/customers', icon: 'customers' },
  { id: 'nav:orders', label: 'Orders', category: 'Navigate', to: '/orders', icon: 'orders' },
  { id: 'nav:inventory', label: 'Inventory', category: 'Navigate', to: '/inventory', icon: 'inventory' },
  { id: 'nav:retention', label: 'Retention', category: 'Navigate', to: '/retention', icon: 'retention' },
  { id: 'nav:automation', label: 'Automation', category: 'Navigate', to: '/automation', icon: 'automation' },
  { id: 'nav:ai', label: 'AI Sales Assistant', category: 'Navigate', to: '/ai-sales-assistant', icon: 'ai' },
  { id: 'nav:analytics', label: 'Analytics', category: 'Navigate', to: '/analytics', icon: 'commerce' },
  { id: 'nav:discovery', label: 'TradePilot Discovery', category: 'Navigate', to: '/discovery', icon: 'commandCenter' },
  { id: 'nav:team', label: 'Team', category: 'Navigate', to: '/team', icon: 'team' },
  { id: 'nav:integrations', label: 'Integrations', category: 'Navigate', to: '/integrations', icon: 'settings' },
  { id: 'nav:settings', label: 'Settings', category: 'Navigate', to: '/settings', icon: 'settings' },
  { id: 'action:new-order', label: 'New Order', category: 'Actions', action: 'new-order', icon: 'plus' },
  { id: 'action:new-customer', label: 'Add Customer', category: 'Actions', action: 'new-customer', icon: 'plus' },
  { id: 'action:search', label: 'Search products', category: 'Actions', action: 'search', icon: 'search' },
];

export function useDemoNavigation() {
  return {
    navSections,
    commandItems,
  };
}

export { navSections, commandItems };
