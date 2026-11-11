export type PricingTier = 'standard' | 'gold' | 'vip';

export interface CustomerPricing {
  sku: string;
  tier: PricingTier;
  price: number;
  quantityBreaks: Array<{ minQty: number; price: number }>;
}

export interface RetailerCustomer {
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
  tier: PricingTier;
  creditLimit: number;
  outstandingCredit: number;
  nextPaymentDue: string;
  accountStatus: 'active' | 'suspended';
  primaryContact: string;
  deliveryAddresses: Array<{ id: string; label: string; address: string }>;
  tradeTerms: string;
  supportContact: string;
}

export interface RetailerCartItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  available: number;
  imageUrl?: string;
}

export interface RetailerOrderItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type RetailerOrderStatus = 'received' | 'confirmed' | 'picking' | 'ready' | 'dispatched' | 'delivered';

export interface RetailerOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  status: RetailerOrderStatus;
  items: RetailerOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  deliveryMethod: 'delivery' | 'collection';
  createdAt: string;
  expectedDelivery: string;
  notes: string;
  channel: 'retailer-portal';
}

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

export interface SavedList {
  id: string;
  name: string;
  items: Array<{ sku: string; name: string; quantity: number; unitPrice: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface RetailerRepository {
  getCart(): Promise<RetailerCartItem[]>;
  saveCart(items: RetailerCartItem[]): Promise<void>;
  clearCart(): Promise<void>;

  getOrders(): Promise<RetailerOrder[]>;
  saveOrder(order: RetailerOrder): Promise<void>;

  getSavedLists(): Promise<SavedList[]>;
  saveSavedList(list: SavedList): Promise<void>;
  deleteSavedList(id: string): Promise<void>;

  getInvoices(): Promise<Invoice[]>;
  getCustomer(): Promise<RetailerCustomer | null>;
  saveCustomer(customer: Partial<RetailerCustomer>): Promise<void>;
}
