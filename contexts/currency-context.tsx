"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { SupportedCurrency } from "@/types/currency"

interface CurrencyContextType {
  selectedCurrency: SupportedCurrency
  setSelectedCurrency: (currency: SupportedCurrency) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>("INR")

  // Load saved currency preference from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selected_currency")
      if (saved && ["INR", "USD", "EUR", "GBP", "CAD", "AUD", "JPY"].includes(saved)) {
        setSelectedCurrency(saved as SupportedCurrency)
      }
    }
  }, [])

  // Save currency preference to localStorage
  const handleSetCurrency = (currency: SupportedCurrency) => {
    setSelectedCurrency(currency)
    if (typeof window !== "undefined") {
      localStorage.setItem("selected_currency", currency)
    }
  }

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency: handleSetCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
} 