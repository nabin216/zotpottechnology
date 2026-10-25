// Writes a fully rendered HTML file for every page, so search engines, ad
// platforms and link previews see real content without running JavaScript.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)
const { routes } = await import(pathToFileURL(path.join(root, 'src', 'data', 'routes.js')).href)
const { site } = await import(pathToFileURL(path.join(root, 'src', 'data', 'site.js')).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function page(route) {
  const { html, head } = render(route)
  if (!html.includes('<h1')) throw new Error(`Prerender of ${route} produced no <h1>`)
  let out = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  if (head.title) {
    out = out
      .replace(/<title>.*?<\/title>/s, `<title>${escapeAttr(head.title)}</title>`)
      .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeAttr(head.title)}"`)
  }
  if (head.description) {
    out = out
      .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeAttr(head.description)}"`)
      .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeAttr(head.description)}"`)
  }
  if (site.url) {
    const url = site.url + route
    out = out.replace(/<link rel="canonical" href="[^"]*">/, '')
      .replace('</head>', `  <link rel="canonical" href="${url}">\n    <meta property="og:url" content="${url}">\n  </head>`)
  }
  return out
}

for (const route of routes) {
  const html = page(route)
  if (route === '/') {
    fs.writeFileSync(path.join(dist, 'index.html'), html)
    continue
  }
  // Both /pricing.html and /pricing/index.html, so the clean URL /pricing
  // serves real content on GitHub Pages, Netlify and most static hosts.
  const file = path.join(dist, route.slice(1))
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(`${file}.html`, html)
  fs.mkdirSync(file, { recursive: true })
  fs.writeFileSync(path.join(file, 'index.html'), html)
}

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Prerendered ${routes.length} pages.`)
