import { useState } from 'react';
import { Button } from '@design/components/Button';
import { Input } from '@design/components/Input';
import { useProviders } from '@app/providers/ProviderContext';

interface OwnerCoPilotProps {
  insight: {
    atRiskCount: number;
    creditRiskCount: number;
    lowStockCount: number;
  };
}

interface Insight {
  id: string;
  text: string;
}

export function OwnerCoPilot({ insight }: OwnerCoPilotProps): JSX.Element {
  const { ai } = useProviders();
  const [query, setQuery] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [insights] = useState<Insight[]>([
    {
      id: '1',
      text: `${insight.atRiskCount} customers are ordering later than their normal buying pattern. High-value at-risk accounts should be prioritized.`,
    },
    {
      id: '2',
      text: 'USB-C 30W chargers may run below safety stock within 4 days based on recent sales velocity.',
    },
    {
      id: '3',
      text: `${insight.creditRiskCount} customers have overdue credit exceeding £5,000 total. Consider escalating to collection.`,
    },
  ]);
  const [response, setResponse] = useState<string | null>(null);

  const exampleQuestions = [
    'Which customers should my team call tomorrow?',
    'What stock should I reorder?',
    'Which customers owe us money?',
    'What changed this week?',
    'Which products stopped moving?',
  ];

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsResponding(true);
    setResponse(null);

    try {
      const resp = await ai.ask('general-queries', { query });
      setResponse(resp.text);
    } catch {
      setResponse('Sorry, I encountered an issue. Please try rephrasing your question.');
    } finally {
      setIsResponding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.id} className="flex items-start gap-3 p-3 bg-background-secondary rounded-md">
            <span className="text-primary text-lg">💡</span>
            <p className="text-sm text-text-secondary">{insight.text}</p>
          </div>
        ))}
      </div>

      {response && (
        <div className="p-4 bg-background-tertiary rounded-md border border-border">
          <p className="text-sm text-text-primary whitespace-pre-wrap">{response}</p>
        </div>
      )}

      <div className="space-y-2">
        <Input
          placeholder="Ask your business..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAsk();
          }}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={handleAsk}
          disabled={isResponding || !query.trim()}
          icon={isResponding ? '⏳' : '→'}
        >
          {isResponding ? 'Thinking...' : 'Ask'}
        </Button>
      </div>

      {!response && !isResponding && (
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((q) => (
            <button
              key={q}
              onClick={() => setQuery(q)}
              className="text-xs px-3 py-1.5 bg-background-secondary text-text-secondary rounded-md hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
