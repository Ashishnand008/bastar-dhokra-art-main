"use client"

import { useState, useEffect } from "react"
import { ChevronDown, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SupportedCurrency, CURRENCY_SYMBOLS, CURRENCY_NAMES } from "@/types/currency"
import { currencyService } from "@/lib/currency"

interface CurrencySelectorProps {
  value: SupportedCurrency
  onValueChange: (currency: SupportedCurrency) => void
  className?: string
  variant?: "default" | "compact" | "nav"
}

export default function CurrencySelector({
  value,
  onValueChange,
  className = "",
  variant = "default"
}: CurrencySelectorProps) {
  const [currencies, setCurrencies] = useState<SupportedCurrency[]>([])

  useEffect(() => {
    setCurrencies(currencyService.getSupportedCurrencies())
  }, [])

  if (variant === "compact") {
    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={`w-20 ${className}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((currency) => (
            <SelectItem key={currency} value={currency}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{CURRENCY_SYMBOLS[currency]}</span>
                <span className="text-xs text-muted-foreground">{currency}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  if (variant === "nav") {
    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={`text-base font-medium transition-colors text-muted-foreground hover:text-primary border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 px-2 py-1 h-auto data-[state=open]:text-primary flex items-center gap-1 ${className}`}>
          {/* <DollarSign className="h-4 w-4" /> */}
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-[120px]">
          {currencies.map((currency) => (
            <SelectItem key={currency} value={currency} className="cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{CURRENCY_SYMBOLS[currency]}</span>
                <span className="text-xs text-muted-foreground">{currency}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`w-32 ${className}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency} value={currency}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{CURRENCY_SYMBOLS[currency]}</span>
              <span className="text-xs text-muted-foreground">{currency}</span>
              <span className="text-xs text-muted-foreground">({CURRENCY_NAMES[currency]})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 