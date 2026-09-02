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
            value={mounted ? 15 : 0}
            format={(n) => `$${n}M+`}
            duration={1400}
          />
        </div>
        <div className="stat-label">Tax savings generated for clients</div>
      </div>
      <div className="stat-div" />
      <div className="stat">
        <div className="stat-num">
          <RollingNumber
            value={mounted ? 700 : 0}
            format={(n) => `$${n}M+`}
            duration={1500}
          />
        </div>
        <div className="stat-label">Commercial loans underwritten</div>
      </div>
      <div className="stat-div" />
      <div className="stat">
        <div className="stat-num">
          <RollingNumber
            value={mounted ? 150 : 0}
            format={(n) => `$${n}M+`}
            duration={1600}
          />
        </div>
        <div className="stat-label">Capital sourced</div>
      </div>
      <div className="stat-div" />
      <div className="stat">
        <div className="stat-num">1</div>
        <div className="stat-label">Tax relationship</div>
      </div>
    </div>
  );
}
