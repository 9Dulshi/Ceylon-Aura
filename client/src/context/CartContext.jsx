import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "ceylon_aura_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState({}); // key: `${productId}::${size}` -> qty

  // Load saved cart on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {
      console.error("Could not read cart from localStorage", e);
    }
  }, []);

  const persist = useCallback((next) => {
    setCart(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Could not save cart to localStorage", e);
    }
  }, []);

  const addToCart = (productId, size = "M") => {
    const key = `${productId}::${size}`;
    persist({ ...cart, [key]: (cart[key] || 0) + 1 });
  };

  const changeQty = (key, delta) => {
    const next = { ...cart };
    next[key] = (next[key] || 0) + delta;
    if (next[key] <= 0) delete next[key];
    persist(next);
  };

  const clearCart = () => persist({});

  return (
    <CartContext.Provider value={{ cart, addToCart, changeQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}
