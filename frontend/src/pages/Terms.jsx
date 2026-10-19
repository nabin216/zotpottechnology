import { Link } from 'react-router-dom'
import { usePageTitle } from '../components/usePageTitle'
import { site } from '../data/site'
import { currentCurrency, money } from '../data/currency'

// General terms that match how the business works. Have them reviewed for the
// country you operate in before relying on them.
function TermsPage() {
  usePageTitle('Terms of service')
  const business = site.legal.registeredName || site.name

  return (
    <section className="section shell legal">
      <span className="kicker">Legal</span>
      <h1>Terms of service</h1>
      <p>
        These terms apply to all services provided by {business} ("we", "us"). Each project also has a written
        proposal or quote. If the proposal and these terms differ, the proposal applies.
      </p>

      <h2>1. Quotes and scope</h2>
      <p>
        Prices on our website are starting prices. Before any work begins, we send a written quote that lists the
        deliverables, timeline and price. Work outside that scope is quoted separately and only carried out once you approve it.
      </p>

      <h2>2. Payment</h2>
      <p>
        Unless your proposal says otherwise, projects under {money(2000)} require 50% before work begins
        and 50% on completion. Larger projects are paid in agreed milestones. Monthly services are billed in advance at the
        start of each month. All prices are in {currentCurrency().code}. {site.taxNote}
      </p>

      <h2>3. Third-party costs</h2>
      <p>
        Domains, hosting, software licences, premium plugins, app store accounts, advertising spend and AI usage are paid
        by you directly to the provider and set up in your name wherever possible.
      </p>

      <h2>4. Revisions and approvals</h2>
      <p>
        Each package states the number of revision rounds included. We need your feedback and content within a reasonable
        time to keep to the agreed timeline. Delays in feedback may move the delivery date.
      </p>

      <h2>5. Ownership</h2>
      <p>
        Once full payment is received, you own the final designs, code and content we create for you. We may reuse general
        know-how and non-client-specific components. We will only show your project in our portfolio with your permission.
      </p>

      <h2>6. Support and warranties</h2>
      <p>
        Each package includes the free support period stated in it, covering fixes to defects in our work. Ongoing changes
        and maintenance are available through a care plan or quoted separately. We cannot guarantee search rankings,
        advertising results, sales figures or the behaviour of third-party services.
      </p>

      <h2>7. Security work</h2>
      <p>
        Security testing is only carried out with written authorisation from the system owner and within an agreed scope.
        Our assessments are not a certification of compliance.
      </p>

      <h2>8. Monthly services and cancellation</h2>
      <p>
        Monthly services can be cancelled with 30 days' written notice after any minimum term stated in the plan. Projects
        cancelled part-way are charged for the work completed to date.
      </p>

      <h2>9. Confidentiality</h2>
      <p>We keep your business information confidential and are happy to sign a non-disclosure agreement on request.</p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a> or use our{' '}
        <Link to="/contact">contact form</Link>.
      </p>
    </section>
  )
}

export default TermsPage
