"use client";

import Link from "next/link";
import { useRef } from "react";

/**
 * The closing CTA card. A faint blueprint grid lives on the panel and
 * lights up around the cursor (CSS vars --mx/--my drive a mask); pointers
 * that never hover (touch) just see the subtle static grid.
 */
export default function SpCtaCard({
  title,
  body,
  label,
}: {
  title: string;
  body: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      className="sp-cta-inner"
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.removeProperty("--mx");
        el.style.removeProperty("--my");
      }}
    >
      <div className="sp-cta-grid" aria-hidden="true" />
      <div className="sp-cta-glow" aria-hidden="true" />
      <div className="sp-cta-content">
        <div>
          <h2 className="sp-cta-title">{title}</h2>
          <p className="sp-cta-body">{body}</p>
        </div>
        <Link href="/contact" className="btn btn-primary">
          {label}{" "}
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
