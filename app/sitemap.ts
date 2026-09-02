import type { MetadataRoute } from "next";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://iron-bridge-gray.vercel.app";

const ARTICLE_SLUGS = [
  "june-1st-projection",
  "distributions-vs-reinvest",
  "what-buyers-actually-look-at",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/team",
    "/process",
    "/case-study",
    "/newsletter",
    "/contact",
    "/strategies",
    "/strategies/entity-compensation",
    "/strategies/real-estate-cost-seg",
    "/strategies/1031-dst",
    "/strategies/ma-liquidity",
    "/strategies/energy-strategies",
    "/strategies/capital-cfo-strategy",
    "/tools",
    "/tools/tax-projection",
    "/tools/cash-flow-runway",
    "/tools/entity-comparator",
    "/articles",
    ...ARTICLE_SLUGS.map((s) => `/articles/${s}`),
    "/privacy",
    "/terms",
    "/accessibility",
  ];
  return routes.map((r) => ({
    url: `${BASE}${r || "/"}`,
    changeFrequency: r.startsWith("/articles") ? "monthly" : "weekly",
    priority: r === "" ? 1 : r.startsWith("/strategies") || r === "/case-study" ? 0.8 : 0.6,
  }));
}
