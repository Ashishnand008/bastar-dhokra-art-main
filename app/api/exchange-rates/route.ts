import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/INR'

export async function GET() {
  try {
    const response = await fetch(API_BASE_URL)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      data: {
        base: data.base,
        date: data.date,
        rates: data.rates
      }
    })
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
    
    // Return fallback rates if API fails
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch exchange rates',
      fallback: {
        base: 'INR',
        date: new Date().toISOString().split('T')[0],
        rates: {
          INR: 1,
          USD: 0.012,
          EUR: 0.011,
          GBP: 0.0095,
          CAD: 0.016,
          AUD: 0.018,
          JPY: 1.8
        }
      }
    })
  }
} 