"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMobile } from "@/hooks/use-mobile"
import CurrencySelector from "@/components/currency-selector"
import { useCurrency } from "@/contexts/currency-context"

export default function Navbar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const { selectedCurrency, setSelectedCurrency } = useCurrency()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we're already on the home page and it's a section link
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault()
      const targetId = href.substring(2)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        // Scroll to element with offset for the fixed header
        const headerOffset = 80
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        if (isMobile) {
          setIsMenuOpen(false) // Close mobile menu after clicking
        }
      }
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background/80 shadow backdrop-blur-md" : "bg-background"
        }`}
    >
      <div className="container mx-auto flex h-28 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/rustic_art_logo.png" alt="Bastar Dhokra Art" className="h-20 w-auto" />
          <p className="rustic-art-text dark:text-white uppercase select-none glow-text">
            THE RUSTIC ART
          </p>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center justify-end space-x-6 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-primary ${pathname === link.href || (pathname === "/" && link.href.includes("/#"))
                    ? "text-primary"
                    : "text-muted-foreground"
                  }`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}

            {/* Separator */}
            <div className="h-6 w-px bg-border mx-2" />

            {/* Currency Selector */}
            <div className="flex items-center group">
              <CurrencySelector
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
                variant="nav"
                className="group-hover:text-primary"
              />
            </div>

            {/* Separator */}
            <div className="h-6 w-px bg-border mx-2" />

            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button variant="ghost" size="icon" aria-label="Toggle Menu" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation - Right aligned with limited width */}
      {isMobile && isMenuOpen && (
        <div className="absolute right-0 w-64 bg-background border-l border-b shadow-lg">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-6 py-3 text-sm text-right font-medium transition-colors hover:bg-muted ${pathname === link.href || (pathname === "/" && link.href.includes("/#"))
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                  }`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}

            {/* Separator */}
            <div className="mx-6 my-2 h-px bg-border" />

            {/* Currency Selector */}
            <div className="px-6 py-3 flex items-center justify-end group">
              <CurrencySelector
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
                variant="nav"
                className="group-hover:text-primary w-fit"
              />
            </div>
            
            {/* Separator */}
            <div className="mx-6 my-2 h-px bg-border" />
            
            {/* Theme Toggle */}
            <div className="px-6 py-3 flex items-center justify-end">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
