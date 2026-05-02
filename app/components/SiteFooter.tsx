import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const BrandMark = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
    <path d="M4 22 Q16 8 28 22" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 22 L28 22" stroke="currentColor" strokeWidth="1.5" />
    <line x1="10" y1="22" x2="10" y2="17.2" stroke="currentColor" strokeWidth="0.8" />
    <line x1="16" y1="22" x2="16" y2="14" stroke="currentColor" strokeWidth="0.8" />
    <line x1="22" y1="22" x2="22" y2="17.2" stroke="currentColor" strokeWidth="0.8" />
  </svg>
);

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
            <Link className="brand brand-large" href="/">
              <BrandMark />
              <span>Iron Bridge Solutions</span>
            </Link>
            <p className="footer-tag">
              CFO &amp; tax strategy for owner-operated businesses.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="footer-grid">
          <div>
            <div className="footer-h">Services</div>
            <a href={a("#services")}>CFO services</a>
            <a href={a("#services")}>Tax strategy</a>
            <a href={a("#services")}>M&amp;A advisory</a>
            <a href={a("#services")}>Capital sourcing</a>
          </div>
          <div>
            <div className="footer-h">Company</div>
            <a href={a("#team")}>About</a>
            <a href={a("#team")}>Team</a>
            <Link href="/articles">Articles</Link>
            <a href={a("#contact")}>Newsletter</a>
          </div>
          <div>
            <div className="footer-h">Tools</div>
            <a href={a("#calculators")}>Tax projection</a>
            <a href={a("#calculators")}>Cash-flow runway</a>
            <a href={a("#calculators")}>Entity comparator</a>
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
  );
}
