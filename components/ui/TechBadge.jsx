import { cn } from "@/lib/utils";

export default function TechBadge({ children, className, tone = "default" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-wide",
        tone === "accent" ? "border-accent/40 bg-accent/10 text-accent-soft" : "border-line bg-white/[0.03] text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
