import { Link, useSearchParams } from 'react-router-dom'
import { Arrow, CategoryIcon } from '../components/ServiceIcons'
import { PackageCard, CostBreakdown, FaqList, CtaBand, SectionHeader, PricingNote } from '../components/Blocks'
import { usePageTitle } from '../components/usePageTitle'
import { categories, getCategory, businessLines, categoriesIn } from '../data/services'
import { site } from '../data/site'
import { generalFaqs } from '../data/company'

const priceFactors = [
  { title: 'Scope', text: 'Number of pages, screens, features or workflows.' },
  { title: 'Content', text: 'Whether you supply text and images or we create them.' },
  { title: 'Integrations', text: 'Payment gateways, CRMs, APIs and other systems to connect.' },
  { title: 'Timeline', text: 'Urgent deadlines may need extra resources.' },
]

function PricingPage() {
  usePageTitle('Pricing', 'Published starting prices, package contents and exclusions for websites, Shopify stores, software, AI automation, SEO, IT support and more.')
  const [params, setParams] = useSearchParams()
  const active = getCategory(params.get('service')) ?? categories[0]

  const select = (id) => setParams({ service: id }, { replace: true, preventScrollReset: true })

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="kicker">Pricing</span>
          <h1>Simple, transparent pricing</h1>
          <p className="page-hero-copy">
            Published starting prices for every service, with what's included and what isn't.
            Final prices are confirmed in a fixed, written quote.
          </p>
          <p className="currency-badge">Prices in <strong>{site.currency.code}</strong>. {site.taxNote}</p>
        </div>
      </section>

      <section className="section pricing-section shell">
        <div className="pricing-tabs" role="group" aria-label="Choose a service to compare prices">
          {businessLines.map(line => (
            <div className="pricing-tab-group" key={line.id}>
              <p className="mega-heading">{line.name}</p>
              <div className="pricing-tab-row">
                {categoriesIn(line).map(c => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={c.id === active.id}
                    aria-controls="pricing-panel"
                    className={c.id === active.id ? 'is-active' : ''}
                    style={{ '--cat': c.color }}
                    onClick={() => select(c.id)}
                  >
                    <CategoryIcon id={c.id} color={c.color} size={28} />
                    {c.short}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div id="pricing-panel" style={{ '--cat': active.color }}>
          <div className="pricing-panel-head">
            <div>
              <h2>{active.name}</h2>
              <p>{active.tagline}</p>
            </div>
            <Link className="text-link" to={`/services/${active.id}`}>Full service details <Arrow /></Link>
          </div>
          <div className="package-grid">
            {active.packages.map(p => <PackageCard key={p.name} pkg={p} category={active} />)}
          </div>
          <PricingNote />
          <CostBreakdown category={active} />
        </div>
      </section>

      <section className="section section-tint">
        <div className="shell">
          <SectionHeader
            kicker="Your quote"
            title="What affects the final price?"
            text="Our packages cover most needs. When yours is different, these are the factors we consider."
          />
          <div className="factor-grid">
            {priceFactors.map(f => (
              <div className="factor" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="payment-terms">
            <h3>Payment terms</h3>
            <ul>
              <li><strong>Projects under {site.currency.symbol}2,000:</strong> 50% to start, 50% on completion.</li>
              <li><strong>Larger projects:</strong> split into agreed milestones.</li>
              <li><strong>Monthly services:</strong> billed at the start of each month. Minimum terms are listed on each plan.</li>
              <li><strong>Third-party costs</strong> (hosting, domains, licences, ad spend, AI usage) are paid directly to the provider.</li>
              <li><strong>Currency and tax:</strong> all prices are in {site.currency.code}. {site.taxNote}</li>
            </ul>
            <p className="payment-terms-link">Full details are in our <Link to="/terms">terms of service</Link>.</p>
          </div>
        </div>
      </section>

      <section className="section shell faq-section">
        <SectionHeader kicker="FAQ" title="Pricing questions" align="left" />
        <FaqList faqs={generalFaqs} />
      </section>

      <CtaBand title="Need a custom quote?" text={`Describe your project and we'll send a fixed price within ${site.quoteTurnaround}.`} />
    </>
  )
}

export default PricingPage
