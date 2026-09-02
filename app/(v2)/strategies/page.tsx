import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpCta } from "../components/Subpage";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "Strategies | Iron Bridge",
  description:
    "The six strategy areas Iron Bridge models against a forward tax projection, from real estate and entity design to M&amp;A and capital planning.",
  alternates: { canonical: "/strategies" },
};

export default function Page() {
  return (
    <Subpage
      eyebrow="Strategy spotlights"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Strategies", href: "/strategies" },
      ]}
      title={
        <>
          Where tax planning becomes{" "}
          <em className="serif">execution.</em>
        </>
      }
      lede="We focus on high-impact decisions that must be made before deadlines, not after a return is being prepared. Everything starts with one forward tax projection, and each area below is modeled against it rather than sold as an isolated tactic."
    >
      <SpSection>
        <div className="sp-cards">
          <Reveal delay={0}>
            <Link className="sp-card" href="/strategies/real-estate-cost-seg">
              <span className="sp-card-num">01</span>
              <span className="sp-card-t">Real Estate + Cost Segregation</span>
              <span className="sp-card-d">
                Model acquisitions, placed-in-service timing, cost
                segregation and depreciation before capital is committed.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <Link className="sp-card" href="/strategies/1031-dst">
              <span className="sp-card-num">02</span>
              <span className="sp-card-t">1031 Exchange → DST</span>
              <span className="sp-card-d">
                Coordinate the QI, 45-day identification clock, 180-day
                close and replacement options, including passive DST
                solutions for eligible accredited investors.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <Link className="sp-card" href="/strategies/entity-compensation">
              <span className="sp-card-num">03</span>
              <span className="sp-card-t">Entity + Compensation Design</span>
              <span className="sp-card-d">
                Review ownership, compensation, retirement planning and
                entity structure as one integrated model rather than
                isolated tax tactics.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>

          <Reveal delay={180}>
            <Link className="sp-card" href="/strategies/energy-strategies">
              <span className="sp-card-num">04</span>
              <span className="sp-card-t">Energy Strategies</span>
              <span className="sp-card-d">
                Evaluate regulated securities-based energy strategies where
                suitability, tax treatment and investor eligibility align.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>

          <Reveal delay={240}>
            <Link className="sp-card" href="/strategies/ma-liquidity">
              <span className="sp-card-num">05</span>
              <span className="sp-card-t">M&amp;A + Liquidity Events</span>
              <span className="sp-card-d">
                Model gain scenarios, entity consequences, real estate,
                charitable and reinvestment decisions before a transaction
                closes.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>

          <Reveal delay={300}>
            <Link className="sp-card" href="/strategies/capital-cfo-strategy">
              <span className="sp-card-num">06</span>
              <span className="sp-card-t">Capital + CFO Strategy</span>
              <span className="sp-card-d">
                Tax strategy works best when it fits cash flow, debt,
                liquidity, investment and operating goals. We model the
                whole picture.
              </span>
              <span className="sp-card-cta">Read more →</span>
            </Link>
          </Reveal>
        </div>
      </SpSection>

      <SpSection tone="dark">
        <div className="sp-band-title">
          Every strategy starts from{" "}
          <em className="serif">one projection.</em>
        </div>
        <p className="sp-band-note">
          Each spotlight above is modeled against the same forward{" "}
          <Link href="/process">tax projection</Link>, not priced or pursued
          on its own. See how that plays out in a real engagement in the{" "}
          <Link href="/case-study">case study</Link>.
        </p>
      </SpSection>

      <SpCta />
    </Subpage>
  );
}
