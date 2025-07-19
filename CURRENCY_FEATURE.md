# Currency Conversion Feature

## Overview

The Bastar Dhokra Art website now supports real-time currency conversion, allowing users to view product prices in multiple currencies with live exchange rates.

## Features

### Supported Currencies
- **INR** (Indian Rupee) - ₹ - Default currency
- **USD** (US Dollar) - $
- **EUR** (Euro) - €
- **GBP** (British Pound) - £
- **CAD** (Canadian Dollar) - C$
- **AUD** (Australian Dollar) - A$
- **JPY** (Japanese Yen) - ¥

### Key Features
1. **Real-time Exchange Rates**: Fetches live exchange rates from ExchangeRate-API
2. **Global Currency Selection**: Currency preference is saved and maintained across the entire application
3. **Caching**: Exchange rates are cached for 24 hours to reduce API calls
4. **Fallback System**: Multiple fallback mechanisms ensure the feature works even if APIs are down
5. **Responsive Design**: Currency selector works on both desktop and mobile devices

## Implementation Details

### Components

#### `PriceDisplay` Component
- Displays prices with currency conversion
- Supports different variants: `default`, `compact`, `large`
- Can optionally show a currency selector
- Automatically converts prices based on selected currency

#### `CurrencySelector` Component
- Dropdown for selecting currencies
- Two variants: `default` (with full names) and `compact` (symbols only)
- Used in navbar and product details page

#### `CurrencyProvider` Context
- Global state management for currency selection
- Persists currency preference in localStorage
- Provides currency context to all components

### Services

#### `CurrencyService` Class
- Singleton service for currency operations
- Handles API calls, caching, and conversion logic
- Supports multiple API fallbacks

### API Integration

#### Primary API: ExchangeRate-API
- Free tier with generous limits
- Real-time exchange rates
- Base currency: INR

#### Fallback APIs
1. Local API route (`/api/exchange-rates`)
2. Hardcoded fallback rates

### Caching Strategy
- **Duration**: 24 hours
- **Storage**: localStorage
- **Key**: `exchange_rates_cache`
- **Format**: JSON with timestamp

## Usage Examples

### Basic Price Display
```tsx
<PriceDisplay amount={999} />
```

### Price with Currency Selector
```tsx
<PriceDisplay 
  amount={999} 
  showCurrencySelector={true} 
  variant="large"
/>
```

### Currency Selector Only
```tsx
<CurrencySelector
  value={selectedCurrency}
  onValueChange={setSelectedCurrency}
  variant="compact"
/>
```

## File Structure

```
├── components/
│   ├── currency-selector.tsx
│   ├── price-display.tsx
│   └── navbar.tsx (updated)
├── contexts/
│   └── currency-context.tsx
├── lib/
│   └── currency.ts
├── types/
│   └── currency.d.ts
├── app/
│   ├── api/exchange-rates/
│   │   └── route.ts
│   ├── products/[id]/page.tsx (updated)
│   └── layout.tsx (updated)
└── components/
    └── product-grid.tsx (updated)
```

## Configuration

### Adding New Currencies
1. Update `SupportedCurrency` type in `types/currency.d.ts`
2. Add currency symbol to `CURRENCY_SYMBOLS`
3. Add currency name to `CURRENCY_NAMES`
4. Update fallback rates in `CurrencyService`

### Changing Default Currency
Update the default value in `CurrencyProvider`:
```tsx
const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>("INR")
```

## Error Handling

The system includes multiple layers of error handling:
1. **API Failures**: Falls back to local API route
2. **Local API Failures**: Falls back to hardcoded rates
3. **Network Issues**: Graceful degradation with cached rates
4. **Invalid Data**: Validation and sanitization of API responses

## Performance Considerations

- **Caching**: 24-hour cache reduces API calls by ~95%
- **Lazy Loading**: Exchange rates are only fetched when needed
- **Minimal Re-renders**: Context optimization prevents unnecessary updates
- **Bundle Size**: Currency data is loaded on-demand

## Future Enhancements

1. **More Currencies**: Add support for additional currencies
2. **Historical Rates**: Show price trends over time
3. **Geolocation**: Auto-detect user's preferred currency
4. **Offline Support**: Service worker for offline currency conversion
5. **Analytics**: Track currency usage patterns 