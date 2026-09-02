import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { ARTICLES, formatDate } from "./data";

export const metadata: Metadata = {
  title: "Articles — Iron Bridge",
  description:
    "Field notes from the engagements: tax strategy, cash flow, and M&A frameworks for owner-operators.",
};

export default function ArticlesIndex() {
  const sorted = [...ARTICLES].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <SiteNav homeAnchorBase />

      <main className="art-index">
        <header className="art-index-head">
          <div className="container">
            <div className="section-eyebrow">Insights</div>
            <h1 className="art-index-title">
              Field notes <em className="serif">from the engagements.</em>
            </h1>
            <p className="art-index-lede">
              Frameworks and arguments we use with clients — distilled. New
              pieces every few weeks; the topics change but the bias is the
              same: clarity over cleverness.
            </p>
          </div>
        </header>

        <div className="container">
          <div className="art-index-list">
            {sorted.map((a) => (
              <Link
                key={a.slug}
                href={`/v1/articles/${a.slug}`}
                className="art-index-row"
              >
                <div className="art-index-meta">
                  <span className="art-index-tag">{a.tag}</span>
                  <span>{formatDate(a.publishedAt)}</span>
                  <span>{a.readTime}</span>
                </div>
                <h2 className="art-index-row-title">{a.title}</h2>
                <p className="art-index-excerpt">{a.excerpt}</p>
                <span className="art-index-cta">
                  Read article{" "}
                  <span aria-hidden="true" className="art-index-arrow">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter homeAnchorBase />
    </>
  );
}
