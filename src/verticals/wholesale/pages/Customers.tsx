import { Header } from '@design/layout/Header';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Badge } from '@design/components/Badge';
import { Input } from '@design/components/Input';
import { Select } from '@design/components/Select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@design/components/Tabs';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@design/components/Table';
import { useDemoData } from '@app/providers/DemoContext';
import { formatCurrency } from '@shared/utils/format';
import { useState, useMemo } from 'react';
import type { CustomerSegment } from '@demo/entities/customers';
import { cn } from '@design/components/utils';

const segmentConfig: Record<CustomerSegment, { color: string; bgColor: string; label: string }> = {
  vip: { color: 'text-white', bgColor: 'bg-secondary', label: 'VIP' },
  active: { color: 'text-success', bgColor: 'bg-success/15', label: 'Active' },
  new: { color: 'text-info', bgColor: 'bg-info/15', label: 'New' },
  'at-risk': { color: 'text-warning', bgColor: 'bg-warning/15', label: 'At Risk' },
  dormant: { color: 'text-error', bgColor: 'bg-error/15', label: 'Dormant' },
  'credit-risk': { color: 'text-error', bgColor: 'bg-error/15', label: 'Credit Risk' },
};

export function CustomersPage(): JSX.Element {
  const data = useDemoData();
  const [search, setSearch] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return data.customers.filter((c) => {
      if (search && !c.businessName.toLowerCase().includes(search.toLowerCase()) && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (segmentFilter !== 'all' && c.segment !== segmentFilter) return false;
      return true;
    });
  }, [data.customers, search, segmentFilter]);

  return (
    <div className="space-y-4">
      <Header 
        title="Customers" 
        subtitle="Retailer accounts & credit management"
      >
        <Button size="sm">Add Customer</Button>
      </Header>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input 
            placeholder="Search customers..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="flex-1"
          />
          <Select value={segmentFilter} onChange={(e) => setSegmentFilter(e.target.value)} className="sm:w-48">
            <option value="all">All Segments</option>
            <option value="vip">VIP</option>
            <option value="active">Active</option>
            <option value="new">New</option>
            <option value="at-risk">At Risk</option>
            <option value="dormant">Dormant</option>
            <option value="credit-risk">Credit Risk</option>
          </Select>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Segment</TableHeader>
              <TableHeader>Last Order</TableHeader>
              <TableHeader align="right">Lifetime Value</TableHeader>
              <TableHeader align="right">Outstanding</TableHeader>
              <TableHeader>Owner</TableHeader>
              <TableHeader>Risk</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((c) => {
              const cfg = segmentConfig[c.segment];
              return (
                <TableRow key={c.id} hover>
                  <TableCell>
                    <a href={`/customers/${c.id}`} className="font-medium text-primary hover:underline">
                      {c.businessName}
                    </a>
                    <p className="text-xs text-text-tertiary">{c.name}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className={cn(cfg.bgColor, cfg.color)}>
                      {cfg.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-text-secondary">{c.daysSinceLastOrder} days ago</TableCell>
                  <TableCell align="right" className="text-sm tabular-nums">{formatCurrency(c.lifetimeValue)}</TableCell>
                  <TableCell align="right">
                    <span className={c.outstandingCredit > c.creditLimit * 0.5 ? 'text-error' : 'text-text-primary text-sm tabular-nums'}>
                      {formatCurrency(c.outstandingCredit)}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-text-tertiary">{c.accountOwner}</TableCell>
                  <TableCell>
                    {c.segment === 'credit-risk' && (
                      <Badge variant="error" size="sm">HIGH</Badge>
                    )}
                    {c.segment === 'at-risk' && (
                      <Badge variant="warning" size="sm">MEDIUM</Badge>
                    )}
                    {c.segment === 'dormant' && (
                      <Badge variant="error" size="sm">HIGH</Badge>
                    )}
                    {(c.segment === 'vip' || c.segment === 'active' || c.segment === 'new') && (
                      <Badge variant="success" size="sm">LOW</Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export function CustomerDetailPage(): JSX.Element {
  const data = useDemoData();
  const customer = data.customers[0];
  const [activeTab, setActiveTab] = useState('overview');

  const customerOrders = data.orders.filter((o) => o.customerId === customer.id);
  const customerActivities = data.activities.filter((a) => a.customerId === customer.id);

  return (
    <div className="space-y-4">
      <Header
        title={customer.businessName}
        subtitle={`Contact: ${customer.name} • ${customer.email}`}
      >
        <div className="flex items-center gap-2">
          <Badge variant="default" className={cn(segmentConfig[customer.segment].bgColor, segmentConfig[customer.segment].color)}>
            {segmentConfig[customer.segment].label}
          </Badge>
          <Button variant={customer.segment === 'credit-risk' ? 'danger' : 'outline'} size="sm">
            {customer.segment === 'credit-risk' ? 'Credit Alert' : 'Send WhatsApp'}
          </Button>
        </div>
      </Header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Lifetime Value</p>
          <p className="text-lg font-bold text-text-primary mt-1">{formatCurrency(customer.lifetimeValue)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Outstanding</p>
          <p className="text-lg font-bold text-error mt-1">{formatCurrency(customer.outstandingCredit)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Credit Limit</p>
          <p className="text-lg font-bold text-text-primary mt-1">{formatCurrency(customer.creditLimit)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Buying Cycle</p>
          <p className="text-lg font-bold text-text-primary mt-1">{customer.buyingCycle} days</p>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="credit">Credit</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="buying">Buying Behaviour</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Customer Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-text-tertiary">Name:</span> <span className="text-text-primary">{customer.name}</span></p>
                  <p><span className="text-text-tertiary">Business:</span> <span className="text-text-primary">{customer.businessName}</span></p>
                  <p><span className="text-text-tertiary">Email:</span> <span className="text-text-primary">{customer.email}</span></p>
                  <p><span className="text-text-tertiary">Phone:</span> <span className="text-text-primary">{customer.phone}</span></p>
                  <p><span className="text-text-tertiary">Address:</span> <span className="text-text-primary">{customer.address.street}, {customer.address.city}, {customer.address.postcode}</span></p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Account Info</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-text-tertiary">Account Owner:</span> <span className="text-text-primary">{customer.accountOwner}</span></p>
                  <p><span className="text-text-tertiary">Credit Limit:</span> <span className="text-text-primary">{formatCurrency(customer.creditLimit)}</span></p>
                  <p><span className="text-text-tertiary">Last Order:</span> <span className="text-text-primary">{new Date(customer.lastOrderDate).toLocaleDateString('en-GB')}</span></p>
                  <p><span className="text-text-tertiary">Days Since Last Order:</span> <span className="text-text-primary">{customer.daysSinceLastOrder}</span></p>
                  <p><span className="text-text-tertiary">Preferred Device:</span> <span className="text-text-primary">{customer.preferredDevice}</span></p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Order #</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader align="right">Total</TableHeader>
                  <TableHeader>Status</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerOrders.length > 0 ? customerOrders.map((o) => (
                  <TableRow key={o.id} hover>
                    <TableCell><a href={`/orders/${o.id}`} className="text-primary hover:underline text-sm">{o.orderNumber}</a></TableCell>
                    <TableCell className="text-xs text-text-tertiary">{new Date(o.createdAt).toLocaleDateString('en-GB')}</TableCell>
                    <TableCell align="right" className="text-sm tabular-nums">{formatCurrency(o.total)}</TableCell>
                    <TableCell><Badge variant={o.status === 'delivered' ? 'success' : o.status === 'dispatched' ? 'info' : 'default'} size="sm">{o.status}</Badge></TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-text-tertiary py-8">
                      No orders placed yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Activity</TableHeader>
                  <TableHeader>Description</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerActivities.length > 0 ? customerActivities.map((a) => (
                  <TableRow key={a.id} hover>
                    <TableCell className="text-xs text-text-tertiary">{new Date(a.timestamp).toLocaleDateString('en-GB')}</TableCell>
                    <TableCell className="text-sm">{a.title}</TableCell>
                    <TableCell className="text-xs text-text-tertiary">{a.description}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-text-tertiary py-8">
                      No activity recorded
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="credit">
          <Card className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider">Credit Limit</p>
                <p className="text-lg font-bold text-text-primary mt-1">{formatCurrency(customer.creditLimit)}</p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider">Outstanding Balance</p>
                <p className="text-lg font-bold text-error mt-1">{formatCurrency(customer.outstandingCredit)}</p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider">Available Credit</p>
                <p className="text-lg font-bold text-success mt-1">{formatCurrency(customer.creditLimit - customer.outstandingCredit)}</p>
              </div>
            </div>
            {customer.outstandingCredit > customer.creditLimit * 0.5 && (
              <Badge variant="error">Credit limit exceeded — follow-up required</Badge>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card className="p-5">
            <div className="space-y-3">
              {customer.notes.map((note, i) => (
                <div key={i} className="p-3 bg-background-secondary rounded-md">
                  <p className="text-sm text-text-secondary">{note}</p>
                </div>
              ))}
              <div className="flex gap-2">
                <Input placeholder="Add a note..." />
                <Button size="sm">Save</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card className="p-8">
            <div className="text-center text-text-tertiary">
              No pending tasks for this customer
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="communication">
          <Card className="p-8">
            <div className="text-center text-text-tertiary">
              No communication history. <a href="#" className="text-primary hover:underline">Send message</a>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="buying">
          <Card className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Buying Pattern</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-text-secondary">Orders every ~{customer.buyingCycle} days</p>
                  <p className="text-text-secondary">Last order: {customer.daysSinceLastOrder} days ago</p>
                  <p className="text-text-secondary">
                    Expected reorder: {customer.buyingCycle - customer.daysSinceLastOrder <= 0 ? <span className="text-error">Overdue</span> : `${customer.buyingCycle - customer.daysSinceLastOrder} days`}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Top Products</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-text-secondary">Cases, Chargers, Screen Protectors</p>
                  <p className="text-text-tertiary">Preferred device: {customer.preferredDevice}</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
