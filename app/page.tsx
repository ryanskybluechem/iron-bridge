import HeroShaderClient from "./components/HeroShaderClient";
import HeroBridge from "./components/HeroBridge";
import HeroStats from "./components/HeroStats";
import Telemetry from "./components/Telemetry";
import Marquee from "./components/Marquee";
import Reveal from "./components/Reveal";
import FAQ from "./components/FAQ";
import NewsletterForm from "./components/NewsletterForm";
import ScrollFillText from "./components/ScrollFillText";
import MaskReveal from "./components/MaskReveal";
import PinnedProcess from "./components/PinnedProcess";
import {
  TaxProjectionCalc,
  RunwayCalc,
  EntityCalc,
} from "./components/Calculators";

const BrandMark = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
    <path d="M4 22 Q16 8 28 22" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 22 L28 22" stroke="currentColor" strokeWidth="1.5" />
    <line x1="10" y1="22" x2="10" y2="17.2" stroke="currentColor" strokeWidth="0.8" />
    <line x1="16" y1="22" x2="16" y2="14" stroke="currentColor" strokeWidth="0.8" />
    <line x1="22" y1="22" x2="22" y2="17.2" stroke="currentColor" strokeWidth="0.8" />
  </svg>
);

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

const services = [
  {
    t: "Financial Strategy & Planning",
    d: "A 36-month operating model that turns the back-of-the-envelope into a single source of truth.",
    items: [
      "Aligns finance with operating cadence",
      "Forward-looking 36-month plans",
      "Banking-relationship architecture",
    ],
  },
  {
    t: "Cash Flow & Budgeting",
    d: "Rolling forecasts that show liquidity risk and capacity 24 months out.",
    items: [
      "Rolling cash-flow forecasts",
      "Capex & budget discipline",
      "Resource allocation modeling",
    ],
  },
  {
    t: "Tax Projections",
    d: "The CFO-grade tax projection that anchors the year — delivered by June 1st.",
    items: [
      "Proactive multi-year strategies",
      "Tax-efficient entity structuring",
      "Deduction & credit optimization",
    ],
  },
  {
    t: "M&A & Capital Sourcing",
    d: "Sell-side and buy-side prep, debt structuring, lender introductions, and deal coordination.",
    items: [
      "Due diligence & deal structuring",
      "M&A counsel coordination",
      "Capital sourcing & lender relations",
    ],
  },
];

const steps = [
  {
    n: "01",
    k: "Plan",
    t: "Find out where you stand",
    d: "We pull your books, last three returns, and entity structure into one model. By week four you know your starting position with the same clarity a CFO sees.",
    weeks: "Weeks 1–4",
  },
  {
    n: "02",
    k: "Project",
    t: "Know your tax bill in advance",
    d: "Our proprietary projection model forecasts your liability before June 1st — incorporating Q2 trajectory, depreciation schedule, and any owner-comp moves on the table.",
    weeks: "By June 1",
  },
  {
    n: "03",
    k: "Execute",
    t: "Reduce the bill before it's due",
    d: "Entity restructuring, accelerated depreciation, R&D credits, retirement vehicles, real-estate strategies. We sequence the moves and coordinate with your CPA.",
    weeks: "Months 5–12",
  },
];

const articles = [
  {
    tag: "Tax strategy",
    t: "The June 1st projection: why timing beats tactics",
    r: "6 min read",
  },
  {
    tag: "Cash flow",
    t: "When to take distributions vs. reinvest: a CFO framework",
    r: "9 min read",
  },
  {
    tag: "M&A",
    t: "What buyers actually look at in your last three years of books",
    r: "12 min read",
  },
];

const cases = [
  {
    industry: "Manufacturing",
    region: "Midwest · 42 employees",
    before: 340_000,
    after: 178_400,
    moves: [
      "R&D credit study",
      "Cost-segregation on new facility",
      "Owner-comp restructuring",
    ],
    quote:
      "It wasn't a loophole. It was eight months of lead time we'd never had before.",
    accent: "var(--copper)",
  },
  {
    industry: "Healthcare practice",
    region: "Mountain West · 14 providers",
    before: 612_000,
    after: 388_500,
    moves: [
      "S-Corp election + reasonable salary reset",
      "Defined-benefit plan layered on existing 401(k)",
      "Real-estate self-rental",
    ],
    quote:
      "We thought our CPA was already doing this. They were doing the return — not the strategy.",
    accent: "var(--steel)",
  },
  {
    industry: "Construction & trades",
    region: "Texas · $14M revenue",
    before: 480_000,
    after: 264_000,
    moves: [
      "Section 179 sequencing across two tax years",
      "Owner-financed equipment leaseback",
      "Multi-state apportionment cleanup",
    ],
    quote:
      "We used the savings to self-fund a new yard instead of taking on a line of credit.",
    accent: "var(--pearl-2)",
  },
];

