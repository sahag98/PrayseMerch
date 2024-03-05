"use client";
import { CartItem } from "@/app/addToCart";
import { Item } from "@/app/our-products";
import React, { createContext, useReducer, useContext } from "react";

// Initial state for the cart
const initialCartState: any = {
  items: [],
};

type Cart = {
  items: CartItem[];
};

// Action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// Reducer function to handle state changes based on actions
const cartReducer = (state: Cart, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.sku !== action.payload.sku),
      };
    default:
      return state;
  }
};

// Create the CartContext
const CartContext = createContext(initialCartState);

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component to wrap your app with
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Action creators
  const addToCart = (item: Item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeFromCart = (item: Item) => {
    dispatch({ type: REMOVE_FROM_CART, payload: item });
  };

  // Value object to be provided to the context
  const value = {
    cart: cartState,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
