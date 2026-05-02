"use client";

import {
  type MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { DEFAULT_HERO_PARAMS, type HeroParams } from "./heroParams";

const STORAGE_KEY = "ib_hero_params_v1";
const POS_KEY = "ib_hero_controls_pos_v1";

interface Props {
  paramsRef: MutableRefObject<HeroParams>;
}

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}
function SliderRow({ label, value, min, max, step, onChange }: SliderRowProps) {
  return (
    <label className="hc-row">
      <span className="hc-row-label">{label}</span>
      <span className="hc-row-value">{value.toFixed(3)}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="hc-slider"
      />
    </label>
  );
}

interface ToggleRowProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}
function ToggleRow({ label, value, onChange }: ToggleRowProps) {
  return (
    <label className="hc-row hc-row--toggle">
      <span className="hc-row-label">{label}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="hc-toggle"
      />
    </label>
  );
}

export default function HeroDevControls({ paramsRef }: Props) {
  const [params, setParams] = useState<HeroParams>(paramsRef.current);
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    offX: number;
    offY: number;
  } | null>(null);

  // Hide on ?notune
  useEffect(() => {
    try {
      const usp = new URLSearchParams(window.location.search);
      if (usp.get("notune") !== null) setHidden(true);
    } catch {
      /* ignore */
    }
  }, []);

  // Hydrate from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const merged = { ...DEFAULT_HERO_PARAMS, ...parsed };
        paramsRef.current = merged;
        setParams(merged);
      }
      const rawPos = localStorage.getItem(POS_KEY);
      if (rawPos) {
        const parsedPos = JSON.parse(rawPos);
        if (
          parsedPos &&
          typeof parsedPos.x === "number" &&
          typeof parsedPos.y === "number"
        ) {
          setPos(parsedPos);
        }
      }
    } catch {
      /* ignore */
    }
  }, [paramsRef]);

  // Mirror display/opacity values into CSS vars on the document so
  // .hero-bridge and .hero-rule--top can read them.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--hb-opacity", String(params.bridgeOpacity));
    root.style.setProperty(
      "--hb-display",
      params.showBridge ? "block" : "none"
    );
    root.style.setProperty(
      "--hr-display",
      params.showTopRule ? "block" : "none"
    );
  }, [params.bridgeOpacity, params.showBridge, params.showTopRule]);

  const update = <K extends keyof HeroParams>(
    key: K,
    value: HeroParams[K]
  ) => {
    const next = { ...paramsRef.current, [key]: value };
    paramsRef.current = next;
    setParams(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const reset = () => {
    paramsRef.current = { ...DEFAULT_HERO_PARAMS };
    setParams(paramsRef.current);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(params, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  };

  // Drag (header only)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.preventDefault();
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offX: rect.left,
      offY: rect.top,
    };
    setPos({ x: rect.left, y: rect.top });
    setDragging(true);
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragRef.current;
    const el = panelRef.current;
    if (!ds || !el) return;
    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const margin = 8;
    let nx = ds.offX + dx;
    let ny = ds.offY + dy;
    nx = Math.max(margin, Math.min(window.innerWidth - w - margin, nx));
    ny = Math.max(margin, Math.min(window.innerHeight - h - margin, ny));
    setPos({ x: nx, y: ny });
  };
  const endDrag = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setDragging(false);
    setPos((p) => {
      if (p) {
        try {
          localStorage.setItem(POS_KEY, JSON.stringify(p));
        } catch {
          /* ignore */
        }
      }
      return p;
    });
  };

  if (hidden) return null;

  const style: React.CSSProperties = pos
    ? { left: `${pos.x}px`, top: `${pos.y}px`, right: "auto", bottom: "auto" }
    : {};

  return (
    <div
      ref={panelRef}
      className={`hc-panel${dragging ? " hc-panel--dragging" : ""}${collapsed ? " hc-panel--collapsed" : ""}`}
      style={style}
    >
      <div
        className="hc-head"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span className="hc-head-grip" aria-hidden="true">
          <span /> <span /> <span />
        </span>
        <span className="hc-head-title">Hero · dev tune</span>
        <button
          type="button"
          className="hc-head-btn"
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? "+" : "–"}
        </button>
        <button
          type="button"
          className="hc-head-btn"
          onClick={() => setHidden(true)}
        >
          ×
        </button>
      </div>

      {!collapsed && (
        <div className="hc-body">
          <div className="hc-section">Lines</div>
          <SliderRow
            label="Cable count (0–5)"
            value={params.cableCount}
            min={0}
            max={5}
            step={1}
            onChange={(v) => update("cableCount", v)}
          />
          <SliderRow
            label="Cable brightness"
            value={params.cableBrightness}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => update("cableBrightness", v)}
          />
          <SliderRow
            label="Cable thickness"
            value={params.cableThickness}
            min={0.002}
            max={0.03}
            step={0.0005}
            onChange={(v) => update("cableThickness", v)}
          />

          <div className="hc-section">Atmosphere</div>
          <SliderRow
            label="Silk intensity"
            value={params.silkIntensity}
            min={0}
            max={2}
            step={0.02}
            onChange={(v) => update("silkIntensity", v)}
          />
          <SliderRow
            label="Pearl shimmer"
            value={params.pearlShimmer}
            min={0}
            max={0.5}
            step={0.01}
            onChange={(v) => update("pearlShimmer", v)}
          />
          <SliderRow
            label="Copper kiss"
            value={params.copperKiss}
            min={0}
            max={0.3}
            step={0.005}
            onChange={(v) => update("copperKiss", v)}
          />
          <SliderRow
            label="Vignette"
            value={params.vignette}
            min={0}
            max={1}
            step={0.02}
            onChange={(v) => update("vignette", v)}
          />
          <SliderRow
            label="Grain"
            value={params.grain}
            min={0}
            max={0.05}
            step={0.001}
            onChange={(v) => update("grain", v)}
          />

          <div className="hc-section">Bridge SVG overlay</div>
          <ToggleRow
            label="Show bridge SVG"
            value={params.showBridge}
            onChange={(v) => update("showBridge", v)}
          />
          <SliderRow
            label="Bridge opacity"
            value={params.bridgeOpacity}
            min={0}
            max={1}
            step={0.02}
            onChange={(v) => update("bridgeOpacity", v)}
          />
          <ToggleRow
            label="Show top rule"
            value={params.showTopRule}
            onChange={(v) => update("showTopRule", v)}
          />

          <div className="hc-actions">
            <button type="button" className="hc-action" onClick={reset}>
              Reset
            </button>
            <button type="button" className="hc-action" onClick={copy}>
              {copied ? "Copied" : "Copy values"}
            </button>
          </div>
          <div className="hc-foot">
            Drag header to move · ?notune in URL to hide
          </div>
        </div>
      )}
    </div>
  );
}
