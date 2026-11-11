import type { Product } from '@demo/entities/products';
import type { PricingTier, CustomerPricing } from '../types';

export function getTierMultiplier(tier: PricingTier): number {
  switch (tier) {
    case 'vip':
      return 0.85;
    case 'gold':
      return 0.90;
    case 'standard':
    default:
      return 0.95;
  }
}

export function calculatePrice(basePrice: number, tier: PricingTier): number {
  const multiplier = getTierMultiplier(tier);
  return Math.round(basePrice * multiplier * 100) / 100;
}

export function getQuantityBreakPrice(basePrice: number, quantity: number, tier: PricingTier): number {
  const tierPrice = calculatePrice(basePrice, tier);
  if (quantity >= 50) {
    return Math.round(basePrice * 0.80 * 100) / 100;
  }
  if (quantity >= 10) {
    return Math.round(basePrice * 0.88 * 100) / 100;
  }
  return tierPrice;
}

export function buildCustomerPricing(products: Product[], tier: PricingTier = 'gold'): CustomerPricing[] {
  return products.map((p) => {
    const price = calculatePrice(p.price, tier);
    return {
      sku: p.sku,
      tier,
      price,
      quantityBreaks: [
        { minQty: 1, price: getQuantityBreakPrice(p.price, 1, tier) },
        { minQty: 10, price: getQuantityBreakPrice(p.price, 10, tier) },
        { minQty: 50, price: getQuantityBreakPrice(p.price, 50, tier) },
      ],
    };
  });
}

export function getPriceForQuantity(basePrice: number, quantity: number, tier: PricingTier): number {
  if (quantity >= 50) {
    return Math.round(basePrice * 0.80 * 100) / 100;
  }
  if (quantity >= 10) {
    return Math.round(basePrice * 0.88 * 100) / 100;
  }
  return calculatePrice(basePrice, tier);
}
