import { randomInt, randomChoice, randomBoolean } from '@demo/data/seed';

export type ActivityType =
  | 'order-created'
  | 'order-updated'
  | 'order-cancelled'
  | 'payment-received'
  | 'credit-warning'
  | 'stock-alert'
  | 'customer-call'
  | 'customer-email'
  | 'whatsapp-message'
  | 'automaton-run'
  | 'note-added'
  | 'task-completed';

export interface ActivityLog {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  customerId?: string;
  orderId?: string;
  productId?: string;
  salesRep?: string;
  timestamp: string;
  unread: boolean;
  metadata?: Record<string, unknown>;
}

const activityTemplates: Array<{
  type: ActivityType;
  titleTemplate: (n: string) => string;
  descTemplate: (n: string) => string;
}> = [
  {
    type: 'order-created',
    titleTemplate: (n) => `Order #${n} placed`,
    descTemplate: (n) => `New order #${n} received from ABC Mobiles.`,
  },
  {
    type: 'order-updated',
    titleTemplate: (n) => `Order #${n} dispatched`,
    descTemplate: (n) => `Order #${n} has been dispatched via Royal Mail tracked delivery.`,
  },
  {
    type: 'payment-received',
    titleTemplate: (n) => `Payment received for #${n}`,
    descTemplate: (n) => `£${randomInt(100, 5000)} payment received for order #${n}.`,
  },
  {
    type: 'credit-warning',
    titleTemplate: (n) => `Credit limit exceeded — ${n}`,
    descTemplate: (n) => `Customer ${n} exceeds credit limit by £${randomInt(100, 500)}.`,
  },
  {
    type: 'stock-alert',
    titleTemplate: (n) => `Low stock: ${n}`,
    descTemplate: (n) => `${n} is below safety stock (82 units remaining).`,
  },
  {
    type: 'customer-call',
    titleTemplate: (n) => `Call logged: ${n}`,
    descTemplate: (n) => `Sales rep spoke with ${n}. Discussed upcoming order.`,
  },
  {
    type: 'whatsapp-message',
    titleTemplate: (n) => `WhatsApp from ${n}`,
    descTemplate: (n) => `Customer ${n} sent a WhatsApp message about product availability.`,
  },
  {
    type: 'automaton-run',
    titleTemplate: (n) => `Automation: ${n}`,
    descTemplate: (n) => `Workflow "${n}" completed successfully.`,
  },
  {
    type: 'note-added',
    titleTemplate: (n) => `Note added: ${n}`,
    descTemplate: (n) => `Internal note added to ${n} account.`,
  },
];

const customerNames = ['ABC Mobiles', 'TechHub London', 'PhoneZone', 'MobileMasters', 'ElectroStore', 'Gadget Galaxy', 'SmartPhone Shop', 'Urban Mobile', 'TechStop', 'PhoneWorld'];
const productNames = ['USB-C 30W Charger', 'iPhone 17 Pro Case', 'CrystalView Screen Protector', 'LumenCore Cable', 'PowerCore 10000mAh'];

export function generateActivities(count: number = 40): ActivityLog[] {
  const activities: ActivityLog[] = [];
  const today = new Date();

  for (let i = 1; i <= count; i++) {
    const template = randomChoice(activityTemplates);
    const dayAgo = randomInt(0, 14);
    const hourAgo = randomInt(0, 23);
    const minAgo = randomInt(0, 59);

    const timestamp = new Date(today);
    timestamp.setDate(timestamp.getDate() - dayAgo);
    timestamp.setHours(timestamp.getHours() - hourAgo);
    timestamp.setMinutes(timestamp.getMinutes() - minAgo);

    const subjectName = template.type === 'stock-alert'
      ? randomChoice(productNames)
      : template.type === 'credit-warning'
        ? randomChoice(customerNames)
        : randomChoice(customerNames);

    activities.push({
      id: `act-${String(i).padStart(4, '0')}`,
      type: template.type,
      title: template.titleTemplate(subjectName),
      description: template.descTemplate(subjectName),
      customerId: randomBoolean(0.5) ? `cust-${String(randomInt(1, 50)).padStart(3, '0')}` : undefined,
      orderId: randomBoolean(0.4) ? `ord-${String(randomInt(1, 120)).padStart(4, '0')}` : undefined,
      productId: template.type === 'stock-alert' ? `CHAR-${String(randomInt(1, 100)).padStart(4, '0')}` : undefined,
      salesRep: randomBoolean(0.6) ? randomChoice(['Jordan Lee', 'Sam Patel', 'Morgan Reeves']) : undefined,
      timestamp: timestamp.toISOString(),
      unread: randomBoolean(0.3),
      metadata: { source: randomBoolean(0.5) ? 'system' : 'manual' },
    });
  }

  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return activities;
}
