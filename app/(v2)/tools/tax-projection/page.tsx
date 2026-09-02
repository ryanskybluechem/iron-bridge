import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpCta } from "../../components/Subpage";
import { TaxProjectionCalc } from "../../components/Calculators";

export const metadata: Metadata = {
  title: "Tax Projection Timeline | Iron Bridge",
  description:
    "See how the savings available from tax planning shrink the later in the year you start, and where your projected liability lands if you wait.",
  alternates: { canonical: "/tools/tax-projection" },
};

export default function TaxProjectionPage() {
  return (
    <Subpage
      eyebrow="Interactive tool"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "Tax Projection Timeline", href: "/tools/tax-projection" },
      ]}
      title={
        <>
          Tax projection <em className="serif">timeline.</em>
        </>
      }
      lede="Set your revenue, margin and effective rate, then move the month you start planning. Watch how much of the available savings is still on the table."
    >
      <SpSection tone="dark">
        <div>
          <TaxProjectionCalc />
        </div>
      </SpSection>

      <SpSection tone="alt">
        <div className="sp-split">
          <div className="sp-split-aside">
            <div className="sp-split-index">01</div>
            <div className="sp-split-title">What it shows</div>
            <div className="sp-split-note">
              A projected liability and a savings curve tied to the month
              you start.
            </div>
          </div>
          <SpProse>
            <p>
              Enter an annual revenue, a net margin and an effective tax
              rate, and the calculator estimates a projected liability:
              revenue times margin times rate. That number does not move
              when you change the planning month. What moves is the savings
              curve behind it. Most of the strategies that reduce a tax
              bill (elections, entity changes, retirement contributions,
              equipment purchases timed against depreciation rules) have
              deadlines. The later in the year you start engaging with
              them, the fewer are still open, and the smaller the realistic
              savings get. The chart plots that decay across the twelve
              months and marks where your selected month falls, then
              applies it to your projected liability to show a net figure
              and a dollar amount you keep.
            </p>
          </SpProse>
        </div>

        <div className="sp-split">
          <div className="sp-split-aside">
            <div className="sp-split-index">02</div>
            <div className="sp-split-title">What the real version adds</div>
            <div className="sp-split-note">
              Your actual returns, schedules, entity and state code.
            </div>
          </div>
          <SpProse>
            <p>
              This version uses three sliders and one curve. A real
              projection replaces all of it with your actual filed and
              year-to-date returns, real depreciation schedules including
              bonus depreciation and Section 179 elections, your actual
              entity structure, and your state&apos;s specific tax code,
              since state treatment of the same strategy can vary widely.
              From there we identify which strategies you still qualify for
              given your timeline, model each one against your numbers, and
              sequence them before the deadlines that apply to you close.
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

          <Link className="sp-card" href="/process">
            <span className="sp-card-tag">Related strategy</span>
            <span className="sp-card-t">How we build the projection</span>
            <span className="sp-card-d">
              See the process behind the real version of this tool, from
              your filed returns to a sequenced plan.
            </span>
            <span className="sp-card-cta">See the process →</span>
          </Link>
        </div>
      </SpSection>

      <SpCta label="Get the real number" />
    </Subpage>
  );
}
