import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Badge } from '@design/components/Badge';
import { useRetailer } from '../components/RetailerContext';
import { useDemoData } from '@app/providers/DemoContext';
import { formatCurrency } from '@shared/utils/format';
import { getRetailerProducts, getCustomerPricing } from '../data/retailer-demo';
import { getPriceForQuantity } from '../engine/pricing';

export function ProductDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useRetailer();
  const data = useDemoData();
  const products = getRetailerProducts(data.products);
  const pricing = getCustomerPricing(data.products);
  const product = products.find((p) => p.sku === id) || products[0];
  const priceInfo = pricing.find((p) => p.sku === product.sku);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const unitPrice = priceInfo ? getPriceForQuantity(product.price, quantity, 'gold') : product.price;
  const lineTotal = Math.round(unitPrice * quantity * 100) / 100;

  return (
    <div className="space-y-4">
      <Link to="/retailer/catalogue" className="text-xs text-primary hover:underline">← Back to Catalogue</Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-text-primary">{product.name}</h1>
              <p className="text-xs text-text-tertiary font-mono mt-1">SKU: {product.sku}</p>
            </div>
            <Badge variant={product.available > 10 ? 'success' : product.available > 0 ? 'warning' : 'error'} size="sm">
              {product.available > 10 ? 'In Stock' : product.available > 0 ? 'Low Stock' : 'Out of Stock'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
              <p className="text-xs text-text-tertiary uppercase tracking-wider">Available</p>
              <p className="text-sm text-text-primary mt-1">{product.available} units</p>
            </div>
          </div>

          <Card className="p-4 bg-background-secondary">
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Gold Trade Pricing</h3>
            <div className="space-y-2">
              {priceInfo?.quantityBreaks.map((breakInfo) => (
                <div key={breakInfo.minQty} className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">
                    {breakInfo.minQty === 1 ? '1–9' : breakInfo.minQty === 10 ? '10–49' : '50+'}
                  </span>
                  <span className="font-medium text-text-primary">{formatCurrency(breakInfo.price)}</span>
                </div>
              ))}
            </div>
          </Card>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <p className="text-xs text-text-tertiary uppercase tracking-wider">Your Trade Price</p>
            <p className="text-3xl font-bold text-text-primary mt-2">{formatCurrency(unitPrice)}</p>
            <p className="text-xs text-text-tertiary mt-1">Gold tier · per unit</p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-text-secondary uppercase tracking-wider">Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={product.available}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.available, parseInt(e.target.value) || 1)))}
                  className="w-full mt-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border">
                <span className="text-sm text-text-secondary">Line Total</span>
                <span className="text-lg font-bold text-primary">{formatCurrency(lineTotal)}</span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  addToCart({ sku: product.sku, name: product.name, quantity, unitPrice, lineTotal, available: product.available });
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
                disabled={product.available <= 0}
              >
                {added ? 'Added to Cart ✓' : 'Add to Order'}
              </Button>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">Product Details</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-text-tertiary">MOQ:</span> <span className="text-text-primary">1</span></p>
              <p><span className="text-text-tertiary">Stock Status:</span> <span className="text-text-primary">{product.available > 10 ? 'In Stock' : product.available > 0 ? 'Low Stock' : 'Out of Stock'}</span></p>
              <p><span className="text-text-tertiary">Supplier:</span> <span className="text-text-primary">{product.supplier}</span></p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
