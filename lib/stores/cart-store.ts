import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  discountedPrice?: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  total: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const { items } = get()
        const existingItem = items.find(
          (i) => i.id === item.id && i.size === item.size && i.color === item.color
        )

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id && i.size === item.size && i.color === item.color
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          })
        } else {
          set({ items: [...items, item] })
        }
      },
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }))
      },
      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }))
      },
      clearCart: () => {
        set({ items: [] })
      },
      get subtotal() {
        return get().items.reduce(
          (total, item) => total + (item.discountedPrice || item.price) * item.quantity,
          0
        )
      },
      get total() {
        return get().subtotal
      },
    }),
    {
      name: 'cart-storage',
    }
  )
) 