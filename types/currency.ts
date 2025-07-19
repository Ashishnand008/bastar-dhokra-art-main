export interface ExchangeRate {
  currency: string
  rate: number
  symbol: string
  name: string
}

export interface ExchangeRates {
  [currency: string]: ExchangeRate
}

export interface CurrencyConversion {
  amount: number
  fromCurrency: string
  toCurrency: string
  convertedAmount: number
  rate: number
}

export type SupportedCurrency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY'

export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥'
}

export const CURRENCY_NAMES: Record<SupportedCurrency, string> = {
  INR: 'Indian Rupee',
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  JPY: 'Japanese Yen'
} 