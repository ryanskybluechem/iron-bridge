"use client";

import { useState } from "react";
import RollingNumber from "./RollingNumber";

/**
 * Hero-embedded savings estimator. The owner enters what they paid in tax
 * last year; we apply the engagement average and show what the same year
 * could have looked like.
 *
 * PLACEHOLDER NUMBERS: confirm both of these with Dave and David before this
 * goes anywhere near a client. AVERAGE_REDUCTION is the figure quoted in the
 * headline result; BEST_REDUCTION is the anonymized case study on this page
 * ($1,208,131 down to $427,193).
 */
const AVERAGE_REDUCTION = 0.34;
const BEST_REDUCTION = 0.646;

const MIN = 25_000;
const MAX = 1_500_000;

const currency = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function SavingsCalc() {
  const [paid, setPaid] = useState(250_000);

  const saved = paid * AVERAGE_REDUCTION;
  const after = paid - saved;
  const best = paid * BEST_REDUCTION;

  const onType = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, "");
    if (!digits) {
      setPaid(0);
      return;
    }
    setPaid(Math.min(MAX, parseInt(digits, 10)));
  };

  return (
    <div className="scalc">
      <div className="scalc-head">
        <h2 className="scalc-title">Calculate your potential savings.</h2>
        <p className="scalc-sub">
          Enter what you paid in taxes last year. We will show you the same
          year run through a modeled strategy.
        </p>
      </div>

      <label className="scalc-field">
        <span className="scalc-label">What you paid last year</span>
        <span className="scalc-input-wrap">
          <span className="scalc-currency">$</span>
          <input
            className="scalc-input"
            type="text"
            inputMode="numeric"
            value={paid ? paid.toLocaleString("en-US") : ""}
            onChange={(e) => onType(e.target.value)}
            aria-label="Taxes paid last year, in dollars"
          />
        </span>
      </label>

      <input
        className="scalc-slider"
        type="range"
        min={MIN}
        max={MAX}
        step={5_000}
        value={Math.min(Math.max(paid, MIN), MAX)}
        onChange={(e) => setPaid(Number(e.target.value))}
        aria-label="Taxes paid last year"
      />
      <div className="scalc-scale">
        <span>{currency(MIN)}</span>
        <span>{currency(MAX)}+</span>
      </div>

      <div className="scalc-out">
        <div className="scalc-row">
          <span className="scalc-row-k">What you paid</span>
          <span className="scalc-row-v scalc-row-v--was">{currency(paid)}</span>
        </div>
        <div className="scalc-row">
          <span className="scalc-row-k">With a modeled strategy</span>
          <span className="scalc-row-v">{currency(after)}</span>
        </div>
      </div>

      <div className="scalc-save">
        <div className="scalc-save-k">You could have kept</div>
        <div className="scalc-save-v">
          <RollingNumber
            value={Math.round(saved)}
            format={(n) => currency(n)}
            duration={520}
          />
        </div>
        <div className="scalc-save-note">
          Based on an average {Math.round(AVERAGE_REDUCTION * 100)}% reduction
          across engagements. Our largest documented result cut the bill by{" "}
          {Math.round(BEST_REDUCTION * 100)}%, or {currency(best)} on this
          number.
        </div>
      </div>

      <a href="/contact" className="btn btn-primary btn-block scalc-cta">
        Get my tax projection
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            fill="none"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </a>

      <p className="scalc-fine">
        Illustrative only. Your result depends on your entities, income,
        property and the time left in the year.
      </p>
    </div>
  );
}
