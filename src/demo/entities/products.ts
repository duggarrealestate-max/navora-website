import { randomInt, randomChoice, randomBoolean, randomFloat } from '@demo/data/seed';

export type ProductCategory =
  | 'cases'
  | 'screen-protectors'
  | 'chargers'
  | 'cables'
  | 'power-banks'
  | 'car-chargers'
  | 'wireless-chargers'
  | 'earbuds';

export type ProductBrand =
  | 'AeroShock'
  | 'CrystalView'
  | 'SwiftCharge'
  | 'LumenCore'
  | 'MagPower'
  | 'VoltMax'
  | 'EcoCharge'
  | 'PowerBoost'
  | 'SoundCore'
  | 'UrbanEdge';

export type DeviceCompatibility =
  | 'iPhone 17'
  | 'iPhone 16'
  | 'Samsung S25'
  | 'Samsung S24'
  | 'Google Pixel 9'
  | 'OnePlus 13'
  | 'Universal';

export type StockStatus = 'fast-mover' | 'slow-mover' | 'dead-stock' | 'low-stock' | 'out-of-stock' | 'overstocked' | 'normal';

export interface Product {
  sku: string;
  name: string;
  description: string;
  brand: ProductBrand;
  category: ProductCategory;
  device: DeviceCompatibility;
  stock: number;
  reserved: number;
  available: number;
  cost: number;
  price: number;
  margin: number;
  sales30d: number;
  reorderLevel: number;
  stockAge: number;
  status: StockStatus;
  supplier: string;
  lastRestock: string;
  imageUrl: string;
  active: boolean;
}

const categoryNames: Record<ProductCategory, string> = {
  cases: 'Phone Cases',
  'screen-protectors': 'Screen Protectors',
  chargers: 'Chargers',
  cables: 'Cables',
  'power-banks': 'Power Banks',
  'car-chargers': 'Car Chargers',
  'wireless-chargers': 'Wireless Chargers',
  earbuds: 'Earbuds',
};

const categoryPrefixes: Record<ProductCategory, string> = {
  cases: 'CASE',
  'screen-protectors': 'PROT',
  chargers: 'CHAR',
  cables: 'CABLE',
  'power-banks': 'PBAT',
  'car-chargers': 'CCRA',
  'wireless-chargers': 'WCHA',
  earbuds: 'BUDH',
};

const productNames: Record<ProductCategory, string[]> = {
  cases: [
    'AeroShock Pro Case', 'UrbanEdge Rugged Case', 'CrystalClear Slim Case',
    'MagLock Compatible Case', 'DropShield Impact Case', 'UltraThin Frost Case',
    'BioArmor Antimicrobial Case', 'LuxeLeather Wallet Case',
  ],
  'screen-protectors': [
    'CrystalView Pro Screen Protector (2-pack)', 'TempestShield Glass Protector',
    'ClearView HD Protector', 'Anti-Glare Privacy Screen', 'BlueLight Filter Protector',
    'Oleophobic Coating Glass', 'UltraThin PET Film',
  ],
  chargers: [
    'SwiftCharge 30W GaN Charger', 'VoltMax 25W Fast Charger', 'EcoCharge Mini Charger',
    'PowerBoost 45W Desktop Charger', 'RapidCharge 65W GaN', 'CompactPlug 18W',
    'MultiPort 65W GaN (4-port)', 'SmartSense PD Charger',
  ],
  cables: [
    'LumenCore Braided USB-C Cable', 'LightningBolt Pro Cable', 'FastLink USB-C Cable',
    'TangleFree Nylon Cable', 'EcoFlex Silicone Cable', 'Retractable Travel Cable',
    'USB-C to Lightning Cable', 'USB-C to USB-A Adapter',
  ],
  'power-banks': [
    'PowerCore 10000mAh', 'UltraCompact 5000mAh', 'FastCharge 20000mAh',
    'SlimLine 5000mAh', 'SolarCharge 15000mAh', 'MagSafe Compatible 5000mAh',
    'PD 30W Power Bank 15000mAh',
  ],
  'car-chargers': [
    'RapidCar 30W Charger', 'DualPort Pro Charger', 'CompactCar 18W',
    'SmartDetect 45W Car Charger', 'USB-C PD Car Charger', 'Cigarette Lighter Adapter',
  ],
  'wireless-chargers': [
    'MagPower Foldable Charger', 'FlatLine Qi Charger', 'FastCharge Pad',
    'MultiDevice Charging Station', 'UltraThin Disc Charger', 'Wooden Bamboo Charger',
  ],
  earbuds: [
    'SoundCore Mini Earbuds', 'BassBoost Pro', 'UrbanFit True Wireless',
    'NoiseCancel ANC Earbuds', 'UltraLight Earbuds', 'GamingComm X1',
    'SweatGuard Sports Earbuds', 'StudioPro Balanced Earbuds',
  ],
};

const brands: ProductBrand[] = ['AeroShock', 'CrystalView', 'SwiftCharge', 'LumenCore', 'MagPower', 'VoltMax', 'EcoCharge', 'PowerBoost', 'SoundCore', 'UrbanEdge'];
const devices: DeviceCompatibility[] = ['iPhone 17', 'iPhone 16', 'Samsung S25', 'Samsung S24', 'Google Pixel 9', 'OnePlus 13', 'Universal'];
const suppliers = ['TechDistrib Ltd', 'Global Wholesale Co', 'Metro Supply', 'Nexus Traders', 'Prime Distributors'];

function getRandomDeviceForCategory(category: ProductCategory): DeviceCompatibility {
  const universalChances = ['cables', 'chargers', 'power-banks', 'wireless-chargers', 'earbuds'];
  if (universalChances.includes(category) && randomBoolean(0.4)) return 'Universal';
  return randomChoice(devices);
}

