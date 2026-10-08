"use client";

import { useRef } from "react";
import { ArrowDown, Download } from "lucide-react";
import { profile } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import { SocialIcon } from "@/components/ui/Icons";
import HeroVisual from "./HeroVisual";

// Name is the headline: first names on one line, surname in the accent serif below.
const nameParts = profile.name.split(" ");
const HEADLINE = [
  [{ text: nameParts.slice(0, -1).join(" ") }],
  [{ text: nameParts.at(-1), className: "font-serif font-normal italic text-accent pr-[0.08em]" }],
];

const ROLE = [
  { text: profile.role },
  { text: "&", className: "font-serif italic text-accent" },
  { text: profile.secondaryRole },
];

function Words({ segments }) {
  return segments.map((seg, si) =>
    seg.text.split(" ").map((word, wi, arr) => (
      <span key={`${si}-${wi}`}>
        <span className="reveal-mask">
          <span data-hero-word className={seg.className}>
            {word}
          </span>
        </span>
        {(wi < arr.length - 1 || si < segments.length - 1) && " "}
      </span>
    ))
  );
}

export default function Hero() {
  const root = useRef(null);
  const heroStart = useRef(0);

  useGSAP(
    () => {
      heroStart.current = performance.now();
      const q = gsap.utils.selector(root);

      if (prefersReducedMotion()) {
        gsap.set(q("[data-hero-anim]"), { opacity: 1 });
        return;
      }

      // Words sit inside masks; their parent lines are revealed at once.
      gsap.set(q("[data-hero-line]"), { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      tl.fromTo(q("[data-hero-intro]"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 })
        .fromTo(
          q("[data-hero-word]"),
          { yPercent: 115, rotate: 3 },
          { yPercent: 0, rotate: 0, duration: 1.25, stagger: 0.075 },
          "-=0.55"
        )
        .fromTo(q("[data-hero-copy]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
        .fromTo(q("[data-hero-cta]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, "-=0.75")
        .fromTo(q("[data-hero-social]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, "-=0.6")
        .fromTo(q("[data-hero-meta]"), { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.3")
        .fromTo(q("[data-hero-bg]"), { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.out" }, 0.9)
        .fromTo(q("[data-hero-visual]"), { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" }, 0.8);

      // Gentle parallax as the hero scrolls away.
      gsap.to(q("[data-hero-text]"), {
        yPercent: -12,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-24 md:pt-28"
    >
      {/* Background */}
      <div data-hero-anim data-hero-bg aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-radial opacity-70" />
        <div className="absolute right-[-10%] top-[10%] size-[55vw] max-w-[900px] rounded-full bg-accent/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] size-[40vw] rounded-full bg-[#7c9cff]/[0.05] blur-[120px]" />
      </div>

      <div className="container-x grid flex-1 items-center gap-6 lg:grid-cols-[1.08fr_1fr] lg:gap-4">
        <div data-hero-text className="relative z-10 pt-6 lg:pt-0">
          <p data-hero-anim data-hero-intro className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-2 pr-4 text-xs text-muted backdrop-blur">
            <span className="size-2 rounded-full bg-[#3ddc97] animate-pulse-dot" aria-hidden="true" />
            {profile.currentTitle} at {profile.currentCompany}
          </p>

          <p data-hero-anim data-hero-intro className="mb-4 font-mono text-sm text-muted">
            Hello, I&apos;m
          </p>

          <h1
            id="hero-title"
            className="text-[clamp(3.25rem,16vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] lg:text-[clamp(4.75rem,7.4vw,8.25rem)]"
          >
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden="true">
              {HEADLINE.map((segments, i) => (
                <span key={i} data-hero-anim data-hero-line className="block">
                  <Words segments={segments} />
                </span>
              ))}
            </span>
          </h1>

          <p
            data-hero-anim
            data-hero-line
            className="mt-6 text-[clamp(1.2rem,2.1vw,1.85rem)] font-medium leading-snug tracking-[-0.02em] text-fg/85"
          >
            <span className="sr-only">
              {profile.role} and {profile.secondaryRole}
            </span>
            <span aria-hidden="true">
              <Words segments={ROLE} />
            </span>
          </p>

          <p data-hero-anim data-hero-copy className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
            {profile.headline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <div data-hero-anim data-hero-cta>
              <MagneticButton strength={0.3}>
                <Button href="#work" icon={ArrowDown}>
                  View My Work
                </Button>
              </MagneticButton>
            </div>
            <div data-hero-anim data-hero-cta>
              <MagneticButton strength={0.3}>
                <Button href={profile.resumeUrl} variant="ghost" icon={Download} download>
                  Download Resume
                </Button>
              </MagneticButton>
            </div>
          </div>

          <ul className="mt-10 flex items-center gap-2" aria-label="Social profiles">
            {profile.socials.map((s) => (
              <li key={s.label} data-hero-anim data-hero-social>
                <a
                  href={s.href}
                  target={s.icon === "mail" ? undefined : "_blank"}
                  rel={s.icon === "mail" ? undefined : "noopener noreferrer"}
                  className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent/50 hover:text-fg"
                >
                  <SocialIcon name={s.icon} className="size-4" />
                  <span className="sr-only">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-hero-anim
          data-hero-visual
          className="relative -mx-4 h-[min(78vw,440px)] sm:mx-0 sm:h-[min(70vw,520px)] lg:h-[min(72vh,680px)]"
        >
          <HeroVisual heroStart={heroStart} />
        </div>
      </div>

      <div data-hero-anim data-hero-meta className="container-x flex items-end justify-between pb-8 pt-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-subtle">
        <span>{profile.location}</span>
        <a href="#about" className="group hidden items-center gap-3 hover:text-fg sm:flex">
          Scroll to explore
          <span className="relative h-8 w-px overflow-hidden bg-line-strong" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-hint_1.8s_ease-in-out_infinite] bg-accent" />
          </span>
        </a>
      </div>
    </section>
  );
}
