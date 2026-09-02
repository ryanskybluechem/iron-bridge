import Link from "next/link";
import type { ReactNode } from "react";
import SpCtaCard from "./SpCtaCard";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

/**
 * Shared shell for every v2 subpage (strategies, tools, company, legal).
 * Dark page header on ink, body content on the light ground, nav and
 * footer with anchors pointed back at the homepage.
 */
export interface Crumb {
  label: string;
  href: string;
}

/** Visible breadcrumb trail + matching BreadcrumbList JSON-LD. */
function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://iron-bridge-gray.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${base}${c.href}`,
    })),
  };
  return (
    <nav className="sp-crumbs" aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {crumbs.map((c, i) => (
        <span key={c.href} className="sp-crumb">
          {i > 0 ? <span className="sp-crumb-sep">/</span> : null}
          {i < crumbs.length - 1 ? (
            <Link href={c.href}>{c.label}</Link>
          ) : (
            <span aria-current="page">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Subpage({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children: ReactNode;
}) {
  return (
    <>
      <SiteNav homeAnchorBase />
      <main className="sp">
        <header className="sp-head">
          <div className="container">
            {crumbs && crumbs.length > 0 ? <Breadcrumbs crumbs={crumbs} /> : null}
            <div className="section-eyebrow">{eyebrow}</div>
            <h1 className="sp-title">{title}</h1>
            {lede ? <p className="sp-lede">{lede}</p> : null}
          </div>
        </header>
        {children}
      </main>
      <SiteFooter homeAnchorBase />
    </>
  );
}

/** A plain content band on the light ground. */
export function SpSection({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "alt" | "dark";
}) {
  const mod =
    tone === "alt" ? " sp-section--alt" : tone === "dark" ? " sp-section--dark" : "";
  return (
    <section className={`sp-section${mod}`}>
      <div className="container">{children}</div>
    </section>
  );
}

/** Longform prose column: h2 / p / ul get sensible defaults. */
export function SpProse({ children }: { children: ReactNode }) {
  return <div className="sp-prose">{children}</div>;
}

/** Fact strip: label/value pairs in a hairline grid. */
export function SpFacts({
  items,
}: {
  items: { v: string; l: string }[];
}) {
  return (
    <div className="sp-facts">
      {items.map((f, i) => (
        <div key={i} className="sp-fact">
          <div className="sp-fact-v">{f.v}</div>
          <div className="sp-fact-l">{f.l}</div>
        </div>
      ))}
    </div>
  );
}

/** Closing CTA band shared by every subpage. */
export function SpCta({
  title = "Start with the numbers",
  body = "The first review is free. We will look at your current situation, identify the areas worth modeling, and tell you whether there appears to be a meaningful planning opportunity.",
  label = "Request your free review",
}: {
  title?: string;
  body?: string;
  label?: string;
}) {
  return (
    <section className="sp-cta">
      <div className="container">
        <SpCtaCard title={title} body={body} label={label} />
      </div>
    </section>
  );
}
