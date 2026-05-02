import Link from "next/link";

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

interface SiteNavProps {
  /** When true, in-page anchors prefix with "/" so they navigate home then jump.
   *  Use on /articles/[slug] etc. so #anchor links go back to home. */
  homeAnchorBase?: boolean;
}

export default function SiteNav({ homeAnchorBase = false }: SiteNavProps) {
  const a = (hash: string) => (homeAnchorBase ? `/${hash}` : hash);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <BrandMark />
          <span>Iron Bridge</span>
        </Link>
        <div className="nav-links">
          <a href={a("#services")}>Services</a>
          <a href={a("#calculators")}>Tools</a>
          <a href={a("#process")}>Process</a>
          <a href={a("#cases")}>Results</a>
          <a href={a("#team")}>Team</a>
          <a href={a("#faq")}>FAQ</a>
        </div>
        <a href={a("#contact")} className="nav-cta">
          Schedule consultation
          <Arrow />
        </a>
      </div>
    </nav>
  );
}
