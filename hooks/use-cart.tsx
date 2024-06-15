import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

import { CartItem } from "@/app/addToCart";

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  isNavOpen: boolean;
  order_id: number;
  isShowingAppModal: boolean;
  openCart: () => void;
  dismissModal: () => void;
  orderItems: { products: any[] };
  setOrderId: (data: number) => void;
  addToOrderInfo: (data: any) => void;
  updateSize: (data: CartItem, newSize: string, newSku: number) => void;
  closeCart: () => void;
  closeNav: () => void;
  addItem: (data: CartItem) => void;
  decreaseQty: (data: any) => void;
  removeItem: (id: number) => void;
  calculateTotal: () => {
    subTotal: number;
    // salesTaxNum: number;
    total: number;
  };
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      isShowingAppModal: true,
      orderItems: { products: [] },
      order_id: 0,
      isCartOpen: false,
      isNavOpen: false,
      dismissModal: () => {
        set({ isShowingAppModal: false });
      },
      closeNav: () => {
        const isOpen = get().isNavOpen;
        set({ isNavOpen: !isOpen });
      },
      closeCart: () => {
        const isOpen = get().isCartOpen;
        set({ isCartOpen: !isOpen });
      },
      openCart: () => {
        set({ isCartOpen: true });
      },
      setOrderId: (data: number) => {
        set({ order_id: data });
      },
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.sku === data.sku
        );
        if (existingItemIndex !== -1) {
          console.log("exists already: ", currentItems[existingItemIndex]);

          // Item already exists, so update the quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity =
            updatedItems[existingItemIndex].quantity + 1;

          set({ items: updatedItems });
        } else {
          // Item doesn't exist, so add it to the cart
          set({ items: [...currentItems, data] });
        }
      },
      addToOrderInfo: (data: any) => {
        console.log("orderInfo: ", data);
      },
      decreaseQty: (data: CartItem) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.sku === data.sku
        );

        if (existingItemIndex !== -1) {
          console.log("exists already: ", currentItems[existingItemIndex]);

          // Item already exists, so update the quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity = data.quantity - 1;

          set({ items: updatedItems });
        }
      },

      updateSize: (data: CartItem, newSize, newSku) => {
        console.log("updating to: ", newSize.toString());
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.sku === data.sku
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].size = newSize.toString();
          updatedItems[existingItemIndex].sku = newSku;
          set({ items: updatedItems });
        }
      },
      calculateTotal: () => {
        const items = get().items;
        const sum = items.reduce((acc, item) => {
          return acc + item.customerPrice.amount * item.quantity;
        }, 0);

        // const salesTaxString = (sum * 0.075).toFixed(2);
        // const salesTaxNum = Number(salesTaxString);
        const total = sum;
        return {
          subTotal: sum,
          // salesTaxNum,
          total,
        };
      },
      removeItem: (sku: number) => {
        set({
          items: [...get().items.filter((item) => item.sku !== sku)],
        });
      },

      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
