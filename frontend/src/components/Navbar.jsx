import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { CategoryIcon } from './ServiceIcons'
import { businessLines, categoriesIn } from '../data/services'
import { projects } from '../data/portfolio'

const links = [
  { to: '/business-automation', label: 'Free audit', highlight: true },
  ...(projects.length > 0 ? [{ to: '/work', label: 'Our work' }] : []),
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastLocation, setLastLocation] = useState(location)
  const menuRef = useRef(null)

  if (location !== lastLocation) {
    setLastLocation(location)
    setOpen(false)
    setMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  useEffect(() => {
    if (!open && !menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setMenuOpen(false)
      }
    }
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open, menuOpen])

  const onServices = location.pathname.startsWith('/services')

  return (
    <header className={`nav-wrap ${scrolled ? 'nav-scrolled' : ''}`}>
      <nav className="nav shell" aria-label="Main">
        <Link className="brand" to="/" aria-label="ZotPot Technologies home">
          <Logo size={34} />
          <span className="brand-text"><span>Zot<b>Pot</b></span><small>Technologies</small></span>
        </Link>

        <div className="nav-links">
          <div className="nav-dropdown" ref={menuRef}>
            <button
              type="button"
              className={`nav-dropdown-toggle ${onServices ? 'nav-active' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="services-menu"
              onClick={() => setMenuOpen(o => !o)}
            >
              Services
              <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5L6 7.5l3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
            <div className={`mega-menu ${menuOpen ? 'is-open' : ''}`} id="services-menu">
              <div className="mega-grid">
                {businessLines.map(line => (
                  <div className="mega-col" key={line.id}>
                    <p className="mega-heading">{line.name}</p>
                    {categoriesIn(line).map(c => (
                      <Link key={c.id} to={`/services/${c.id}`} className="mega-item">
                        <CategoryIcon id={c.id} color={c.color} size={36} />
                        <span>
                          <strong>{c.short}</strong>
                          <small>{c.tagline}</small>
                        </span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mega-footer">
                <span>Not sure what you need? We'll recommend the right service on a free call.</span>
                <Link to="/services">View all services →</Link>
              </div>
            </div>
          </div>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => [isActive && 'nav-active', link.highlight && 'nav-highlight'].filter(Boolean).join(' ')}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-right">
          <Link className="button button-primary nav-cta" to="/contact">Get a free quote</Link>
          <button
            type="button"
            className={`nav-toggle ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${open ? 'is-open' : ''}`} id="mobile-navigation">
        <div className="mobile-nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/services" end>All services</NavLink>
          {businessLines.map(line => (
            <div className="mobile-services" key={line.id}>
              <p className="mega-heading">{line.name}</p>
              {categoriesIn(line).map(c => (
                <Link key={c.id} to={`/services/${c.id}`}>
                  <CategoryIcon id={c.id} color={c.color} size={30} />
                  {c.short}
                </Link>
              ))}
            </div>
          ))}
          {links.map(link => (
            <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
          ))}
          <Link className="button button-primary button-block" to="/contact">Get a free quote</Link>
        </div>
      </div>
      {open && <button type="button" className="mobile-nav-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </header>
  )
}

export default Navbar
