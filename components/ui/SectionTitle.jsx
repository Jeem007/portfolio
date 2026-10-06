import RevealText from "./RevealText";
import { cn } from "@/lib/utils";

export default function SectionTitle({ index, eyebrow, lines, id, className, children }) {
  return (
    <header className={cn("mb-14 md:mb-20", className)}>
      <p className="eyebrow mb-6 flex items-center gap-3">
        {index && <span className="text-accent">{index}</span>}
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        <span>{eyebrow}</span>
      </p>
      <RevealText id={id} lines={lines} className="text-heading text-balance" />
      {children}
    </header>
  );
}
