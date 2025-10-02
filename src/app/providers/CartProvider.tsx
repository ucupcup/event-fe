import { createContext, useContext, useMemo, useState, type PropsWithChildren, useCallback } from 'react';

export type CartItem = {
  key: string; // `${eventId}:${ticketTypeId}`
  eventId: string;
  ticketTypeId: string;
  quantity: number;
  selected: boolean;
};

type CartState = Record<string, CartItem>;

type CartContextValue = {
  items: CartState;
  list: CartItem[];
  count: number;
  add: (eventId: string, ticketTypeId: string, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  toggle: (key: string, selected: boolean) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartState>({});
  const list = useMemo(() => Object.values(items), [items]);
  const count = useMemo(() => list.reduce((a, b) => a + b.quantity, 0), [list]);

  const add = useCallback((eventId: string, ticketTypeId: string, qty = 1) => {
    const key = `${eventId}:${ticketTypeId}`;
    setItems((prev) => {
      const existing = prev[key];
      const nextQty = (existing?.quantity ?? 0) + qty;
      return {
        ...prev,
        [key]: { key, eventId, ticketTypeId, quantity: nextQty, selected: true },
      };
    });
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => {
      const copy = { ...prev } as CartState;
      delete copy[key];
      return copy;
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) => {
      const item = prev[key];
      if (!item) return prev;
      const q = Math.max(0, qty);
      if (q === 0) {
        const copy = { ...prev } as CartState;
        delete copy[key];
        return copy;
      }
      return { ...prev, [key]: { ...item, quantity: q } };
    });
  }, []);

  const toggle = useCallback((key: string, selected: boolean) => {
    setItems((prev) => {
      const item = prev[key];
      if (!item) return prev;
      return { ...prev, [key]: { ...item, selected } };
    });
  }, []);

  const clear = useCallback(() => setItems({}), []);

  const value = useMemo(() => ({ items, list, count, add, remove, setQty, toggle, clear }), [items, list, count, add, remove, setQty, toggle, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
