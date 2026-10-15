import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { site } from './src/data/site.js'
import { categories } from './src/data/services.js'

// GitHub Pages has no rewrite rules and serves 404.html for unknown paths.
// Shipping a copy of index.html as 404.html lets the SPA router handle deep
// links like /services on refresh or direct visit.
function spaFallback() {
  let outDir
  return {
    name: 'spa-404-fallback',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = path.join(outDir, 'index.html')
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.join(outDir, '404.html'))
      }
    },
  }
}

const routes = [
  '/', '/services', ...categories.map(c => `/services/${c.id}`),
  '/pricing', '/about', '/contact', '/terms', '/privacy',
]

// Structured business data for search engines, plus a sitemap and canonical
// link once site.url is configured in src/data/site.js.
function seo() {
  let outDir
  return {
    name: 'seo',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    transformIndexHtml() {
      const org = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: site.legal.registeredName || site.name,
        description: 'Web development, custom software, AI automation and digital marketing for small businesses.',
        email: site.email,
        ...(site.url && { url: site.url }),
        ...(site.phone && { telephone: site.phone }),
        ...(site.address && { address: site.address }),
        sameAs: Object.values(site.social).filter(Boolean),
      }
      const tags = [{ tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(org), injectTo: 'head' }]
      if (site.url) {
        tags.push({ tag: 'link', attrs: { rel: 'canonical', href: `${site.url}/` }, injectTo: 'head' })
      }
      return tags
    },
    closeBundle() {
      if (!site.url || !fs.existsSync(outDir)) return
      const urls = routes.map(r => `  <url><loc>${site.url}${r}</loc></url>`).join('\n')
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
      fs.appendFileSync(path.join(outDir, 'robots.txt'), `\nSitemap: ${site.url}/sitemap.xml\n`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Project pages are served from /<repo-name>/, so the CI sets VITE_BASE.
  // Custom domains and user pages (<user>.github.io) stay at '/'.
  base: process.env.VITE_BASE || '/',
  plugins: [react(), spaFallback(), seo()],
})
