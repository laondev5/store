'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  ChevronLeft,
  ChevronRight,
  X,
  Save
} from 'lucide-react'

// Fake data for demo
const CATEGORIES_DATA = [
  {
    id: '1',
    name: 'Living Room',
    subcategories: ['Sofas', 'Coffee Tables', 'TV Stands', 'Bookshelves', 'Armchairs'],
    productCount: 45,
    image: '/assets/categories/living-room.jpg'
  },
  {
    id: '2',
    name: 'Bedroom',
    subcategories: ['Beds', 'Mattresses', 'Nightstands', 'Wardrobes', 'Dressers'],
    productCount: 32,
    image: '/assets/categories/bedroom.jpg'
  },
  {
    id: '3',
    name: 'Dining',
    subcategories: ['Dining Tables', 'Dining Chairs', 'Buffets', 'Bar Stools'],
    productCount: 18,
    image: '/assets/categories/dining.jpg'
  },
  {
    id: '4',
    name: 'Office',
    subcategories: ['Desks', 'Office Chairs', 'Bookcases', 'Filing Cabinets'],
    productCount: 24,
    image: '/assets/categories/office.jpg'
  },
  {
    id: '5',
    name: 'Kitchen',
    subcategories: ['Kitchen Islands', 'Kitchen Carts', 'Bar Cabinets'],
    productCount: 12,
    image: '/assets/categories/kitchen.jpg'
  },
  {
    id: '6',
    name: 'Outdoor',
    subcategories: ['Patio Sets', 'Outdoor Chairs', 'Outdoor Tables', 'Hammocks'],
    productCount: 20,
    image: '/assets/categories/outdoor.jpg'
  }
]

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (category: { name: string; image: string }) => void
  title: string
  initialData?: { name: string; image: string }
}

function CategoryModal({ isOpen, onClose, onSave, title, initialData }: CategoryModalProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [image, setImage] = useState(initialData?.image || '')
  
  if (!isOpen) return null
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, image })
    setName('')
    setImage('')
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name*
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors"
            >
              <Save size={16} className="inline mr-1" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface SubcategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (subcategory: string) => void
  categoryName: string
}

