import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Project imagery. Uses `project.thumbnail` when provided; until then renders
 * a generated, clearly abstract cover tinted with `project.accent`
 * (no fake screenshots).
 */
export default function ProjectCover({ project, index = 0, priority = false, className, sizes }) {
  if (project.thumbnail) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={project.thumbnail}
          alt={`${project.title} preview`}
          fill
          priority={priority}
          sizes={sizes || "(min-width: 1024px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-[1.05]"
        />
      </div>
    );
  }

  const accent = project.accent || "#d4430f";
  const variant = index % 4;

  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden bg-raised", className)}
      style={{ "--c": accent }}
    >
      <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-[1.05]">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at ${variant % 2 ? "15%" : "85%"} 0%, color-mix(in oklab, ${accent} 38%, transparent), transparent 60%), linear-gradient(180deg, #fbfaf7, #efede8)`,
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-60 mask-radial" />

        {/* Abstract browser frame */}
        <div className="absolute inset-x-[9%] bottom-0 top-[16%] rounded-t-2xl border border-fg/10 bg-surface/90 shadow-[0_-20px_80px_-30px_var(--c)]">
          <div className="flex items-center gap-1.5 border-b border-fg/[0.06] px-4 py-3">
            <span className="size-2 rounded-full bg-fg/15" />
            <span className="size-2 rounded-full bg-fg/15" />
            <span className="size-2 rounded-full bg-fg/15" />
            <span className="ml-3 h-2 w-1/3 rounded-full bg-fg/[0.06]" />
          </div>
          <div className="grid h-full grid-cols-12 gap-3 p-5">
            {variant === 0 && (
              <>
                <div className="col-span-7 space-y-2.5">
                  <div className="h-3 w-3/4 rounded bg-fg/15" />
                  <div className="h-2 w-full rounded bg-fg/[0.07]" />
                  <div className="h-2 w-5/6 rounded bg-fg/[0.07]" />
                  <div className="mt-4 h-7 w-28 rounded-full" style={{ background: accent }} />
                </div>
                <div className="col-span-5 rounded-lg border border-fg/[0.06] bg-fg/[0.03]" />
              </>
            )}
            {variant === 1 && (
              <>
                <div className="col-span-3 space-y-2 border-r border-fg/[0.06] pr-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-2 rounded bg-fg/[0.08]" style={i === 1 ? { background: accent } : undefined} />
                  ))}
                </div>
                <div className="col-span-9 grid grid-cols-3 content-start gap-2.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 rounded-lg border border-fg/[0.06] bg-fg/[0.03]" />
                  ))}
                  <div className="col-span-3 flex h-20 items-end gap-1.5 rounded-lg border border-fg/[0.06] bg-fg/[0.02] p-3">
                    {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 5 ? accent : "rgb(17 17 17 / 0.1)" }} />
                    ))}
                  </div>
                </div>
              </>
            )}
            {(variant === 2 || variant === 3) && (
              <div className="col-span-12 grid grid-cols-3 content-start gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div
                      className="aspect-square rounded-lg border border-fg/[0.06]"
                      style={{ background: i === (variant === 2 ? 1 : 4) ? `color-mix(in oklab, ${accent} 35%, #fff)` : "rgb(17 17 17 / 0.03)" }}
                    />
                    <div className="h-1.5 w-2/3 rounded bg-fg/[0.08]" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-fg/15 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-20" />
    </div>
  );
}
