import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import MobileActionBar from './components/MobileActionBar'
import HomePage from './pages/Home'
import ServicesPage from './pages/Services'
import ServiceDetailPage from './pages/ServiceDetail'
import PricingPage from './pages/Pricing'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import PrivacyPage from './pages/Privacy'
import TermsPage from './pages/Terms'
import WorkPage from './pages/Work'
import NotFoundPage from './pages/NotFound'
import BusinessAutomationPage from './pages/BusinessAutomation'
import ConsentBanner from './components/ConsentBanner'
import { initTracking } from './data/tracking'
import { CurrencyContext, detectCurrency, saveCurrency, setActiveCurrency } from './data/currency'

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return null
}

// Everything inside the router. Rendered by BrowserRouter in the browser
// (App below) and by StaticRouter when pages are prerendered at build time.
export function AppShell() {
  const [currency, setCurrency] = useState(detectCurrency)
  // Set before rendering children so price helpers use the chosen currency.
  setActiveCurrency(currency)
  const currencyValue = useMemo(() => ({
    code: currency,
    setCode: (code) => {
      saveCurrency(code)
      setCurrency(code)
    },
  }), [currency])

  useEffect(() => {
    initTracking()
  }, [])

  return (
    <CurrencyContext.Provider value={currencyValue}>
      <ScrollManager />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/business-automation" element={<BusinessAutomationPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
      <ConsentBanner />
    </CurrencyContext.Provider>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
