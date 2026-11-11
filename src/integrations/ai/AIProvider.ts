export type AIIntent =
  | 'suggest-basket'
  | 'product-recommendation'
  | 'customer-insight'
  | 'stock-reorder'
  | 'follow-up-list'
  | 'credit-list'
  | 'week-summary'
  | 'alternatives'
  | 'general-queries';

export interface AIIntentPayload {
  query: string;
  context?: Record<string, unknown>;
}

export interface AIResponse {
  text: string;
  data?: Record<string, unknown>;
  suggestions?: string[];
  confidence: number;
}

export interface BasketItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  margin: number;
  inStock: boolean;
}

export interface BasketSuggestion {
  items: BasketItem[];
  total: number;
  budget?: number;
  categories: string[];
  explanation: string;
}

export interface AIProvider {
  ask(intent: AIIntent, payload: AIIntentPayload): Promise<AIResponse>;
  suggestBasket(params: {
    budget?: number;
    device?: string;
    categories?: string[];
    excludeSku?: string;
  }): Promise<BasketSuggestion>;
  getName(): string;
}
