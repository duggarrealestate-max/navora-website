import { Header } from '@design/layout/Header';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Badge } from '@design/components/Badge';
import { Input } from '@design/components/Input';
import { Select } from '@design/components/Select';
import { useDemoData } from '@app/providers/DemoContext';
import { formatCurrency } from '@shared/utils/format';
import type { Product, ProductCategory, DeviceCompatibility } from '@demo/entities/products';
import { useState, useMemo } from 'react';

interface CartItem extends Product {
  quantity: number;
}

export function CommercePage(): JSX.Element {
  const data = useDemoData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDevice, setSelectedDevice] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState(true);
  const [cart, _setCart] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() => {
    return data.products.filter((p) => {
      if (!p.active) return false;
      if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase()) && !p.sku.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedDevice !== 'all' && p.device !== selectedDevice) return false;
      if (inStockOnly && p.available <= 0) return false;
      return true;
    });
  }, [data.products, searchTerm, selectedBrand, selectedCategory, selectedDevice, inStockOnly]);

  const addToCart = (product: Product, quantity: number = 1) => {
    _setCart((prev) => {
      const existing = prev.find((item) => item.sku === product.sku);
      if (existing) {
        return prev.map((item) =>
          item.sku === product.sku ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const brands = Array.from(new Set(data.products.map((p) => p.brand)));
  const categories: ProductCategory[] = ['cases', 'screen-protectors', 'chargers', 'cables', 'power-banks', 'car-chargers', 'wireless-chargers', 'earbuds'];
  const devices: DeviceCompatibility[] = ['iPhone 17', 'iPhone 16', 'Samsung S25', 'Samsung S24', 'Google Pixel 9', 'OnePlus 13', 'Universal'];

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-4">
      <Header 
        title="Commerce" 
        subtitle="B2B trade ordering"
      >
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <span className="flex items-center gap-1.5">
              Cart ({cartItemCount})
              <span className="text-text-tertiary">·</span>
              <span className="text-text-primary font-medium">{formatCurrency(cartTotal)}</span>
            </span>
          </Button>
        </div>
      </Header>

      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <Input 
            placeholder="Search products or SKU..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="flex-1"
          />
          <Select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="lg:w-44">
            <option value="all">All Brands</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </Select>
          <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="lg:w-48">
            <option value="all">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c.replace('-', ' ')}</option>)}
          </Select>
          <Select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)} className="lg:w-44">
            <option value="all">All Devices</option>
            {devices.map((d) => <option key={d} value={d}>{d}</option>)}
          </Select>
          <label className="flex items-center gap-2 px-3 py-2 text-xs text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-3.5 h-3.5 rounded-sm border-border bg-surface text-primary focus:ring-primary"
            />
            In stock only
          </label>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filteredProducts.map((p) => (
          <Card key={p.sku} className="p-4 hover:border-border-hover transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-medium text-text-primary">{p.name}</p>
                <p className="text-xs text-text-tertiary font-mono">{p.sku}</p>
              </div>
              <Badge variant={p.available > 10 ? 'success' : p.available > 0 ? 'warning' : 'error'} size="sm">
                {p.available > 10 ? 'In Stock' : p.available > 0 ? 'Low Stock' : 'Out of Stock'}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-tertiary mb-3">
              <span>{p.brand}</span>
              <span>·</span>
              <span className="capitalize">{p.category.replace('-', ' ')}</span>
              <span>·</span>
              <span>{p.device}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <p className="text-lg font-bold text-text-primary">{formatCurrency(p.price)}</p>
                <p className="text-xs text-text-tertiary">{p.margin}% margin</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-tertiary">{p.available} available</span>
                <Button size="sm" onClick={() => addToCart(p)} disabled={p.available <= 0}>
                  Add
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-text-tertiary">No products match your filters</p>
        </Card>
      )}
    </div>
  );
}

export function ProductDetailPage(): JSX.Element {
  const data = useDemoData();
  const product = data.products[0];

  return (
    <div className="space-y-4">
      <Header title={product.name} subtitle={`SKU: ${product.sku}`} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-tertiary uppercase tracking-wider">Brand</p>
              <p className="text-sm text-text-primary mt-1">{product.brand}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary uppercase tracking-wider">Category</p>
              <p className="text-sm text-text-primary mt-1 capitalize">{product.category.replace('-', ' ')}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary uppercase tracking-wider">Compatibility</p>
              <p className="text-sm text-text-primary mt-1">{product.device}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary uppercase tracking-wider">Margin</p>
              <p className="text-sm text-text-primary mt-1">{product.margin}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Trade Price</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{formatCurrency(product.price)}</p>
          <p className="text-xs text-text-tertiary mt-1">{product.available} in stock</p>
          <Button className="w-full mt-4">Add to Order</Button>
        </Card>
      </div>
    </div>
  );
}

export function CartPage(): JSX.Element {
  const [cart, _setCart] = useState<CartItem[]>([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-4">
      <Header title="Cart" subtitle="Review your order" />
      <Card className="p-6">
        {cart.length === 0 ? (
          <p className="text-text-tertiary text-center py-8">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.sku} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-text-primary">{item.name}</p>
                  <p className="text-xs text-text-tertiary">{item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-primary">{item.quantity} × {formatCurrency(item.price)}</p>
                  <p className="text-xs text-text-tertiary">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t border-border">
              <p className="text-sm font-semibold text-text-primary">Total</p>
              <p className="text-lg font-bold text-primary">{formatCurrency(cartTotal)}</p>
            </div>
            <Button className="w-full">Proceed to Checkout</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
