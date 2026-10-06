"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/utils";

/**
 * Dot + trailing ring. Elements opt in with data-cursor="link" (ring grows)
 * or data-cursor="view" (ring becomes a VIEW label). Desktop pointers only.
 */
export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!isFinePointer()) return;
    const reduce = prefersReducedMotion();
    const root = document.documentElement;

    const ctx = gsap.context(() => {
      gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, opacity: 0 });
      const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
      const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });
      const rx = gsap.quickTo(ring.current, "x", { duration: reduce ? 0.12 : 0.5, ease: "power3.out" });
      const ry = gsap.quickTo(ring.current, "y", { duration: reduce ? 0.12 : 0.5, ease: "power3.out" });

      let visible = false;
      let mode = "default";

      const setMode = (next) => {
        if (next === mode) return;
        mode = next;
        const big = next === "view";
        const link = next === "link";
        gsap.to(ring.current, {
          width: big ? 88 : link ? 52 : 34,
          height: big ? 88 : link ? 52 : 34,
          backgroundColor: big ? "rgba(255,106,61,0.95)" : link ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0)",
          borderColor: big ? "rgba(255,106,61,0)" : "rgba(255,255,255,0.35)",
          duration: 0.45,
          ease: "expo.out",
        });
        gsap.to(label.current, { opacity: big ? 1 : 0, scale: big ? 1 : 0.6, duration: 0.3 });
        gsap.to(dot.current, { scale: next === "default" ? 1 : 0, duration: 0.3 });
      };

      const onMove = (e) => {
        if (!visible) {
          visible = true;
          root.classList.add("has-custom-cursor");
          gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
          gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
        }
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      };
      const onOver = (e) => {
        const target = e.target.closest?.("[data-cursor], a, button, [role='button']");
        setMode(target ? target.getAttribute("data-cursor") || "link" : "default");
      };
      const onLeave = () => {
        visible = false;
        gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      ctx.revert();
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={dot} className="fixed left-0 top-0 size-1.5 rounded-full bg-fg opacity-0" />
      <div
        ref={ring}
        className="fixed left-0 top-0 grid size-[34px] place-items-center rounded-full border border-white/35 opacity-0"
      >
        <span ref={label} className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-accent-ink opacity-0">
          VIEW
        </span>
      </div>
    </div>
  );
}
