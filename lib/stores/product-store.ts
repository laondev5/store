import { create } from 'zustand'
import { Product, products as dummyProducts } from '@/lib/data'

interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  colors?: string[]
  sizes?: string[]
  searchQuery?: string
}

interface ProductStore {
  products: Product[]
  filteredProducts: Product[]
  filters: ProductFilters
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalPages: number
  }
  setProducts: (products: Product[]) => void
  setFilters: (filters: Partial<ProductFilters>) => void
  applyFilters: () => void
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void
  searchProducts: (query: string) => void
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: dummyProducts,
  filteredProducts: dummyProducts,
  filters: {},
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
    totalPages: Math.ceil(dummyProducts.length / 12),
  },
  setProducts: (products) => {
    set({ products })
    get().applyFilters()
  },
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, currentPage: 1 },
    }))
    get().applyFilters()
  },
  applyFilters: () => {
    const { products, filters, pagination } = get()
    let filtered = [...products]

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Apply price range filter
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((product) => 
        (product.discountedPrice || product.price) >= filters.minPrice!
      )
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((product) => 
        (product.discountedPrice || product.price) <= filters.maxPrice!
      )
    }

    // Apply color filter
    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => filters.colors!.includes(color))
      )
    }

    // Apply size filter
    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => filters.sizes!.includes(size))
      )
    }

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Update pagination
    const totalPages = Math.ceil(filtered.length / pagination.itemsPerPage)

    set({
      filteredProducts: filtered,
      pagination: { ...pagination, totalPages },
    })
  },
  setCurrentPage: (page) => {
    set((state) => ({
      pagination: { ...state.pagination, currentPage: page },
    }))
  },
  setItemsPerPage: (items) => {
    set((state) => ({
      pagination: {
        ...state.pagination,
        itemsPerPage: items,
        currentPage: 1,
      },
    }))
    get().applyFilters()
  },
  searchProducts: (query) => {
    get().setFilters({ searchQuery: query })
  },
})) 