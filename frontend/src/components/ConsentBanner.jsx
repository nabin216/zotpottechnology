import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { OPEN_CONSENT_EVENT, setConsent, storedConsent, trackingEnabled } from '../data/tracking'

// Shown only when Google Ads tracking is configured and the visitor has not
// chosen yet. Accept and reject are equally easy, as UK guidance requires.
function ConsentBanner() {
  const [open, setOpen] = useState(() => trackingEnabled && typeof window !== 'undefined' && !storedConsent())

  useEffect(() => {
    if (!trackingEnabled) return
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  if (!open) return null

  const choose = (value) => {
    setConsent(value)
    setOpen(false)
  }

  return (
    <div className="consent-banner" role="dialog" aria-label="Cookie choices">
      <p>
        We'd like to use Google Ads cookies to see which of our ads lead to enquiries. They're off unless you accept.{' '}
        <Link to="/privacy">Privacy policy</Link>
      </p>
      <div className="consent-actions">
        <button type="button" className="button button-outline" onClick={() => choose('denied')}>Reject</button>
        <button type="button" className="button button-primary" onClick={() => choose('granted')}>Accept</button>
      </div>
    </div>
  )
}

export default ConsentBanner
