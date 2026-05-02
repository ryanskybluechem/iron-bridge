"use client";

import { useEffect, useState } from "react";

export default function HeroStats() {
  const [loans, setLoans] = useState(0);
  const [taxes, setTaxes] = useState(0);

  useEffect(() => {
    let r1 = 0;
    let r2 = 0;
    const target1 = 240;
    const target2 = 38_000_000;
    const id = setInterval(() => {
      r1 = Math.min(target1, r1 + target1 / 40);
      r2 = Math.min(target2, r2 + target2 / 40);
      setLoans(r1);
      setTaxes(r2);
      if (r1 >= target1 && r2 >= target2) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-stats">
      <div className="stat">
        <div className="stat-num">${Math.round(loans)}M+</div>
        <div className="stat-label">Loans approved</div>
      </div>
      <div className="stat-div" />
      <div className="stat">
        <div className="stat-num">${(taxes / 1_000_000).toFixed(1)}M+</div>
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
