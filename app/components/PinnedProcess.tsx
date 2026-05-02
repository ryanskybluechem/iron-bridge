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

export default function PinnedProcess({ steps }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeMonthIdx, setActiveMonthIdx] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let prevActive = -1;
    let prevMonth = -1;
    let raf = 0;
    let queued = false;

    const compute = () => {
      queued = false;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        el.style.setProperty("--p", "0");
        return;
      }
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));

      // Drive fill + cursor from a single CSS variable; no React work per frame.
      el.style.setProperty("--p", p.toFixed(4));

      const newActive = Math.min(
        steps.length - 1,
        Math.floor(p * steps.length + 0.0001)
      );
      if (newActive !== prevActive) {
        prevActive = newActive;
        setActiveIdx(newActive);
      }
      const newMonth = Math.max(0, Math.min(11, Math.round(p * 11)));
      if (newMonth !== prevMonth) {
        prevMonth = newMonth;
        setActiveMonthIdx(newMonth);
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled, steps.length]);

  const activeStep = enabled ? steps[activeIdx] : null;

  return (
    <div
      className={`pp-track${enabled ? "" : " pp-track--static"}`}
      ref={trackRef}
    >
      <div className="pp-stage">
        <div className="pp-grid">
          {steps.map((s, i) => {
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
          <div className="pp-timeline-fill" />

          <div className="pp-timeline-ticks">
            {monthLabels.map((m, i) => {
              const isActive = enabled && i === activeMonthIdx;
              const isPast = enabled && i < activeMonthIdx;
              return (
                <div
                  className={
                    "pp-timeline-tick" +
                    (isActive ? " pp-timeline-tick--active" : "") +
                    (isPast ? " pp-timeline-tick--past" : "")
                  }
                  key={m}
                  style={{ left: `${(i / 11) * 100}%` }}
                >
                  <span className="pp-timeline-tick-mark" />
                  <span className="pp-timeline-tick-label">{m}</span>
                </div>
              );
            })}
          </div>

          <div className="pp-timeline-cursor">
            <div className="pp-timeline-pill">
              <span className="pp-timeline-pill-num">
                {activeStep?.n ?? "01"}
              </span>
              <span className="pp-timeline-pill-text">
                {(activeStep?.k ?? "Plan").toUpperCase()}
              </span>
            </div>
            <span className="pp-timeline-cursor-stem" />
            <span className="pp-timeline-cursor-dot" />
            <span className="pp-timeline-cursor-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
