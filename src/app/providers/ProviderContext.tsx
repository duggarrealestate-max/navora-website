import React, { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { getProviders, type ProviderRegistry } from './ProviderRegistry';

const ProvidersContext = createContext<ProviderRegistry | null>(null);

export function useProviders(): ProviderRegistry {
  const ctx = useContext(ProvidersContext);
  if (!ctx) {
    throw new Error('useProviders must be used within ProviderContext');
  }
  return ctx;
}

export function ProviderContext({ children }: { children: ReactNode }): JSX.Element {
  const providers = useMemo(() => getProviders(), []);
  return <ProvidersContext.Provider value={providers}>{children}</ProvidersContext.Provider>;
}
