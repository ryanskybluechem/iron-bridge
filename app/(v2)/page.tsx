import Link from "next/link";
import Image from "next/image";
import HeroShaderClient from "./components/HeroShaderClient";
import HeroStats from "./components/HeroStats";
import SavingsCalc from "./components/SavingsCalc";
import TeamPortrait from "./components/TeamPortrait";
import ToolsTeaserChart from "./components/ToolsTeaserChart";
import Marquee from "./components/Marquee";
import Reveal from "./components/Reveal";
import FAQ from "./components/FAQ";
import ScrollFillText from "./components/ScrollFillText";
import MaskReveal from "./components/MaskReveal";
import NeverhackProcess from "./components/NeverhackProcess";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import { ARTICLES } from "./articles/data";

const Arrow = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12">
    <path
      d="M2 6h8M7 3l3 3-3 3"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowLg = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14">
    <path
      d="M2 7h10M8 3l4 4-4 4"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iron-bridge-gray.vercel.app";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      "@id": `${SITE_URL}/#org`,
      name: "Iron Bridge Solutions",
      url: SITE_URL,
      logo: `${SITE_URL}/iron-bridge-wordmark.svg`,
      telephone: "+1-801-389-6558",
      email: "dyoung@ironbridgesolution.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "205 26th Street STE 24",
        addressLocality: "Ogden",
        addressRegion: "UT",
        postalCode: "84401",
        addressCountry: "US",
      },
      founder: [
        { "@type": "Person", name: "David Young" },
        { "@type": "Person", name: "David Edwards" },
      ],
    },
    {
      "@type": "WebSite",
      name: "Iron Bridge Solutions",
      url: SITE_URL,
    },
  ],
};

const services = [
  {
    t: "Real Estate + Cost Segregation",
    href: "/strategies/real-estate-cost-seg",
    d: "Model acquisitions, placed-in-service timing, cost segregation and depreciation before capital is committed.",
    tag: "Asset + deduction",
  },
  {
    t: "1031 Exchange → DST",
    href: "/strategies/1031-dst",
    d: "Coordinate the QI, 45-day identification clock, 180-day close and replacement options, including passive DST solutions for eligible accredited investors.",
    tag: "Tax-smart exits",
  },
  {
    t: "Entity + Compensation Design",
    href: "/strategies/entity-compensation",
    d: "Review ownership, compensation, retirement planning and entity structure as one integrated model rather than isolated tax tactics.",
    tag: "Structure first",
  },
  {
    t: "Energy Strategies",
    href: "/strategies/energy-strategies",
    d: "Evaluate regulated securities-based energy strategies where suitability, tax treatment and investor eligibility align.",
    tag: "Licensed execution",
  },
  {
    t: "M&A + Liquidity Events",
    href: "/strategies/ma-liquidity",
    d: "Model gain scenarios, entity consequences, real estate, charitable and reinvestment decisions before a transaction closes.",
    tag: "Before the deal",
  },
  {
    t: "Capital + CFO Strategy",
    href: "/strategies/capital-cfo-strategy",
    d: "Tax strategy works best when it fits cash flow, debt, liquidity, investment and operating goals. We model the whole picture.",
    tag: "One financial model",
  },
];

const steps = [
  {
    n: "01",
    k: "Project",
    t: "One forward tax projection",
    d: "Prior returns, current financials, entity structure and projected income are pulled into one decision model.",
    weeks: "Step 01 of 04",
  },
  {
    n: "02",
    k: "Model",
    t: "Every option, side by side",
    d: "We quantify tax saved, cash required, timing, risk and long-term economics rather than selling a tactic in isolation.",
    weeks: "Step 02 of 04",
  },
  {
    n: "03",
    k: "Decide",
    t: "Choose the right team around the plan",
    d: "Keep your existing CPA involved if that relationship is working. If it is not, we can help transition the tax preparation and planning relationship to Iron Bridge.",
    weeks: "Step 03 of 04",
  },
  {
    n: "04",
    k: "Execute",
    t: "We help carry it through",
    d: "We coordinate implementation through year-end and make sure the strategy reaches the people responsible for the return, whether that is your current CPA or Iron Bridge's tax team.",
    weeks: "Step 04 of 04",
  },
];

const caseMetrics = [
  { v: "$780,938", l: "Year-one tax savings" },
  { v: "39.2% → 11.5%", l: "Effective tax rate" },
  { v: "$1.81", l: "Deductions per $1 of cash" },
  { v: "Dec 31", l: "Hard planning deadline" },
];

