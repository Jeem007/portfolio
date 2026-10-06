"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PHASES } from "@/components/three/shapes";
import { cn } from "@/lib/utils";

// Three.js is split into its own chunk and never rendered on the server.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Defers WebGL until the browser is idle so the hero copy paints first.
 * Phase captions are plain HTML so they stay crisp at any resolution.
 */
export default function HeroVisual({ heroStart }) {
  const [delay, setDelay] = useState(null);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Line the particle assembly up with the end of the headline reveal.
    const start = () => {
      if (!supportsWebGL()) return;
      const elapsed = (performance.now() - (heroStart?.current ?? 0)) / 1000;
      setDelay(Math.max(0, 0.9 - elapsed));
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 900 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, [heroStart]);

  return (
    <div className="relative h-full w-full">
      {/* Soft light behind the formation */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.08] blur-[90px]"
      />

      {/* Fallback glyph shown until WebGL is ready (or if it never is) */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 grid place-items-center font-mono text-[clamp(5rem,14vw,11rem)] font-light tracking-tighter text-white/[0.06] transition-opacity duration-1000",
          ready ? "opacity-0" : "opacity-100"
        )}
      >
        &lt;/&gt;
      </div>

      {delay !== null && <HeroScene entranceDelay={delay} onReady={() => setReady(true)} onPhase={setPhase} />}

      <ol
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-6 font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-opacity duration-1000 sm:gap-10",
          ready ? "opacity-100" : "opacity-0"
        )}
      >
        {PHASES.map((p, i) => (
          <li key={p.id} className={cn("flex items-center gap-2 transition-colors duration-700", i === phase ? "text-fg" : "text-subtle/60")}>
            <span className={cn("h-px transition-all duration-700", i === phase ? "w-6 bg-accent" : "w-3 bg-white/20")} />
            {p.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
