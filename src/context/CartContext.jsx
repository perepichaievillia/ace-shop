import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext(null);

function lineKey(productId, size, color) {
  return `${productId}__${size}__${color}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('ace-store:cart', []);

  const addItem = (product, { size, color, quantity = 1 }) => {
    setItems((prev) => {
      const key = lineKey(product.id, size, color);
      const existing = prev.find((line) => line.key === key);
      if (existing) {
        return prev.map((line) =>
          line.key === key
            ? { ...line, quantity: line.quantity + quantity }
            : line
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          currency: product.currency,
          image: product.images?.[0],
          size,
          color,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (key, quantity) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.key !== key)
        : prev.map((line) => (line.key === key ? { ...line, quantity } : line))
    );
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((line) => line.key !== key));
  };

  const clearCart = () => setItems([]);

  const count = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity * line.price, 0),
    [items]
  );

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    count,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
