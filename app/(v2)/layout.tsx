import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import GridPointer from "./components/GridPointer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iron-bridge-gray.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Iron Bridge Solutions | Tax Strategy for Business Owners",
  description:
    "Know what you owe while you can still change it. Iron Bridge projects your tax liability before year end, models the strategies that are still available, and helps execute them before December 31.",
  openGraph: {
    siteName: "Iron Bridge Solutions",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,380;0,420;0,480;0,500;0,600;1,500;1,600&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll />
        <GridPointer />
        {children}
      </body>
    </html>
  );
}
