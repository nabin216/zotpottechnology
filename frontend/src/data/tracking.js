import { site } from './site'

// Google Ads tag, loaded only after the visitor accepts advertising cookies
// (UK GDPR / PECR). Uses Google Consent Mode v2 signals.

const CONSENT_KEY = 'zotpot-consent'
const { tagId, auditConversionLabel } = site.googleAds

export const trackingEnabled = Boolean(tagId)

export function storedConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) // 'granted' | 'denied' | null
  } catch {
    return null
  }
}

let loaded = false

function loadGoogleTag() {
  if (loaded || !trackingEnabled || typeof document === 'undefined') return
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  })
  window.gtag('js', new Date())
  window.gtag('config', tagId)
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`
  document.head.appendChild(script)
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch { /* storage blocked: choice lasts for this visit */ }
  if (value === 'granted') loadGoogleTag()
  else if (loaded && window.gtag) {
    window.gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied' })
  }
}

// Call once on start-up: restores a previous "accept".
export function initTracking() {
  if (storedConsent() === 'granted') loadGoogleTag()
}

// Records a booked audit as a Google Ads conversion (no-op without consent).
export function trackAuditConversion() {
  if (!loaded || !window.gtag || !auditConversionLabel) return
  window.gtag('event', 'conversion', { send_to: `${tagId}/${auditConversionLabel}` })
}

// Lets the footer reopen the banner.
export const OPEN_CONSENT_EVENT = 'zotpot:open-consent'
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}
