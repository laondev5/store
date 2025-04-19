'use client'

import { useWishlistStore } from '@/lib/stores/wishlist-store'
import ProductCard from '../components/ProductCard'

export default function WishlistPage() {
  const { items } = useWishlistStore()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[200px] bg-[#F5F5F5]">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center">My Wishlist</h1>
          <div className="flex items-center justify-center gap-2 text-sm mt-4">
            <a href="/" className="text-gray-600 hover:text-black">Home</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Wishlist</span>
          </div>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Browse our products and add your favorites to the wishlist!</p>
            <a
              href="/shop"
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 