"use client";

import { useRef } from "react";
import HeroShader, { type ShaderVariant } from "./HeroShader";
import HeroDevControls from "./HeroDevControls";
import { DEFAULT_HERO_PARAMS, type HeroParams } from "./heroParams";

interface Props {
  /** Optional URL-style override for variant (the hero defaults to "silk"). */
  variant?: ShaderVariant;
}

/**
 * Hero-only client wrapper that owns the shared paramsRef so the dev
 * controls panel and the shader can talk to each other without React
 * re-renders. Removing this in favor of HeroShaderClient (or just
 * HeroShader) drops the dev panel cleanly.
 */
export default function HeroShaderTuned({ variant = "silk" }: Props) {
  const paramsRef = useRef<HeroParams>({ ...DEFAULT_HERO_PARAMS });
  return (
    <>
      <HeroShader variant={variant} paramsRef={paramsRef} />
      <HeroDevControls paramsRef={paramsRef} />
    </>
  );
}
