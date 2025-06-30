"use client"

import { useState, useEffect } from "react"
import ProductGrid from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { AnimatedSection } from "@/components/animated-section"
import { getCategories } from "@/lib/sanity"

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [categories, setCategories] = useState<string[]>([])
  const [categoryOptions, setCategoryOptions] = useState<string[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories()
        setCategoryOptions(fetchedCategories)
      } catch (err) {
        console.error('Failed to fetch categories:', err)
        // Fallback to default categories if fetch fails
        setCategoryOptions(["Figurines", "Wall Art", "Home Decor", "Jewelry", "Lamps"])
      }
    }
    
    fetchCategories()
    window.scrollTo(0, 0)
  }, [])

  const handleCategoryChange = (category: string) => {
    setCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const clearFilters = () => {
    setSortBy("featured")
    setPriceRange([0, 100])
    setCategories([])
  }

  return (
    <main className="container mx-auto py-8 md:py-12">
      <AnimatedSection>
        <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">Explore Our Collection</h1>
      </AnimatedSection>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Filters Sidebar */}
        <AnimatedSection animation="fade-in-left">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold">Sort By</h2>
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

            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold">Categories</h2>
              <div className="space-y-2">
                {categoryOptions.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={categories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                      defaultChecked
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold">Price Range</h2>
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="mb-4"
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0] * 50}</span>
                <span>${priceRange[1] * 50}</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        <AnimatedSection animation="fade-in-right" delay="delay-200">
          <ProductGrid sortBy={sortBy} priceRange={[priceRange[0] * 50, priceRange[1] * 50]} categories={categories} />
        </AnimatedSection>
      </div>
    </main>
  )
}