import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

import { AlertTriangle } from "lucide-react";
import { Item } from "@/app/our-products";
import { CartItem } from "@/app/addToCart";

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  order_id: number;
  openCart: () => void;
  setOrderId: (data: number) => void;
  closeCart: () => void;
  addItem: (data: CartItem) => void;
  removeItem: (id: number) => void;
  calculateTotal: () => {
    subTotal: number;
    salesTaxNum: number;
    total: number;
  };
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      order_id: 0,
      isCartOpen: false,
      closeCart: () => {
        const isOpen = get().isCartOpen;
        set({ isCartOpen: !isOpen });
      },
      openCart: () => {
        console.log("trying to open cart");
        set({ isCartOpen: true });
      },
      setOrderId: (data: number) => {
        set({ order_id: data });
      },
      addItem: (data: CartItem) => {
        console.log("in add: ", data);
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.sku === data.sku
        );

        console.log("check: ", existingItemIndex);

        if (existingItemIndex !== -1) {
          console.log("exists already: ", currentItems[existingItemIndex]);

          // Item already exists, so update the quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += data.quantity;

          set({ items: updatedItems });
        } else {
          // Item doesn't exist, so add it to the cart
          set({ items: [...currentItems, data] });
        }
      },
      calculateTotal: () => {
        const items = get().items;
        const sum = items.reduce((acc, item) => {
          return acc + item.customerPrice.amount * item.quantity;
        }, 0);

        const salesTaxString = (sum * 0.075).toFixed(2);
        const salesTaxNum = Number(salesTaxString);
        const total = sum + salesTaxNum;
        return {
          subTotal: sum,
          salesTaxNum,
          total,
        };
      },
      removeItem: (sku: number) => {
        set({
          items: [...get().items.filter((item) => item.sku !== sku)],
        });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
