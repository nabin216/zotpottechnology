import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Arrow, CategoryIcon, CheckIcon } from '../components/ServiceIcons'
import { FaqList, SectionHeader } from '../components/Blocks'
import { usePageTitle } from '../components/usePageTitle'
import { formatPrice } from '../data/currency'
import { site } from '../data/site'
import { sendEnquiry } from '../data/enquiries'
import { trackAuditConversion } from '../data/tracking'

// Landing page for the business automation Google Ads campaign.
// Section ids (#chatbots, #bookings, #invoices, #workflows, #audit) are used
// by the ad sitelinks.

const solutions = [
  {
    id: 'chatbots',
    icon: 'ai-automation',
    color: '#6366f1',
    title: 'AI chatbots that answer enquiries 24/7',
    problem: 'Missed messages are missed customers, especially evenings and weekends.',
    points: [
      'Answers questions on your website, WhatsApp and Instagram',
      'Trained on your services, prices and FAQs',
      'Captures leads and hands hot ones to you',
      'Books calls or appointments directly',
    ],
    from: 599,
  },
  {
    id: 'bookings',
    icon: 'custom-software',
    color: '#ea580c',
    title: 'Bookings and reminders on autopilot',
    problem: 'Back-and-forth scheduling and no-shows cost you hours and money every week.',
    points: [
      'Clients book themselves, 24/7',
      'Automatic email and SMS reminders cut no-shows',
      'Syncs with Google or Outlook calendars',
      'Optional deposits or payments at booking',
    ],
    from: 349,
  },
  {
    id: 'invoices',
    icon: 'data-analytics',
    color: '#0891b2',
    title: 'Invoices sent and payments chased for you',
    problem: 'Chasing unpaid invoices is awkward, slow and easy to forget.',
    points: [
      'Invoices created from jobs, orders or timesheets',
      'Polite automatic payment reminders',
      'Works with Xero, QuickBooks, Stripe and more',
      'Weekly summary of who has and hasn’t paid',
    ],
    from: 349,
  },
  {
    id: 'workflows',
    icon: 'cloud-devops',
    color: '#2563eb',
    title: 'Your tools connected, data entry gone',
    problem: 'Copying details between forms, spreadsheets, email and your CRM wastes your team’s time.',
    points: [
      'New enquiries go straight into your CRM',
      'Automatic follow-up emails and tasks',
      'Reports built and sent on schedule',
      'Built with n8n, Zapier or Make',
    ],
    from: 349,
  },
]

const auditSteps = [
  { title: 'Book your free audit', text: 'Pick what you’d like to automate below. It takes one minute.' },
  { title: '20-minute call', text: 'We look at how you work today and show you 3 tasks we can automate.' },
  { title: 'Fixed, written quote', text: `You get a clear price within ${site.quoteTurnaround}. No obligation.` },
]

const interests = [
  'Enquiries / AI chatbot',
  'Bookings & reminders',
  'Invoices & payments',
  'Connecting my tools',
  'Something else',
]

