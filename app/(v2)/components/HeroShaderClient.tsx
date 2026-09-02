"use client";

import { useEffect, useState } from "react";
import HeroShader, { type ShaderVariant } from "./HeroShader";

const VALID = new Set<ShaderVariant>(["silk", "noir", "velvet", "iron"]);

interface Props {
  intensity?: number;
  /** Override URL-derived variant. Useful for sections like the CTA where
   *  we want the chosen hero shader to also drive the dimmer backdrop. */
  fallback?: ShaderVariant;
}

/**
 * Reads ?shader=<variant> from the URL once on mount and renders that
 * variant. Defaults to "silk" if the param is missing or invalid. Keeps
 * the same variant for the whole page so the hero, pull quote, and CTA
 * stay visually coherent.
 */
export default function HeroShaderClient({
  intensity = 1.0,
  fallback = "silk",
}: Props) {
  const [variant, setVariant] = useState<ShaderVariant>(fallback);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get("shader") as ShaderVariant | null;
      if (v && VALID.has(v)) setVariant(v);
    } catch {
      /* ignore */
    }
  }, []);

  return <HeroShader intensity={intensity} variant={variant} />;
}
