import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpCta } from "../../components/Subpage";
import { RunwayCalc } from "../../components/Calculators";

export const metadata: Metadata = {
  title: "Cash Flow Runway | Iron Bridge",
  description:
    "Project cash on hand 24 months forward against monthly revenue, monthly burn and growth rate to see your runway, ending balance and break-even month.",
  alternates: { canonical: "/tools/cash-flow-runway" },
};

export default function CashFlowRunwayPage() {
  return (
    <Subpage
      eyebrow="Interactive tool"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "Cash Flow Runway", href: "/tools/cash-flow-runway" },
      ]}
      title={
        <>
          Cash flow <em className="serif">runway.</em>
        </>
      }
      lede="Set your cash on hand, monthly revenue, monthly burn and expected growth rate, and watch the balance play out 24 months forward."
    >
      <SpSection tone="dark">
        <div>
          <RunwayCalc />
        </div>
      </SpSection>

      <SpSection tone="alt">
        <div className="sp-split">
          <div className="sp-split-aside">
            <div className="sp-split-index">01</div>
            <div className="sp-split-title">What it shows</div>
            <div className="sp-split-note">
              A 24 month balance, a runway figure and a break-even month.
            </div>
          </div>
          <SpProse>
            <p>
              Starting from your cash on hand, the calculator adds monthly
              revenue and subtracts monthly burn for each of the next 24
              months, compounding revenue at your chosen monthly growth
              rate (which can be negative). The chart plots the resulting
              balance month by month, shading it blue while it is positive
              and copper once it crosses zero. Three numbers come out of
              that path: a runway figure, which is the month the balance
              would first go negative, or 24+ if it never does; the
              projected ending balance at month 24; and the break-even
              month, which is when monthly revenue first catches up to
              monthly costs.
            </p>
          </SpProse>
        </div>

        <div className="sp-split">
          <div className="sp-split-aside">
            <div className="sp-split-index">02</div>
            <div className="sp-split-title">What the real version adds</div>
            <div className="sp-split-note">
              Your actual books, timing and cost categories.
            </div>
          </div>
          <SpProse>
            <p>
              This is a single fixed cost figure compounding against a
              single growth rate, which is a reasonable way to feel out a
              scenario but not how cash actually moves. A real runway model
              works from your actual accounts receivable and payable
              timing, seasonality in your revenue rather than a flat
              monthly rate, separate cost categories that grow at
              different speeds, financing terms and covenants if you carry
              debt, and the timing of tax payments and distributions. We
              build that against your books, not a slider.
            </p>
          </SpProse>
        </div>

        <div className="sp-callout">
          This tool is illustrative only and is not financial or tax advice
          for your situation.
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

          <Link className="sp-card" href="/tools/entity-comparator">
            <span className="sp-card-tag">Other tool</span>
            <span className="sp-card-t">Entity Structure Comparator</span>
            <span className="sp-card-d">
              Set your annual net profit, a reasonable S-Corp salary and
              your state tax rate, and see the same business taxed three
              different ways.
            </span>
            <span className="sp-card-cta">Open the tool →</span>
          </Link>

          <Link className="sp-card" href="/strategies/capital-cfo-strategy">
            <span className="sp-card-tag">Related strategy</span>
            <span className="sp-card-t">Capital + CFO Strategy</span>
            <span className="sp-card-d">
              Tax strategy works best when it fits cash flow, debt,
              liquidity, investment and operating goals. We model the
              whole picture.
            </span>
            <span className="sp-card-cta">Read more →</span>
          </Link>
        </div>
      </SpSection>

      <SpCta label="Get the real number" />
    </Subpage>
  );
}
