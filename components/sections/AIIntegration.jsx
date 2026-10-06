"use client";

import { useRef } from "react";
import { Cpu, Sparkles, Workflow, Zap, ArrowUp } from "lucide-react";
import { aiCapabilities, aiPipeline } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { fadeUp } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/utils";
import SectionTitle from "@/components/ui/SectionTitle";

const ICONS = { sparkles: Sparkles, zap: Zap, workflow: Workflow, cpu: Cpu };

const DEMO_PROMPT = "Tailor my CV summary to this Frontend Developer job description.";
const DEMO_RESPONSE =
  "Done — I've rewritten your summary to lead with Vue.js and Nuxt.js, moved REST API integration into your first bullet and matched the role's wording on component libraries. Want a cover letter too?";

function Pipeline() {
  return (
    <ol className="relative grid gap-3" aria-label="How AI features flow through a frontend">
      {aiPipeline.map((step, i) => (
        <li key={step.label} data-ai-step className="relative">
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface/80 px-5 py-4 backdrop-blur">
            <span
              data-ai-node
              className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-xs text-muted"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className="font-medium tracking-tight">{step.label}</p>
              <p className="truncate font-mono text-xs text-subtle">{step.detail}</p>
            </div>
            <span data-ai-pulse aria-hidden="true" className="ml-auto size-1.5 rounded-full bg-white/15" />
          </div>
          {i < aiPipeline.length - 1 && (
            <span aria-hidden="true" className="absolute left-[2.3rem] top-full block h-3 w-px overflow-hidden bg-line-strong">
              <span data-ai-link className="block h-full w-full origin-top bg-accent" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function ChatDemo() {
  return (
    <figure className="overflow-hidden rounded-3xl border border-line bg-surface">
      <figcaption className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-subtle">Interface demo · streaming</span>
        <span className="flex items-center gap-2 font-mono text-[0.7rem] text-muted">
          <span className="size-1.5 rounded-full bg-[#3ddc97]" aria-hidden="true" />
          live
        </span>
      </figcaption>
      <div className="space-y-4 p-5">
        <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-white/[0.06] px-4 py-3 text-sm">{DEMO_PROMPT}</p>
        <div className="flex gap-3">
          <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
            <Sparkles className="size-3.5" />
          </span>
          <p className="text-sm leading-relaxed text-fg/90">
            {DEMO_RESPONSE.split(" ").map((w, i) => (
              <span key={i} data-ai-token className="inline">
                {w}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-line px-5 py-3">
        <span className="flex-1 truncate text-sm text-subtle">Ask a follow-up…</span>
        <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-fg text-page">
          <ArrowUp className="size-4" />
        </span>
      </div>
    </figure>
  );
}

export default function AIIntegration() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = (s) => root.current.querySelectorAll(s);
      fadeUp(q("[data-ai-cap]"), { trigger: q("[data-ai-caps]")[0], stagger: 0.08 });

      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      const buildStory = (scrollTrigger) => {
        const tl = gsap.timeline({ scrollTrigger });
        q("[data-ai-step]").forEach((step, i) => {
          const node = step.querySelector("[data-ai-node]");
          const pulse = step.querySelector("[data-ai-pulse]");
          const link = step.querySelector("[data-ai-link]");
          tl.to(node, { backgroundColor: "#ff6a3d", color: "#1a0a04", borderColor: "#ff6a3d", duration: 0.3 }, i * 0.5)
            .to(pulse, { backgroundColor: "#3ddc97", duration: 0.3 }, i * 0.5);
          if (link) tl.fromTo(link, { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: "none" }, i * 0.5 + 0.2);
        });
        tl.fromTo(q("[data-ai-token]"), { opacity: 0.08 }, { opacity: 1, stagger: 0.04, duration: 0.1, ease: "none" }, 1.6);
        return tl;
      };

      // Desktop: pin the stage while the pipeline lights up and the reply streams in.
      mm.add("(min-width: 1024px)", () => {
        buildStory({
          trigger: q("[data-ai-stage]")[0],
          start: "top top+=96",
          end: "+=900",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        });
      });

      // Smaller screens: same story, played once as it enters, no pinning.
      mm.add("(max-width: 1023px)", () => {
        buildStory({ trigger: q("[data-ai-stage]")[0], start: "top 70%", once: true }).duration(3);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="ai" aria-labelledby="ai-title" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[140px]" />
      </div>
      <div className="container-x">
        <SectionTitle
          index="05"
          eyebrow="AI Integration"
          id="ai-title"
          lines={["Building interfaces", [{ text: "that think.", className: "font-serif font-normal italic text-accent" }]]}
        >
          <p className="mt-8 max-w-2xl text-muted md:text-lg">
            AI is only as good as the interface around it. I build the frontend half — the prompts, states, streaming and
            guardrails that turn a model API into a feature people actually use. QuickCV, one of the products in my
            portfolio, does exactly this — it generates tailored CVs, cover letters and job applications from a job
            description.
          </p>
        </SectionTitle>

        <div data-ai-stage className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
          <Pipeline />
          <ChatDemo />
        </div>

        <ul data-ai-caps className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {aiCapabilities.map((cap) => {
            const Icon = ICONS[cap.icon];
            return (
              <li key={cap.title} data-ai-cap className="group bg-page p-6 transition-colors duration-500 hover:bg-surface md:p-8">
                <Icon className="size-5 text-accent transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden="true" />
                <h3 className="mt-8 text-lg font-semibold tracking-tight">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{cap.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
