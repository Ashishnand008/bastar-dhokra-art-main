import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface SanityProduct {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: 'product'
  id: {
    _type: 'slug'
    current: string
  }
  name: string
  price: number
  description: string
  images: SanityImage[]
  category: string
  weight: number
  dimensions: string
  material: string
  featured: boolean
  date: string
}

export interface SimpleProduct {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  category: string
  featured: boolean
  date: string
}