"use client";

import { useRef } from "react";
import { useReveal } from "./useReveal";

const MONTHS = ["JAN", "MAR", "MAY", "JUL", "SEP", "NOV"];

/**
 * Decorative savings-timeline panel for the homepage tools band, in the
 * calculator-chart style: dark panel, grid, declining copper curve with a
 * marker at the default planning month. The line draws in when scrolled
 * into view. The $85K tag matches the hero estimator's default output.
 */
export default function ToolsTeaserChart() {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useReveal(ref);

  return (
    <div ref={ref} className={`tt-panel${shown ? " is-drawn" : ""}`}>
      <svg viewBox="0 0 440 250" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="tt-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(217,119,87,0.30)" />
            <stop offset="1" stopColor="rgba(217,119,87,0)" />
          </linearGradient>
        </defs>

        {/* grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`h${i}`}
            x1="24"
            x2="416"
            y1={30 + i * 42}
            y2={30 + i * 42}
            stroke="rgba(245,235,220,0.07)"
          />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={`v${i}`}
            x1={44 + i * 70}
            x2={44 + i * 70}
            y1="22"
            y2="202"
            stroke="rgba(245,235,220,0.05)"
          />
        ))}

        {/* declining savings curve */}
        <path
          className="tt-line"
          d="M44 40 C 120 52, 180 84, 240 124 C 300 164, 350 188, 414 198"
          stroke="var(--copper)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          className="tt-area"
          d="M44 40 C 120 52, 180 84, 240 124 C 300 164, 350 188, 414 198 L 414 202 L 44 202 Z"
          fill="url(#tt-fill)"
        />

        {/* marker at the default planning month (MAY) */}
        <line
          className="tt-marker-line"
          x1="184"
          x2="184"
          y1="22"
          y2="202"
          stroke="rgba(217,119,87,0.4)"
          strokeDasharray="2 5"
        />
        <circle className="tt-dot" cx="184" cy="88" r="5.5" fill="var(--copper)" />
        <circle
          className="tt-dot-ring"
          cx="184"
          cy="88"
          r="11"
          fill="none"
          stroke="rgba(217,119,87,0.4)"
        />

        {/* value tag */}
        <g className="tt-tag">
          <rect
            x="200"
            y="64"
            width="152"
            height="34"
            rx="8"
            fill="rgba(10,14,26,0.85)"
            stroke="rgba(245,235,220,0.14)"
          />
          <text
            x="216"
            y="86"
            fill="var(--pearl)"
            fontSize="14"
            fontWeight="500"
          >
            $85K still open
          </text>
        </g>

        {/* month axis */}
        {MONTHS.map((m, i) => (
          <text
            key={m}
            x={44 + i * 70}
            y="228"
            textAnchor="middle"
            fontSize="10"
            letterSpacing="0.1em"
            fill={m === "MAY" ? "var(--copper)" : "rgba(245,235,220,0.35)"}
          >
            {m}
          </text>
        ))}
      </svg>
    </div>
  );
}
