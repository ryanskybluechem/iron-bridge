"use client";

import { useEffect, useRef, useState } from "react";
import SplitMask from "./SplitMask";

/**
 * Full-viewport intro for the Process section. The eyebrow + headline +
 * lede animate in with a word-by-word mask reveal. Beneath, a horizontal
 * "01 → 02 → 03" sequence draws in stage-by-stage to prime the user for
 * the pinned cards that follow.
 */
export default function ProcessIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setArmed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setArmed(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = [
    { n: "01", k: "Plan" },
    { n: "02", k: "Project" },
    { n: "03", k: "Execute" },
  ];

  return (
    <div className="pi-stage" ref={ref}>
      <div className="container pi-stage-inner">
        <SplitMask className="pi-eyebrow" stagger={40} delay={120}>
          The Iron Bridge method
        </SplitMask>

        <h2 className="pi-title">
          <SplitMask stagger={70} delay={240}>
            Three steps. <em className="serif">Six months</em> of leverage.
          </SplitMask>
        </h2>

        <SplitMask
          className="pi-lede"
          stagger={20}
          delay={1300}
          rootMargin="0px"
        >
          A single sequenced engagement that turns reactive year-end tax prep
          into proactive multi-quarter strategy.
        </SplitMask>

        <div className={`pi-sequence${armed ? " is-armed" : ""}`}>
          {items.map((it, i) => (
            <div
              key={it.n}
              className="pi-seq-item"
              style={{
                ["--pid" as string]: `${1700 + i * 220}ms`,
              }}
            >
              <span className="pi-seq-ring">
                <span className="pi-seq-num">{it.n}</span>
              </span>
              <span className="pi-seq-name">{it.k}</span>
              {i < items.length - 1 && (
                <span
                  className="pi-seq-line"
                  style={{
                    ["--pid" as string]: `${1820 + i * 220}ms`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="pi-cue" aria-hidden="true">
          <span className="pi-cue-line" />
          <span className="pi-cue-text">Scroll to begin</span>
        </div>
      </div>
    </div>
  );
}
