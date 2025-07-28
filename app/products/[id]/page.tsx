"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/products"
import { urlFor } from "@/lib/sanity"
import { SanityProduct } from "@/types/sanity"
import PriceDisplay from "@/components/price-display"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [product, setProduct] = useState<SanityProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const fetchedProduct = await getProductById(id)
        setProduct(fetchedProduct)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch product:', err)
        setError('Failed to load product details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-12">
        <h1 className="mb-4 text-2xl font-bold">Loading Product...</h1>
        <p className="text-muted-foreground">Please wait while we fetch the product details.</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-12">
        <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          {error || 'The product you are looking for does not exist or has been removed.'}
        </p>
        <Button onClick={() => router.push("/products")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  return (
    <main className="container mx-auto py-12">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/products")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="relative rounded-lg border bg-background p-2">
          <div className="relative aspect-square overflow-hidden rounded-md">
            <img
              src={urlFor(product.images[currentImageIndex]).url() || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Image Navigation */}
          <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between">
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full opacity-70 transition-opacity hover:opacity-100"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full opacity-70 transition-opacity hover:opacity-100"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-4 flex justify-center space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`h-16 w-16 overflow-hidden rounded-md border transition-all ${currentImageIndex === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
                  }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={urlFor(image).width(100).height(100).url() || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
          <div className="mb-4">
            <PriceDisplay 
              amount={product.price} 
              showCurrencySelector={true} 
              variant="large"
            />
          </div>

          <div className="mb-6 space-y-4">
            <p className="text-muted-foreground">{product.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                <p>{product.id.current}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Weight</h3>
                <p>{product.weight.min} - {product.weight.max} kg</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Dimensions</h3>
                <p>{product.dimensions}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Material</h3>
                <p>{product.material}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                <p>{product.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Country of Origin</h3>
                <p>India</p>
              </div>
            </div>
          </div>

          {/* <Button className="w-full">Add to Cart</Button> */}

          <div className="mt-8 rounded-lg border bg-muted p-4">
            <h3 className="mb-2 font-semibold">Handcrafted Excellence</h3>
            <p className="text-sm text-muted-foreground">
              Each Dhokra piece is handcrafted by skilled artisans using the ancient lost-wax casting technique. Due to
              the handmade nature, slight variations in size, pattern, and color may occur, making each piece unique.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}