import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SpSection, SpProse, SpCta } from "../components/Subpage";
import TeamPortrait from "../components/TeamPortrait";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "Team | Iron Bridge",
  description:
    "David Young and David Edwards lead Iron Bridge from Ogden, Utah, combining tax, finance, transaction, real estate, and capital experience under one roof.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <Subpage
      eyebrow="The team"
      title={
        <>
          Operators first. Strategy built around{" "}
          <em className="serif">real businesses.</em>
        </>
      }
      lede="Iron Bridge combines tax, finance, transaction, real estate, and capital experience to solve the issues that sit between traditional professional silos."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Team", href: "/team" },
      ]}
    >
      <SpSection>
        <div className="sp-cards">
          <Reveal delay={0}>
            <div className="team-card">
              <TeamPortrait initials="DY" tone="copper" />
              <div className="team-info">
                <div className="team-role">Managing Partner &middot; Co-Founder</div>
                <h3 className="team-name">David Young, MBA</h3>
                <p className="team-bio">
                  David helps business owners legally reduce taxes, eliminate
                  tax surprises, and keep more of the money they earn. He
                  began his career underwriting more than $600 million in
                  commercial loans, worked on major acquisitions for the U.S.
                  Air Force, later founded and scaled an energy company that
                  generated more than $75 million in sales, and has owned and
                  developed real estate. After being hit with a significant
                  and unexpected tax bill of his own, he co-founded Iron
                  Bridge to change how owners see the number.
                </p>
                <div className="team-meta" style={{ flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
                  <a href="/contact" className="btn btn-primary">
                    Request a call &rarr;
                  </a>
                  <a href="mailto:dyoung@ironbridgesolution.com">
                    dyoung@ironbridgesolution.com
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="team-card">
              <TeamPortrait initials="DE" tone="steel" />
              <div className="team-info">
                <div className="team-role">Managing Partner &middot; Co-Founder</div>
                <h3 className="team-name">David Edwards, MBA, CPA</h3>
                <p className="team-bio">
                  A CPA, MBA, and tax strategist focused on helping business
                  owners legally reduce taxes, improve financial efficiency,
                  and make better decisions with the capital they keep.
                  Fourteen years in public accounting covering businesses
                  representing more than $4 billion in revenue, roughly $200
                  million in client financing, and more than $150 million in
                  M&amp;A, then CFO for a client through growth and a sale to
                  a private equity group. Series 7 licensed.
                </p>
                <div className="team-meta" style={{ flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
                  <a href="/contact" className="btn btn-primary">
                    Request a call &rarr;
                  </a>
                  <a href="mailto:dedwards@ironbridgesolution.com">
                    dedwards@ironbridgesolution.com
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </SpSection>

      <SpSection tone="alt">
        <div className="sp-split">
          <div className="sp-split-aside">
            <div className="sp-split-title">The firm</div>
            <p className="sp-split-note">
              Ogden, Utah. Founded by two partners who work across
              professional lines instead of handing clients between them.
            </p>
          </div>
          <SpProse>
            <p>
              Iron Bridge Solutions is based in Ogden, Utah, at 205 26th
              Street STE 24. The firm was founded by David Young and David
              Edwards after David Young was hit with a significant and
              unexpected tax bill of his own, one that a purely reactive
              relationship with a CPA had not caught in time. That
              experience is why{" "}
              <Link href="/about">
                Iron Bridge starts every engagement with a forward tax
                projection
              </Link>
              , while there is still time to do something about it.
            </p>
            <p>
              The two partners bring tax, finance, transaction, real estate,
              and capital experience together under one roof, by design.
              Many of the issues that cost business owners the most money do
              not live neatly inside a single professional lane. A tax
              question is often also a financing question, or a real estate
              question, or a question about how much of a person&apos;s net
              worth is tied up in one company. Iron Bridge works across
              those lines rather than handing a client off between
              specialists who never talk to each other, the same sequence
              laid out on the <Link href="/process">process page</Link>.
            </p>
            <p>
              Iron Bridge works with business owners, and it does not
              require anyone to fire their existing CPA. If that
              relationship is working, Iron Bridge can work alongside it,
              coordinating projections and strategy. If it is not, Iron
              Bridge can step in as the integrated tax team instead. Either
              way, the objective stays the same: save money, make money, and
              diversify the risk of having too much tied up in one place,
              the same approach behind the{" "}
              <Link href="/case-study">case study</Link> on this site.
            </p>
            <p>
              The best way to find out what that looks like for your
              business is a direct conversation. Use the button above to
              request a call with David Young or David Edwards.
            </p>
          </SpProse>
        </div>
      </SpSection>

      <SpCta />
    </Subpage>
  );
}
