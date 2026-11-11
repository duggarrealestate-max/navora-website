import { useState } from 'react';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Badge } from '@design/components/Badge';
import { Input } from '@design/components/Input';
import { useRetailer } from '../components/RetailerContext';
import { useDemoData } from '@app/providers/DemoContext';
import { formatCurrency } from '@shared/utils/format';
import { buildAIBasket } from '../engine/ai-assistant';

const SUGGESTED_PROMPTS = [
  'Build me a £500 starter order',
  'I have £1,500 — build me an iPhone accessories order',
  'Show me fast-selling products under £10',
  'Show iPhone 17 products',
  'Find alternatives to chargers',
];

export function AIAssistantPage(): JSX.Element {
  const { addToCart } = useRetailer();
  const data = useDemoData();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<ReturnType<typeof buildAIBasket> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const basket = buildAIBasket(prompt, data.products);
      setResult(basket);
      setLoading(false);
    }, 600);
  };

  const handleAddBasketToCart = () => {
    if (!result) return;
    for (const item of result.items) {
      addToCart({ sku: item.sku, name: item.name, quantity: item.quantity, unitPrice: item.unitPrice, lineTotal: item.totalPrice, available: 999 });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">TradePilot Buying Assistant</h1>
        <p className="text-sm text-text-secondary mt-1">Describe what you need and we'll build a recommended basket.</p>
      </div>

      <Card className="p-5">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="e.g. Build me a £1,000 iPhone accessories order..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="text-sm"
          />
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setPrompt(suggestion)}
                className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-border text-text-secondary hover:border-border-hover hover:text-text-primary transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <Button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? 'Building basket...' : 'Build Basket'}
          </Button>
        </form>
      </Card>

      {result && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Recommended Basket</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">Total:</span>
              <span className="text-lg font-bold text-primary">{formatCurrency(result.total)}</span>
              {result.budget && (
                <span className="text-xs text-text-tertiary">of {formatCurrency(result.budget)} budget</span>
              )}
            </div>
          </div>

          <p className="text-xs text-text-tertiary mb-4 italic">{result.explanation}</p>

          <div className="space-y-2 mb-4">
            {result.items.map((item) => (
              <div key={item.sku} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{item.name}</p>
                  <p className="text-xs text-text-tertiary">{item.sku} · {item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-primary">{item.quantity} × {formatCurrency(item.unitPrice)}</p>
                  <p className="text-xs text-text-tertiary">{formatCurrency(item.totalPrice)}</p>
                </div>
                <div className="ml-3">
                  <Badge variant={item.inStock ? 'success' : 'warning'} size="sm">
                    {item.inStock ? 'In Stock' : 'Review'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAddBasketToCart} className="flex-1">Add Basket to Cart</Button>
            <Button variant="outline" onClick={() => setResult(null)}>Clear</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
