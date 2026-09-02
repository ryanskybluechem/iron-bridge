import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpCta } from "../../components/Subpage";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "1031 Exchange to DST | Iron Bridge",
  description:
    "How Iron Bridge coordinates the qualified intermediary, 45-day identification window and 180-day close on a 1031 exchange, including DST replacement options.",
  alternates: { canonical: "/strategies/1031-dst" },
};

export default function Page() {
  return (
    <Subpage
      eyebrow="Strategy"
      title={
        <>
          1031 <em className="serif">Exchange → DST</em>
        </>
      }
      lede="A 1031 exchange defers the gain on the sale of real estate by moving it into replacement property under a strict set of deadlines. We coordinate the qualified intermediary, the identification window and the closing timeline as one sequence."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Strategies", href: "/strategies" },
        { label: "1031 Exchange → DST", href: "/strategies/1031-dst" },
      ]}
    >
      <SpSection>
        <Reveal>
          <div className="sp-pull">
            Keep capital working in{" "}
            <em className="serif">real estate</em>, not on its way to tax.
          </div>
        </Reveal>
        <Reveal delay={80}>
          <SpProse>
            <h2>Deferring gain without stepping out of real estate</h2>
            <p>
              A 1031 exchange lets an owner sell investment or business-use
              real estate and defer the capital gain by reinvesting the
              proceeds into replacement property, rather than paying tax on
              the sale in the current year. The strategy keeps capital
              working in real estate instead of handing a portion of it to
              tax on the way out. It requires strict adherence to IRS
              deadlines and qualified intermediary rules, so the mechanics
              matter as much as the decision to exchange in the first place.
              An exchange is one path for an owner already weighing a{" "}
              <Link href="/strategies/real-estate-cost-seg">
                cost segregation study
              </Link>{" "}
              on the property being sold.
            </p>
          </SpProse>
        </Reveal>
      </SpSection>

      <SpSection tone="alt">
        <Reveal>
          <div className="sp-split">
            <div className="sp-split-aside">
              <div className="sp-split-index">01</div>
              <h2 className="sp-split-title">Two clocks that do not stop</h2>
              <p className="sp-split-note">
                Both run from the same closing date.
              </p>
            </div>
            <SpProse>
              <div className="sp-callout">
                <strong>
                  Once the relinquished property closes, an owner has 45 days
                  to identify replacement property and 180 days from the
                  original closing to complete the purchase of the
                  replacement.
                </strong>{" "}
                Both clocks run from the same closing date, they do not
                pause, and they are not extended for financing delays or due
                diligence.
              </div>
              <p>
                Proceeds from the sale have to move through a qualified
                intermediary and never pass through the seller&apos;s hands,
                or the exchange fails. We coordinate the QI relationship, the
                identification, and the closing timeline as one sequence
                rather than three separate events.
              </p>
            </SpProse>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="sp-split">
            <div className="sp-split-aside">
              <div className="sp-split-index">02</div>
              <h2 className="sp-split-title">Where a DST fits</h2>
              <p className="sp-split-note">
                A regulated security, not for every exchange.
              </p>
            </div>
            <SpProse>
              <p>
                A Delaware Statutory Trust, or DST, is one form of
                replacement property. Instead of buying and managing another
                property directly, an owner can acquire a fractional interest
                in institutional-grade real estate held inside the trust,
                with no landlord responsibilities. DST interests are
                securities, available only to eligible accredited investors,
                and placed only through licensed representatives. Like any
                investment, they carry risk, including loss of principal, and
                are not appropriate for every owner or every exchange. Some
                owners weigh a DST against other regulated,
                securities-based{" "}
                <Link href="/strategies/energy-strategies">
                  energy strategies
                </Link>{" "}
                that carry similar eligibility and suitability requirements.
              </p>
            </SpProse>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="sp-split">
            <div className="sp-split-aside">
              <div className="sp-split-index">03</div>
              <h2 className="sp-split-title">
                What has to be true for this to work
              </h2>
              <p className="sp-split-note">
                Modeled before the contract, not after.
              </p>
            </div>
            <SpProse>
              <p>
                An exchange needs to be modeled before the relinquished
                property is under contract, not after. That means knowing the
                likely gain, having a qualified intermediary lined up, and
                having a real short list of replacement options, DST or
                direct, ready to move on inside the 45-day window. Owners who
                wait until closing to think about replacement property are
                often the ones who end up rushed into a decision they would
                not have made with more time. See how an exchange was
                sequenced alongside other strategies in{" "}
                <Link href="/case-study">an actual engagement</Link>.
              </p>
              <p>
                Deferral and deduction treatment depends on individual facts
                and current law, and should be reviewed with the tax and
                legal professionals responsible for your return.
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
          <Link className="sp-card" href="/strategies/real-estate-cost-seg">
            <span className="sp-card-num">01</span>
            <span className="sp-card-t">Real Estate + Cost Segregation</span>
            <span className="sp-card-d">
              Model acquisitions, placed-in-service timing, cost segregation
              and depreciation before capital is committed.
            </span>
            <span className="sp-card-cta">Read more →</span>
          </Link>

          <Link className="sp-card" href="/strategies/energy-strategies">
            <span className="sp-card-num">02</span>
            <span className="sp-card-t">Energy Strategies</span>
            <span className="sp-card-d">
              Evaluate regulated securities-based energy strategies where
              suitability, tax treatment and investor eligibility align.
            </span>
            <span className="sp-card-cta">Read more →</span>
          </Link>

          <Link className="sp-card" href="/case-study">
            <span className="sp-card-num">03</span>
            <span className="sp-card-t">Case Study</span>
            <span className="sp-card-d">
              See an exchange sequenced alongside entity, real estate and
              energy strategy in one actual engagement.
            </span>
            <span className="sp-card-cta">Read more →</span>
          </Link>
        </div>
      </SpSection>

      <SpCta />
    </Subpage>
  );
}
