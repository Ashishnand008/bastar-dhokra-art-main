"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { X, Filter } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

interface MobileFilterModalProps {
  isOpen: boolean
  onClose: () => void
  sortBy: string
  setSortBy: (value: string) => void
  priceRange: number[]
  setPriceRange: (value: number[]) => void
  categories: string[]
  setCategories: (value: string[]) => void
  categoryOptions: string[]
  clearFilters: () => void
}

export default function MobileFilterModal({
  isOpen,
  onClose,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  categories,
  setCategories,
  categoryOptions,
  clearFilters,
}: MobileFilterModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleCategoryChange = (category: string) => {
    const newCategories = categories.includes(category) 
      ? categories.filter((c: string) => c !== category) 
      : [...categories, category]
    setCategories(newCategories)
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const handleClearFilters = () => {
    clearFilters()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 h-full w-full transform bg-background transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 backdrop-blur-sm p-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto p-4">
          <AnimatedSection animation="fade-in-up">
            <div className="space-y-6">
              {/* Sort By */}
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Sort By</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Categories */}
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Categories</h3>
                <div className="space-y-3">
                  {categoryOptions.map((category) => (
                    <div key={category} className="flex items-center space-x-3">
                      <Checkbox
                        id={`mobile-${category}`}
                        checked={categories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`mobile-${category}`} className="text-base">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-4"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0] * 50}</span>
                  <span>${priceRange[1] * 50}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
                <Button className="flex-1" onClick={onClose}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  )
}

// Mobile Filter Button Component
export function MobileFilterButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="mobile-filter-sticky flex items-center gap-2 bg-background/95 backdrop-blur-sm shadow-lg w-fit"
    >
      <Filter className="h-4 w-4" />
      Filters
    </Button>
  )
} 