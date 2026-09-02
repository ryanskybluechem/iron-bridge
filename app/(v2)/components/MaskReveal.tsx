"use client";

import { useRef } from "react";
import { useReveal } from "./useReveal";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Direction the mask wipes from. */
  from?: "bottom" | "left";
}

/**
 * Wraps content in a clip-path mask that wipes open when scrolled into view.
 * The inner element also lifts up slightly for an Apple-style swing.
 */
export default function MaskReveal({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const shown = useReveal(ref);

  const hiddenClip =
    from === "bottom" ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)";
  const innerHidden =
    from === "bottom" ? "translate3d(0, 110%, 0)" : "translate3d(-8%, 0, 0)";

  return (
    <div
      ref={ref}
      className={`mask-reveal ${className}`.trim()}
      style={{
        clipPath: shown ? "inset(0 0 0 0)" : hiddenClip,
        WebkitClipPath: shown ? "inset(0 0 0 0)" : hiddenClip,
        transition: `clip-path 1.05s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, -webkit-clip-path 1.05s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      <div
        className="mask-reveal-inner"
        style={{
          transform: shown ? "translate3d(0,0,0)" : innerHidden,
          transition: `transform 1.05s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
