import { Link } from 'react-router-dom'
import { Arrow, CategoryIcon, CheckIcon } from '../components/ServiceIcons'
import { PackageCard, FaqList, CtaBand, SectionHeader, PricingNote, ProjectCard } from '../components/Blocks'
import { usePageTitle } from '../components/usePageTitle'
import { businessLines, categoriesIn, getCategory, startingPackage } from '../data/services'
import { platforms } from '../data/platforms'
import { projects } from '../data/portfolio'
import { site } from '../data/site'
import { formatPrice } from '../data/currency'
import { generalFaqs, commitments, processSteps, audiences, positioning } from '../data/company'

// Goal-based entry points: visitors pick what they want to achieve,
// not which service name they think they need.
const goals = [
  { label: 'I need a new website', hint: 'WordPress, Wix, custom', cat: 'web-development' },
  { label: 'I want to sell online', hint: 'Shopify, WooCommerce', cat: 'web-development' },
  { label: 'I need more customers', hint: 'SEO, ads, social media', cat: 'digital-marketing' },
  { label: 'I want to automate tasks', hint: 'AI chatbots, n8n, workflows', cat: 'ai-automation' },
  { label: 'I need custom software', hint: 'CRM, booking, SaaS', cat: 'custom-software' },
  { label: 'I need a mobile app', hint: 'Android and iOS', cat: 'mobile-apps' },
  { label: 'I need a logo or brand', hint: 'Logo, UI/UX, print', cat: 'ui-ux-branding' },
  { label: 'I need IT or security help', hint: 'Email, support, security checks', cat: 'it-support' },
]

const featuredPackages = [
  ['web-development', 'Business Website'],
  ['web-development', 'E-commerce Store'],
  ['digital-marketing', 'SEO Starter'],
].map(([catId, name]) => {
  const category = getCategory(catId)
  return { category, pkg: category.packages.find(p => p.name === name) }
})

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="browser">
        <div className="browser-bar">
          <span /><span /><span />
          <div className="browser-url">yourbusiness.com</div>
        </div>
        <div className="browser-body">
          <div className="mock-nav"><i /><b /><b /><b /><em /></div>
          <div className="mock-hero">
            <div>
              <i className="w80" /><i className="w60" /><i className="w40 thin" />
              <em />
            </div>
            <div className="mock-img" />
          </div>
          <div className="mock-cards"><div /><div /><div /></div>
        </div>
      </div>
      <div className="float-card float-a">
        <CategoryIcon id="digital-marketing" color="#d97706" size={36} />
        <div><strong>SEO &amp; Ads</strong><small>Monthly reporting</small></div>
      </div>
      <div className="float-card float-b">
        <CategoryIcon id="ai-automation" color="#6366f1" size={36} />
        <div><strong>AI chatbot</strong><small>Answers 24/7</small></div>
      </div>
      <div className="float-card float-c">
        <CheckIcon />
        <div><strong>Fixed, written quotes</strong></div>
      </div>
    </div>
  )
}

