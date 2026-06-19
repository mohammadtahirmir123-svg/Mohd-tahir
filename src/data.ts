import { Project, Service, Testimonial, AIProject, TimelineEvent } from './types';

export const HERO_ROLES = [
  'Web Designer',
  'Web Developer',
  'UI/UX Designer',
  'AI Automation Specialist',
  'Graphics Designer',
  'Digital Skills Trainer',
  'Freelance Consultant',
];

export const STATS = [
  { value: '3+', label: 'Years Experience', marker: 'EXPERIENCE' },
  { value: '100+', label: 'Projects Completed', marker: 'DELIVERED' },
  { value: '50+', label: 'Students Trained', marker: 'EDUCATION' },
  { value: 'Global', label: 'Freelance Coverage', marker: 'LOCATION' },
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: 't1',
    year: '2023 - Present',
    title: 'Elite Freelance Consultant & Full-Stack Developer',
    organization: 'Upwork & Fiverr Platforms',
    description: 'Developed over 100+ high-converting websites and landing pages for international businesses. Specialized in Next.js, React, tailwind configurations, WordPress, Shopify, and Webflow custom design integrations.',
    type: 'Freelance',
  },
  {
    id: 't2',
    year: '2024 - Present',
    title: 'AI Workflow Architect',
    organization: 'Direct Client Collaborations',
    description: 'Designed and implemented end-to-end business process automations, integrating ChatGPT, Zapier, Make, and custom CRM API workflows to decrease manual operations by up to 80%.',
    type: 'Direct Clients',
  },
  {
    id: 't3',
    year: '2023 - Present',
    title: 'Lead Digital Educator & Coach',
    organization: 'Digital Academy Initiative',
    description: 'Trained 50+ students on Web Design, MS Office suites, Freelancing setup, and Client Acquisition pathways to empower sustainable remote works.',
    type: 'Education',
  },
];

export const EXPERTISE_CATEGORIES = [
  {
    title: 'Core Development & Design',
    items: [
      'Responsive Website Development',
      'High-Impact Landing Pages',
      'Corporate & Business Websites',
      'Custom E-commerce Stores',
      'Premium Interactive Portfolios',
      'Mobile UI/UX Design',
      'SaaS Platform Prototypes',
      'Branding & Visual Design Layouts',
    ],
  },
  {
    title: 'AI Systems Implementation',
    items: [
      'AI Workflow Automation',
      'ChatGPT / LLM API Integration',
      'Business Process Automation (BPA)',
      'Smart Lead Generation Systems',
      'AI-Powered Customer Support Bots',
      'Automated AI Content Architectures',
      'No-Code Systems (Zapier, Make)',
      'Personal & Team Productivity Systems',
    ],
  },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Web Design',
    iconName: 'Palette',
    description: 'Stunning premium user interfaces designed on Figma and coded pixel-perfectly with tailored user journeys.',
    details: ['Apple-level aesthetic guidelines', 'Interactive high-fidelity Figma mockups', 'Visual design frameworks', 'Dynamic interaction models'],
  },
  {
    id: 's2',
    title: 'Web Development',
    iconName: 'Code',
    description: 'Fast, secure, responsive, and performance-optimized single page apps and CMS integrations.',
    details: ['Vite, React & Tailwind speed optimization', 'Clean, responsive semantic structures', 'Custom head structures & animation loops', 'Reliable API architectures'],
  },
  {
    id: 's3',
    title: 'UI/UX Design',
    iconName: 'Layout',
    description: 'User-centered blueprints, responsive user flows, and sleek high-contrast prototypes focusing on real lead conversion.',
    details: ['Wireframing & user persona analysis', 'Interactive clickable prototype flows', 'Intuitive navigation bento boards', 'Interactive dark/light transitions'],
  },
  {
    id: 's4',
    title: 'AI Automation',
    iconName: 'Cpu',
    description: 'Eliminate tedious manual tasks and capture qualified client leads 24/7 with bespoke AI workflow automations.',
    details: ['No-code automation integrations (Zapier / Make)', 'Custom chatbot deployment on WhatsApp/Web', 'Automated CRM synced customer outreach', 'AI content generators and scrapers'],
  },
  {
    id: 's5',
    title: 'Graphic Design',
    iconName: 'Layers',
    description: 'Cohesive, distinctive identity kits, marketing pitch-decks, figma components, and social media creative bundles.',
    details: ['Logos & branding guidelines', 'High-engagement social ad layouts', 'Pitch slide visuals and vectors', 'Sleek dark-aesthetic collateral'],
  },
  {
    id: 's6',
    title: 'Digital Skills Training',
    iconName: 'Award',
    description: 'Comprehensive practical training programs to learn highly valuable, monetizable modern skills.',
    details: ['Live portfolio-guided assignments', 'Online earning pathways', 'Upwork & Fiverr algorithm mechanics', 'Direct client closing scripts'],
  },
  {
    id: 's7',
    title: 'MS Word Training',
    iconName: 'FileText',
    description: 'Expertise in professional layout designs, standard document structures, layouts, and automation elements.',
    details: ['Automated indexes & layout tables', 'Standard corporate formatting styles', 'VBA fields & custom macros', 'Multi-column dynamic newsletters'],
  },
  {
    id: 's8',
    title: 'MS Excel Training',
    iconName: 'TrendingUp',
    description: 'Transition from basic spreadsheets to advanced analytics dashboards, professional formulas, and automation.',
    details: ['Advanced VLOOKUP, INDEX/MATCH, and XLOOKUP', 'Interactive Pivot Tables & custom charting', 'Financial models & conditional formatting', 'Macro scripting & automated dashboards'],
  },
  {
    id: 's9',
    title: 'Freelancing Mentorship',
    iconName: 'Users',
    description: 'One-on-one custom consultation sessions for direct client search, global platforms profile creation, and high ticket closing.',
    details: ['Portfolio building from scratch', 'Upwork profile optimization guidelines', 'Cover letter writing templates', 'Niche-positioning strategies'],
  },
];

