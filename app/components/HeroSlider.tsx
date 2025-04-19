'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    title: 'Discover Our New Collection',
    subtitle: 'New Arrival',
    description: 'Transform your space with our stunning new furniture collection. Elegance meets comfort in every piece.',
    buttonText: 'SHOP NOW',
    buttonLink: '/shop',
    bgColor: 'bg-gradient-to-r from-amber-600 to-amber-800',
  },
  {
    id: 2,
    title: 'Exclusive Summer Sale',
    subtitle: 'Up to 50% Off',
    description: 'Refresh your home with our summer collection. Limited time offers on selected premium furniture.',
    buttonText: 'VIEW OFFERS',
    buttonLink: '/shop?category=sale',
    bgColor: 'bg-gradient-to-r from-blue-800 to-blue-900',
  },
  {
    id: 3,
    title: 'Handcrafted Excellence',
    subtitle: 'Artisan Quality',
    description: 'Each piece tells a story of craftsmanship. Discover furniture made with passion and precision.',
    buttonText: 'EXPLORE',
    buttonLink: '/shop?category=premium',
    bgColor: 'bg-gradient-to-r from-gray-800 to-gray-900',
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [slideDirection, setSlideDirection] = useState(0) // -1 for left, 1 for right
  
  const slideCount = slides.length

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setSlideDirection(1)
      setCurrentSlide((prev) => (prev + 1) % slideCount)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }, [slideCount, isTransitioning])

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setSlideDirection(-1)
      setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }, [slideCount, isTransitioning])

  useEffect(() => {
    // Auto-advance slides
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence initial={false} custom={slideDirection} mode="wait">
        <motion.div
          key={currentSlide}
          custom={slideDirection}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Using gradient background instead of image */}
          <div 
            className={`absolute inset-0 ${slides[currentSlide].bgColor}`}
          >
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-20" 
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.6' fill-rule='evenodd'/%3E%3C/svg%3E\")" }}>
            </div>
          </div>
          
          {/* Overlay Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container mx-auto px-4">
              <motion.div 
                className="max-w-xl text-white"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <span className="text-lg font-medium inline-block bg-[#B88E2F] px-4 py-1 rounded-sm mb-2">
                  {slides[currentSlide].subtitle}
                </span>
                <h1 className="text-5xl font-bold mt-4 mb-6 leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-gray-100 mb-8 text-lg">
                  {slides[currentSlide].description}
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={slides[currentSlide].buttonLink}
                    className="inline-block bg-[#B88E2F] text-white px-8 py-3 rounded-lg hover:bg-[#A17922] transition-colors"
                  >
                    {slides[currentSlide].buttonText}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white bg-opacity-20 hover:bg-opacity-40 p-2 rounded-full text-white focus:outline-none transition-all"
        aria-label="Previous slide"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white bg-opacity-20 hover:bg-opacity-40 p-2 rounded-full text-white focus:outline-none transition-all"
        aria-label="Next slide"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`mx-1 h-3 rounded-full focus:outline-none transition-all ${
              index === currentSlide ? 'bg-[#B88E2F] w-8' : 'bg-white bg-opacity-50 hover:bg-opacity-80 w-3'
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setSlideDirection(index > currentSlide ? 1 : -1)
                setIsTransitioning(true)
                setCurrentSlide(index)
                setTimeout(() => setIsTransitioning(false), 500)
              }
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          ></motion.button>
        ))}
      </div>
    </div>
  )
} 