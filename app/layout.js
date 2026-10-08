import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { profile, site } from "@/data/portfolio";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/providers/CustomCursor";
import ScrollProgress from "@/components/providers/ScrollProgress";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = `${profile.name} — ${profile.role} & ${profile.secondaryRole}`;
const description = `${profile.name} is a ${profile.role.toLowerCase()} in ${profile.location} building fast, interactive web experiences with Vue.js, Nuxt.js, React, Next.js and AI integration. ${profile.currentTitle} at ${profile.currentCompany}.`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Rakib Hasan",
    "Frontend Developer",
    "Frontend Developer Bangladesh",
    "Vue.js Developer",
    "Nuxt.js Developer",
    "React Developer",
    "Next.js Developer",
    "JavaScript",
    "AI Integration",
    "Creative Web Developer",
    "Dhaka",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    title,
    description,
    locale: site.locale,
    firstName: "Md Rakib",
    lastName: "Hasan",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#f7f6f2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: site.url,
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.currentTitle,
    description: profile.summary,
    email: `mailto:${profile.email}`,
    url: site.url,
    worksFor: { "@type": "Organization", name: profile.currentCompany },
    alumniOf: { "@type": "CollegeOrUniversity", name: "American International University – Bangladesh" },
    address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
    knowsAbout: ["Vue.js", "Nuxt.js", "React", "Next.js", "JavaScript", "Tailwind CSS", "GSAP", "REST APIs", "AI integration"],
    sameAs: profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available before paint so animated elements can start hidden without a flash. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-sm focus:text-page"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
