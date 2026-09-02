import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpCta } from "../../components/Subpage";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Entity + Compensation Design | Iron Bridge",
  description:
    "How Iron Bridge models entity structure, compensation and retirement plan design together, so each decision is set before the deadline that locks it in.",
  alternates: { canonical: "/strategies/entity-compensation" },
};

export default function Page() {
  return (
    <Subpage
      eyebrow="Strategy"
      title={
        <>
          Entity + <em className="serif">Compensation Design</em>
        </>
      }
      lede="Ownership, compensation and retirement planning are usually decided one at a time, by different people, at different points in the year. We model them as a single system, because that is closer to how the tax bill actually gets calculated."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Strategies", href: "/strategies" },
        { label: "Entity + Compensation Design", href: "/strategies/entity-compensation" },
      ]}
    >
      <SpSection>
        <Reveal>
          <div className="sp-pull">
            Three decisions, made separately, rarely add up to{" "}
            <em className="serif">the most efficient structure available.</em>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <SpProse>
            <h2>One system, not three separate decisions</h2>
            <p>
              Most business owners set ownership, compensation and retirement
              decisions at different times, for different reasons, often with
              different advisors involved in each. The entity gets set up
              when the business starts. Compensation gets set once a year,
              often just to clear a payroll deadline. A retirement plan gets
              added later, if at all. Each decision is reasonable on its own.
              Together, they rarely add up to the most efficient structure
              available.
            </p>
            <p>
              We treat entity structure, compensation and retirement planning
              as one model. The split between salary and distribution affects
              payroll tax, qualified business income treatment, and how much
              can be contributed to a retirement plan. The entity type, S
              corporation, C corporation, partnership, or a combination
              across multiple entities, changes which of those levers are
              even available. Reviewing these pieces together, instead of one
              at a time, is usually where the largest and most durable
              planning opportunity sits.
            </p>
          </SpProse>
        </Reveal>
      </SpSection>

      <SpSection tone="alt">
        <Reveal>
          <div className="sp-split">
            <div className="sp-split-aside">
              <div className="sp-split-index">01</div>
              <h2 className="sp-split-title">Where this shows up</h2>
              <p className="sp-split-note">
                Signals that a review is overdue.
              </p>
            </div>
            <SpProse>
              <p>
                This work tends to matter most for owners who have grown past
                a simple structure: multiple entities under common ownership,
                a mix of active and passive income, compensation that has not
                been revisited since the business was smaller, or a
                retirement plan that has never been reviewed against current
                income levels. See how these pieces came together in{" "}
                <Link href="/case-study">an actual engagement</Link>.
              </p>
              <ul>
                <li>
                  S corporation owners setting reasonable compensation
                  without a documented basis for the number
                </li>
                <li>
                  Multiple related entities with inconsistent compensation or
                  ownership treatment across them
                </li>
                <li>
                  Owners with no qualified retirement plan, or a plan that
                  has not kept pace with income
                </li>
                <li>
                  Businesses considering a change in entity type ahead of a
                  sale, expansion or new partner
                </li>
              </ul>
            </SpProse>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="sp-split">
            <div className="sp-split-aside">
              <div className="sp-split-index">02</div>
              <h2 className="sp-split-title">How we model it</h2>
              <p className="sp-split-note">
                Alternatives, projected forward, before you commit.
              </p>
            </div>
            <SpProse>
              <p>
                We start with the entity structure and prior returns, then
                layer in current compensation, ownership percentages and any
                existing retirement plan. From there we build alternatives: a
                different salary-to-distribution split, a different entity
                election, a retirement plan design suited to the income
                level, or a restructuring across entities where more than one
                is involved. Each alternative is projected forward so the
                owner can see the tax effect, the cash required, and any
                nontax tradeoffs before committing to a change. This is the
                same modeling discipline behind every step of the{" "}
                <Link href="/process">Iron Bridge process</Link>.
              </p>
            </SpProse>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="sp-split">
            <div className="sp-split-aside">
              <div className="sp-split-index">03</div>
              <h2 className="sp-split-title">Why timing matters</h2>
              <p className="sp-split-note">
                Options disappear once the year closes.
              </p>
            </div>
            <SpProse>
              <div className="sp-callout">
                <strong>
                  Entity elections and compensation structures generally need
                  to be in place before the tax year they apply to closes
                </strong>
                , and some retirement plan types must be adopted before
                December 31 to count for that year.
              </div>
              <p>
                Waiting until a return is being prepared removes most of the
                available options. Reviewing the structure earlier in the
                year, while there is still time to make a change, is what
                keeps these decisions from becoming fixed by default.
              </p>
              <p>
                As with any strategy discussed here, deduction and tax
                treatment depends on individual facts and current law, and
                should be reviewed with the tax and legal professionals
                responsible for your return.
              </p>
            </SpProse>
          </div>
        </Reveal>
      </SpSection>

      <SpSection>
        <div className="section-head">
          <div className="section-eyebrow">Related</div>
          <h2 className="section-title">Where this connects.</h2>
        </div>
        <div className="sp-cards">
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

          <Link className="sp-card" href="/case-study">
            <span className="sp-card-num">02</span>
            <span className="sp-card-t">Case Study</span>
            <span className="sp-card-d">
              See entity, compensation and retirement design modeled
              alongside real estate and energy strategy in one engagement.
            </span>
            <span className="sp-card-cta">Read more →</span>
          </Link>

          <Link className="sp-card" href="/process">
            <span className="sp-card-num">03</span>
            <span className="sp-card-t">Process</span>
            <span className="sp-card-d">
              How a forward tax projection turns into a modeled, decided and
              executed plan before the year closes.
            </span>
            <span className="sp-card-cta">Read more →</span>
          </Link>
        </div>
      </SpSection>

      <SpCta />
    </Subpage>
  );
}
