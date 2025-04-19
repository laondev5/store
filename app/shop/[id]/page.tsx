'use client'

import Image from 'next/image'
import { Heart, Share2, Minus, Plus } from 'lucide-react'
import { useCartStore } from '@/lib/stores/cart-store'
import { useWishlistStore } from '@/lib/stores/wishlist-store'
import { useProductStore } from '@/lib/stores/product-store'
import { useState } from 'react'

interface ProductDetailProps {
  params: {
    id: string
  }
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const { products } = useProductStore()
  const product = products.find((p) => p.id === params.id)
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const isWishlisted = product ? isInWishlist(product.id) : false
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    return <div>Product not found</div>
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
  }

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        ...product
      })
    }
  }

  const incrementQuantity = () => setQuantity(q => q + 1)
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`relative aspect-square cursor-pointer ${
                  selectedImage === index ? 'ring-2 ring-black' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover rounded-lg hover:opacity-80"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${
                    star <= product.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500">({product.reviews} Customer Reviews)</span>
          </div>

          <p className="text-2xl font-bold mb-6">
            {product.discountedPrice ? (
              <>
                <span className="text-red-500">Rs. {product.discountedPrice.toLocaleString()}</span>
                <span className="text-gray-400 line-through ml-2">
                  Rs. {product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span>Rs. {product.price.toLocaleString()}</span>
            )}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:border-black"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button className="p-2 hover:bg-gray-100" onClick={decrementQuantity}>
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4">{quantity}</span>
                <button className="p-2 hover:bg-gray-100" onClick={incrementQuantity}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                Add To Cart
              </button>

              <button
                onClick={handleWishlist}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>

              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Share2 className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold mb-4">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold mb-4">Specifications</h3>
            <dl className="grid grid-cols-1 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex">
                  <dt className="w-1/3 text-gray-500">{key}:</dt>
                  <dd className="w-2/3">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
} 