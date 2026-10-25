import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'

const BASE = 'ZotPot Technologies'
const DEFAULT_TITLE = `${BASE} | Web Development, Software & Digital Marketing`

// During build-time prerendering, pages report their title and description
// through this callback so they can be written into each page's HTML <head>.
export const HeadContext = createContext(null)

export function fullTitle(title) {
  return title ? `${title} | ${BASE}` : DEFAULT_TITLE
}

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/)
    el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

// Sets the document title, description, social preview tags and (once
// site.url is configured) the canonical link for the current page.
export function usePageTitle(title, description) {
  const { pathname } = useLocation()
  const reportHead = useContext(HeadContext)
  reportHead?.({ title: fullTitle(title), description })

  useEffect(() => {
    const text = fullTitle(title)
    document.title = text
    setMeta('meta[property="og:title"]', 'content', text)
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }
    if (site.url) {
      const url = site.url + (pathname === '/' ? '/' : pathname)
      setMeta('link[rel="canonical"]', 'href', url)
      setMeta('meta[property="og:url"]', 'content', url)
    }
  }, [title, description, pathname])
}
