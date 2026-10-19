// Single source of truth for real-world business details.
// Anything left as an empty string (or empty list) is simply not rendered,
// so the live site never shows a placeholder or a dead link.

export const site = {
  name: 'ZotPot Technologies',
  // Public address of the live site, no trailing slash (e.g. 'https://zotpot.co.uk').
  // Used for the sitemap and canonical links. Leave empty until the domain is live.
  url: 'https://zotpot.co.uk',

  email: 'hello@zotpot.co.uk',
  phone: '',
  // Full international number, digits only (e.g. '447700900123').
  // When set, a WhatsApp chat button appears on every page.
  whatsapp: '447707366075',
  address: '',
  hours: 'Monday – Friday, 9:00 – 18:00',

  // The reply/quote promise shown across the site. Only promise what you can
  // keep every time, e.g. 'one business day' or 'two business days'.
  quoteTurnaround: 'one business day',

  // Registered business details, shown in the footer and legal pages once filled.
  legal: {
    registeredName: '',
    companyNumber: '',
    registeredAddress: '',
    taxNumber: '',
    jurisdiction: '',
  },

  // All prices in src/data/services.js are written in US dollars. Visitors
  // whose computer is set to UK time see pounds instead; anyone can switch.
  // GBP prices = USD × rate, rounded so $399 shows as £319 and $1,000 as £800.
  // Adjust the rate to change every GBP price at once.
  currencies: {
    USD: { code: 'USD', symbol: '$', rate: 1 },
    GBP: { code: 'GBP', symbol: '£', rate: 0.8 },
  },
  taxNote: 'Prices exclude applicable taxes.',

  // Fill in full profile URLs to make each icon appear in the footer.
  social: {
    linkedin: '',
    facebook: '',
    instagram: '',
    x: '',
    github: '',
  },

  // Supabase project that stores contact-form messages in the
  // contact_messages table (see supabase/contact_messages.sql).
  // Dashboard → Project Settings → API: copy the Project URL and the
  // anon / publishable key. That key is public by design; the table's
  // security rules only let it ADD messages, never read them.
  supabase: {
    url: import.meta.env?.VITE_SUPABASE_URL || 'https://egfyqdofhcubcfbmodoh.supabase.co',
    anonKey: import.meta.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_O8k2X7AUR9rwM5491qy6KQ_Zwm7aFkf',
  },

  // Alternative to Supabase: an endpoint that receives contact-form submissions as JSON, e.g. a Formspree
  // form URL ('https://formspree.io/f/xxxx'). Empty means the form opens the
  // visitor's email app instead. Can also be set at build time with the
  // VITE_CONTACT_ENDPOINT environment variable.
  contactFormEndpoint: import.meta.env?.VITE_CONTACT_ENDPOINT || '',

  // Add real client testimonials here once you have permission to publish them, e.g.
  // { quote: '...', name: 'Jane Doe', role: 'Owner, Example Bakery' }
  // The testimonials section stays hidden while this list is empty.
  testimonials: [],
}
