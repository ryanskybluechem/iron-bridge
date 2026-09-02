import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import Wordmark from "./Wordmark";

interface Props {
  /** When true, anchor links prefix with "/" so they navigate home then jump. */
  homeAnchorBase?: boolean;
}

export default function SiteFooter({ homeAnchorBase = false }: Props) {
  const a = (hash: string) => (homeAnchorBase ? `/${hash}` : hash);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-mark">
            <Link
              className="brand brand-large"
              href="/"
              aria-label="Iron Bridge Solutions"
            >
              <Wordmark />
            </Link>
            <p className="footer-tag">
              Know sooner. Pay less. Keep more.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="footer-grid">
          <div>
            <div className="footer-h">Strategies</div>
            <Link href="/strategies/entity-compensation">
              Entity &amp; compensation
            </Link>
            <Link href="/strategies/real-estate-cost-seg">
              Real estate &amp; cost seg
            </Link>
            <Link href="/strategies/1031-dst">1031 &amp; DST</Link>
            <Link href="/strategies/ma-liquidity">M&amp;A &amp; liquidity</Link>
            <Link href="/strategies/energy-strategies">Energy strategies</Link>
            <Link href="/strategies/capital-cfo-strategy">Capital &amp; CFO</Link>
            <Link href="/strategies">All strategies</Link>
          </div>
          <div>
            <div className="footer-h">Company</div>
            <Link href="/about">About</Link>
            <Link href="/team">Team</Link>
            <Link href="/process">Process</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/newsletter">Newsletter</Link>
          </div>
          <div>
            <div className="footer-h">Tools</div>
            <Link href="/tools/tax-projection">Tax projection</Link>
            <Link href="/tools/cash-flow-runway">Cash-flow runway</Link>
            <Link href="/tools/entity-comparator">Entity comparator</Link>
            <Link href="/case-study">Case study</Link>
            <Link href="/tools">All tools</Link>
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

        <p className="footer-disclosure">
          Presented for informational and illustrative purposes only; not
          financial, tax, legal, or investment advice, nor an offer or
          solicitation to buy or sell any security. Case-study details are
          anonymized and results do not guarantee future outcomes. 1031
          exchanges require strict adherence to IRS deadlines and
          qualified-intermediary rules. DST interests and other
          securities-based strategies are available only through appropriately
          licensed representatives and involve risk, including loss of
          principal. Deduction treatment depends on individual facts and
          current law. Review all strategies with the appropriate tax and legal
          professionals for your circumstances.
        </p>

        <div className="footer-bar">
          <span>© 2026 Iron Bridge Solutions. All rights reserved.</span>
          <span className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
          </span>
          <span>Iron Bridge Solutions · Ogden, Utah · ironbridgesolution.com · 801-389-6558</span>
        </div>
      </div>
    </footer>
  );
}
