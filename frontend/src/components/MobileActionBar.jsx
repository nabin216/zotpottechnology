import { Link, useLocation } from 'react-router-dom'
import { site } from '../data/site'

// Phone-only bar pinned to the bottom of the screen, so the two main actions
// are always one tap away. Hidden on the contact page, where the form is.
function MobileActionBar() {
  const { pathname } = useLocation()
  if (pathname === '/contact') return null

  return (
    <div className="mobile-action-bar">
      {pathname === '/business-automation'
        ? <a className="button button-primary" href="#audit">Book free audit</a>
        : <Link className="button button-primary" to="/contact">Get a free quote</Link>}
      {site.whatsapp && (
        <a
          className="button mab-whatsapp"
          href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hi ZotPot, I would like to ask about your services.')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 01-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 01-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47a9.4 9.4 0 016.7 2.78 9.4 9.4 0 012.77 6.7c0 5.22-4.25 9.47-9.47 9.47zm8.06-17.53A11.32 11.32 0 0012.05.63C5.77.63.66 5.74.66 12.02c0 2 .52 3.96 1.52 5.69L.57 23.6l6.04-1.58a11.36 11.36 0 005.44 1.38h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.19-5.9-3.34-8.05z" />
          </svg>
          WhatsApp
        </a>
      )}
    </div>
  )
}

export default MobileActionBar
