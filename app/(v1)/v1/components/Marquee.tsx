"use client";

import { ReactNode } from "react";

export default function Marquee({
  items,
  speed = 60,
}: {
  items: ReactNode[];
  speed?: number;
}) {
  // duplicate so the loop is seamless
  const looped = [...items, ...items];
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
