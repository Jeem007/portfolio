"use client";

import { useRef } from "react";
import { skillGroups, otherLanguages } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { fadeUp } from "@/lib/animations";
import { cn, isFinePointer, pad, prefersReducedMotion } from "@/lib/utils";
import SectionTitle from "@/components/ui/SectionTitle";

// Brand-ish dots for the framework card; everything else uses the neutral palette.
const DOTS = { "Vue.js": "#42b883", "Nuxt.js": "#00dc82", React: "#61dafb", "Next.js": "#f5f5f5" };

const LAYOUT = {
  frameworks: "md:col-span-2 lg:col-span-4 lg:row-span-2",
  foundation: "lg:col-span-2",
  motion: "lg:col-span-2",
  integration: "md:col-span-2 lg:col-span-3",
  backend: "md:col-span-2 lg:col-span-3",
  tooling: "md:col-span-2 lg:col-span-6",
};

function SkillCard({ group, index }) {
  const featured = group.id === "frameworks";
  return (
    <article
      data-skill-card
      className={cn(
        "group/card relative overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-line-strong md:p-8",
        LAYOUT[group.id]
      )}
    >
      {/* Cursor spotlight — position comes from CSS vars set on pointermove */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(255 106 61 / 0.09), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight md:text-xl">{group.title}</h3>
            <p className="mt-1 max-w-xs text-sm text-muted">{group.blurb}</p>
          </div>
          <span className="font-mono text-xs text-subtle">{pad(index + 1)}</span>
        </div>

        {featured ? (
          <ul className="mt-10 grid flex-1 grid-cols-1 content-end gap-x-6 sm:grid-cols-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="group/item flex items-center justify-between border-t border-line py-4 text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-none tracking-[-0.04em]"
              >
                <span className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover/item:translate-x-2">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full transition-transform duration-500 group-hover/item:scale-150"
                  style={{ background: DOTS[item] }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-8 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 text-sm text-fg/90 transition-colors duration-300 hover:border-accent/50 hover:bg-accent/10"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {group.id === "motion" && (
          <svg aria-hidden="true" viewBox="0 0 200 80" className="mt-6 w-full text-accent" fill="none">
            <path d="M0 79.5H200M0.5 0V80" stroke="rgb(255 255 255 / 0.08)" />
            <path
              d="M0 80C60 80 70 2 200 2"
              stroke="currentColor"
              strokeWidth="1.5"
              pathLength="1"
              className="[stroke-dasharray:1] [stroke-dashoffset:0.62] transition-[stroke-dashoffset] duration-[1.4s] ease-[var(--ease-expo)] group-hover/card:[stroke-dashoffset:0]"
            />
            <circle cx="200" cy="2" r="2.5" fill="currentColor" />
          </svg>
        )}
      </div>
    </article>
  );
}

export default function Skills() {
  const root = useRef(null);

  useGSAP(
    (ctx, contextSafe) => {
      const cards = root.current.querySelectorAll("[data-skill-card]");
      fadeUp(cards, { trigger: root.current.querySelector("[data-skill-grid]"), stagger: 0.08, y: 40 });

      if (!isFinePointer() || prefersReducedMotion()) return;
      const cleanups = [];
      cards.forEach((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
        gsap.set(card, { transformPerspective: 1200 });
        const move = contextSafe((e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          card.style.setProperty("--mx", `${x * 100}%`);
          card.style.setProperty("--my", `${y * 100}%`);
          ry((x - 0.5) * 4);
          rx((0.5 - y) * 4);
        });
        const leave = contextSafe(() => {
          rx(0);
          ry(0);
        });
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });
      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root }
  );

  return (
    <section ref={root} id="skills" aria-labelledby="skills-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionTitle
          index="04"
          eyebrow="Skills & Tools"
          id="skills-title"
          lines={[[{ text: "The" }, { text: "toolkit", className: "font-serif font-normal italic text-accent" }], "behind the work."]}
        >
          <p className="mt-8 max-w-xl text-muted md:text-lg">
            No percentages, no fake meters — just the stack I reach for, grouped by what it helps me build.
          </p>
        </SectionTitle>

        <div data-skill-grid className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.id} group={group} index={i} />
          ))}
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-subtle">
          Also comfortable in — {otherLanguages.join(" · ")}
        </p>
      </div>
    </section>
  );
}
