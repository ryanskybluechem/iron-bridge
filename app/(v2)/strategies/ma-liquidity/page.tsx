import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpCta } from "../../components/Subpage";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "M&A + Liquidity Events | Iron Bridge",
  description:
    "How Iron Bridge models gain scenarios, entity consequences and reinvestment options before a business sale or liquidity event closes and terms lock in.",
  alternates: { canonical: "/strategies/ma-liquidity" },
};

export default function Page() {
  return (
    <Subpage
      eyebrow="Strategy"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Strategies", href: "/strategies" },
        { label: "M&A + Liquidity Events", href: "/strategies/ma-liquidity" },
      ]}
      title={
        <>
          M&amp;A + <em className="serif">Liquidity Events</em>
        </>
      }
      lede="Most of what determines the tax outcome of a sale is decided before closing, not after. We model gain scenarios, entity consequences, real estate and reinvestment decisions while the deal terms are still open."
    >
      <SpSection>
        <Reveal>
          <div className="sp-pull">
            The tax outcome is set before the deal closes,{" "}
            <em className="serif">not after.</em>
          </div>
        </Reveal>
        <SpProse>
          <p>
            By the time a business sale, recapitalization or other liquidity
            event reaches closing, most of the decisions that determine the
            tax outcome have already been made: how the deal is structured,
            what entity is selling, and what happens to the proceeds
            afterward, which is where{" "}
            <Link href="/strategies/capital-cfo-strategy">
              capital and CFO strategy
            </Link>{" "}
            picks up. Trying to plan around the tax bill after the purchase
            agreement is signed leaves very little room to change the
            outcome. The work has to happen while the deal terms are still
            open.
          </p>
        </SpProse>
      </SpSection>

      <SpSection tone="alt">
        <div className="sp-split">
          <Reveal>
            <div className="sp-split-aside">
              <div className="sp-split-index">01</div>
              <h2 className="sp-split-title">Who this is for</h2>
            </div>
          </Reveal>
          <div>
            <SpProse>
              <p>
                This applies to owners selling all or part of a business,
                taking on a new investor or partner in a way that triggers
                gain, or otherwise facing a large, one-time liquidity event.
                It also applies earlier than most owners expect, while a deal
                is still in negotiation and the structure is still flexible.
              </p>
              <ul>
                <li>Owners in active discussions with a buyer or investor</li>
                <li>Owners considering a recapitalization or partial sale</li>
                <li>
                  Businesses where real estate, equipment or other assets sit
                  inside the entity being sold
                </li>
                <li>
                  Owners who expect meaningful proceeds and have not yet
                  planned for where they go
                </li>
              </ul>
            </SpProse>
          </div>
        </div>

        <div className="sp-split">
          <Reveal>
            <div className="sp-split-aside">
              <div className="sp-split-index">02</div>
              <h2 className="sp-split-title">What we model</h2>
            </div>
          </Reveal>
          <div>
            <SpProse>
              <p>
                We build gain scenarios under the deal structures actually on
                the table, an asset sale versus a stock or equity sale, and
                how each is taxed differently at the entity and owner level.
                We look at whether real estate inside the business should be
                separated from the transaction, including whether a{" "}
                <Link href="/strategies/1031-dst">1031 exchange</Link> makes
                sense for it, what an installment structure or earnout does
                to the timing of the gain, and how charitable giving or
                reinvestment strategies might offset part of the liability.
                The goal is a clear picture of after-tax proceeds under each
                realistic structure before agreeing to one.
              </p>
            </SpProse>
          </div>
        </div>

        <div className="sp-split">
          <Reveal>
            <div className="sp-split-aside">
              <div className="sp-split-index">03</div>
              <h2 className="sp-split-title">
                Why the order of decisions matters
              </h2>
            </div>
          </Reveal>
          <div>
            <SpProse>
              <p>
                Some of the most effective planning here, entity
                restructuring, charitable structures and reinvestment
                vehicles, needs lead time to set up correctly, and generally
                cannot be layered in after a letter of intent is signed.
                Bringing tax and legal review into the{" "}
                <Link href="/process">process</Link> early, alongside the deal
                team, is what keeps these options available instead of
                foreclosed by the time the deal is done.
              </p>
            </SpProse>
          </div>
        </div>

        <div className="sp-callout">
          <strong>The tax outcome is set before the deal closes.</strong>{" "}
          Entity restructuring, charitable structures and reinvestment
          vehicles need lead time to set up correctly, and in most cases
          cannot be layered in once a letter of intent is signed.
        </div>
      </SpSection>

      <SpSection>
        <div className="section-eyebrow">Related</div>
        <h2 className="sp-split-title">Where these decisions connect</h2>
        <div className="sp-cards">
          <Reveal delay={0}>
            <Link className="sp-card" href="/strategies/capital-cfo-strategy">
              <span className="sp-card-num">01</span>
              <span className="sp-card-t">Capital + CFO Strategy</span>
              <span className="sp-card-d">
                Tax strategy works best when it fits cash flow, debt,
                liquidity, investment and operating goals. We model the whole
                picture.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <Link className="sp-card" href="/strategies/1031-dst">
              <span className="sp-card-num">02</span>
              <span className="sp-card-t">1031 Exchange → DST</span>
              <span className="sp-card-d">
                Coordinate the QI, 45-day identification clock, 180-day close
                and replacement options, including passive DST solutions for
                eligible accredited investors.
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
            Deduction and gain treatment depends on individual facts and
            current law, and should be reviewed with the tax and legal
            professionals responsible for your return.
          </p>
        </SpProse>
      </SpSection>

      <SpCta />
    </Subpage>
  );
}
