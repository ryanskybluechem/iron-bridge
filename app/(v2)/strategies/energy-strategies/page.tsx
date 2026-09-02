import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpCta } from "../../components/Subpage";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Energy Strategies | Iron Bridge",
  description:
    "How Iron Bridge evaluates regulated securities-based energy strategies, where suitability, licensed placement and eligibility come before tax treatment.",
  alternates: { canonical: "/strategies/energy-strategies" },
};

export default function Page() {
  return (
    <Subpage
      eyebrow="Strategy"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Strategies", href: "/strategies" },
        { label: "Energy Strategies", href: "/strategies/energy-strategies" },
      ]}
      title={
        <>
          Energy <em className="serif">Strategies</em>
        </>
      }
      lede="Energy strategies sit at the intersection of three separate questions: does this fit the investor, does the tax treatment hold up, and is the account even eligible. We evaluate all three before any of them get treated as settled."
    >
      <SpSection>
        <Reveal>
          <div className="sp-pull">
            Suitability comes{" "}
            <em className="serif">before tax treatment.</em>
          </div>
        </Reveal>
        <SpProse>
          <p>
            The tax characteristics of an energy investment are only relevant
            if the investment itself is suitable in the first place. We start
            with the investor, not the deduction: liquidity needs, time
            horizon, risk tolerance and overall portfolio concentration. If an
            opportunity does not fit, we say so, and the conversation ends
            there regardless of how the tax treatment looks on paper.
          </p>
        </SpProse>
      </SpSection>

      <SpSection tone="alt">
        <div className="sp-split">
          <Reveal>
            <div className="sp-split-aside">
              <div className="sp-split-index">01</div>
              <h2 className="sp-split-title">
                Regulated securities, not private arrangements
              </h2>
            </div>
          </Reveal>
          <div>
            <SpProse>
              <p>
                The energy strategies we evaluate are securities. They are
                available only to eligible accredited investors, and they are
                placed only through licensed representatives. Like any
                investment, they carry risk, including loss of principal, and
                eligibility is not a formality we work around. It is a
                threshold question we confirm before an investor is shown
                anything else.
              </p>
              <p>
                That confirmation happens early and in writing, before any
                discussion of tax treatment. An investor who does not meet
                the eligibility standard is not a candidate for this
                strategy, full stop, and no amount of favorable tax treatment
                changes that. Licensing and eligibility are the gate, not a
                formality to clear after the fact. See our{" "}
                <Link href="/terms">terms and disclosures</Link> for how the
                site itself is scoped.
              </p>
            </SpProse>
          </div>
        </div>

        <div className="sp-split">
          <Reveal>
            <div className="sp-split-aside">
              <div className="sp-split-index">02</div>
              <h2 className="sp-split-title">
                Modeling deduction timing against income
              </h2>
            </div>
          </Reveal>
          <div>
            <SpProse>
              <p>
                Where a deduction is available, timing is what makes it
                useful. We model the deduction against the investor&apos;s
                active income for the year in question, not in isolation,
                because a deduction that lands in the wrong year against the
                wrong income does far less than one placed deliberately. That
                modeling happens before capital moves, alongside the same
                forward tax projection every other strategy on this site is
                measured against, including the layered approach shown in
                our <Link href="/case-study">case study</Link>.
              </p>
            </SpProse>
          </div>
        </div>

        <div className="sp-split">
          <Reveal>
            <div className="sp-split-aside">
              <div className="sp-split-index">03</div>
              <h2 className="sp-split-title">Why this stays narrow</h2>
            </div>
          </Reveal>
          <div>
            <SpProse>
              <p>
                Energy strategies are not a fit for every investor, and we do
                not treat them as a general-purpose planning tool. They
                belong in a plan only when eligibility, suitability and tax
                treatment all line up in the same direction, and only after
                that alignment has been checked rather than assumed. When it
                does not line up, the right answer is to pass, and we will
                tell an investor that directly.
              </p>
              <p>
                The strategies themselves stay out of this discussion by
                design. What matters to an investor is the process behind
                the recommendation: suitability checked first, eligibility
                confirmed in writing, and deduction timing modeled against
                real income rather than presented as a foregone conclusion,
                such as in{" "}
                <Link href="/strategies/real-estate-cost-seg">
                  real estate and cost segregation
                </Link>{" "}
                work, another area where placed-in-service timing changes the
                outcome.
              </p>
            </SpProse>
          </div>
        </div>

        <div className="sp-callout">
          <strong>These are securities, not private arrangements.</strong>{" "}
          They are available only to eligible accredited investors, placed
          only through licensed representatives, and carry risk including
          loss of principal. Eligibility and suitability are confirmed before
          tax treatment is ever discussed.
        </div>
      </SpSection>

      <SpSection>
        <div className="section-eyebrow">Related</div>
        <h2 className="sp-split-title">Where the same rigor applies</h2>
        <div className="sp-cards">
          <Reveal delay={0}>
            <Link className="sp-card" href="/strategies/real-estate-cost-seg">
              <span className="sp-card-num">01</span>
              <span className="sp-card-t">
                Real Estate + Cost Segregation
              </span>
              <span className="sp-card-d">
                Model acquisitions, placed-in-service timing, cost
                segregation and depreciation before capital is committed.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <Link className="sp-card" href="/case-study">
              <span className="sp-card-num">02</span>
              <span className="sp-card-t">Case Study</span>
              <span className="sp-card-d">
                How a stacked entity, real estate and energy strategy cut one
                projected tax bill by $780,938 in year one.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>
        </div>
      </SpSection>

      <SpSection>
        <SpProse>
          <p>
            Deduction treatment depends on individual facts and current law,
            and should be reviewed with the tax and legal professionals
            responsible for the return.
          </p>
        </SpProse>
      </SpSection>

      <SpCta />
    </Subpage>
  );
}
