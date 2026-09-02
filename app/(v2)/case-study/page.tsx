import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpFacts, SpCta } from "../components/Subpage";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "Case Study | Iron Bridge",
  description:
    "An anonymized Mountain West business owner's $1,208,131 projected tax bill was cut by $780,938 through a stacked entity, real estate and energy strategy.",
  alternates: { canonical: "/case-study" },
};

const facts = [
  { v: "$780,938", l: "Year-one tax savings" },
  { v: "39.2% → 11.5%", l: "Effective tax rate" },
  { v: "$1.81", l: "Deductions per $1 of cash" },
  { v: "Dec 31", l: "Hard planning deadline" },
];

const layers = [
  {
    industry: "Layer 1 · Entity",
    region: "Corporate Structure",
    before: 1_208_131,
    after: 1_175_131,
    detail:
      "Compensation and plan design restructured across four entities, including QBI and qualified-plan planning.",
    nums: "$80K deductions · $80K cash · $33K tax saved",
    accent: "var(--steel-ink)",
  },
  {
    industry: "Layer 2 · Real Estate",
    region: "The Property Layer",
    before: 1_175_131,
    after: 615_131,
    detail:
      "Cost segregation on buildings already owned, plus a cash-flowing acquisition and first-year depreciation.",
    nums: "$1.345M deductions · $455K cash · $560K tax saved",
    accent: "var(--copper)",
  },
  {
    industry: "Layer 3 · Energy",
    region: "Securities Allocation",
    before: 615_131,
    after: 427_193,
    detail:
      "A regulated securities-based energy strategy, placed through licensed representatives and modeled against active income.",
    nums: "$450K deductions · $500K cash · $187K tax saved",
    accent: "var(--moss)",
  },
];

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

export default function CaseStudyPage() {
  return (
    <Subpage
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Case study", href: "/case-study" },
      ]}
      eyebrow="Case study · actual engagement, anonymized"
      title={
        <>
          A $1,208,131 tax bill.{" "}
          <em className="serif">One stacked strategy cut it by $780,938.</em>
        </>
      }
      lede="Business owner, Mountain West, approximately $3.7M of income, four operating entities. Conventional tax breaks were already largely phased out, so the strategy had to be modeled across multiple layers."
    >
      <SpSection>
        <SpFacts items={facts} />
      </SpSection>

      <SpSection>
        <div className="sp-split">
          <div className="sp-split-aside">
            <div className="sp-split-index">01 / 03</div>
            <h2 className="sp-split-title">The three layers</h2>
          </div>
          <SpProse>
            <h3>Layer 1: Entity / Corporate Structure</h3>
            <p>
              The first layer addressed how the business itself was
              organized.{" "}
              <Link href="/strategies/entity-compensation">
                Compensation and plan design
              </Link>{" "}
              were restructured across all four operating entities,
              including QBI planning and a qualified-plan strategy sized to
              the owner&apos;s income across the group. This layer was the
              smallest of the three in dollar terms, but it set the
              foundation the later layers were modeled against.
            </p>

            <h3>Layer 2: Real Estate / The Property Layer</h3>
            <p>
              The second layer did the most work. A{" "}
              <Link href="/strategies/real-estate-cost-seg">
                cost segregation study
              </Link>{" "}
              was run on buildings the client already owned, unlocking
              deductions that had been sitting on the table for years. That
              was paired with a new, cash-flowing acquisition structured to
              capture first-year depreciation. Together, this layer reduced
              the projected liability by more than the other two layers
              combined.
            </p>

            <h3>Layer 3: Energy / Securities Allocation</h3>
            <p>
              The third layer moved outside real estate entirely. A
              regulated,{" "}
              <Link href="/strategies/energy-strategies">
                securities-based energy strategy
              </Link>{" "}
              was placed through licensed representatives and sized against
              the client&apos;s active income, closing the remaining gap
              before the year-end deadline.
            </p>
          </SpProse>
        </div>

        <div className="case-grid" style={{ marginTop: 72 }}>
          {layers.map((c, i) => {
            const saved = c.before - c.after;
            const pct = Math.round((saved / c.before) * 100);
            const afterPct = Math.round((c.after / c.before) * 100);
            return (
              <Reveal key={i} delay={i * 90} className="case-card">
                <div className="case-accent" style={{ background: c.accent }} />
                <div className="case-head">
                  <div className="case-industry">{c.industry}</div>
                  <div className="case-region">{c.region}</div>
                </div>

                <div className="case-bars">
                  <div className="case-bar-row">
                    <span className="case-bar-label">Before</span>
                    <span className="case-bar-track">
                      <span
                        className="case-bar-fill case-bar-fill--before"
                        style={{ width: "100%" }}
                      />
                    </span>
                    <span className="case-bar-value case-bar-value--strike">
                      {fmt(c.before)}
                    </span>
                  </div>
                  <div className="case-bar-row">
                    <span className="case-bar-label">After</span>
                    <span className="case-bar-track">
                      <span
                        className="case-bar-fill case-bar-fill--after"
                        style={{ width: `${afterPct}%`, background: c.accent }}
                      />
                    </span>
                    <span className="case-bar-value">{fmt(c.after)}</span>
                  </div>
                </div>

                <div className="case-saved">
                  <div className="case-saved-key">Tax saved</div>
                  <div className="case-saved-value" style={{ color: c.accent }}>
                    {fmt(saved)}
                    <span className="case-saved-pct">−{pct}%</span>
                  </div>
                </div>

                <ul className="case-moves">
                  <li>{c.detail}</li>
                </ul>

                <p className="case-note">{c.nums}</p>
              </Reveal>
            );
          })}
        </div>
      </SpSection>

      <SpSection tone="dark">
        <div className="sp-flow">
          <span className="sp-flow-l">Running liability, layer by layer</span>
          <span className="sp-flow-v sp-flow-v--start">$1,208,131</span>
          <span className="sp-flow-arrow">→</span>
          <span className="sp-flow-v">$1,175,131</span>
          <span className="sp-flow-arrow">→</span>
          <span className="sp-flow-v">$615,131</span>
          <span className="sp-flow-arrow">→</span>
          <span className="sp-flow-v sp-flow-v--end">$427,193</span>
        </div>

        <h2 className="sp-band-title" style={{ marginTop: 40 }}>
          Not one trick. <em className="serif">A sequence.</em>
        </h2>
        <p className="sp-band-note">
          A sequence of eligible strategies, each modeled against the
          client&apos;s facts and coordinated before the year-end deadline.
        </p>
      </SpSection>

      <SpSection tone="alt">
        <div className="sp-callout">
          <strong>Case-study details are anonymized.</strong> Results do not
          guarantee future outcomes.
        </div>
        <SpProse>
          <p>
            See <Link href="/process">the sequence this ran on</Link>, or
            explore <Link href="/strategies">all six strategy areas</Link>.
          </p>
        </SpProse>
      </SpSection>

      <SpCta />
    </Subpage>
  );
}
