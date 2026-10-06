"use client";

import { useRef } from "react";
import { profile, stats, careerStart } from "@/data/portfolio";
import { useGSAP } from "@/lib/gsap";
import { countUp, fadeUp, parallax } from "@/lib/animations";
import { yearsSince } from "@/lib/utils";
import RevealText from "@/components/ui/RevealText";

export default function About() {
  const root = useRef(null);
  const years = yearsSince(careerStart);

  const resolved = stats.map((s) => ({ ...s, value: s.value === "years" ? years : s.value }));

  useGSAP(
    () => {
      const q = (sel) => root.current.querySelectorAll(sel);
      fadeUp(q("[data-about-para]"), { trigger: q("[data-about-bio]")[0], stagger: 0.12 });
      fadeUp(q("[data-stat]"), { trigger: q("[data-stats]")[0], stagger: 0.08 });
      q("[data-count]").forEach((el) => {
        countUp(el, Number(el.dataset.count), { decimals: Number(el.dataset.decimals || 0) });
      });
      parallax(q("[data-about-orb]")[0], { trigger: root.current, amount: 160 });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="relative py-28 md:py-40">
      <div
        data-about-orb
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-24 size-64 rounded-full bg-accent/[0.06] blur-[90px]"
      />
      <div className="container-x">
        <p className="eyebrow mb-10 flex items-center gap-3">
          <span className="text-accent">02</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          About
        </p>

        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <RevealText
            id="about-title"
            className="text-heading"
            lines={[
              "More than code.",
              [{ text: "I build" }, { text: "experiences.", className: "font-serif font-normal italic text-accent" }],
            ]}
          />

          <div data-about-bio className="flex flex-col gap-6 text-base leading-relaxed text-muted md:text-lg lg:pt-4">
            {profile.bio.map((p, i) => (
              <p key={i} data-about-para className={i === 0 ? "text-fg" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <dl data-stats className="mt-20 grid grid-cols-2 border-t border-line md:mt-28 lg:grid-cols-4">
          {resolved.map((s, i) => (
            <div
              key={s.label}
              data-stat
              className="group relative flex flex-col-reverse gap-3 border-b border-line py-8 pr-4 odd:border-r md:py-10 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:px-8 lg:first:pl-0"
            >
              <dt className="text-sm leading-snug text-muted">
                {s.label}
                <span className="mt-1 block font-mono text-[0.7rem] text-subtle">{s.source}</span>
              </dt>
              <dd className="text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-none tracking-[-0.05em]">
                <span data-count={s.value} data-decimals={s.decimals || 0} suppressHydrationWarning>
                  {s.decimals ? s.value.toFixed(s.decimals) : s.value}
                </span>
                <span className="text-accent">{s.suffix}</span>
              </dd>
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[var(--ease-expo)] group-hover:w-full"
              />
              {i === 0 && <span className="sr-only">Calculated from a January 2024 start date.</span>}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
