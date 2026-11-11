import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Badge } from '@design/components/Badge';
import { Input } from '@design/components/Input';
import { Select } from '@design/components/Select';
import { useRetailer } from '../components/RetailerContext';
import { useDemoData } from '@app/providers/DemoContext';
import { formatCurrency } from '@shared/utils/format';
import type { ProductCategory, DeviceCompatibility, ProductBrand } from '@demo/entities/products';
import { getRetailerProducts } from '../data/retailer-demo';
import { getPriceForQuantity } from '../engine/pricing';

const categoryNames: Record<ProductCategory, string> = {
  cases: 'Cases',
  'screen-protectors': 'Screen Protectors',
  chargers: 'Chargers',
  cables: 'Cables',
  'power-banks': 'Power Banks',
  'car-chargers': 'Car Chargers',
  'wireless-chargers': 'Wireless Charging',
  earbuds: 'Audio',
};

export function CataloguePage(): JSX.Element {
  const data = useDemoData();
  const { addToCart } = useRetailer();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [brand, setBrand] = useState<string>('all');
  const [device, setDevice] = useState<string>('all');
  const [availability, setAvailability] = useState<string>('all');

  const products = getRetailerProducts(data.products);
  const brands = Array.from(new Set(data.products.map((p) => p.brand))) as ProductBrand[];
  const devices: DeviceCompatibility[] = ['iPhone 17', 'iPhone 16', 'Samsung S25', 'Samsung S24', 'Google Pixel 9', 'OnePlus 13', 'Universal'];
  const categories: ProductCategory[] = ['cases', 'screen-protectors', 'chargers', 'cables', 'power-banks', 'car-chargers', 'wireless-chargers', 'earbuds'];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'all' && p.category !== category) return false;
      if (brand !== 'all' && p.brand !== brand) return false;
      if (device !== 'all' && p.device !== device) return false;
      if (availability === 'in-stock' && p.available <= 0) return false;
      if (availability === 'low-stock' && p.available > 10) return false;
      return true;
    });
  }, [products, search, category, brand, device, availability]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Catalogue</h1>
        <p className="text-sm text-text-secondary mt-1">Browse our full wholesale range. Your Gold trade prices are shown.</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <Input
            placeholder="Search products or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Select value={category} onChange={(e) => setCategory(e.target.value)} className="lg:w-48">
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{categoryNames[c]}</option>
            ))}
          </Select>
          <Select value={brand} onChange={(e) => setBrand(e.target.value)} className="lg:w-40">
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </Select>
          <Select value={device} onChange={(e) => setDevice(e.target.value)} className="lg:w-44">
            <option value="all">All Devices</option>
            {devices.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </Select>
          <Select value={availability} onChange={(e) => setAvailability(e.target.value)} className="lg:w-36">
            <option value="all">All Stock</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
          </Select>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((p) => {
          const goldPrice = getPriceForQuantity(p.price, 1, 'gold');
          return (
            <Link key={p.sku} to={`/retailer/product/${p.sku}`} className="block">
              <Card className="p-4 hover:border-border-hover transition-colors h-full">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{p.name}</p>
                    <p className="text-xs text-text-tertiary font-mono">{p.sku}</p>
                  </div>
                  <Badge variant={p.available > 10 ? 'success' : p.available > 0 ? 'warning' : 'error'} size="sm">
                    {p.available > 10 ? 'In Stock' : p.available > 0 ? 'Low Stock' : 'Out of Stock'}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-tertiary mb-3">
                  <span>{p.brand}</span>
                  <span>·</span>
                  <span className="capitalize">{p.category.replace('-', ' ')}</span>
                  <span>·</span>
                  <span>{p.device}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-lg font-bold text-text-primary">{formatCurrency(goldPrice)}</p>
                    <p className="text-[10px] text-text-tertiary">Gold trade price</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart({ sku: p.sku, name: p.name, quantity: 1, unitPrice: goldPrice, lineTotal: goldPrice, available: p.available });
                    }}
                    disabled={p.available <= 0}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-text-tertiary">No products match your filters</p>
        </Card>
      )}
    </div>
  );
}
