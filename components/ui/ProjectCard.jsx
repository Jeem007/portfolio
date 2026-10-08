import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, pad } from "@/lib/utils";
import ProjectCover from "./ProjectCover";
import TechBadge from "./TechBadge";

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border border-line-strong transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink"
    >
      <ArrowUpRight className="size-5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-6 group-hover:translate-x-6" />
      <ArrowUpRight className="absolute size-5 -translate-x-6 translate-y-6 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0" />
    </span>
  );
}

function Tags({ project }) {
  const tags = project.technologies?.length ? project.technologies : project.highlights || [];
  if (!tags.length) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label={project.technologies?.length ? "Technologies" : "Highlights"}>
      {tags.map((t) => (
        <li key={t}>
          <TechBadge>{t}</TechBadge>
        </li>
      ))}
    </ul>
  );
}

/**
 * variant "featured": full-width row, image left / details right.
 * variant "grid": stacked card for the two-column grid.
 */
export default function ProjectCard({ project, index, variant = "grid", priority = false }) {
  const featured = variant === "featured";
  const meta = [project.category, project.year].filter(Boolean).join(" · ");

  return (
    <article data-project-card className="group relative">
      <Link
        href={`/work/${project.slug}`}
        data-cursor="view"
        aria-label={`${project.title}: view project`}
        className={cn(
          "block rounded-[1.75rem] focus-visible:outline-offset-4",
          featured && "lg:grid lg:grid-cols-12 lg:items-center lg:gap-12"
        )}
      >
        <div className={cn("relative overflow-hidden rounded-[1.75rem] border border-line", featured && "lg:col-span-7")}>
          <ProjectCover
            project={project}
            index={index}
            priority={priority}
            className={featured ? "aspect-[16/10]" : "aspect-[4/3]"}
            sizes={featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          />
          <span className="absolute left-5 top-5 rounded-full border border-fg/10 bg-surface/70 px-3 py-1 font-mono text-[0.7rem] text-fg/80 backdrop-blur-md">
            {meta}
          </span>
          {featured && (
            <span className="absolute right-5 top-5 rounded-full bg-accent px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-accent-ink">
              Featured
            </span>
          )}
        </div>

        <div
          className={cn(
            "mt-6 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-1.5",
            featured ? "lg:col-span-5 lg:mt-0" : "flex items-start justify-between gap-6"
          )}
        >
          <div>
            <p className="font-mono text-xs text-accent">{pad(index + 1)}</p>
            <h3
              className={cn(
                "mt-2 font-semibold tracking-[-0.03em]",
                featured ? "text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[0.95]" : "text-2xl md:text-3xl"
              )}
            >
              {project.title}
            </h3>
            <p className={cn("mt-4 max-w-md leading-relaxed text-muted", featured && "md:text-lg")}>{project.description}</p>
          </div>
          {featured ? (
            <div className="mt-8 flex items-center gap-4">
              <Arrow />
              <span className="text-sm font-medium">View case study</span>
            </div>
          ) : (
            <div className="mt-6">
              <Arrow />
            </div>
          )}
        </div>
      </Link>

      <div className={cn("mt-5", featured && "lg:ml-[calc(58.333%+1.75rem)] lg:mt-6")}>
        <Tags project={project} />
      </div>
    </article>
  );
}
