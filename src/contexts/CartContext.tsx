import React, { createContext, useContext, useEffect, useState } from 'react';

import { getFromStorage, saveToStorage } from '@/utils/storage';
import type { CartItem, Product } from '@/utils/types';

// Define the context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

// Create the context with a default value
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getItemCount: () => 0,
});

// Local storage key for cart
const CART_STORAGE_KEY = 'shopping_cart';

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from local storage on initial render
  useEffect(() => {
    const savedCart = getFromStorage<CartItem[]>(CART_STORAGE_KEY, []);
    setCartItems(savedCart);
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    saveToStorage(CART_STORAGE_KEY, cartItems);
  }, [cartItems]);

  // Add a product to the cart
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity if product already exists in cart
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Add new item to cart
      return [...prevItems, { ...product, quantity }];
    });
  };

  // Remove a product from the cart
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate the total price of items in the cart
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Get the total number of items in the cart
  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