export const WORKSHOP_TOPICS = [
  'Web Design',
  'Web Development',
  'UI/UX Design',
  'AI Tools',
  'AI Automation',
  'Graphic Design',
  'Microsoft Word',
  'Microsoft Excel',
  'Freelancing',
  'Personal Branding',
  'Client Communication',
  'Online Earning Strategies',
];

export const WORKSHOP_BENEFITS = [
  { title: 'Live Projects', desc: 'Work directly on real-world industry assignment briefs from actual clients.' },
  { title: 'Practical Assignments', desc: 'Hands-on practical checklists instead of boring theoretical lectures.' },
  { title: 'Portfolio Building', desc: 'Graduate with an elegant, ready-to-publish digital web portfolio.' },
  { title: 'Client Acquisition', desc: 'Step-by-step guidance on how to secure your first international client.' },
  { title: 'Fiverr & Upwork Secrets', desc: 'Detailed tips to optimize profiles, pass assessments, and rank on gig directories.' },
  { title: 'Career & Growth Support', desc: 'Consistent post-training support and active peer network channel.' },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Aura AI - Creative Agency Platform',
    category: 'Websites',
    description: 'A multi-dimensional agency layout designed for high-end digital services, complete with fluid animations, glowing containers, and responsive bento grid design features.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tech: ['React', 'Framer Motion', 'Tailwind CSS', 'Figma'],
    results: 'Boosted conversion rate by 42% and enhanced session retention from 45 seconds to 2.8 minutes.',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'p2',
    title: 'NextGen Automations - SaaS Portal',
    category: 'AI Automation',
    description: 'An interactive customer dashboard monitoring continuous scraping, multi-channel lead validation, and auto-reply campaigns.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tech: ['Next.js', 'Zapier', 'Make Integration', 'ChatGPT API'],
    results: 'Automated 12,000+ monthly support touchpoints, reducing human operations costs by 75%.',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'p3',
    title: 'Nexa UI - Immersive Design System',
    category: 'UI/UX',
    description: 'High-fidelity glassmorphic Figma component framework, crafted specially for deep tech startups and modern software builders.',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
    tech: ['Figma', 'UI Design', 'Design Tokens', 'Prototyping'],
    results: 'Saves 35+ development hours per project with standardized semantic layout rules.',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'p4',
    title: 'Vortex Branding Package',
    category: 'Branding',
    description: 'A comprehensive visual system including logos, dark-purple visual layouts, digital banners, and interactive presentation layouts.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    tech: ['Adobe Illustrator', 'Photoshop', 'Brand Positioning'],
    results: 'Redefined brand identity, supporting a $1.2M seed-funding round raising client credibility.',
    liveUrl: '#',
    featured: false,
  },
  {
    id: 'p5',
    title: 'Nova SaaS - Landing Page Opt-in',
    category: 'Landing Pages',
    description: 'An extremely fast, conversion-driven product landing page with dynamic interactive price selectors and smooth triggers.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    tech: ['Vite', 'React', 'Tailwind', 'Motion'],
    results: 'Secured an average opt-in conversion metric of 18.2% on cold ad-traffic campaigns.',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'p6',
    title: 'Omni Vector - Social Creatives Bundle',
    category: 'Graphic Design',
    description: 'High CTR social media ads, sleek programmatic posters, and branding vectors optimized for online marketing runs.',
    image: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=800&q=80',
    tech: ['Canva Pro', 'Figma', 'Vector Systems'],
    results: 'Averaged click-through rates of 5.8% across three distinct social programmatic marketing runs.',
    liveUrl: '#',
    featured: false,
  },
];

