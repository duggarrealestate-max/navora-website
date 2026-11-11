import { Header } from '@design/layout/Header';
import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';
import { Select } from '@design/components/Select';
import { useDemoData } from '@app/providers/DemoContext';
import { formatCurrency, formatNumber } from '@shared/utils/format';
import { ChartLine, ChartDonut, ChartBar } from '@design/charts';
import { useState, useMemo } from 'react';
import { cn } from '@design/components/utils';

export function AnalyticsPage(): JSX.Element {
  const data = useDemoData();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '78d' | 'lifetime'>('7d');
  const [selectedChart, setSelectedChart] = useState<'revenue' | 'orders' | 'customers'>('revenue');

  const periodConfig: Record<typeof selectedPeriod, { label: string; days: number }> = {
    '7d': { label: '7 Days', days: 7 },
    '30d': { label: '30 Days', days: 30 },
    '78d': { label: '78 Days', days: 78 },
    lifetime: { label: 'Lifetime', days: 99999 },
  };

  const revenueByCategory = useMemo(() => {
    const totals: Record<string, number> = {};
    data.orders.forEach((o) => {
      o.items.forEach((item) => {
        totals[item.name] = (totals[item.name] || 0) + item.totalPrice;
      });
    });
    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#f97316', '#34d399'];
    return Object.entries(totals)
      .map(([name, val], i) => ({
        name,
        value: val,
        color: colors[i % colors.length],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [data.orders]);

  const salesTrendData = useMemo(() => {
    const monthMap: Record<string, { revenue: number; orders: number; customers: Set<string> }> = {};
    data.orders.forEach((o) => {
      const d = new Date(o.createdAt);
      const key = d.toLocaleString('en-GB', { month: 'short' });
      if (!monthMap[key]) {
        monthMap[key] = { revenue: 0, orders: 0, customers: new Set() };
      }
      monthMap[key].revenue += o.total;
      monthMap[key].orders += 1;
      monthMap[key].customers.add(o.customerId);
    });
    return Object.entries(monthMap)
      .map(([name, m]) => ({
        name,
        revenue: Math.round(m.revenue / 1000),
        orders: m.orders,
        customers: m.customers.size,
      }))
      .slice(-6);
  }, [data.orders]);

  const topProducts = useMemo(() => {
    return data.products
      .sort((a, b) => b.sales30d - a.sales30d)
      .slice(0, 8)
      .map((p) => ({
        name: p.name,
        value: p.sales30d,
        category: p.category,
      }));
  }, [data.products]);

  const customerSegmentData = useMemo(() => {
    const segments: Record<string, number> = {};
    data.customers.forEach((c) => {
      segments[c.segment] = (segments[c.segment] || 0) + 1;
    });
    return Object.entries(segments).map(([seg, count]) => ({
      name: seg,
      value: count,
      color: getSegmentColor(seg),
    }));
  }, [data.customers]);

  const avgOrderValue = data.orders.reduce((sum, o) => sum + o.total, 0) / data.orders.length;
  const totalRevenue = data.orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = data.orders.length;
  const repeatRate = data.orders.filter((o) => {
    const custOrders = data.orders.filter((oo) => oo.customerId === o.customerId);
    return custOrders.length > 1;
  }).length / totalOrders * 100;

  return (
    <div className="space-y-4">
      <Header 
        title="Analytics" 
        subtitle="Business performance & insights"
      >
        <div className="flex items-center gap-2">
          {Object.entries(periodConfig).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setSelectedPeriod(key as typeof selectedPeriod)}
              className={cn(
                'px-2.5 py-1 text-xs font-medium rounded-md transition-all',
                selectedPeriod === key
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              )}
            >
              {cfg.label}
            </button>
          ))}
        </div>
      </Header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Total Revenue</p>
          <p className="text-xl font-bold text-text-primary mt-1">{formatCurrency(totalRevenue)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Avg Order Value</p>
          <p className="text-xl font-bold text-primary mt-1">{formatCurrency(avgOrderValue)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Total Orders</p>
          <p className="text-xl font-bold text-text-primary mt-1">{formatNumber(totalOrders)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Repeat Rate</p>
          <p className="text-xl font-bold text-success mt-1">{repeatRate.toFixed(1)}%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Sales Trend</h3>
            <Select value={selectedChart} onChange={(e) => setSelectedChart(e.target.value as 'revenue' | 'orders' | 'customers')} className="w-36">
              <option value="revenue">Revenue</option>
              <option value="orders">Orders</option>
              <option value="customers">Customers</option>
            </Select>
          </div>
          <ChartLine
            data={salesTrendData}
            xAxisKey="name"
            lines={[
              {
                key: selectedChart === 'revenue' ? 'revenue' : selectedChart === 'orders' ? 'orders' : 'customers',
                color: '#6366f1',
                name: selectedChart === 'revenue' ? 'Revenue (£k)' : selectedChart === 'orders' ? 'Orders' : 'Customers',
              },
            ]}
            height={220}
            showArea
          />
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Customer Segments</h3>
          <ChartDonut
            data={customerSegmentData}
            height={200}
            innerRadius={55}
            outerRadius={85}
          />
          <div className="mt-4 space-y-2">
            {customerSegmentData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-text-secondary capitalize">{item.name}</span>
                </div>
                <span className="text-text-primary font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Revenue by Category</h3>
          <ChartDonut
            data={revenueByCategory}
            height={220}
          />
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Top Products (30 Days)</h3>
          <ChartBar
            data={topProducts}
            xAxisKey="name"
            bars={[{ key: 'value', color: '#6366f1', name: 'Units Sold' }]}
            layout="vertical"
            height={220}
          />
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Key Insights</h3>
        <div className="space-y-3">
          {[
            {
              title: 'Revenue Trend',
              text: 'Revenue increased 12% compared to last 30 days, driven by cases and cables.',
              severity: 'positive' as const,
            },
            {
              title: 'Repeat Rate',
              text: 'Repeat customer rate is 34.2%, up from 28.1% last month.',
              severity: 'positive' as const,
            },
            {
              title: 'Stock Alert',
              text: 'Universal Chargers below safety stock — reorder recommended.',
              severity: 'warning' as const,
            },
          ].map((insight) => (
            <div key={insight.title} className="flex items-start gap-3 p-3 bg-background-secondary rounded-md">
              <Badge variant={insight.severity === 'positive' ? 'success' : insight.severity === 'warning' ? 'warning' : 'error'} size="sm">
                {insight.severity === 'positive' ? '↑' : '⚠'}
              </Badge>
              <div>
                <p className="text-sm font-medium text-text-primary">{insight.title}</p>
                <p className="text-xs text-text-tertiary mt-0.5">{insight.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function getSegmentColor(segment: string): string {
  switch (segment) {
    case 'vip': return '#8b5cf6';
    case 'active': return '#10b981';
    case 'new': return '#06b6d4';
    case 'at-risk': return '#f59e0b';
    case 'dormant': return '#ef4444';
    case 'credit-risk': return '#ef4444';
    default: return '#64748b';
  }
}
