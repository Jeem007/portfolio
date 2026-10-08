"use client";

import { useRef } from "react";
import { education, certifications } from "@/data/portfolio";
import { useGSAP } from "@/lib/gsap";
import { fadeUp } from "@/lib/animations";
import RevealText from "@/components/ui/RevealText";
import TechBadge from "@/components/ui/TechBadge";

export default function Education() {
  const root = useRef(null);

  useGSAP(
    () => {
      fadeUp(root.current.querySelectorAll("[data-edu-row]"), { trigger: root.current.querySelector("[data-edu-list]"), stagger: 0.08 });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="education" aria-labelledby="education-title" className="relative py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="text-accent">06</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            Education
          </p>
          <RevealText
            id="education-title"
            className="text-[clamp(2.25rem,4vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
            lines={["Education &", [{ text: "certifications", className: "font-serif font-normal italic text-accent" }]]}
          />
        </div>

        <div>
          <ol data-edu-list className="border-t border-line">
            {education.map((e) => (
              <li
                key={e.degree}
                data-edu-row
                className="group grid grid-cols-[4rem_1fr] gap-x-6 gap-y-1 border-b border-line py-6 transition-colors duration-500 hover:bg-fg/[0.015] sm:grid-cols-[5rem_1fr_auto] sm:items-baseline md:py-8"
              >
                <span className="font-mono text-sm text-subtle">{e.year}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1 md:text-xl">
                    {e.degree}
                  </h3>
                  <p className="mt-1 text-muted">{e.school}</p>
                </div>
                <span className="col-start-2 mt-2 font-mono text-sm text-accent-soft sm:col-start-3 sm:mt-0">{e.result}</span>
              </li>
            ))}
          </ol>

          {certifications.length > 0 && (
            <div data-edu-row className="mt-10 flex flex-wrap items-center gap-3">
              <span className="eyebrow mr-2">Certifications</span>
              {certifications.map((c) => (
                <TechBadge key={c}>{c}</TechBadge>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
