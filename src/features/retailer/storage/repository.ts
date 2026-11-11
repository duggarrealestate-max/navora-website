import type { RetailerRepository, RetailerCartItem, RetailerOrder, SavedList, Invoice, RetailerCustomer } from '../types';

const CART_KEY = 'trade-pilot-retailer-cart';
const ORDERS_KEY = 'trade-pilot-retailer-orders';
const SAVED_LISTS_KEY = 'trade-pilot-retailer-saved-lists';
const INVOICES_KEY = 'trade-pilot-retailer-invoices';
const CUSTOMER_KEY = 'trade-pilot-retailer-customer';

export class LocalRetailerRepository implements RetailerRepository {
  async getCart(): Promise<RetailerCartItem[]> {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  async saveCart(items: RetailerCartItem[]): Promise<void> {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable
    }
  }

  async clearCart(): Promise<void> {
    try {
      localStorage.removeItem(CART_KEY);
    } catch {
      // Storage unavailable
    }
  }

  async getOrders(): Promise<RetailerOrder[]> {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  async saveOrder(order: RetailerOrder): Promise<void> {
    try {
      const orders = await this.getOrders();
      orders.unshift(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // Storage unavailable
    }
  }

  async getSavedLists(): Promise<SavedList[]> {
    try {
      const raw = localStorage.getItem(SAVED_LISTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  async saveSavedList(list: SavedList): Promise<void> {
    try {
      const lists = await this.getSavedLists();
      const existing = lists.findIndex((l) => l.id === list.id);
      if (existing >= 0) {
        lists[existing] = list;
      } else {
        lists.push(list);
      }
      localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(lists));
    } catch {
      // Storage unavailable
    }
  }

  async deleteSavedList(id: string): Promise<void> {
    try {
      const lists = await this.getSavedLists();
      const filtered = lists.filter((l) => l.id !== id);
      localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(filtered));
    } catch {
      // Storage unavailable
    }
  }

  async getInvoices(): Promise<Invoice[]> {
    try {
      const raw = localStorage.getItem(INVOICES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  async getCustomer(): Promise<RetailerCustomer | null> {
    try {
      const raw = localStorage.getItem(CUSTOMER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  async saveCustomer(customer: Partial<RetailerCustomer>): Promise<void> {
    try {
      const existing = await this.getCustomer();
      const merged = existing ? { ...existing, ...customer } : (customer as RetailerCustomer);
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(merged));
    } catch {
      // Storage unavailable
    }
  }
}
