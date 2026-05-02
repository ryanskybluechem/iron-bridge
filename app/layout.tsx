import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iron Bridge Solutions — Elite CFO & Tax Strategy",
  description:
    "Most business owners discover their tax liability the week it's due. We project yours by June 1st — so you have six months to act, not six days to panic.",
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
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@380;420;480;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
