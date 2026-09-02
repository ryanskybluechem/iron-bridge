"use client";

import { useState } from "react";

const items = [
  {
    q: "Do I have to leave my CPA?",
    a: "No. If you are happy with your CPA, great, we can work right alongside them. We start with the forward-looking tax projection, quantify the projected liability, model the options and help coordinate execution. If your current CPA relationship is not giving you the proactive planning you want, Iron Bridge can also become your tax team, combining tax preparation, projections, planning and implementation in one coordinated relationship.",
  },
  {
    q: "When does it become too late?",
    a: "Most of the meaningful moves have to be executed before December 31, and several need lead time before that to fund, close, or place an asset in service. After the year closes, the return mostly records decisions that were already made.",
  },
  {
    q: "What does it cost?",
    a: "The first review is free. If there is real opportunity, we scope the engagement and quote it before any work starts, so you can weigh the fee against the projected savings.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={"faq-item " + (isOpen ? "faq-item--open" : "")}
          >
            <button
              type="button"
              className="faq-q"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="faq-q-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="faq-q-text">{it.q}</span>
              <span className="faq-q-toggle" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div className="faq-a-wrap" aria-hidden={!isOpen}>
              <div className="faq-a">{it.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
