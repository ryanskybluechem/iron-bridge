/**
 * Tunable params for the hero (silk shader + bridge SVG overlay).
 * Drop the <HeroDevControls> import to remove the live-tuning UI; the
 * defaults below stay in effect.
 */

export interface HeroParams {
  /** GLSL cable count drawn by the silk shader (0–5). */
  cableCount: number;
  /** Cable brightness multiplier (0–1). */
  cableBrightness: number;
  /** Cable line thickness in shader units (0.003–0.025). Smaller = thinner. */
  cableThickness: number;
  /** Pearl shimmer highlight strength (0–0.5). */
  pearlShimmer: number;
  /** Copper warmth at the bottom-left edge (0–0.3). */
  copperKiss: number;
  /** Silk-flow drape intensity multiplier (0–2). */
  silkIntensity: number;
  /** Vignette mix (0 = flat, 1 = full vignette). */
  vignette: number;
  /** Grain amount (0–0.05). */
  grain: number;
  /** Bridge SVG overlay opacity (0–1). */
  bridgeOpacity: number;
  /** Whether the bridge SVG renders at all. */
  showBridge: boolean;
  /** Whether the thin top rule (under the nav) renders. */
  showTopRule: boolean;
}

export const DEFAULT_HERO_PARAMS: HeroParams = {
  cableCount: 0,
  cableBrightness: 0.07,
  cableThickness: 0.008,
  pearlShimmer: 0.18,
  copperKiss: 0.13,
  silkIntensity: 1.3,
  vignette: 1,
  grain: 0.024,
  bridgeOpacity: 0.14,
  showBridge: true,
  showTopRule: false,
};
