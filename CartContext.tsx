
import React, { createContext, useState, useMemo, ReactNode, useContext, useEffect } from 'react';
import type { CartItem, Product, CartContextType } from './types';
import { api } from './services/api';

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
  const [isLoading, setIsLoading] = useState(false);

  // Initial Load from API
  useEffect(() => {
    const loadCart = async () => {
        try {
            const items = await api.cart.get();
            setCart(items);
        } catch (error) {
            console.error("Failed to load cart", error);
            setCart([]);
        }
    };
    loadCart();
  }, []);

  const addToCart = async (product: Product, quantity: number) => {
    if (quantity <= 0 || !product) return;
    
    // Optimistic Update (UI updates immediately)
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });

    // API Call in background
    try {
        await api.cart.add(product, quantity);
    } catch (error) {
        console.error("Error syncing cart add", error);
        // Rollback logic could go here
    }
  };

  const removeFromCart = async (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    try {
        await api.cart.remove(productId);
    } catch (error) {
        console.error("Error syncing cart remove", error);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
      try {
          await api.cart.updateQuantity(productId, quantity);
      } catch (error) {
          console.error("Error syncing cart update", error);
      }
    }
  };

  const clearCart = async () => {
    setCart([]);
    try {
        await api.cart.clear();
    } catch (error) {
        console.error("Error clearing cart", error);
    }
  };

  const itemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);
  
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => {
        const priceStr = item.price.replace('R$ ', '').replace('.', '').replace(',', '.');
        const price = parseFloat(priceStr);
        // Safety check for NaN
        if (isNaN(price)) return sum;
        return sum + price * item.quantity;
    }, 0);
  }, [cart]);

  const value = { cart, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, totalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
