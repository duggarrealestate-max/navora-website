import type {
  PaymentProvider,
  PaymentIntent,
} from '@integrations/payments/PaymentProvider';

export class DemoPaymentProvider implements PaymentProvider {
  private payments: Map<string, PaymentIntent> = new Map();

  getName(): string {
    return 'Demo Payment Provider';
  }

  async createIntent(params: {
    amount: number;
    currency: string;
    customerId?: string;
    orderId?: string;
  }): Promise<PaymentIntent> {
    const intent: PaymentIntent = {
      id: `pay_${Date.now()}`,
      amount: params.amount,
      currency: params.currency,
      customerId: params.customerId,
      orderId: params.orderId,
      status: 'succeeded',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.payments.set(intent.id, intent);
    return intent;
  }

  async refund(paymentId: string): Promise<PaymentIntent> {
    const intent = this.payments.get(paymentId);
    if (!intent) {
      throw new Error(`Payment not found: ${paymentId}`);
    }
    const refunded: PaymentIntent = {
      ...intent,
      status: 'refunded',
      updatedAt: new Date().toISOString(),
    };
    this.payments.set(paymentId, refunded);
    return refunded;
  }

  async getPayment(id: string): Promise<PaymentIntent> {
    const intent = this.payments.get(id);
    if (!intent) {
      throw new Error(`Payment not found: ${id}`);
    }
    return intent;
  }
}
