import { Header } from '@design/layout/Header';
import { KPI } from '@design/components/KPI';
import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';
import { ChartLine, ChartDonut } from '@design/charts';
import { cn } from '@design/components/utils';
import { useDemoData } from '@app/providers/DemoContext';
import { formatCurrency, formatNumber } from '@shared/utils/format';
import { OwnerCoPilot } from './OwnerCoPilot';
import { useState } from 'react';

export function CommandCentre(): JSX.Element {
  const data = useDemoData();
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const totalRevenue = data.orders.reduce((sum, o) => sum + o.total, 0);
  const grossProfit = totalRevenue * 0.35;
  const totalOrders = data.orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const outstandingCredit = data.customers
    .filter((c) => c.segment === 'credit-risk')
    .reduce((sum, c) => sum + c.outstandingCredit, 0);

  const lowStock = data.products.filter((p) => p.status === 'low-stock' || p.status === 'out-of-stock');
  const outOfStock = data.products.filter((p) => p.status === 'out-of-stock');
  const atRiskCustomers = data.customers.filter((c) => c.segment === 'at-risk' || c.segment === 'dormant');
  const creditRisk = data.customers.filter((c) => c.segment === 'credit-risk');

  const recentActivities = data.activities.slice(0, 6);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const salesTrendData = Array.from({ length: 12 }, (_, i) => {
    const monthOrders = data.orders.filter((o) => {
      const d = new Date(o.createdAt);
      return d.getMonth() === i;
    });
    return {
      name: months[i],
      revenue: Math.round(monthOrders.reduce((sum, o) => sum + o.total, 0)),
      orders: monthOrders.length,
    };
  }).slice(-6);

  const topProducts = data.products
    .sort((a, b) => b.sales30d - a.sales30d)
    .slice(0, 5);

  const recentOrders = data.orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const inventoryHealth = [
    { name: 'In Stock', value: data.products.filter((p) => p.status === 'normal' || p.status === 'fast-mover').length, color: '#10b981' },
    { name: 'Low Stock', value: data.products.filter((p) => p.status === 'low-stock').length, color: '#f59e0b' },
    { name: 'Out of Stock', value: outOfStock.length, color: '#ef4444' },
    { name: 'Overstocked', value: data.products.filter((p) => p.status === 'overstocked').length, color: '#6366f1' },
  ];

  const topCustomers = data.customers
    .sort((a, b) => b.lifetimeValue - a.lifetimeValue)
    .slice(0, 5);

  return (
    <div className="space-y-4">
      <Header 
        title="Command Centre" 
        subtitle="Your business at a glance. Real-time intelligence to help you grow."
      >
        <div className="flex items-center gap-2">
          {(['7d', '30d', '90d'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-2.5 py-1 text-xs font-medium rounded-md transition-all',
                period === p
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              )}
            >
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </Header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KPI 
          label="Total Revenue" 
          value={formatCurrency(totalRevenue)} 
          change="+18.6% vs last period" 
          trend="up" 
        />
        <KPI 
          label="Gross Profit" 
          value={formatCurrency(grossProfit)} 
          change="+12.3% vs last period" 
          trend="up" 
        />
        <KPI 
          label="Orders" 
          value={formatNumber(totalOrders)} 
          change="+8.2% vs last period" 
          trend="up" 
        />
        <KPI 
          label="Avg Order Value" 
          value={formatCurrency(avgOrderValue)} 
          change="+4.1% vs last period" 
          trend="up" 
        />
        <KPI 
          label="Outstanding Credit" 
          value={formatCurrency(outstandingCredit)} 
          change={`${creditRisk.length} customers`}
          trend="down"
          status="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Revenue Overview</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-text-secondary">Current period</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-text-tertiary" />
                <span className="text-text-secondary">Previous period</span>
              </div>
            </div>
          </div>
          <ChartLine
            data={salesTrendData}
            xAxisKey="name"
            lines={[
              { key: 'revenue', color: '#6366f1', name: 'Revenue' },
            ]}
            height={240}
            showArea
          />
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Inventory Health</h3>
          <ChartDonut
            data={inventoryHealth}
            height={180}
            innerRadius={55}
            outerRadius={80}
            centerText={String(data.products.length)}
            centerSubtext="Total SKUs"
          />
          <div className="mt-4 space-y-2">
            {inventoryHealth.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-text-secondary">{item.name}</span>
                </div>
                <span className="text-text-primary font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Top Selling Products</h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.sku} className="flex items-center gap-3">
                <span className="text-xs font-mono text-text-tertiary w-4">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{p.name}</p>
                  <p className="text-xs text-text-tertiary">{formatNumber(p.sales30d)} units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{formatCurrency(p.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Recent Orders</h3>
          <div className="space-y-2.5">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary">{o.orderNumber}</p>
                  <p className="text-xs text-text-tertiary">{o.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{formatCurrency(o.total)}</p>
                  <Badge variant={o.status === 'delivered' ? 'success' : o.status === 'dispatched' ? 'info' : 'default'} size="sm">
                    {o.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Top Customers</h3>
          <div className="space-y-3">
            {topCustomers.map((c) => (
              <div key={c.id} className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{c.businessName}</p>
                  <p className="text-xs text-text-tertiary">{c.segment.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{formatCurrency(c.lifetimeValue)}</p>
                  <p className="text-xs text-success">↑ 12%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">AI Insights</h3>
          <div className="space-y-3">
            {[
              {
                title: 'Stock Alert',
                text: 'Demand for 30W USB-C chargers is up significantly this week. Consider increasing stock levels.',
                tag: 'Inventory',
                tagVariant: 'warning' as const,
              },
              {
                title: 'Retention Opportunity',
                text: '3 valuable customers have not ordered within their normal buying cycle.',
                tag: 'Retention',
                tagVariant: 'info' as const,
              },
              {
                title: 'Credit Watch',
                text: 'Approximately £1,240 may be released by reducing excess stock in slow-moving categories.',
                tag: 'Saving',
                tagVariant: 'success' as const,
              },
            ].map((insight) => (
              <div key={insight.title} className="flex items-start gap-3 p-3 bg-background-secondary rounded-md">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-text-primary">{insight.title}</p>
                    <Badge variant={insight.tagVariant} size="sm">{insight.tag}</Badge>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{insight.text}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 text-xs font-medium text-primary hover:text-primary-hover border border-border hover:border-primary rounded-md transition-all">
            Ask AI Co-Pilot
          </button>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <span className="text-[10px] font-mono text-text-tertiary mt-0.5 w-12 flex-shrink-0">
                  {new Date(a.timestamp).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">{a.title}</p>
                  <p className="text-xs text-text-tertiary truncate">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">AI Owner Insight</h3>
        <OwnerCoPilot
          insight={{
            atRiskCount: atRiskCustomers.length,
            creditRiskCount: creditRisk.length,
            lowStockCount: lowStock.length,
          }}
        />
      </Card>
    </div>
  );
}
