"use client";

import { type MutableRefObject, useEffect, useRef } from "react";

interface Props {
  className?: string;
  /** Mutable ref carrying scroll progress 0..1. Read every frame so the
   *  shader updates without triggering React re-renders. */
  progressRef: MutableRefObject<number>;
}

/**
 * WebGL fragment shader whose `u_progress` uniform is driven by an
 * external scroll signal. Renders into a fullsize canvas; the rAF loop
 * pauses when the canvas is offscreen.
 *
 * Visual: a copper "magnetic pole" migrates across deep ink as progress
 * advances; flowing field-line iso-contours warp around it; pearl
 * highlights sit at field crossings; vignette + grain finish.
 */
export default function ScrollShader({ className = "", progressRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const visibleRef = useRef<boolean>(true);
  // Smoothed progress so the shader doesn't snap when scroll spikes
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

      void main(){
        vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);
        float t = u_time * 0.04;

        // Two soft gradient centers that migrate with progress.
        // Path traced over a quadratic Bezier corner→corner→corner.
        vec2 a1 = vec2(-0.45, -0.50);
        vec2 b1 = vec2( 0.55,  0.45);
        vec2 c1 = vec2( 0.50, -0.40);
        float pr = clamp(u_progress, 0.0, 1.0);
        vec2 c1ab = mix(a1, b1, pr);
        vec2 c1bc = mix(b1, c1, pr);
        vec2 center1 = mix(c1ab, c1bc, pr);

        // Secondary center — drifts opposite-ish direction for balance
        vec2 a2 = vec2( 0.55,  0.55);
        vec2 b2 = vec2(-0.40,  0.10);
        vec2 c2 = vec2(-0.30, -0.50);
        vec2 c2ab = mix(a2, b2, pr);
        vec2 c2bc = mix(b2, c2, pr);
        vec2 center2 = mix(c2ab, c2bc, pr);

        // Slow drift so it's never frozen — barely perceptible
        center1 += 0.04 * vec2(sin(t * 0.55), cos(t * 0.42));
        center2 += 0.035 * vec2(cos(t * 0.6), sin(t * 0.35));

        // Smooth radial falloffs (gaussian — no hard edges, no rings)
        float d1 = length(p - center1);
        float d2 = length(p - center2);
        float blob1 = exp(-d1 * d1 * 1.7); // big soft copper blob
        float blob2 = exp(-d2 * d2 * 2.4); // smaller pearl wash

        // A wide ambient lift so the dark side never goes pure black
        float ambient = exp(-d1 * d1 * 0.35) * 0.18;

        vec3 ink    = vec3(0.024, 0.034, 0.072);
        vec3 copper = vec3(0.784, 0.459, 0.290);
        vec3 pearl  = vec3(0.945, 0.918, 0.875);

        vec3 col = ink;
        col += blob1 * copper * 1.55;
        col += blob2 * pearl * 0.22;
        col += ambient * copper;

        // Soft vignette to push corners
        float vig = smoothstep(1.6, 0.20, length(p * vec2(0.9, 1.0)));
        col *= 0.55 + 0.45 * vig;

        // Very subtle grain to keep gradients from banding
        float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        col += (grain - 0.5) * 0.008;

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

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uProg = gl.getUniformLocation(prog, "u_progress");

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

    // Pause rAF when offscreen
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
        // Lerp toward the externally-set progress so spikes don't snap
        const target = progressRef.current ?? 0;
        smoothPRef.current += (target - smoothPRef.current) * 0.12;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, (performance.now() - startRef.current) / 1000);
        gl.uniform1f(uProg, smoothPRef.current);
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
  }, [progressRef]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
