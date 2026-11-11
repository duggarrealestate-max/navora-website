export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  customerId?: string;
  orderId?: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface PaymentProvider {
  createIntent(params: {
    amount: number;
    currency: string;
    customerId?: string;
    orderId?: string;
  }): Promise<PaymentIntent>;

  refund(paymentId: string): Promise<PaymentIntent>;

  getPayment(id: string): Promise<PaymentIntent>;

  getName(): string;
}
