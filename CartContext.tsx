import React, { createContext, useState, useMemo, ReactNode, useContext } from 'react';
import type { CartItem, Product, CartContextType } from './types';

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);
  
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
        return sum + price * item.quantity;
    }, 0);
  }, [cart]);

  const value = { cart, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, totalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};