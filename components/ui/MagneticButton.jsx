"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/utils";

/**
 * Wraps an element and pulls it gently toward the cursor.
 * The first child moves a little further for a layered feel.
 */
export default function MagneticButton({ children, strength = 0.35, className }) {
  const ref = useRef(null);

  useGSAP(
    (ctx, contextSafe) => {
      const el = ref.current;
      if (!el || !isFinePointer() || prefersReducedMotion()) return;
      const inner = el.firstElementChild;
      const opts = { duration: 0.6, ease: "power3.out" };
      const xTo = gsap.quickTo(el, "x", opts);
      const yTo = gsap.quickTo(el, "y", opts);
      const ixTo = inner ? gsap.quickTo(inner, "x", opts) : null;
      const iyTo = inner ? gsap.quickTo(inner, "y", opts) : null;

      const move = contextSafe((e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        xTo(dx * strength);
        yTo(dy * strength);
        ixTo?.(dx * strength * 0.35);
        iyTo?.(dy * strength * 0.35);
      });
      const leave = contextSafe(() => {
        xTo(0);
        yTo(0);
        ixTo?.(0);
        iyTo?.(0);
      });

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
