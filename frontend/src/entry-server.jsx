import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppShell } from './App.jsx'
import { HeadContext } from './components/usePageTitle'

// Build-time only: renders one page to HTML for scripts/prerender.mjs.
export function render(url) {
  let head = {}
  const html = renderToString(
    <HeadContext.Provider value={(info) => { head = info }}>
      <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
        <AppShell />
      </StaticRouter>
    </HeadContext.Provider>,
  )
  return { html, head }
}
