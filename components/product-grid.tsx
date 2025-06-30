"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { getAllProducts, getFeaturedProducts, SimpleProduct } from "@/lib/products"

interface ProductGridProps {
  featured?: boolean
  limit?: number
  sortBy?: string
  priceRange?: number[]
  categories?: string[]
}

export default function ProductGrid({
  featured = false,
  limit,
  sortBy = "featured",
  priceRange = [0, 5000],
  categories = [],
}: ProductGridProps) {
  const [products, setProducts] = useState<SimpleProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Use refs to track previous prop values
  const prevProps = useRef({
    featured,
    limit,
    sortBy,
    priceRange,
    categories,
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let fetchedProducts: SimpleProduct[] = []
        
        if (featured) {
          fetchedProducts = await getFeaturedProducts(limit)
        } else {
          fetchedProducts = await getAllProducts()
        }

        // Apply client-side filtering and sorting
        let filteredProducts = [...fetchedProducts]

        // Filter by price range
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
        )

        // Filter by categories
        if (categories.length > 0) {
          filteredProducts = filteredProducts.filter((product) => categories.includes(product.category))
        }

        // Sort products
        switch (sortBy) {
          case "price-low":
            filteredProducts.sort((a, b) => a.price - b.price)
            break
          case "price-high":
            filteredProducts.sort((a, b) => b.price - a.price)
            break
          case "newest":
            filteredProducts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            break
          default:
            // featured or any other value
            filteredProducts.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
        }

        // Apply limit
        if (limit) {
          filteredProducts = filteredProducts.slice(0, limit)
        }

        setProducts(filteredProducts)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    // Check if props have actually changed to avoid unnecessary fetches
    const propsChanged =
      prevProps.current.featured !== featured ||
      prevProps.current.limit !== limit ||
      prevProps.current.sortBy !== sortBy ||
      prevProps.current.priceRange[0] !== priceRange[0] ||
      prevProps.current.priceRange[1] !== priceRange[1] ||
      prevProps.current.categories.length !== categories.length ||
      (categories.length > 0 && !categories.every((cat) => prevProps.current.categories.includes(cat)))

    if (propsChanged) {
      fetchProducts()
      
      // Update the ref with current props
      prevProps.current = {
        featured,
        limit,
        sortBy,
        priceRange,
        categories,
      }
    }
  }, [featured, limit, sortBy, priceRange, categories])

  if (loading) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border bg-muted p-8 text-center">
        <h3 className="mb-2 text-xl font-semibold">Loading Products...</h3>
        <p className="text-muted-foreground">Please wait while we fetch the latest collection.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border bg-muted p-8 text-center">
        <h3 className="mb-2 text-xl font-semibold">Error Loading Products</h3>
        <p className="mb-6 text-muted-foreground">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border bg-muted p-8 text-center">
        <h3 className="mb-2 text-xl font-semibold">No Products Found</h3>
        <p className="mb-6 text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
        <Button variant="outline">Clear Filters</Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <AnimatedSection
          key={product.id}
          animation="fade-in-up"
          delay={`delay-${Math.min(index * 100, 500)}` as 
          | ""
          | "delay-100"
          | "delay-200"
          | "delay-300"
          | "delay-400"
          | "delay-500"}
          threshold={0.1}
        >
          <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-1 font-medium line-clamp-1">{product.name}</h3>
              <p className="mb-2 text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
              <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
              <Link href={`/products/${product.id}`}>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </Button>
              </Link>
            </div>
            {product.featured && (
              <div className="absolute left-0 top-2 rounded-r-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Featured
              </div>
            )}
          </div>
        </AnimatedSection>
      ))}
    </div>
  )
}