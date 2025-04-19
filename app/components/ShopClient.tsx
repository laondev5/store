'use client'

import { useProductStore } from '@/lib/stores/product-store'
import ProductCard from './ProductCard'
import { Slider } from './ui/slider'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function ShopClient() {
  const {
    filteredProducts,
    filters,
    pagination,
    setFilters,
    setCurrentPage,
    searchProducts,
  } = useProductStore()

  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage
  const endIndex = startIndex + pagination.itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const categories = ['Sofas', 'Chairs', 'Tables', 'Beds', 'Storage']
  const colors = ['Black', 'White', 'Brown', 'Gray', 'Blue']
  const sizes = ['S', 'M', 'L', 'XL']

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <Card className="w-64 flex-shrink-0">
          <CardContent className="p-6 space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label>Search</Label>
              <Input
                type="search"
                placeholder="Search products..."
                onChange={(e) => searchProducts(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.category === category}
                      onCheckedChange={() =>
                        setFilters({ category: filters.category === category ? undefined : category })
                      }
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <Label>Price Range</Label>
              <Slider
                defaultValue={[0, 100000]}
                max={100000}
                step={1000}
                onValueChange={(value) =>
                  setFilters({ minPrice: value[0], maxPrice: value[1] })
                }
              />
              <div className="flex justify-between text-sm">
                <span>Rs. 0</span>
                <span>Rs. 100,000</span>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <Label>Colors</Label>
              <div className="space-y-2">
                {colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={filters.colors?.includes(color)}
                      onCheckedChange={(checked) => {
                        const newColors = checked
                          ? [...(filters.colors || []), color]
                          : filters.colors?.filter((c) => c !== color) || []
                        setFilters({ colors: newColors })
                      }}
                    />
                    <Label htmlFor={`color-${color}`}>{color}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <Label>Sizes</Label>
              <div className="space-y-2">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={filters.sizes?.includes(size)}
                      onCheckedChange={(checked) => {
                        const newSizes = checked
                          ? [...(filters.sizes || []), size]
                          : filters.sizes?.filter((s) => s !== size) || []
                        setFilters({ sizes: newSizes })
                      }}
                    />
                    <Label htmlFor={`size-${size}`}>{size}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} showCompare />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={pagination.currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 