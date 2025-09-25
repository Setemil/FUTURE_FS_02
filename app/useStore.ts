import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Products } from "@/interfaces";

export interface CartItem extends Products {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Products) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  updateQuantity: (id: string | number, newQuantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      updateQuantity: (id, newQuantity) =>
        set((state) => {
          if (newQuantity <= 0) {
            return { cart: state.cart.filter((item) => item.id !== id) };
          }
          return {
            cart: state.cart.map((item) =>
              item.id === id ? { ...item, quantity: newQuantity } : item
            ),
          };
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);