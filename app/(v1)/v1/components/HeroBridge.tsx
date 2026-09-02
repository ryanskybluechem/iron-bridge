"use client";

/**
 * Decorative animated suspension-bridge silhouette layered above the shader.
 * Cables draw on load; deck shimmer pulses subtly.
 */
export default function HeroBridge() {
  return (
    <svg
      className="hero-bridge"
      viewBox="0 0 1440 540"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hb-cable" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d97757" stopOpacity="0.0" />
          <stop offset="35%" stopColor="#d97757" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#d97757" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="hb-deck" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f5ebdc" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#f5ebdc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f5ebdc" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="hb-tower" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f5ebdc" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#f5ebdc" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* Two main suspension catenaries */}
      <path
        className="hb-path hb-path--1"
        d="M 0 460 C 220 220 420 220 720 360 C 1020 500 1220 500 1440 320"
        stroke="url(#hb-cable)"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        className="hb-path hb-path--2"
        d="M 0 500 C 240 300 440 280 720 400 C 1000 520 1200 540 1440 380"
        stroke="url(#hb-cable)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />

      {/* Deck line */}
      <line
        className="hb-deck"
        x1="0"
        y1="478"
        x2="1440"
        y2="478"
        stroke="url(#hb-deck)"
        strokeWidth="1"
      />

      {/* Two towers */}
      <rect
        className="hb-tower"
        x="318"
        y="200"
        width="2"
        height="278"
        fill="url(#hb-tower)"
      />
      <rect
        className="hb-tower"
        x="1120"
        y="220"
        width="2"
        height="258"
        fill="url(#hb-tower)"
      />
    </svg>
  );
}
