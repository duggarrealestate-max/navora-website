import type { AIProvider, AIIntent, AIIntentPayload, AIResponse, BasketSuggestion } from '@integrations/ai/AIProvider';
import { generateDemoBasket } from '@demo/entities/products';
import { customers as demoCustomers } from '@demo/entities/all';
import type { Customer } from '@demo/entities/customers';

export class DemoAIProvider implements AIProvider {
  private customers: Customer[] = demoCustomers;
  private lastResponseIndex = 0;

  getName(): string {
    return 'Demo AI Provider';
  }

  async ask(intent: AIIntent, payload: AIIntentPayload): Promise<AIResponse> {
    const query = payload.query.toLowerCase();
    let response: AIResponse;

    switch (intent) {
      case 'suggest-basket':
        response = this.handleBasketIntent(query);
        break;
      case 'product-recommendation':
        response = this.handleProductIntent(query);
        break;
      case 'customer-insight':
        response = this.handleCustomerInsightIntent(payload.context);
        break;
      case 'stock-reorder':
        response = this.handleStockReorderIntent();
        break;
      case 'follow-up-list':
        response = this.handleFollowUpIntent();
        break;
      case 'credit-list':
        response = this.handleCreditIntent();
        break;
      case 'week-summary':
        response = this.handleWeekSummaryIntent();
        break;
      case 'alternatives':
        response = this.handleAlternativesIntent(query);
        break;
      default:
        response = this.handleGeneralIntent(query);
        break;
    }

    this.lastResponseIndex = (this.lastResponseIndex + 1) % 100;
    return { ...response, confidence: 0.92 };
  }

  async suggestBasket(params: {
    budget?: number;
    device?: string;
    categories?: string[];
    excludeSku?: string;
  }): Promise<BasketSuggestion> {
    return generateDemoBasket(params);
  }

  private handleBasketIntent(query: string): AIResponse {
    if (query.includes('iphone') || query.includes('starter') || query.includes('budget')) {
      return {
        text: 'Here is a fast-moving iPhone accessories bundle within budget:',
        data: { type: 'basket' },
        suggestions: ['Adjust quantities', 'Add to order', 'See alternatives'],
        confidence: 0.95,
      };
    }
    return {
      text: 'I can help build a basket. How much budget do you have and which device?',
      suggestions: ['Build a £500 order', 'iPhone 17 accessories', 'Best sellers'],
      confidence: 0.88,
    };
  }

  private handleProductIntent(query: string): AIResponse {
    if (query.includes('iphone 17')) {
      return {
        text: 'Top-rated iPhone 17 accessories in stock:\n\n• **AeroShock Pro Case** — 420 units • £7.50\n• **CrystalView Pro Screen Protector (2-pack)** — 1,200 units • £4.90\n• **SwiftCharge 30W GaN Charger** — 82 units • £18.50\n• **LumenCore Braided USB-C Cable** — 340 units • £6.20\n• **MagPower Foldable Wireless Charger** — 156 units • £22.00',
        confidence: 0.93,
      };
    }
    return {
      text: 'Let me know which device you need accessories for and your budget.',
      suggestions: ['iPhone 17', 'Samsung S25', 'Universal'],
      confidence: 0.9,
    };
  }

  private handleCustomerInsightIntent(_context?: Record<string, unknown>): AIResponse {
    const customers = this.customers;
    const atRisk = customers.filter((c) => c.segment === 'at-risk' || c.segment === 'dormant');
    const topCustomers = customers
      .filter((c) => c.segment === 'vip')
      .sort((a, b) => b.lifetimeValue - a.lifetimeValue)
      .slice(0, 3);

    return {
      text: `${atRisk.length} high-value customers are ordering later than their normal buying pattern. Top VIPs to call: ${topCustomers.map((c) => c.name).join(', ')}.`,
      data: { atRiskCount: atRisk.length, topVIPs: topCustomers.map((c) => c.name) },
      suggestions: ['Call at-risk customers', 'Email top VIPs', 'Review credit'],
      confidence: 0.89,
    };
  }

  private handleStockReorderIntent(): AIResponse {
    return {
      text: 'Based on recent sales velocity, reorder these items within 48 hours:\n\n• **USB-C 30W Charger** — 82 units left, reorder 200 units\n• **iPhone 17 Pro Case (Black)** — 35 units left, reorder 150 units\n• **CrystalView Screen Protector** — 1,200 units left, reorder 500 units',
      confidence: 0.94,
    };
  }

  private handleFollowUpIntent(): AIResponse {
    return {
      text: 'Your team should call these 7 customers tomorrow:\n\n1. ABC Mobiles — £1,240 last order, 23 days since last purchase\n2. TechHub London — £2,890 LTV, 19 days overdue\n3. PhoneZone — £980 last order, credit limit warning\n\nI\'ve prepared approved WhatsApp follow-up templates for each.',
      confidence: 0.91,
    };
  }

  private handleCreditIntent(): AIResponse {
    return {
      text: '3 customers currently have overdue credit:\n\n• **ABC Mobiles** — £2,400 outstanding (due 14 days ago)\n• **TechHub London** — £1,850 outstanding (due 8 days ago)\n• **PhoneZone** — £920 outstanding (due 3 days ago)\n\nTotal overdue: £5,170',
      confidence: 0.96,
    };
  }

  private handleWeekSummaryIntent(): AIResponse {
    return {
      text: `This week's changes:\n\n• Sales up 12% vs last week (£72,340 vs £64,580)\n• 3 customers moved to "At Risk" segment\n• USB-C 30W chargers below safety stock (4 days left)\n• New product "AeroShock Pro Case" became a fast mover`,
      confidence: 0.87,
    };
  }

  private handleAlternativesIntent(query: string): AIResponse {
    const sku = query.match(/sku[:\s]+([a-z0-9-]+)/i)?.[1];
    if (sku) {
      return {
        text: `Alternatives to ${sku}:\n\n• **EcoCharge 30W GaN** — £17.99 (92% match, 156 units)\n• **PowerBoost 30W** — £14.50 (88% match, 203 units)\n• **VoltMax 25W** — £12.50 (78% match, 440 units)`,
        confidence: 0.85,
      };
    }
    return {
      text: 'Please provide a product SKU for alternatives, e.g. "alternatives to SKU-C001".',
      confidence: 0.7,
    };
  }

  private handleGeneralIntent(query: string): AIResponse {
    return {
      text: `I understand you're asking about: "${query}". As your AI co-pilot, I can help with sales insights, customer follow-ups, stock recommendations, and order suggestions. What would you like to explore?`,
      suggestions: [
        'Which customers should my team call tomorrow?',
        'What stock should I reorder?',
        'Which customers owe us money?',
        'What changed this week?',
      ],
      confidence: 0.8,
    };
  }
}
