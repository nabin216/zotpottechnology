import { createContext, useContext } from 'react'
import { site } from './site'

// Prices are written in USD in the data files. The visitor's currency is
// chosen in App and set here before each render, so plain helper functions
// (formatPrice, localizeText) can be called anywhere without hooks.

const STORAGE_KEY = 'zotpot-currency'
// UK business: pounds unless the visitor has chosen dollars.
const DEFAULT_CURRENCY = 'GBP'

let active = DEFAULT_CURRENCY

export function setActiveCurrency(code) {
  active = site.currencies[code] ? code : DEFAULT_CURRENCY
}

export function currentCurrency() {
  return site.currencies[active]
}

// Saved choice first, otherwise GBP. Matches the prerendered HTML, so
// search engines, ad reviewers and first-time visitors all see pounds.
export function detectCurrency() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && site.currencies[saved]) return saved
  } catch { /* storage blocked: fall through */ }
  return DEFAULT_CURRENCY
}

export function saveCurrency(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch { /* storage blocked: choice lasts for this visit only */ }
}

// Converts a USD amount. Prices ending in 9 keep that style ($399 → £319);
// round amounts stay round ($1,000 → £800).
export function convert(usd) {
  const { rate } = currentCurrency()
  if (rate === 1) return usd
  const value = usd * rate
  if (usd >= 100 && usd % 10 === 9) return Math.round((value + 1) / 10) * 10 - 1
  if (value >= 100) return Math.round(value / 10) * 10
  return Math.round(value)
}

export function money(usd) {
  return `${currentCurrency().symbol}${convert(usd).toLocaleString('en-GB')}`
}

export function formatPrice(price, unit = '', from = false) {
  if (price == null) return 'Custom quote'
  return `${from ? 'From ' : ''}${money(price)}${unit}`
}

// Converts every "$123" or "$1,499" inside a sentence.
export function localizeText(text) {
  if (active === 'USD') return text
  return text.replace(/\$(\d{1,3}(?:,\d{3})+|\d+)/g, (_, n) => money(Number(n.replace(/,/g, ''))))
}

export function pricingNote() {
  return `All prices in ${currentCurrency().code}. ${site.taxNote}`
}

export const CurrencyContext = createContext({ code: DEFAULT_CURRENCY, setCode: () => {} })
export const useCurrency = () => useContext(CurrencyContext)
