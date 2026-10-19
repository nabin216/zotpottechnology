import { site } from '../data/site'
import { useCurrency } from '../data/currency'

function CurrencySwitch({ className = '' }) {
  const { code, setCode } = useCurrency()
  return (
    <span className={`currency-switch ${className}`} role="group" aria-label="Show prices in">
      {Object.values(site.currencies).map(c => (
        <button
          key={c.code}
          type="button"
          aria-pressed={c.code === code}
          onClick={() => setCode(c.code)}
        >
          {c.symbol} {c.code}
        </button>
      ))}
    </span>
  )
}

export default CurrencySwitch
