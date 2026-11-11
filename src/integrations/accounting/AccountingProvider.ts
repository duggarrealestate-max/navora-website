export interface Invoice {
  id: string;
  customerId: string;
  orderId: string;
  amount: number;
  tax: number;
  total: number;
  status: 'draft' | 'posted' | 'paid' | 'overdue';
  dueDate: string;
  createdAt: string;
}

export interface AccountingProvider {
  createInvoice(params: {
    customerId: string;
    orderId: string;
    lineItems: Array<{ description: string; amount: number; tax: number }>;
    dueDate: string;
  }): Promise<Invoice>;

  getInvoice(id: string): Promise<Invoice>;

  getOutstandingBalance(customerId: string): Promise<number>;

  getName(): string;
}
