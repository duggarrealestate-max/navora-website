import { Header } from '@design/layout/Header';
import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';
import { Button } from '@design/components/Button';
import { Select } from '@design/components/Select';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@design/components/Table';
import { useDemoData } from '@app/providers/DemoContext';
import { formatCurrency } from '@shared/utils/format';
import type { Customer } from '@demo/entities/customers';
import { useState, useMemo } from 'react';

interface AtRiskCustomer {
  customer: Customer;
  daysOverdue: number;
  status: 'expected' | 'late' | 'at-risk' | 'dormant';
  recommendedAction: string;
}

export function RetentionPage(): JSX.Element {
  const data = useDemoData();
  const [teamFilter, setTeamFilter] = useState<string>('all');

  const atRiskCustomers = useMemo(() => {
    const result: AtRiskCustomer[] = [];
    for (const c of data.customers) {
      if (c.segment === 'at-risk' || c.segment === 'dormant') {
        const daysOverdue = c.daysSinceLastOrder - c.buyingCycle;
        let status: AtRiskCustomer['status'];
        let action: string;

        if (c.daysSinceLastOrder > c.buyingCycle * 2) {
          status = 'dormant';
          action = 'Win-back campaign with discount offer';
        } else if (daysOverdue > 7) {
          status = 'at-risk';
          action = 'Personal follow-up call';
        } else if (daysOverdue > 0) {
          status = 'late';
          action = 'Send WhatsApp reminder';
        } else {
          status = 'expected';
          action = 'Monitor';
        }

        result.push({ customer: c, daysOverdue, status, recommendedAction: action });
      }
    }

    return result.sort((a, b) => b.customer.lifetimeValue - a.customer.lifetimeValue);
  }, [data.customers]);

  const recoveredCustomers = 5;
  const dormantCount = atRiskCustomers.filter((a) => a.status === 'dormant').length;
  const atRiskRevenue = atRiskCustomers.reduce((sum, a) => sum + a.customer.lifetimeValue, 0);
  const teamMembers = Array.from(new Set(data.customers.map((c) => c.accountOwner)));

  const filtered = teamFilter === 'all'
    ? atRiskCustomers
    : atRiskCustomers.filter((a) => a.customer.accountOwner === teamFilter);

  return (
    <div className="space-y-4">
      <Header 
        title="Retention" 
        subtitle="At-risk detection & recovery"
      >
        <Button size="sm" variant="outline">Export Report</Button>
      </Header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">At-Risk Customers</p>
          <p className="text-2xl font-bold text-warning mt-1">{filtered.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Recovered This Week</p>
          <p className="text-2xl font-bold text-success mt-1">{recoveredCustomers}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Dormant Accounts</p>
          <p className="text-2xl font-bold text-error mt-1">{dormantCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">At-Risk Revenue</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{formatCurrency(atRiskRevenue)}</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Retention Pipeline</h3>
          <Select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="w-48">
            <option value="all">All Account Owners</option>
            {teamMembers.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
        <div className="flex items-center gap-2 mb-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="text-text-secondary">Expected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-info" />
            <span className="text-text-secondary">Late</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-text-secondary">At Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-error" />
            <span className="text-text-secondary">Dormant</span>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Buying Cycle</TableHeader>
              <TableHeader>Last Order</TableHeader>
              <TableHeader>Days Late</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader align="right">Value</TableHeader>
              <TableHeader>Owner</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length > 0 ? filtered.map((a) => (
              <TableRow key={a.customer.id} hover>
                <TableCell>
                  <a href={`/customers/${a.customer.id}`} className="font-medium text-primary hover:underline">
                    {a.customer.businessName}
                  </a>
                </TableCell>
                <TableCell className="text-xs text-text-tertiary">{a.customer.buyingCycle} days</TableCell>
                <TableCell className="text-xs text-text-tertiary">{a.customer.daysSinceLastOrder} days ago</TableCell>
                <TableCell className="text-xs text-text-tertiary">{a.daysOverdue > 0 ? `${a.daysOverdue} days` : 'On time'}</TableCell>
                <TableCell>
                  <Badge variant={
                    a.status === 'dormant' ? 'error' :
                    a.status === 'at-risk' ? 'warning' :
                    a.status === 'late' ? 'info' : 'success'
                  } size="sm">
                    {a.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell align="right" className="text-sm tabular-nums">{formatCurrency(a.customer.lifetimeValue)}</TableCell>
                <TableCell className="text-xs text-text-tertiary">{a.customer.accountOwner}</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">{a.recommendedAction}</Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-text-tertiary py-8">
                  No at-risk customers match your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Retention Tasks</h3>
        <div className="space-y-2.5">
          {filtered.slice(0, 5).map((a) => (
            <div key={a.customer.id} className="flex items-center justify-between p-3 bg-background-secondary rounded-md">
              <div>
                <p className="font-medium text-sm text-text-primary">{a.customer.businessName}</p>
                <p className="text-xs text-text-tertiary">{a.recommendedAction}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={
                  a.status === 'dormant' ? 'error' :
                  a.status === 'at-risk' ? 'warning' : 'default'
                } size="sm">
                  {a.status === 'dormant' ? 'DORMANT' : a.status === 'at-risk' ? 'AT RISK' : a.status === 'late' ? 'LATE' : 'EXPECTED'}
                </Badge>
                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Mark Done</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
