export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountedPrice?: number
  image: string
  images: string[]
  rating: number
  reviews: number
  sizes: string[]
  colors: string[]
  specifications: Record<string, string | number>
  category: string
  tags: string[]
  stock: number
  sku: string
}