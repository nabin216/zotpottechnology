import { site } from './site'

// Where contact-form submissions go, in order of preference.
export function enquiryDestination() {
  if (site.supabase.url && site.supabase.anonKey) return 'supabase'
  if (site.contactFormEndpoint) return 'endpoint'
  return 'email'
}

// Sends one enquiry. Resolves on success, throws on failure.
export async function sendEnquiry(enquiry) {
  if (enquiryDestination() === 'supabase') {
    const { url, anonKey } = site.supabase
    const headers = {
      apikey: anonKey,
      'Content-Type': 'application/json',
      // Insert only: the website is not allowed to read rows back.
      Prefer: 'return=minimal',
    }
    // Legacy anon keys are JWTs and also go in Authorization;
    // newer sb_publishable_ keys must only be sent as apikey.
    if (anonKey.startsWith('eyJ')) headers.Authorization = `Bearer ${anonKey}`

    const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/contact_messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone || null,
        company: enquiry.company || null,
        service: enquiry.service || null,
        package: enquiry.package || null,
        budget: enquiry.budget || null,
        message: enquiry.message,
        page: window.location.pathname + window.location.search,
      }),
    })
    if (!res.ok) throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`)
    return
  }

  const res = await fetch(site.contactFormEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...enquiry, _subject: `Quote request: ${enquiry.service}` }),
  })
  if (!res.ok) throw new Error(`Submission failed: ${res.status}`)
}
