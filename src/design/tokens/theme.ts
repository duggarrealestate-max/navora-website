import { colors, spacing, typography, radii, shadows, transitions, zIndex, breakpoints } from './index';

export { colors, spacing, typography, radii, shadows, transitions, zIndex, breakpoints };

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  typography: typeof typography;
  radii: typeof radii;
  shadows: typeof shadows;
  transitions: typeof transitions;
  zIndex: typeof zIndex;
  breakpoints: typeof breakpoints;
};

export const theme: Theme = {
  colors,
  spacing,
  typography,
  radii,
  shadows,
  transitions,
  zIndex,
  breakpoints,
};
