import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckIcon } from '../components/ServiceIcons'
import { usePageTitle } from '../components/usePageTitle'
import { categories, getCategory } from '../data/services'
import { site } from '../data/site'
import { money } from '../data/currency'
import { enquiryDestination, sendEnquiry } from '../data/enquiries'

const budgetRanges = () => [
  `Under ${money(500)}`,
  `${money(500)} – ${money(1500)}`,
  `${money(1500)} – ${money(5000)}`,
  `${money(5000)} – ${money(10000)}`,
  `Over ${money(10000)}`,
  'Not sure yet',
]

const nextSteps = [
  `We reply within ${site.quoteTurnaround}`,
  'A free 20–30 minute call to understand your needs',
  'You receive a written proposal with a fixed price',
  'Work starts only when you approve it',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(data) {
  const errors = {}
  if (data.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Please enter a valid email address, e.g. name@business.com.'
  if (data.phone && !/^[+\d][\d\s()-]{6,}$/.test(data.phone.trim())) errors.phone = 'Please enter a valid phone number, or leave it blank.'
  if (data.message.trim().length < 20) errors.message = 'Please tell us a little more about your project (at least 20 characters).'
  return errors
}

function ContactPage() {
  usePageTitle('Contact', `Get a free consultation and a fixed quote within ${site.quoteTurnaround}.`)
  const [params] = useSearchParams()

  const empty = {
    name: '',
    email: '',
    phone: '',
    company: '',
    service: getCategory(params.get('service'))?.id ?? '',
    package: params.get('package') ?? '',
    budget: '',
    message: '',
    website: '', // honeypot: real visitors never see or fill this
  }
  const [formData, setFormData] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | handoff | error
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const serviceName = getCategory(formData.service)?.name ?? 'Not sure / other'

  // Without a configured form endpoint, hand the message off to the visitor's
  // email client so the form is never a dead end on a live site.
  const handoffToEmail = () => {
    const subject = encodeURIComponent(`Quote request: ${serviceName} (${formData.name})`)
    // null marks an optional field the visitor left blank; '' is a spacer line.
    const lines = [
      `Service: ${serviceName}`,
      formData.package ? `Package: ${formData.package}` : null,
      formData.budget ? `Budget: ${formData.budget}` : null,
      '',
      formData.message,
      '',
      '—',
      formData.name,
      formData.company || null,
      formData.email,
      formData.phone || null,
    ].filter(l => l !== null)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`
    setStatus('handoff')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate(formData)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }
    if (formData.website) {
      setStatus('sent')
      return
    }

    if (enquiryDestination() === 'email') {
      handoffToEmail()
      return
    }

    setStatus('sending')
    try {
      const { website: _honeypot, ...payload } = formData
      await sendEnquiry({ ...payload, name: payload.name.trim(), email: payload.email.trim(), service: serviceName })
      setStatus('sent')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const reset = () => {
    setFormData({ ...empty, service: '', package: '' })
    setStatus('idle')
  }

  const fieldProps = (name) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })
  const fieldError = (name) =>
    errors[name] ? <p className="field-error" id={`${name}-error`}>{errors[name]}</p> : null

  return (
    <section className="contact-section">
      <div className="shell contact-grid">
        <div className="contact-intro">
          <span className="kicker">Contact</span>
          <h1>Let's talk about your project</h1>
          <p className="page-hero-copy">
            Tell us what you need and we'll get back to you within {site.quoteTurnaround} with ideas,
            a recommended approach and a clear price. The consultation is free, with no obligation.
          </p>

          <div className="contact-card">
            <h2>What happens next</h2>
            <ol className="next-steps">
              {nextSteps.map((s, i) => (
                <li key={s}><span>{i + 1}</span>{s}</li>
              ))}
            </ol>
          </div>

          <div className="contact-card contact-direct-card">
            <h2>Prefer to reach us directly?</h2>
            <a href={`mailto:${site.email}`}>✉ {site.email}</a>
            {site.phone && <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>☏ {site.phone}</a>}
            {site.whatsapp && (
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">💬 Chat on WhatsApp</a>
            )}
            {site.hours && <p>{site.hours}</p>}
            {site.address && <p>{site.address}</p>}
          </div>
        </div>

        {status === 'sent' || status === 'handoff' ? (
          <div className="contact-form form-done" role="status" aria-live="polite">
            <span className="done-icon"><CheckIcon /></span>
            {status === 'sent' ? (
              <>
                <h2>Thank you, {formData.name.split(' ')[0] || 'we got it'}!</h2>
                <p>
                  Your request has been received. We'll reply to <strong>{formData.email}</strong> within {site.quoteTurnaround}.
                  If you don't see our reply, please check your spam folder.
                </p>
              </>
            ) : (
              <>
                <h2>Almost done: please press send</h2>
                <p>
                  Your email app should have opened with your request ready to go. Please press <strong>Send</strong> there
                  so it reaches us.
                </p>
                <p>
                  If no email app opened, email us at <a href={`mailto:${site.email}`}>{site.email}</a>.
                </p>
                <button type="button" className="button button-outline" onClick={copyEmail}>
                  {copied ? '✓ Email address copied' : 'Copy our email address'}
                </button>
              </>
            )}
            <div className="done-next">
              <h3>While you wait</h3>
              <Link to="/pricing">Compare our packages and prices</Link>
              <Link to="/services">Browse all services</Link>
            </div>
            <button type="button" className="text-button" onClick={reset}>Send another request</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h2>Request a free quote</h2>
            <p className="form-required-note">Fields marked * are required.</p>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your name *</label>
                <input type="text" autoComplete="name" required {...fieldProps('name')} />
                {fieldError('name')}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" autoComplete="email" required {...fieldProps('email')} />
                {fieldError('email')}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone / WhatsApp</label>
                <input type="tel" autoComplete="tel" {...fieldProps('phone')} />
                {fieldError('phone')}
              </div>
              <div className="form-group">
                <label htmlFor="company">Business name</label>
                <input type="text" autoComplete="organization" {...fieldProps('company')} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="service">Service you're interested in</label>
                <select {...fieldProps('service')}>
                  <option value="">Not sure / other</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="budget">Approximate budget</label>
                <select {...fieldProps('budget')}>
                  <option value="">Select a range</option>
                  {budgetRanges().map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
            {formData.package && (
              <p className="form-package">
                <CheckIcon /> Package: <strong>{formData.package}</strong>
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, package: '' }))}>Remove</button>
              </p>
            )}
            <div className="form-group">
              <label htmlFor="message">Tell us about your project *</label>
              <textarea
                rows={5}
                placeholder="What would you like to build or improve? Any deadline or examples you like?"
                required
                {...fieldProps('message')}
              />
              {fieldError('message')}
            </div>
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
            </div>

            <button type="submit" className="button button-primary button-lg button-block" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send my request'}
            </button>
            {status === 'error' && (
              <p className="form-status is-error" role="alert">
                Sorry, something went wrong sending your request. Please try again or email us at{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            )}
            <p className="form-privacy">
              We only use your details to reply to your enquiry. See our <Link to="/privacy">privacy policy</Link>.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

export default ContactPage
