import { Link } from 'react-router-dom'
import { Arrow, CheckIcon } from '../components/ServiceIcons'
import { CtaBand, SectionHeader } from '../components/Blocks'
import { usePageTitle } from '../components/usePageTitle'
import { commitments, audiences, positioning } from '../data/company'
import { businessLines } from '../data/services'

const values = [
  { title: 'Clarity', text: 'Plain language, published prices and written scopes. You always know what you are paying for.' },
  { title: 'Quality', text: 'Fast, secure, accessible work built with modern tools and tested before it reaches you.' },
  { title: 'Ownership', text: 'Your business, your assets. Everything we create is handed over to you in full.' },
  { title: 'Responsibility', text: 'We handle your data carefully and carry out security work only with written authorisation.' },
]

const promises = [
  'A fixed, written quote before work begins',
  'Regular progress updates and a single point of contact',
  'Your code, designs and accounts in your name',
  'Honest advice, even when it means a smaller project',
]

const wontDo = [
  'Guarantee #1 Google rankings or specific sales numbers',
  'Lock you into contracts or proprietary platforms',
  'Promise certifications or compliance outcomes we cannot deliver',
  'Run any security testing without written permission',
]

function AboutPage() {
  usePageTitle('About us', 'ZotPot Technologies is a technology studio offering web development, software, AI automation and digital marketing.')

  return (
    <>
      <section className="page-hero">
        <div className="shell about-hero">
          <div>
            <span className="kicker">About us</span>
            <h1>A technology partner that speaks your language</h1>
            <p className="page-hero-copy">
              ZotPot Technologies provides {positioning.toLowerCase()}. We help local businesses, online brands,
              startups and established small teams get online, work smarter and reach more customers. Web development,
              software, AI automation and digital marketing come from one team, so you don't have to coordinate
              several different freelancers.
            </p>
          </div>
          <div className="about-mission">
            <h2>Our mission</h2>
            <p>
              To make professional technology affordable and understandable for every business,
              with transparent pricing, honest advice and work that delivers real value.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionHeader kicker="Who we serve" title="The businesses we work best with" />
        <div className="audience-grid">
          {audiences.map(a => (
            <Link className="audience-card" to={a.to} key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <ul>{a.needs.map(n => <li key={n}>{n}</li>)}</ul>
            </Link>
          ))}
        </div>
        <div className="line-summary">
          {businessLines.map((line, i) => (
            <Link to={`/services#${line.id}`} key={line.id}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <strong>{line.name}</strong>
              <small>{line.desc}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <div className="shell">
          <SectionHeader kicker="Our values" title="What guides our work" />
          <div className="factor-grid">
            {values.map(v => (
              <div className="factor" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell promise-grid">
          <div className="promise-card">
            <h2>What we promise</h2>
            <ul className="check-list">
              {promises.map(p => <li key={p}><CheckIcon />{p}</li>)}
            </ul>
          </div>
          <div className="promise-card is-muted">
            <h2>What we will never do</h2>
            <ul className="cross-list">
              {wontDo.map(p => <li key={p}><span aria-hidden="true">✕</span>{p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section shell section-top-0">
        <SectionHeader kicker="Why clients choose us" title="How we work" />
        <div className="commit-grid">
          {commitments.map(c => (
            <div className="commit" key={c.title}>
              <span className="commit-icon"><CheckIcon /></span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
        <div className="center-link">
          <Link className="text-link" to="/services">Explore our services <Arrow /></Link>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

export default AboutPage
