'use client'

import { useState } from 'react'
import { Filter, Grid, List } from 'lucide-react'
import { useProductStore } from '@/lib/stores/product-store'
import ProductCard from '@/app/components/ProductCard'
import { ShopFilter } from '@/app/components/ShopFilter'
import { Button } from '@/components/ui/button'
import Navbar from '../components/Navbar'
import Footer from '@/components/ui/Footer'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [itemsPerPage, setItemsPerPage] = useState(16)
  const [sortBy, setSortBy] = useState('default')
  const [filterOpen, setFilterOpen] = useState(false)
  
  const { products, filteredProducts, pagination, setCurrentPage } = useProductStore()
  const { currentPage, totalPages } = pagination

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedProducts = sortedProducts.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[200px] bg-[#F5F5F5]">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center">Shop</h1>
          <div className="flex items-center justify-center gap-2 text-sm mt-4">
            <a href="/" className="text-gray-600 hover:text-black">Home</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Shop</span>
          </div>
        </div>
      </div>

      {/* Shop Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setFilterOpen(true)}>
              <Filter className="h-4 w-4" />
            </Button>
            <div className="flex border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === 'grid' ? 'bg-gray-100' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === 'list' ? 'bg-gray-100' : ''}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} results
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Show" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="24">24</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {displayedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              showCompare={true}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="outline"
                className={`w-10 h-10 p-0 ${
                  currentPage === page ? 'bg-[#B88E2F] text-white hover:bg-[#A17922]' : ''
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            {currentPage < totalPages && (
              <Button
                variant="outline"
                className="w-10 h-10 p-0"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Sheet */}
      <ShopFilter open={filterOpen} onOpenChange={setFilterOpen} />
      <Footer />
    </div>
  )
} 