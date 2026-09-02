"use client";

import { ReactNode } from "react";

export default function Marquee({
  items,
  speed = 60,
}: {
  items: ReactNode[];
  speed?: number;
}) {
  // Four copies, animating through two of them (-50%): the trailing two
  // always cover the viewport, so the reset point can never show a gap
  // even on very wide screens where one copy is narrower than the container.
  const looped = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee">
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {looped.map((it, i) => (
          <span className="marquee-item" key={i}>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
