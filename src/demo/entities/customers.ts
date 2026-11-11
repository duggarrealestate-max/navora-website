import { randomInt, randomChoice, randomWeighted, randomBoolean, randomFloat } from '@demo/data/seed';
import type { IndustryConfig } from '@shared/types/industry';

export type CustomerSegment = 'vip' | 'active' | 'new' | 'at-risk' | 'dormant' | 'credit-risk';

export interface Customer {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postcode: string;
  };
  segment: CustomerSegment;
  status: 'active' | 'inactive' | 'suspended';
  lifetimeValue: number;
  outstandingCredit: number;
  creditLimit: number;
  lastOrderDate: string;
  buyingCycle: number;
  daysSinceLastOrder: number;
  preferredDevice: string;
  accountOwner: string;
  notes: string[];
  tags: string[];
}

const businessNames = [
  'ABC Mobiles', 'TechHub London', 'PhoneZone', 'MobileMasters', 'ElectroStore',
  'Cellular Connect', 'Gadget Galaxy', 'SmartPhone Shop', 'Urban Mobile', 'TechStop',
  'PhoneWorld', 'Digital Depot', 'Byte & Byte', 'The Phone Store', 'MobileMaven',
  'iRepair & Sell', 'PhoneFix Pro', 'SmartEdge', 'TechBazaar', 'NeoMobile',
  'Apex Mobile', 'CityCell', 'Metro Mobile', 'PowerStore', 'DeviceDepot',
  'MobileHub', 'TechTonic', 'CellularCity', 'GadgetGrid', 'PhonePort',
  'Brightstar Mobile', 'EdgeMobile', 'TechVille', 'MobileNation', 'iConnect',
  'SmartShop', 'The Mobile Room', 'CellularHub', 'DeviceDirect', 'MobilePoint',
  'TechCentral', 'PhoneHouse', 'ElectroMart', 'UrbanGadgets', 'NeoCell',
  'ApexCell', 'PowerMobile', 'DigitalMobile', 'ByteMobile', 'SmartMart',
];

const cities = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Newcastle', 'Bristol', 'Cardiff', 'Belfast', 'Leicester', 'Sheffield'];
const devices = ['iPhone 17', 'iPhone 16', 'Samsung S25', 'Samsung S24', 'Google Pixel 9', 'OnePlus 13', 'Universal'];
const ownerNames = ['Sales Team A', 'Sales Team B', 'Jordan Lee', 'Sam Patel', 'Morgan Reeves', 'Taylor Kim'];
const tagsPool = ['Walk-in', 'Online', 'WhatsApp', 'Phone call', 'Wholesale', 'Retail', 'Key account'];

const segmentWeights: Array<{ value: CustomerSegment; weight: number }> = [
  { value: 'vip', weight: 8 },
  { value: 'active', weight: 25 },
  { value: 'new', weight: 10 },
  { value: 'at-risk', weight: 8 },
  { value: 'dormant', weight: 4 },
  { value: 'credit-risk', weight: 5 },
];

export function generateCustomers(count: number = 50): Customer[] {
  const customers: Customer[] = [];

  for (let i = 1; i <= count; i++) {
    const segment = randomWeighted(segmentWeights);
    const buyingCycle = randomInt(7, 42);
    const daysSince = segment === 'dormant'
      ? randomInt(60, 180)
      : segment === 'at-risk'
        ? randomInt(21, 60)
        : segment === 'credit-risk'
          ? randomInt(3, 30)
          : randomInt(0, buyingCycle);

    const lastOrder = new Date();
    lastOrder.setDate(lastOrder.getDate() - daysSince);

    const lifetimeValue = segment === 'vip'
      ? randomInt(50000, 200000)
      : segment === 'active'
        ? randomInt(15000, 80000)
        : segment === 'new'
          ? randomInt(500, 5000)
          : segment === 'at-risk'
            ? randomInt(20000, 70000)
            : segment === 'dormant'
              ? randomInt(10000, 40000)
              : randomInt(20000, 60000);

    const creditLimitVal = lifetimeValue > 100000 ? randomInt(10000, 20000) : randomInt(2000, 10000);
    const outstandingCredit = segment === 'credit-risk'
      ? randomInt(Math.round(creditLimitVal * 0.8), creditLimitVal)
      : segment === 'at-risk'
        ? randomInt(Math.round(creditLimitVal * 0.5), Math.round(creditLimitVal * 0.85))
        : Math.round(creditLimitVal * randomFloat() * 0.3);

    const firstName = randomChoice(['James', 'Sarah', 'Michael', 'Emma', 'David', 'Olivia', 'Thomas', 'Ava', 'Chris', 'Mia']);
    const lastName = randomChoice(['Smith', 'Jones', 'Taylor', 'Brown', 'Davies', 'Wilson', 'Evans', 'Thomas', 'Roberts', 'Walker']);
    const contactName = `${firstName} ${lastName}`;

    const tags = Array.from({ length: randomInt(1, 3) })
      .map(() => randomChoice(tagsPool))
      .filter((v, i, a) => a.indexOf(v) === i);

    const notes: string[] = [];
    if (segment === 'vip') notes.push('Key decision maker, responsive to calls');
    if (segment === 'credit-risk') notes.push('Payment history is 45+ days overdue');
    if (segment === 'dormant') notes.push('Previously active, may be receptive to reactivation offer');
    if (segment === 'at-risk') notes.push('Buys every 14 days — now overdue');
    notes.push(`Prefers ${randomChoice(['phone', 'WhatsApp', 'email'])} communication`);

    customers.push({
      id: `cust-${String(i).padStart(3, '0')}`,
      name: contactName,
      businessName: businessNames[i - 1] || `${contactName} Trading`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${businessNames[i - 1]?.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `0${randomInt(20, 79)} ${randomInt(1000, 9999)} ${randomInt(1000, 9999)}`,
      address: {
        street: `${randomInt(1, 200)} ${randomChoice(['High St', 'Main Rd', 'Church Ln', 'Station Rd', 'Market St', 'Park Ave'])}`,
        city: randomChoice(cities),
        postcode: `${randomChoice(['SW', 'N', 'W', 'E', 'M', 'B', 'L', 'G'])}${randomInt(1, 99)} ${randomInt(1, 9)}${randomChoice(['ABC', 'XYZ', 'DEF', 'GHI'])}`,
      },
      segment,
      status: randomBoolean(0.05) ? 'inactive' : 'active',
      lifetimeValue,
      outstandingCredit,
      creditLimit: creditLimitVal,
      lastOrderDate: lastOrder.toISOString(),
      buyingCycle,
      daysSinceLastOrder: daysSince,
      preferredDevice: randomChoice(devices),
      accountOwner: randomChoice(ownerNames),
      notes,
      tags,
    });
  }

  return customers;
}

const wholesaleVertical: IndustryConfig = {
  vertical: 'wholesale',
  name: 'Wholesale OS',
  tagline: 'Demo Environment',
  currency: 'GBP',
  features: ['trade-account', 'tiered-pricing', 'credit-terms', 'bulk-ordering'],
  navSections: [],
};

export const industryConfig = wholesaleVertical;
