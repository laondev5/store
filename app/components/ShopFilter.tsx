'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Slider } from './ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface ShopFilterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShopFilter({ open, onOpenChange }: ShopFilterProps) {
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = [
    'Dining',
    'Living',
    'Bedroom',
    'Office',
    'Outdoor',
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[300px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-8">
          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-4">Price Range</h3>
            <Slider
              defaultValue={priceRange}
              max={1000000}
              step={1000}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-2 text-sm">
              <span>Rs. {priceRange[0].toLocaleString()}</span>
              <span>Rs. {priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([...selectedCategories, category])
                      } else {
                        setSelectedCategories(selectedCategories.filter(c => c !== category))
                      }
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="pt-4">
            <Button className="w-full bg-[#B88E2F] hover:bg-[#A17922] text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 