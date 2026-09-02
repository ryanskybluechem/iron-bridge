"use client";

import { useState } from "react";

const items = [
  {
    q: "Are you replacing my CPA?",
    a: "No. Your CPA files the return — we engineer the position they're filing from. We coordinate with whichever CPA you already use, then hand off a fully-modeled, fully-substantiated tax position by June 1st.",
  },
  {
    q: "How is this different from a tax-prep firm?",
    a: "Tax prep is a December-through-April reactive activity. We work the other eight months — projecting, modeling, restructuring, and timing moves while you still have the calendar to act on them. By the time most firms start, our clients are done.",
  },
  {
    q: "What does an engagement actually cost?",
    a: "Engagements are scoped — typically 6 to 12 months — and priced as a flat retainer plus a small percentage of documented tax savings beyond a baseline. We don't bill hourly. Most clients see a 4–8× return in the first year.",
  },
  {
    q: "What size businesses do you work with?",
    a: "We're best-fit for owner-operated businesses doing $1M–$50M in revenue with meaningful net margins. Smaller than that and a great CPA is usually enough; larger and you likely need an in-house CFO.",
  },
  {
    q: "What happens after the projection?",
    a: "You get a written model showing your liability under three scenarios, a sequenced playbook of moves to make before year-end, and a six-month cadence of working sessions to execute them with your CPA, attorney, and lender.",
  },
  {
    q: "How quickly can we start?",
    a: "We onboard a small cohort each quarter. Most engagements begin with a paid scoping call, and the first projection lands within 30 days of kickoff.",
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
