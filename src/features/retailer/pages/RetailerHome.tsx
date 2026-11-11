import { Link } from 'react-router-dom';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Badge } from '@design/components/Badge';
import { KPI } from '@design/components/KPI';
import { Icon } from '@design/components/Icon';
import { useRetailer } from '../components/RetailerContext';
import { formatCurrency } from '@shared/utils/format';
import { newArrivals, recommendedForAbcMobiles } from '../data/retailer-demo';
import { getRetailerProducts } from '../data/retailer-demo';
import { useDemoData } from '@app/providers/DemoContext';

export function RetailerHome(): JSX.Element {
  const { orders } = useRetailer();
  const data = useDemoData();
  const products = getRetailerProducts(data.products);

  const lastOrder = orders[0];
  const recentOrders = orders.slice(0, 5);
  const recommended = recommendedForAbcMobiles.slice(0, 4);
  const arrivals = newArrivals.slice(0, 4);

  const creditUsed = 1240;
  const creditLimit = 5000;
  const available = creditLimit - creditUsed;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Good morning, ABC Mobiles</h1>
        <p className="text-sm text-text-secondary mt-1">Everything you need to order, reorder and manage your trade account.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPI label="Credit Limit" value={formatCurrency(creditLimit)} />
        <KPI label="Outstanding" value={formatCurrency(creditUsed)} trend="down" />
        <KPI label="Available Credit" value={formatCurrency(available)} trend="up" />
        <KPI label="Next Payment Due" value="18 Aug" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button size="lg" className="w-full"><Link to="/retailer/catalogue">Start New Order</Link></Button>
        <Button size="lg" variant="secondary" className="w-full"><Link to="/retailer/orders">Reorder Last Order</Link></Button>
        <Button size="lg" variant="outline" className="w-full"><Link to="/retailer/quick-order">Quick Order</Link></Button>
        <Button size="lg" variant="ghost" className="w-full"><Link to="/retailer/invoices">View Invoices</Link></Button>
      </div>

      {lastOrder && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">Last Order</h3>
            <span className="text-xs text-text-tertiary">{lastOrder.orderNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-text-primary">{formatCurrency(lastOrder.total)}</p>
              <p className="text-xs text-text-tertiary">{lastOrder.items.length} items · {lastOrder.deliveryMethod}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={lastOrder.status === 'delivered' ? 'success' : 'info'} size="sm">
                {lastOrder.status}
              </Badge>
              <Link to={`/retailer/orders/${lastOrder.id}`} className="text-xs font-medium text-primary hover:underline px-2 py-1 border border-border rounded-sm">View</Link>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Recent Orders</h3>
            <Link to="/retailer/orders" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-text-primary">{o.orderNumber}</p>
                  <p className="text-xs text-text-tertiary">{new Date(o.createdAt).toLocaleDateString('en-GB')} · {o.items.length} items</p>
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
          <h3 className="text-sm font-semibold text-text-primary mb-3">Recommended for ABC Mobiles</h3>
          <div className="space-y-3">
            {recommended.map((r) => {
              const product = products.find((p) => p.sku === r.sku);
              if (!product) return null;
              return (
                <Link key={r.sku} to={`/retailer/product/${r.sku}`} className="flex items-center justify-between py-2 border-b border-border last:border-0 hover:bg-surface-hover -mx-2 px-2 rounded-md transition-colors">
                  <div>
                    <p className="text-xs font-medium text-text-primary">{r.name}</p>
                    <p className="text-[10px] text-text-tertiary">{r.reason}</p>
                  </div>
                  <p className="text-xs font-bold text-text-primary">{formatCurrency(product.price)}</p>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">New Arrivals</h3>
            <Link to="/retailer/catalogue" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {arrivals.map((a) => {
              const product = products.find((p) => p.sku === a.sku);
              if (!product) return null;
              return (
                <Link key={a.sku} to={`/retailer/product/${a.sku}`} className="p-3 bg-background-secondary rounded-md border border-border hover:border-border-hover transition-colors">
                  <p className="text-xs font-medium text-text-primary line-clamp-2">{a.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="success" size="sm">New</Badge>
                    <span className="text-xs font-bold text-text-primary">{formatCurrency(product.price)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Saved Lists</h3>
          <div className="space-y-3">
            {['Weekly Restock', 'Apple Essentials', 'Charging Products'].map((name) => (
              <Link key={name} to="/retailer/saved" className="flex items-center justify-between py-2 border-b border-border last:border-0 hover:bg-surface-hover -mx-2 px-2 rounded-md transition-colors">
                <div>
                  <p className="text-xs font-medium text-text-primary">{name}</p>
                  <p className="text-[10px] text-text-tertiary">Tap to view items</p>
                </div>
                <Icon name="chevronRight" size={16} className="text-text-tertiary" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
