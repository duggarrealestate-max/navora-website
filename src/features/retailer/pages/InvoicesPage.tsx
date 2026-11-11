import { Link } from 'react-router-dom';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Badge } from '@design/components/Badge';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@design/components/Table';
import { useRetailer } from '../components/RetailerContext';
import { formatCurrency } from '@shared/utils/format';

export function InvoicesPage(): JSX.Element {
  const { invoices } = useRetailer();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-text-primary tracking-tight">Invoices</h1>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Invoice</TableHeader>
              <TableHeader>Order</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader align="right">Amount</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Due Date</TableHeader>
              <TableHeader align="center">Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id} hover>
                <TableCell className="text-sm font-medium">{inv.invoiceNumber}</TableCell>
                <TableCell>
                  <Link to={`/retailer/orders/${inv.orderId}`} className="text-primary hover:underline text-sm">
                    {inv.orderNumber}
                  </Link>
                </TableCell>
                <TableCell className="text-xs text-text-tertiary">{inv.date}</TableCell>
                <TableCell align="right" className="text-sm tabular-nums">{formatCurrency(inv.amount)}</TableCell>
                <TableCell>
                  <Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'overdue' ? 'error' : 'warning'} size="sm">
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-text-tertiary">{inv.dueDate}</TableCell>
                <TableCell align="center">
                  <Button size="sm" variant="ghost" onClick={() => alert('Demo document download')}>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View
                    </span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
