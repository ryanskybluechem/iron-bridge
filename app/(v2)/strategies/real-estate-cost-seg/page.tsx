import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpCta } from "../../components/Subpage";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Real Estate + Cost Segregation | Iron Bridge",
  description:
    "How Iron Bridge models acquisitions, placed-in-service timing and cost segregation before capital is committed, not after the return is already being prepared.",
  alternates: { canonical: "/strategies/real-estate-cost-seg" },
};

export default function Page() {
  return (
    <Subpage
      eyebrow="Strategy"
      title={
        <>
          Real Estate + <em className="serif">Cost Segregation</em>
        </>
      }
      lede="Depreciation is not just a deduction, it is a timing decision. We model acquisitions, placed-in-service dates and cost segregation before capital is committed, not after the return for that year is already being prepared."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Strategies", href: "/strategies" },
        { label: "Real Estate + Cost Segregation", href: "/strategies/real-estate-cost-seg" },
      ]}
    >
      <SpSection>
        <Reveal>
          <div className="sp-pull">
            The building does not change.{" "}
            <em className="serif">The timing of the deduction does.</em>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <SpProse>
            <h2>Depreciation is a timing decision, not just a deduction</h2>
            <p>
              Commercial and investment real estate depreciates over a long
              schedule by default, generally 39 years for most commercial
              property and 27.5 years for residential rental. A cost
              segregation study breaks a building into its component parts,
              structural elements, land improvements, personal property, and
              assigns each the depreciation schedule it actually qualifies
              for. Several of those components depreciate over 5, 7 or 15
              years instead of the default schedule. The building does not
              change. The timing of the deduction does.
            </p>
          </SpProse>
        </Reveal>
      </SpSection>

      <SpSection tone="alt">
        <Reveal>
          <div className="sp-split">
            <div className="sp-split-aside">
              <div className="sp-split-index">01</div>
              <h2 className="sp-split-title">Who this applies to</h2>
              <p className="sp-split-note">
                New acquisitions and property already owned.
              </p>
            </div>
            <SpProse>
              <p>
                Cost segregation is most useful for owners who have income to
                apply the deduction against, whether from the property itself
                or from other active income depending on how ownership is
                structured. It applies to new acquisitions as well as
                property already owned, and it can be run on a building that
                has been in service for years through a look-back study. See
                how a similar sequence played out in{" "}
                <Link href="/case-study">an actual engagement</Link>.
              </p>
              <ul>
                <li>
                  Owners acquiring commercial, industrial or larger
                  residential rental property
                </li>
                <li>
                  Owners who have held property for several years without
                  ever running a cost segregation study
                </li>
                <li>
                  Businesses planning a build-out, renovation or expansion of
                  owned real estate
                </li>
                <li>
                  Owners evaluating whether to buy or lease a facility the
                  business occupies
                </li>
              </ul>
            </SpProse>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="sp-split">
            <div className="sp-split-aside">
              <div className="sp-split-index">02</div>
              <h2 className="sp-split-title">How we model an acquisition</h2>
              <p className="sp-split-note">
                Before capital is committed, not after.
              </p>
            </div>
            <SpProse>
              <p>
                Before capital is committed, we model the acquisition against
                the depreciation outcome: purchase price allocation, the
                estimated split between short-life and long-life components,
                and how the resulting deduction interacts with the
                owner&apos;s broader tax position. This is where the cost
                segregation decision belongs, before closing, not after the
                return for that year is already underway. We also model the
                reverse case, an existing property being evaluated for a
                look-back study now. Run your own numbers first with the{" "}
                <Link href="/tools/tax-projection">
                  tax projection tool
                </Link>
                .
              </p>
            </SpProse>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="sp-split">
            <div className="sp-split-aside">
              <div className="sp-split-index">03</div>
              <h2 className="sp-split-title">
                Placed-in-service timing and the rules that govern it
              </h2>
              <p className="sp-split-note">
                One of the few hard facts in this strategy.
              </p>
            </div>
            <SpProse>
              <div className="sp-callout">
                <strong>
                  The depreciation clock starts when a property is placed in
                  service
                </strong>
                , not when it is purchased or when construction finishes on
                paper. That date determines which tax year the deduction
                lands in, and it is one of the few pieces of this strategy
                that is a hard fact rather than a modeling choice.
              </div>
              <p>
                Getting placed-in-service timing right, and coordinating it
                with the rest of the year&apos;s tax picture, is part of what
                a cost segregation engagement has to get right from the
                start. The same discipline applies to a property moving
                through a{" "}
                <Link href="/strategies/1031-dst">1031 exchange</Link>.
              </p>
              <p>
                Deduction treatment depends on individual facts and current
                law, and should be reviewed with the tax and legal
                professionals responsible for your return.
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
          <Link className="sp-card" href="/strategies/1031-dst">
            <span className="sp-card-num">01</span>
            <span className="sp-card-t">1031 Exchange → DST</span>
            <span className="sp-card-d">
              Coordinate the QI, 45-day identification clock, 180-day close
              and replacement options, including passive DST solutions for
              eligible accredited investors.
            </span>
            <span className="sp-card-cta">Read more →</span>
          </Link>

          <Link className="sp-card" href="/case-study">
            <span className="sp-card-num">02</span>
            <span className="sp-card-t">Case Study</span>
            <span className="sp-card-d">
              See cost segregation modeled alongside entity and energy
              strategy in one actual engagement.
            </span>
            <span className="sp-card-cta">Read more →</span>
          </Link>

          <Link className="sp-card" href="/tools/tax-projection">
            <span className="sp-card-num">03</span>
            <span className="sp-card-t">Tax Projection Timeline</span>
            <span className="sp-card-d">
              See how the savings available from tax planning shrink the
              later in the year you start.
            </span>
            <span className="sp-card-cta">Read more →</span>
          </Link>
        </div>
      </SpSection>

      <SpCta />
    </Subpage>
  );
}
