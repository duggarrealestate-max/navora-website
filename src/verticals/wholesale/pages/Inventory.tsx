import { Header, SectionHeader } from '@design/layout/Header';
import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';
import { Select } from '@design/components/Select';
import { KPI } from '@design/components/KPI';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@design/components/Table';
import { Icon } from '@design/components/Icon';
import { cn } from '@design/components/utils';
import { useDemoData } from '@app/providers/DemoContext';
import { formatCurrency, formatNumber } from '@shared/utils/format';
import type { StockStatus } from '@demo/entities/products';
import { useState, useMemo } from 'react';

const paneConfig = [
  { id: 'fast-mover', label: 'FAST MOVERS', description: 'High velocity stock — monitor closely', color: 'text-success' },
  { id: 'slow-mover', label: 'SLOW MOVERS', description: 'Declining sales — consider promotions', color: 'text-warning' },
  { id: 'dead-stock', label: 'DEAD STOCK', description: 'No movement — capital tie-up', color: 'text-error' },
  { id: 'low-stock', label: 'LOW STOCK', description: 'Below safety level — reorder soon', color: 'text-warning' },
  { id: 'out-of-stock', label: 'OUT OF STOCK', description: 'Critical — lost sales risk', color: 'text-error' },
  { id: 'overstocked', label: 'OVERSTOCKED', description: 'Excess inventory — consider pricing', color: 'text-text-tertiary' },
  { id: 'normal', label: 'ALL NORMAL', description: 'Healthy stock levels', color: 'text-text-secondary' },
];

