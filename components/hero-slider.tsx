"use client"

import { useState, useEffect } from "react"

const images = [
  "/LRM_EXPORT_106553940619729_20190719_134929160_1_-min_d333e2aa-657d-4169-8674-bb4af7c05201_1080x.webp?height=800&width=1600&text=Bastar Dhokra Art 1",
  "/34.webp?height=800&width=1600&text=Bastar Dhokra Art 2",
  "/hero3.jpg?height=800&width=1600&text=Bastar Dhokra Art 3",
]

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={`Bastar Dhokra Art slide ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-8 rounded-full transition-all ${
              index === currentIndex ? "bg-primary" : "bg-primary/30 hover:bg-primary/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
