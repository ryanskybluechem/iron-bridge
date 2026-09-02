"use client";

import { useEffect, useState } from "react";
import RollingNumber from "./RollingNumber";

export default function HeroStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Slight delay so the roll-in plays after the hero has settled
    const id = setTimeout(() => setMounted(true), 220);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="hero-stats">
      <div className="stat">
        <div className="stat-num">
          <RollingNumber
            value={mounted ? 240 : 0}
            format={(n) => `$${n}M+`}
            duration={1400}
          />
        </div>
        <div className="stat-label">Loans approved</div>
      </div>
      <div className="stat-div" />
      <div className="stat">
        <div className="stat-num">
          <RollingNumber
            value={mounted ? 380 : 0}
            format={(n) => `$${(n / 10).toFixed(1)}M+`}
            duration={1500}
          />
        </div>
        <div className="stat-label">Taxes saved</div>
      </div>
      <div className="stat-div" />
      <div className="stat">
        <div className="stat-num">June 1</div>
        <div className="stat-label">Projection delivered by</div>
      </div>
    </div>
  );
}
