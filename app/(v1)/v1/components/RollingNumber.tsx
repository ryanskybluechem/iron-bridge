"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  /** Numeric value (rolls when it changes). */
  value: number;
  /** Format the value into a display string. Digits 0-9 in the result will roll;
   *  every other character (commas, $, M, +, etc.) renders statically. */
  format?: (n: number) => string;
  /** ms between digit changes. Each digit is staggered slightly. */
  duration?: number;
  className?: string;
  /** When true, the first mount rolls from 0 to value (entrance animation). */
  rollOnMount?: boolean;
}

const defaultFormat = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Rolling-odometer digits. Each digit slot is a clipped column with 0-9
 * stacked vertically; the column translateY's to expose the active digit.
 * Slight stagger from left to right gives the effect a satisfying ripple.
 */
export default function RollingNumber({
  value,
  format = defaultFormat,
  duration = 700,
  className = "",
  rollOnMount = false,
}: Props) {
  const [shown, setShown] = useState(rollOnMount ? 0 : value);
  const rafRef = useRef<number>(0);
  const fromRef = useRef<number>(rollOnMount ? 0 : value);
  const startRef = useRef<number>(0);

  useEffect(() => {
    fromRef.current = shown;
    startRef.current = performance.now();
    const target = value;

    const tick = () => {
      const t = (performance.now() - startRef.current) / duration;
      if (t >= 1) {
        setShown(target);
        return;
      }
      // ease-out cubic
      const e = 1 - Math.pow(1 - t, 3);
      setShown(fromRef.current + (target - fromRef.current) * e);
      rafRef.current = requestAnimationFrame(tick);
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  const text = format(Math.round(shown));
  const chars = text.split("");

  // total digit count (used for stagger)
  let digitIndex = 0;
  const totalDigits = chars.filter((c) => /\d/.test(c)).length;

  return (
    <span className={`rolling-num ${className}`.trim()}>
      {chars.map((ch, i) => {
        if (/\d/.test(ch)) {
          const d = parseInt(ch, 10);
          // stagger: each digit transition lags slightly behind the one to its left
          const stagger = totalDigits > 1 ? (digitIndex / totalDigits) * 0.08 : 0;
          digitIndex++;
          return (
            <span key={i} className="rolling-num-digit">
              <span
                className="rolling-num-strip"
                style={{
                  transform: `translateY(${-d * 10}%)`,
                  transitionDelay: `${stagger}s`,
                }}
              >
                {Array.from({ length: 10 }).map((_, n) => (
                  <span key={n}>{n}</span>
                ))}
              </span>
            </span>
          );
        }
        return (
          <span key={i} className="rolling-num-static">
            {ch === " " ? " " : ch}
          </span>
        );
      })}
    </span>
  );
}
