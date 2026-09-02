"use client";

import { useEffect, useRef, useState } from "react";
import RollingNumber from "./RollingNumber";

const STORAGE_KEY = "ib_telemetry_pos_v1";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Pos {
  x: number;
  y: number;
}

export default function Telemetry() {
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const [pos, setPos] = useState<Pos | null>(null);
  const [dragging, setDragging] = useState(false);
  const [tick, setTick] = useState(0);

  // Hydrate saved position
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        typeof parsed.x === "number" &&
        typeof parsed.y === "number"
      ) {
        setPos(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Subtle ticking values
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  const drift = (seed: number) =>
    Math.sin((tick + seed) * 1.21) * 0.5 + 0.5;

  const projected = 312_400 + Math.round(drift(1) * 4200);
  const optimized = 184_200 + Math.round(drift(2) * 3100);
  const saved = projected - optimized;
  const monthIdx = (new Date().getMonth() + Math.floor(drift(3) * 0.8)) % 12;

  const startDrag = (clientX: number, clientY: number, pointerId?: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const parent = el.offsetParent as HTMLElement | null;
    const parentRect = parent?.getBoundingClientRect() ?? {
      left: 0,
      top: 0,
    };
    const offsetX = rect.left - parentRect.left;
    const offsetY = rect.top - parentRect.top;
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      offsetX,
      offsetY,
    };
    // lock position at the current visual location so the jump from
    // bottom/right CSS positioning to absolute top/left is invisible
    setPos({ x: offsetX, y: offsetY });
    setDragging(true);
    if (pointerId !== undefined) {
      try {
        el.setPointerCapture(pointerId);
      } catch {
        /* ignore */
      }
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // only primary button
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.preventDefault();
    startDrag(e.clientX, e.clientY, e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragRef.current;
    const el = ref.current;
    if (!ds || !el) return;
    const parent = el.offsetParent as HTMLElement | null;
    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;
    let nx = ds.offsetX + dx;
    let ny = ds.offsetY + dy;
    const margin = 12;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const pw = parent?.clientWidth ?? window.innerWidth;
    const ph = parent?.clientHeight ?? window.innerHeight;
    nx = Math.max(margin, Math.min(pw - w - margin, nx));
    ny = Math.max(margin, Math.min(ph - h - margin, ny));
    setPos({ x: nx, y: ny });
  };

  const endDrag = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setDragging(false);
    setPos((p) => {
      if (p) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
        } catch {
          /* ignore */
        }
      }
      return p;
    });
  };

  const onPointerUp = () => endDrag();
  const onPointerCancel = () => endDrag();

  const onDoubleClick = () => {
    setPos(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const style: React.CSSProperties = pos
    ? {
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        right: "auto",
        bottom: "auto",
        transform: "none",
      }
    : {};

  return (
    <div
      ref={ref}
      className={`telemetry${dragging ? " telemetry--dragging" : ""}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onDoubleClick={onDoubleClick}
      role="figure"
      aria-label="Live tax projection — drag to move, double-click to reset"
    >
      <div className="telemetry-grip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="telemetry-bar">
        <span className="telemetry-pulse" />
        <span className="telemetry-key">LIVE PROJECTION</span>
        <span className="telemetry-meta">PORTFOLIO MEDIAN · CY 2026</span>
      </div>

      <div className="telemetry-rows">
        <div className="telemetry-row">
          <span className="telemetry-label">Status quo liability</span>
          <span className="telemetry-value telemetry-value--strike">
            <RollingNumber
              value={projected}
              format={(n) => "$" + n.toLocaleString("en-US")}
              duration={650}
            />
          </span>
        </div>
        <div className="telemetry-row">
          <span className="telemetry-label">Post-strategy liability</span>
          <span className="telemetry-value">
            <RollingNumber
              value={optimized}
              format={(n) => "$" + n.toLocaleString("en-US")}
              duration={650}
            />
          </span>
        </div>
        <div className="telemetry-row telemetry-row--accent">
          <span className="telemetry-label">Median client savings</span>
          <span className="telemetry-value telemetry-value--accent">
            <RollingNumber
              value={saved}
              format={(n) => "$" + n.toLocaleString("en-US")}
              duration={650}
            />
          </span>
        </div>
      </div>

      <div className="telemetry-foot">
        <span>Projection delivered</span>
        <span className="telemetry-month">{months[monthIdx]} 1, 2026</span>
      </div>

      <div className="telemetry-hint">drag · double-click to reset</div>
    </div>
  );
}
