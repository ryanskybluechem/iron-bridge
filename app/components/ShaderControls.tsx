"use client";

import {
  type MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { DEFAULT_PARAMS, type ShaderParams } from "./shaderParams";

const STORAGE_KEY = "ib_shader_params_v1";
const POS_KEY = "ib_shader_controls_pos_v1";

interface Props {
  /** The shared ref the shader reads from. We mutate it on every change. */
  paramsRef: MutableRefObject<ShaderParams>;
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
    <label className="sc-row">
      <span className="sc-row-label">{label}</span>
      <span className="sc-row-value">{value.toFixed(3)}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="sc-slider"
      />
    </label>
  );
}

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="sc-row sc-row--color">
      <span className="sc-row-label">{label}</span>
      <span className="sc-row-value">{value}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sc-color"
      />
    </label>
  );
}

/**
 * Floating, draggable, collapsible panel for live-tuning shader params.
 * Defaults & current values persist to localStorage; "Copy" emits the
 * current values as a JSON snippet so you can paste them back as new
 * defaults later. Hidden via ?notune in the URL or the X button.
 */
export default function ShaderControls({ paramsRef }: Props) {
  const [params, setParams] = useState<ShaderParams>(paramsRef.current);
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

  // Hide entirely if URL says ?notune
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
        const merged = { ...DEFAULT_PARAMS, ...parsed };
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

  const update = <K extends keyof ShaderParams>(
    key: K,
    value: ShaderParams[K]
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
    paramsRef.current = { ...DEFAULT_PARAMS };
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

  // Drag (header bar only)
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
      className={`sc-panel${dragging ? " sc-panel--dragging" : ""}${collapsed ? " sc-panel--collapsed" : ""}`}
      style={style}
    >
      <div
        className="sc-head"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span className="sc-head-grip" aria-hidden="true">
          <span /> <span /> <span />
        </span>
        <span className="sc-head-title">Shader · dev tune</span>
        <button
          type="button"
          className="sc-head-btn"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "+" : "–"}
        </button>
        <button
          type="button"
          className="sc-head-btn"
          onClick={() => setHidden(true)}
          aria-label="Hide"
        >
          ×
        </button>
      </div>

      {!collapsed && (
        <div className="sc-body">
          <ColorRow
            label="Blob color"
            value={params.blobColor}
            onChange={(v) => update("blobColor", v)}
          />
          <ColorRow
            label="Background"
            value={params.bgColor}
            onChange={(v) => update("bgColor", v)}
          />
          <SliderRow
            label="Blob size (smaller = bigger)"
            value={params.blobSize}
            min={0.2}
            max={6}
            step={0.05}
            onChange={(v) => update("blobSize", v)}
          />
          <SliderRow
            label="Blob intensity"
            value={params.blobIntensity}
            min={0}
            max={4}
            step={0.05}
            onChange={(v) => update("blobIntensity", v)}
          />
          <SliderRow
            label="Pearl wash intensity"
            value={params.pearlIntensity}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => update("pearlIntensity", v)}
          />
          <SliderRow
            label="Ambient lift"
            value={params.ambient}
            min={0}
            max={0.6}
            step={0.01}
            onChange={(v) => update("ambient", v)}
          />
          <SliderRow
            label="Drift speed"
            value={params.driftSpeed}
            min={0}
            max={0.2}
            step={0.005}
            onChange={(v) => update("driftSpeed", v)}
          />
          <SliderRow
            label="Path range (0 = locked)"
            value={params.pathRange}
            min={0}
            max={1.6}
            step={0.02}
            onChange={(v) => update("pathRange", v)}
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

          <div className="sc-actions">
            <button type="button" className="sc-action" onClick={reset}>
              Reset
            </button>
            <button type="button" className="sc-action" onClick={copy}>
              {copied ? "Copied" : "Copy values"}
            </button>
          </div>
          <div className="sc-foot">
            Tweak live · drag header to move · ?notune to hide
          </div>
        </div>
      )}
    </div>
  );
}
