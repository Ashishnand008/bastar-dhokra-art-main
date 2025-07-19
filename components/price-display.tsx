"use client"

import { useState, useEffect } from "react"
import { SupportedCurrency } from "@/types/currency"
import { currencyService } from "@/lib/currency"
import CurrencySelector from "./currency-selector"
import { useCurrency } from "@/contexts/currency-context"

interface PriceDisplayProps {
  amount: number // Amount in INR (base currency)
  className?: string
  showCurrencySelector?: boolean
  defaultCurrency?: SupportedCurrency
  variant?: "default" | "compact" | "large"
}

export default function PriceDisplay({
  amount,
  className = "",
  showCurrencySelector = false,
  defaultCurrency = "INR",
  variant = "default"
}: PriceDisplayProps) {
  const { selectedCurrency, setSelectedCurrency } = useCurrency()
  const [convertedAmount, setConvertedAmount] = useState<number>(amount)
  const [loading, setLoading] = useState(false)
  const [ratesLoaded, setRatesLoaded] = useState(false)

  useEffect(() => {
    const loadRatesAndConvert = async () => {
      if (selectedCurrency === "INR") {
        setConvertedAmount(amount)
        return
      }

      setLoading(true)
      try {
        await currencyService.getExchangeRates()
        const converted = currencyService.convertCurrency(amount, "INR", selectedCurrency)
        setConvertedAmount(converted)
        setRatesLoaded(true)
      } catch (error) {
        console.error("Error converting currency:", error)
        // Fallback to original amount
        setConvertedAmount(amount)
      } finally {
        setLoading(false)
      }
    }

    loadRatesAndConvert()
  }, [amount, selectedCurrency])

  const handleCurrencyChange = (currency: SupportedCurrency) => {
    setSelectedCurrency(currency)
  }

  const formatPrice = () => {
    if (loading) {
      return "Loading..."
    }
    return currencyService.formatPrice(convertedAmount, selectedCurrency)
  }

  const getPriceClasses = () => {
    switch (variant) {
      case "large":
        return "text-3xl font-bold"
      case "compact":
        return "text-sm font-medium"
      default:
        return "text-2xl font-semibold"
    }
  }

  if (showCurrencySelector) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className={`text-primary ${getPriceClasses()}`}>
          {formatPrice()}
        </span>
        <CurrencySelector
          value={selectedCurrency}
          onValueChange={handleCurrencyChange}
          variant="compact"
        />
      </div>
    )
  }

  return (
    <span className={`text-primary ${getPriceClasses()} ${className}`}>
      {formatPrice()}
    </span>
  )
} 