import { Link } from 'react-router-dom'
import { Arrow, CategoryIcon, CheckIcon } from '../components/ServiceIcons'
import { CtaBand, SectionHeader, PricingNote } from '../components/Blocks'
import { usePageTitle } from '../components/usePageTitle'
import { businessLines, categoriesIn, upcomingServices, startingPackage } from '../data/services'
import { formatPrice } from '../data/currency'

function ServicesPage() {
  usePageTitle('Services', 'Websites and e-commerce, software and AI automation, and growth, cloud and security services for small businesses.')

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="kicker">Our services</span>
          <h1>Three business lines, one accountable team</h1>
          <p className="page-hero-copy">
            Choose a service to see what's included, what isn't, and starting prices.
            Not sure which you need? <Link to="/contact">Ask us</Link> and we'll point you in the right direction.
          </p>
          <nav className="line-chips" aria-label="Jump to a business line">
            {businessLines.map((line, i) => (
              <a key={line.id} href={`#${line.id}`}>
                <span>{String(i + 1).padStart(2, '0')}</span>{line.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {businessLines.map((line, i) => (
        <section className={`section ${i % 2 ? 'section-tint' : ''}`} id={line.id} key={line.id}>
          <div className="shell">
            <div className="line-head line-head-lg">
              <span className="line-number">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2>{line.name}</h2>
                <p>{line.desc}</p>
              </div>
            </div>
            <div className="services-list">
              {categoriesIn(line).map(c => {
                const start = startingPackage(c)
                return (
                  <article className="service-row" id={c.id} key={c.id}>
                    <div className="service-row-head">
                      <CategoryIcon id={c.id} color={c.color} size={56} />
                      <div>
                        <h3>{c.name}</h3>
                        <p className="service-row-tagline">{c.tagline}</p>
                      </div>
                    </div>
                    <div className="service-row-body">
                      <p>{c.summary}</p>
                      <ul className="check-list two-col" style={{ '--cat': c.color }}>
                        {c.offerings.map(o => <li key={o}><CheckIcon />{o}</li>)}
                      </ul>
                    </div>
                    <div className="service-row-aside">
                      {start && (
                        <div className="from-price">
                          <small>Starting from</small>
                          <strong>{formatPrice(start.price)}<span>{start.unit}</span></strong>
                        </div>
                      )}
                      <Link className="button button-primary button-block" to={`/services/${c.id}`}>Packages &amp; details</Link>
                      <Link className="button button-outline button-block" to={`/contact?service=${c.id}`}>Get a quote</Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="section shell">
        <PricingNote />
        <SectionHeader
          kicker="Available on request"
          title="More ways we can help"
          text="These services are scoped individually. Get in touch to discuss your requirements."
        />
        <div className="upcoming-grid">
          {upcomingServices.map(s => (
            <div className="upcoming" key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="center-link">
          <Link className="text-link" to="/contact">Ask about these services <Arrow /></Link>
        </div>
      </section>

      <CtaBand title="Not sure where to start?" text="Tell us what you want to achieve and we'll recommend the right service, for free." />
    </>
  )
}

export default ServicesPage
