"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { gsap } from "@/lib/gsap";
import { getPerformanceTier, isFinePointer, prefersReducedMotion } from "@/lib/utils";
import ParticleMorph from "./ParticleMorph";

const COUNTS = { high: 9000, medium: 6000, low: 3500 };
const INTRO_DURATION = 2.6;

/** Scales the formation to whatever box the canvas gets. */
function Fit({ children }) {
  const viewport = useThree((s) => s.viewport);
  const scale = Math.min(1.25, viewport.width / 5.6, viewport.height / 3.6);
  return <group scale={scale}>{children}</group>;
}

/**
 * Self-contained WebGL hero. Mount client-side only (next/dynamic, ssr:false).
 * `entranceDelay` (s) aligns the particle assembly with the hero copy.
 */
export default function HeroScene({ entranceDelay = 0.6, onReady, onPhase }) {
  const container = useRef(null);
  const pointer = useRef({ x: 0, y: 0, nx: 0, ny: 0, active: false });
  const intro = useRef({ p: 0, startAt: Infinity });
  const [inView, setInView] = useState(true);
  const [config] = useState(() => {
    const reduced = prefersReducedMotion();
    return { tier: getPerformanceTier(), reduced, interactive: !reduced && isFinePointer() };
  });
  const [dpr, setDpr] = useState(() => Math.min(config.tier === "low" ? 1.5 : 2, window.devicePixelRatio || 1));

  // Pointer lives in a ref and is read in the render loop — no React renders on mousemove.
  useEffect(() => {
    if (!config.interactive) return;
    const onMove = (e) => {
      const p = pointer.current;
      p.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.y = (e.clientY / window.innerHeight) * 2 - 1;
      const r = container.current.getBoundingClientRect();
      p.nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      p.ny = -((e.clientY - r.top) / r.height) * 2 + 1;
      p.active = Math.abs(p.nx) < 1.1 && Math.abs(p.ny) < 1.1;
    };
    const onLeave = () => {
      Object.assign(pointer.current, { x: 0, y: 0, active: false });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [config.interactive]);

  // Stop rendering entirely when the hero is off-screen.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(container.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const target = intro.current;
    return () => gsap.killTweensOf(target);
  }, []);

  const handleCreated = () => {
    if (config.reduced) {
      intro.current.p = 1;
    } else {
      // The R3F clock starts with the canvas, so the morph start can be scheduled up front.
      intro.current.startAt = entranceDelay + INTRO_DURATION * 0.85;
      gsap.to(intro.current, { p: 1, duration: INTRO_DURATION, ease: "power2.out", delay: entranceDelay });
    }
    onReady?.();
  };

  return (
    <div ref={container} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={dpr}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 8], fov: 35, near: 0.1, far: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false, depth: false }}
        onCreated={handleCreated}
        style={{ touchAction: "pan-y" }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} flipflops={2} />
        <Fit>
          <ParticleMorph
            count={COUNTS[config.tier]}
            pointer={pointer}
            intro={intro}
            animate={!config.reduced}
            interactive={config.interactive}
            onPhase={onPhase}
          />
        </Fit>
      </Canvas>
    </div>
  );
}
