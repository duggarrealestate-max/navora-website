import { useState } from 'react';
import { Header } from '@design/layout/Header';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Input } from '@design/components/Input';
import { useProviders } from '@app/providers/ProviderContext';
import { formatCurrency } from '@shared/utils/format';
import type { BasketSuggestion } from '@integrations/ai/AIProvider';

export function AISalesAssistantPage(): JSX.Element {
  return (
    <div className="space-y-4">
      <Header 
        title="AI Sales Assistant" 
        subtitle="Conversational ordering & recommendation"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <AIBasketBuilder />
        </div>
        <div className="lg:col-span-2">
          <AIConversation />
        </div>
      </div>
    </div>
  );
}

function AIConversation(): JSX.Element {
  const { ai } = useProviders();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
    { role: 'ai', text: 'Hello! I\'m your AI Sales Assistant. How can I help you today?' },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: query }]);
    setLoading(true);
    try {
      const resp = await ai.ask('general-queries', { query });
      setMessages((prev) => [...prev, { role: 'ai', text: resp.text }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: 'I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  const exampleQuestions = [
    'I have £1,500. Build me a fast-moving iPhone accessories order.',
    'Show me products for iPhone 17.',
    'What\'s selling fastest?',
    'Give me alternatives to CHAR-0001',
    'Build a £500 starter order.',
  ];

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-sm bg-primary/20 flex items-center justify-center">
          <span className="text-[10px] text-primary font-bold">AI</span>
        </div>
        <h3 className="text-sm font-semibold text-text-primary">Conversation</h3>
      </div>
      <div className="h-[400px] overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-md text-sm ${
              msg.role === 'user'
                ? 'bg-primary/15 text-text-primary ml-auto max-w-[80%]'
                : 'bg-background-secondary text-text-secondary mr-auto max-w-[80%]'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="p-3 bg-background-secondary rounded-md text-sm text-text-tertiary mr-auto max-w-[80%]">
            Thinking...
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            disabled={loading}
          />
          <Button variant="primary" onClick={handleSend} disabled={loading || !query.trim()}>Send</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((q) => (
            <button
              key={q}
              onClick={() => setQuery(q)}
              className="text-xs px-2.5 py-1.5 bg-background-secondary text-text-secondary rounded-md hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}

function AIBasketBuilder(): JSX.Element {
  const { ai } = useProviders();
  const [budget, setBudget] = useState('1500');
  const [device, setDevice] = useState('iPhone 17');
  const [suggestion, setSuggestion] = useState<BasketSuggestion | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBuild = async () => {
    setLoading(true);
    try {
      const result = await ai.suggestBasket({ budget: parseInt(budget, 10), device });
      setSuggestion(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Build Basket</h3>
        <div className="space-y-3">
          <Input
            label="Budget (£)"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <Input
            label="Device"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
          />
          <Button onClick={handleBuild} disabled={loading} className="w-full">
            {loading ? 'Building...' : 'Build Order'}
          </Button>
        </div>
      </Card>

      {suggestion && (
        <Card className="p-4">
          <h4 className="text-sm font-semibold text-text-primary mb-2">Suggested Basket</h4>
          <p className="text-xs text-text-tertiary mb-3">{suggestion.explanation}</p>
          <div className="space-y-2">
            {suggestion.items.map((item) => (
              <div key={item.sku} className="flex justify-between text-sm">
                <span className="text-text-secondary">{item.name}</span>
                <span className="text-text-primary">
                  {item.quantity} × {formatCurrency(item.unitPrice)} = {formatCurrency(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-3 pt-3">
            <p className="font-bold text-right">{formatCurrency(suggestion.total)}</p>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="ghost" className="flex-1">Adjust Basket</Button>
            <Button size="sm" variant="primary" className="flex-1">Add to Order</Button>
            <Button size="sm" variant="ghost" className="flex-1">Explain</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
