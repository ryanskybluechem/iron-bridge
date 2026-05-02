/**
 * Shared shader-tuning params. Lives in its own file so the controls
 * panel and the WebGL component don't import from each other.
 *
 * To remove the live-tuning UI in production: drop the <ShaderControls>
 * import from NeverhackProcess and these defaults stay in effect.
 */

export interface ShaderParams {
  /** Falloff coefficient on the blob's exp(-d²·k). Smaller k → bigger, softer blob. */
  blobSize: number;
  /** Multiplier on the blob color contribution. */
  blobIntensity: number;
  /** Blob hex color (e.g. "#d97757"). */
  blobColor: string;
  /** Background hex color (deep ink). */
  bgColor: string;
  /** Ambient lift across the canvas (so dark areas don't go pure black). */
  ambient: number;
  /** Slow drift on top of progress-driven motion. */
  driftSpeed: number;
  /** Scales how far the blob travels across the canvas (0 = locked, 1.5 = exaggerated). */
  pathRange: number;
  /** Vignette strength (0 = off, 1 = full). */
  vignette: number;
  /** Grain noise amount (very small values; e.g. 0.008). */
  grain: number;
  /** A second smaller pearl wash blob — set intensity to 0 to disable. */
  pearlIntensity: number;
}

export const DEFAULT_PARAMS: ShaderParams = {
  blobSize: 3.65,
  blobIntensity: 0.6,
  blobColor: "#d97757",
  bgColor: "#0a0e1a",
  ambient: 0,
  driftSpeed: 0.045,
  pathRange: 1.16,
  vignette: 0.3,
  grain: 0.023,
  pearlIntensity: 0.38,
};

/** Convert "#rrggbb" to [r,g,b] in 0..1. */
export function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "").match(/.{2}/g);
  if (!m || m.length < 3) return [0, 0, 0];
  return [
    parseInt(m[0], 16) / 255,
    parseInt(m[1], 16) / 255,
    parseInt(m[2], 16) / 255,
  ];
}
