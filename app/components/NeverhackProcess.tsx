"use client";

import { useEffect, useRef, useState } from "react";
import ScrollShader from "./ScrollShader";

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

const DOTS_PER_GAP = 14;

/**
 * Neverhack-inspired pinned scroll section. Section pins to the viewport
 * across a multi-screen scroll; content crossfades between the steps; a
 * copper-pearl glow blob morphs across the canvas behind the text; a
 * hairline cross divides the stage into quadrants. The bottom progress
 * indicator is a dotted "01 …… 02 …… 03" sequence whose dots fill in
 * proportional to scroll progress.
 *
 * All scroll-driven motion is wired through a single --p variable on the
 * track so CSS can interpolate everything (no per-frame React re-renders).
 */
export default function NeverhackProcess({ steps }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);
  const [enabled, setEnabled] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setActiveIdx(0);
      return;
    }

    let prevActive = -1;
    let queued = false;
    let raf = 0;

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
      el.style.setProperty("--p", p.toFixed(4));
      progressRef.current = p;

      // Active step from progress, with a slight forward bias so the new
      // slide commits a touch before the midpoint.
      const newActive = Math.min(
        steps.length - 1,
        Math.max(0, Math.floor(p * steps.length + 0.18))
      );
      if (newActive !== prevActive) {
        prevActive = newActive;
        setActiveIdx(newActive);
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

  return (
    <div
      className={`nh-track${enabled ? "" : " nh-track--static"}`}
      ref={trackRef}
    >
      <div className="nh-stage">
        <div className="nh-shader" aria-hidden="true">
          <ScrollShader progressRef={progressRef} />
        </div>

        <div className="nh-cross" aria-hidden="true">
          <div className="nh-cross-h" />
          <div className="nh-cross-v" />
        </div>

        <div className="nh-corner nh-corner--tl" aria-hidden="true">
          <span>NH-01</span>
          <span>·</span>
          <span>SEQ</span>
        </div>
        <div className="nh-corner nh-corner--tr" aria-hidden="true">
          <span>The Iron Bridge method</span>
        </div>

        <div className="nh-slides">
          {steps.map((s, i) => (
            <article
              key={s.n}
              className={
                "nh-slide" + (activeIdx === i ? " nh-slide--active" : "")
              }
              aria-hidden={activeIdx !== i}
            >
              <div className="nh-slide-meta">
                <span className="nh-slide-num">{s.n}</span>
                <span className="nh-slide-sep">/</span>
                <span className="nh-slide-weeks">{s.weeks}</span>
              </div>
              <div className="nh-slide-kicker">{s.k}</div>
              <h3 className="nh-slide-title">{s.t}</h3>
              <p className="nh-slide-desc">{s.d}</p>
            </article>
          ))}
        </div>

        <div className="nh-progress" aria-hidden="true">
          {steps.map((s, i) => {
            const segStart = i / steps.length;
            return (
              <div key={s.n} className="nh-progress-group">
                <span
                  className={
                    "nh-progress-num" +
                    (activeIdx >= i ? " nh-progress-num--on" : "")
                  }
                >
                  {s.n}
                </span>
                {i < steps.length - 1 && (
                  <span className="nh-progress-dots">
                    {Array.from({ length: DOTS_PER_GAP }).map((_, j) => {
                      // dot threshold: when --p crosses this value the dot lights up
                      const t =
                        segStart +
                        ((j + 1) / (DOTS_PER_GAP + 1)) * (1 / steps.length);
                      return (
                        <span
                          key={j}
                          className="nh-progress-dot"
                          style={{ ["--t" as string]: t.toFixed(4) }}
                        />
                      );
                    })}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
