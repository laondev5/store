'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, User } from 'lucide-react'
import { useCartStore } from '@/lib/stores/cart-store'
import { useWishlistStore } from '@/lib/stores/wishlist-store'

export default function Navbar() {
  const { items: cartItems } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Furniro
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-black">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-black">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-black">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-black">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link href="/auth/signin" className="text-gray-700 hover:text-black">
              <User className="w-6 h-6" />
            </Link>
            <Link href="/wishlist" className="text-gray-700 hover:text-black relative">
              <Heart className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-black relative">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 