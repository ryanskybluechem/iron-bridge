"use client";

import { useRef } from "react";
import { useReveal } from "./useReveal";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** how far below the final position the element starts (px) */
  y?: number;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const shown = useReveal(ref);

  const style: React.CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "translate3d(0,0,0)" : `translate3d(0, ${y}px, 0)`,
    transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: "transform, opacity",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
