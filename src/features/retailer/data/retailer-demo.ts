import type { RetailerCustomer, CustomerPricing, SavedList, RetailerOrder } from '../types';
import type { Product } from '@demo/entities/products';

export const ABC_MOBILES_ID = 'retailer-abc-mobiles';

export const abcMobilesCustomer: RetailerCustomer = {
  id: ABC_MOBILES_ID,
  name: 'Sarah Johnson',
  businessName: 'ABC Mobiles',
  email: 'sarah@abcmobiles.co.uk',
  phone: '+44 7700 900000',
  address: {
    street: '42 High Street',
    city: 'London',
    postcode: 'SW1A 1AA',
  },
  tier: 'gold',
  creditLimit: 5000,
  outstandingCredit: 1240,
  nextPaymentDue: '2026-08-18',
  accountStatus: 'active',
  primaryContact: 'Sarah Johnson',
  deliveryAddresses: [
    { id: 'addr-1', label: 'Main Store', address: '42 High Street, London, SW1A 1AA' },
    { id: 'addr-2', label: 'Warehouse', address: 'Unit 5, Industrial Estate, London, E14 3AB' },
  ],
  tradeTerms: 'Net 30 days',
  supportContact: 'support@trade-pilot-demo.co.uk',
};

export function getCustomerPricing(products: Product[]): CustomerPricing[] {
  return products.map((p) => {
    const base = p.price;
    const tierMultiplier = 0.90;
    const tierPrice = Math.round(base * tierMultiplier * 100) / 100;

    const quantityBreaks = [
      { minQty: 1, price: Math.round(base * 0.95 * 100) / 100 },
      { minQty: 10, price: Math.round(base * 0.90 * 100) / 100 },
      { minQty: 50, price: Math.round(base * 0.85 * 100) / 100 },
    ];

    return {
      sku: p.sku,
      tier: 'gold',
      price: tierPrice,
      quantityBreaks,
    };
  });
}

export function getRetailerProducts(products: Product[]): Product[] {
  return products.filter((p) => p.active && p.available > 0);
}

export const defaultSavedLists: SavedList[] = [
  {
    id: 'list-1',
    name: 'Weekly Restock',
    items: [
      { sku: 'CASE-0001', name: 'AeroShock Pro Case', quantity: 50, unitPrice: 6.90 },
      { sku: 'CHAR-0001', name: 'SwiftCharge 30W GaN Charger', quantity: 30, unitPrice: 6.90 },
      { sku: 'CABLE-0001', name: 'LumenCore Braided USB-C Cable', quantity: 40, unitPrice: 4.50 },
    ],
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-08-10T10:00:00Z',
  },
  {
    id: 'list-2',
    name: 'Apple Essentials',
    items: [
      { sku: 'PROT-0001', name: 'CrystalView Pro Screen Protector (2-pack)', quantity: 100, unitPrice: 3.20 },
      { sku: 'CABLE-0002', name: 'LightningBolt Pro Cable', quantity: 60, unitPrice: 5.10 },
    ],
    createdAt: '2026-07-15T10:00:00Z',
    updatedAt: '2026-08-08T10:00:00Z',
  },
  {
    id: 'list-3',
    name: 'Charging Products',
    items: [
      { sku: 'CHAR-0002', name: 'VoltMax 25W Fast Charger', quantity: 40, unitPrice: 5.80 },
      { sku: 'PBAT-0001', name: 'PowerCore 10000mAh', quantity: 20, unitPrice: 12.50 },
    ],
    createdAt: '2026-07-10T10:00:00Z',
    updatedAt: '2026-08-05T10:00:00Z',
  },
];

