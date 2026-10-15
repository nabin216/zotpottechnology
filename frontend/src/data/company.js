// Company-wide copy shared by several pages. Keep every statement here
// something the business can actually deliver.
import { site } from './site'

const turnaround = site.quoteTurnaround

export const positioning = 'Digital solutions for ambitious small businesses'

// Who the business is for. Shown on the home and about pages.
export const audiences = [
  {
    title: 'Local businesses',
    text: 'Shops, clinics, trades, restaurants and services that need to be found on Google and take enquiries online.',
    needs: ['Business website', 'Google Business Profile', 'Local SEO'],
    to: '/services/web-development',
  },
  {
    title: 'E-commerce brands',
    text: 'Brands selling online that need a fast, reliable store and marketing that brings in repeat customers.',
    needs: ['Shopify / WooCommerce', 'Ads and email', 'Conversion tracking'],
    to: '/services/web-development',
  },
  {
    title: 'Startups',
    text: 'Founders turning an idea into a product, who need a technical partner to design, build and launch it.',
    needs: ['UI/UX and MVP', 'SaaS or mobile app', 'Cloud deployment'],
    to: '/services/custom-software',
  },
  {
    title: 'Established small businesses',
    text: 'Teams of 5–50 people ready to replace spreadsheets and manual work with better systems.',
    needs: ['Custom software', 'AI automation', 'IT support'],
    to: '/services/ai-automation',
  },
]

export const commitments = [
  {
    title: 'Transparent pricing',
    text: 'Starting prices and package contents are published on our website. You get a written, fixed quote before any work begins.',
  },
  {
    title: 'You own everything',
    text: 'Code, designs, domains and accounts are set up in your name. No lock-in, ever.',
  },
  {
    title: 'Direct access to your team',
    text: 'Talk to the people actually building your project, not a chain of account managers.',
  },
  {
    title: 'Milestone payments',
    text: 'Larger projects are split into milestones, so you pay as you see progress.',
  },
  {
    title: 'Support after launch',
    text: 'Every project includes free post-launch support, with affordable care plans after that.',
  },
  {
    title: 'Honest, ethical work',
    text: 'We tell you when something is not worth the money, and we never promise results we cannot control.',
  },
]

export const processSteps = [
  { title: 'Free consultation', text: 'Tell us about your business and goals on a short call or by message.' },
  { title: 'Written proposal', text: `Within ${turnaround} you receive the scope, timeline and fixed price.` },
  { title: 'Design & build', text: 'We keep you updated at each milestone and you review the work as it progresses.' },
  { title: 'Launch & support', text: 'We launch, train you to manage it, and stay available for support.' },
]

export const generalFaqs = [
  {
    q: 'How much does a website cost?',
    a: 'A starter website begins at $399, a custom business website at $899, and an online store at $1,499. The final price depends on the number of pages, features and content. You get a fixed quote before we start.',
  },
  {
    q: 'What is not included in the package prices?',
    a: 'Third-party costs such as domains, hosting, premium plugins, software licences, advertising spend and AI usage are paid directly to the provider. Each service page lists exactly what is and is not included.',
  },
  {
    q: 'How do payments work?',
    a: 'For most projects we take 50% upfront and 50% on completion. Larger projects are split into milestones. Monthly services such as SEO and IT support are billed at the start of each month.',
  },
  {
    q: 'How many revisions do I get?',
    a: 'Design and website packages include two rounds of revisions at each design stage. Additional rounds or changes outside the agreed scope are quoted before we do them.',
  },
  {
    q: 'Do you work with clients in other countries?',
    a: 'Yes. We work remotely with businesses worldwide, using video calls, email and shared project boards to keep everything clear.',
  },
  {
    q: 'How long will my project take?',
    a: 'Small websites take 1–2 weeks, online stores 3–4 weeks, and custom software or apps 6 weeks or more. Each service page lists typical timelines.',
  },
  {
    q: 'Can you sign an NDA?',
    a: 'Yes. We are happy to sign a non-disclosure agreement before you share any confidential details.',
  },
]
