"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navLinks, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";
import MobileMenu from "./MobileMenu";

export default function Navbar({ home = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  const href = (id) => (home ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section that occupies the middle of the viewport.
  useEffect(() => {
    if (!home) return;
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [home]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled ? "border-b border-line bg-page/70 backdrop-blur-xl" : "border-b border-transparent"
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between md:h-[4.5rem]">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full"
            aria-label={`${profile.name} — home`}
          >
            <span className="grid size-9 place-items-center rounded-full border border-line-strong bg-surface font-mono text-xs font-semibold tracking-tight transition-colors group-hover:border-accent/60">
              {profile.initials}
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              {profile.name}
              <span className="ml-2 font-mono text-[0.7rem] text-subtle">/ frontend</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur-md lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={href(link.id)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-[0.8rem] transition-colors duration-300",
                    active === link.id ? "bg-white/[0.07] text-fg" : "text-muted hover:text-fg"
                  )}
                >
                  {active === link.id && (
                    <span aria-hidden="true" className="absolute left-1.5 top-1/2 size-1 -translate-y-1/2 rounded-full bg-accent" />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <MagneticButton strength={0.25}>
              <a
                href={href("contact")}
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-fg px-5 text-[0.8rem] font-medium text-page transition-colors hover:bg-accent hover:text-accent-ink"
              >
                Let&apos;s Talk
                <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </MagneticButton>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full border border-line-strong bg-surface lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
                <span className="h-px w-full bg-fg" />
                <span className="h-px w-2/3 self-end bg-fg" />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          menuButton.current?.focus();
        }}
        href={href}
      />
    </>
  );
}
