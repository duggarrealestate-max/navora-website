import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';
import { useRetailer } from '../components/RetailerContext';
import { formatCurrency } from '@shared/utils/format';

export function CreditPage(): JSX.Element {
  const { customer, invoices } = useRetailer();
  const available = customer.creditLimit - customer.outstandingCredit;
  const dueInvoices = invoices.filter((i) => i.status === 'due' || i.status === 'overdue');

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-text-primary tracking-tight">Credit Account</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Credit Limit</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{formatCurrency(customer.creditLimit)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Used Credit</p>
          <p className="text-2xl font-bold text-warning mt-1">{formatCurrency(customer.outstandingCredit)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Available Credit</p>
          <p className="text-2xl font-bold text-success mt-1">{formatCurrency(available)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Next Payment Due</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{new Date(customer.nextPaymentDue).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Outstanding Invoices</h3>
          <Badge variant={dueInvoices.length > 0 ? 'warning' : 'success'} size="sm">
            {dueInvoices.length} pending
          </Badge>
        </div>
        <div className="space-y-3">
          {dueInvoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-text-primary">{inv.invoiceNumber}</p>
                <p className="text-xs text-text-tertiary">{inv.orderNumber} · Due {inv.dueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{formatCurrency(inv.amount)}</p>
                <Badge variant={inv.status === 'overdue' ? 'error' : 'warning'} size="sm">{inv.status}</Badge>
              </div>
            </div>
          ))}
          {dueInvoices.length === 0 && (
            <p className="text-sm text-text-tertiary text-center py-4">No outstanding invoices</p>
          )}
        </div>
      </Card>

      <Card className="p-5 bg-background-secondary">
        <h3 className="text-sm font-semibold text-text-primary mb-2">Trade Terms</h3>
        <p className="text-sm text-text-secondary">{customer.tradeTerms}</p>
        <p className="text-xs text-text-tertiary mt-2">For payment queries, contact {customer.supportContact}</p>
      </Card>
    </div>
  );
}
