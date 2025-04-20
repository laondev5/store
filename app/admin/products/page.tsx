'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Eye, 
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown
} from 'lucide-react'

interface Product {
  id: string
  name: string
  image: string
  price: number
  discountedPrice: number | null
  category: string
  stock: number
  sku: string
  rating: number
  status: string
  [key: string]: string | number | null // Index signature for dynamic access
}

// Fake data for demo
const PRODUCTS_DATA: Product[] = [
  {
    id: '1',
    name: 'Minimalist Sofa',
    image: '/assets/products/sofa.jpg',
    price: 1200,
    discountedPrice: 999,
    category: 'Living Room',
    stock: 15,
    sku: 'SF-001',
    rating: 4.5,
    status: 'In Stock'
  },
  {
    id: '2',
    name: 'Modern Coffee Table',
    image: '/assets/products/coffee-table.jpg',
    price: 350,
    discountedPrice: null,
    category: 'Living Room',
    stock: 8,
    sku: 'CT-002',
    rating: 4.2,
    status: 'In Stock'
  },
  {
    id: '3',
    name: 'Scandinavian Chair',
    image: '/assets/products/chair.jpg',
    price: 250,
    discountedPrice: 180,
    category: 'Living Room',
    stock: 21,
    sku: 'CH-003',
    rating: 4.7,
    status: 'In Stock'
  },
  {
    id: '4',
    name: 'Luxury Bed Frame',
    image: '/assets/products/bed.jpg',
    price: 900,
    discountedPrice: null,
    category: 'Bedroom',
    stock: 5,
    sku: 'BF-004',
    rating: 4.8,
    status: 'Low Stock'
  },
  {
    id: '5',
    name: 'Wooden Bookshelf',
    image: '/assets/products/bookshelf.jpg',
    price: 450,
    discountedPrice: 400,
    category: 'Living Room',
    stock: 0,
    sku: 'BS-005',
    rating: 4.3,
    status: 'Out of Stock'
  },
  {
    id: '6',
    name: 'Office Desk',
    image: '/assets/products/desk.jpg',
    price: 550,
    discountedPrice: null,
    category: 'Office',
    stock: 12,
    sku: 'OD-006',
    rating: 4.6,
    status: 'In Stock'
  },
  {
    id: '7',
    name: 'Dining Table Set',
    image: '/assets/products/dining-table.jpg',
    price: 1300,
    discountedPrice: 1100,
    category: 'Dining',
    stock: 3,
    sku: 'DT-007',
    rating: 4.4,
    status: 'Low Stock'
  }
]

// Categories
const CATEGORIES = ['All', 'Living Room', 'Bedroom', 'Dining', 'Office', 'Kitchen', 'Outdoor']

export default function ProductsPage() {
  const [products, setProducts] = useState(PRODUCTS_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null)
  
  const itemsPerPage = 5
  
  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = category === 'All' || product.category === category
    
    return matchesSearch && matchesCategory
  })
  
  // Sort products
  const sortedProducts = useMemo(() => {
    let sortableProducts = [...filteredProducts]
    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Product];
        const bValue = b[sortConfig.key as keyof Product];
        
        // Handle null values during sorting
        if (aValue === null && bValue === null) return 0;
        if (aValue === null) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (bValue === null) return sortConfig.direction === 'ascending' ? 1 : -1;
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableProducts
  }, [filteredProducts, sortConfig])
  
  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)
  
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }
  
  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }
  
  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(paginatedProducts.map((product) => product.id))
    }
  }
  
  const deleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((product) => product.id !== productId))
      setSelectedProducts((prev) => prev.filter((id) => id !== productId))
    }
  }
  
  const bulkDeleteProducts = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      setProducts((prev) => prev.filter((product) => !selectedProducts.includes(product.id)))
      setSelectedProducts([])
    }
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/add">
          <button className="flex items-center px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors">
            <Plus size={18} className="mr-2" />
            Add Product
          </button>
        </Link>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, SKU, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Table Actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-[#B88E2F] bg-opacity-10 p-3 rounded-lg mb-4 flex items-center justify-between">
          <span className="text-[#B88E2F] font-medium">{selectedProducts.length} products selected</span>
          <div className="flex gap-2">
            <button 
              onClick={bulkDeleteProducts}
              className="px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center"
            >
              <Trash size={16} className="mr-1" /> Delete
            </button>
            <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors flex items-center">
              <Edit size={16} className="mr-1" /> Edit
            </button>
          </div>
        </div>
      )}
      
      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#B88E2F] rounded border-gray-300 focus:ring-[#B88E2F]"
                      checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('price')}
                >
                  <div className="flex items-center">
                    Price
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('category')}
                >
                  <div className="flex items-center">
                    Category
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('stock')}
                >
                  <div className="flex items-center">
                    Stock
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('rating')}
                >
                  <div className="flex items-center">
                    Rating
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#B88E2F] rounded border-gray-300 focus:ring-[#B88E2F]"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 relative">
                        <div className="h-12 w-12 bg-gray-200 rounded-md"></div>
                        {/* Placeholder for Image */}
                        {/* <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        /> */}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.discountedPrice ? (
                      <div>
                        <span className="text-red-600 font-medium">${product.discountedPrice}</span>
                        <span className="text-gray-400 line-through ml-2 text-sm">${product.price}</span>
                      </div>
                    ) : (
                      <span className="font-medium">${product.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      product.status === 'In Stock' 
                        ? 'bg-green-100 text-green-800' 
                        : product.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <div className="relative flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-gray-600">{product.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        href={`/shop/${product.id}`}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="View product"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link 
                        href={`/admin/products/edit/${product.id}`} 
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md"
                        title="Edit product"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                        title="Delete product"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-4 py-3 bg-white border-t border-gray-200 sm:px-6 flex items-center justify-between">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, sortedProducts.length)}
                </span>{' '}
                of <span className="font-medium">{sortedProducts.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === index + 1
                        ? 'bg-[#B88E2F] text-white border-[#B88E2F] z-10'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 