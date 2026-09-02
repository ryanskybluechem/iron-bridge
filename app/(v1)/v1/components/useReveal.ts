"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Shared "has this scrolled into view yet" flag for the reveal wrappers.
 *
 * IntersectionObserver alone is not enough here: it only reports when a
 * threshold is *crossed*, so an element that moves from below the viewport to
 * above it between two frames (an anchor jump, a fast wheel scroll, a reload
 * partway down the page) never produces a callback, and the content stays
 * clipped forever. So we pair the observer with a cheap rect check that runs
 * on mount and on scroll, which catches every one of those cases.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let io: IntersectionObserver | null = null;

    function cleanup() {
      io?.disconnect();
      io = null;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function reveal() {
      setShown(true);
      cleanup();
    }

    function check() {
      raf = 0;
      const node = ref.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      // in view (top 92% of the viewport) or already scrolled past
      if (r.top < window.innerHeight * 0.92 || r.bottom < 0) reveal();
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(check);
    }

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
              reveal();
              break;
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
      );
      io.observe(el);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();

    return cleanup;
  }, [ref]);

  return shown;
}
