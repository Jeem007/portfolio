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
  { value: 4, suffix: "", label: "Products in the portfolio", source: "QuickCV, SMICEE, NextCart, E-Commerce" },
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
      "QuickCV lets anyone create a professional CV and automatically get a personal portfolio website without writing code. It offers multiple customisable CV templates and uses AI to generate tailored CVs, cover letters and job applications from job descriptions. It runs on a coin-based system, with free coins on registration, and every profile gets a shareable online portfolio.",
    technologies: [],
    highlights: ["AI generation", "CV templates", "Portfolio builder", "Coin system"],
    thumbnail: null,
    images: [],
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
      "SMICEE is an ERP system spanning HR management (policy, compliance, asset management, payroll, leave), project management, sales management (leads, quotations, purchase orders, invoices), finance and accounts (accounts, budgets, payments), client & vendor management, and administrative operations — helping organisations streamline and automate their regular work.",
    technologies: [],
    highlights: ["HR & payroll", "Sales pipeline", "Finance", "Project management"],
    thumbnail: null,
    images: [],
    liveUrl: "https://revive.smicee.com/auth/login",
    githubUrl: null,
    extraLinks: [],
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
      "NextCart is an e-commerce platform for seamless online shopping, with product management, order processing, inventory control, customer relationship management and advanced analytics. It pairs a user-friendly interface with secure payment gateways and operational tools that help businesses grow sales. Working with my team, we've built 10 e-commerce themes for the platform.",
    technologies: [],
    highlights: ["10 themes shipped", "Inventory & orders", "CRM", "Analytics"],
    thumbnail: null,
    images: [],
    liveUrl: "https://nextcart.app/free-website-making-software/",
    githubUrl: null,
    extraLinks: [],
    role: "Team member — theme development",
    challenges: null,
    solution: null,
    results: "10 e-commerce themes built with the team.",
    accent: "#3DDC97",
  },
  {
    title: "E-Commerce Web Application",
    slug: "ecommerce-web-app",
    category: "Full-stack Web App",
    year: null,
    description:
      "A Laravel storefront with customer purchasing, verification and validation flows, and SSLCommerz for secure payments.",
    longDescription:
      "An e-commerce web application built with Laravel, PHP, CSS, JavaScript and Blade templates. Customers can purchase products, the app handles verification and validation, and payments go through the SSLCommerz gateway for secure transactions.",
    technologies: ["Laravel", "PHP", "Blade", "JavaScript", "CSS", "SSLCommerz"],
    highlights: [],
    thumbnail: null,
    images: [],
    liveUrl: null,
    githubUrl: "https://github.com/Jeem007/ECommerce",
    extraLinks: [],
    role: null,
    challenges: null,
    solution: null,
    results: null,
    accent: "#F5C451",
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
