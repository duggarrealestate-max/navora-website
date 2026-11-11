import type { IndustryVertical, IndustryConfig } from '@shared/types/industry';

export type { IndustryConfig };

export const verticalRegistry: Record<IndustryVertical, IndustryConfig> = {
  wholesale: {
    vertical: 'wholesale',
    name: 'Wholesale OS',
    tagline: 'DEMO ENVIRONMENT',
    currency: 'GBP',
    features: ['trade-account', 'tiered-pricing', 'credit-terms', 'bulk-ordering'],
    navSections: [],
  },
  'real-estate': {
    vertical: 'real-estate',
    name: 'Real Estate OS',
    tagline: 'Coming Soon',
    currency: 'GBP',
    features: ['listings', 'agents', 'commissions', 'tenancy'],
    navSections: [],
  },
  restaurant: {
    vertical: 'restaurant',
    name: 'Restaurant OS',
    tagline: 'Coming Soon',
    currency: 'GBP',
    features: ['pos', 'reservations', 'kitchen', 'stock'],
    navSections: [],
  },
  retail: {
    vertical: 'retail',
    name: 'Retail OS',
    tagline: 'Coming Soon',
    currency: 'GBP',
    features: ['pos', 'inventory', 'staff', 'promotions'],
    navSections: [],
  },
  logistics: {
    vertical: 'logistics',
    name: 'Logistics OS',
    tagline: 'Coming Soon',
    currency: 'GBP',
    features: ['tracking', 'fleet', 'routes', 'warehousing'],
    navSections: [],
  },
  'professional-services': {
    vertical: 'professional-services',
    name: 'Professional Services OS',
    tagline: 'Coming Soon',
    currency: 'GBP',
    features: ['projects', 'time-tracking', 'invoicing', 'resources'],
    navSections: [],
  },
};

export function getVerticalConfig(vertical: IndustryVertical = 'wholesale'): IndustryConfig {
  return verticalRegistry[vertical];
}

export { verticalRegistry as VerticalRegistry };
