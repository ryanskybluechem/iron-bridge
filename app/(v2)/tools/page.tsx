import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpCta } from "../components/Subpage";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "Tools | Iron Bridge",
  description:
    "Three interactive calculators for tax projection, cash flow runway and entity structure, simplified versions of the models we run in engagements.",
  alternates: { canonical: "/tools" },
};

export default function ToolsIndexPage() {
  return (
    <Subpage
      eyebrow="Interactive tools"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
      ]}
      title={
        <>
          Run a first pass{" "}
          <em className="serif">on your own numbers.</em>
        </>
      }
      lede="Three simplified versions of the models we run in engagements. Set your own revenue, cash and entity numbers and see the shape of the outcome. The real projection uses your actual returns, depreciation schedules, entity structure and state code."
    >
      <SpSection>
        <div className="sp-cards">
          <Reveal delay={0}>
            <Link className="sp-card" href="/tools/tax-projection">
              <span className="sp-card-num">01</span>
              <span className="sp-card-t">Tax Projection Timeline</span>
              <span className="sp-card-d">
                Set your revenue, margin and effective rate, then move the
                month you start planning to see how much of the available
                savings is still on the table.
              </span>
              <span className="sp-card-cta">Open the tool →</span>
            </Link>
          </Reveal>

          <Reveal delay={70}>
            <Link className="sp-card" href="/tools/cash-flow-runway">
              <span className="sp-card-num">02</span>
              <span className="sp-card-t">Cash Flow Runway</span>
              <span className="sp-card-d">
                Set your cash on hand, monthly revenue, monthly burn and
                expected growth rate, and watch the balance play out 24
                months forward.
              </span>
              <span className="sp-card-cta">Open the tool →</span>
            </Link>
          </Reveal>

          <Reveal delay={140}>
            <Link className="sp-card" href="/tools/entity-comparator">
              <span className="sp-card-num">03</span>
              <span className="sp-card-t">Entity Structure Comparator</span>
              <span className="sp-card-d">
                Set your annual net profit, a reasonable S-Corp salary and
                your state tax rate, and see the same business taxed three
                different ways.
              </span>
              <span className="sp-card-cta">Open the tool →</span>
            </Link>
          </Reveal>
        </div>

        <div className="sp-callout">
          Each tool is illustrative only, not a substitute for a modeled
          projection or for advice on your situation.
        </div>

        <SpProse>
          <p>
            The <strong>Tax Projection Timeline</strong> maps to how we build
            the <Link href="/process">projection itself</Link>. The{" "}
            <strong>Cash Flow Runway</strong> tool mirrors the cash side of{" "}
            <Link href="/strategies/capital-cfo-strategy">
              Capital + CFO Strategy
            </Link>
            . The <strong>Entity Structure Comparator</strong> is a first
            look at the tradeoffs we model in{" "}
            <Link href="/strategies/entity-compensation">
              Entity + Compensation Design
            </Link>
            .
          </p>
        </SpProse>
      </SpSection>

      <SpCta label="Get the real number" />
    </Subpage>
  );
}
