"use client"

import { useInView } from "@/hooks/use-in-view"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-in" | "fade-in-up" | "fade-in-left" | "fade-in-right"
  delay?: "delay-100" | "delay-200" | "delay-300" | "delay-400" | "delay-500" | ""
  threshold?: number
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fade-in-up",
  delay = "",
  threshold = 0.1,
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView({ threshold })

  return (
    <div ref={ref} className={`${className} ${animation} ${delay} ${isInView ? "in-view" : ""}`}>
      {children}
    </div>
  )
}
