import type {
  AccountingProvider,
  Invoice,
} from '@integrations/accounting/AccountingProvider';

export class DemoAccountingProvider implements AccountingProvider {
  private invoices: Map<string, Invoice> = new Map();

  getName(): string {
    return 'Demo Accounting Provider';
  }

  async createInvoice(params: {
    customerId: string;
    orderId: string;
    lineItems: Array<{ description: string; amount: number; tax: number }>;
    dueDate: string;
  }): Promise<Invoice> {
    const subtotal = params.lineItems.reduce((sum, li) => sum + li.amount, 0);
    const tax = params.lineItems.reduce((sum, li) => sum + li.tax, 0);
    const invoice: Invoice = {
      id: `inv_${Date.now()}`,
      customerId: params.customerId,
      orderId: params.orderId,
      amount: subtotal,
      tax,
      total: subtotal + tax,
      status: 'posted',
      dueDate: params.dueDate,
      createdAt: new Date().toISOString(),
    };
    this.invoices.set(invoice.id, invoice);
    return invoice;
  }

  async getInvoice(id: string): Promise<Invoice> {
    const invoice = this.invoices.get(id);
    if (!invoice) {
      throw new Error(`Invoice not found: ${id}`);
    }
    return invoice;
  }

  async getOutstandingBalance(customerId: string): Promise<number> {
    let total = 0;
    for (const invoice of this.invoices.values()) {
      if (invoice.customerId === customerId && (invoice.status === 'posted' || invoice.status === 'overdue')) {
        total += invoice.total;
      }
    }
    return total;
  }
}
