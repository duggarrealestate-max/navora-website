export const colors = {
  // Base
  background: '#0a0a0d',
  backgroundSecondary: '#111114',
  backgroundTertiary: '#18181c',
  surface: '#141417',
  surfaceHover: '#1a1a1e',
  border: '#2a2a2e',
  borderHover: '#3a3a3e',

  // Text
  textPrimary: '#f4f1ea',
  textSecondary: '#a3a3a8',
  textTertiary: '#7a7a7e',

  // Accents
  primary: '#00d4ff',
  primaryHover: '#00b8e6',
  primaryGlow: 'rgba(0, 212, 255, 0.2)',

  secondary: '#8b5cf6',
  accent: '#ff6b35',

  // Status
  success: '#22c55e',
  successBg: 'rgba(34, 197, 94, 0.15)',
  warning: '#f59e0b',
  warningBg: 'rgba(245, 158, 11, 0.15)',
  error: '#ef4444',
  errorBg: 'rgba(239, 68, 68, 0.15)',
  info: '#3b82f6',
  infoBg: 'rgba(59, 130, 246, 0.15)',

  // Charts
  chartBlue: '#3b82f6',
  chartCyan: '#06b6d4',
  chartGreen: '#22c55e',
  chartOrange: '#f97316',
  chartPurple: '#a855f7',
  chartPink: '#ec4899',
  chartRed: '#ef4444',
  chartYellow: '#eab308',
  chartAmber: '#f59e0b',
} as const;

export type ColorName = keyof typeof colors;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.25rem',
  xl2: '1.5rem',
  xl3: '2rem',
  xl4: '2.5rem',
  xl5: '3rem',
  xl6: '4rem',
  xl7: '5rem',
  xl8: '6rem',
} as const;

export const typography = {
  fonts: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xl2: '1.5rem',
    xl3: '1.75rem',
    xl4: '2rem',
    xl5: '2.25rem',
    xl6: '2.5rem',
    xl7: '2.75rem',
    xl8: '3rem',
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    wide: '1.75',
  },
} as const;

export const radii = {
  none: '0',
  sm: '0.125rem',
  md: '0.25rem',
  lg: '0.375rem',
  xl: '0.5rem',
  xl2: '0.75rem',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  glow: '0 0 20px 0 rgba(0, 212, 255, 0.15)',
} as const;

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '250ms ease-in-out',
  slow: '400ms ease-in-out',
} as const;

export const zIndex = {
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xl2: '1536px',
} as const;
