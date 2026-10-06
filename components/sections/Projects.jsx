"use client";

import { useMemo, useRef, useState } from "react";
import { projects } from "@/data/portfolio";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn, pad, prefersReducedMotion } from "@/lib/utils";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ui/ProjectCard";

const ALL = "All";

/** Featured projects first, then the rest in data order. Index is the project's number on the site. */
function arrange(list) {
  const withIndex = list.map((p) => ({ project: p, index: projects.indexOf(p) }));
  return {
    featured: withIndex.filter((x) => x.project.featured),
    rest: withIndex.filter((x) => !x.project.featured),
  };
}

export default function Projects() {
  const root = useRef(null);
  const [filter, setFilter] = useState(ALL);
  const firstRender = useRef(true);

  const categories = useMemo(() => [ALL, ...new Set(projects.map((p) => p.category).filter(Boolean))], []);
  const visible = filter === ALL ? projects : projects.filter((p) => p.category === filter);
  const { featured, rest } = arrange(visible);

  // Scroll reveal on first load; a quick fade when the filter changes.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray(root.current.querySelectorAll("[data-project-card]"));
      if (firstRender.current) {
        firstRender.current = false;
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 80, clipPath: "inset(10% 5% 0% 5% round 28px)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              duration: 1.3,
              ease: "expo.out",
              clearProps: "clipPath",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            }
          );
        });
        return;
      }
      // Drop any first-load reveals still waiting, so cards don't animate twice.
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger?.matches?.("[data-project-card]") && root.current.contains(st.trigger)) st.kill();
      });
      gsap.set(cards, { clipPath: "none" });
      gsap.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "expo.out" });
    },
    { scope: root, dependencies: [filter], revertOnUpdate: false }
  );

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionTitle
          index="01"
          eyebrow="Selected Work"
          id="work-title"
          lines={["Products I've", [{ text: "helped build", className: "font-serif font-normal italic text-accent" }]]}
        />

        <div className="mb-14 flex flex-col gap-6 border-y border-line py-5 md:mb-20 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter projects by category" className="-mx-1 flex flex-wrap gap-2">
            {categories.map((c) => {
              const count = c === ALL ? projects.length : projects.filter((p) => p.category === c).length;
              const active = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                    active
                      ? "border-fg bg-fg text-page"
                      : "border-line-strong text-muted hover:border-white/30 hover:text-fg"
                  )}
                >
                  {c}
                  <span className={cn("font-mono text-[0.65rem]", active ? "text-page/60" : "text-subtle")}>{pad(count)}</span>
                </button>
              );
            })}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle" aria-live="polite">
            Showing {pad(visible.length)} of {pad(projects.length)}
          </p>
        </div>

        {featured.length > 0 && (
          <div className="flex flex-col gap-20 md:gap-28">
            {featured.map(({ project, index }, i) => (
              <ProjectCard key={project.slug} project={project} index={index} variant="featured" priority={i === 0} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className={cn("grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24", featured.length > 0 && "mt-20 md:mt-28")}>
            {rest.map(({ project, index }, i) => (
              <div key={project.slug} className={i % 2 ? "md:mt-32" : undefined}>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        )}

        <p className="mt-24 flex items-center gap-3 border-t border-line pt-8 font-mono text-xs uppercase tracking-[0.16em] text-subtle md:mt-32">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          More projects and full case studies are on the way.
        </p>
      </div>
    </section>
  );
}
