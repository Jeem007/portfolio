"use client";

import { useRef } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { experience } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { pad, prefersReducedMotion } from "@/lib/utils";
import RevealText from "@/components/ui/RevealText";
import TechBadge from "@/components/ui/TechBadge";

function RolePanel({ item, index }) {
  return (
    <article
      data-xp-panel
      className="relative flex w-[86vw] max-w-[1120px] shrink-0 snap-center flex-col overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:w-[78vw] md:p-10 lg:w-[72vw] lg:flex-row lg:gap-14 lg:p-14"
    >
      {/* Oversized index in the background */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-4 select-none text-[clamp(10rem,22vw,20rem)] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(17_17_17/0.06)]"
      >
        {pad(index + 1)}
      </span>

      <div className="relative flex flex-col lg:w-[45%]">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
          <time>
            {item.start} — {item.end}
          </time>
          {item.current && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-widest text-accent">
              Now
            </span>
          )}
        </div>
        <h3 className="mt-6 text-[clamp(2rem,4.2vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">{item.role}</h3>
        <p className="mt-3 text-lg text-fg/80">{item.company}</p>
        {item.location && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-subtle">
            <MapPin className="size-3.5" aria-hidden="true" />
            {item.location}
          </p>
        )}
        <p className="mt-8 max-w-md leading-relaxed text-muted">{item.description}</p>
      </div>

      <div className="relative mt-10 flex flex-col lg:mt-0 lg:w-[55%]">
        {item.responsibilities.length > 0 && (
          <>
            <p className="eyebrow mb-4">What I do</p>
            <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {item.responsibilities.map((r, i) => (
                <li key={r} className="flex items-baseline gap-3 bg-surface px-4 py-3.5 text-sm text-fg/90 sm:[&:last-child:nth-child(odd)]:col-span-2">
                  <span className="font-mono text-[0.65rem] text-accent">{pad(i + 1)}</span>
                  {r}
                </li>
              ))}
            </ol>
          </>
        )}
        {item.technologies.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label="Technologies">
            {item.technologies.map((t) => (
              <li key={t}>
                <TechBadge>{t}</TechBadge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default function Experience() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const viewport = root.current.querySelector("[data-xp-viewport]");
      const track = root.current.querySelector("[data-xp-track]");
      const bar = root.current.querySelector("[data-xp-progress]");

      // Pin the section and translate the track as the page scrolls, on every screen size.
      // If the section is taller than the viewport (phones), pin once its bottom reaches
      // the bottom of the screen so the whole panel has been read before it slides.
      gsap.set(viewport, { overflow: "visible" });
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const range = {
        trigger: root.current,
        start: () => (root.current.offsetHeight > window.innerHeight ? "bottom bottom" : "top top"),
        end: () => `+=${distance()}`,
        invalidateOnRefresh: true,
      };

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { ...range, pin: true, scrub: 0.8, anticipatePin: 1 },
      });
      gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { ...range, scrub: true } });

      // Panels ease in as they travel into view.
      gsap.utils.toArray(track.querySelectorAll("[data-xp-panel]")).forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0.25, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="experience"
      aria-labelledby="experience-title"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden py-24 lg:py-0"
    >
      {/* Small screens: heading sits above the swipeable track */}
      <div className="container-x mb-10 lg:hidden">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="text-accent">03</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          Experience
        </p>
        <h2 className="text-heading">
          Where I&apos;ve <span className="font-serif font-normal italic text-accent">worked</span>
        </h2>
        <p className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-subtle">
          Scroll <ArrowRight className="size-4 text-accent" aria-hidden="true" />
        </p>
      </div>

      <div
        data-xp-viewport
        className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div data-xp-track className="flex w-max snap-x snap-mandatory items-stretch gap-5 px-4 sm:px-6 lg:gap-8 lg:px-10 lg:py-24">
          {/* Intro panel */}
          <div className="hidden w-[34vw] shrink-0 flex-col justify-between py-2 lg:flex">
            <div>
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="text-accent">03</span>
                <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
                Experience
              </p>
              <RevealText
                id="experience-title"
                className="text-heading"
                lines={["Where I've", [{ text: "worked", className: "font-serif font-normal italic text-accent" }]]}
              />
              <p className="mt-8 max-w-sm leading-relaxed text-muted">Professional roles, newest first.</p>
            </div>
            <p className="mt-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-subtle">
              <span>Scroll</span>
              <ArrowRight className="size-4 text-accent" aria-hidden="true" />
              <span>
                {pad(experience.length)} {experience.length === 1 ? "role" : "roles"}
              </span>
            </p>
          </div>

          {experience.map((item, i) => (
            <RolePanel key={`${item.company}-${item.role}`} item={item} index={i} />
          ))}

          {/* Closing panel */}
          <div className="flex w-[70vw] shrink-0 snap-end flex-col justify-center rounded-[2rem] border border-dashed border-line-strong p-8 sm:w-[46vw] lg:w-[30vw] lg:p-12">
            <p className="eyebrow">Next chapter</p>
            <p className="mt-4 text-[clamp(1.6rem,2.1vw,2.1rem)] font-semibold leading-tight text-balance tracking-[-0.03em]">
              Building something worth joining?
            </p>
            <a href="#contact" className="link-underline mt-8 inline-flex w-fit items-center gap-2 text-accent">
              Let&apos;s talk
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="container-x absolute inset-x-0 bottom-10">
        <div className="h-px w-full bg-line">
          <div data-xp-progress className="h-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </section>
  );
}
