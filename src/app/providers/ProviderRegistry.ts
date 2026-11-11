import type { AIProvider } from '@integrations/ai/AIProvider';
import type { MessagingProvider } from '@integrations/messaging/MessagingProvider';
import type { PaymentProvider } from '@integrations/payments/PaymentProvider';
import type { AuthProvider } from '@integrations/auth/AuthProvider';
import type { DeliveryProvider } from '@integrations/delivery/DeliveryProvider';
import type { AccountingProvider } from '@integrations/accounting/AccountingProvider';

import { DemoAIProvider } from '@demo/adapters/DemoAIProvider';
import { DemoMessagingProvider } from '@demo/adapters/DemoMessagingProvider';
import { DemoPaymentProvider } from '@demo/adapters/DemoPaymentProvider';
import { DemoAuthProvider } from '@demo/adapters/DemoAuthProvider';
import { DemoDeliveryProvider } from '@demo/adapters/DemoDeliveryProvider';
import { DemoAccountingProvider } from '@demo/adapters/DemoAccountingProvider';

export interface ProviderRegistry {
  ai: AIProvider;
  messaging: MessagingProvider;
  payment: PaymentProvider;
  auth: AuthProvider;
  delivery: DeliveryProvider;
  accounting: AccountingProvider;
}

let registry: ProviderRegistry | null = null;

export function getProviders(): ProviderRegistry {
  if (registry) return registry;

  registry = {
    ai: new DemoAIProvider(),
    messaging: new DemoMessagingProvider(),
    payment: new DemoPaymentProvider(),
    auth: new DemoAuthProvider(),
    delivery: new DemoDeliveryProvider(),
    accounting: new DemoAccountingProvider(),
  };

  return registry;
}

export function resetProviders(): void {
  registry = null;
}
