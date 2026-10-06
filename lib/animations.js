"use client";

import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./utils";

/**
 * Reusable GSAP building blocks. Every helper is meant to be called inside a
 * `useGSAP(() => ..., { scope })` callback so tweens & triggers are collected by
 * gsap.context() and reverted automatically on unmount.
 */

export const EASE = {
  out: "power3.out",
  expo: "expo.out",
  inOut: "power2.inOut",
};

/** Masked line/word reveal: children slide up from behind an overflow:hidden mask. */
export function revealWords(targets, { trigger, start = "top 85%", stagger = 0.08, delay = 0, scroll = true } = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return null;
  if (prefersReducedMotion()) {
    gsap.set(els, { yPercent: 0, opacity: 1 });
    return null;
  }
  return gsap.fromTo(
    els,
    { yPercent: 110, rotate: 2.5, opacity: 0 },
    {
      yPercent: 0,
      rotate: 0,
      opacity: 1,
      duration: 1.1,
      ease: EASE.expo,
      stagger,
      delay,
      scrollTrigger: scroll ? { trigger: trigger || els[0], start, once: true } : undefined,
    }
  );
}

/** Soft fade-up for blocks of content (cards, paragraphs). */
export function fadeUp(targets, { trigger, start = "top 85%", stagger = 0.1, y = 32, delay = 0, duration = 0.9 } = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return null;
  if (prefersReducedMotion()) {
    gsap.set(els, { opacity: 1, y: 0 });
    return null;
  }
  return gsap.fromTo(
    els,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: EASE.out,
      scrollTrigger: { trigger: trigger || els[0], start, once: true },
    }
  );
}

/** Scrubbed parallax on a single element. Skipped under reduced motion. */
export function parallax(target, { trigger, amount = 80, start = "top bottom", end = "bottom top" } = {}) {
  if (prefersReducedMotion() || !target) return null;
  return gsap.fromTo(
    target,
    { y: -amount / 2 },
    { y: amount / 2, ease: "none", scrollTrigger: { trigger: trigger || target, start, end, scrub: true } }
  );
}

/** Count a number up when it scrolls into view, writing into el.textContent. */
export function countUp(el, value, { decimals = 0, trigger, duration = 1.6 } = {}) {
  if (!el) return null;
  const format = (v) => v.toFixed(decimals);
  if (prefersReducedMotion()) {
    el.textContent = format(value);
    return null;
  }
  const state = { v: 0 };
  el.textContent = format(0);
  return gsap.to(state, {
    v: value,
    duration,
    ease: "power2.out",
    scrollTrigger: { trigger: trigger || el, start: "top 90%", once: true },
    onUpdate: () => {
      el.textContent = format(state.v);
    },
  });
}

export function refreshScroll() {
  ScrollTrigger.refresh();
}
