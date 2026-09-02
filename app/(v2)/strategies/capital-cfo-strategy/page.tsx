import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpCta } from "../../components/Subpage";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Capital + CFO Strategy | Iron Bridge",
  description:
    "How Iron Bridge models tax strategy against cash flow, debt covenants, liquidity and the operating plan, so a lower tax bill never wrecks the cash position.",
  alternates: { canonical: "/strategies/capital-cfo-strategy" },
};

export default function Page() {
  return (
    <Subpage
      eyebrow="Strategy"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Strategies", href: "/strategies" },
        {
          label: "Capital + CFO Strategy",
          href: "/strategies/capital-cfo-strategy",
        },
      ]}
      title={
        <>
          Capital + <em className="serif">CFO Strategy</em>
        </>
      }
      lede="A tax strategy that wrecks the cash position is not a strategy. We model tax moves against debt covenants, liquidity needs and the operating plan, because the lowest tax bill on paper is not always the best outcome for the business."
    >
      <SpSection>
        <Reveal>
          <div className="sp-pull">
            A lower tax bill is not{" "}
            <em className="serif">automatically a better outcome.</em>
          </div>
        </Reveal>
        <SpProse>
          <p>
            It is possible to reduce a tax bill in a way that leaves a
            business short of cash when it needs it most: payroll, a debt
            payment, a capital purchase already committed to. A strategy
            that wrecks the cash position is not a strategy, regardless of
            what it saves in tax. We evaluate every move against the
            business&apos;s actual cash position, not just against the
            return. Want to see where your own numbers stand? Use the{" "}
            <Link href="/tools/cash-flow-runway">model your runway</Link>{" "}
            tool before we do.
          </p>
        </SpProse>
      </SpSection>

      <SpSection tone="alt">
        <div className="sp-split">
          <Reveal>
            <div className="sp-split-aside">
              <div className="sp-split-index">01</div>
              <h2 className="sp-split-title">
                Modeling against the operating plan
              </h2>
            </div>
          </Reveal>
          <div>
            <SpProse>
              <p>
                Debt covenants, borrowing capacity, capex timing and working
                capital needs all shape which tax moves make sense and when.
                A timing election or an entity change that looks favorable
                in isolation can conflict with a covenant test or a planned
                drawdown. We model tax decisions against the operating plan
                directly, so the two are never evaluated separately and
                reconciled after the fact.
              </p>
              <p>
                That means asking, before a move is made, what it does to
                borrowing capacity next quarter, whether it changes a ratio a
                lender is watching, and whether the cash it frees up is
                actually available when the business needs it. A
                recommendation that answers only the tax question is an
                incomplete recommendation.
              </p>
            </SpProse>
          </div>
        </div>

        <div className="sp-split">
          <Reveal>
            <div className="sp-split-aside">
              <div className="sp-split-index">02</div>
              <h2 className="sp-split-title">One projection, one set of numbers</h2>
            </div>
          </Reveal>
          <div>
            <SpProse>
              <p>
                This connects to the same forward tax projection that
                anchors every strategy area we work through, part of the
                same <Link href="/process">process</Link> that starts every
                engagement. Cash flow, debt schedules and liquidity needs
                feed into that projection alongside income and{" "}
                <Link href="/strategies/entity-compensation">
                  entity and compensation design
                </Link>
                , so a proposed strategy gets tested against the whole
                financial picture before it gets recommended, not against tax
                figures pulled out on their own.
              </p>
            </SpProse>
          </div>
        </div>

        <div className="sp-split">
          <Reveal>
            <div className="sp-split-aside">
              <div className="sp-split-index">03</div>
              <h2 className="sp-split-title">
                When a CFO-level view earns its place
              </h2>
            </div>
          </Reveal>
          <div>
            <SpProse>
              <p>
                This work matters most when the stakes around cash are
                highest: a period of growth that is straining working
                capital, an acquisition that changes the debt and liquidity
                picture, or an exit where the structure of the deal drives
                most of the tax outcome. In those moments, tax planning and
                cash planning are the same conversation, and treating them
                separately is where businesses get into trouble.
              </p>
              <p>
                Owners rarely have a dedicated CFO on staff at the point
                where these decisions matter most, which is exactly when a
                CFO-level view of the numbers is most valuable. We bring
                that view to the table alongside the tax work, rather than
                leaving cash, debt and liquidity as someone else&apos;s
                problem to reconcile later.
              </p>
            </SpProse>
          </div>
        </div>

        <div className="sp-callout">
          <strong>
            A strategy that wrecks the cash position is not a strategy.
          </strong>{" "}
          Every tax move is tested against payroll, debt payments and
          committed capital purchases before it is ever recommended.
        </div>
      </SpSection>

      <SpSection>
        <div className="section-eyebrow">Related</div>
        <h2 className="sp-split-title">Where the numbers connect</h2>
        <div className="sp-cards">
          <Reveal delay={0}>
            <Link className="sp-card" href="/strategies/entity-compensation">
              <span className="sp-card-num">01</span>
              <span className="sp-card-t">
                Entity + Compensation Design
              </span>
              <span className="sp-card-d">
                Review ownership, compensation, retirement planning and
                entity structure as one integrated model rather than
                isolated tax tactics.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <Link className="sp-card" href="/tools/cash-flow-runway">
              <span className="sp-card-num">02</span>
              <span className="sp-card-t">Cash Flow Runway Tool</span>
              <span className="sp-card-d">
                Project cash on hand 24 months forward against monthly
                revenue, burn and growth to see when you break even or run
                out.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <Link className="sp-card" href="/process">
              <span className="sp-card-num">03</span>
              <span className="sp-card-t">Our Process</span>
              <span className="sp-card-d">
                One forward tax projection, every strategy modeled side by
                side, the right team chosen, then execution before December
                31.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>
        </div>
      </SpSection>

      <SpSection>
        <SpProse>
          <p>
            Tax treatment depends on individual facts and current law, and
            should be reviewed with the tax and legal professionals
            responsible for the return.
          </p>
        </SpProse>
      </SpSection>

      <SpCta />
    </Subpage>
  );
}
