export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Whole years since a date, never less than 1. */
export function yearsSince(isoDate, now = new Date()) {
  const start = new Date(isoDate);
  let years = now.getFullYear() - start.getFullYear();
  const m = now.getMonth() - start.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < start.getDate())) years -= 1;
  return Math.max(1, years);
}

export function pad(n, size = 2) {
  return String(n).padStart(size, "0");
}

/** Rough device capability tier used to scale WebGL cost. */
export function getPerformanceTier() {
  if (typeof window === "undefined") return "high";
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 8;
  const small = window.innerWidth < 768;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (small || cores <= 4 || memory <= 4) return "low";
  if (coarse || window.innerWidth < 1280 || cores <= 6) return "medium";
  return "high";
}
