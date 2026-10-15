// Supabase Edge Function: emails you each new contact-form enquiry via Resend.
// Called by a Database Webhook on INSERT into public.contact_messages.
//
// Secrets (Dashboard → Edge Functions → Secrets):
//   RESEND_API_KEY  – your Resend API key (re_...)
//   NOTIFY_TO       – where alerts go, e.g. you@gmail.com
//   WEBHOOK_SECRET  – any long random string; the webhook sends it as x-webhook-secret
//   NOTIFY_FROM     – optional. Defaults to Resend's test sender. After verifying
//                     zotpot.co.uk in Resend, use e.g. 'ZotPot Website <website@zotpot.co.uk>'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const NOTIFY_TO = Deno.env.get('NOTIFY_TO') ?? ''
const WEBHOOK_SECRET = Deno.env.get('WEBHOOK_SECRET') ?? ''
const NOTIFY_FROM = Deno.env.get('NOTIFY_FROM') || 'ZotPot Website <onboarding@resend.dev>'

type Enquiry = {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string | null
  package: string | null
  budget: string | null
  message: string
  page: string | null
}

const escape = (value: string) =>
  value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

function buildEmail(m: Enquiry) {
  const rows: [string, string | null][] = [
    ['Name', m.name],
    ['Email', m.email],
    ['Phone / WhatsApp', m.phone],
    ['Business', m.company],
    ['Service', m.service],
    ['Package', m.package],
    ['Budget', m.budget],
    ['Sent from page', m.page],
    ['Received', new Date(m.created_at).toLocaleString('en-GB', { timeZone: 'Europe/London' })],
  ]
  const filled = rows.filter(([, v]) => v)

  const text = [
    'New enquiry from the ZotPot website',
    '',
    ...filled.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    m.message,
    '',
    'Reply to this email to answer the customer directly.',
  ].join('\n')

  const html = `
  <div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;color:#15281e">
    <h2 style="margin:0 0 4px;color:#1a3a28">New enquiry from your website</h2>
    <p style="margin:0 0 18px;color:#4d6156">${escape(m.service ?? 'General enquiry')}${m.package ? ` · ${escape(m.package)}` : ''}</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${filled.map(([k, v]) => `
      <tr>
        <td style="padding:8px 12px;background:#eef2ea;font-weight:600;width:150px;border-bottom:1px solid #fff">${k}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eef2ea">${k === 'Email' ? `<a href="mailto:${escape(v!)}">${escape(v!)}</a>` : escape(v!)}</td>
      </tr>`).join('')}
    </table>
    <h3 style="margin:22px 0 8px;color:#1a3a28">Message</h3>
    <p style="white-space:pre-wrap;margin:0;padding:14px 16px;background:#fbfbf6;border-left:3px solid #2c7a4b;font-size:15px">${escape(m.message)}</p>
    <p style="margin-top:22px;color:#7b8b81;font-size:13px">Press <b>Reply</b> to answer ${escape(m.name)} directly.</p>
  </div>`

  return { text, html }
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  // Only the database webhook knows this secret, so nobody else can trigger emails.
  if (!WEBHOOK_SECRET || req.headers.get('x-webhook-secret') !== WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }
  if (!RESEND_API_KEY || !NOTIFY_TO) {
    console.error('Missing RESEND_API_KEY or NOTIFY_TO secret')
    return new Response('Not configured', { status: 500 })
  }

  const payload = await req.json()
  if (payload.type !== 'INSERT' || payload.table !== 'contact_messages' || !payload.record) {
    return new Response('Ignored', { status: 200 })
  }

  const enquiry = payload.record as Enquiry
  const { text, html } = buildEmail(enquiry)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: NOTIFY_TO.split(',').map(s => s.trim()),
      reply_to: enquiry.email,
      subject: `New enquiry: ${enquiry.service ?? 'General'} – ${enquiry.name}`,
      text,
      html,
    }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return new Response('Email failed', { status: 502 })
  }
  return new Response('Sent', { status: 200 })
})
