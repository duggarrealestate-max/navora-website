import { useState, useMemo } from 'react';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Badge } from '@design/components/Badge';
import { Input } from '@design/components/Input';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@design/components/Table';
import { useRetailer } from '../components/RetailerContext';
import { useDemoData } from '@app/providers/DemoContext';
import { formatCurrency } from '@shared/utils/format';
import { getRetailerProducts } from '../data/retailer-demo';
import { getPriceForQuantity } from '../engine/pricing';

export function QuickOrderPage(): JSX.Element {
  const data = useDemoData();
  const { addToCart } = useRetailer();
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<Array<{ sku: string; name: string; quantity: number; price: number; available: number }>>([]);

  const products = getRetailerProducts(data.products);

  const filteredProducts = useMemo(() => {
    if (!search) return products.slice(0, 20);
    return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())).slice(0, 20);
  }, [products, search]);

  const addRow = (sku: string) => {
    const product = products.find((p) => p.sku === sku);
    if (!product) return;
    const existing = rows.find((r) => r.sku === sku);
    if (existing) {
      setRows((prev) => prev.map((r) => (r.sku === sku ? { ...r, quantity: r.quantity + 1 } : r)));
    } else {
      const price = getPriceForQuantity(product.price, 1, 'gold');
      setRows((prev) => [...prev, { sku: product.sku, name: product.name, quantity: 1, price, available: product.available }]);
    }
  };

  const updateRowQuantity = (sku: string, quantity: number) => {
    setRows((prev) => prev.map((r) => (r.sku === sku ? { ...r, quantity } : r)));
  };

  const removeRow = (sku: string) => {
    setRows((prev) => prev.filter((r) => r.sku !== sku));
  };

  const addAllToCart = () => {
    for (const row of rows) {
      if (row.quantity > 0) {
        addToCart({ sku: row.sku, name: row.name, quantity: row.quantity, unitPrice: row.price, lineTotal: Math.round(row.price * row.quantity * 100) / 100, available: row.available });
      }
    }
    setRows([]);
  };

  const orderTotal = rows.reduce((sum, r) => sum + Math.round(r.price * r.quantity * 100) / 100, 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Quick Order</h1>
        <p className="text-sm text-text-secondary mt-1">Fast bulk ordering for experienced buyers.</p>
      </div>

      <Card className="p-4">
        <Input
          placeholder="Search SKU or product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 p-0 overflow-hidden">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>SKU</TableHeader>
                <TableHeader>Product</TableHeader>
                <TableHeader align="right">Price</TableHeader>
                <TableHeader align="center">Stock</TableHeader>
                <TableHeader align="center">Qty</TableHeader>
                <TableHeader align="right">Line Total</TableHeader>
                <TableHeader align="center">Action</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((p) => {
                const price = getPriceForQuantity(p.price, 1, 'gold');
                const inRows = rows.find((r) => r.sku === p.sku);
                return (
                  <TableRow key={p.sku} hover>
                    <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                    <TableCell className="text-sm">{p.name}</TableCell>
                    <TableCell align="right" className="text-sm tabular-nums">{formatCurrency(price)}</TableCell>
                    <TableCell align="center">
                      <Badge variant={p.available > 10 ? 'success' : p.available > 0 ? 'warning' : 'error'} size="sm">
                        {p.available}
                      </Badge>
                    </TableCell>
                    <TableCell align="center">
                      <input
                        type="number"
                        min={0}
                        max={p.available}
                        value={inRows ? inRows.quantity : 0}
                        onChange={(e) => {
                          const qty = parseInt(e.target.value) || 0;
                          if (qty === 0) {
                            removeRow(p.sku);
                          } else {
                            updateRowQuantity(p.sku, Math.min(qty, p.available));
                          }
                        }}
                        className="w-16 bg-surface border border-border rounded-md px-2 py-1 text-xs text-text-primary text-center focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </TableCell>
                    <TableCell align="right" className="text-sm tabular-nums">
                      {inRows ? formatCurrency(Math.round(inRows.price * inRows.quantity * 100) / 100) : '—'}
                    </TableCell>
                    <TableCell align="center">
                      <Button size="sm" variant="ghost" onClick={() => addRow(p.sku)} disabled={p.available <= 0}>
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Current Order</h3>
            {rows.length === 0 ? (
              <p className="text-xs text-text-tertiary text-center py-4">No items added yet</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {rows.map((r) => (
                  <div key={r.sku} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-text-primary truncate">{r.name}</p>
                      <p className="text-[10px] text-text-tertiary">{r.sku} · {r.quantity} × {formatCurrency(r.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-text-primary tabular-nums">{formatCurrency(Math.round(r.price * r.quantity * 100) / 100)}</span>
                      <button onClick={() => removeRow(r.sku)} className="text-text-tertiary hover:text-error transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
              <span className="text-sm font-semibold text-text-primary">Order Total</span>
              <span className="text-lg font-bold text-primary">{formatCurrency(orderTotal)}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setRows([])}>Clear</Button>
              <Button size="sm" className="flex-1" onClick={addAllToCart} disabled={rows.length === 0}>Add to Cart</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
