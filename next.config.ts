import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Local verification builds write to .next-build (BUILD_DIR=.next-build)
  // so they never clobber the dev server's .next. Vercel builds remotely
  // and ignores this env var.
  distDir: process.env.BUILD_DIR || ".next",
  async redirects() {
    // v2 was promoted to the root; keep any shared /v2 links working.
    return [
      { source: "/v2", destination: "/", permanent: false },
      { source: "/v2/:path*", destination: "/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
