# Md Rakib Hasan — Portfolio

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · GSAP + ScrollTrigger · Three.js / React Three Fiber · Lenis

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) before deploying — it drives canonical URLs, OpenGraph, sitemap and robots.

## Updating content

All personal content lives in **`data/portfolio.js`** — components only read from it.

- **Projects** — the main focus of the site. Add an object to `projects`; set `featured: true` for the large full-width layout. Category filter buttons are generated automatically from `category`. Drop images in `public/projects/<slug>/` and set `thumbnail` / `images`. Without a thumbnail a generated, tinted cover is shown. `challenges`, `solution`, `results`, `role`, `year` appear on `/work/<slug>` only when filled in.
- **Experience** — `experience` (horizontal-scroll track; newest first).
- **Education** — `education` and `certifications` (separate section).
- **Skills** — `skillGroups` (bento cards), `marqueeItems`, `otherLanguages`.
- **Stats** — `stats`; the years figure is computed from `careerStart`.
- **Resume** — replace `public/resume/…` and update `profile.resumeUrl` (a PDF is recommended).
- **Phone** — stored but hidden; set `profile.showPhone = true` to display it.

## Structure

```
app/                 layout (metadata, JSON-LD, fonts), page, /work/[slug], sitemap, robots, OG image
components/layout    Navbar, MobileMenu, Footer
components/sections  Hero, HeroVisual, Marquee, Projects, About, Experience, Skills, AIIntegration, Education, Contact
components/three     HeroScene (canvas), ParticleMorph (shader points), shapes (code → interface → neural formations)
components/ui        Button, MagneticButton, RevealText, SectionTitle, TechBadge, ProjectCard, ProjectCover, Icons
components/providers SmoothScroll (Lenis), CustomCursor, ScrollProgress
lib/                 gsap (plugin registration), animations (reusable tweens), scroll, utils
```

## Performance notes

- The WebGL hero is a separate chunk (`next/dynamic`, `ssr:false`) mounted on browser idle; a CSS silhouette shows meanwhile.
- The hero is one Points draw call; morphing happens in the vertex shader. The loop stops when the hero is off-screen.
- Particle count scales with device tier (9k / 6k / 3.5k); `PerformanceMonitor` drops DPR if FPS falls.
- `prefers-reduced-motion` disables Lenis, GSAP sequences, parallax, pinning and 3D motion.
