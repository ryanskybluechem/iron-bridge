import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpFacts, SpCta } from "../components/Subpage";

export const metadata: Metadata = {
  title: "About | Iron Bridge",
  description:
    "Iron Bridge is a tax strategy and financial planning firm in Ogden, Utah, built on a forward tax projection, quantified strategies, and one accountable team.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Subpage
      eyebrow="Company"
      title={
        <>
          About <em className="serif">Iron Bridge</em>
        </>
      }
      lede="A tax strategy and financial planning firm built around one idea: know the number early enough to do something about it."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ]}
    >
      <SpSection>
        <h2 className="sp-pull">
          Save money. Make money. <em className="serif">Diversify risk.</em>
        </h2>
        <div className="sp-cards" style={{ marginTop: 40 }}>
          <div className="sp-card">
            <div className="sp-card-num">01</div>
            <div className="sp-card-t">Save money</div>
            <p className="sp-card-d">
              Reducing the bill comes first: it is the most immediate, most
              certain lever available, and every dollar kept out of a tax
              payment is a dollar that can be redirected somewhere more
              productive.
            </p>
          </div>
          <div className="sp-card">
            <div className="sp-card-num">02</div>
            <div className="sp-card-t">Make money</div>
            <p className="sp-card-d">
              Lowering the bill is not the end goal. It is a way to redirect
              capital into productive assets, real estate, an operating
              business, anything that keeps compounding after April instead
              of disappearing as a tax payment.
            </p>
          </div>
          <div className="sp-card">
            <div className="sp-card-num">03</div>
            <div className="sp-card-t">Diversify risk</div>
            <p className="sp-card-d">
              Most owners have nearly all of their net worth tied to one
              company, often the biggest risk in the plan. Where it fits, we
              help build wealth outside the business through real estate,
              energy, and securities strategies.
            </p>
          </div>
        </div>
      </SpSection>

      <SpSection tone="alt">
        <div className="sp-split">
          <div className="sp-split-aside">
            <div className="sp-split-index">01</div>
            <div className="sp-split-title">The forward projection</div>
            <p className="sp-split-note">
              A decision tool built before year-end, not a history lesson
              after it.
            </p>
          </div>
          <SpProse>
            <p>
              Most owners find out what they owe after the year is already
              closed, when there is little left to change. Iron Bridge builds
              a forward tax projection instead: prior returns, current
              financials, entity structure, and projected income are pulled
              into one decision model that shows what you are likely to owe,
              why you are paying it, and what can still be done before
              year-end to legally reduce it.
            </p>
            <p>
              Timing is the reason this matters. For most strategies, the
              hard deadline is December 31, and several require lead time
              before that date to fund, close, or place an asset in service.
              Once we know what you are on track to owe, we can quantify the
              strategies that may reduce the bill, show the cash required for
              each one, and decide what is actually worth executing before
              the relevant deadlines. The full sequence, including how each
              deadline is tracked through year-end, is on the{" "}
              <Link href="/process">process page</Link>.
            </p>
          </SpProse>
        </div>

        <div className="sp-split">
          <div className="sp-split-aside">
            <div className="sp-split-index">02</div>
            <div className="sp-split-title">How an engagement runs</div>
            <p className="sp-split-note">
              The same four steps every time, so nothing gets decided in
              isolation.
            </p>
          </div>
          <SpProse>
            <p>
              The full walkthrough is on the{" "}
              <Link href="/process">process page</Link>; here is the short
              version.
            </p>
            <ol>
              <li>
                <strong>Project.</strong> One forward tax projection, built
                from prior returns, current financials, entity structure, and
                projected income.
              </li>
              <li>
                <strong>Model.</strong> Every option quantified side by side
                on tax saved, cash required, timing, risk, and long-term
                economics.
              </li>
              <li>
                <strong>Decide.</strong> You choose the right team around the
                plan, whether that keeps your current CPA in place or brings
                the relationship to Iron Bridge.
              </li>
              <li>
                <strong>Execute.</strong> We coordinate implementation
                through year-end so the strategy reaches whoever signs the
                return.
              </li>
            </ol>
          </SpProse>
        </div>
      </SpSection>

      <SpSection tone="dark">
        <div className="sp-band-title">
          Keep the CPA you trust,{" "}
          <em className="serif">or bring it under one roof.</em>
        </div>
        <p className="sp-band-note">
          We bring the forward tax projection. If you are happy with your
          CPA, that is fine, we can work right alongside them, coordinating
          projections and strategy with no forced switch.
        </p>
        <p className="sp-band-note">
          If your current CPA relationship is not giving you the proactive
          planning you want, Iron Bridge can become your tax team instead,
          combining tax preparation, projections, planning, and
          implementation in one coordinated relationship.
        </p>
      </SpSection>

      <SpSection>
        <SpFacts
          items={[
            { v: "$15M+", l: "Tax savings generated for clients" },
            { v: "$700M+", l: "Commercial loans underwritten" },
            { v: "$150M+", l: "Capital sourced" },
            { v: "1", l: "Tax relationship" },
          ]}
        />
        <SpProse>
          <p style={{ marginTop: 28 }}>
            Iron Bridge is based in Ogden, Utah, and works with business
            owners on the planning areas shown across this site: real estate
            and cost segregation, 1031 exchanges into DSTs, entity and
            compensation design, energy strategies, M&amp;A and liquidity
            events, and capital and CFO strategy. Meet the people behind the
            projections on the <Link href="/team">team page</Link>, or see
            the full sequence applied in a real{" "}
            <Link href="/case-study">case study</Link>.
          </p>
        </SpProse>
      </SpSection>

      <SpCta />
    </Subpage>
  );
}