const heroIndustries = [
  "Real Estate + Cost Segregation",
  "1031 Exchange → DST",
  "Entity + Compensation Design",
  "Energy Strategies",
  "M&A + Liquidity Events",
  "Capital + CFO Strategy",
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <SiteNav />

      {/* ─── Hero ────────────────────────────────────────────── */}
      <header className="hero">
        <div className="hero-photo">
          <Image
            src="/hero-golden-gate.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-photo-img hero-photo-img--wide"
          />
          <Image
            src="/hero-golden-gate-mobile.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-photo-img hero-photo-img--tall"
          />
        </div>
        <div className="hero-scrim" />
        <div className="hero-grain" />
        <div className="hero-rule hero-rule--top" />

        <div className="hero-content">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-meta-bar">
                <span className="hero-meta-key">Know sooner</span>
                <span className="hero-meta-sep">·</span>
                <span className="hero-meta-val">Pay less</span>
                <span className="hero-meta-sep">·</span>
                <span className="hero-meta-val">Keep more</span>
              </div>

              <h1 className="hero-title">
                Want to pay less in taxes?
                <br />
                <em className="serif">Let&apos;s talk.</em>
              </h1>

              <p className="hero-sub">
                Know what you&apos;ll owe while there&apos;s still time to
                change it. Iron Bridge builds a forward tax projection that
                shows what you&apos;re likely to owe, why you&apos;re paying
                it, and what you can still do before year-end to legally
                reduce it.
              </p>

              <div className="hero-actions">
                <a href="/contact" className="btn btn-primary">
                  Get my tax projection
                  <ArrowLg />
                </a>
                <a href="#process" className="btn btn-ghost">
                  See how it works
                </a>
              </div>

              <p className="hero-note">
                Keep your CPA if you love them. Replace them if you
                don&apos;t. We bring the projection, strategy, and execution.
              </p>
            </div>

            <SavingsCalc />
          </div>

          <HeroStats />
        </div>

        <div className="hero-marquee">
          <div className="hero-marquee-label">
            <span className="hero-marquee-dot" />
            What we model
          </div>
          <Marquee
            items={heroIndustries.map((s, i) => (
              <span key={i} className="marquee-pill">
                {s}
              </span>
            ))}
          />
        </div>
      </header>

      {/* ─── The Big Three ───────────────────────────────────── */}
      <section className="numbers" id="projection">
        <div className="container">
          <MaskReveal>
            <div className="section-head section-head-row">
              <div>
                <div className="section-eyebrow">
                  The Big Three · built from one tax projection
                </div>
                <h2 className="section-title">
                  Know the tax bill. Reduce it.
                  <br />
                  <em className="serif">Put the savings to work.</em>
                </h2>
              </div>
              <p className="section-lede">
                Everything starts with a forward tax projection. Once we know
                what you are on track to owe, we can quantify the strategies
                that may reduce the bill, show the cash required, and decide
                what is worth executing before the deadlines.
              </p>
            </div>
          </MaskReveal>

          <div className="numbers-grid">
            {[
              {
                v: "$780,938",
                k: "Keep more from taxes.",
                d: "Forward projections reveal the gap while there is still time to act. We model entity structure, depreciation, real estate and other eligible strategies before year-end.",
                c: "Year-one tax savings · actual anonymized client",
              },
              {
                v: "$6.9M",
                k: "Grow the tax savings.",
                d: "The goal is not simply to pay less tax. It is to redirect capital into productive assets that can compound instead of disappearing as a tax payment.",
                c: "Illustrative value of $500K invested annually for 10 years at 7%",
              },
              {
                v: "1 → 4",
                k: "Spread your risk beyond the business.",
                d: "Many owners have nearly all of their net worth tied to one company. We help build wealth outside the business through real estate, energy and securities strategies where appropriate.",
                c: "Business + real estate + energy + securities",
              },
            ].map((n, i) => (
              <Reveal key={i} delay={i * 60} className="num-card">
                <div className="num-rule" />
                <div className="num-v">{n.v}</div>
                <div className="num-k">{n.k}</div>
                <div className="num-d">{n.d}</div>
                <div className="num-cap">{n.c}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CPA layer ───────────────────────────────────────── */}
      <section className="cpa" id="cpa">
        <div className="container">
          <div className="cpa-grid">
            <div className="cpa-copy">
              <div className="section-eyebrow">
                Tax projection + strategy + execution
              </div>

              <ScrollFillText className="cpa-title">
                Keep the CPA you trust,{" "}
                <em className="serif">
                  or move to one integrated Iron Bridge tax team.
                </em>
              </ScrollFillText>

              <p className="cpa-lede">
                We bring the forward tax projection. If you are happy with your
                CPA, great, we can work right alongside them.
              </p>
              <p className="cpa-body">
                We start with the forward-looking tax projection, quantify the
                projected liability, model the options and help coordinate
                execution. If your current CPA relationship is not giving you
                the proactive planning you want, Iron Bridge can also become
                your tax team, combining tax preparation, projections, planning
                and implementation in one coordinated relationship.
              </p>

              <div className="badges">
                <span className="badge">CPA</span>
                <span className="badge">Series 7</span>
                <span className="badge">Series 66</span>
                <span className="badge">Real estate</span>
              </div>
            </div>

            <div className="cpa-path">
              {[
                {
                  k: "Your current CPA",
                  t: "Keep them if the relationship works",
                  d: "We can coordinate projections and strategy with the CPA you already trust, with no forced switch.",
                  mark: "A",
                },
                {
                  k: "Iron Bridge",
                  t: "Tax Strategy Engine",
                  d: "Forward projection · entity design · real estate · energy · transaction modeling.",
                  mark: "B",
                  feature: true,
                },
                {
                  k: "Your tax team",
                  t: "Or bring it together under Iron Bridge",
                  d: "If you want a more integrated relationship, we can provide tax preparation, projections, planning and implementation through one coordinated team.",
                  mark: "C",
                },
              ].map((n, i) => (
                <Reveal
                  key={i}
                  delay={i * 110}
                  className={
                    "cpa-stop" + (n.feature ? " cpa-stop--feature" : "")
                  }
                >
                  <div className="cpa-stop-rail" aria-hidden="true">
                    <span className="cpa-stop-dot">{n.mark}</span>
                  </div>
                  <div className="cpa-stop-body">
                    <div className="cpa-stop-k">{n.k}</div>
                    <h3 className="cpa-stop-t">{n.t}</h3>
                    <p className="cpa-stop-d">{n.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Process ─────────────────────────────────────────── */}
      <section className="process" id="process">
        <NeverhackProcess steps={steps} />
      </section>

      {/* ─── Strategy spotlights ─────────────────────────────── */}
      <section className="services" id="services">
        <div className="container">
          <MaskReveal>
            <div className="section-head">
              <div className="section-eyebrow">Strategy spotlights</div>
              <h2 className="section-title">
                Where tax planning becomes{" "}
                <em className="serif">execution.</em>
              </h2>
              <p className="section-lede">
                We focus on high-impact decisions that must be made before
                deadlines, not after a return is being prepared.
              </p>
            </div>
          </MaskReveal>

          <div className="services-grid">
            {services.slice(0, 3).map((s, i) => (
              <Reveal key={i} delay={i * 70} className="service-card">
                <div className="service-num">0{i + 1}</div>
                <h3 className="service-title">{s.t}</h3>
                <p className="service-desc">{s.d}</p>
                <ul className="service-list">
                  <li>{s.tag}</li>
                </ul>
                <Link href={s.href} className="service-link">
                  Read more
                  <Arrow />
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="services-more">
            <Link href="/strategies" className="btn btn-ghost">
              See all six strategies →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Pull quote ──────────────────────────────────────── */}
      <section className="pullquote">
        <div className="pullquote-shader">
          <HeroShaderClient intensity={0.7} />
        </div>
        <div className="container">
          <ScrollFillText className="pq-text" trigger={0.6} band={0.22}>
            <blockquote>
              Save money. Make money.{" "}
              <em className="serif">Diversify risk.</em>
            </blockquote>
          </ScrollFillText>
          <div className="pq-attr">
            <div className="pq-name">
              Iron Bridge&apos;s objective, beyond lowering a tax bill
            </div>
          </div>

          <a href="/contact" className="btn btn-primary pq-cta">
            Get my tax projection
            <ArrowLg />
          </a>
        </div>
      </section>

      {/* ─── Case study (teaser card) ────────────────────────── */}
      <section className="cases" id="cases">
        <div className="container">
          <MaskReveal>
            <div className="case-teaser-card">
              <div className="case-teaser-copy">
                <div className="section-eyebrow">
                  Case study · actual engagement, anonymized
                </div>
                <h2 className="case-teaser-title">
                  A $1.2M tax bill.{" "}
                  <em className="serif">Cut by $780K.</em>
                </h2>
                <Link
                  href="/case-study"
                  className="btn btn-primary case-teaser-cta"
                >
                  Read the full case study →
                </Link>
              </div>

              <div className="case-metrics case-teaser-metrics">
                {caseMetrics.map((m, i) => (
                  <div key={i} className="case-metric">
                    <div className="case-metric-v">{m.v}</div>
                    <div className="case-metric-l">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </MaskReveal>
        </div>
      </section>

      {/* ─── Tools pointer: estimate band ────────────────────── */}
      <section className="tools-teaser">
        <div className="container tools-teaser-inner">
          <ToolsTeaserChart />

          <div>
            <h2 className="tools-teaser-title">
              Get a real-time <em className="serif">savings estimate.</em>
            </h2>
            <p className="tools-teaser-copy">
              Three interactive models: tax projection, cash-flow runway, and
              entity comparison. Rough out your own numbers before we build
              the real one.
            </p>
            <Link href="/tools" className="btn btn-ghost">
              Try the tools →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Team (teaser) ───────────────────────────────────── */}
      <section className="team" id="team">
        <div className="container">
          <MaskReveal>
            <div className="section-head section-head-row">
              <div>
                <div className="section-eyebrow">The team</div>
                <h2 className="section-title">
                  Operators first. Strategy built around{" "}
                  <em className="serif">real businesses.</em>
                </h2>
              </div>
              <Link href="/team" className="link-arrow">
                Meet the team <span>→</span>
              </Link>
            </div>
          </MaskReveal>

          <div className="team-teaser">
            <Link href="/team" className="team-card team-teaser-card">
              <TeamPortrait initials="DY" tone="copper" />
              <div className="team-info">
                <div className="team-role">Managing Partner · Co-Founder</div>
                <h3 className="team-name">David Young, MBA</h3>
              </div>
            </Link>
            <Link href="/team" className="team-card team-teaser-card">
              <TeamPortrait initials="DE" tone="steel" />
              <div className="team-info">
                <div className="team-role">Managing Partner · Co-Founder</div>
                <h3 className="team-name">David Edwards, MBA, CPA</h3>
              </div>
            </Link>
            <div className="team-card team-card-cta">
              <div className="team-cta-inner">
                <div className="team-cta-eyebrow">Start with the numbers</div>
                <h3 className="team-cta-title">Free initial tax review</h3>
                <p>
                  Before you write another large tax check, find out what is
                  still on the table.
                </p>
                <a href="/contact" className="btn btn-ghost btn-on-dark">
                  Request your free review →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────── */}
      <section className="faq" id="faq">
        <div className="container">
          <MaskReveal>
            <div className="section-head section-head-row">
              <div>
                <div className="section-eyebrow">Frequently asked</div>
                <h2 className="section-title">
                  The questions we get <em className="serif">first.</em>
                </h2>
              </div>
              <p className="section-lede">
                Answered here so the first call can be spent on your numbers
                instead of ours.
              </p>
            </div>
          </MaskReveal>

          <Reveal delay={80}>
            <FAQ />
          </Reveal>
        </div>
      </section>

      {/* ─── Articles preview ────────────────────────────────── */}
      <section className="articles" id="articles">
        <div className="container">
          <MaskReveal>
            <div className="section-head section-head-row">
              <div>
                <div className="section-eyebrow">Insights</div>
                <h2 className="section-title">
                  Tax strategy, <em className="serif">in plain English.</em>
                </h2>
              </div>
              <Link href="/articles" className="link-arrow">
                All articles <span>→</span>
              </Link>
            </div>
          </MaskReveal>

          <div className="articles-grid">
            {ARTICLES.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 60}>
                <Link className="article-card" href={`/articles/${a.slug}`}>
                  <div className="article-tag">{a.tag}</div>
                  <h3 className="article-title">{a.title}</h3>
                  <div className="article-meta">
                    <span>{a.readTime}</span>
                    <span className="article-arrow">→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact / CTA ───────────────────────────────────── */}
      <section className="cta" id="contact">
        <div className="cta-shader">
          <HeroShaderClient intensity={0.85} />
        </div>
        <div className="container">
          <div className="cta-grid">
            <div className="cta-left">
              <div className="section-eyebrow">Start with the numbers</div>
              <h2 className="cta-title">
                Before you write another large tax check,
                <br />
                <em className="serif">
                  find out what is still on the table.
                </em>
              </h2>
              <p className="cta-sub">
                Start with a free initial tax review. We will look at your
                current situation, identify the areas worth modeling, and tell
                you whether there appears to be a meaningful planning
                opportunity.
              </p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-primary">
                  Request your free review
                  <ArrowLg />
                </Link>
                <Link href="/contact" className="link-arrow cta-contact-link">
                  All contact details <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