function HomePage() {
  usePageTitle(null, 'Websites, online stores, custom software, AI automation and digital marketing for ambitious small businesses. Published prices and free, fixed quotes.')

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-content">
            <span className="pill">{positioning}</span>
            <h1>
              Websites, software and marketing that <em>grow your business.</em>
            </h1>
            <p className="hero-copy">
              We help local businesses, online brands and startups get online, sell more and save time,
              with websites on Shopify, WordPress and React, custom software, AI automation and digital marketing.
              Published prices, one team for all of it.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary button-lg" to="/contact">Get a free quote <Arrow /></Link>
              <Link className="button button-outline button-lg" to="/pricing">See prices</Link>
            </div>
            <ul className="hero-trust">
              <li><CheckIcon />Free consultation</li>
              <li><CheckIcon />Fixed, written quotes</li>
              <li><CheckIcon />You own everything we build</li>
            </ul>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* ─── PLATFORMS ─── */}
      <section className="platform-band" aria-label="Platforms we work with">
        <div className="shell">
          <p className="platform-title">Platforms and tools we work with</p>
          <div className="platform-row">
            {platforms.map(p => (
              <div className="platform" key={p.name} title={p.name}>
                <span className="platform-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: p.svg }} />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GOAL FINDER ─── */}
      <section className="section shell">
        <SectionHeader
          kicker="Start here"
          title="What can we help you with?"
          text="Pick the goal closest to yours and we'll show you the right service, what's included and what it costs."
        />
        <div className="goal-grid">
          {goals.map(g => {
            const c = getCategory(g.cat)
            return (
              <Link className="goal-card" to={`/services/${c.id}`} key={g.label}>
                <CategoryIcon id={c.id} color={c.color} size={42} />
                <span>
                  <strong>{g.label}</strong>
                  <small>{g.hint}</small>
                </span>
                <Arrow />
              </Link>
            )
          })}
        </div>
      </section>

      {/* ─── WHO WE WORK WITH ─── */}
      <section className="section section-tint">
        <div className="shell">
          <SectionHeader
            kicker="Who we work with"
            title="Built for ambitious small businesses"
            text="We focus on businesses that are ready to grow online and want a reliable, straight-talking technology partner."
          />
          <div className="audience-grid">
            {audiences.map(a => (
              <Link className="audience-card" to={a.to} key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <ul>{a.needs.map(n => <li key={n}>{n}</li>)}</ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES BY BUSINESS LINE ─── */}
      <section className="section shell" id="services">
        <SectionHeader
          kicker="Our services"
          title="Three ways we help your business grow"
          text="Every service has its own page with packages, what's included, what isn't, and starting prices."
        />
        <div className="line-stack">
          {businessLines.map((line, i) => (
            <div className="line-block" key={line.id}>
              <div className="line-head">
                <span className="line-number">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{line.name}</h3>
                  <p>{line.desc}</p>
                </div>
              </div>
              <div className="line-cards">
                {categoriesIn(line).map(c => {
                  const start = startingPackage(c)
                  return (
                    <Link className="service-card" to={`/services/${c.id}`} key={c.id}>
                      <CategoryIcon id={c.id} color={c.color} size={44} />
                      <h4>{c.name}</h4>
                      <p>{c.tagline}</p>
                      <div className="service-card-foot">
                        {start && <span className="price-tag">{formatPrice(start.price, start.unit, true)}</span>}
                        <span className="text-link">Details <Arrow /></span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="center-link">
          <Link className="button button-outline" to="/services">Compare all services <Arrow /></Link>
        </div>
      </section>

      {/* ─── PORTFOLIO (only once real projects exist) ─── */}
      {projects.length > 0 && (
        <section className="section section-tint">
          <div className="shell">
            <SectionHeader kicker="Our work" title="Recent projects" text="The problem, what we built, and the result." />
            <div className="project-grid">
              {projects.slice(0, 3).map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
            <div className="center-link">
              <Link className="button button-outline" to="/work">See all projects <Arrow /></Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY US ─── */}
      <section className={`section ${projects.length > 0 ? '' : 'section-tint'}`}>
        <div className="shell">
          <SectionHeader
            kicker="Why ZotPot"
            title="Working with us is simple and transparent"
            text="We earn trust through how we work: clear scope, clear prices and no lock-in."
          />
          <div className="commit-grid">
            {commitments.map(c => (
              <div className="commit" key={c.title}>
                <span className="commit-icon"><CheckIcon /></span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="section section-dark">
        <div className="shell">
          <SectionHeader kicker="How it works" title="From first message to launch in four clear steps" />
          <ol className="process-grid">
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

      {/* ─── PRICING PREVIEW ─── */}
      <section className="section shell">
        <SectionHeader
          kicker="Popular packages"
          title="Clear starting prices, no surprises"
          text="Every project gets a written quote before work starts. These are our most requested packages."
        />
        <div className="package-grid">
          {featuredPackages.map(({ category, pkg }) => (
            <div key={pkg.name} className="package-wrap">
              <span className="package-cat">{category.short}</span>
              <PackageCard pkg={pkg} category={category} />
            </div>
          ))}
        </div>
        <PricingNote />
        <div className="center-link">
          <Link className="button button-outline" to="/pricing">See all prices <Arrow /></Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS (only once real ones exist) ─── */}
      {site.testimonials.length > 0 && (
        <section className="section section-tint">
          <div className="shell">
            <SectionHeader kicker="Clients" title="What our clients say" />
            <div className="testimonial-grid">
              {site.testimonials.map(t => (
                <figure className="testimonial-card" key={t.name}>
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption><strong>{t.name}</strong><span>{t.role}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ─── */}
      <section className="section shell faq-section">
        <SectionHeader
          kicker="FAQ"
          title="Common questions"
          align="left"
          text={`Can't find your answer? Send us a message and we'll reply within ${site.quoteTurnaround}.`}
        />
        <FaqList faqs={generalFaqs} />
      </section>

      <CtaBand />
    </>
  )
}

export default HomePage
