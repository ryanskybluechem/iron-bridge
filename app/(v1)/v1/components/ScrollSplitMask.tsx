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
const nextKey = () => `ssm-${keyC++}`;

function splitToWords(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    if (!node) return null;
    const parts = node.split(/(\s+)/);
    return parts.map((p) => {
      if (!p) return null;
      if (/^\s+$/.test(p)) return p;
      return (
        <span key={nextKey()} className="ssm-word">
          <span className="ssm-word-inner">{p}</span>
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
  /** Where the section's top is when the FIRST word starts revealing,
   *  expressed as a fraction of viewport height (1 = bottom edge,
   *  0 = top edge). Default 0.85 (just inside the bottom). */
  startVH?: number;
  /** Where the section's top is when the LAST word is fully revealed.
   *  Default 0.30 (about a third down the viewport). */
  endVH?: number;
  /** Soft band per word so reveals overlap a bit instead of snapping. */
  overlap?: number;
}

/**
 * Word-by-word mask reveal whose progress is *tied to scroll position*,
 * not just viewport entry. Each word gets a threshold in [0..1] of the
 * section's scroll progress; as you scroll deeper, words type in
 * sequentially. Scrolling back un-reveals — true scroll-tied.
 */
export default function ScrollSplitMask({
  children,
  className = "",
  startVH = 0.85,
  endVH = 0.30,
  overlap = 0.15,
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
      // Section progress: 0 when top is at startVH down the viewport,
      // 1 when top is at endVH down. Clamped.
      const start = vh * startVH;
      const end = vh * endVH;
      const denom = start - end || 1;
      const sp = Math.max(0, Math.min(1, (start - rect.top) / denom));

      const words = el.querySelectorAll<HTMLSpanElement>(".ssm-word-inner");
      const total = words.length;
      if (!total) return;

      words.forEach((inner, idx) => {
        const slotStart = idx / total;
        const slotEnd = (idx + 1) / total + overlap;
        const wp = Math.max(
          0,
          Math.min(1, (sp - slotStart) / (slotEnd - slotStart))
        );
        inner.style.transform = `translate3d(0, ${((1 - wp) * 110).toFixed(2)}%, 0)`;
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
    <span ref={ref} className={`scroll-split-mask ${className}`.trim()}>
      {splitToWords(children)}
    </span>
  );
}
