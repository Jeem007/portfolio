/**
 * All personal content lives here, separate from presentation.
 * Source: "MD RAKIB HASAN-CV.docx" + specialisms stated by Rakib directly.
 * Update this file to change what the site says — components read from it.
 */

export const site = {
  // Set NEXT_PUBLIC_SITE_URL in your environment once the domain is known.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_US",
};

export const profile = {
  name: "Md Rakib Hasan",
  shortName: "Rakib",
  initials: "RH",
  role: "Frontend Developer",
  secondaryRole: "Creative Web Engineer",
  currentTitle: "Software Engineer",
  currentCompany: "Catch Bangladesh Limited",
  location: "Dhaka, Bangladesh",
  email: "rakibjeem007@gmail.com",
  // Kept in data but not rendered publicly. Set showPhone to true to display it.
  phone: "+880 16186 38742",
  showPhone: false,
  resumeUrl: "/resume/Md-Rakib-Hasan-CV.docx",
  headline:
    "I build fast, interactive and intelligent web products with Vue, Nuxt, React, Next.js — and AI wired in where it matters.",
  summary:
    "Frontend developer with expertise in Vue.js and React.js, currently expanding into Python, Django and emerging AI technologies. I care about user-focused applications that combine modern web development with intelligent automation.",
  bio: [
    "I'm a Software Engineer at Catch Bangladesh Limited, where I've been building production frontends since January 2024 — designing and developing interfaces, managing application state, integrating APIs and building reusable component libraries alongside our back-end team.",
    "My work spans an AI-powered CV and portfolio builder, a multi-module ERP and an e-commerce platform where our team has shipped 10 storefront themes. I graduated in Computer Science & Engineering from American International University–Bangladesh with a CGPA of 3.90.",
    "Right now I'm going deeper into Python, Django and AI so the interfaces I build can do more of the thinking for their users.",
  ],
  socials: [
    { label: "GitHub", handle: "Jeem007", href: "https://github.com/Jeem007", icon: "github" },
    {
      label: "LinkedIn",
      handle: "md-rakib-hasan",
      href: "https://www.linkedin.com/in/md-rakib-hasan-12b1a0279/",
      icon: "linkedin",
    },
    { label: "Email", handle: "rakibjeem007@gmail.com", href: "mailto:rakibjeem007@gmail.com", icon: "mail" },
  ],
};

/**
 * Stats — every value is derived directly from the CV.
 * `computeYears` keeps the experience figure accurate over time.
 */
export const careerStart = "2024-01-01";

export const stats = [
  { value: "years", suffix: "+", label: "Years building production frontends", source: "Catch Bangladesh, Jan 2024 – now" },
  { value: 10, suffix: "", label: "E-commerce themes shipped with my team", source: "NextCart" },
  { value: "projects", suffix: "", label: "Projects in the portfolio", source: "QuickCV, SMICEE, NextCart & more" },
  { value: 3.9, decimals: 2, suffix: "", label: "CGPA — BSc in CSE, AIUB", source: "Graduated 2024" },
];

export const navLinks = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/**
 * Skills — `featured` items get the large interactive cards.
 * Nuxt.js, Next.js, REST APIs and AI integration are specialisms Rakib listed directly;
 * the rest are from the CV's "Digital Skills".
 */
