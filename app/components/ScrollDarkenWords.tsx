"use client";

import {
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

let keyC = 0;
const nextKey = () => `sdw-${keyC++}`;

function splitToWords(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    if (!node) return null;
    const parts = node.split(/(\s+)/);
    return parts.map((p) => {
      if (!p) return null;
      if (/^\s+$/.test(p)) return p;
      return (
        <span key={nextKey()} className="sdw-word">
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
    return cloneElement(node, {}, splitToWords(node.props.children));
  }
  return node;
}

interface Props {
  children: ReactNode;
  className?: string;
  /** Where the section's top is when the FIRST word starts darkening,
   *  expressed as a fraction of viewport height (1 = bottom edge). */
  startVH?: number;
  /** Where the section's top is when the LAST word is fully dark. */
  endVH?: number;
  /** Soft band per word so reveals overlap a bit. */
  overlap?: number;
}

/**
 * Word-by-word darkening tied to scroll position. Each word starts at a
 * faded "light" opacity and fills to full ink as the section's scroll
 * progress crosses that word's slot. Scrolling back un-darkens. Unlike
 * a clip-mask reveal, the layout never clips — words are always at full
 * size, just dimmed.
 */
export default function ScrollDarkenWords({
  children,
  className = "",
  startVH = 0.95,
  endVH = 0.35,
  overlap = 0.18,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let queued = false;

    const update = () => {
      queued = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const start = vh * startVH;
      const end = vh * endVH;
      const denom = start - end || 1;
      const sp = Math.max(0, Math.min(1, (start - rect.top) / denom));

      const words = el.querySelectorAll<HTMLSpanElement>(".sdw-word");
      const total = words.length;
      if (!total) return;

      words.forEach((w, idx) => {
        const slotStart = idx / total;
        const slotEnd = (idx + 1) / total + overlap;
        const wp = Math.max(
          0,
          Math.min(1, (sp - slotStart) / (slotEnd - slotStart))
        );
        w.style.setProperty("--p", wp.toFixed(3));
      });
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
  }, [startVH, endVH, overlap]);

  return (
    <span ref={ref} className={`scroll-darken-words ${className}`.trim()}>
      {splitToWords(children)}
    </span>
  );
}