const heroIndustries = [
  "Professional services",
  "Construction & trades",
  "Healthcare practices",
  "E-commerce",
  "Manufacturing",
  "Agriculture",
  "SaaS & technology",
  "Hospitality groups",
];

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

export default function Page() {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a className="brand" href="#">
            <BrandMark />
            <span>Iron Bridge</span>
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#calculators">Tools</a>
            <a href="#process">Process</a>
            <a href="#cases">Results</a>
            <a href="#team">Team</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="#contact" className="nav-cta">
            Schedule consultation
            <Arrow />
          </a>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────── */}
      <header className="hero">
        <div className="hero-shader">
          <HeroShaderClient />
        </div>
        <HeroBridge />
        <div className="hero-grain" />
        <div className="hero-rule hero-rule--top" />

        <div className="hero-content">
          <div className="hero-meta-bar">
            <span className="hero-meta-key">No. 001</span>
            <span className="hero-meta-sep">·</span>
            <span className="hero-meta-val">Established 2014 · Ogden, UT</span>
            <span className="hero-meta-sep">·</span>
            <span className="hero-meta-val">CY 2026 cohort: open</span>
          </div>

          <div className="hero-eyebrow">
            <span className="eyebrow-dot" /> Elite CFO &amp; Tax Strategy
          </div>

          <h1 className="hero-title">
            Know your tax bill
            <br />
            <em className="serif">before</em> it knows you.
          </h1>

          <p className="hero-sub">
            Most business owners discover their tax liability the week it&apos;s
            due. We project yours by June 1st — so you have six months to act,
            not six days to panic.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Book a consultation
              <ArrowLg />
            </a>
            <a href="#calculators" className="btn btn-ghost">
              Try the calculators
            </a>
          </div>

          <HeroStats />
        </div>

        <Telemetry />

        <div className="hero-marquee">
          <div className="hero-marquee-label">
            <span className="hero-marquee-dot" />
            Built for operators running
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

      {/* ─── By the numbers ──────────────────────────────────── */}
      <section className="numbers">
        <div className="container">
          <MaskReveal>
            <div className="section-head section-head-row">
              <div>
                <div className="section-eyebrow">By the numbers</div>
                <h2 className="section-title">
                  Years of compounded strategy,
                  <br />
                  <em className="serif">measured.</em>
                </h2>
              </div>
              <p className="section-lede">
                A snapshot of what shows up across our active engagements —
                drawn from anonymized client data, refreshed quarterly.
              </p>
            </div>
          </MaskReveal>

          <div className="numbers-grid">
            {[
              {
                v: "$240M+",
                k: "Loans approved",
                d: "Across SBA, conventional, and private credit lines.",
              },
              {
                v: "$38M+",
                k: "Cumulative tax saved",
                d: "Documented relative to baseline projections.",
              },
              {
                v: "4.7×",
                k: "Median first-year ROI",
                d: "Savings vs. engagement fee, year one.",
              },
              {
                v: "94%",
                k: "Engagement renewal",
                d: "Clients who continue past the first 12 months.",
              },
              {
                v: "12 yrs",
                k: "Continuous practice",
                d: "Same partners, same playbook, refined.",
              },
              {
                v: "30 days",
                k: "First projection delivered",
                d: "From signed engagement to written model.",
              },
            ].map((n, i) => (
              <Reveal key={i} delay={i * 60} className="num-card">
                <div className="num-rule" />
                <div className="num-v">{n.v}</div>
                <div className="num-k">{n.k}</div>
                <div className="num-d">{n.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Manifesto ───────────────────────────────────────── */}
      <section className="manifesto">
        <div className="container">
          <div className="manifesto-grid">
            <div className="manifesto-eyebrow">Our thesis</div>
            <div>
              <ScrollFillText className="manifesto-lead">
                A tax return is a{" "}
                <em className="serif">historical document.</em> Filing it well
                is hygiene. Reducing what goes on it next year is strategy —
                and strategy needs runway.
              </ScrollFillText>
              <ScrollFillText className="manifesto-tail" trigger={0.7}>
                Iron Bridge gives business owners a CFO-grade tax projection by
                June 1st, then six months to execute against it. That&apos;s
                the entire game.
              </ScrollFillText>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Process (pinned scroll) ────────────────────────── */}
      <section className="process" id="process">
        <div className="container">
          <MaskReveal>
            <div className="section-head">
              <div className="section-eyebrow">The Iron Bridge method</div>
              <h2 className="section-title">
                Three steps. <em className="serif">Six months</em> of leverage.
              </h2>
              <p className="section-lede">
                A single sequenced engagement that turns reactive year-end tax
                prep into proactive multi-quarter strategy.
              </p>
            </div>
          </MaskReveal>
        </div>
        <PinnedProcess steps={steps} />
      </section>

      {/* ─── Calculators ─────────────────────────────────────── */}
      <section className="calculators" id="calculators">
        <div className="container">
          <MaskReveal>
            <div className="section-head section-head-center">
              <div className="section-eyebrow">Interactive tools</div>
              <h2 className="section-title">
                Run the numbers <em className="serif">your way.</em>
              </h2>
              <p className="section-lede">
                Three of the same models we use in client engagements —
                simplified for self-service. Move a slider and watch the math
                flow.
              </p>
            </div>
          </MaskReveal>

          <div className="calc-grid">
            <Reveal>
              <TaxProjectionCalc />
            </Reveal>
            <Reveal delay={80}>
              <RunwayCalc />
            </Reveal>
            <Reveal delay={160}>
              <EntityCalc />
            </Reveal>
          </div>

          <div className="calc-disclaimer">
            Illustrative. Real engagements model your actual books, depreciation
            schedules, entity structure, and state-specific code.{" "}
            <a href="#contact">Book a consultation →</a>
          </div>
        </div>
      </section>

      {/* ─── Services ────────────────────────────────────────── */}
      <section className="services" id="services">
        <div className="container">
          <MaskReveal>
            <div className="section-head">
              <div className="section-eyebrow">CFO services</div>
              <h2 className="section-title">
                Beyond accounting. <em className="serif">Strategic finance.</em>
              </h2>
            </div>
          </MaskReveal>

          <div className="services-grid">
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 70} className="service-card">
                <div className="service-num">0{i + 1}</div>
                <h3 className="service-title">{s.t}</h3>
                <p className="service-desc">{s.d}</p>
                <ul className="service-list">
                  {s.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
                <a href="#contact" className="service-link">
                  Learn more
                  <Arrow />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pull quote ──────────────────────────────────────── */}
      <section className="pullquote">
        <div className="pullquote-shader">
          <HeroShaderClient intensity={0.7} />
        </div>
        <div className="container">
          <div className="quote-mark">“</div>
          <ScrollFillText className="pq-text" trigger={0.6} band={0.22}>
            <blockquote>
              The difference between paying $340,000 and paying $180,000 in
              taxes wasn&apos;t a loophole. It was{" "}
              <em className="serif">eight months of lead time.</em>
            </blockquote>
          </ScrollFillText>
          <div className="pq-attr">
            <div className="pq-name">Manufacturing client · 2024 engagement</div>
          </div>
        </div>
      </section>

      {/* ─── Case studies ───────────────────────────────────── */}
      <section className="cases" id="cases">
        <div className="container">
          <MaskReveal>
            <div className="section-head section-head-row">
              <div>
                <div className="section-eyebrow">Case studies</div>
                <h2 className="section-title">
                  Same revenue.
                  <br />
                  <em className="serif">Different outcome.</em>
                </h2>
              </div>
              <p className="section-lede">
                Three anonymized engagements — different industries, different
                entities, the same shift from reactive prep to proactive
                strategy.
              </p>
            </div>
          </MaskReveal>

          <div className="case-grid">
            {cases.map((c, i) => {
              const saved = c.before - c.after;
              const pct = Math.round((saved / c.before) * 100);
              const afterPct = Math.round((c.after / c.before) * 100);
              return (
                <Reveal key={i} delay={i * 90} className="case-card">
                  <div
                    className="case-accent"
                    style={{ background: c.accent }}
                  />
                  <div className="case-head">
                    <div className="case-industry">{c.industry}</div>
                    <div className="case-region">{c.region}</div>
                  </div>

                  <div className="case-bars">
                    <div className="case-bar-row">
                      <span className="case-bar-label">Before</span>
                      <span className="case-bar-track">
                        <span
                          className="case-bar-fill case-bar-fill--before"
                          style={{ width: "100%" }}
                        />
                      </span>
                      <span className="case-bar-value case-bar-value--strike">
                        {fmt(c.before)}
                      </span>
                    </div>
                    <div className="case-bar-row">
                      <span className="case-bar-label">After</span>
                      <span className="case-bar-track">
                        <span
                          className="case-bar-fill case-bar-fill--after"
                          style={{
                            width: `${afterPct}%`,
                            background: c.accent,
                          }}
                        />
                      </span>
                      <span className="case-bar-value">{fmt(c.after)}</span>
                    </div>
                  </div>

                  <div className="case-saved">
                    <div className="case-saved-key">Saved</div>
                    <div
                      className="case-saved-value"
                      style={{ color: c.accent }}
                    >
                      {fmt(saved)}
                      <span className="case-saved-pct">−{pct}%</span>
                    </div>
                  </div>

                  <ul className="case-moves">
                    {c.moves.map((m, j) => (
                      <li key={j}>{m}</li>
                    ))}
                  </ul>

                  <p className="case-quote">
                    <span className="case-quote-mark">“</span>
                    {c.quote}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Team ────────────────────────────────────────────── */}
      <section className="team" id="team">
        <div className="container">
          <MaskReveal>
            <div className="section-head">
              <div className="section-eyebrow">The team</div>
              <h2 className="section-title">
                Strategists who built operating businesses{" "}
                <em className="serif">first.</em>
              </h2>
            </div>
          </MaskReveal>

          <div className="team-grid">
            <div className="team-card">
              <div
                className="team-portrait"
                style={{ background: "linear-gradient(135deg, #2a2520, #1a1815)" }}
              >
                <svg viewBox="0 0 200 240" className="team-svg">
                  <defs>
                    <linearGradient id="p1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#3a342e" />
                      <stop offset="1" stopColor="#1a1815" />
                    </linearGradient>
                  </defs>
                  <rect width="200" height="240" fill="url(#p1)" />
                  <circle
                    cx="100"
                    cy="92"
                    r="38"
                    fill="rgba(217,119,87,0.2)"
                    stroke="rgba(217,119,87,0.4)"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M 38 240 Q 100 150 162 240 Z"
                    fill="rgba(217,119,87,0.15)"
                    stroke="rgba(217,119,87,0.3)"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
              <div className="team-info">
                <div className="team-role">Founder · CFO Strategist</div>
                <h3 className="team-name">David Young</h3>
                <p className="team-bio">
                  Began in farm fields, learned hard work and resourcefulness,
                  then built decades of CFO expertise around the conviction
                  that financial strategy is the operator&apos;s real moat.
                </p>
                <div className="team-meta">
                  <span>20+ yr CFO</span>
                  <span className="dot">·</span>
                  <span>Owner-operator background</span>
                </div>
              </div>
            </div>

            <div className="team-card">
              <div
                className="team-portrait"
                style={{ background: "linear-gradient(135deg, #1a2030, #0e1422)" }}
              >
                <svg viewBox="0 0 200 240" className="team-svg">
                  <defs>
                    <linearGradient id="p2" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#2a3450" />
                      <stop offset="1" stopColor="#0e1422" />
                    </linearGradient>
                  </defs>
                  <rect width="200" height="240" fill="url(#p2)" />
                  <circle
                    cx="100"
                    cy="92"
                    r="38"
                    fill="rgba(91,141,239,0.2)"
                    stroke="rgba(91,141,239,0.4)"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M 38 240 Q 100 150 162 240 Z"
                    fill="rgba(91,141,239,0.15)"
                    stroke="rgba(91,141,239,0.3)"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
              <div className="team-info">
                <div className="team-role">Tax Strategist · MBA, CPA</div>
                <h3 className="team-name">David Edwards</h3>
                <p className="team-bio">
                  Tax strategist focused on minimizing burden and maximizing
                  efficiency for owner-operators. Translates code into moves
                  your business can actually execute.
                </p>
                <div className="team-meta">
                  <span>MBA · CPA</span>
                  <span className="dot">·</span>
                  <span>Multi-state practice</span>
                </div>
              </div>
            </div>

            <div className="team-card team-card-cta">
              <div className="team-cta-inner">
                <div className="team-cta-eyebrow">
                  Engagements run 6–12 months
                </div>
                <h3 className="team-cta-title">Work with us</h3>
                <p>
                  We take on a small number of new clients each quarter. Most
                  engagements start with a paid scoping call and a delivered tax
                  projection within 30 days.
                </p>
                <a href="#contact" className="btn btn-ghost btn-on-dark">
                  Apply to work with us →
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
                  Questions before you <em className="serif">commit.</em>
                </h2>
              </div>
              <p className="section-lede">
                Six things owner-operators ask in our scoping calls — answered
                up front so we can spend the call on your books, not ours.
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
                  Field notes <em className="serif">from the engagements.</em>
                </h2>
              </div>
              <a href="#" className="link-arrow">
                All articles <span>→</span>
              </a>
            </div>
          </MaskReveal>

          <div className="articles-grid">
            {articles.map((a, i) => (
              <Reveal key={i} delay={i * 60}>
                <a className="article-card" href="#">
                  <div className="article-tag">{a.tag}</div>
                  <h3 className="article-title">{a.t}</h3>
                  <div className="article-meta">
                    <span>{a.r}</span>
                    <span className="article-arrow">→</span>
                  </div>
                </a>
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
              <div className="section-eyebrow">Get started</div>
              <h2 className="cta-title">
                Six months from now,
                <br />
                <em className="serif">where do you want your tax bill to be?</em>
              </h2>
              <p className="cta-sub">
                Book a 30-minute consultation. We&apos;ll review your last
                return, map the highest-leverage moves available before
                year-end, and tell you straight whether we&apos;re the right
                fit.
              </p>
              <div className="cta-meta">
                <div className="cta-meta-row">
                  <span className="cta-meta-key">Reach us</span>
                  <span>dyoung@ironbridgesolution.com · 801-389-6558</span>
                </div>
                <div className="cta-meta-row">
                  <span className="cta-meta-key">Office</span>
                  <span>205 26th Street STE 24, Ogden, UT 84401</span>
                </div>
                <div className="cta-meta-row">
                  <span className="cta-meta-key">Cohort</span>
                  <span>CY 2026 · accepting through Q2</span>
                </div>
              </div>
            </div>

            <form className="cta-form">
              <div className="cta-form-head">
                <span className="cta-form-tag">Application</span>
                <span className="cta-form-meta">Reviewed within 48 hours</span>
              </div>
              <div className="form-row">
                <label>Name</label>
                <input type="text" placeholder="Jane Doe" />
              </div>
              <div className="form-row">
                <label>Business email</label>
                <input type="email" placeholder="jane@business.com" />
              </div>
              <div className="form-row">
                <label>Annual revenue</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>Under $1M</option>
                  <option>$1M – $5M</option>
                  <option>$5M – $25M</option>
                  <option>$25M+</option>
                </select>
              </div>
              <div className="form-row">
                <label>Biggest tax-planning challenge</label>
                <textarea rows={3} placeholder="In your own words…" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Request consultation
                <ArrowLg />
              </button>
              <div className="form-fineprint">
                By submitting, you agree to be contacted about your inquiry. We
                don&apos;t sell contact data.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-mark">
              <a className="brand brand-large" href="#">
                <BrandMark size={32} />
                <span>Iron Bridge Solutions</span>
              </a>
              <p className="footer-tag">
                CFO &amp; tax strategy for owner-operated businesses.
              </p>
            </div>
            <NewsletterForm />
          </div>

          <div className="footer-grid">
            <div>
              <div className="footer-h">Services</div>
              <a href="#">CFO services</a>
              <a href="#">Tax strategy</a>
              <a href="#">M&amp;A advisory</a>
              <a href="#">Capital sourcing</a>
            </div>
            <div>
              <div className="footer-h">Company</div>
              <a href="#">About</a>
              <a href="#">Team</a>
              <a href="#">Articles</a>
              <a href="#">Newsletter</a>
            </div>
            <div>
              <div className="footer-h">Tools</div>
              <a href="#calculators">Tax projection</a>
              <a href="#calculators">Cash-flow runway</a>
              <a href="#calculators">Entity comparator</a>
            </div>
            <div>
              <div className="footer-h">Contact</div>
              <a href="mailto:dyoung@ironbridgesolution.com">
                dyoung@ironbridgesolution.com
              </a>
              <a href="tel:8013896558">801-389-6558</a>
              <span className="footer-addr">
                205 26th Street STE 24
                <br />
                Ogden, UT 84401
              </span>
            </div>
          </div>

          <div className="footer-bar">
            <span>© 2026 Iron Bridge Solutions. All rights reserved.</span>
            <span>Built with intention.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
