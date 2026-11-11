import { CurrencyCode } from '@shared/types/base';

export type IndustryVertical = 'wholesale' | 'real-estate' | 'restaurant' | 'retail' | 'logistics' | 'professional-services';

export interface IndustryConfig {
  vertical: IndustryVertical;
  name: string;
  tagline: string;
  currency: CurrencyCode;
  features: string[];
  navSections: NavSection[];
}

export interface NavItem {
  id: string;
  label: string;
  to: string;
  icon: string;
  section: string;
}

export interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}
