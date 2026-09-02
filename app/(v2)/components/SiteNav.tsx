"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Wordmark from "./Wordmark";

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
  const [open, setOpen] = useState(false);
  // The overlay is portaled to <body> because .nav has `backdrop-filter`,
  // which (per spec) makes .nav a containing block for position:fixed
  // descendants — without the portal, "inset: 0" would size the overlay
  // to the nav bar instead of the viewport.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const menuItems: Array<{ label: string; href: string }> = [
    { label: "Tax projections", href: "/tools/tax-projection" },
    { label: "Tax strategy", href: "/strategies" },
    { label: "Case study", href: "/case-study" },
    { label: "Process", href: "/process" },
    { label: "Tools", href: "/tools" },
    { label: "Team", href: "/team" },
  ];

  const overlay = (
    <div
      className={`nav-overlay${open ? " is-open" : ""}`}
      aria-hidden={!open}
      inert={!open ? true : undefined}
    >
      <div className="nav-overlay-links">
        {menuItems.map((item, i) => {
          const index = String(i + 1).padStart(2, "0");
          const style = { transitionDelay: open ? `${80 + i * 55}ms` : "0ms" };
          return (
            <Link
              key={item.label}
              href={item.href}
              className="nav-overlay-link"
              style={style}
              onClick={() => setOpen(false)}
            >
              <span className="nav-overlay-index">{index}</span>
              {item.label}
            </Link>
          );
        })}
      </div>

      <div
        className="nav-overlay-footer"
        style={{ transitionDelay: open ? `${80 + menuItems.length * 55}ms` : "0ms" }}
      >
        <a href="/contact" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
          Get my tax projection
          <Arrow />
        </a>
        <a
          href="/contact"
          className="btn btn-ghost btn-on-dark"
          onClick={() => setOpen(false)}
        >
          Request a phone call
        </a>
      </div>
    </div>
  );

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label="Iron Bridge Solutions">
          <Wordmark tagline={false} />
        </Link>
        <div className="nav-links">
          <Link href="/tools/tax-projection">Tax projections</Link>
          <Link href="/strategies">Tax strategy</Link>
          <Link href="/case-study">Case study</Link>
          <Link href="/process">Process</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/team">Team</Link>
        </div>
        <a href="/contact" className="nav-cta">
          Get my tax projection
          <Arrow />
        </a>
        <button
          type="button"
          className={`nav-burger${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-burger-line" />
          <span className="nav-burger-line" />
        </button>
      </div>

      {mounted ? createPortal(overlay, document.body) : null}
    </nav>
  );
}
