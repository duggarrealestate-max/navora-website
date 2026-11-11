import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { RetailerCartItem, RetailerOrder, SavedList, Invoice, RetailerCustomer } from '../types';
import { LocalRetailerRepository } from '../storage/repository';
import { abcMobilesCustomer, defaultSavedLists, defaultRetailerOrders, defaultInvoices } from '../data/retailer-demo';

const repository = new LocalRetailerRepository();

interface RetailerContextValue {
  cart: RetailerCartItem[];
  setCart: (items: RetailerCartItem[]) => void;
  addToCart: (item: RetailerCartItem) => void;
  removeFromCart: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  orders: RetailerOrder[];
  savedLists: SavedList[];
  invoices: Invoice[];
  customer: RetailerCustomer;
  refreshOrders: () => Promise<void>;
  placeOrder: (order: RetailerOrder) => Promise<void>;
  saveCustomer: (customer: Partial<RetailerCustomer>) => Promise<void>;
  deleteSavedList: (id: string) => Promise<void>;
  saveSavedList: (list: SavedList) => Promise<void>;
}

const RetailerContext = createContext<RetailerContextValue | null>(null);

export function useRetailer(): RetailerContextValue {
  const ctx = useContext(RetailerContext);
  if (!ctx) {
    throw new Error('useRetailer must be used within RetailerProvider');
  }
  return ctx;
}

interface RetailerProviderProps {
  children: ReactNode;
}

export function RetailerProvider({ children }: RetailerProviderProps): JSX.Element {
  const [cart, setCartState] = useState<RetailerCartItem[]>([]);
  const [orders, setOrders] = useState<RetailerOrder[]>([]);
  const [savedLists, setSavedLists] = useState<SavedList[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customer, setCustomer] = useState<RetailerCustomer>(abcMobilesCustomer);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [c, o, s, i, cust] = await Promise.all([
        repository.getCart(),
        repository.getOrders(),
        repository.getSavedLists(),
        repository.getInvoices(),
        repository.getCustomer(),
      ]);
      if (!cancelled) {
        setCartState(c);
        setOrders(o.length > 0 ? o : defaultRetailerOrders);
        setSavedLists(s.length > 0 ? s : defaultSavedLists);
        setInvoices(i.length > 0 ? i : defaultInvoices);
        if (cust) setCustomer(cust);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const persistCart = useCallback(async (items: RetailerCartItem[]) => {
    await repository.saveCart(items);
  }, []);

  const setCart = useCallback((items: RetailerCartItem[]) => {
    setCartState(items);
    persistCart(items);
  }, [persistCart]);

  const addToCart = useCallback((item: RetailerCartItem) => {
    setCartState((prev) => {
      const existing = prev.find((i) => i.sku === item.sku);
      const next = existing
        ? prev.map((i) => (i.sku === item.sku ? { ...i, quantity: i.quantity + item.quantity } : i))
        : [...prev, item];
      persistCart(next);
      return next;
    });
  }, [persistCart]);

  const removeFromCart = useCallback((sku: string) => {
    setCartState((prev) => {
      const next = prev.filter((i) => i.sku !== sku);
      persistCart(next);
      return next;
    });
  }, [persistCart]);

  const updateQuantity = useCallback((sku: string, quantity: number) => {
    setCartState((prev) => {
      const next = quantity <= 0 ? prev.filter((i) => i.sku !== sku) : prev.map((i) => (i.sku === sku ? { ...i, quantity } : i));
      persistCart(next);
      return next;
    });
  }, [persistCart]);

  const clearCart = useCallback(async () => {
    setCartState([]);
    await repository.clearCart();
  }, []);

  const refreshOrders = useCallback(async () => {
    const o = await repository.getOrders();
    setOrders(o.length > 0 ? o : defaultRetailerOrders);
  }, []);

  const placeOrder = useCallback(async (order: RetailerOrder) => {
    await repository.saveOrder(order);
    setOrders((prev) => [order, ...prev]);
  }, []);

  const saveCustomer = useCallback(async (customerUpdate: Partial<RetailerCustomer>) => {
    await repository.saveCustomer(customerUpdate);
    setCustomer((prev) => ({ ...prev, ...customerUpdate }));
  }, []);

  const deleteSavedList = useCallback(async (id: string) => {
    await repository.deleteSavedList(id);
    setSavedLists((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const saveSavedList = useCallback(async (list: SavedList) => {
    await repository.saveSavedList(list);
    setSavedLists((prev) => {
      const existing = prev.findIndex((l) => l.id === list.id);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = list;
        return next;
      }
      return [list, ...prev];
    });
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <RetailerContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        orders,
        savedLists,
        invoices,
        customer,
        refreshOrders,
        placeOrder,
        saveCustomer,
        deleteSavedList,
        saveSavedList,
      }}
    >
      {children}
    </RetailerContext.Provider>
  );
}
