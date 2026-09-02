"use client";

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

export default function NewsletterForm() {
  return (
    <form
      className="footer-newsletter"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="footer-newsletter-label">Quarterly briefing</label>
      <p className="footer-newsletter-blurb">
        One email a quarter. Tax-law moves, engagement notes, what we see
        across the book. No marketing.
      </p>
      <div className="footer-newsletter-row">
        <input type="email" placeholder="you@company.com" />
        <button type="submit">
          Subscribe
          <Arrow />
        </button>
      </div>
    </form>
  );
}
