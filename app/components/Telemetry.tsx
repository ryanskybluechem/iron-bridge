"use client";

import { useEffect, useState } from "react";

/**
 * "Live" telemetry panel that floats in the hero — gives the page a
 * Bloomberg-terminal feel and reinforces the "we project, not panic" thesis.
 * Numbers tick subtly so it feels alive without being distracting.
 */

const months = [
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

export default function Telemetry() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  // deterministic-ish drift
  const drift = (seed: number) => {
    const v = Math.sin((tick + seed) * 1.21) * 0.5 + 0.5;
    return v;
  };

  const projected = 312_400 + Math.round(drift(1) * 4200);
  const optimized = 184_200 + Math.round(drift(2) * 3100);
  const saved = projected - optimized;
  const monthIdx = (new Date().getMonth() + Math.floor(drift(3) * 0.8)) % 12;

  return (
    <div className="telemetry" aria-hidden="true">
      <div className="telemetry-bar">
        <span className="telemetry-pulse" />
        <span className="telemetry-key">LIVE PROJECTION</span>
        <span className="telemetry-meta">PORTFOLIO MEDIAN · CY 2026</span>
      </div>

      <div className="telemetry-rows">
        <div className="telemetry-row">
          <span className="telemetry-label">Status quo liability</span>
          <span className="telemetry-value telemetry-value--strike">
            ${projected.toLocaleString("en-US")}
          </span>
        </div>
        <div className="telemetry-row">
          <span className="telemetry-label">Post-strategy liability</span>
          <span className="telemetry-value">
            ${optimized.toLocaleString("en-US")}
          </span>
        </div>
        <div className="telemetry-row telemetry-row--accent">
          <span className="telemetry-label">Median client savings</span>
          <span className="telemetry-value telemetry-value--accent">
            ${saved.toLocaleString("en-US")}
          </span>
        </div>
      </div>

      <div className="telemetry-foot">
        <span>Projection delivered</span>
        <span className="telemetry-month">{months[monthIdx]} 1, 2026</span>
      </div>
    </div>
  );
}
