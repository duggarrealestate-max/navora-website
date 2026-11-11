import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Badge } from '@design/components/Badge';
import { Input } from '@design/components/Input';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@design/components/Table';
import { useRetailer } from '../components/RetailerContext';
import { formatCurrency } from '@shared/utils/format';
import type { RetailerOrderStatus } from '../types';

const statusColors: Record<RetailerOrderStatus, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  received: 'default',
  confirmed: 'info',
  picking: 'warning',
  ready: 'warning',
  dispatched: 'info',
  delivered: 'success',
};

export function OrdersPage(): JSX.Element {
  const { orders } = useRetailer();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (search && !o.orderNumber.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      return true;
    });
  }, [orders, search, statusFilter]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-text-primary tracking-tight">Orders</h1>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input placeholder="Search order number..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Statuses</option>
            <option value="received">Received</option>
            <option value="confirmed">Confirmed</option>
            <option value="picking">Picking</option>
            <option value="ready">Ready</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Order #</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader align="right">Total</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Items</TableHeader>
              <TableHeader align="center">Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((o) => (
              <TableRow key={o.id} hover>
                <TableCell>
                  <Link to={`/retailer/orders/${o.id}`} className="font-medium text-primary hover:underline text-sm">
                    {o.orderNumber}
                  </Link>
                </TableCell>
                <TableCell className="text-xs text-text-tertiary">{new Date(o.createdAt).toLocaleDateString('en-GB')}</TableCell>
                <TableCell align="right" className="text-sm tabular-nums">{formatCurrency(o.total)}</TableCell>
                <TableCell>
                  <Badge variant={statusColors[o.status]} size="sm">{o.status}</Badge>
                </TableCell>
                <TableCell className="text-xs text-text-secondary">{o.items.length} items</TableCell>
                <TableCell align="center">
                  <Link to={`/retailer/orders/${o.id}`}>
                    <Button size="sm" variant="ghost">View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-text-tertiary py-8">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
