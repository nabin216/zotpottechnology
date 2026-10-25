import { Link } from 'react-router-dom'
import { Arrow, CategoryIcon, CheckIcon } from '../components/ServiceIcons'
import { PackageCard, FaqList, CtaBand, SectionHeader, PricingNote, ProjectCard, SwipeHint } from '../components/Blocks'
import { usePageTitle } from '../components/usePageTitle'
import { AutomationFlow, FlowIcon, LineArt, TiltStage } from '../components/Visuals'
import { businessLines, categoriesIn, getCategory, startingPackage } from '../data/services'
import { platforms } from '../data/platforms'
import { projects } from '../data/portfolio'
import { site } from '../data/site'
import { formatPrice } from '../data/currency'
import { generalFaqs, commitments, processSteps, audiences, positioning } from '../data/company'

// Goal-based entry points: visitors pick what they want to achieve,
// not which service name they think they need.
const goals = [
  { label: 'I want to automate tasks', hint: 'AI chatbots, booking, workflows', cat: 'ai-automation' },
  { label: 'I need a new website', hint: 'WordPress, Wix, custom', cat: 'web-development' },
  { label: 'I need more customers', hint: 'SEO, ads, social media', cat: 'digital-marketing' },
  { label: 'I want to sell online', hint: 'Shopify, WooCommerce', cat: 'web-development' },
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

// An example of the kind of booking assistant we build, not a client's chat.
const demoChat = [
  { from: 'customer', text: 'Hi, can I book a check-up this week?', time: '21:47' },
  { from: 'bot', text: 'Of course! We have Tue 10:30, Wed 14:00 or Thu 09:15. Which suits you?', time: '21:47' },
  { from: 'customer', text: 'Tuesday 10:30 please', time: '21:48' },
  { from: 'bot', text: 'Booked ✅ Tue 10:30 with Dr Patel. I’ll send a reminder the day before.', time: '21:48' },
]

function HeroVisual() {
  return (
    <TiltStage className="hero-visual">
      <span className="hero-orb hero-orb-a" aria-hidden="true" />
      <span className="hero-orb hero-orb-b" aria-hidden="true" />
      <div className="chat-demo" aria-hidden="true">
        <div className="chat-head">
          <span className="chat-avatar">Z</span>
          <div>
            <strong>Booking assistant</strong>
            <small>Online · replies instantly</small>
          </div>
          <span className="chat-label">Example</span>
        </div>
        <div className="chat-body">
          {demoChat.map((m, i) => (
            <p className={`chat-msg chat-${m.from}`} style={{ '--i': i }} key={m.text}>
              {m.text}
              <time>{m.time}</time>
            </p>
          ))}
        </div>
        <div className="chat-input"><span>Type a message</span><i /></div>
      </div>
      <div className="float-card float-a" aria-hidden="true">
        <CategoryIcon id="ai-automation" color="#6366f1" size={36} />
        <div><strong>Booked after hours</strong><small>No staff needed</small></div>
      </div>
      <div className="float-card float-c" aria-hidden="true">
        <CheckIcon />
        <div><strong>Reminder sent</strong><small>Fewer no-shows</small></div>
      </div>
    </TiltStage>
  )
}

// Icon for each "why us" commitment, in the same order as company.js.
const commitIcons = ['tag', 'key', 'message', 'calendar', 'life', 'shield']
const processIcons = ['message', 'tag', 'spark', 'star']

function HomePage() {
  usePageTitle(null, 'AI automation, websites and digital marketing for UK small businesses. Chatbots, online booking and connected workflows, with published prices and free, fixed quotes.')

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-content">
            <span className="pill">{positioning}</span>
            <h1>
              Let AI handle the admin. <em>You grow the business.</em>
            </h1>
            <p className="hero-copy">
              We build AI chatbots, online booking, automatic reminders and connected workflows for UK
              small businesses, plus the websites and marketing that bring customers in.
              Published prices, one team for all of it.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary button-lg" to="/business-automation">Book a free automation audit <Arrow /></Link>
              <Link className="button button-outline button-lg" to="/contact">Get a free quote</Link>
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

      {/* ─── AUTOMATION AT A GLANCE ─── */}
      <section className="section shell flow-section">
        <SectionHeader
          kicker="Automation at a glance"
          title="One enquiry. Zero admin."
        />
        <AutomationFlow />
        <div className="center-link">
          <Link className="button button-primary" to="/business-automation">See what we can automate for you <Arrow /></Link>
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
          />
          <div className="audience-grid">
            {audiences.map(a => {
              const c = getCategory(a.to.split('/').pop())
              return (
                <Link className="audience-card audience-compact" to={a.to} key={a.title}>
                  <CategoryIcon id={c.id} color={c.color} size={46} />
                  <h3>{a.title}</h3>
                  <ul>{a.needs.map(n => <li key={n}>{n}</li>)}</ul>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── SERVICES BY BUSINESS LINE ─── */}
      <section className="section shell" id="services">
        <SectionHeader
          kicker="Our services"
          title="Three ways we help your business grow"        />
        <div className="line-stack">
          {businessLines.map((line, i) => (
            <div className="line-block" key={line.id}>
              <div className="line-head line-head-art">
                <span className="line-number">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{line.name}</h3>
                  <p>{line.desc}</p>
                </div>
                <LineArt id={line.id} />
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
          />
          <div className="commit-grid commit-compact">
            {commitments.map((c, i) => (
              <div className="commit" key={c.title} title={c.text}>
                <span className="commit-icon"><FlowIcon name={commitIcons[i]} /></span>
                <h3>{c.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="section section-dark">
        <div className="shell">
          <SectionHeader kicker="How it works" title="From first message to launch in four clear steps" />
          <ol className="process-grid process-icons">
            {processSteps.map((p, i) => (
              <li className="process-step" key={p.title}>
                <span className="process-icon"><FlowIcon name={processIcons[i]} /></span>
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
        <SwipeHint />
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
