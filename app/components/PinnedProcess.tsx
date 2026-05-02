"use client";

import { useEffect, useRef, useState } from "react";

export interface ProcessStep {
  n: string;
  k: string;
  t: string;
  d: string;
  weeks: string;
}

interface Props {
  steps: ProcessStep[];
}

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Pinned scroll: the .pp-track is tall (multi-viewport), the inner stage
 * sticks at top:0 while the user scrolls through. Scroll progress drives
 * which step is "active" and how filled the timeline ruler is.
 */
export default function PinnedProcess({ steps }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Disable pin behavior on small viewports (cards stack vertically instead).
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setProgress(0);
      return;
    }
    const update = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      setProgress(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled]);

  // 3 steps → segments [0, 0.33), [0.33, 0.66), [0.66, 1]
  // active idx via progress
  const activeIdx = enabled
    ? Math.min(steps.length - 1, Math.floor(progress * steps.length + 0.0001))
    : -1; // -1 → all visible (mobile)

  return (
    <div
      className={`pp-track${enabled ? "" : " pp-track--static"}`}
      ref={trackRef}
    >
      <div className="pp-stage">
        <div className="pp-grid">
          {steps.map((s, i) => {
            // per-step progress 0..1 within its segment
            const segStart = i / steps.length;
            const segEnd = (i + 1) / steps.length;
            const segP = Math.max(
              0,
              Math.min(1, (progress - segStart) / (segEnd - segStart))
            );
            const isActive = enabled ? activeIdx === i : true;
            const isPast = enabled ? activeIdx > i : false;
            return (
              <div
                key={s.n}
                className={
                  "pp-step" +
                  (isActive ? " pp-step--active" : "") +
                  (isPast ? " pp-step--past" : "")
                }
                style={{ ["--seg-p" as string]: segP.toFixed(3) }}
              >
                <div className="pp-step-marker">
                  <span className="pp-step-marker-num">{s.n}</span>
                  <span className="pp-step-marker-ring" />
                </div>
                <div className="pp-step-weeks">{s.weeks}</div>
                <div className="pp-step-kicker">{s.k}</div>
                <h3 className="pp-step-title">{s.t}</h3>
                <p className="pp-step-desc">{s.d}</p>
              </div>
            );
          })}
        </div>

        <div className="pp-timeline" aria-hidden="true">
          <div className="pp-timeline-rail" />
          <div
            className="pp-timeline-fill"
            style={{ width: `${progress * 100}%` }}
          />
          <div className="pp-timeline-ticks">
            {monthLabels.map((m, i) => (
              <div
                className="pp-timeline-tick"
                key={m}
                style={{ left: `${(i / 11) * 100}%` }}
              >
                <span className="pp-timeline-tick-mark" />
                <span className="pp-timeline-tick-label">{m}</span>
              </div>
            ))}
          </div>
          <div
            className="pp-timeline-cursor"
            style={{ left: `${progress * 100}%` }}
          >
            <span className="pp-timeline-cursor-dot" />
            <span className="pp-timeline-cursor-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
