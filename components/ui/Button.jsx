import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-accent text-accent-ink hover:bg-accent-soft shadow-[0_0_0_1px_rgb(255_106_61/0.4),0_10px_40px_-10px_rgb(255_106_61/0.55)]",
  ghost: "border border-line-strong bg-white/[0.02] text-fg hover:border-white/30 hover:bg-white/[0.05]",
};

/** Link-styled button with an arrow that slides out and back in on hover. */
export default function Button({
  href,
  children,
  variant = "primary",
  icon: Icon = ArrowUpRight,
  className,
  external,
  ...rest
}) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      data-cursor="link"
      className={cn(
        "group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full pl-6 pr-2 text-sm font-medium tracking-tight transition-colors duration-300",
        variants[variant],
        className
      )}
      {...ext}
      {...rest}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "relative grid size-8 place-items-center overflow-hidden rounded-full",
          variant === "primary" ? "bg-accent-ink/90 text-accent" : "bg-white/10 text-fg"
        )}
      >
        <Icon className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-5 group-hover:-translate-y-5" />
        <Icon className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </a>
  );
}
