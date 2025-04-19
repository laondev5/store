'use client'

import Image from 'next/image'
import { useCartStore } from '@/lib/stores/cart-store'

export default function CheckoutPage() {
  const { items, subtotal } = useCartStore()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Billing details</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Company Name (Optional)</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Country / Region</label>
                <select className="w-full p-2 border border-gray-300 rounded-md" required>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Street address</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Town / City</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Province</label>
                <select className="w-full p-2 border border-gray-300 rounded-md" required>
                  <option value="Western">Western Province</option>
                  <option value="Central">Central Province</option>
                  <option value="Southern">Southern Province</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">ZIP code</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email address</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional information</label>
                <textarea
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Your order</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="direct"
                      className="text-black"
                      defaultChecked
                    />
                    <span>Direct Bank Transfer</span>
                  </label>
                  <p className="text-sm text-gray-500 ml-6">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not be
                    shipped until the funds have cleared in our account.
                  </p>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" value="cod" className="text-black" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 