export const AI_PROJECTS: AIProject[] = [
  {
    id: 'ai1',
    title: 'AI Customer Support Bot',
    description: 'Multi-lingual support bot trained on internal knowledgebases. Integrates directly into WhatsApp, Telegram, and business landing pages to solve general issues and book sales calls.',
    metrics: 'Reduced average customer wait times by 80% and captured 140+ qualified leads monthly auto-synced to Sheet dashboards.',
    status: 'optimized',
    steps: [
      { label: 'Receive Message', details: 'Triggers on incoming client inquiry text' },
      { label: 'Knowledge Fetch', details: 'RAG system searches internal knowledge docs in 200ms' },
      { label: 'Draft AI Answer', details: 'Generates structured friendly conversational reply' },
      { label: 'Action CRM Sy', details: 'Autosaves contacts and updates client funnel cards' },
    ],
  },
  {
    id: 'ai2',
    title: 'Automated Lead Qualification & Enrichment',
    description: 'An elegant lead scraper and qualifying parser. It runs on newly registered emails, extracts public coordinates from LinkedIn APIs, scores potential values using AI, and alerts core sales teams on Slack.',
    metrics: 'Saves 20+ manual research hours weekly, ensuring instant 5-minute outreach speeds.',
    status: 'active',
    steps: [
      { label: 'Form Submit', details: 'Captures new subscription user details' },
      { label: 'Data Scraper', details: 'Gathers company metadata, headcount, and domain metrics' },
      { label: 'AI Qualifier', details: 'Scores likelihood of closing based on historical trends' },
      { label: 'Slack PING', details: 'Pushes high-priority dashboard cards with draft emails' },
    ],
  },
  {
    id: 'ai3',
    title: 'AI Content Production & Syndicate',
    description: 'Monitors RSS feeds and industry news feeds, summarizes trends, writes dynamic social updates with tailored brand voice guidelines, generates canvas layout prompts, and queues scheduling pipes.',
    metrics: 'Ensures 100% brand footprint consistency, driving 3x organic impressions with zero operational overhead.',
    status: 'completed',
    steps: [
      { label: 'RSS Trend Sc', details: 'Discovers viral industry announcements' },
      { label: 'AI Summarise', details: 'Mints high-value insights in multiple formats (tweet, post)' },
      { label: 'Asset Draft', details: 'Designs prompt directions and updates metadata' },
      { label: 'Buffer Queue', details: 'Schedules optimal organic times automatically' },
    ],
  },
  {
    id: 'ai4',
    title: 'Business Automation & CRM Sync Sync',
    description: 'Deep orchestration pipeline connecting Stripe transactions, Gmail invoice alerts, Notion tasks boards, and client reporting sheets into a unified autonomous flow.',
    metrics: 'Eliminated manual invoice reconciliation errors completely, speeding up internal onboarding time to 1 minute.',
    status: 'optimized',
    steps: [
      { label: 'Stripe Pay', details: 'Listens for verified successful purchase hooks' },
      { label: 'Invoice Gen', details: 'Compiles custom MS Word templates dynamically' },
      { label: 'Google Drive', details: 'Stores receipt logs secure in dedicated client folders' },
      { label: 'Invite Sent', details: 'Emails onboarding details and triggers introductory tutorial' },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'tes1',
    name: 'David Vance',
    role: 'Founder',
    company: 'Vortex Global Tech',
    rating: 5,
    text: 'Mohd Tahir is professional, highly responsive, and exceptionally skilled. He delivered a stunning, fast, and high-converting startup portal on short notice. Our sales have risen by 30% since deployment!',
  },
  {
    id: 'tes2',
    name: 'Sarah Rahman',
    role: 'Operations Director',
    company: 'Apex Media Corp',
    rating: 5,
    text: 'He helped automate our entire client intake workflow and built the custom AI support responder. He literally saved our team 15 hours of manual work every single week. Simply excellent work.',
  },
  {
    id: 'tes3',
    name: 'Aman Patel',
    role: 'Creative Director',
    company: 'Synergy Agency',
    rating: 5,
    text: 'Tahir is an amazing developer and trainer. His digital workshop turned our graphic designers into competent UI/UX designers ready for modern client briefs. His teaching style is incredibly detailed and practical.',
  },
  {
    id: 'tes4',
    name: 'Dr. Helen K.',
    role: 'Managing Director',
    company: 'Elevate Group',
    rating: 5,
    text: 'Working with Tahir was seamless. He designed a beautiful business dashboard and integrated clean MS Excel automated tables that we use for executive reporting daily. Delivered far beyond our expectations!',
  },
];

export const CLIENT_RESULTS = [
  { metric: '+45%', desc: 'Average website conversion rate improvement' },
  { metric: '80%', desc: 'Reduction in customer wait time through AI bots' },
  { metric: '30h+', desc: 'Operational hours saved weekly per business automated' },
  { metric: '100%', desc: 'Student satisfaction and career onboarding success' },
  { metric: '6x', desc: 'Faster client report processing using Excel dashboards' },
];

export const BRAND_LOGOS = [
  { name: 'Upwork', category: 'Platforms' },
  { name: 'Fiverr', category: 'Platforms' },
  { name: 'ChatGPT', category: 'AI Tools' },
  { name: 'Google', category: 'Tech' },
  { name: 'Adobe', category: 'Design' },
  { name: 'Figma', category: 'Design' },
  { name: 'WordPress', category: 'CMS' },
  { name: 'Shopify', category: 'E-commerce' },
  { name: 'Canva', category: 'Design' },
  { name: 'Microsoft', category: 'Office' },
  { name: 'Notion', category: 'Productivity' },
];

export const HOW_I_WORK_PROCESS = [
  {
    step: '01',
    title: 'Discovery Call',
    desc: 'Uncover bottlenecks, highlight growth pathways, and outline primary project parameters.',
  },
  {
    step: '02',
    title: 'Requirement Analysis',
    desc: 'In-depth audit of current systems, technical requirements, competitor strategies, and layout plans.',
  },
  {
    step: '03',
    title: 'Planning & Strategy',
    desc: 'Propose complete UI mockups, tech configurations, and database timelines.',
  },
  {
    step: '04',
    title: 'Design Phase',
    desc: 'Craft premium high-fidelity wireframes, typography tokens, glassmorphic themes, and custom animations.',
  },
  {
    step: '05',
    title: 'Development',
    desc: 'Clean, modular, structured code utilizing modern performant frameworks.',
  },
  {
    step: '06',
    title: 'Rigorous Testing',
    desc: 'Audit page-speed scores, cross-browser responsiveness, API payloads, and automation script contingencies.',
  },
  {
    step: '07',
    title: 'Seamless Deployment',
    desc: 'Deploy safely to production servers, setup custom domains, and configure SSL certificates.',
  },
  {
    step: '08',
    title: 'Ongoing Support',
    desc: 'Continuous performance observation, database backups, updates, and optimization sprints.',
  },
];
