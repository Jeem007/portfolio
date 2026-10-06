"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useGSAP } from "@/lib/gsap";
import { fadeUp } from "@/lib/animations";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { SocialIcon } from "@/components/ui/Icons";

export default function Contact() {
  const root = useRef(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      fadeUp(root.current.querySelectorAll("[data-contact-item]"), {
        trigger: root.current.querySelector("[data-contact-list]"),
        stagger: 0.08,
      });
    },
    { scope: root }
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = profile.socials.filter((s) => s.icon !== "mail");

  return (
    <section
      ref={root}
      id="contact"
      aria-labelledby="contact-title"
      className="noise relative isolate overflow-hidden border-t border-line bg-ink py-28 md:py-40"
    >
      {/* Slow drifting light + grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-50 mask-radial" />
        <div className="absolute left-[10%] top-[20%] size-[45vw] rounded-full bg-accent/[0.08] blur-[130px] animate-drift" />
        <div className="absolute bottom-[0%] right-[5%] size-[35vw] rounded-full bg-[#7c9cff]/[0.06] blur-[130px] animate-drift [animation-delay:-11s]" />
      </div>

      <div className="container-x">
        <p className="eyebrow mb-10 flex items-center gap-3">
          <span className="text-accent">07</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          Contact
        </p>

        <RevealText
          id="contact-title"
          className="text-display max-w-[14ch]"
          lines={["Have an idea?", [{ text: "Let's" }, { text: "build it.", className: "font-serif font-normal italic text-accent" }]]}
        />

        <div className="mt-16 flex flex-col gap-12 md:mt-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-6">
            <MagneticButton strength={0.4}>
              <a
                href={`mailto:${profile.email}`}
                className="group relative grid size-40 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-500 md:size-48"
              >
                <span className="flex flex-col items-center gap-1 text-center font-medium">
                  <ArrowUpRight
                    className="size-7 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-45"
                    aria-hidden="true"
                  />
                  Say hello
                </span>
                <span aria-hidden="true" className="absolute inset-0 rounded-full ring-1 ring-accent/50 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-125 group-hover:opacity-0" />
              </a>
            </MagneticButton>
          </div>

          <ul data-contact-list className="grid w-full gap-px overflow-hidden rounded-3xl border border-line bg-line lg:max-w-xl">
            <li data-contact-item className="flex items-center justify-between gap-4 bg-page p-5 md:p-6">
              <div className="min-w-0">
                <p className="eyebrow mb-1">Email</p>
                <a href={`mailto:${profile.email}`} className="link-underline break-all text-lg tracking-tight md:text-xl">
                  {profile.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-accent/50 hover:text-fg"
              >
                {copied ? <Check className="size-4 text-[#3ddc97]" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                <span className="sr-only">{copied ? "Email copied" : "Copy email address"}</span>
              </button>
              <span role="status" className="sr-only">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </li>
            {links.map((s) => (
              <li key={s.label} data-contact-item className="bg-page">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-surface md:p-6"
                >
                  <span className="flex items-center gap-4">
                    <SocialIcon name={s.icon} className="size-5 text-muted transition-colors group-hover:text-accent" />
                    <span>
                      <span className="block font-medium">{s.label}</span>
                      <span className="block font-mono text-xs text-subtle">{s.handle}</span>
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-5 text-muted transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
            <li data-contact-item className="flex items-center gap-4 bg-page p-5 md:p-6">
              <SocialIcon name="location" className="size-5 text-muted" />
              <span>
                <span className="block font-medium">Based in</span>
                <span className="block font-mono text-xs text-subtle">{profile.location}</span>
              </span>
              {profile.showPhone && (
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="ml-auto font-mono text-sm text-muted hover:text-fg">
                  {profile.phone}
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
