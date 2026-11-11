import { generateDemoBasket, getBasketForIntent } from '@demo/entities/products';
import type { Product } from '@demo/entities/products';

export interface AIBasketResult {
  items: Array<{
    sku: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    category: string;
    inStock: boolean;
  }>;
  total: number;
  budget?: number;
  explanation: string;
}

function parseIntent(prompt: string): { budget?: number; device?: string; categories?: string[]; intent: string } {
  const lower = prompt.toLowerCase();
  const budgetMatch = lower.match(/(?:£|gbp)?\s*([\d,]+)/);
  const budget = budgetMatch ? parseInt(budgetMatch[1].replace(/,/g, ''), 10) : undefined;

  const deviceKeywords: Record<string, string> = {
    'iphone 17': 'iPhone 17',
    'iphone 16': 'iPhone 16',
    'samsung s25': 'Samsung S25',
    'samsung s24': 'Samsung S24',
    'pixel 9': 'Google Pixel 9',
    'oneplus': 'OnePlus 13',
  };

  let device: string | undefined;
  for (const [key, value] of Object.entries(deviceKeywords)) {
    if (lower.includes(key)) {
      device = value;
      break;
    }
  }

  const categoryMap: Record<string, string[]> = {
    'case': ['cases'],
    'screen protector': ['screen-protectors'],
    'charger': ['chargers'],
    'cable': ['cables'],
    'power bank': ['power-banks'],
    'car': ['car-chargers'],
    'wireless': ['wireless-chargers'],
    'earbuds': ['earbuds'],
    'audio': ['earbuds'],
  };

  const categories: string[] = [];
  for (const [key, values] of Object.entries(categoryMap)) {
    if (lower.includes(key)) {
      categories.push(...values);
    }
  }

  let intent = 'general';
  if (lower.includes('fast-selling') || lower.includes('fast moving') || lower.includes('popular')) {
    intent = 'fast-selling';
  } else if (lower.includes('under') && budget) {
    intent = 'budget';
  } else if (lower.includes('starter')) {
    intent = 'starter';
  } else if (categories.length > 0) {
    intent = 'category';
  }

  return { budget, device, categories: categories.length > 0 ? categories : undefined, intent };
}

export function buildAIBasket(prompt: string, _allProducts: Product[]): AIBasketResult {
  const { budget, device, categories, intent } = parseIntent(prompt);
  const effectiveBudget = budget || 1500;

  if (intent === 'fast-selling') {
    const products = getBasketForIntent({ device, categories: categories || ['cases', 'chargers', 'cables'] });
    const items: AIBasketResult['items'] = [];
    let total = 0;

    for (const p of products.slice(0, 5)) {
      if (total >= effectiveBudget) break;
      const qty = Math.min(Math.floor(effectiveBudget / p.price), p.available);
      if (qty < 1) continue;
      const lineTotal = Math.round(qty * p.price * 100) / 100;
      items.push({
        sku: p.sku,
        name: p.name,
        quantity: qty,
        unitPrice: p.price,
        totalPrice: lineTotal,
        category: p.category,
        inStock: p.available >= qty,
      });
      total += lineTotal;
    }

    return {
      items,
      total: Math.round(total * 100) / 100,
      budget: effectiveBudget,
      explanation: `Built from ${items.length} fast-selling products. ${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(total)} of ${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(effectiveBudget)} budget used.`,
    };
  }

  const result = generateDemoBasket({ budget: effectiveBudget, device, categories });
  return {
    items: result.items.map((item) => ({
      ...item,
      inStock: true,
    })),
    total: result.total,
    budget: effectiveBudget,
    explanation: result.explanation,
  };
}

export function buildReplacementBasket(_excludeSku: string, _allProducts: Product[]): AIBasketResult {
  const products = getBasketForIntent({ excludeSku: _excludeSku });
  const items: AIBasketResult['items'] = [];
  let total = 0;

  for (const p of products.slice(0, 3)) {
    const qty = Math.min(20, p.available);
    const lineTotal = Math.round(qty * p.price * 100) / 100;
    items.push({
      sku: p.sku,
      name: p.name,
      quantity: qty,
      unitPrice: p.price,
      totalPrice: lineTotal,
      category: p.category,
      inStock: p.available >= qty,
    });
    total += lineTotal;
  }

  return {
    items,
    total: Math.round(total * 100) / 100,
    explanation: `Alternative products since the original is unavailable. ${items.length} alternatives selected.`,
  };
}
