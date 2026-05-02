"use client";

import {
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

let keyC = 0;
const nextKey = () => `sm-${keyC++}`;

interface Ctx {
  idx: number;
  stagger: number;
  delay: number;
}

function splitWords(node: ReactNode, ctx: Ctx): ReactNode {
  if (typeof node === "string") {
    if (!node) return null;
    const parts = node.split(/(\s+)/);
    return parts.map((p) => {
      if (!p) return null;
      if (/^\s+$/.test(p)) return p;
      const myIdx = ctx.idx++;
      const d = ctx.delay + myIdx * ctx.stagger;
      return (
        <span
          key={nextKey()}
          className="sm-word"
          style={{ ["--smd" as string]: `${d}ms` }}
        >
          <span className="sm-word-inner">{p}</span>
        </span>
      );
    });
  }
  if (Array.isArray(node)) {
    return node.map((c, i) => (
      <Fragment key={i}>{splitWords(c, ctx)}</Fragment>
    ));
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return cloneElement(node, {}, splitWords(node.props.children, ctx));
  }
  return node;
}

interface Props {
  children: ReactNode;
  className?: string;
  /** ms between each word's reveal */
  stagger?: number;
  /** initial delay before the first word starts */
  delay?: number;
  /** root rootMargin for the intersection observer */
  rootMargin?: string;
}

/**
 * Wraps children and reveals them word-by-word with a clip-path mask: each
 * word is an inline-block with overflow:hidden, and an inner span lifts up
 * from below into view. Stagger is applied per-word for a typewriter-y feel.
 *
 * Inline elements (em, strong, span) are preserved — the splitter recurses
 * through the React tree.
 */
export default function SplitMask({
  children,
  className = "",
  stagger = 70,
  delay = 0,
  rootMargin = "0px 0px -10% 0px",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <span
      ref={ref}
      className={`split-mask ${shown ? "is-shown" : ""} ${className}`.trim()}
    >
      {splitWords(children, { idx: 0, stagger, delay })}
    </span>
  );
}
