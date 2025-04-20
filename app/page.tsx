'use client'

import { useState, useEffect, useRef } from 'react'
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useProductStore } from '@/lib/stores/product-store'
import ProductCard from './components/ProductCard'
import HeroSlider from './components/HeroSlider'
import { ArrowRight, TrendingUp, Truck, Clock, ThumbsUp, Gift } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from '@/components/ui/Footer'

const categories = [
  {
    name: 'Living Room',
    bgGradient: 'bg-gradient-to-r from-amber-600 to-amber-800',
    link: '/shop?category=living-room',
    icon: '🛋️'
  },
  {
    name: 'Bedroom',
    bgGradient: 'bg-gradient-to-r from-blue-700 to-blue-900',
    link: '/shop?category=bedroom',
    icon: '🛏️'
  },
  {
    name: 'Dining',
    bgGradient: 'bg-gradient-to-r from-green-700 to-green-900',
    link: '/shop?category=dining',
    icon: '🍽️'
  },
  {
    name: 'Office',
    bgGradient: 'bg-gradient-to-r from-purple-700 to-purple-900',
    link: '/shop?category=office',
    icon: '💼'
  },
  {
    name: 'Kitchen',
    bgGradient: 'bg-gradient-to-r from-red-700 to-red-900',
    link: '/shop?category=kitchen',
    icon: '🍳'
  },
  {
    name: 'Outdoor',
    bgGradient: 'bg-gradient-to-r from-gray-700 to-gray-900',
    link: '/shop?category=outdoor',
    icon: '🌳'
  }
]

const trending = [
  "Minimalist Furniture",
  "Sustainable Materials",
  "Modular Designs",
  "Scandinavian Style"
]

export default function Home() {
  const { products } = useProductStore()
  const featuredProducts = products.slice(0, 8) // Show first 8 products
  const [trendingIndex, setTrendingIndex] = useState(0)
  const [email, setEmail] = useState('')
  
  // Refs for scroll animations
  const categoriesRef = useRef(null)
  const productsRef = useRef(null)
  const featuresRef = useRef(null)
  const subscribeRef = useRef(null)
  
  const categoriesInView = useInView(categoriesRef, { once: true, amount: 0.3 })
  const productsInView = useInView(productsRef, { once: true, amount: 0.2 })
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const subscribeInView = useInView(subscribeRef, { once: true, amount: 0.5 })

  // Auto-rotate trending searches
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingIndex((prev) => (prev + 1) % trending.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically call an API to handle the subscription
    alert(`Thanks for subscribing with ${email}!`)
    setEmail('')
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Slider */}
        <HeroSlider />

      {/* Trending Searches */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-[#B88E2F]" />
            <span className="text-sm font-medium mr-2">Trending:</span>
            <motion.span 
              key={trendingIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-gray-600"
            >
              {trending[trendingIndex]}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16" ref={categoriesRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[#B88E2F] text-sm uppercase tracking-wider">Discover Our Categories</span>
            <h2 className="text-3xl font-semibold mt-2">Browse The Range</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Find functional furniture for every room in your home. We offer a variety of styles to match any aesthetic.</p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={categoriesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Link href={category.link}>
                  <div className="group cursor-pointer h-full">
                    <div className={`relative h-[250px] rounded-lg overflow-hidden mb-4 ${category.bgGradient}`}>
                      {/* Pattern overlay */}
                      <div className="absolute inset-0 opacity-20" 
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.6' fill-rule='evenodd'/%3E%3C/svg%3E\")" }}>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white bg-opacity-90 px-6 py-4 rounded-lg text-center transform group-hover:scale-110 transition-transform duration-300">
                          <div className="text-4xl mb-2">{category.icon}</div>
                          <div className="text-xl font-bold">{category.name}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{category.name}</h3>
                      <span className="text-[#B88E2F] group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center">
                        Explore <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50" ref={productsRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={productsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[#B88E2F] text-sm uppercase tracking-wider">Best-selling Products</span>
            <h2 className="text-3xl font-semibold mt-2">Our Products</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Check out our most popular products that customers love. Quality meets design in every piece.</p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={productsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/shop"
              className="inline-flex items-center border-2 border-[#B88E2F] text-[#B88E2F] px-8 py-3 rounded-lg hover:bg-[#B88E2F] hover:text-white transition-colors"
            >
              Show More Products <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-gray-100" ref={subscribeRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={subscribeInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto p-10 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">Stay updated with our latest products, exclusive offers, and interior design tips.</p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-[#B88E2F] text-white rounded-lg hover:bg-[#A17922] transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Features banner */}
      <section className="py-12 border-t border-gray-200" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <ThumbsUp className="w-6 h-6 text-[#B88E2F]" />
                </div>
                <div>
                  <h4 className="font-semibold">High Quality</h4>
                  <p className="text-sm text-gray-500">Crafted from top materials</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Clock className="w-6 h-6 text-[#B88E2F]" />
                </div>
                <div>
                  <h4 className="font-semibold">Warranty Protection</h4>
                  <p className="text-sm text-gray-500">Over 2 years</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Truck className="w-6 h-6 text-[#B88E2F]" />
                </div>
                <div>
                  <h4 className="font-semibold">Free Shipping</h4>
                  <p className="text-sm text-gray-500">Order over 150 $</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Gift className="w-6 h-6 text-[#B88E2F]" />
                </div>
                <div>
                  <h4 className="font-semibold">24 / 7 Support</h4>
                  <p className="text-sm text-gray-500">Dedicated support</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
    <Footer />
    </div>
  );
}
