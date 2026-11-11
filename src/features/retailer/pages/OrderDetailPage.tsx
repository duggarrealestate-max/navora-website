import { useParams, Link } from 'react-router-dom';
import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@design/components/Table';
import { useRetailer } from '../components/RetailerContext';
import { formatCurrency } from '@shared/utils/format';
import { cn } from '@design/components/utils';
import type { RetailerOrderStatus } from '../types';

const statusFlow: RetailerOrderStatus[] = ['received', 'confirmed', 'picking', 'ready', 'dispatched', 'delivered'];

export function OrderDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { orders } = useRetailer();
  const order = orders.find((o) => o.id === id) || orders[0];
  const currentIndex = statusFlow.indexOf(order.status);

  return (
    <div className="space-y-4">
      <Link to="/retailer/orders" className="text-xs text-primary hover:underline">← Back to Orders</Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Order {order.orderNumber}</h1>
          <p className="text-sm text-text-secondary mt-1">{new Date(order.createdAt).toLocaleDateString('en-GB')} · {order.deliveryMethod}</p>
        </div>
        <Badge variant={order.status === 'delivered' ? 'success' : order.status === 'dispatched' ? 'info' : 'default'}>
          {order.status.toUpperCase()}
        </Badge>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-1 flex-wrap">
          {statusFlow.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div
                className={cn(
                  'px-2.5 py-1.5 text-xs font-medium rounded-sm transition-all',
                  order.status === s
                    ? 'bg-primary text-white'
                    : i <= currentIndex
                      ? 'bg-primary/15 text-primary'
                      : 'bg-surface-hover text-text-secondary'
                )}
              >
                {s}
              </div>
              {i < statusFlow.length - 1 && (
                <svg className="w-3 h-3 text-text-tertiary mx-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-4">Order Items</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Product</TableHeader>
                <TableHeader align="right">Qty</TableHeader>
                <TableHeader align="right">Unit Price</TableHeader>
                <TableHeader align="right">Total</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{item.name}</TableCell>
                  <TableCell align="right" className="text-sm tabular-nums">{item.quantity}</TableCell>
                  <TableCell align="right" className="text-sm tabular-nums">{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell align="right" className="text-sm tabular-nums">{formatCurrency(item.totalPrice)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-xs font-medium text-text-tertiary text-right">Subtotal</TableCell>
                <TableCell align="right" className="text-sm">{formatCurrency(order.subtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="text-xs font-medium text-text-tertiary text-right">Delivery</TableCell>
                <TableCell align="right" className="text-sm">{formatCurrency(order.deliveryFee)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="text-sm font-bold text-text-primary text-right">Total</TableCell>
                <TableCell align="right" className="text-base font-bold text-primary">{formatCurrency(order.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Delivery</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-text-tertiary">Method:</span> <span className="text-text-primary capitalize">{order.deliveryMethod}</span></p>
              <p><span className="text-text-tertiary">Expected:</span> <span className="text-text-primary">{new Date(order.expectedDelivery).toLocaleDateString('en-GB')}</span></p>
              <p><span className="text-text-tertiary">Payment:</span> <span className="text-text-primary capitalize">{order.paymentMethod}</span></p>
            </div>
          </Card>
          {order.notes && (
            <Card className="p-5">
              <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">Notes</h3>
              <p className="text-sm text-text-secondary">{order.notes}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