export function InventoryPage(): JSX.Element {
  const data = useDemoData();
  const [activePane, setActivePane] = useState<StockStatus | 'normal'>('fast-mover');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const brands = Array.from(new Set(data.products.map((p) => p.brand)));
  const categories = Array.from(new Set(data.products.map((p) => p.category)));

  const visibleProducts = useMemo(() => {
    let products = data.products;
    if (activePane !== 'normal') {
      products = products.filter((p) => p.status === activePane);
    }
    if (brandFilter !== 'all') {
      products = products.filter((p) => p.brand === brandFilter);
    }
    if (categoryFilter !== 'all') {
      products = products.filter((p) => p.category === categoryFilter);
    }
    return products;
  }, [data.products, activePane, brandFilter, categoryFilter]);

  const paneCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    paneConfig.forEach((pane) => {
      counts[pane.id] = data.products.filter((p) => p.status === pane.id).length;
    });
    counts['normal'] = data.products.filter((p) => p.status === 'normal').length;
    return counts;
  }, [data.products]);

  const totalValue = data.products.reduce((sum, p) => sum + p.cost * p.stock, 0);
  const deadStockValue = data.products.filter((p) => p.status === 'dead-stock').reduce((sum, p) => sum + p.cost * p.stock, 0);

  return (
    <div className="space-y-6">
      <Header title="Inventory Intelligence" subtitle="Stock analysis & recommendations" />

      {/* Category Selector */}
      <div className="flex flex-wrap gap-2">
        {paneConfig.map((pane) => {
          const isActive = activePane === pane.id;
          return (
            <button
              key={pane.id}
              onClick={() => setActivePane(pane.id as StockStatus | 'normal')}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-2 rounded-md border transition-all duration-200',
                isActive
                  ? `${pane.color} bg-surface-hover border-border-hover shadow-sm`
                  : 'text-text-secondary border-border hover:border-border-hover hover:text-text-primary'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', isActive ? pane.color : 'bg-text-tertiary')} />
              <span className="text-xs font-semibold uppercase tracking-wider">{pane.label}</span>
              <span className={cn(
                'text-xs font-medium px-1.5 py-0.5 rounded-sm tabular-nums',
                isActive ? 'bg-primary/15 text-primary' : 'bg-background-tertiary text-text-tertiary'
              )}>
                {paneCounts[pane.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Total Inventory Value" value={formatCurrency(totalValue)} />
        <KPI
          label="Dead Stock Value"
          value={formatCurrency(deadStockValue)}
          icon={<Icon name="alert" size={18} className="text-error" />}
          trend="down"
          change="Capital at risk"
        />
        <KPI
          label="Out of Stock"
          value={data.products.filter((p) => p.status === 'out-of-stock').length}
          icon={<Icon name="alert" size={18} className="text-error" />}
          trend="down"
          change="Lost sales"
        />
        <KPI
          label="Fast Movers"
          value={data.products.filter((p) => p.status === 'fast-mover').length}
          icon={<Icon name="inventory" size={18} className="text-success" />}
          trend="up"
          change="High velocity"
        />
      </div>

      {/* Product Table */}
      <Card padding="lg" className="border-border">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="w-full sm:w-48"
            label="Brand"
          >
            <option value="all">All Brands</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </Select>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-48"
            label="Category"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c.replace('-', ' ')}</option>)}
          </Select>
        </div>

        <Table className="[&_td]:py-2 [&_td]:px-3 [&_th]:py-2 [&_th]:px-3">
          <TableHead>
            <TableHeader className="text-xs">Product</TableHeader>
            <TableHeader className="text-xs">SKU</TableHeader>
            <TableHeader className="text-xs">Category</TableHeader>
            <TableHeader className="text-xs text-right">Stock</TableHeader>
            <TableHeader className="text-xs text-right">Reserved</TableHeader>
            <TableHeader className="text-xs text-right">Available</TableHeader>
            <TableHeader className="text-xs text-right">30-Day Sales</TableHeader>
            <TableHeader className="text-xs text-right">Margin</TableHeader>
            <TableHeader className="text-xs">Status</TableHeader>
          </TableHead>
          <TableBody>
            {visibleProducts.length > 0 ? visibleProducts.slice(0, 30).map((p) => (
              <TableRow key={p.sku} hover className="group">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-text-primary text-sm group-hover:text-primary transition-colors">{p.name}</span>
                    <span className="text-xs text-text-tertiary">{p.brand}</span>
                  </div>
                </TableCell>
                <TableCell className="text-text-tertiary font-mono text-xs">{p.sku}</TableCell>
                <TableCell className="text-xs text-text-secondary">{p.category.replace('-', ' ')}</TableCell>
                <TableCell className="text-right text-sm tabular-nums">{formatNumber(p.stock)}</TableCell>
                <TableCell className="text-right text-text-tertiary text-sm tabular-nums">{formatNumber(p.reserved)}</TableCell>
                <TableCell className="text-right text-sm tabular-nums">{formatNumber(p.available)}</TableCell>
                <TableCell className="text-right text-sm tabular-nums">{formatNumber(p.sales30d)}</TableCell>
                <TableCell className="text-right text-sm tabular-nums">{p.margin}%</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(p.status)} size="sm">
                    {p.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-text-tertiary py-8">
                  No products match your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Dead Stock Recommendations */}
      {activePane === 'dead-stock' && (
        <Card padding="lg" className="border-border">
          <SectionHeader
            title="Dead Stock Recommendations"
            description="Clearance opportunities to recover tied-up capital"
          />
          <div className="space-y-2">
            {visibleProducts.slice(0, 5).map((p) => {
              const cashTied = p.cost * p.stock;
              return (
                <div
                  key={p.sku}
                  className="flex items-center justify-between p-4 bg-background-secondary/40 rounded-md border border-border hover:border-error/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-12 bg-error rounded-full flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-text-primary group-hover:text-error transition-colors">{p.name}</p>
                      <p className="text-xs text-text-tertiary mt-0.5">
                        No movement for {p.stockAge} days • Cash tied up:{' '}
                        <span className="text-error font-medium">{formatCurrency(cashTied)}</span>
                      </p>
                    </div>
                  </div>
                  <Badge variant="warning" size="sm" className="flex-shrink-0">Clearance Suggested</Badge>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Low Stock Recommendations */}
      {activePane === 'low-stock' && (
        <Card padding="lg" className="border-border">
          <SectionHeader
            title="Reorder Recommendations"
            description="Suggested purchase orders to maintain safety stock"
          />
          <div className="space-y-2">
            {visibleProducts.slice(0, 5).map((p) => {
              const daysLeft = p.sales30d > 0 ? Math.floor((p.available / (p.sales30d / 30))) : 999;
              const suggestedQty = Math.max(p.reorderLevel * 2, p.sales30d * 2);
              return (
                <div
                  key={p.sku}
                  className="flex items-center justify-between p-4 bg-background-secondary/40 rounded-md border border-border hover:border-warning/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-12 bg-warning rounded-full flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-text-primary group-hover:text-warning transition-colors">{p.name}</p>
                      <p className="text-xs text-text-tertiary mt-0.5">
                        {p.available} units remaining • Estimated safety-stock breach:{' '}
                        <span className="text-warning font-medium">{daysLeft} days</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-medium text-text-primary">Suggest: {suggestedQty} units</p>
                    <p className="text-xs text-text-tertiary">{formatCurrency(p.price * suggestedQty)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

function getStatusVariant(status: StockStatus): 'success' | 'warning' | 'error' | 'info' | 'default' {
  switch (status) {
    case 'fast-mover': return 'success';
    case 'low-stock':
    case 'slow-mover': return 'warning';
    case 'out-of-stock':
    case 'dead-stock': return 'error';
    case 'overstocked': return 'info';
    default: return 'default';
  }
}
