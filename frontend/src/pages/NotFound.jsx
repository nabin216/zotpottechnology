import { Link } from 'react-router-dom'
import { usePageTitle } from '../components/usePageTitle'

function NotFoundPage() {
  usePageTitle('Page not found')

  return (
    <section className="section shell not-found">
      <span className="kicker">404</span>
      <h1>We couldn't find that page</h1>
      <p>The link may be broken or the page may have moved.</p>
      <div className="hero-actions">
        <Link className="button button-primary" to="/">Go to homepage</Link>
        <Link className="button button-outline" to="/services">Browse services</Link>
      </div>
    </section>
  )
}

export default NotFoundPage
