import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import SpCtaCard from "../../components/SpCtaCard";
import { ARTICLES, findArticle, formatDate, type Block } from "../data";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: `${article.title} | Iron Bridge`,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "p":
      return (
        <p
          key={i}
          className="art-p"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "h2":
      return (
        <h2 key={i} className="art-h2">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul key={i} className="art-list">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={i} className="art-quote">
          <span className="art-quote-mark">“</span>
          {block.text}
          {block.attribution && (
            <span className="art-quote-attr">{block.attribution}</span>
          )}
        </blockquote>
      );
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const others = ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://iron-bridge-gray.vercel.app";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Iron Bridge Solutions",
      url: base,
    },
    publisher: {
      "@type": "Organization",
      name: "Iron Bridge Solutions",
      logo: { "@type": "ImageObject", url: `${base}/iron-bridge-wordmark.svg` },
    },
    mainEntityOfPage: `${base}/articles/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteNav homeAnchorBase />

      <article className="art">
        <header className="art-head">
          <div className="container art-head-inner">
            <div className="art-meta">
              <Link href="/articles" className="art-back">
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path
                    d="M10 6H2M5 3L2 6l3 3"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                All articles
              </Link>
              <span className="art-meta-sep">·</span>
              <span className="art-meta-tag">{article.tag}</span>
              <span className="art-meta-sep">·</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="art-meta-sep">·</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="art-title">{article.title}</h1>

            <p className="art-excerpt">{article.excerpt}</p>

            <p className="art-byline">By the Iron Bridge Solutions team</p>
          </div>
        </header>

        <div className="art-body">
          <div className="container art-body-inner">
            {article.body.map((b, i) => renderBlock(b, i))}

            <div className="art-cta-card">
              <SpCtaCard
                title="Want this run on your books?"
                body="The first review is free. We will look at your current situation, identify the areas worth modeling, and tell you whether there appears to be a meaningful planning opportunity."
                label="Book a consultation"
              />
            </div>
          </div>
        </div>

        {others.length > 0 && (
          <section className="art-more">
            <div className="container">
              <div className="art-more-head">
                <span className="art-more-eyebrow">Keep reading</span>
              </div>
              <div className="art-more-grid">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/articles/${o.slug}`}
                    className="art-more-card"
                  >
                    <div className="art-more-tag">{o.tag}</div>
                    <h3 className="art-more-title">{o.title}</h3>
                    <div className="art-more-meta">
                      <span>{o.readTime}</span>
                      <span className="art-more-arrow">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <SiteFooter homeAnchorBase />
    </>
  );
}