function SubcategoryModal({ isOpen, onClose, onSave, categoryName }: SubcategoryModalProps) {
  const [name, setName] = useState('')
  
  if (!isOpen) return null
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(name)
    setName('')
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Subcategory to {categoryName}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory Name*
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors"
            >
              <Save size={16} className="inline mr-1" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState(CATEGORIES_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  
  // Modal states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string; image: string } | null>(null)
  const [currentCategoryForSubcategory, setCurrentCategoryForSubcategory] = useState<{ id: string; name: string } | null>(null)
  
  const itemsPerPage = 5
  
  // Filter categories
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage)
  
  const toggleCategorySelection = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }
  
  const toggleSelectAll = () => {
    if (selectedCategories.length === paginatedCategories.length) {
      setSelectedCategories([])
    } else {
      setSelectedCategories(paginatedCategories.map((category) => category.id))
    }
  }
  
  const toggleExpand = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }
  
  const deleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories((prev) => prev.filter((category) => category.id !== categoryId))
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId))
    }
  }
  
  const bulkDeleteCategories = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedCategories.length} categories?`)) {
      setCategories((prev) => prev.filter((category) => !selectedCategories.includes(category.id)))
      setSelectedCategories([])
    }
  }
  
  const openAddCategoryModal = () => {
    setEditingCategory(null)
    setIsCategoryModalOpen(true)
  }
  
  const openEditCategoryModal = (category: typeof CATEGORIES_DATA[0]) => {
    setEditingCategory({ 
      id: category.id, 
      name: category.name, 
      image: category.image 
    })
    setIsCategoryModalOpen(true)
  }
  
  const openAddSubcategoryModal = (category: typeof CATEGORIES_DATA[0]) => {
    setCurrentCategoryForSubcategory({ id: category.id, name: category.name })
    setIsSubcategoryModalOpen(true)
  }
  
  const handleSaveCategory = (categoryData: { name: string; image: string }) => {
    if (editingCategory) {
      // Edit existing category
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingCategory.id
            ? { ...category, name: categoryData.name, image: categoryData.image }
            : category
        )
      )
    } else {
      // Add new category
      const newCategory = {
        id: `${categories.length + 1}`,
        name: categoryData.name,
        subcategories: [],
        productCount: 0,
        image: categoryData.image || '/assets/categories/placeholder.jpg'
      }
      setCategories((prev) => [...prev, newCategory])
    }
    setIsCategoryModalOpen(false)
  }
  
  const handleSaveSubcategory = (subcategoryName: string) => {
    if (currentCategoryForSubcategory) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === currentCategoryForSubcategory.id
            ? {
                ...category,
                subcategories: [...category.subcategories, subcategoryName]
              }
            : category
        )
      )
    }
    setIsSubcategoryModalOpen(false)
  }
  
  const handleDeleteSubcategory = (categoryId: string, subcategoryToDelete: string) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                subcategories: category.subcategories.filter(
                  (subcategory) => subcategory !== subcategoryToDelete
                )
              }
            : category
        )
      )
    }
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={openAddCategoryModal}
          className="flex items-center px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Category
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      {/* Table Actions */}
      {selectedCategories.length > 0 && (
        <div className="bg-[#B88E2F] bg-opacity-10 p-3 rounded-lg mb-4 flex items-center justify-between">
          <span className="text-[#B88E2F] font-medium">{selectedCategories.length} categories selected</span>
          <div className="flex gap-2">
            <button 
              onClick={bulkDeleteCategories}
              className="px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center"
            >
              <Trash size={16} className="mr-1" /> Delete
            </button>
          </div>
        </div>
      )}
      
      {/* Categories Table */}
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
                      checked={selectedCategories.length === paginatedCategories.length && paginatedCategories.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subcategories
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCategories.map((category) => (
                <React.Fragment key={category.id}>
                  <tr className={expandedCategory === category.id ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-[#B88E2F] rounded border-gray-300 focus:ring-[#B88E2F]"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategorySelection(category.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 relative rounded-md bg-gray-200 overflow-hidden">
                          {/* Placeholder for image */}
                          {/* <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover"
                          /> */}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          <div className="text-sm text-gray-500">ID: {category.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleExpand(category.id)}
                        className="text-sm text-gray-700"
                      >
                        {category.subcategories.length} subcategories
                        <ChevronRight 
                          size={16} 
                          className={`inline-block ml-1 transform transition-transform ${
                            expandedCategory === category.id ? 'rotate-90' : ''
                          }`} 
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {category.productCount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openAddSubcategoryModal(category)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                          title="Add subcategory"
                        >
                          <Plus size={18} />
                        </button>
                        <button
                          onClick={() => openEditCategoryModal(category)}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md"
                          title="Edit category"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                          title="Delete category"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Subcategories */}
                  {expandedCategory === category.id && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-gray-50">
                        <div className="ml-12 mr-6">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Subcategories:</h4>
                          {category.subcategories.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                              {category.subcategories.map((subcategory) => (
                                <div 
                                  key={subcategory} 
                                  className="flex items-center justify-between bg-white p-2 rounded border border-gray-200"
                                >
                                  <span className="text-sm">{subcategory}</span>
                                  <button
                                    onClick={() => handleDeleteSubcategory(category.id, subcategory)}
                                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                                    title="Delete subcategory"
                                  >
                                    <Trash size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No subcategories yet.</p>
                          )}
                          <button
                            onClick={() => openAddSubcategoryModal(category)}
                            className="mt-3 text-sm text-[#B88E2F] hover:underline inline-flex items-center"
                          >
                            <Plus size={14} className="mr-1" />
                            Add Subcategory
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
                  {Math.min(startIndex + itemsPerPage, filteredCategories.length)}
                </span>{' '}
                of <span className="font-medium">{filteredCategories.length}</span> results
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
      
      {/* Category Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
        initialData={editingCategory || undefined}
      />
      
      {/* Subcategory Modal */}
      <SubcategoryModal
        isOpen={isSubcategoryModalOpen}
        onClose={() => setIsSubcategoryModalOpen(false)}
        onSave={handleSaveSubcategory}
        categoryName={currentCategoryForSubcategory?.name || ''}
      />
    </div>
  )
} 