import { usePageTitle } from '../components/usePageTitle'
import { site } from '../data/site'
import { enquiryDestination } from '../data/enquiries'

// Keep this accurate: if you add analytics, chat widgets, embedded maps or a
// form provider, update the "Services we use" and "Cookies" sections, and add
// a cookie consent banner where the law requires one.
function PrivacyPage() {
  usePageTitle('Privacy policy')
  const { legal } = site
  const controller = legal.registeredName || site.name

  return (
    <section className="section shell legal">
      <span className="kicker">Legal</span>
      <h1>Privacy policy</h1>
      <p>
        This policy explains how {controller}
        {legal.registeredAddress && <> ({legal.registeredAddress})</>} collects and uses personal information
        through this website. For any privacy question, email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Information we collect</h2>
      <p>
        We only collect what you choose to send us. When you request a quote or contact us, that is your name, email
        address, and optionally your phone number, business name, budget range and project details.
      </p>

      <h2>How we use it</h2>
      <p>
        We use your information to reply to your enquiry, prepare a proposal and, if you become a client, deliver our
        services. Our lawful basis is your request to us and our legitimate interest in responding to it. We do not sell
        or rent personal information, and we do not add you to marketing lists without your consent.
      </p>

      <h2>Services we use</h2>
      <p>
        {{
          supabase: 'Contact form submissions are stored securely in a database hosted by Supabase, which processes them on our behalf. Only our team can read them.',
          endpoint: 'Contact form submissions are delivered to us by a form-handling provider, which processes them on our behalf.',
          email: 'The contact form opens your own email app, and your message is sent to us by email.',
        }[enquiryDestination()]}{' '}
        Our email provider stores messages we receive. These providers only process data on our behalf.
      </p>

      <h2>Cookies and tracking</h2>
      <p>
        This website does not use cookies, analytics or advertising trackers, and our fonts are hosted on our own site. If you choose a currency for prices, that choice is remembered on your own device only.
        If we add analytics or similar tools in the future, we will update this policy and ask for your consent where required.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiries that do not lead to a project are deleted within 12 months. Client records are kept for as long as
        needed to provide our services and meet legal and accounting obligations.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct, export or delete your personal information, or object to how we use it, by
        emailing <a href={`mailto:${site.email}`}>{site.email}</a>. You also have the right to complain to your local
        data protection authority.
      </p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. The latest version will always be on this page.</p>
    </section>
  )
}

export default PrivacyPage
