"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { revealWords } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Masked word-by-word reveal.
 * `lines` is an array of strings, or of arrays of segments ({ text, className })
 * so individual words can be styled (e.g. a serif italic accent).
 */
export default function RevealText({
  as: Tag = "h2",
  lines,
  className,
  lineClassName,
  stagger = 0.07,
  delay = 0,
  scroll = true,
  start = "top 85%",
  id,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      revealWords(ref.current.querySelectorAll("[data-word]"), {
        trigger: ref.current,
        stagger,
        delay,
        scroll,
        start,
      });
    },
    { scope: ref }
  );

  const normalised = lines.map((line) => (typeof line === "string" ? [{ text: line }] : line));

  return (
    <Tag ref={ref} id={id} className={className}>
      {normalised.map((segments, li) => (
        <span key={li} className={cn("block", lineClassName)}>
          {segments.map((seg, si) => {
            const words = seg.text.split(" ").filter(Boolean);
            return words.map((word, wi) => (
              <span key={`${si}-${wi}`}>
                <span className="reveal-mask">
                  <span data-word className={cn("js-hide", seg.className)}>
                    {word}
                  </span>
                </span>
                {(wi < words.length - 1 || si < segments.length - 1) && " "}
              </span>
            ));
          })}
        </span>
      ))}
    </Tag>
  );
}
