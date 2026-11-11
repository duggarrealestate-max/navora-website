import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { getDemoDataset, type DemoDataset } from '@demo/data/service';

const DemoDataContext = createContext<DemoDataset | null>(null);

export function useDemoData(): DemoDataset {
  const ctx = useContext(DemoDataContext);
  if (!ctx) {
    return getDemoDataset();
  }
  return ctx;
}

export function DemoDataProvider({ children }: { children: ReactNode }): JSX.Element {
  const data = getDemoDataset();
  return <DemoDataContext.Provider value={data}>{children}</DemoDataContext.Provider>;
}
