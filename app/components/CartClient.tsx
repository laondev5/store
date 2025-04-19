'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/lib/stores/cart-store'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function CartClient() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-4">Product</th>
                      <th className="text-center pb-4">Quantity</th>
                      <th className="text-right pb-4">Subtotal</th>
                      <th className="w-8 pb-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              {item.size && (
                                <p className="text-sm text-gray-500">
                                  Size: {item.size}
                                </p>
                              )}
                              {item.color && (
                                <p className="text-sm text-gray-500">
                                  Color: {item.color}
                                </p>
                              )}
                              <p className="text-sm">
                                Rs. {item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="mx-4">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="py-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Cart Totals</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
} 