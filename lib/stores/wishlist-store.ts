import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/lib/data'

interface WishlistStore {
  items: Product[]
  addItem: (item: Product) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        if (!get().isInWishlist(item.id)) {
          set((state) => ({ items: [...state.items, item] }))
        }
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id)
      },
      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
) 