export const defaultRetailerOrders: RetailerOrder[] = [
  {
    id: 'ret-ord-001',
    orderNumber: 'TP-10482',
    customerId: ABC_MOBILES_ID,
    customerName: 'ABC Mobiles',
    status: 'delivered',
    items: [
      { sku: 'CASE-0001', name: 'AeroShock Pro Case', quantity: 100, unitPrice: 6.90, totalPrice: 690 },
      { sku: 'CHAR-0001', name: 'SwiftCharge 30W GaN Charger', quantity: 50, unitPrice: 6.90, totalPrice: 345 },
      { sku: 'CABLE-0001', name: 'LumenCore Braided USB-C Cable', quantity: 80, unitPrice: 4.50, totalPrice: 360 },
    ],
    subtotal: 1395,
    deliveryFee: 0,
    total: 1395,
    paymentMethod: 'credit',
    paymentStatus: 'paid',
    deliveryMethod: 'collection',
    createdAt: '2026-08-01T10:00:00Z',
    expectedDelivery: '2026-08-03T10:00:00Z',
    notes: 'Weekly restock order',
    channel: 'retailer-portal',
  },
  {
    id: 'ret-ord-002',
    orderNumber: 'TP-10483',
    customerId: ABC_MOBILES_ID,
    customerName: 'ABC Mobiles',
    status: 'dispatched',
    items: [
      { sku: 'PROT-0001', name: 'CrystalView Pro Screen Protector (2-pack)', quantity: 200, unitPrice: 3.20, totalPrice: 640 },
      { sku: 'CABLE-0002', name: 'LightningBolt Pro Cable', quantity: 100, unitPrice: 5.10, totalPrice: 510 },
    ],
    subtotal: 1150,
    deliveryFee: 7.99,
    total: 1157.99,
    paymentMethod: 'credit',
    paymentStatus: 'paid',
    deliveryMethod: 'delivery',
    createdAt: '2026-08-05T14:00:00Z',
    expectedDelivery: '2026-08-07T14:00:00Z',
    notes: 'Urgent delivery',
    channel: 'retailer-portal',
  },
  {
    id: 'ret-ord-003',
    orderNumber: 'TP-10484',
    customerId: ABC_MOBILES_ID,
    customerName: 'ABC Mobiles',
    status: 'picking',
    items: [
      { sku: 'PBAT-0001', name: 'PowerCore 10000mAh', quantity: 60, unitPrice: 12.50, totalPrice: 750 },
      { sku: 'CHAR-0003', name: 'EcoCharge Mini Charger', quantity: 80, unitPrice: 4.20, totalPrice: 336 },
    ],
    subtotal: 1086,
    deliveryFee: 0,
    total: 1086,
    paymentMethod: 'credit',
    paymentStatus: 'pending',
    deliveryMethod: 'collection',
    createdAt: '2026-08-10T09:00:00Z',
    expectedDelivery: '2026-08-11T09:00:00Z',
    notes: '',
    channel: 'retailer-portal',
  },
];

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  orderNumber: string;
  date: string;
  amount: number;
  status: 'paid' | 'due' | 'overdue';
  dueDate: string;
}

export const defaultInvoices: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2026-001',
    orderId: 'ret-ord-001',
    orderNumber: 'TP-10482',
    date: '2026-08-01',
    amount: 1395,
    status: 'paid',
    dueDate: '2026-08-31',
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2026-002',
    orderId: 'ret-ord-002',
    orderNumber: 'TP-10483',
    date: '2026-08-05',
    amount: 1157.99,
    status: 'due',
    dueDate: '2026-09-04',
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2026-003',
    orderId: 'ret-ord-003',
    orderNumber: 'TP-10484',
    date: '2026-08-10',
    amount: 1086,
    status: 'due',
    dueDate: '2026-09-09',
  },
];

export const newArrivals = [
  { sku: 'CASE-0050', name: 'iPhone 17 AeroShock Pro Case', category: 'cases', isNew: true },
  { sku: 'CHAR-0050', name: '45W GaN Fast Charger', category: 'chargers', isNew: true },
  { sku: 'PBAT-0050', name: 'MagSafe Compatible Power Bank', category: 'power-banks', isNew: true },
  { sku: 'PROT-0050', name: 'New Privacy Glass Protector', category: 'screen-protectors', isNew: true },
  { sku: 'CCRA-0050', name: 'SmartDetect 45W Car Charger', category: 'car-chargers', isNew: true },
];

export const recommendedForAbcMobiles = [
  { sku: 'CASE-0001', name: 'AeroShock Pro Case', reason: 'Frequently purchased' },
  { sku: 'CHAR-0001', name: 'SwiftCharge 30W GaN Charger', reason: 'Top seller in chargers' },
  { sku: 'PROT-0001', name: 'CrystalView Pro Screen Protector (2-pack)', reason: 'Pairs with cases' },
  { sku: 'CABLE-0001', name: 'LumenCore Braided USB-C Cable', reason: 'Fast mover' },
  { sku: 'PBAT-0001', name: 'PowerCore 10000mAh', reason: 'Growing category' },
];
