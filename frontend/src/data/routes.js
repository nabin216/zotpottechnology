import { categories } from './services.js'

// Every public page. Used for the sitemap and for build-time prerendering.
export const routes = [
  '/',
  '/services',
  ...categories.map(c => `/services/${c.id}`),
  '/pricing',
  '/business-automation',
  '/about',
  '/contact',
  '/terms',
  '/privacy',
]
