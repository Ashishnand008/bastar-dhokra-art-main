"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ProductGrid from "@/components/product-grid"
import HeroSlider from "@/components/hero-slider"
import { useEffect } from "react"
import { AnimatedSection } from "@/components/animated-section"
import { getFeaturedProducts } from '@/lib/products'


export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section id="home" className="relative">
        <HeroSlider />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-4 md:p-8">
          <div className="max-w-4xl text-center text-white">
            <AnimatedSection animation="fade-in-up">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">Bastar Dhokra Art</h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-in-up" delay="delay-200">
              <p className="mb-6 text-lg md:text-xl">
                Ancient tribal metal craft from Bastar, India. Each piece is handcrafted using the lost-wax casting
                technique, passed down through generations.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-in-up" delay="delay-300">
              <Link
                href="/about"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Discover Our Heritage <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section id="about" className="bg-muted py-16">
        <div className="container mx-auto grid gap-8 md:grid-cols-2">
          <AnimatedSection animation="fade-in-left">
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">The Art of Dhokra</h2>
              <p className="mb-4 text-muted-foreground">
                Dhokra is one of the oldest traditional techniques of metal casting in India, dating back over 4,000
                years. The artisans of Bastar region have preserved this ancient craft, creating stunning pieces that
                reflect their way of life, beliefs, and traditions.
              </p>
              <p className="mb-6 text-muted-foreground">
                Each piece is unique, handcrafted using the lost-wax casting method where beeswax is first shaped, then
                covered with clay, and finally heated to replace the wax with molten metal.
              </p>
              <Link href="/about" className="inline-flex items-center font-medium text-primary">
                Learn more about our craft <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-in-right" delay="delay-200">
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <img
                src="/dhokra.webp?height=400&width=600"
                alt="Artisan crafting Dhokra art"
                className="h-full w-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto py-16">
        <AnimatedSection>
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Discover why art enthusiasts and collectors choose our authentic Bastar Dhokra artworks.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <AnimatedSection key={i} animation="fade-in-up" delay={`delay-${i * 100}` as
            | ""
            | "delay-100"
            | "delay-200"
            | "delay-300"
            | "delay-400"
            | "delay-500"}>
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-muted"></div>
                  <div>
                    <p className="font-medium">Customer Name</p>
                    <p className="text-sm text-muted-foreground">Art Collector</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The craftsmanship and attention to detail in these Dhokra pieces is extraordinary. Each artwork tells
                  a story and brings a unique energy to my collection."
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="container mx-auto py-16">
        <AnimatedSection>
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Artworks</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Each piece tells a story of tribal life, mythology, and the rich cultural heritage of Bastar region.
            </p>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="fade-in-up" delay="delay-200">
          <ProductGrid featured={true} limit={8} />
        </AnimatedSection>
        <AnimatedSection animation="fade-in-up" delay="delay-300">
          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Bring Home a Piece of Tribal Heritage</h2>
          </AnimatedSection>
          <AnimatedSection animation="fade-in-up" delay="delay-200">
            <p className="mx-auto mb-8 max-w-2xl">
              Each Dhokra artwork supports traditional artisans and helps preserve this ancient craft for future
              generations.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-in-up" delay="delay-300">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center rounded-md bg-background px-6 py-3 text-lg font-medium text-foreground transition-colors hover:bg-background/90"
              >
                Explore Collection
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md border border-primary-foreground bg-transparent px-6 py-3 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                scroll={true}
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
