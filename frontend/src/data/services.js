// Every service, package and price on the site comes from this file.
// Edit prices here and every page (home, services, detail pages, pricing,
// contact form) updates automatically.
//
// Package fields:
//   price  – a number, or null for "Custom quote"
//   from   – true shows "From" before the price
//   unit   – '' for one-time, or e.g. '/month', '/hour'
//   popular – highlights the package as "Most popular"

export const categories = [
  {
    id: 'web-development',
    name: 'Website Design & Development',
    short: 'Web Development',
    color: '#0d9488',
    tagline: 'Fast, modern websites that win customers.',
    summary:
      'Business websites, online stores and web applications built on WordPress, Shopify, Wix, React or Next.js. Designed to look professional, load quickly and turn visitors into enquiries.',
    offerings: [
      'Business and corporate websites',
      'E-commerce websites and online stores',
      'WordPress website development',
      'Shopify store setup and customisation',
      'Wix and Webflow websites',
      'Landing pages and portfolio websites',
      'React and Next.js web applications',
      'Website redesign and speed optimisation',
      'Website maintenance and technical support',
    ],
    tools: ['WordPress', 'Shopify', 'Wix', 'WooCommerce', 'Webflow', 'React', 'Next.js', 'Node.js'],
    packages: [
      {
        name: 'Starter Website',
        price: 399,
        from: true,
        unit: '',
        description: 'A clean, professional site for a small business or personal brand.',
        features: [
          'Up to 5 pages',
          'WordPress or Wix',
          'Mobile-friendly design',
          'Contact form and Google Maps',
          'Basic on-page SEO',
          '1 round of revisions',
          'Launched on your domain',
          '14 days of free support after launch',
        ],
        timeline: '7–10 days',
      },
      {
        name: 'Business Website',
        price: 899,
        from: true,
        unit: '',
        popular: true,
        description: 'A custom-designed site that you can update yourself.',
        features: [
          'Up to 12 pages',
          'Custom design for your brand',
          'Blog or news section you can edit',
          'Speed and SEO optimisation',
          'Google Analytics set up',
          '2 rounds of design revisions',
          'Launched on your domain with SSL',
          '30 days of free support after launch',
        ],
        timeline: '2–3 weeks',
      },
      {
        name: 'E-commerce Store',
        price: 1499,
        from: true,
        unit: '',
        description: 'A complete online store, ready to take orders.',
        features: [
          'Shopify or WooCommerce',
          'Up to 50 products uploaded',
          'Payment gateway and shipping set up',
          'Discount codes and order emails',
          'Training on managing your store',
          '2 rounds of design revisions',
          '30 days of free support after launch',
        ],
        timeline: '3–4 weeks',
      },
    ],
    addons: [
      { name: 'Single landing page', price: 249, from: true, unit: '' },
      { name: 'Website redesign', price: 599, from: true, unit: '' },
      { name: 'Speed optimisation', price: 149, from: false, unit: '' },
      { name: 'Custom React / Next.js web app', price: 2999, from: true, unit: '' },
      { name: 'Website care plan (updates, backups, fixes)', price: 49, from: true, unit: '/month' },
    ],
    exclusions: [
      'Domain name and hosting fees',
      'Premium themes, plugins or apps (quoted before purchase)',
      'Copywriting, photography and product data entry beyond the package, unless added',
      'New features or pages after sign-off (quoted separately)',
    ],
    ongoingCosts: [
      'Domain: about $10–$20 per year',
      'Hosting: about $5–$30 per month (Shopify plans from about $39 per month)',
      'Optional care plan from $49 per month for updates, backups and fixes',
    ],
    faqs: [
      {
        q: 'Which platform should I choose: WordPress, Shopify, Wix or custom?',
        a: 'It depends on what you sell and who will update the site. Shopify suits most online stores, WordPress suits content-rich business sites, Wix is the easiest to edit yourself, and React or Next.js suits custom web applications. We recommend one on the free consultation call and explain why.',
      },
      {
        q: 'Do I need to provide the content?',
        a: 'You provide your business details, logo and photos if you have them. We can write or polish page copy and source licensed stock images. That can be added to any package.',
      },
      {
        q: 'Are hosting and the domain included?',
        a: 'Domain and hosting are billed by the provider in your name, so you always own them. We help you choose and set them up. Typical cost is $5–$30 per month, depending on the platform.',
      },
    ],
  },
  {
    id: 'ui-ux-branding',
    name: 'UI/UX Design & Branding',
    short: 'UI/UX & Branding',
    color: '#db2777',
    tagline: 'Designs people understand and remember.',
    summary:
      'Logos, brand identity and user-friendly interfaces for websites, apps and SaaS products. Wireframes and clickable prototypes in Figma, so you can see the product before a line of code is written.',
    offerings: [
      'Website and mobile app UI/UX design',
      'Figma wireframes and interactive prototypes',
      'SaaS dashboards and admin panels',
      'User journey and usability improvements',
      'Design systems and component libraries',
      'Logo design and brand identity',
      'Business cards, brochures and digital assets',
    ],
    tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Canva'],
    packages: [
      {
        name: 'Logo & Brand Starter',
        price: 199,
        from: false,
        unit: '',
        description: 'A distinctive logo and the basics of a consistent brand.',
        features: [
          '3 initial logo concepts',
          '2 rounds of revisions',
          'Colour palette and fonts',
          'All file formats (PNG, SVG, PDF)',
          'One-page brand guide',
        ],
        timeline: '5–7 days',
      },
      {
        name: 'Website UI Design',
        price: 499,
        from: true,
        unit: '',
        popular: true,
        description: 'A polished Figma design for your website, ready for development.',
        features: [
          'Up to 6 page designs',
          'Desktop and mobile layouts',
          'Clickable prototype',
          '2 rounds of revisions',
          'Developer-ready Figma file',
        ],
        timeline: '1–2 weeks',
      },
      {
        name: 'App / SaaS UI Design',
        price: 1199,
        from: true,
        unit: '',
        description: 'Complete UX and UI for a mobile app, dashboard or SaaS product.',
        features: [
          'User flows and wireframes',
          'Up to 20 screens',
          'Interactive prototype',
          'Reusable component library',
          'Handover session with your developers',
        ],
        timeline: '2–4 weeks',
      },
    ],
    addons: [
      { name: 'Business card design', price: 49, from: false, unit: '' },
      { name: 'Brochure or flyer design', price: 99, from: true, unit: '' },
      { name: 'Social media brand kit', price: 99, from: false, unit: '' },
      { name: 'UX review of an existing website or app', price: 249, from: true, unit: '' },
    ],
    exclusions: [
      'Printing costs for business cards and brochures',
      'Paid stock images or fonts (quoted before purchase)',
      'Trademark searches or registration',
      'Development of the designs (available as a separate package)',
    ],
    ongoingCosts: [
      'None. Designs and source files are yours once paid',
    ],
    faqs: [
      {
        q: 'Will I own the logo and designs?',
        a: 'Yes. Once the final invoice is paid, full ownership and all source files are yours.',
      },
      {
        q: 'Can you also build what you design?',
        a: 'Yes. Our development team can build the website or app from the approved designs, and we offer a combined price when you book both.',
      },
    ],
  },
  {
    id: 'custom-software',
    name: 'Custom Software & Application Development',
    short: 'Custom Software',
    color: '#ea580c',
    tagline: 'Software shaped around how your business works.',
    summary:
      'CRMs, booking systems, inventory tools, HR platforms and SaaS products, built to replace spreadsheets and manual work with one reliable system.',
    offerings: [
      'CRM and customer management systems',
      'Inventory and stock management software',
      'Booking and appointment systems',
      'Business management platforms',
      'HR, attendance and staff management systems',
      'API development and third-party integrations',
      'SaaS product development',
      'Internal business portals and workflow systems',
    ],
    tools: ['React', 'Next.js', 'Node.js', 'Python', 'Laravel', 'PostgreSQL', 'MySQL'],
    packages: [
      {
        name: 'Booking / Appointment System',
        price: 1999,
        from: true,
        unit: '',
        description: 'Online booking with a calendar, reminders and an admin panel.',
        features: [
          'Customer booking page',
          'Staff and service management',
          'Email or SMS reminders',
          'Online payments (optional)',
          'Admin dashboard',
        ],
        timeline: '3–5 weeks',
      },
      {
        name: 'Business Management System',
        price: 3999,
        from: true,
        unit: '',
        popular: true,
        description: 'A custom CRM, inventory or HR system for your team.',
        features: [
          'Requirements workshop',
          'User roles and permissions',
          'Reports and data export',
          'Integration with existing tools',
          '60 days of free support after launch',
        ],
        timeline: '6–10 weeks',
      },
      {
        name: 'SaaS MVP',
        price: 7999,
        from: true,
        unit: '',
        description: 'Take your software idea from concept to first paying customers.',
        features: [
          'Product scoping and architecture',
          'User accounts and subscriptions',
          'Core features for launch',
          'Cloud deployment',
          'Analytics and error tracking',
        ],
        timeline: '8–14 weeks',
      },
    ],
    addons: [
      { name: 'Third-party API integration', price: 399, from: true, unit: '' },
      { name: 'Ongoing development retainer', price: 25, from: true, unit: '/hour' },
      { name: 'Software maintenance plan', price: 149, from: true, unit: '/month' },
    ],
    exclusions: [
      'Hosting, database and third-party API fees',
      'Features outside the agreed written scope',
      'Data migration from old systems, unless added to the scope',
    ],
    ongoingCosts: [
      'Cloud hosting: typically $20–$200 per month, depending on usage',
      'Optional maintenance plan from $149 per month',
    ],
    faqs: [
      {
        q: 'How do you give a fixed price for custom software?',
        a: 'We start with a free discovery call, then send a written scope that lists each feature, the timeline and the price. You approve the scope before any work starts, and payment is split into milestones.',
      },
      {
        q: 'Who owns the source code?',
        a: 'You do. The code is delivered to your own repository and you are free to host, modify or hand it to another team.',
      },
    ],
  },
  {
    id: 'ai-automation',
    name: 'AI Solutions & Business Automation',
    short: 'AI & Automation',
    color: '#6366f1',
    tagline: 'Let software handle the repetitive work.',
    summary:
      'AI chatbots, document processing and automated workflows that save your team hours every week, connected safely to the business tools you already use.',
    offerings: [
      'AI chatbot development for websites',
      'Customer support automation',
      'AI-powered document processing',
      'Lead generation and lead qualification workflows',
      'Automated email and customer follow-ups',
      'AI agents connected to approved business tools',
      'n8n workflow automation',
      'AI API integration using commercial AI models',
      'Automated reporting and data extraction',
      'Social media publishing workflows',
    ],
    tools: ['n8n', 'Zapier', 'Make', 'OpenAI', 'Anthropic Claude', 'Google Gemini', 'Python'],
    packages: [
      {
        name: 'Workflow Automation',
        price: 349,
        from: true,
        unit: '',
        description: 'Automate one repetitive business process end to end.',
        features: [
          'Process mapping call',
          'One automated workflow (n8n, Zapier or Make)',
          'Up to 4 connected apps',
          'Error alerts',
          'Short handover video',
        ],
        timeline: '3–7 days',
      },
      {
        name: 'AI Website Chatbot',
        price: 599,
        from: true,
        unit: '',
        popular: true,
        description: 'A chatbot trained on your business information, answering customers 24/7.',
        features: [
          'Trained on your website, FAQs and documents',
          'Lead capture and hand-off to your team',
          'Branded chat widget',
          'Conversation logs',
          'Monthly tuning for the first 30 days',
        ],
        timeline: '1–2 weeks',
      },
      {
        name: 'Custom AI Solution',
        price: 1499,
        from: true,
        unit: '',
        description: 'AI agents and document processing built into your operations.',
        features: [
          'Discovery and data review',
          'Document extraction or AI agent workflow',
          'Integration with your business tools',
          'Human approval steps where needed',
          'Access and permission controls',
        ],
        timeline: '2–6 weeks',
      },
    ],
    addons: [
      { name: 'Additional workflow', price: 199, from: true, unit: '' },
      { name: 'Automation support and monitoring', price: 79, from: true, unit: '/month' },
      { name: 'Automated weekly or monthly reports', price: 299, from: true, unit: '' },
    ],
    exclusions: [
      'AI model usage and automation platform subscriptions',
      'Building or cleaning large data sets, unless added to the scope',
      'Changes to the tools being connected (e.g. CRM setup), unless added',
    ],
    ongoingCosts: [
      'AI model usage (e.g. OpenAI or Anthropic API), billed by the provider to your account',
      'Automation platform plan (n8n, Zapier or Make): free to about $50 per month for most small businesses',
      'Optional monitoring from $79 per month',
    ],
    faqs: [
      {
        q: 'Is my business data safe with AI tools?',
        a: 'We use commercial AI providers with business data terms, connect only the tools you approve, and give each automation the minimum access it needs. Sensitive steps can require a human to approve them.',
      },
      {
        q: 'What are the running costs after setup?',
        a: 'Most small businesses spend $10–$100 per month on AI and automation platform fees, depending on volume. We estimate this before you commit.',
      },
    ],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Services',
    short: 'Cybersecurity',
    color: '#e11d48',
    tagline: 'Find and fix weaknesses before attackers do.',
    summary:
      'Practical security reviews, configuration checks, monitoring and staff training for small and growing businesses. Every finding comes with clear guidance on how to fix it.',
    offerings: [
      'Basic security assessments',
      'Website and web application security reviews',
      'Vulnerability scanning and remediation guidance',
      'Security configuration reviews',
      'Firewall configuration and rule reviews',
      'Network security assessments',
      'SIEM deployment and log monitoring',
      'Splunk dashboard and alert configuration',
      'Incident response preparation',
      'Security policies and risk assessments',
      'Cloud security configuration reviews',
      'Security awareness training',
    ],
    tools: ['Splunk', 'Wazuh', 'OWASP ZAP', 'Nessus', 'Burp Suite', 'AWS', 'Azure'],
    packages: [
      {
        name: 'Website Security Check',
        price: 299,
        from: false,
        unit: '',
        description: 'A non-intrusive health check of your website and domain.',
        features: [
          'SSL, headers and DNS configuration',
          'Outdated software and plugin check',
          'Automated vulnerability scan',
          'Plain-English report',
          'Prioritised fix list',
        ],
        timeline: '3–5 days',
      },
      {
        name: 'Security Assessment',
        price: 999,
        from: true,
        unit: '',
        popular: true,
        description: 'A deeper review of your web app, cloud and network setup.',
        features: [
          'Web application security review',
          'Cloud and firewall configuration review',
          'Vulnerability scanning',
          'Risk rating for each finding',
          'Remediation guidance and review call',
        ],
        timeline: '1–2 weeks',
      },
      {
        name: 'Monitoring & SIEM Setup',
        price: 1999,
        from: true,
        unit: '',
        description: 'Centralised logging, dashboards and alerts for your systems.',
        features: [
          'SIEM deployment (Splunk or Wazuh)',
          'Log sources connected',
          'Dashboards and alert rules',
          'Incident response playbook',
          'Team training session',
        ],
        timeline: '2–4 weeks',
      },
    ],
    addons: [
      { name: 'Security awareness training (per session)', price: 299, from: true, unit: '' },
      { name: 'Security policies and risk assessment', price: 499, from: true, unit: '' },
      { name: 'Penetration testing (authorised scope only)', price: null, from: false, unit: '' },
    ],
    notes: [
      'Penetration testing and any intrusive testing are carried out only with explicit written authorisation from the system owner and an agreed scope.',
      'Our assessments help you prepare for standards such as ISO 27001 or SOC 2, but they are not a certification. We never promise compliance outcomes.',
    ],
    exclusions: [
      'Fixing the issues found (we provide guidance, and can quote for fixes separately)',
      'Penetration testing, unless separately authorised and scoped in writing',
      'Compliance certification or audit sign-off',
      'Security tool licences (e.g. Splunk)',
    ],
    ongoingCosts: [
      'SIEM or monitoring tool licences, if a paid tool is chosen',
      'Optional periodic re-checks, quoted on request',
    ],
    faqs: [
      {
        q: 'Will a security check affect my live website?',
        a: 'The Website Security Check is non-intrusive and safe to run on a live site. Deeper testing is scheduled with you in advance and only within the scope you authorise in writing.',
      },
      {
        q: 'Do you provide a certificate after the assessment?',
        a: 'We provide a detailed report and a summary letter describing what was tested. We are not a certification body, so we do not issue compliance certificates.',
      },
    ],
  },
  {
    id: 'cloud-devops',
    name: 'Cloud, DevOps & Deployment',
    short: 'Cloud & DevOps',
    color: '#2563eb',
    tagline: 'Reliable hosting, deployment and backups.',
    summary:
      'Cloud setup, server configuration, Docker, CI/CD pipelines and monitoring, so your website or application stays fast, secure and backed up.',
    offerings: [
      'AWS and Azure setup assistance',
      'Cloud migration planning and implementation',
      'VPS and Linux server configuration',
      'Website and application deployment',
      'Docker containerisation',
      'CI/CD pipeline setup',
      'GitHub Actions automation',
      'Domain, DNS and SSL configuration',
      'Server monitoring, backup and recovery',
      'Deployment troubleshooting and optimisation',
    ],
    tools: ['AWS', 'Azure', 'DigitalOcean', 'Docker', 'GitHub Actions', 'Linux', 'Cloudflare', 'Vercel'],
    packages: [
      {
        name: 'Deployment & Setup',
        price: 249,
        from: true,
        unit: '',
        description: 'Get your website or app live on reliable hosting.',
        features: [
          'Server or hosting setup',
          'Domain, DNS and SSL',
          'Application deployment',
          'Basic firewall hardening',
          'Automated backups',
        ],
        timeline: '2–4 days',
      },
      {
        name: 'CI/CD & Docker',
        price: 699,
        from: true,
        unit: '',
        popular: true,
        description: 'Automated, repeatable deployments for your team.',
        features: [
          'Docker containerisation',
          'GitHub Actions pipeline',
          'Staging and production environments',
          'Automated tests on every change',
          'Rollback process documented',
        ],
        timeline: '1–2 weeks',
      },
      {
        name: 'Cloud Migration',
        price: 1999,
        from: true,
        unit: '',
        description: 'Move to AWS or Azure with a clear plan and minimal downtime.',
        features: [
          'Current setup review',
          'Migration plan and cost estimate',
          'Migration and testing',
          'Monitoring and alerts',
          'Handover documentation',
        ],
        timeline: '2–6 weeks',
      },
    ],
    addons: [
      { name: 'Server monitoring and backups', price: 99, from: true, unit: '/month' },
      { name: 'Deployment troubleshooting', price: 35, from: false, unit: '/hour' },
      { name: 'Cloud cost review', price: 199, from: true, unit: '' },
    ],
    exclusions: [
      'Cloud and hosting provider fees',
      'Application code changes needed for migration, unless added',
      'Out-of-hours emergency support, unless on a plan',
    ],
    ongoingCosts: [
      'Cloud or hosting fees, billed by the provider directly to your account',
      'Optional monitoring and backups from $99 per month',
    ],
    faqs: [
      {
        q: 'Which cloud provider do you recommend?',
        a: 'For most small websites a VPS (such as DigitalOcean) or a managed platform (such as Vercel) is the most cost-effective option. AWS and Azure make sense for larger or regulated workloads. We recommend based on your traffic, budget and team.',
      },
      {
        q: 'Will my website go offline during migration?',
        a: 'We plan migrations to keep downtime to a minimum, usually a few minutes during a low-traffic window agreed with you.',
      },
    ],
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing & Online Growth',
    short: 'Digital Marketing',
    color: '#d97706',
    tagline: 'Get found online and turn clicks into customers.',
    summary:
      'SEO, Google Business Profile, social media, paid ads and email marketing, run with clear monthly reporting so you know exactly what your budget is achieving.',
    offerings: [
      'Search engine optimisation (SEO)',
      'Local SEO and Google Business Profile support',
      'Technical SEO audits',
      'Google Analytics and conversion tracking',
      'Social media management',
      'Facebook and Instagram advertising',
      'Google Ads campaign management',
      'Content strategy and blog publishing',
      'Email marketing automation',
      'Landing page conversion optimisation',
    ],
    tools: ['Google Ads', 'Meta Ads', 'Google Analytics', 'Google Search Console', 'Mailchimp', 'Semrush'],
    packages: [
      {
        name: 'SEO Starter',
        price: 299,
        from: false,
        unit: '/month',
        description: 'Steady growth in Google rankings for a local or small business.',
        features: [
          'Technical SEO fixes',
          'Google Business Profile optimisation',
          'Up to 10 target keywords',
          '2 blog posts per month',
          'Monthly ranking report',
        ],
        timeline: 'Monthly, 3-month minimum',
      },
      {
        name: 'Growth',
        price: 599,
        from: false,
        unit: '/month',
        popular: true,
        description: 'SEO plus active social media to build your audience.',
        features: [
          'Everything in SEO Starter',
          'Up to 25 target keywords',
          'Social media management (2 platforms)',
          '12 social posts per month',
          'Monthly strategy call',
        ],
        timeline: 'Monthly, 3-month minimum',
      },
      {
        name: 'Performance',
        price: 999,
        from: false,
        unit: '/month',
        description: 'Paid advertising and SEO working together for faster results.',
        features: [
          'Everything in Growth',
          'Google Ads or Meta Ads management',
          'Conversion tracking set up',
          'Landing page optimisation',
          'Fortnightly performance reports',
        ],
        timeline: 'Monthly, 3-month minimum',
      },
    ],
    addons: [
      { name: 'Technical SEO audit (one-time)', price: 199, from: false, unit: '' },
      { name: 'Google Business Profile setup', price: 99, from: false, unit: '' },
      { name: 'Google Analytics 4 and conversion tracking', price: 149, from: false, unit: '' },
      { name: 'Email marketing automation setup', price: 299, from: true, unit: '' },
    ],
    notes: [
      'No one can honestly guarantee a #1 ranking on Google. We commit to the work, the transparency and the reporting.',
    ],
    exclusions: [
      'Advertising spend paid to Google or Meta',
      'Paid SEO tools and subscriptions beyond our own',
      'Photo or video shoots, unless added',
      'Website development work (available separately)',
    ],
    ongoingCosts: [
      'Ad spend: we usually suggest $300–$1,000 per month to start, paid directly by you',
      'Email platform fees (e.g. Mailchimp), based on list size',
    ],
    faqs: [
      {
        q: 'How soon will I see results from SEO?',
        a: 'Technical fixes and Google Business Profile improvements can help within weeks. Meaningful ranking growth usually takes 3–6 months, which is why our SEO plans have a 3-month minimum.',
      },
      {
        q: 'How much should I spend on ads?',
        a: 'For local businesses we usually suggest starting with $300–$1,000 per month in ad spend, then scaling what works. We will recommend a budget based on your goals.',
      },
    ],
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics & Business Intelligence',
    short: 'Data & BI',
    color: '#0891b2',
    tagline: 'Turn your numbers into clear decisions.',
    summary:
      'Power BI dashboards, automated spreadsheets and management reports that show sales, finances and KPIs at a glance, without hours of manual copy and paste.',
    offerings: [
      'Power BI dashboards',
      'Excel and Google Sheets automation',
      'Sales and financial reporting dashboards',
      'Data cleaning and transformation',
      'KPI tracking and reporting',
      'Database design and optimisation',
      'Business performance reports',
      'Automated management reports',
    ],
    tools: ['Power BI', 'Excel', 'Google Sheets', 'Looker Studio', 'SQL', 'Python'],
    packages: [
      {
        name: 'Spreadsheet Automation',
        price: 199,
        from: true,
        unit: '',
        description: 'Make your Excel or Google Sheets do the work for you.',
        features: [
          'Formulas, templates and validation',
          'Automated imports and clean-up',
          'Summary sheet with charts',
          'Short training video',
        ],
        timeline: '3–5 days',
      },
      {
        name: 'Power BI Dashboard',
        price: 599,
        from: true,
        unit: '',
        popular: true,
        description: 'An interactive dashboard for sales, finance or operations.',
        features: [
          'Up to 3 data sources',
          'Up to 4 report pages',
          'KPI cards, filters and drill-downs',
          'Scheduled data refresh',
          'Handover and training',
        ],
        timeline: '1–2 weeks',
      },
      {
        name: 'Reporting System',
        price: 1499,
        from: true,
        unit: '',
        description: 'Automated management reporting across your business.',
        features: [
          'Data cleaning and modelling',
          'Central database or data model',
          'Multiple dashboards by team',
          'Automated email reports',
          'Documentation',
        ],
        timeline: '3–5 weeks',
      },
    ],
    addons: [
      { name: 'Data cleaning (one-off)', price: 149, from: true, unit: '' },
      { name: 'Database design and optimisation', price: 399, from: true, unit: '' },
      { name: 'Dashboard support and updates', price: 99, from: true, unit: '/month' },
    ],
    exclusions: [
      'Power BI, Microsoft 365 or other software licences',
      'Fixing problems in source systems that produce the data',
      'Ongoing report changes after handover, unless on a plan',
    ],
    ongoingCosts: [
      'Power BI Pro licences from Microsoft for sharing dashboards, if Power BI is used',
      'Optional dashboard support from $99 per month',
    ],
    faqs: [
      {
        q: 'Do I need a Power BI licence?',
        a: 'To share dashboards inside your organisation you will usually need Power BI Pro licences from Microsoft. If you prefer a free option, we can build the same in Looker Studio or Google Sheets.',
      },
    ],
  },
  {
    id: 'it-support',
    name: 'IT Support & Managed Services',
    short: 'IT Support',
    color: '#4f46e5',
    tagline: 'Dependable IT, without a full-time IT hire.',
    summary:
      'Business email, Microsoft 365 and Google Workspace, devices, Wi-Fi, backups and day-to-day remote support, on a simple monthly plan or as you need it.',
    offerings: [
      'Business email and Microsoft 365 setup',
      'Google Workspace setup and administration',
      'Computer and software troubleshooting',
      'Wi-Fi and office network configuration',
      'User account and access management',
      'Device security and patch management',
      'Backup and recovery support',
      'Monthly IT maintenance contracts',
      'Remote technical support',
    ],
    tools: ['Microsoft 365', 'Google Workspace', 'Windows', 'macOS', 'Intune'],
    packages: [
      {
        name: 'Email & Workspace Setup',
        price: 149,
        from: true,
        unit: '',
        description: 'Professional email on your own domain, set up properly.',
        features: [
          'Microsoft 365 or Google Workspace',
          'Up to 10 users',
          'Domain verification and email security records',
          'Shared drives and calendars',
          'Migration of existing email (optional)',
        ],
        timeline: '1–3 days',
      },
      {
        name: 'IT Essentials',
        price: 149,
        from: false,
        unit: '/month',
        popular: true,
        description: 'Ongoing remote support for small teams.',
        features: [
          'Up to 5 users',
          'Remote support on business days',
          'User and access management',
          'Device updates and security checks',
          'Monthly backup verification',
        ],
        timeline: 'Monthly, cancel anytime',
      },
      {
        name: 'IT Business',
        price: 349,
        from: false,
        unit: '/month',
        description: 'Fuller coverage for growing offices.',
        features: [
          'Up to 15 users',
          'Priority remote support',
          'Patch and device management',
          'Network and Wi-Fi monitoring',
          'Quarterly IT review',
        ],
        timeline: 'Monthly, cancel anytime',
      },
    ],
    addons: [
      { name: 'Ad-hoc remote support', price: 35, from: false, unit: '/hour' },
      { name: 'Office Wi-Fi and network setup', price: 199, from: true, unit: '' },
      { name: 'Additional user on a monthly plan', price: 15, from: false, unit: '/month' },
    ],
    exclusions: [
      'Hardware, devices and software licences',
      'On-site visits, unless agreed in advance',
      'Repairs to physical hardware',
    ],
    ongoingCosts: [
      'Microsoft 365 or Google Workspace licences, billed by the provider',
      'Monthly plan fee, if you choose a plan',
    ],
    faqs: [
      {
        q: 'Do you offer on-site support?',
        a: 'Most issues are solved remotely and quickly. On-site visits can be arranged where we have local availability; ask us when you get in touch.',
      },
    ],
  },
  {
    id: 'mobile-apps',
    name: 'Mobile App Development',
    short: 'Mobile Apps',
    color: '#7c3aed',
    tagline: 'Apps your customers will actually use.',
    summary:
      'Android and iOS apps for e-commerce, bookings, deliveries and customer loyalty, built cross-platform so one codebase serves both stores.',
    offerings: [
      'Android and iOS application development',
      'Cross-platform applications',
      'E-commerce mobile apps',
      'Delivery and booking applications',
      'Customer portals and loyalty apps',
      'API and payment gateway integration',
      'App maintenance and updates',
    ],
    tools: ['Flutter', 'React Native', 'Firebase', 'Node.js', 'Stripe'],
    packages: [
      {
        name: 'App MVP',
        price: 3999,
        from: true,
        unit: '',
        description: 'A first version of your app to test with real users.',
        features: [
          'Android and iOS (cross-platform)',
          'Up to 8 core screens',
          'User login and profiles',
          'Admin panel',
          'App Store and Play Store publishing',
        ],
        timeline: '6–8 weeks',
      },
      {
        name: 'Business App',
        price: 7999,
        from: true,
        unit: '',
        popular: true,
        description: 'A full-featured app for e-commerce, bookings or delivery.',
        features: [
          'Everything in App MVP',
          'Payment gateway integration',
          'Push notifications',
          'Order, booking or delivery tracking',
          '60 days of free support after launch',
        ],
        timeline: '10–16 weeks',
      },
      {
        name: 'Custom / Enterprise',
        price: null,
        from: false,
        unit: '',
        description: 'Complex apps with integrations, offline mode or high scale.',
        features: [
          'Detailed discovery workshop',
          'Custom architecture',
          'Integrations with your systems',
          'Dedicated project manager',
        ],
        timeline: 'Scoped with you',
      },
    ],
    addons: [
      { name: 'App maintenance and updates', price: 149, from: true, unit: '/month' },
      { name: 'Loyalty or rewards module', price: 999, from: true, unit: '' },
    ],
    exclusions: [
      'Apple Developer and Google Play account fees',
      'Backend hosting and third-party API fees',
      'New features after launch (quoted separately)',
    ],
    ongoingCosts: [
      'Apple Developer account: $99 per year. Google Play: $25 one-time. Both registered in your name',
      'Backend hosting: typically $20–$150 per month',
      'Optional maintenance from $149 per month',
    ],
    faqs: [
      {
        q: 'Native or cross-platform?',
        a: 'For most businesses a cross-platform app (Flutter or React Native) gives near-native performance at a much lower cost, because one codebase runs on both Android and iOS.',
      },
    ],
  },
]