const faqs = [
  {
    q: 'Is the audit really free?',
    a: 'Yes. It’s a 20-minute video or phone call with no cost and no obligation. You’ll come away with at least three ideas you can use, whether or not you work with us.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'No. We handle the set-up, test everything with you, and give you a short video showing how it works. You just tell us how your business runs today.',
  },
  {
    q: 'What does automation cost to run each month?',
    a: 'Most small businesses spend $10–$100 per month on platform and AI fees, paid directly to the providers. We estimate this before you commit.',
  },
  {
    q: 'Is my customer data safe?',
    a: 'We connect only the tools you approve, give each automation the minimum access it needs, and can require a human to approve sensitive steps. Everything is set up in your own accounts.',
  },
  {
    q: 'How quickly can it be set up?',
    a: 'A single workflow usually takes 3–7 days. An AI chatbot takes 1–2 weeks, including training it on your business.',
  },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function AuditForm() {
  const empty = { name: '', email: '', phone: '', company: '', notes: '', website: '' }
  const [data, setData] = useState(empty)
  const [picked, setPicked] = useState([])
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const change = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }
  const toggle = (item) => setPicked(prev => (prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]))

  const submit = async (e) => {
    e.preventDefault()
    const found = {}
    if (data.name.trim().length < 2) found.name = 'Please enter your name.'
    if (!EMAIL_RE.test(data.email.trim())) found.email = 'Please enter a valid email address.'
    if (data.phone && !/^[+\d][\d\s()-]{6,}$/.test(data.phone.trim())) found.phone = 'Please enter a valid phone number, or leave it blank.'
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`audit-${Object.keys(found)[0]}`)?.focus()
      return
    }
    if (data.website) { // honeypot
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      await sendEnquiry({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone,
        company: data.company,
        service: 'AI Solutions & Business Automation',
        package: 'Free automation audit',
        budget: '',
        message: [
          'Free automation audit request.',
          `Wants to automate: ${picked.length ? picked.join(', ') : 'not specified'}.`,
          data.notes.trim() && `Notes: ${data.notes.trim()}`,
        ].filter(Boolean).join('\n'),
      })
      trackAuditConversion()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="audit-form form-done" role="status">
        <span className="done-icon"><CheckIcon /></span>
        <h3>You’re booked in, {data.name.split(' ')[0] || 'thank you'}!</h3>
        <p>
          We’ll email <strong>{data.email}</strong> within {site.quoteTurnaround} to arrange your free 20-minute audit.
          Please check your spam folder if you don’t see us.
        </p>
        {site.whatsapp && (
          <a className="button button-outline" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
            Prefer WhatsApp? Message us
          </a>
        )}
      </div>
    )
  }

  const field = (name) => ({
    id: `audit-${name}`,
    name,
    value: data[name],
    onChange: change,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `audit-${name}-error` : undefined,
  })
  const error = (name) => errors[name] && <p className="field-error" id={`audit-${name}-error`}>{errors[name]}</p>

  return (
    <form className="audit-form" onSubmit={submit} noValidate>
      <h3>Book your free 20-minute audit</h3>
      <fieldset className="interest-group">
        <legend>What would you like to automate?</legend>
        <div className="interest-chips">
          {interests.map(item => (
            <button
              type="button"
              key={item}
              className="interest-chip"
              aria-pressed={picked.includes(item)}
              onClick={() => toggle(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="audit-name">Your name *</label>
          <input type="text" autoComplete="name" {...field('name')} />
          {error('name')}
        </div>
        <div className="form-group">
          <label htmlFor="audit-email">Email *</label>
          <input type="email" autoComplete="email" {...field('email')} />
          {error('email')}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="audit-phone">Phone / WhatsApp</label>
          <input type="tel" autoComplete="tel" {...field('phone')} />
          {error('phone')}
        </div>
        <div className="form-group">
          <label htmlFor="audit-company">Business name</label>
          <input type="text" autoComplete="organization" {...field('company')} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="audit-notes">Anything we should know? (optional)</label>
        <textarea rows={3} placeholder="e.g. we spend 5 hours a week chasing invoices" {...field('notes')} />
      </div>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="audit-website">Leave this field empty</label>
        <input type="text" id="audit-website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={change} />
      </div>
      <button type="submit" className="button button-primary button-lg button-block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Booking…' : 'Book my free audit'}
      </button>
      {status === 'error' && (
        <p className="form-status is-error" role="alert">
          Sorry, that didn’t send. Please try again or email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
      <p className="form-privacy">Free and no obligation. We only use your details to arrange your audit. <Link to="/privacy">Privacy policy</Link></p>
    </form>
  )
}

function BusinessAutomationPage() {
  usePageTitle(
    'Business Automation for UK Small Businesses',
    'AI chatbots, automated bookings, invoice reminders and connected workflows for UK small businesses. Book a free 20-minute automation audit.',
  )

  return (
    <>
      <section className="page-hero lp-hero">
        <div className="shell lp-hero-grid">
          <div>
            <span className="pill">Business automation for UK small businesses</span>
            <h1>Stop doing admin a computer could do</h1>
            <p className="page-hero-copy">
              We set up AI chatbots, automated bookings, invoice reminders and connected workflows,
              so you and your team get hours back every week and never miss an enquiry.
            </p>
            <div className="hero-actions">
              <a className="button button-primary button-lg" href="#audit">Book a free 20-minute audit <Arrow /></a>
              <a className="button button-outline button-lg" href="#solutions">See what we automate</a>
            </div>
            <ul className="hero-trust">
              <li><CheckIcon />Free, no-obligation audit</li>
              <li><CheckIcon />Fixed, written quotes</li>
              <li><CheckIcon />You own every workflow</li>
            </ul>
          </div>
          <div className="lp-audit-card">
            <h2>In your free audit we’ll:</h2>
            <ul className="check-list">
              <li><CheckIcon />Look at how enquiries, bookings and admin work today</li>
              <li><CheckIcon />Show you 3 tasks we can automate</li>
              <li><CheckIcon />Estimate the hours you’d save each week</li>
              <li><CheckIcon />Give you a fixed price if you want us to build it</li>
            </ul>
            <a className="button button-primary button-block" href="#audit">Book my free audit</a>
          </div>
        </div>
      </section>

      <section className="section shell" id="solutions">
        <SectionHeader
          kicker="What we automate"
          title="Four places small businesses lose the most time"
          text="Start with the one that costs you the most time. Most automations are live within 1–2 weeks."
        />
        <div className="lp-solutions">
          {solutions.map(s => (
            <article className="lp-solution" id={s.id} key={s.id} style={{ '--cat': s.color }}>
              <CategoryIcon id={s.icon} color={s.color} size={52} />
              <h3>{s.title}</h3>
              <p className="lp-problem">{s.problem}</p>
              <ul className="check-list">
                {s.points.map(p => <li key={p}><CheckIcon />{p}</li>)}
              </ul>
              <div className="lp-solution-foot">
                <span className="price-tag">{formatPrice(s.from, '', true)}</span>
                <a className="text-link" href="#audit">Discuss in your audit <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell">
          <SectionHeader kicker="How it works" title="From free audit to hours saved" />
          <ol className="process-grid lp-steps">
            {auditSteps.map((s, i) => (
              <li className="process-step" key={s.title}>
                <span className="process-number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tint" id="audit">
        <div className="shell lp-audit">
          <div>
            <span className="kicker">Free automation audit</span>
            <h2>Find out what you could automate this month</h2>
            <p className="page-hero-copy">
              Tell us a little about your business and we’ll arrange a free 20-minute call at a time that suits you.
            </p>
            <ul className="check-list lp-audit-points">
              <li><CheckIcon />No cost, no obligation, no hard sell</li>
              <li><CheckIcon />Practical ideas you can use even if you don’t hire us</li>
              <li><CheckIcon />Fixed price if you want us to build it</li>
              <li><CheckIcon />Everything set up in your own accounts</li>
            </ul>
          </div>
          <AuditForm />
        </div>
      </section>

      <section className="section shell faq-section">
        <SectionHeader kicker="FAQ" title="Questions about automation" align="left" />
        <FaqList faqs={faqs} />
      </section>

      <section className="cta-band">
        <div className="shell cta-inner">
          <div>
            <h2>Ready to get hours back every week?</h2>
            <p>Book a free 20-minute automation audit. No obligation.</p>
          </div>
          <div className="cta-actions">
            <a className="button button-light" href="#audit">Book my free audit <Arrow /></a>
            <Link className="button button-ghost-light" to="/services/ai-automation">See automation pricing</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default BusinessAutomationPage
