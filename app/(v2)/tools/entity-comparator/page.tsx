import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpCta } from "../../components/Subpage";
import { EntityCalc } from "../../components/Calculators";

export const metadata: Metadata = {
  title: "Entity Structure Comparator | Iron Bridge",
  description:
    "Compare the total tax burden of an LLC, an S-Corp and a C-Corp at the same annual profit and S-Corp salary, and see which structure comes out ahead.",
  alternates: { canonical: "/tools/entity-comparator" },
};

export default function EntityComparatorPage() {
  return (
    <Subpage
      eyebrow="Interactive tool"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        {
          label: "Entity Structure Comparator",
          href: "/tools/entity-comparator",
        },
      ]}
      title={
        <>
          Entity structure <em className="serif">comparator.</em>
        </>
      }
      lede="Set your annual net profit, a reasonable S-Corp salary and your state tax rate, and see the same business taxed three different ways."
    >
      <SpSection tone="dark">
        <div>
          <EntityCalc />
        </div>
      </SpSection>

      <SpSection tone="alt">
        <div className="sp-split">
          <div className="sp-split-aside">
            <div className="sp-split-index">01</div>
            <div className="sp-split-title">What it shows</div>
            <div className="sp-split-note">
              One profit figure taxed three ways, and which one wins.
            </div>
          </div>
          <SpProse>
            <p>
              The calculator takes one profit figure and runs it through
              three structures. As an LLC or sole proprietor, the full
              profit is subject to self-employment tax, plus federal income
              tax and your state rate on top. As an S-Corp, only the salary
              you set is subject to payroll tax, while the remaining profit
              passes through as a distribution taxed at ordinary rates;
              raise the salary and payroll tax goes up but the distribution
              shrinks, so there is a real tradeoff hiding in that slider.
              As a C-Corp, the business pays a flat corporate rate and
              whatever gets distributed to you is taxed again as a
              dividend. Federal income tax is calculated using current
              bracket thresholds, and the bar chart shows the total tax and
              take-home under each structure, flagging whichever one comes
              out cheapest at your inputs.
            </p>
          </SpProse>
        </div>

        <div className="sp-split">
          <div className="sp-split-aside">
            <div className="sp-split-index">02</div>
            <div className="sp-split-title">What the real version adds</div>
            <div className="sp-split-note">
              Your state code, a supportable salary and multi-year view.
            </div>
          </div>
          <SpProse>
            <p>
              This model uses one flat state rate and does not account for
              the qualified business income deduction, the specific
              payroll tax wage base in the current year, how your state
              actually treats S-Corp or C-Corp income (some tax them quite
              differently from each other), or what a defensible
              &quot;reasonable salary&quot; looks like for your role and
              industry, which the IRS does scrutinize. A real comparison
              works from your actual profit history, your state&apos;s
              code, a supportable salary figure, and a multi-year view of
              retained earnings and distributions, not a single-year
              snapshot.
            </p>
          </SpProse>
        </div>

        <div className="sp-callout">
          This tool is illustrative only and is not tax advice for your
          situation.
        </div>
      </SpSection>

      <SpSection>
        <div className="sp-cards">
          <Link className="sp-card" href="/tools/tax-projection">
            <span className="sp-card-tag">Other tool</span>
            <span className="sp-card-t">Tax Projection Timeline</span>
            <span className="sp-card-d">
              Set your revenue, margin and effective rate, then move the
              month you start planning to see how much of the available
              savings is still on the table.
            </span>
            <span className="sp-card-cta">Open the tool →</span>
          </Link>

          <Link className="sp-card" href="/tools/cash-flow-runway">
            <span className="sp-card-tag">Other tool</span>
            <span className="sp-card-t">Cash Flow Runway</span>
            <span className="sp-card-d">
              Set your cash on hand, monthly revenue, monthly burn and
              expected growth rate, and watch the balance play out 24
              months forward.
            </span>
            <span className="sp-card-cta">Open the tool →</span>
          </Link>

          <Link className="sp-card" href="/strategies/entity-compensation">
            <span className="sp-card-tag">Related strategy</span>
            <span className="sp-card-t">Entity + Compensation Design</span>
            <span className="sp-card-d">
              Review ownership, compensation, retirement planning and
              entity structure as one integrated model rather than
              isolated tax tactics.
            </span>
            <span className="sp-card-cta">Read more →</span>
          </Link>
        </div>
      </SpSection>

      <SpCta label="Get the real number" />
    </Subpage>
  );
}
