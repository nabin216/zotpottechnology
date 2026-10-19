import { Link, useParams } from 'react-router-dom'
import { Arrow, CategoryIcon, CheckIcon } from '../components/ServiceIcons'
import { PackageCard, CostBreakdown, FaqList, CtaBand, SectionHeader, PricingNote, ProjectCard } from '../components/Blocks'
import { usePageTitle } from '../components/usePageTitle'
import { getCategory, startingPackage, lineOf, categoriesIn } from '../data/services'
import { projectsFor } from '../data/portfolio'
import { site } from '../data/site'
import { formatPrice } from '../data/currency'
import { processSteps } from '../data/company'
import NotFoundPage from './NotFound'

function ServiceDetailPage() {
  const { id } = useParams()
  const c = getCategory(id)
  usePageTitle(c?.name ?? 'Page not found', c?.summary)

  if (!c) return <NotFoundPage />

  const start = startingPackage(c)
  const line = lineOf(c.id)
  const related = categoriesIn(line).filter(r => r.id !== c.id).slice(0, 3)
  const work = projectsFor(c.id)

  return (
    <div style={{ '--cat': c.color }}>
      <section className="page-hero detail-hero">
        <div className="shell detail-hero-grid">
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link><span aria-hidden="true">/</span>
              <Link to={`/services#${line.id}`}>{line.name}</Link><span aria-hidden="true">/</span>
              <span aria-current="page">{c.short}</span>
            </nav>
            <div className="detail-title">
              <CategoryIcon id={c.id} color={c.color} size={60} />
              <h1>{c.name}</h1>
            </div>
            <p className="detail-tagline">{c.tagline}</p>
            <p className="page-hero-copy">{c.summary}</p>
            <div className="hero-actions">
              <Link className="button button-primary button-lg" to={`/contact?service=${c.id}`}>Get a free quote <Arrow /></Link>
              <a className="button button-outline button-lg" href="#packages">View packages</a>
            </div>
          </div>
          <aside className="detail-facts">
            {start && (
              <div>
                <small>Starting from</small>
                <strong>{formatPrice(start.price)}{start.unit}</strong>
              </div>
            )}
            <div>
              <small>Typical timeline</small>
              <strong>{c.packages[0].timeline}</strong>
            </div>
            <div className="fact-wide">
              <small>Written quote within</small>
              <strong>{site.quoteTurnaround}</strong>
            </div>
            <div className="detail-tools">
              <small>Tools &amp; platforms</small>
              <ul>{c.tools.map(t => <li key={t}>{t}</li>)}</ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section shell">
        <SectionHeader kicker="What we offer" title={`Our ${c.short.toLowerCase()} services`} align="left" />
        <ul className="offer-grid">
          {c.offerings.map(o => (
            <li key={o}><CheckIcon />{o}</li>
          ))}
        </ul>
      </section>

      <section className="section section-tint" id="packages">
        <div className="shell">
          <SectionHeader
            kicker="Packages & pricing"
            title="Choose a starting point"
            text="Each package lists exactly what's included. Anything not listed, or listed below as not included, is quoted separately before work begins."
          />
          <div className="package-grid">
            {c.packages.map(p => <PackageCard key={p.name} pkg={p} category={c} />)}
          </div>
          <PricingNote />
          <CostBreakdown category={c} />
        </div>
      </section>

      {work.length > 0 && (
        <section className="section shell">
          <SectionHeader kicker="Examples" title={`${c.short} projects we've delivered`} />
          <div className="project-grid">
            {work.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>
      )}

      <section className={`section ${work.length > 0 ? 'section-tint' : ''}`}>
        <div className="shell">
          <SectionHeader kicker="How it works" title="A clear process from start to finish" />
          <ol className="process-grid process-light">
            {processSteps.map((p, i) => (
              <li className="process-step" key={p.title}>
                <span className="process-number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section shell faq-section">
        <SectionHeader kicker="FAQ" title={`${c.short} questions`} align="left" />
        <FaqList faqs={c.faqs} />
      </section>

      <section className="section section-tint">
        <div className="shell">
          <SectionHeader kicker={line.name} title="Related services" />
          <div className="related-grid">
            {related.map(r => (
              <Link className="goal-card" to={`/services/${r.id}`} key={r.id}>
                <CategoryIcon id={r.id} color={r.color} size={42} />
                <span>
                  <strong>{r.short}</strong>
                  <small>{r.tagline}</small>
                </span>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`Ready to start your ${c.short.toLowerCase()} project?`} />
    </div>
  )
}

export default ServiceDetailPage
