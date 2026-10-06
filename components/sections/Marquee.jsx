"use client";

import { useRef } from "react";
import { marqueeItems } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { cn } from "@/lib/utils";

function Row({ items, outline, reverse, speed }) {
  const track = useRef(null);

  useGSAP(
    (ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      const tween = gsap.fromTo(
        track.current,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: speed, ease: "none", repeat: -1 }
      );
      const row = track.current.parentElement;
      const slow = contextSafe(() => gsap.to(tween, { timeScale: 0.2, duration: 0.8, ease: "power2.out" }));
      const resume = contextSafe(() => gsap.to(tween, { timeScale: 1, duration: 0.8, ease: "power2.inOut" }));
      row.addEventListener("pointerenter", slow);
      row.addEventListener("pointerleave", resume);

      // Pause entirely while off-screen.
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tween.play() : tween.pause()));
      io.observe(row);
      return () => {
        io.disconnect();
        row.removeEventListener("pointerenter", slow);
        row.removeEventListener("pointerleave", resume);
      };
    },
    { scope: track }
  );

  const content = [...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div ref={track} className="flex w-max will-change-transform">
        {content.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length ? "true" : undefined}
            className={cn(
              "flex shrink-0 items-center whitespace-nowrap font-semibold uppercase tracking-[-0.03em]",
              outline
                ? "text-[clamp(1.5rem,3.5vw,3rem)] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.22)]"
                : "text-[clamp(2.5rem,7vw,6.5rem)] text-fg"
            )}
          >
            <span className="px-[0.35em]">{item}</span>
            <span aria-hidden="true" className={cn("text-[0.5em]", outline ? "text-white/20" : "text-accent")}>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Technologies I work with" className="relative border-y border-line bg-ink py-8 mask-fade-x md:py-12">
      <Row items={marqueeItems} speed={38} />
      <Row items={[...marqueeItems].reverse()} outline reverse speed={48} />
    </section>
  );
}