export const skillGroups = [
  {
    id: "frameworks",
    title: "Frameworks",
    blurb: "Component-driven apps, from SPA to server-rendered.",
    items: ["Vue.js", "Nuxt.js", "React", "Next.js"],
  },
  {
    id: "foundation",
    title: "Foundation",
    blurb: "The languages and styling the web is made of.",
    items: ["JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    id: "motion",
    title: "Motion",
    blurb: "Interfaces that move with intent.",
    items: ["GSAP"],
  },
  {
    id: "integration",
    title: "Integration & AI",
    blurb: "Wiring frontends to APIs and models.",
    items: ["REST APIs", "AI Integration", "State Management", "Postman"],
  },
  {
    id: "backend",
    title: "Backend & Data",
    blurb: "Enough of the stack to ship end to end.",
    items: ["Laravel", "PHP", "Python", "MySQL", "Oracle", ".NET"],
  },
  {
    id: "tooling",
    title: "Tooling & Design",
    blurb: "Shipping, testing and designing.",
    items: ["Git & GitHub", "Figma", "Selenium", "Photoshop", "Illustrator"],
  },
];

export const otherLanguages = ["C++", "C#", "Java"];

export const marqueeItems = [
  "Vue.js",
  "React",
  "Next.js",
  "Nuxt.js",
  "JavaScript",
  "Tailwind CSS",
  "GSAP",
  "REST APIs",
  "AI Integration",
  "Frontend Development",
];

/**
 * Experience — shown as a horizontal-scroll track. Add roles newest first.
 */
export const experience = [
  {
    role: "Software Engineer",
    company: "Catch Bangladesh Limited",
    location: "Dhaka, Bangladesh",
    start: "Jan 2024",
    end: "Present",
    current: true,
    description:
      "Designing, building and maintaining production web application frontends, working closely with the back-end team from component architecture through to API integration and testing.",
    responsibilities: [
      "Frontend design & development",
      "State management",
      "API integration",
      "Component library development",
      "Version control",
      "Collaboration with back-end developers",
      "Testing & debugging",
    ],
    // Verify against what you use day to day at Catch.
    technologies: ["Vue.js", "React", "JavaScript", "Tailwind CSS", "REST APIs", "Git"],
  },
];

/** Education — its own compact section, separate from experience. */
export const education = [
  {
    degree: "BSc in Computer Science & Engineering",
    school: "American International University – Bangladesh",
    year: "2024",
    result: "CGPA 3.90",
  },
  {
    degree: "Higher Secondary Certificate",
    school: "Dhaka Residential Model College",
    year: "2019",
    result: "GPA 5.00",
  },
  {
    degree: "Secondary School Certificate",
    school: "Shaheed Police Smrity School & College",
    year: "2017",
    result: "GPA 5.00",
  },
];

export const certifications = ["PHP & Laravel", "Full Stack Web Development"];

/**
 * Projects — add new entries here. Optional fields are hidden when empty.
 *
 * {
 *   title, slug, description, longDescription, category, year,
 *   technologies: [],   // stack used
 *   highlights: [],     // feature tags shown when technologies are unknown
 *   thumbnail: "/projects/slug/cover.jpg",  // put files in /public/projects
 *   images: [{ src, alt }],
 *   liveUrl, githubUrl, extraLinks: [{ label, href }],
 *   role, challenges, solution, results,
 *   accent: "#hex",     // tints the generated cover when no thumbnail is set
 *   featured: true,     // featured projects get the large full-width layout
 * }
 */
export const projects = [
  {
    title: "QuickCV",
    slug: "quickcv",
    featured: true,
    category: "AI SaaS",
    year: null,
    description:
      "A smart CV and portfolio builder for non-technical users — AI tailors CVs, cover letters and job applications from a job description.",
    longDescription:
      "QuickCV lets anyone create a professional CV and automatically get a personal portfolio website without writing code. Users fill in a social-media-style profile once (or import from LinkedIn), and AI turns it into ATS-optimised CVs tailored to a specific job description, along with matching cover letters. It ships with 10 ATS-friendly templates that can be swapped in one click, keeps every CV version in a library that stays in sync with the profile, and gives each user a shareable public profile with portfolio items and a video resume. It runs on a coin-based system, with free coins for completing your profile.",
    technologies: [],
    highlights: ["AI generation", "JD-based CVs", "Cover letters", "10 ATS templates", "Portfolio builder", "Coin system"],
    facts: [
      ["Templates", "10 ATS-friendly"],
      ["Pricing", "Coin packs, ৳40–৳200"],
    ],
    steps: [
      { title: "Upload your info", text: "Enter details manually or sync social profiles to import work history." },
      { title: "Generate CV", text: "AI analyses the profile and builds a resume tailored to the target role." },
      { title: "Download & share", text: "Export a polished PDF or share the online profile with employers." },
    ],
    features: [
      { title: "Social-media-style profile", text: "An intuitive profile editor for entering your details, with LinkedIn import to save time." },
      { title: "Job-description-based CV", text: "Paste a job description and get a CV tailored to match it." },
      { title: "AI cover letters", text: "Personalised, professional cover letters generated in seconds." },
      { title: "ATS-friendly generation", text: "Optimised keywords and formatting to get past applicant tracking systems." },
      { title: "One-click layout change", text: "Switch between professional templates instantly." },
      { title: "CV library & sync", text: "Keep multiple versions for different roles. Update the profile once and every CV stays in sync." },
      { title: "Public profile & video resume", text: "A shareable online portfolio with portfolio items and video introductions." },
      { title: "Coin wallet", text: "Pay-as-you-go coin packs, with free coins for completing your profile." },
    ],
    thumbnail: "/projects/quickcv/hero.jpg",
    images: [
      { src: "/projects/quickcv/how.jpg", alt: "How QuickCV works: upload info, generate CV, download and share", width: 1440, height: 980, caption: "Three-step flow from profile to finished CV", wide: true },
      { src: "/projects/quickcv/templates.jpg", alt: "QuickCV CV template carousel", width: 1440, height: 740, caption: "ATS-friendly CV templates" },
      { src: "/projects/quickcv/powerful.jpg", alt: "QuickCV feature grid", width: 1440, height: 740, caption: "Feature overview" },
      { src: "/projects/quickcv/pricing.jpg", alt: "QuickCV coin packages: Mini, Value and Pro packs", width: 1440, height: 680, caption: "Coin-based pricing packs", wide: true },
    ],
    liveUrl: "https://app.createquickcv.com/",
    githubUrl: null,
    extraLinks: [{ label: "Landing site", href: "https://createquickcv.com/" }],
    role: null,
    challenges: null,
    solution: null,
    results: null,
    accent: "#FF6A3D",
  },
  {
    title: "SMICEE",
    slug: "smicee",
    category: "ERP System",
    year: null,
    description:
      "An ERP covering HR, projects, sales, finance, clients & vendors and operations — built to streamline and automate everyday business work.",
    longDescription:
      "SMICEE (Smart Office) is an ERP system spanning HR management (policy, compliance, asset management, payroll, leave), project management, sales management (leads, quotations, purchase orders, invoices), finance and accounts (accounts, budgets, payments), client & vendor management, and administrative operations — helping organisations streamline and automate their regular work. Everything runs from one unified interface, with a live dashboard for projects, clients, tasks and employees, real-time performance monitoring, automated reports and CRM workflows for lead conversion, customer support and sales.",
    technologies: [],
    highlights: ["Live dashboard", "Performance monitoring", "Automated reports", "CRM workflows", "Lead conversion", "Unified interface"],
    facts: [
      ["Modules", "7 integrated"],
      ["Focus", "Office automation"],
    ],
    features: [
      { title: "HR management", text: "Policy, compliance, asset management, payroll and leave in one place." },
      { title: "Project & task management", text: "Projects and tasks with task statistics and live performance monitoring." },
      { title: "Sales management", text: "Leads, quotations, purchase orders and invoices, with lead-conversion workflows." },
      { title: "Finance & accounts", text: "Accounts, budgets and payments, with earnings, expenses and profit at a glance." },
      { title: "Client management", text: "A client database for tracking relationships and spotting new opportunities." },
      { title: "Vendor management", text: "Vendors managed alongside clients in the same system." },
      { title: "Admin & operations", text: "Day-to-day administrative and operational work, from tasks to facilities." },
      { title: "Reports & dashboards", text: "Automated, structured reports and dashboards for data-driven decisions." },
    ],
    thumbnail: "/projects/smicee/cover.jpg",
    images: [
      { src: "/projects/smicee/dashboard.jpg", alt: "SMICEE dashboard with project, client, task and employee counts, revenue and sales charts", width: 1440, height: 740, caption: "Main dashboard: headcounts, revenue, sales overview and monthly KPIs", wide: true },
      { src: "/projects/smicee/help.jpg", alt: "SMICEE platform capabilities: integrated system, multiple platform, collaboration, CRM workflows, automated reports", width: 1440, height: 1040, caption: "Platform capabilities" },
      { src: "/projects/smicee/leads.jpg", alt: "SMICEE lead conversion, structured reports and dashboard widgets", width: 1440, height: 780, caption: "Lead conversion, task statistics and sales widgets" },
      { src: "/projects/smicee/automation.jpg", alt: "SMICEE automation tools and live performance monitoring charts", width: 1440, height: 1380, caption: "Automation tools and live performance monitoring", wide: true },
    ],
    liveUrl: "https://revive.smicee.com/auth/login",
    githubUrl: null,
    extraLinks: [{ label: "Landing site", href: "https://smicee.com/" }],
    role: null,
    challenges: null,
    solution: null,
    results: null,
    accent: "#7C9CFF",
  },
  {
    title: "NextCart",
    slug: "nextcart",
    category: "E-commerce Platform",
    year: null,
    description:
      "An e-commerce platform with product, order, inventory and CRM tooling — our team has built 10 storefront themes for it so far.",
    longDescription:
      "NextCart is a one-stop digital platform for running and growing a business online, with product management, order processing, inventory control, customer relationship management and advanced analytics. Businesses can launch a mobile-responsive e-commerce website from ready-made themes with single-click deployment, run day-to-day operations from the NextCart business app (POS, orders, products, sales, customers, vendors), automate repetitive work, manage their social media through a community management tool, and extend their WordPress site with the NextCart plugin. Working with my team, we've built 10 e-commerce themes for the platform.",
    technologies: [],
    highlights: ["10 themes shipped", "Website builder", "Business app & POS", "Inventory & orders", "CRM", "WordPress plugin"],
    facts: [["Platforms", "Web, Android & WordPress"]],
    features: [
      { title: "Website builder", text: "Anyone can launch a professional, mobile-responsive e-commerce site from ready-made themes, with unlimited customisation." },
      { title: "Creative themes", text: "Modern, minimal storefront themes built for different types of business — our team built 10 of them." },
      { title: "Business app & POS", text: "Run the business from a phone: point of sale, orders, products, sourcing and shop updates." },
      { title: "Sales, customer & vendor management", text: "Sales orders with status tracking, alongside customer and vendor records." },
      { title: "Business operation manager", text: "15+ services that replace repetitive day-to-day work with automated processes." },
      { title: "Branding & marketing", text: "A community management tool for marketing and managing social media pages from the app." },
      { title: "WordPress plugin", text: "Bring NextCart features into an existing WordPress site." },
      { title: "Single-click deployment", text: "Go live quickly, with a user-friendly dashboard and high security and availability." },
    ],
    thumbnail: "/projects/nextcart/cover.jpg",
    images: [
      { src: "/projects/nextcart/screens.jpg", alt: "NextCart business app screens: product, sales, vendor and operation management, POS, sales orders", width: 1440, height: 680, caption: "Business app: POS, product, sales, vendor and operation management", wide: true },
      { src: "/projects/nextcart/themes.jpg", alt: "NextCart storefront theme shown on a laptop and tablet", width: 1440, height: 620, caption: "Multi-purpose storefront themes" },
      { src: "/projects/nextcart/services2.jpg", alt: "NextCart services: business operation manager, branding and marketing support, WordPress plugin", width: 1440, height: 580, caption: "Operations, marketing and WordPress plugin" },
      { src: "/projects/nextcart/services1.jpg", alt: "NextCart business app and website builder", width: 1440, height: 720, caption: "Business app and website builder", wide: true },
    ],
    liveUrl: "https://nextcart.app/free-website-making-software/",
    githubUrl: null,
    extraLinks: [{ label: "Landing site", href: "https://nextcart.app/" }],
    role: "Team member — theme development",
    challenges: null,
    solution: null,
    results: "10 e-commerce themes built with the team.",
    accent: "#3DDC97",
  },
  {
    title: "Go For Change",
    slug: "goforchange",
    category: "Social-tech Platform",
    year: null,
    description:
      "A social-tech platform connecting changemakers, donors, institutions and citizens — with stories, initiatives, opportunities and events in one place.",
    longDescription:
      "Go For Change is a social-tech platform that brings people closer to the ideas and innovations transforming their communities. NGOs, foundations and small social ventures enlist as changemakers with their own profiles, share short video stories (\"Spot-on's\") and publish initiatives that others can follow and react to. Around that sits a directory of changemakers, an opportunities board and events such as the Reimagining Future webinar series. The aim is a self-sustaining ecosystem where collaboration builds capacity, ideas scale and impact lasts.",
    technologies: [],
    highlights: ["Changemaker profiles", "Video stories", "Initiatives feed", "Follow & reactions", "Opportunities", "Events & webinars"],
    facts: [["Model", "Connect · Support · Sustain"]],
    features: [
      { title: "Changemaker directory", text: "NGOs, foundations and social ventures enlist with a profile and appear in a scrolling changemaker showcase." },
      { title: "Featured Spot-on's", text: "Short vertical video stories with like and dislike reactions, plus a flow for sharing your own content." },
      { title: "Initiatives feed", text: "Changemakers publish initiatives with photos, rich-text descriptions and dates; visitors can follow the organisation behind each one." },
      { title: "Opportunities", text: "A dedicated space for opportunities to get involved with the work on the platform." },
      { title: "Events & webinars", text: "Event pages with speakers, schedule and registration, such as the Reimagining Future webinar series." },
      { title: "Accounts & content guidelines", text: "Register/login for contributors, with published content guidelines, FAQ and team pages." },
    ],
    thumbnail: "/projects/goforchange/cover.jpg",
    images: [
      { src: "/projects/goforchange/why.jpg", alt: "Go For Change mission section: Connect, Support, Sustain", width: 1440, height: 530, caption: "Mission: connect, support, sustain", wide: true },
      { src: "/projects/goforchange/changemakers.jpg", alt: "Changemaker showcase and Featured Spot-on's video stories", width: 1440, height: 1130, caption: "Changemaker showcase and video stories" },
      { src: "/projects/goforchange/initiatives.jpg", alt: "Initiatives feed with organisation, follow button, description and reactions", width: 1440, height: 1057, caption: "Initiatives feed" },
      { src: "/projects/goforchange/webinar.jpg", alt: "Webinar event card with speakers, date, time and registration", width: 1440, height: 800, caption: "Event page for the webinar series", wide: true },
    ],
    liveUrl: "https://www.goforchange.in/",
    githubUrl: null,
    extraLinks: [],
    role: null,
    challenges: null,
    solution: null,
    results: null,
    accent: "#8E5BB0",
  },
  {
    title: "Balanti",
    slug: "balanti",
    category: "E-commerce Store",
    year: null,
    description:
      "An online store for Balanti, a Sydney footwear brand since 2000 — premium leather shoes and boots for men and women, with a full browse-to-checkout flow.",
    longDescription:
      "Balanti is a premier Australian footwear brand that pairs Italian-inspired design with local craftsmanship, established in Sydney in 2000. Its storefront is a single-page app built around browsing and buying: a video hero, men's and women's category tabs, New Arrivals and Featured carousels, a numbered Trending Now rail and a Most Popular grid. The catalogue has category, price-range and colour filters with sorting, and each product page has a gallery, \"Checkout how you look\" lifestyle shots, colour and size selection with a size guide, add-to-bag and buy-now, and tabs for details, materials, delivery and returns. Customers also get accounts, a wishlist and free shipping on orders over $200 Australia-wide.",
    technologies: [],
    highlights: ["Product catalogue", "Filters & sorting", "Colour & size variants", "Wishlist", "Cart & checkout", "Accounts"],
    facts: [["Market", "Australia · AUD"]],
    features: [
      { title: "Video hero & curated home", text: "A cinematic video hero, then category tiles, New Arrivals / Featured carousels, Trending Now and Most Popular." },
      { title: "Catalogue with filters", text: "Filter by category (men, women, formal, boot, casual, unisex), price range and colour, and sort by featured, newest or price." },
      { title: "Product pages", text: "Image gallery with thumbnails, breadcrumbs, and lifestyle \"Checkout how you look\" shots showing the shoe worn." },
      { title: "Colour & size variants", text: "Per-colour product URLs, size selection (EU 40–45) and a size guide." },
      { title: "Bag, buy now & wishlist", text: "Add to bag or buy straight away, and save favourites to a wishlist from any product card." },
      { title: "Accounts & support", text: "Customer login, plus size guide, FAQ, terms and contact pages." },
    ],
    thumbnail: "/projects/balanti/cover.jpg",
    images: [
      { src: "/projects/balanti/product.jpg", alt: "Balanti product page for the Classic Brogue with gallery, colour and size selection", width: 1440, height: 900, caption: "Product page: gallery, lifestyle shots, colour and size selection", wide: true },
      { src: "/projects/balanti/catalogue.jpg", alt: "Balanti men's catalogue with category, price and colour filters", width: 1440, height: 900, caption: "Catalogue with filters and sorting" },
      { src: "/projects/balanti/categories.jpg", alt: "Explore Our Products section with men's category tiles", width: 1440, height: 660, caption: "Category tiles with men / women tabs" },
      { src: "/projects/balanti/trending.jpg", alt: "Men and women collection banners and Trending Now product rail", width: 1440, height: 824, caption: "Collection banners and Trending Now", wide: true },
      { src: "/projects/balanti/popular.jpg", alt: "Most Popular product grid", width: 1440, height: 662, caption: "Most Popular grid" },
      { src: "/projects/balanti/about.jpg", alt: "About Balanti brand section", width: 1440, height: 670, caption: "Brand story section" },
    ],
    liveUrl: "https://balanti.com.au/",
    githubUrl: null,
    extraLinks: [],
    role: null,
    challenges: null,
    solution: null,
    results: null,
    accent: "#7A1F2B",
  },
  {
    title: "RDRC",
    slug: "rdrc",
    category: "Organisation Website",
    year: null,
    description:
      "Website for the River & Delta Research Centre, a Dhaka research and advocacy organisation working on fair cities and thriving deltas.",
    longDescription:
      "River & Delta Research Centre (RDRC) conducts interdisciplinary research on water issues and urban transformation in Bangladesh — \"Research and Advocacy for Fair Cities and Thriving Deltas\". The site presents that work as a content-driven platform: a research showcase slider (Sweatshop Rivers, Riverine Urbanism, Restoring Urban Wetlands, Fair Urban Transition), a Co-production Lab of community initiatives, a publications library in English and Bangla, advocacy campaigns such as Rights of Rivers and the Women Water Leadership Network, and a bilingual news & events feed. Each content type has its own listing and detail pages, alongside expertise, careers, policy and contact pages.",
    technologies: [],
    highlights: ["Listing & detail pages", "Bilingual (English & Bangla)", "Research showcase", "Publications library", "News & events", "Advocacy campaigns"],
    facts: [["Built at", "Catch Bangladesh Limited"]],
    features: [
      { title: "Research showcase", text: "A numbered slider of flagship research projects, each with a summary, pull quote and its own detail page." },
      { title: "Co-production Lab", text: "A carousel of community co-production initiatives such as Solidarity Citymaking with Fisherfolk." },
      { title: "Publications library", text: "Report covers and summaries in English and Bangla, with a full publications listing and detail pages." },
      { title: "Advocacy & campaigns", text: "Numbered campaign cards — Wetland Restoration, Women Water Leadership Network, Rights of Rivers." },
      { title: "News & events", text: "A dated news carousel in Bangla and English, with a news archive and article pages." },
      { title: "Organisation pages", text: "About, expertise, careers, policy and contact pages, plus a newsletter sign-up in the footer." },
    ],
    thumbnail: "/projects/rdrc/cover.jpg",
    images: [
      { src: "/projects/rdrc/hero.jpg", alt: "RDRC home page hero: River & Delta Research Centre", width: 1440, height: 810, caption: "Home page hero", wide: true },
      { src: "/projects/rdrc/research.jpg", alt: "Research slider featuring the Sweatshop Rivers project", width: 1440, height: 815, caption: "Research showcase slider" },
      { src: "/projects/rdrc/coproduction.jpg", alt: "Co-production Lab carousel of community initiatives", width: 1440, height: 850, caption: "Co-production Lab" },
      { src: "/projects/rdrc/publications.jpg", alt: "Publications carousel with English and Bangla report covers", width: 1440, height: 960, caption: "Publications in English and Bangla", wide: true },
      { src: "/projects/rdrc/advocacy.jpg", alt: "Advocacy and campaign section with numbered campaigns", width: 1440, height: 760, caption: "Advocacy & campaigns" },
      { src: "/projects/rdrc/news.jpg", alt: "Latest news carousel with dated Bangla news items", width: 1440, height: 680, caption: "Bilingual news & events" },
    ],
    liveUrl: "https://rdrc.info/",
    githubUrl: null,
    extraLinks: [],
    role: null,
    challenges: null,
    solution: null,
    results: null,
    accent: "#0070BB",
  },
  {
    title: "Future Bangladesh You Want",
    slug: "future-bangladesh",
    category: "Civic Engagement Platform",
    year: null,
    description:
      "A citizen-engagement platform for Bangladesh's 13th National Parliamentary Election — pledges, personalised photo cards, creator content and verified voter resources.",
    longDescription:
      "Future Bangladesh You Want (\"আপনি কেমন বাংলাদেশ দেখতে চান?\") is a campaign platform from the Bangladesh Election Commission Secretariat, supported by UN Bangladesh's Electoral Project (BALLOT & DRIP), that invites citizens to take part in the 13th National Parliamentary Election. Visitors can sign a public pledge whose signatures fill a map of Bangladesh, generate a shareable #FutureBangladesh photo card from branded frames, submit their own content, and watch videos from content hosts and influencers. A resources hub publishes announcements such as the election schedule, the code of conduct, postal-vote (out-of-country voting) guides and Gender-Based Violence referral pathways, in Bangla and English.",
    technologies: [],
    highlights: ["Pledge signing", "Photo card generator", "Content submission", "Announcements hub", "Video showcase", "Bilingual (Bangla & English)"],
    facts: [["For", "Bangladesh Election Commission Secretariat"]],
    features: [
      { title: "Pledge signing & boards", text: "A pledge form (name, phone, gender, date of birth, division, signature) whose signatures appear on a map-shaped pledge board." },
      { title: "Photo card generator", text: "Upload a photo, pick one of six branded frames and get a personalised #FutureBangladesh card with your name, previewed live." },
      { title: "Share Your Voice", text: "A content submission form for citizens to share their own posts and videos with a title and hashtags." },
      { title: "Voices for a Future Bangladesh", text: "A carousel of short videos from content hosts and influencers." },
      { title: "Announcements & resources", text: "Election schedule, code of conduct, postal-vote app guides and GBV referral pathways, each with a detail page." },
      { title: "Election schedule", text: "The CEC's schedule announcement video alongside a timeline of key dates up to polling day on 12 February." },
    ],
    thumbnail: "/projects/futurebangladesh/cover.jpg",
    images: [
      { src: "/projects/futurebangladesh/photocard.jpg", alt: "Photo card generator with frame picker and live preview", width: 1440, height: 934, caption: "Photo card generator with live preview", wide: true },
      { src: "/projects/futurebangladesh/pledge.jpg", alt: "Pledge signing form beside a map of Bangladesh filled with signatures", width: 1440, height: 1084, caption: "Pledge form and signature map" },
      { src: "/projects/futurebangladesh/announcements.jpg", alt: "Latest announcements carousel", width: 1440, height: 650, caption: "Announcements carousel" },
      { src: "/projects/futurebangladesh/schedule.jpg", alt: "13th National Parliamentary Election schedule announcement and timeline", width: 1440, height: 614, caption: "Election schedule and timeline", wide: true },
      { src: "/projects/futurebangladesh/voices.jpg", alt: "Voices for a Future Bangladesh influencer video carousel", width: 1440, height: 864, caption: "Creator video showcase", wide: true },
    ],
    liveUrl: "https://futurebangladeshyouwant.com/",
    githubUrl: null,
    extraLinks: [],
    role: null,
    challenges: null,
    solution: null,
    results: null,
    accent: "#0F7A5A",
  },
  {
    title: "ARTICLE 19 Bangladesh",
    slug: "article19-bangladesh",
    category: "Organisation Website",
    year: null,
    description:
      "A bilingual website for ARTICLE 19 Bangladesh — news, press releases, campaigns, resources and online application forms for the freedom-of-expression organisation.",
    longDescription:
      "A content-driven website for ARTICLE 19 Bangladesh, built at Catch Bangladesh Limited and currently in development. It is organised around who the organisation is, where it works and what it does — advocacy, research, citizen and stakeholder engagement and the SDGs — with a campaigns section and a resources hub for news, press releases, law & policy reviews, annual reports, infographics and audio-visual material. A Get Involved area covers calls for proposals, fellowships, employment, FAQs and contact, and application forms let visitors make submissions such as policy submissions online. The whole site switches between English and Bangla and includes an accessibility toolbar.",
    technologies: [],
    highlights: ["English / Bangla toggle", "News & press releases", "Campaigns", "Resources hub", "Online application forms", "Accessibility toolbar"],
    facts: [
      ["Built at", "Catch Bangladesh Limited"],
      ["Status", "In development"],
    ],
    features: [
      { title: "Bilingual content", text: "A site-wide ENG / BAN switch so every section is available in English and Bangla." },
      { title: "News & press releases", text: "Categorised, dated news with a latest-news carousel, a featured-news grid and detail pages, plus a press release section." },
      { title: "Campaigns", text: "A campaigns listing with individual campaign pages, also surfaced in the footer as latest campaigns." },
      { title: "Resources hub", text: "Law & policy reviews, annual reports, infographics and audio-visual material, each with its own listing." },
      { title: "Application forms", text: "Online submission forms, such as policy submissions, each with its own page and description." },
      { title: "Get Involved & accessibility", text: "Calls for proposals, fellowships, employment, FAQs and contact pages, plus an accessibility toolbar and newsletter sign-up." },
    ],
    thumbnail: null,
    images: [],
    liveUrl: null,
    githubUrl: null,
    extraLinks: [],
    role: null,
    challenges: null,
    solution: null,
    results: null,
    accent: "#D7261E",
  },
  {
    title: "Asset Management System",
    slug: "asset-management-system",
    category: "Management System",
    year: null,
    description:
      "An asset management system for CARE Bangladesh that organises assets into lots and assigns them, lot by lot, to volunteers.",
    longDescription:
      "An internal asset management system built for CARE Bangladesh. Its goal is to keep the organisation's assets organised by grouping them into lots and assigning each lot to the volunteers who use them, so the team always knows which assets belong to which lot and who they have been assigned to. I worked on the frontend integration, connecting the interface to the system's APIs.",
    technologies: [],
    highlights: ["Lot-wise asset organisation", "Volunteer assignment", "API integration"],
    facts: [["Client", "CARE Bangladesh"]],
    thumbnail: null,
    images: [],
    liveUrl: null,
    githubUrl: null,
    extraLinks: [],
    role: "Frontend integration",
    challenges: null,
    solution: null,
    results: null,
    accent: "#F28C28",
  },
  {
    title: "Neer",
    slug: "neer",
    category: "E-commerce Store",
    year: null,
    description:
      "A bilingual social-commerce marketplace for CODEC's BID4CJ project, selling handcrafted, eco-friendly products from women-led and climate-friendly businesses across Bangladesh.",
    longDescription:
      "Neer is a social-commerce platform developed under CODEC's BID4CJ Project. It connects climate-friendly businesses, women-led enterprises and youth entrepreneurs with local and international buyers, and unlike a traditional marketplace, every product represents a real entrepreneur. The storefront pairs a mission-led home page — Featured, Popular and New Arrivals carousels, shop-by-category cards, an About Neer story section and a partners wall — with a full marketplace page offering search across products and producers, category and max-price filters, and sorting by newest, popularity or price. Shoppers can add to cart, log in, subscribe to the newsletter and switch the whole site between English and Bangla.",
    technologies: [],
    highlights: ["Marketplace catalogue", "Search & filters", "Cart & accounts", "English / Bangla toggle", "Product carousels", "Newsletter"],
    facts: [["For", "CODEC — BID4CJ Project"]],
    features: [
      { title: "Mission-led home page", text: "A hero introducing the project, then Featured, Popular and New Arrivals product carousels and an About Neer story section." },
      { title: "Marketplace with filters", text: "Search products or producers, filter by category and maximum price, and sort by newest, popularity or price." },
      { title: "Product cards", text: "Category, stock badge, price in taka and a quick “+ Add” to cart on every card." },
      { title: "Shop by category", text: "Category cards for clothing, handcrafted bags and home decor, each linking to a filtered catalogue." },
      { title: "Bilingual storefront", text: "An EN / বাং switch in the header for the whole site." },
      { title: "Cart, accounts & community", text: "Cart and login, a newsletter sign-up, and a partners and supporters wall." },
    ],
    thumbnail: "/projects/neer/cover.jpg",
    images: [
      { src: "/projects/neer/catalogue.jpg", alt: "Neer All Products marketplace page with search, sort, category and price filters", width: 1440, height: 900, caption: "Marketplace: search, sort, category and price filters", wide: true },
      { src: "/projects/neer/featured.jpg", alt: "Handpicked for You featured product carousel", width: 1440, height: 680, caption: "Featured products carousel" },
      { src: "/projects/neer/about.jpg", alt: "About Neer section with illustration of entrepreneurs and the marketplace", width: 1440, height: 700, caption: "About Neer story section" },
      { src: "/projects/neer/categories.jpg", alt: "Shop by category cards for clothing, handcrafted bags and home decor", width: 1440, height: 440, caption: "Shop by category", wide: true },
      { src: "/projects/neer/partners.jpg", alt: "Partners and supporters logo wall", width: 1440, height: 330, caption: "Partners & supporters", wide: true },
    ],
    liveUrl: "https://neer.catchbangladesh.com/",
    githubUrl: null,
    extraLinks: [],
    role: null,
    challenges: null,
    solution: null,
    results: null,
    accent: "#2E5A27",
  },
];

/** AI section — capabilities framed as frontend engineering work. */
export const aiCapabilities = [
  {
    title: "Generative features",
    text: "Turning a prompt or a job description into structured output the UI can render — the core of QuickCV's AI CV, cover letter and application writer.",
    icon: "sparkles",
  },
  {
    title: "Streaming interfaces",
    text: "Rendering model output token-by-token so the product feels instant, with loading, retry and cancel states designed in.",
    icon: "zap",
  },
  {
    title: "Smart forms & workflows",
    text: "Forms that pre-fill, suggest and validate — AI assisting the user mid-task instead of living in a separate chat window.",
    icon: "workflow",
  },
  {
    title: "API orchestration",
    text: "Clean client and server boundaries for AI APIs: keys stay server-side, responses are typed, usage is metered (like QuickCV's coin system).",
    icon: "cpu",
  },
];

export const aiPipeline = [
  { label: "Interface", detail: "Vue · React · Next · Nuxt" },
  { label: "API layer", detail: "Routes · auth · rate limits" },
  { label: "AI model", detail: "Prompting · structured output" },
  { label: "Intelligent UI", detail: "Streamed, validated, rendered" },
];
