import { Header } from '@design/layout/Header';
import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';
import { Button } from '@design/components/Button';
import { Input } from '@design/components/Input';
import { Select } from '@design/components/Select';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@design/components/Table';
import { useDemoData } from '@app/providers/DemoContext';
import { formatCurrency } from '@shared/utils/format';
import type { OrderStatus } from '@demo/entities/orders';
import { useState, useMemo, useEffect } from 'react';
import { cn } from '@design/components/utils';
import { LocalRetailerRepository } from '@features/retailer/storage/repository';
import type { RetailerOrder } from '@features/retailer/types';

const statusColors: Record<OrderStatus, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  delivered: 'success',
  dispatched: 'info',
  confirmed: 'info',
  ready: 'warning',
  picking: 'default',
  new: 'default',
  cancelled: 'error',
};

const statusFlow: OrderStatus[] = ['new', 'confirmed', 'picking', 'ready', 'dispatched', 'delivered'];

export function OrdersPage(): JSX.Element {
  const data = useDemoData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [repFilter, setRepFilter] = useState<string>('all');
  const [retailerOrders, setRetailerOrders] = useState<RetailerOrder[]>([]);

  useEffect(() => {
    const repo = new LocalRetailerRepository();
    repo.getOrders().then(setRetailerOrders);
  }, []);

  const combinedOrders = useMemo(() => {
    const wholesale = data.orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      status: o.status,
      total: o.total,
      salesRep: o.salesRep,
      createdAt: o.createdAt,
      channel: o.channel,
      items: o.items,
    }));
    const retailer = retailerOrders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName + ' (Retailer)',
      status: o.status as OrderStatus,
      total: o.total,
      salesRep: 'Retailer Portal',
      createdAt: o.createdAt,
      channel: 'retailer-portal',
      items: o.items,
    }));
    return [...retailer, ...wholesale].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [data.orders, retailerOrders]);

  const salesReps = Array.from(new Set(combinedOrders.map((o) => o.salesRep)));

  const filtered = useMemo(() => {
    return combinedOrders.filter((o) => {
      if (search && !o.orderNumber.toLowerCase().includes(search.toLowerCase()) && !o.customerName.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (repFilter !== 'all' && o.salesRep !== repFilter) return false;
      return true;
    });
  }, [combinedOrders, search, statusFilter, repFilter]);

  return (
    <div className="space-y-4">
      <Header 
        title="Orders" 
        subtitle="Order management & dispatch tracking"
      >
        <Button size="sm" variant="outline">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </span>
        </Button>
      </Header>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input 
            placeholder="Search orders or customers..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="flex-1"
          />
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="sm:w-44">
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="confirmed">Confirmed</option>
            <option value="picking">Picking</option>
            <option value="ready">Ready</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </Select>
          <Select value={repFilter} onChange={(e) => setRepFilter(e.target.value)} className="sm:w-44">
            <option value="all">All Reps</option>
            {salesReps.map((r) => <option key={r} value={r}>{r}</option>)}
          </Select>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Order #</TableHeader>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader align="right">Total</TableHeader>
              <TableHeader>Sales Rep</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader align="center">Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length > 0 ? filtered.map((o) => (
              <TableRow key={o.id} hover>
                <TableCell>
                  <a href={`/orders/${o.id}`} className="font-medium text-primary hover:underline text-sm">
                    {o.orderNumber}
                  </a>
                </TableCell>
                <TableCell className="text-sm">{o.customerName}</TableCell>
                <TableCell>
                  <Badge variant={statusColors[o.status]} size="sm">
                    {o.status}
                  </Badge>
                </TableCell>
                <TableCell align="right" className="text-sm tabular-nums">{formatCurrency(o.total)}</TableCell>
                <TableCell className="text-xs text-text-tertiary">{o.salesRep}</TableCell>
                <TableCell className="text-xs text-text-tertiary">{new Date(o.createdAt).toLocaleDateString('en-GB')}</TableCell>
                <TableCell align="center">
                  <Button size="sm" variant="ghost" className="h-7 px-2">View</Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-text-tertiary py-8">
                  No orders match your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function OrderDetailPage(): JSX.Element {
  const data = useDemoData();
  const order = data.orders[0];
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);

  const handleStatusChange = (status: OrderStatus) => {
    setCurrentStatus(status);
  };

  const currentIndex = statusFlow.indexOf(currentStatus);

  return (
    <div className="space-y-4">
      <Header
        title={`Order #${order.orderNumber}`}
        subtitle={`Customer: ${order.customerName}`}
      >
        <div className="flex items-center gap-2">
          <Badge variant={statusColors[currentStatus]}>
            {currentStatus.toUpperCase()}
          </Badge>
          <Badge variant="outline" size="sm">{order.channel}</Badge>
        </div>
      </Header>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {statusFlow.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <button
                  onClick={() => handleStatusChange(s)}
                  className={cn(
                    'px-2.5 py-1.5 text-xs font-medium rounded-sm transition-all',
                    currentStatus === s
                      ? 'bg-primary text-white'
                      : i <= currentIndex
                        ? 'bg-primary/15 text-primary'
                        : 'bg-surface-hover text-text-secondary hover:text-text-primary'
                  )}
                >
                  {s}
                </button>
                {i < statusFlow.length - 1 && (
                  <svg className="w-3 h-3 text-text-tertiary mx-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
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
                <TableCell colSpan={3} className="text-xs font-medium text-text-tertiary text-right">Tax</TableCell>
                <TableCell align="right" className="text-sm">{formatCurrency(order.tax)}</TableCell>
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
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Customer</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-text-tertiary">Name:</span> <span className="text-text-primary">{order.customerName}</span></p>
              <p><span className="text-text-tertiary">Payment:</span> <span className="text-text-primary">{order.paymentMethod} ({order.paymentStatus})</span></p>
              <p><span className="text-text-tertiary">Sales Rep:</span> <span className="text-text-primary">{order.salesRep}</span></p>
              <p><span className="text-text-tertiary">Delivery:</span> <span className="text-text-primary">{order.deliveryMethod}</span></p>
              <p><span className="text-text-tertiary">Expected:</span> <span className="text-text-primary">{new Date(order.expectedDelivery).toLocaleDateString('en-GB')}</span></p>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Notes</h3>
            <p className="text-sm text-text-secondary">{order.notes || 'No notes for this order.'}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
