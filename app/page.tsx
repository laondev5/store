'use client'

import Link from "next/link";
import Image from "next/image";
import { useProductStore } from '@/lib/stores/product-store'
import ProductCard from './components/ProductCard'

export default function Home() {
  const { products } = useProductStore()
  const featuredProducts = products.slice(0, 8) // Show first 8 products

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-[#FCF8F3] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <span className="text-lg">New Arrival</span>
            <h1 className="text-5xl font-bold mt-4 mb-6">
              Discover Our New Collection
            </h1>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#B88E2F] text-white px-8 py-3 rounded-lg hover:bg-[#A17922] transition-colors"
            >
              BUY NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Browse The Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Dining', 'Living', 'Bedroom'].map((category) => (
              <Link key={category} href={`/shop?category=${category.toLowerCase()}`}>
                <div className="group cursor-pointer">
                  <div className="relative h-[300px] bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-medium text-center">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-block border-2 border-[#B88E2F] text-[#B88E2F] px-8 py-3 rounded-lg hover:bg-[#B88E2F] hover:text-white transition-colors"
            >
              Show More
            </Link>
          </div>
        </div>
      </section>
 {/* Features banner */}
 <div className="py-8 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
              <div className="mr-3">
                <div className="p-2 rounded-full">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10V8C21 6.89543 20.1046 6 19 6H12L10 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H11" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 14V17M17 20V17M17 17H14M17 17H20" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-medium">High Quality</h4>
                <p className="text-xs text-gray-500">crafted from top materials</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
              <div className="mr-3">
                <div className="p-2 rounded-full">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.5 12L10.5 15L16.5 9" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-medium">Warranty Protection</h4>
                <p className="text-xs text-gray-500">Over 2 years</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
              <div className="mr-3">
                <div className="p-2 rounded-full">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 14C19 15.6569 17.6569 17 16 17C14.3431 17 13 15.6569 13 14C13 12.3431 14.3431 11 16 11C17.6569 11 19 12.3431 19 14Z" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22L16 17" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 14C5 15.6569 6.34315 17 8 17C9.65685 17 11 15.6569 11 14C11 12.3431 9.65685 11 8 11C6.34315 11 5 12.3431 5 14Z" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2V8L14 6" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-xs text-gray-500">Order over 150 $</p>
              </div>
            </div>
            
            <div className="flex items-center w-full md:w-auto">
              <div className="mr-3">
                <div className="p-2 rounded-full">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12H16L14 15H10L8 12H2" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-medium">24 / 7 Support</h4>
                <p className="text-xs text-gray-500">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </main>
  );
}
