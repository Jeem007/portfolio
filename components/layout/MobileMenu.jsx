"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll } from "@/lib/scroll";
import { pad } from "@/lib/utils";
import { SocialIcon } from "@/components/ui/Icons";

export default function MobileMenu({ open, onClose, href }) {
  const root = useRef(null);
  const tl = useRef(null);

  useGSAP(
    () => {
      gsap.set(root.current, { autoAlpha: 0 });
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { autoAlpha: 1 })
        .fromTo(
          "[data-menu-bg]",
          { clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" },
          { clipPath: "circle(150% at calc(100% - 2.5rem) 2rem)", duration: 0.8, ease: "power3.inOut" }
        )
        .fromTo("[data-menu-item]", { yPercent: 110 }, { yPercent: 0, stagger: 0.05, duration: 0.7, ease: "expo.out" }, "-=0.35")
        .fromTo("[data-menu-foot]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");
    },
    { scope: root }
  );

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      tl.current.timeScale(1).play();
      lockScroll(true);
      root.current.querySelector("[data-menu-close]")?.focus();
    } else {
      tl.current.timeScale(1.6).reverse();
      lockScroll(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      // Keep focus inside the dialog.
      if (e.key === "Tab") {
        const f = root.current.querySelectorAll("a, button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={root}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="invisible fixed inset-0 z-[70] lg:hidden"
    >
      <div data-menu-bg className="absolute inset-0 bg-surface bg-grid" />
      <div className="relative flex h-full flex-col container-x">
        <div className="flex h-16 items-center justify-between">
          <span className="eyebrow">Menu</span>
          <button
            data-menu-close
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full border border-line-strong bg-page"
          >
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <ul className="mt-10 flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <li key={link.id} className="overflow-hidden">
              <a
                data-menu-item
                href={href(link.id)}
                onClick={() => {
                  // Restart smooth scroll synchronously so the anchor scroll isn't swallowed.
                  lockScroll(false);
                  onClose();
                }}
                className="flex items-baseline gap-4 py-1 text-[clamp(2.5rem,12vw,4.5rem)] font-semibold leading-none tracking-[-0.04em]"
              >
                <span className="font-mono text-xs font-normal tracking-normal text-accent">{pad(i + 1)}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div data-menu-foot className="mt-auto flex flex-col gap-5 border-t border-line pb-10 pt-6">
          <a href={`mailto:${profile.email}`} className="text-lg tracking-tight">
            {profile.email}
          </a>
          <div className="flex gap-3">
            {profile.socials
              .filter((s) => s.icon !== "mail")
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 place-items-center rounded-full border border-line-strong"
                >
                  <SocialIcon name={s.icon} className="size-4" />
                  <span className="sr-only">{s.label}</span>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
