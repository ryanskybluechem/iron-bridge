"use client";

import {
  Fragment,
  cloneElement,
  isValidElement,
  useRef,
  type ReactNode,
} from "react";
import { useReveal } from "./useReveal";

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
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const shown = useReveal(ref);

  return (
    <span
      ref={ref}
      className={`split-mask ${shown ? "is-shown" : ""} ${className}`.trim()}
    >
      {splitWords(children, { idx: 0, stagger, delay })}
    </span>
  );
}
