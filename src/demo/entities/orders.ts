import { randomInt, randomChoice, randomBoolean, randomFloat } from '@demo/data/seed';

export type OrderStatus = 'new' | 'confirmed' | 'picking' | 'ready' | 'dispatched' | 'delivered' | 'cancelled';

export interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'card' | 'bank-transfer' | 'credit' | 'cash-on-delivery';
  paymentStatus: 'pending' | 'paid' | 'partially-paid' | 'overdue' | 'failed';
  deliveryMethod: 'delivery' | 'collection';
  salesRep: string;
  createdAt: string;
  updatedAt: string;
  expectedDelivery: string;
  notes: string;
  channel: 'phone' | 'website' | 'whatsapp' | 'email';
}

const salesReps = ['Jordan Lee', 'Sam Patel', 'Morgan Reeves', 'Taylor Kim', 'Riley Chen', 'Avery Brooks'];

const statusWeights: Array<{ value: OrderStatus; weight: number }> = [
  { value: 'delivered', weight: 40 },
  { value: 'dispatched', weight: 15 },
  { value: 'confirmed', weight: 8 },
  { value: 'ready', weight: 6 },
  { value: 'picking', weight: 5 },
  { value: 'new', weight: 7 },
  { value: 'cancelled', weight: 4 },
];

export function generateOrders(count: number = 120): Order[] {
  const orders: Order[] = [];
  const today = new Date();

  for (let i = 1; i <= count; i++) {
    const itemCount = randomInt(1, 8);
    const items: OrderItem[] = [];
    let subtotal = 0;

    for (let j = 0; j < itemCount; j++) {
      const qty = randomInt(1, 50);
      const unitPrice = Math.round((randomInt(3, 80) + randomFloat() * 0.99) * 100) / 100;
      const itemTotal = Math.round(qty * unitPrice * 100) / 100;
      items.push({
        sku: `CASE-${String(j + 1).padStart(4, '0')}`,
        name: ['AeroShock Pro Case', 'CrystalView Screen Protector', 'SwiftCharge 30W Charger', 'LumenCore USB-C Cable'][j % 4],
        quantity: qty,
        unitPrice,
        totalPrice: itemTotal,
      });
      subtotal += itemTotal;
    }

    subtotal = Math.round(subtotal * 100) / 100;
    const taxRate = 0.2;
    const tax = Math.round(subtotal * taxRate * 100) / 100;
    const deliveryFee = randomBoolean(0.7) ? 0 : 7.99;
    const total = Math.round((subtotal + tax + deliveryFee) * 100) / 100;

    const status = randomWeighted(statusWeights);
    const daysAgo = randomInt(0, 60);
    const createdDate = new Date(today);
    createdDate.setDate(createdDate.getDate() - daysAgo);

    const paymentMethods: Order['paymentMethod'][] = ['card', 'bank-transfer', 'credit', 'cash-on-delivery'];
    const channels: Order['channel'][] = ['phone', 'website', 'whatsapp', 'email'];

    let paymentStatus: Order['paymentStatus'];
    if (status === 'cancelled') {
      paymentStatus = randomBoolean(0.3) ? 'failed' : 'paid';
    } else if (status === 'new' || status === 'confirmed') {
      paymentStatus = randomBoolean(0.6) ? 'paid' : randomBoolean(0.5) ? 'pending' : 'partially-paid';
    } else {
      paymentStatus = randomBoolean(0.75) ? 'paid' : 'partially-paid';
    }

    const deliveryMethod: Order['deliveryMethod'] = randomBoolean(0.6) ? 'delivery' : 'collection';
    const channel = randomChoice(channels);
    const salesRep = randomChoice(salesReps);

    const expectedDelivery = new Date(createdDate);
    expectedDelivery.setDate(expectedDelivery.getDate() + (deliveryMethod === 'delivery' ? randomInt(1, 3) : 0));

    let updatedAt = createdDate;
    if (status !== 'new') {
      const updateOffset = Math.floor(daysAgo * randomFloat() * 0.7);
      updatedAt = new Date(today);
      updatedAt.setDate(updatedAt.getDate() - updateOffset);
    }

    const notesPool = [
      'Customer requested specific color variant.',
      'Urgent delivery needed for 3pm cutoff.',
      'Leave at back door if no answer.',
      'Customer called to confirm delivery window.',
      'Partial order — out of stock on 2 items.',
      'VIP customer, priority handling requested.',
      'Credit terms applied — Net 30.',
      'Customer specified contactless delivery.',
    ];

    orders.push({
      id: `ord-${String(i).padStart(4, '0')}`,
      orderNumber: `ORD-${String(today.getFullYear()).slice(2)}-${String(i).padStart(5, '0')}`,
      customerId: `cust-${String(randomInt(1, 50)).padStart(3, '0')}`,
      customerName: ['ABC Mobiles', 'TechHub London', 'PhoneZone', 'MobileMasters', 'ElectroStore'][i % 5],
      status,
      items,
      subtotal,
      tax,
      deliveryFee,
      total,
      paymentMethod: randomChoice(paymentMethods),
      paymentStatus,
      deliveryMethod,
      salesRep,
      createdAt: createdDate.toISOString(),
      updatedAt: updatedAt.toISOString(),
      expectedDelivery: expectedDelivery.toISOString(),
      notes: randomBoolean(0.4) ? randomChoice(notesPool) : '',
      channel,
    });
  }

  return orders;
}

function randomWeighted<T>(items: Array<{ value: T; weight: number }>): T {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let r = randomFloat() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item.value;
  }
  return items[items.length - 1].value;
}
