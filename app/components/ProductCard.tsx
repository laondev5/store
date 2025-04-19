'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Search, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/stores/cart-store'
import { useWishlistStore } from '@/lib/stores/wishlist-store'
import { Product } from '@/lib/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  showCompare?: boolean
}

export default function ProductCard({ product, showCompare = false }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="bg-white group relative">
      <div className="relative h-[300px] bg-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        
        {/* Tags */}
        {product.tags?.includes('New Arrival') && (
          <div className="absolute top-4 right-4 bg-pink-600 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
            New
          </div>
        )}
        
        {product.tags?.includes('Sale') && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
            -30%
          </div>
        )}
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={handleWishlist}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          
          <Link
            href={`/shop/${product.id}`}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
          >
            <Search className="w-5 h-5" />
          </Link>
          
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/shop/${product.id}`}>
          <h3 className="text-xl font-medium mb-1">{product.name}</h3>
        </Link>
        <p className="text-gray-500 mb-2 line-clamp-1">{product.description}</p>
        <div className="flex items-center">
          <span className="text-[#B88E2F] font-semibold">Rs. {product.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
} 