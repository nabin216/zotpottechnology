import { Link } from 'react-router-dom'
import { Arrow, CheckIcon } from './ServiceIcons'
import { site } from '../data/site'
import { formatPrice, pricingNote, localizeText } from '../data/currency'
import CurrencySwitch from './CurrencySwitch'
import { getCategory } from '../data/services'

export function PackageCard({ pkg, category }) {
  const quoteLink = `/contact?service=${category.id}&package=${encodeURIComponent(pkg.name)}`
  return (
    <article className={`package-card ${pkg.popular ? 'is-popular' : ''}`}>
      {pkg.popular && <span className="package-badge">Most popular</span>}
      <h3>{pkg.name}</h3>
      <p className="package-desc">{pkg.description}</p>
      <div className="package-price">
        {pkg.price == null ? (
          <strong>Custom quote</strong>
        ) : (
          <>
            {pkg.from && <span className="package-from">From</span>}
            <strong>{formatPrice(pkg.price)}</strong>
            {pkg.unit && <span className="package-unit">{pkg.unit}</span>}
          </>
        )}
      </div>
      <ul className="check-list">
        {pkg.features.map(f => (
          <li key={f}><CheckIcon />{f}</li>
        ))}
      </ul>
      <p className="package-timeline">
        <ClockIcon /> {pkg.timeline}
      </p>
      <Link className={`button ${pkg.popular ? 'button-primary' : 'button-outline'} button-block`} to={quoteLink}>
        Get a quote
      </Link>
    </article>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6v4l2.5 1.5" strokeLinecap="round" />
    </svg>
  )
}

export function SwipeHint({ text = 'Swipe to compare packages' }) {
  return <p className="swipe-hint" aria-hidden="true">{text} →</p>
}

export function PricingNote() {
  return (
    <p className="pricing-note">
      <CurrencySwitch />
      {pricingNote()} Packages can be adjusted, and the final price is confirmed in a written quote.{' '}
      <Link to="/terms">Terms</Link>
    </p>
  )
}

// Everything around the package price: extras, what is not included,
// running costs and important conditions.
export function CostBreakdown({ category }) {
  const { addons, exclusions, ongoingCosts, notes } = category
  const count = 1 + [exclusions, ongoingCosts, notes].filter(Boolean).length
  return (
    <div className={`cost-grid cost-grid-${count}`}>
      <div className="extras-card">
        <h3>Add-ons &amp; extras</h3>
        <ul className="addon-list">
          {addons.map(a => (
            <li key={a.name}>
              <span>{a.name}</span>
              <strong>{formatPrice(a.price, a.unit, a.from)}</strong>
            </li>
          ))}
        </ul>
      </div>
      {exclusions && (
        <div className="extras-card">
          <h3>Not included in package prices</h3>
          <ul className="plain-list is-minus">
            {exclusions.map(e => <li key={e}>{localizeText(e)}</li>)}
          </ul>
        </div>
      )}
      {ongoingCosts && (
        <div className="extras-card">
          <h3>Ongoing &amp; third-party costs</h3>
          <ul className="plain-list">
            {ongoingCosts.map(e => <li key={e}>{localizeText(e)}</li>)}
          </ul>
        </div>
      )}
      {notes && (
        <div className="extras-card notes-card">
          <h3>Good to know</h3>
          <ul className="plain-list">
            {notes.map(n => <li key={n}>{localizeText(n)}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export function FaqList({ faqs }) {
  return (
    <div className="faq-list">
      {faqs.map(f => (
        <details className="faq-item" key={f.q}>
          <summary>{f.q}</summary>
          <p>{localizeText(f.a)}</p>
        </details>
      ))}
    </div>
  )
}

export function ProjectCard({ project }) {
  return (
    <article className="project-card">
      {project.image && (
        <div className="project-thumb">
          <img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" />
        </div>
      )}
      <div className="project-body">
        <div className="project-tags">
          {project.services.map(id => {
            const c = getCategory(id)
            return c && <Link key={id} to={`/services/${id}`} style={{ '--cat': c.color }}>{c.short}</Link>
          })}
        </div>
        <h3>{project.title}</h3>
        {project.client && <p className="project-client">{project.client}</p>}
        <dl className="project-story">
          <div><dt>The challenge</dt><dd>{project.problem}</dd></div>
          <div><dt>What we built</dt><dd>{project.solution}</dd></div>
          {project.outcome && <div><dt>The result</dt><dd>{project.outcome}</dd></div>}
        </dl>
        {project.tech?.length > 0 && (
          <ul className="project-tech">{project.tech.map(t => <li key={t}>{t}</li>)}</ul>
        )}
        {project.testimonial && (
          <blockquote className="project-quote">
            “{project.testimonial.quote}”
            <cite>{project.testimonial.name}, {project.testimonial.role}</cite>
          </blockquote>
        )}
        {project.link && (
          <a className="text-link" href={project.link} target="_blank" rel="noopener noreferrer">Visit the live site <Arrow /></a>
        )}
      </div>
    </article>
  )
}

export function CtaBand({
  title = 'Tell us about your project',
  text = `Free consultation and a written quote within ${site.quoteTurnaround}. No obligation.`,
}) {
  return (
    <section className="cta-band">
      <div className="shell cta-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <Link className="button button-light" to="/contact">Get a free quote <Arrow /></Link>
          <Link className="button button-ghost-light" to="/pricing">View pricing</Link>
        </div>
      </div>
    </section>
  )
}

export function SectionHeader({ kicker, title, text, align = 'center' }) {
  return (
    <div className={`section-header ${align === 'left' ? 'is-left' : ''}`}>
      {kicker && <span className="kicker">{kicker}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}
