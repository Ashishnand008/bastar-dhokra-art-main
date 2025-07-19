import { ExchangeRates, SupportedCurrency, CURRENCY_SYMBOLS, CURRENCY_NAMES } from '@/types/currency'

const CACHE_KEY = 'exchange_rates_cache'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Using a free exchange rate API (exchangerate-api.com)
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/INR'

interface ExchangeRateAPIResponse {
  base: string
  date: string
  rates: Record<string, number>
}

interface CachedRates {
  rates: ExchangeRates
  timestamp: number
}

export class CurrencyService {
  private static instance: CurrencyService
  private rates: ExchangeRates = {}
  private lastFetch: number = 0

  private constructor() {}

  static getInstance(): CurrencyService {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService()
    }
    return CurrencyService.instance
  }

  private getCachedRates(): CachedRates | null {
    if (typeof window === 'undefined') return null

    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) return null

      const parsed: CachedRates = JSON.parse(cached)
      const now = Date.now()

      // Check if cache is still valid
      if (now - parsed.timestamp < CACHE_DURATION) {
        return parsed
      }

      // Cache expired, remove it
      localStorage.removeItem(CACHE_KEY)
      return null
    } catch (error) {
      console.error('Error reading cached rates:', error)
      return null
    }
  }

  private setCachedRates(rates: ExchangeRates): void {
    if (typeof window === 'undefined') return

    try {
      const cached: CachedRates = {
        rates,
        timestamp: Date.now()
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cached))
    } catch (error) {
      console.error('Error caching rates:', error)
    }
  }

  private async fetchExchangeRates(): Promise<ExchangeRates> {
    try {
      // Try external API first
      const response = await fetch(API_BASE_URL)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ExchangeRateAPIResponse = await response.json()
      
      // Convert API response to our format
      const rates: ExchangeRates = {}
      
      Object.entries(data.rates).forEach(([currency, rate]) => {
        if (this.isSupportedCurrency(currency)) {
          rates[currency] = {
            currency,
            rate,
            symbol: CURRENCY_SYMBOLS[currency as SupportedCurrency],
            name: CURRENCY_NAMES[currency as SupportedCurrency]
          }
        }
      })

      // Add INR as base currency
      rates.INR = {
        currency: 'INR',
        rate: 1,
        symbol: CURRENCY_SYMBOLS.INR,
        name: CURRENCY_NAMES.INR
      }

      return rates
    } catch (error) {
      console.error('Error fetching from external API, trying local API:', error)
      
      try {
        // Try local API as fallback
        const localResponse = await fetch('/api/exchange-rates')
        const localData = await localResponse.json()
        
        if (localData.success) {
          const rates: ExchangeRates = {}
          
          Object.entries(localData.data.rates).forEach(([currency, rate]) => {
            if (this.isSupportedCurrency(currency)) {
              rates[currency] = {
                currency,
                rate: rate as number,
                symbol: CURRENCY_SYMBOLS[currency as SupportedCurrency],
                name: CURRENCY_NAMES[currency as SupportedCurrency]
              }
            }
          })

          return rates
        }
      } catch (localError) {
        console.error('Error fetching from local API:', localError)
      }
      
      // Return fallback rates if all APIs fail
      return this.getFallbackRates()
    }
  }

  private getFallbackRates(): ExchangeRates {
    return {
      INR: { currency: 'INR', rate: 1, symbol: '₹', name: 'Indian Rupee' },
      USD: { currency: 'USD', rate: 0.012, symbol: '$', name: 'US Dollar' },
      EUR: { currency: 'EUR', rate: 0.011, symbol: '€', name: 'Euro' },
      GBP: { currency: 'GBP', rate: 0.0095, symbol: '£', name: 'British Pound' },
      CAD: { currency: 'CAD', rate: 0.016, symbol: 'C$', name: 'Canadian Dollar' },
      AUD: { currency: 'AUD', rate: 0.018, symbol: 'A$', name: 'Australian Dollar' },
      JPY: { currency: 'JPY', rate: 1.8, symbol: '¥', name: 'Japanese Yen' }
    }
  }

  private isSupportedCurrency(currency: string): currency is SupportedCurrency {
    return Object.keys(CURRENCY_SYMBOLS).includes(currency)
  }

  async getExchangeRates(): Promise<ExchangeRates> {
    // Check cache first
    const cached = this.getCachedRates()
    if (cached) {
      this.rates = cached.rates
      this.lastFetch = cached.timestamp
      return this.rates
    }

    // Fetch fresh rates
    this.rates = await this.fetchExchangeRates()
    this.lastFetch = Date.now()
    
    // Cache the rates
    this.setCachedRates(this.rates)
    
    return this.rates
  }

  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    if (!this.rates[fromCurrency] || !this.rates[toCurrency]) {
      return amount
    }

    // Convert to INR first (base currency), then to target currency
    const inrAmount = amount / this.rates[fromCurrency].rate
    return inrAmount * this.rates[toCurrency].rate
  }

  formatPrice(amount: number, currency: SupportedCurrency): string {
    const symbol = CURRENCY_SYMBOLS[currency]
    
    // Special formatting for different currencies
    switch (currency) {
      case 'JPY':
        return `${symbol}${Math.round(amount)}`
      case 'INR':
        return `${symbol}${amount.toFixed(2)}`
      default:
        return `${symbol}${amount.toFixed(2)}`
    }
  }

  getSupportedCurrencies(): SupportedCurrency[] {
    return Object.keys(CURRENCY_SYMBOLS) as SupportedCurrency[]
  }
}

// Export singleton instance
export const currencyService = CurrencyService.getInstance() 