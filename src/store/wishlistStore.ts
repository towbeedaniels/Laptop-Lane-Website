import { create } from 'zustand';
import type { Product } from '@/types';

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  addItem: (product: Product) => {
    set((state) => {
      if (state.items.find((item) => item.id === product.id)) {
        return state;
      }
      return { items: [...state.items, product] };
    });
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },

  isInWishlist: (productId: string) => {
    return get().items.some((item) => item.id === productId);
  },

  clearWishlist: () => {
    set({ items: [] });
  },

  getItemCount: () => {
    return get().items.length;
  },
}));
