'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ChevronLeft, 
  Save, 
  X, 
  Plus,
  ImagePlus
} from 'lucide-react'

export default function AddProductPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('basic')
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountedPrice: '',
    category: '',
    subcategory: '',
    stock: '',
    sku: '',
    sizes: [] as string[],
    colors: [] as string[],
    images: [] as string[],
    specifications: {} as Record<string, string>,
    tags: [] as string[]
  })
  
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const handleAddTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }
  
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }
  
  const handleAddSize = (size: string) => {
    if (size && !formData.sizes.includes(size)) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, size]
      }))
    }
  }
  
  const handleRemoveSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size)
    }))
  }
  
  const handleAddColor = (color: string) => {
    if (color && !formData.colors.includes(color)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, color]
      }))
    }
  }
  
  const handleRemoveColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }))
  }
  
  const handleAddSpecification = (key: string, value: string) => {
    if (key && value) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [key]: value
        }
      }))
    }
  }
  
  const handleRemoveSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return {
        ...prev,
        specifications: newSpecs
      }
    })
  }
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required'
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number'
    }
    
    if (formData.discountedPrice.trim() && (isNaN(Number(formData.discountedPrice)) || Number(formData.discountedPrice) <= 0)) {
      newErrors.discountedPrice = 'Discounted price must be a positive number'
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }
    
    if (!formData.stock.trim()) {
      newErrors.stock = 'Stock is required'
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative number'
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Here you would typically make an API call to create the product
      // For demonstration, we'll just show an alert and redirect
      alert('Product created successfully!')
      router.push('/admin/products')
    }
  }
  
  // Available categories
  const categories = ['Living Room', 'Bedroom', 'Dining', 'Office', 'Kitchen', 'Outdoor']
  
  // Available subcategories
  const subcategories: {[key: string]: string[]} = {
    'Living Room': ['Sofas', 'Coffee Tables', 'TV Stands', 'Bookshelves', 'Armchairs'],
    'Bedroom': ['Beds', 'Mattresses', 'Nightstands', 'Wardrobes', 'Dressers'],
    'Dining': ['Dining Tables', 'Dining Chairs', 'Buffets', 'Bar Stools'],
    'Office': ['Desks', 'Office Chairs', 'Bookcases', 'Filing Cabinets'],
    'Kitchen': ['Kitchen Islands', 'Kitchen Carts', 'Bar Cabinets'],
    'Outdoor': ['Patio Sets', 'Outdoor Chairs', 'Outdoor Tables', 'Hammocks']
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link href="/admin/products" className="mr-4">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <ChevronLeft size={20} />
            </button>
          </Link>
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors"
        >
          <Save size={18} className="mr-2" />
          Save Product
        </button>
      </div>
      
      {/* Form Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b flex">
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'basic'
                ? 'border-[#B88E2F] text-[#B88E2F]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Information
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'specifications'
                ? 'border-[#B88E2F] text-[#B88E2F]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'images'
                ? 'border-[#B88E2F] text-[#B88E2F]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('images')}
          >
            Images
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`px-4 py-2 w-full border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`px-4 py-2 w-full border ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`pl-8 pr-4 py-2 w-full border ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discounted Price (optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    className={`pl-8 pr-4 py-2 w-full border ${
                      errors.discountedPrice ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                  />
                </div>
                {errors.discountedPrice && (
                  <p className="mt-1 text-sm text-red-600">{errors.discountedPrice}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`px-4 py-2 w-full border ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  disabled={!formData.category}
                  className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select subcategory</option>
                  {formData.category &&
                    subcategories[formData.category]?.map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock*
                </label>
                <input
                  type="text"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className={`px-4 py-2 w-full border ${
                    errors.stock ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU*
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className={`px-4 py-2 w-full border ${
                    errors.sku ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent`}
                />
                {errors.sku && (
                  <p className="mt-1 text-sm text-red-600">{errors.sku}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-gray-100 px-3 py-1 rounded-full flex items-center text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Add a tag and press Enter"
                    className="px-4 py-2 flex-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTag((e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200"
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Add a tag and press Enter"]') as HTMLInputElement
                      if (input.value) {
                        handleAddTag(input.value)
                        input.value = ''
                      }
                    }}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.sizes.map((size) => (
                      <div
                        key={size}
                        className="bg-gray-100 px-3 py-1 rounded-full flex items-center text-sm"
                      >
                        {size}
                        <button
                          type="button"
                          onClick={() => handleRemoveSize(size)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Add a size and press Enter"
                      className="px-4 py-2 flex-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddSize((e.target as HTMLInputElement).value)
                          ;(e.target as HTMLInputElement).value = ''
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200"
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Add a size and press Enter"]') as HTMLInputElement
                        if (input.value) {
                          handleAddSize(input.value)
                          input.value = ''
                        }
                      }}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available Colors
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.colors.map((color) => (
                      <div
                        key={color}
                        className="bg-gray-100 px-3 py-1 rounded-full flex items-center text-sm"
                      >
                        <span 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: color }}
                        ></span>
                        {color}
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(color)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Add a color and press Enter"
                      className="px-4 py-2 flex-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddColor((e.target as HTMLInputElement).value)
                          ;(e.target as HTMLInputElement).value = ''
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200"
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Add a color and press Enter"]') as HTMLInputElement
                        if (input.value) {
                          handleAddColor(input.value)
                          input.value = ''
                        }
                      }}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Additional Specifications
                  </label>
                  
                  <div className="space-y-3">
                    {Object.entries(formData.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="text"
                          value={key}
                          disabled
                          className="px-4 py-2 w-1/3 border border-gray-300 rounded-l-md bg-gray-50"
                          placeholder="Key"
                        />
                        <input
                          type="text"
                          value={value}
                          disabled
                          className="px-4 py-2 w-2/3 border-t border-b border-gray-300 bg-gray-50"
                          placeholder="Value"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecification(key)}
                          className="px-3 py-2 bg-red-50 border border-gray-300 border-l-0 rounded-r-md hover:bg-red-100 text-red-500"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                    
                    <div className="flex items-center">
                      <input
                        type="text"
                        id="specKey"
                        className="px-4 py-2 w-1/3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                        placeholder="Key"
                      />
                      <input
                        type="text"
                        id="specValue"
                        className="px-4 py-2 w-2/3 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                        placeholder="Value"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const keyInput = document.getElementById('specKey') as HTMLInputElement
                          const valueInput = document.getElementById('specValue') as HTMLInputElement
                          if (keyInput.value && valueInput.value) {
                            handleAddSpecification(keyInput.value, valueInput.value)
                            keyInput.value = ''
                            valueInput.value = ''
                          }
                        }}
                        className="px-3 py-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Images Tab */}
          {activeTab === 'images' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-full mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Images
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload multiple images of your product. The first image will be used as the main image.
                  </p>
                </div>
                
                {/* Image upload placeholder */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                  <ImagePlus size={32} className="mb-2" />
                  <p className="text-sm font-medium">Upload Image</p>
                  <p className="text-xs mt-1">JPEG, PNG or WebP (Max. 2MB)</p>
                </div>
                
                {/* More image upload placeholders */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                  <ImagePlus size={32} className="mb-2" />
                  <p className="text-sm font-medium">Upload Image</p>
                  <p className="text-xs mt-1">JPEG, PNG or WebP (Max. 2MB)</p>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                  <ImagePlus size={32} className="mb-2" />
                  <p className="text-sm font-medium">Upload Image</p>
                  <p className="text-xs mt-1">JPEG, PNG or WebP (Max. 2MB)</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-end">
            <Link href="/admin/products">
              <button
                type="button"
                className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A17922] transition-colors"
            >
              Create Product
            </button>
          </div>
        </div>
      </form>
    </div>
  )
} 