function calculateStockStatus(stock: number, reorderLevel: number, sales30d: number): StockStatus {
  if (stock === 0) return 'out-of-stock';
  if (stock >= reorderLevel && sales30d > 0) {
    const daysLeft = Math.floor(stock / (sales30d / 30));
    if (daysLeft <= 4 && sales30d >= 10) return 'low-stock';
    if (daysLeft <= 2 && sales30d >= 15) return 'low-stock';
  }
  if (sales30d > 20) return 'fast-mover';
  if (sales30d > 5 && sales30d <= 20) return 'normal';
  if (sales30d > 0 && sales30d <= 5) return 'slow-mover';
  if (stock > 200 && sales30d === 0) return 'dead-stock';
  if (stock > 300) return 'overstocked';
  return 'normal';
}

export function generateProducts(count: number = 100): Product[] {
  const products: Product[] = [];

  for (let i = 1; i <= count; i++) {
    const category = randomChoice(Object.keys(categoryNames) as ProductCategory[]);
    const brand = randomChoice(brands);
    const name = randomChoice(productNames[category]);
    const device = getRandomDeviceForCategory(category);
    const cost = randomInt(3, 50) + randomFloat() * 0.5;
    const price = Math.round(cost * (randomInt(1, 1) === 1 ? randomInt(3, 4) : 2.5) * 100) / 100;
    const margin = Math.round(((price - cost) / price) * 100);
    const sales30d = category === 'cases' || category === 'chargers' || category === 'cables'
      ? randomInt(0, 40)
      : randomInt(0, 25);

    let stock: number;
    if (sales30d > 15) {
      stock = randomInt(50, 250);
    } else if (sales30d > 5) {
      stock = randomInt(100, 500);
    } else if (sales30d > 0) {
      stock = randomInt(200, 800);
    } else {
      stock = randomInt(0, 500);
    }

    const reorderLevel = Math.max(20, Math.round(sales30d / 30 * 10));
    const reserved = Math.min(Math.floor(randomFloat() * 30), stock);
    const stockAge = sales30d > 0 ? randomInt(1, 30) : randomInt(30, 120);
    const status = calculateStockStatus(stock, reorderLevel, sales30d);

    products.push({
      sku: `${categoryPrefixes[category]}-${String(i).padStart(4, '0')}`,
      name,
      description: `${brand} ${name} compatible with ${device}. High-quality wholesale accessory for mobile phone repair and retail businesses.`,
      brand,
      category,
      device,
      stock,
      reserved,
      available: stock - reserved,
      cost: Math.round(cost * 100) / 100,
      price: Math.round(price * 100) / 100,
      margin,
      sales30d,
      reorderLevel,
      stockAge,
      status,
      supplier: randomChoice(suppliers),
      lastRestock: new Date(Date.now() - randomInt(0, 30) * 24 * 3600 * 1000).toISOString(),
      imageUrl: `/images/products/${category}/${i}.jpg`,
      active: randomBoolean(0.95),
    });
  }

  return products;
}

export function getBasketForIntent(params: { budget?: number; device?: string; categories?: string[]; excludeSku?: string }): Product[] {
  const all = generateProducts(100);
  let filtered = all.filter((p) => p.active && p.available > 0 && p.status !== 'out-of-stock');

  if (params.device && params.device !== 'Universal') {
    filtered = filtered.filter((p) => p.device === params.device || p.device === 'Universal');
  }

  if (params.categories && params.categories.length > 0) {
    filtered = filtered.filter((p) => params.categories!.includes(p.category));
  }

  if (params.excludeSku) {
    filtered = filtered.filter((p) => p.sku !== params.excludeSku);
  }

  filtered.sort((a, b) => b.sales30d - a.sales30d);
  return filtered;
}

export function generateDemoBasket(params: {
  budget?: number;
  device?: string;
  categories?: string[];
  excludeSku?: string;
}): { items: Array<{ sku: string; name: string; quantity: number; unitPrice: number; totalPrice: number; category: string; margin: number; inStock: boolean }>; total: number; budget?: number; categories: string[]; explanation: string } {
  const products = getBasketForIntent(params);
  const budget = params.budget || 1500;
  const items: Array<{ sku: string; name: string; quantity: number; unitPrice: number; totalPrice: number; category: string; margin: number; inStock: boolean }> = [];
  let total = 0;
  let remaining = budget;

  const quantitiesByCategory: Record<string, number> = {
    cases: 100,
    'screen-protectors': 80,
    chargers: 50,
    cables: 60,
    'power-banks': 20,
    'car-chargers': 30,
    'wireless-chargers': 25,
    earbuds: 15,
  };

  const preferredCategories = params.categories || ['cases', 'screen-protectors', 'chargers', 'cables'];

  for (const cat of preferredCategories) {
    const categoryProducts = products.filter((p) => p.category === cat);
    if (categoryProducts.length === 0) continue;

    const topProduct = categoryProducts[0];
    const qty = Math.min(quantitiesByCategory[cat] || 50, Math.floor(remaining / topProduct.price));
    if (qty < 1) continue;

    const itemTotal = qty * topProduct.price;
    if (itemTotal > remaining) continue;

    items.push({
      sku: topProduct.sku,
      name: topProduct.name,
      quantity: qty,
      unitPrice: topProduct.price,
      totalPrice: itemTotal,
      category: cat,
      margin: topProduct.margin,
      inStock: topProduct.available >= qty,
    });
    total += itemTotal;
    remaining -= itemTotal;
  }

  const categories = [...new Set(items.map((i) => i.category))];

  return {
    items,
    total,
    budget,
    categories,
    explanation: `Selected top-selling ${params.device || ''} products. ${items.length} items totalling ${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(total)}.`,
  };
}
