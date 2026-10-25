import { Link } from 'react-router-dom'
import Logo from './Logo'
import { site } from '../data/site'
import { pricingNote } from '../data/currency'
import CurrencySwitch from './CurrencySwitch'
import { openConsentSettings, trackingEnabled } from '../data/tracking'
import { businessLines, categoriesIn } from '../data/services'
import { projects } from '../data/portfolio'

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}

function XMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2.4h3.37l-7.37 8.42L23.57 22h-6.79l-5.32-6.95L5.38 22H2l7.88-9.01L1.43 2.4h6.96l4.81 6.36zm-1.18 17.58h1.87L7.37 4.32H5.36z" />
    </svg>
  )
}

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.4 5 18.4 5.3 18.4 5.3c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3z" />
    </svg>
  )
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0 3.3a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm0 10.7a4.2 4.2 0 110-8.4 4.2 4.2 0 010 8.4zm6.8-10.9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  )
}

const currentYear = new Date().getFullYear()

const socialLinks = [
  { key: 'linkedin', label: 'LinkedIn', mark: <LinkedInMark /> },
  { key: 'facebook', label: 'Facebook', mark: <FacebookMark /> },
  { key: 'instagram', label: 'Instagram', mark: <InstagramMark /> },
  { key: 'x', label: 'X', mark: <XMark /> },
  { key: 'github', label: 'GitHub', mark: <GitHubMark /> },
]

function Footer() {
  const { legal } = site
  const activeSocial = socialLinks.filter(s => site.social[s.key])

  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-brand-col">
          <Link className="footer-brand" to="/">
            <Logo size={30} /> <span>Zot<b>Pot</b> Technologies</span>
          </Link>
          <p>
            Websites, software, AI automation and digital marketing for ambitious small businesses.
            Clear pricing, honest advice and work you fully own.
          </p>
          {activeSocial.length > 0 && (
            <div className="social-links" aria-label="Social links">
              {activeSocial.map(s => (
                <a key={s.key} href={site.social[s.key]} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.mark}
                </a>
              ))}
            </div>
          )}
        </div>
        {businessLines.map(line => (
          <div className="footer-col" key={line.id}>
            <h5>{line.name}</h5>
            {categoriesIn(line).map(c => (
              <Link key={c.id} to={`/services/${c.id}`}>{c.short}</Link>
            ))}
          </div>
        ))}
        <div className="footer-col">
          <h5>Company</h5>
          <Link to="/about">About us</Link>
          {projects.length > 0 && <Link to="/work">Our work</Link>}
          <Link to="/pricing">Pricing</Link>
          <Link to="/business-automation">Free automation audit</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms of service</Link>
          <Link to="/privacy">Privacy policy</Link>
          {trackingEnabled && <button type="button" className="footer-link-button" onClick={openConsentSettings}>Cookie settings</button>}
        </div>
        <div className="footer-col footer-contact">
          <h5>Get in touch</h5>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.phone && <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>{site.phone}</a>}
          {site.address && <p>{site.address}</p>}
          {site.hours && <p>{site.hours}</p>}
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>
          © {currentYear} {legal.registeredName || site.name}. All rights reserved.
          {legal.companyNumber && <> Company no. {legal.companyNumber}{legal.jurisdiction && ` (${legal.jurisdiction})`}.</>}
          {legal.taxNumber && <> Tax/VAT no. {legal.taxNumber}.</>}
          {legal.registeredAddress && <> Registered office: {legal.registeredAddress}.</>}
        </span>
        <span className="footer-currency">{pricingNote()} <CurrencySwitch className="is-dark" /></span>
      </div>
    </footer>
  )
}

export default Footer
