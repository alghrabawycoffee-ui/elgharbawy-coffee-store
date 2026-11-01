import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, change: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      removeFromCart: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      updateQuantity: (id, change) => set((state) => ({
        items: state.items.map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + change;
            return newQty > 0 ? { ...i, quantity: newQty } : i;
          }
          return i;
        }),
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'elgharbawy-cart', // اسم المتغير اللي هيحفظ في المتصفح
    }
  )
);