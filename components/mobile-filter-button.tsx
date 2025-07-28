"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

interface MobileFilterButtonProps {
  onClick: () => void
}

export function MobileFilterButton({ onClick }: MobileFilterButtonProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsInView(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const navbarHeight = 112 // 7rem = 112px
        
        // Check if button should be sticky (when it reaches navbar height)
        if (rect.top <= navbarHeight && !isSticky) {
          setIsSticky(true)
        } else if (window.scrollY === 0 && isSticky) {
          setIsSticky(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isSticky])

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      size="sm"
      onClick={onClick}
              className={`fade-in-up ${isInView ? 'in-view' : ''} flex items-center gap-2 bg-background/95 backdrop-blur-sm shadow-lg transition-all duration-200 ${
          isSticky 
            ? 'fixed top-28 left-8 right-8 z-40' 
            : 'relative w-full'
        }`}
    >
      <Filter className="h-4 w-4" />
      Filters
    </Button>
  )
} 