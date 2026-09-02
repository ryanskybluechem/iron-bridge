"use client";

import {
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

/**
 * Wraps text and fades each word from dim → full as it passes through the
 * viewport. Pure-React: walks children and splits text nodes into spans,
 * then a single rAF-throttled scroll handler updates each word's CSS var.
 *
 * The handler runs on every scroll/resize but never on render, so it
 * survives parent re-renders cleanly.
 */

let keyCounter = 0;
const nextKey = () => `sfw-${keyCounter++}`;

function splitToWords(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    if (!node) return null;
    const parts = node.split(/(\s+)/);
    return parts.map((p) => {
      if (!p) return null;
      if (/^\s+$/.test(p)) return p;
      return (
        <span key={nextKey()} className="sfw-word">
          {p}
        </span>
      );
    });
  }
  if (Array.isArray(node)) {
    return node.map((c, i) => (
      <Fragment key={i}>{splitToWords(c)}</Fragment>
    ));
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    const childChildren = node.props.children;
    return cloneElement(node, {}, splitToWords(childChildren));
  }
  return node;
}

interface Props {
  children: ReactNode;
  className?: string;
  /** viewport fraction at which the word reaches full intensity (0 = top, 1 = bottom). */
  trigger?: number;
  /** viewport fraction over which the fade happens. */
  band?: number;
}

export default function ScrollFillText({
  children,
  className = "",
  trigger = 0.62,
  band = 0.2,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let raf = 0;
    let queued = false;

    const update = () => {
      queued = false;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const triggerY = vh * trigger;
      const bandPx = vh * band;
      const words = root.querySelectorAll<HTMLSpanElement>(".sfw-word");
      for (const w of words) {
        const rect = w.getBoundingClientRect();
        const pos = rect.top + rect.height / 2;
        const p = Math.max(0, Math.min(1, (triggerY - pos) / bandPx));
        w.style.setProperty("--p", p.toFixed(3));
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [trigger, band]);

  return (
    <div ref={ref} className={`scroll-fill ${className}`.trim()}>
      {splitToWords(children)}
    </div>
  );
}
