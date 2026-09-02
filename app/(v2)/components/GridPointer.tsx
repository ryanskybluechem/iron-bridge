"use client";

import { useEffect } from "react";

const SELECTOR = ".calculators, .pullquote, .sp-section--dark";

/**
 * One document-level pointer tracker for every section that carries the
 * blueprint grid. Sets --mx/--my (px, section-local) on whichever gridded
 * section the cursor is over, so the grid's spotlight mask follows the
 * mouse; clears the vars when the cursor leaves so the section falls back
 * to its resting spotlight. Renders nothing.
 */
export default function GridPointer() {
  useEffect(() => {
    let raf = 0;
    let last: PointerEvent | null = null;
    let lit: HTMLElement | null = null;

    const apply = () => {
      raf = 0;
      if (!last) return;
      const target = last.target as Element | null;
      const section = (target?.closest?.(SELECTOR) ?? null) as HTMLElement | null;
      if (lit && lit !== section) {
        lit.style.removeProperty("--mx");
        lit.style.removeProperty("--my");
      }
      if (section) {
        const r = section.getBoundingClientRect();
        section.style.setProperty("--mx", `${last.clientX - r.left}px`);
        section.style.setProperty("--my", `${last.clientY - r.top}px`);
      }
      lit = section;
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      if (lit) {
        lit.style.removeProperty("--mx");
        lit.style.removeProperty("--my");
      }
    };
  }, []);

  return null;
}
