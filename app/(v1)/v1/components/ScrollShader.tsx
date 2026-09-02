"use client";

import { type MutableRefObject, useEffect, useRef } from "react";
import { hexToRgb, type ShaderParams } from "./shaderParams";

interface Props {
  className?: string;
  /** Mutable ref carrying scroll progress 0..1. Read every frame. */
  progressRef: MutableRefObject<number>;
  /** Mutable ref of tunable shader params. Read every frame. */
  paramsRef: MutableRefObject<ShaderParams>;
}

/**
 * WebGL fragment shader. All visual parameters are exposed as uniforms
 * so the live ShaderControls panel can tune them without re-rendering.
 *
 * Visual: a single soft gaussian blob (with optional secondary pearl
 * wash) migrating along a quadratic Bezier across the canvas as scroll
 * progresses. No noise, no contours, no field lines — just gradient.
 */
export default function ScrollShader({
  className = "",
  progressRef,
  paramsRef,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const visibleRef = useRef<boolean>(true);
  const smoothPRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = performance.now();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vsrc = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    const fsrc = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform float u_progress;

      uniform vec3 u_blobColor;
      uniform vec3 u_bgColor;
      uniform float u_blobSize;
      uniform float u_blobIntensity;
      uniform float u_ambient;
      uniform float u_driftSpeed;
      uniform float u_pathRange;
      uniform float u_vignette;
      uniform float u_grain;
      uniform float u_pearlIntensity;

      void main(){
        vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);
        float t = u_time;

        // Primary blob — Bezier path scaled by u_pathRange
        vec2 a1 = vec2(-0.45, -0.50) * u_pathRange;
        vec2 b1 = vec2( 0.55,  0.45) * u_pathRange;
        vec2 c1 = vec2( 0.50, -0.40) * u_pathRange;
        float pr = clamp(u_progress, 0.0, 1.0);
        vec2 c1ab = mix(a1, b1, pr);
        vec2 c1bc = mix(b1, c1, pr);
        vec2 center1 = mix(c1ab, c1bc, pr);
        center1 += u_driftSpeed * vec2(sin(t * 0.55), cos(t * 0.42));

        // Secondary pearl wash on the opposite-ish side
        vec2 a2 = vec2( 0.55,  0.55) * u_pathRange;
        vec2 b2 = vec2(-0.40,  0.10) * u_pathRange;
        vec2 c2 = vec2(-0.30, -0.50) * u_pathRange;
        vec2 c2ab = mix(a2, b2, pr);
        vec2 c2bc = mix(b2, c2, pr);
        vec2 center2 = mix(c2ab, c2bc, pr);
        center2 += (u_driftSpeed * 0.85) * vec2(cos(t * 0.6), sin(t * 0.35));

        float d1 = length(p - center1);
        float d2 = length(p - center2);
        float blob1 = exp(-d1 * d1 * u_blobSize);
        float blob2 = exp(-d2 * d2 * (u_blobSize * 1.6));

        // Wide ambient lift so the dark side doesn't go pure black
        float ambient = exp(-d1 * d1 * 0.28);

        vec3 pearl = vec3(0.945, 0.918, 0.875);

        vec3 col = u_bgColor;
        col += blob1 * u_blobColor * u_blobIntensity;
        col += blob2 * pearl * u_pearlIntensity;
        col += ambient * u_blobColor * u_ambient;

        // Vignette (mix between flat and vignetted by u_vignette)
        float vig = smoothstep(1.6, 0.20, length(p * vec2(0.9, 1.0)));
        col *= mix(1.0, 0.55 + 0.45 * vig, clamp(u_vignette, 0.0, 1.0));

        // Grain
        float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        col += (grain - 0.5) * u_grain;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsrc));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      progress: gl.getUniformLocation(prog, "u_progress"),
      blobColor: gl.getUniformLocation(prog, "u_blobColor"),
      bgColor: gl.getUniformLocation(prog, "u_bgColor"),
      blobSize: gl.getUniformLocation(prog, "u_blobSize"),
      blobIntensity: gl.getUniformLocation(prog, "u_blobIntensity"),
      ambient: gl.getUniformLocation(prog, "u_ambient"),
      driftSpeed: gl.getUniformLocation(prog, "u_driftSpeed"),
      pathRange: gl.getUniformLocation(prog, "u_pathRange"),
      vignette: gl.getUniformLocation(prog, "u_vignette"),
      grain: gl.getUniformLocation(prog, "u_grain"),
      pearlIntensity: gl.getUniformLocation(prog, "u_pearlIntensity"),
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    window.addEventListener("resize", resize);
    resize();

    const loop = () => {
      if (visibleRef.current) {
        resize();
        const target = progressRef.current ?? 0;
        smoothPRef.current += (target - smoothPRef.current) * 0.12;

        const pp = paramsRef.current;
        const blob = hexToRgb(pp.blobColor);
        const bg = hexToRgb(pp.bgColor);

        const tSec = (performance.now() - startRef.current) / 1000;
        gl.uniform2f(u.res, canvas.width, canvas.height);
        gl.uniform1f(u.time, tSec);
        gl.uniform1f(u.progress, smoothPRef.current);
        gl.uniform3f(u.blobColor, blob[0], blob[1], blob[2]);
        gl.uniform3f(u.bgColor, bg[0], bg[1], bg[2]);
        gl.uniform1f(u.blobSize, pp.blobSize);
        gl.uniform1f(u.blobIntensity, pp.blobIntensity);
        gl.uniform1f(u.ambient, pp.ambient);
        gl.uniform1f(u.driftSpeed, pp.driftSpeed);
        gl.uniform1f(u.pathRange, pp.pathRange);
        gl.uniform1f(u.vignette, pp.vignette);
        gl.uniform1f(u.grain, pp.grain);
        gl.uniform1f(u.pearlIntensity, pp.pearlIntensity);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [progressRef, paramsRef]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