// Services planned for later. Shown as "Available on request".
export const upcomingServices = [
  { name: 'E-commerce solutions', desc: 'Product catalogue management, payment and shipping integrations.' },
  { name: 'Business consulting', desc: 'Digital transformation roadmaps, software selection and process improvement.' },
  { name: 'Software testing', desc: 'Manual, API, automated and regression testing.' },
  { name: 'Product engineering', desc: 'MVP development, prototyping, technical architecture and SaaS launches.' },
  { name: 'AI security', desc: 'LLM application security reviews, prompt-injection testing and AI-agent permission controls.' },
  { name: 'Blockchain development', desc: 'Smart contracts, verification systems and blockchain prototypes.' },
  { name: 'Technical training', desc: 'Web development, cloud fundamentals and cybersecurity awareness.' },
]

export function getCategory(id) {
  return categories.find(c => c.id === id)
}

// Lowest priced package in a category, for "From $X" labels.
export function startingPackage(category) {
  return category.packages
    .filter(p => p.price != null)
    .reduce((min, p) => (min == null || p.price < min.price ? p : min), null)
}

// Services grouped into three business lines. Navigation, the services page,
// the home page and the footer all follow this grouping and order.
export const businessLines = [
  {
    id: 'websites',
    name: 'Websites & Digital Commerce',
    desc: 'Business websites, online stores, UI/UX design and branding.',
    categories: ['web-development', 'ui-ux-branding'],
  },
  {
    id: 'software',
    name: 'Software & AI Automation',
    desc: 'Custom systems, mobile apps, AI chatbots, workflow automation and reporting.',
    categories: ['custom-software', 'mobile-apps', 'ai-automation', 'data-analytics'],
  },
  {
    id: 'growth',
    name: 'Growth, Cloud & Security',
    desc: 'Digital marketing, hosting and deployment, security reviews and IT support.',
    categories: ['digital-marketing', 'cloud-devops', 'cybersecurity', 'it-support'],
  },
]

const lineOrder = businessLines.flatMap(l => l.categories)
categories.sort((a, b) => lineOrder.indexOf(a.id) - lineOrder.indexOf(b.id))

export function categoriesIn(line) {
  return line.categories.map(getCategory)
}

export function lineOf(categoryId) {
  return businessLines.find(l => l.categories.includes(categoryId))
}
