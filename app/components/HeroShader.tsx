"use client";

import { type MutableRefObject, useEffect, useRef } from "react";
import { DEFAULT_HERO_PARAMS, type HeroParams } from "./heroParams";

export type ShaderVariant = "silk" | "noir" | "velvet" | "iron";

interface HeroShaderProps {
  className?: string;
  intensity?: number;
  variant?: ShaderVariant;
  /** Optional silk-shader tuning ref. Read every frame; updates uniforms
   *  without re-rendering. Only used by the silk variant. */
  paramsRef?: MutableRefObject<HeroParams>;
}

/* ────────────────────────────────────────────────────────
   Shared GLSL: simplex noise + fbm. Inlined into each
   fragment shader below.
   ──────────────────────────────────────────────────────── */
const NOISE = `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;
    x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m;m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }
  float fbm(vec2 p){
    float v=0.0; float a=0.5;
    for(int i=0;i<5;i++){ v+=a*snoise(p); p*=2.02; a*=0.5; }
    return v;
  }
`;

/* ────────────────────────────────────────────────────────
   Variants
   ──────────────────────────────────────────────────────── */

// Silk — slow horizontal silk-fold drape over deep ink. Pearl highlights
// fold gently. Suspension cables in faint pearl. No mouse interaction.
//
// All visual knobs are exposed as uniforms; the dev-controls panel
// updates a paramsRef that feeds these every frame.
const FRAG_SILK = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;
  uniform float u_intensity;

  uniform int u_cableCount;
  uniform float u_cableBright;
  uniform float u_cableThick;
  uniform float u_pearlShimmer;
  uniform float u_copperKiss;
  uniform float u_silkIntensity;
  uniform float u_vignette;
  uniform float u_grain;
  ${NOISE}
  void main(){
    vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);
    float t = u_time * 0.035;

    // Stretched horizontal noise → silk drape
    float n1 = snoise(vec2(p.x * 0.7, p.y * 2.6 + t * 0.6));
    float n2 = snoise(vec2(p.x * 1.4 + t * 0.4, p.y * 3.4));
    float n3 = fbm(vec2(p.x * 0.5 - t * 0.2, p.y * 1.4));
    float silk = (n1 * 0.55 + n2 * 0.35 + n3 * 0.10) * u_silkIntensity;

    vec3 ink = vec3(0.034, 0.046, 0.088);
    vec3 graphite = vec3(0.058, 0.072, 0.118);
    vec3 pearl = vec3(0.945, 0.918, 0.875);
    vec3 copper = vec3(0.784, 0.459, 0.290);

    vec3 col = mix(ink, graphite, smoothstep(-0.4, 0.4, silk));
    col += pow(smoothstep(0.1, 0.9, silk), 2.4) * vec3(0.13, 0.115, 0.092);
    col += pow(smoothstep(0.55, 0.95, n2), 4.0) * pearl * u_pearlShimmer;

    // Suspension cables — count + brightness + thickness all tunable
    float cables = 0.0;
    for(int i=0;i<5;i++){
      if (i >= u_cableCount) break;
      float fi = float(i);
      float yy = -0.50 + fi*0.20;
      float bend = 0.18 + 0.025*sin(t*0.9 + fi);
      float arc = yy + bend * (p.x*p.x*1.5);
      float d = abs(p.y - arc);
      cables += smoothstep(u_cableThick, 0.0, d) * (0.4 + 0.3*sin(fi*1.7));
    }
    col += cables * pearl * u_cableBright;

    // Single warm copper kiss at the bottom-left edge
    float kiss = smoothstep(1.1, 0.5, length(p - vec2(-0.6, -0.5))) * u_copperKiss;
    col += kiss * copper;

    // Soft vignette (mix between flat and vignetted)
    float vig = smoothstep(1.5, 0.3, length(p*vec2(0.85,1.0)));
    col *= mix(1.0, 0.55 + 0.45*vig, clamp(u_vignette, 0.0, 1.0));

    // Grain
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233)))*43758.5453);
    col += (grain - 0.5) * u_grain;

    col *= u_intensity;
    gl_FragColor = vec4(col, 1.0);
  }
`;

// Noir — animated topographic contour lines on near-black. Architectural,
// like a blueprint at midnight. One slow copper accent line.
const FRAG_NOIR = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;
  uniform float u_intensity;
  ${NOISE}
  void main(){
    vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);
    float t = u_time * 0.020;

    float elevation = fbm(p * 0.85 + vec2(t, t * 0.4));
    float scaled = elevation * 9.0;
    float lineDist = abs(fract(scaled) - 0.5);
    float contour = smoothstep(0.06, 0.0, lineDist);

    // A single accent contour at a slowly drifting elevation
    float accentEl = sin(u_time * 0.08) * 0.35;
    float accentDist = abs(elevation - accentEl);
    float accent = smoothstep(0.025, 0.0, accentDist);

    vec3 base = vec3(0.018, 0.024, 0.046);
    vec3 lineColor = vec3(0.55, 0.50, 0.42);
    vec3 accentColor = vec3(0.784, 0.459, 0.290);

    vec3 col = base;
    col += contour * lineColor * 0.16;
    col += accent * accentColor * 0.55;

    // Subtle horizontal banding for depth
    col += sin(p.y * 60.0) * 0.0035;

    // Vignette
    float vig = smoothstep(1.6, 0.4, length(p*vec2(0.85,1.0)));
    col *= 0.55 + 0.45*vig;

    // Grain
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233)))*43758.5453);
    col += (grain - 0.5) * 0.009;

    col *= u_intensity;
    gl_FragColor = vec4(col, 1.0);
  }
`;

// Velvet — slow vertical aurora wash over deep navy. Muted blues with a
// pearl shimmer. Reads as "private wealth office" rather than "tech demo".
const FRAG_VELVET = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;
  uniform float u_intensity;
  ${NOISE}
  void main(){
    vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);
    float t = u_time * 0.040;

    float n1 = fbm(vec2(p.x * 1.4 + t, p.y * 0.45));
    float n2 = fbm(vec2(p.x * 2.1 - t * 0.6, p.y * 0.7 + t * 0.4));
    float n3 = snoise(vec2(p.x * 0.8 + t * 0.2, p.y * 1.2));
    float aurora = (n1 * 0.6 + n2 * 0.4) - p.y * 0.35;

    vec3 navy = vec3(0.026, 0.034, 0.072);
    vec3 wash = vec3(0.16, 0.19, 0.32);
    vec3 highlight = vec3(0.36, 0.32, 0.44);
    vec3 copper = vec3(0.784, 0.459, 0.290);

    vec3 col = navy;
    col = mix(col, wash, smoothstep(-0.1, 0.7, aurora) * 0.55);
    col += pow(smoothstep(0.45, 0.95, n3), 3.0) * highlight * 0.32;

    // A quiet copper rim along the very bottom
    float rim = smoothstep(0.0, 0.4, p.y + 0.7);
    col += (1.0 - rim) * copper * 0.04;

    // Vignette
    float vig = smoothstep(1.45, 0.35, length(p*vec2(0.85,1.0)));
    col *= 0.6 + 0.4*vig;

    // Grain
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233)))*43758.5453);
    col += (grain - 0.5) * 0.011;

    col *= u_intensity;
    gl_FragColor = vec4(col, 1.0);
  }
`;

// Iron — original molten copper / suspension-cable shader. Kept for
// reference and contrast.
const FRAG_IRON = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_intensity;
  ${NOISE}
  void main(){
    vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);
    float t = u_time * 0.06;
    vec2 mouse = (u_mouse - 0.5) * 0.4;

    float cables = 0.0;
    for(int i=0;i<6;i++){
      float fi = float(i);
      float yy = -0.55 + fi*0.18;
      float bend = 0.18 + 0.04*sin(t*0.7 + fi);
      float arc = yy + bend * (p.x*p.x*1.6) + 0.02*sin(p.x*3.0 + t + fi*1.3);
      float d = abs(p.y - arc);
      cables += smoothstep(0.012, 0.0, d) * (0.5 + 0.5*sin(fi*1.7));
    }

    vec2 q = p * 1.4 + mouse;
    float n1 = fbm(q + vec2(t, t*0.7));
    float n2 = fbm(q*1.7 - vec2(t*0.5, t*0.3) + n1);
    float n3 = fbm(q*0.6 + vec2(-t*0.2, t*0.4) + n2*0.5);
    float flow = n1*0.55 + n2*0.3 + n3*0.15;

    vec3 c1 = vec3(0.039, 0.055, 0.102);
    vec3 c2 = vec3(0.094, 0.110, 0.165);
    vec3 c3 = vec3(0.784, 0.459, 0.290);
    vec3 c4 = vec3(0.357, 0.553, 0.937);
    vec3 c5 = vec3(0.945, 0.918, 0.875);

    vec3 col = mix(c1, c2, smoothstep(-0.5, 0.5, flow));
    col = mix(col, c4*0.4, smoothstep(0.1, 0.7, n2)*0.45);
    col = mix(col, c3, smoothstep(0.55, 0.85, n3)*0.55);
    col += cables * c3 * 0.8;
    col += cables * c5 * 0.15;

    float vig = smoothstep(1.4, 0.3, length(p*vec2(0.8,1.0)));
    col *= 0.6 + 0.4*vig;

    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233)))*43758.5453);
    col += (grain - 0.5) * 0.02;

    col *= u_intensity;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const FRAGMENTS: Record<ShaderVariant, string> = {
  silk: FRAG_SILK,
  noir: FRAG_NOIR,
  velvet: FRAG_VELVET,
  iron: FRAG_IRON,
};

export default function HeroShader({
  className = "",
  intensity = 1.0,
  variant = "silk",
  paramsRef,
}: HeroShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const fallbackParamsRef = useRef<HeroParams>({ ...DEFAULT_HERO_PARAMS });

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
    const fsrc = FRAGMENTS[variant];

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
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
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uInt = gl.getUniformLocation(prog, "u_intensity");

    // Silk-only uniforms (others variants don't declare these so the
    // location lookups will be null and we'll skip them in the loop).
    const uCableCount = gl.getUniformLocation(prog, "u_cableCount");
    const uCableBright = gl.getUniformLocation(prog, "u_cableBright");
    const uCableThick = gl.getUniformLocation(prog, "u_cableThick");
    const uPearlShimmer = gl.getUniformLocation(prog, "u_pearlShimmer");
    const uCopperKiss = gl.getUniformLocation(prog, "u_copperKiss");
    const uSilkInt = gl.getUniformLocation(prog, "u_silkIntensity");
    const uVignette = gl.getUniformLocation(prog, "u_vignette");
    const uGrain = gl.getUniformLocation(prog, "u_grain");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    // Iron is the only variant that listens to the mouse.
    const usesMouse = variant === "iron";
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = (e.clientX - rect.left) / rect.width;
      mouseRef.current.ty = 1 - (e.clientY - rect.top) / rect.height;
    };
    if (usesMouse) window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    resize();

    const loop = () => {
      resize();
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.05;
      m.y += (m.ty - m.y) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - startRef.current) / 1000);
      if (uMouse) gl.uniform2f(uMouse, m.x, m.y);
      gl.uniform1f(uInt, intensity);

      // Push silk-tunable uniforms when the variant declares them.
      if (variant === "silk") {
        const pp = (paramsRef ?? fallbackParamsRef).current;
        if (uCableCount) gl.uniform1i(uCableCount, Math.max(0, Math.min(5, Math.round(pp.cableCount))));
        if (uCableBright) gl.uniform1f(uCableBright, pp.cableBrightness);
        if (uCableThick) gl.uniform1f(uCableThick, pp.cableThickness);
        if (uPearlShimmer) gl.uniform1f(uPearlShimmer, pp.pearlShimmer);
        if (uCopperKiss) gl.uniform1f(uCopperKiss, pp.copperKiss);
        if (uSilkInt) gl.uniform1f(uSilkInt, pp.silkIntensity);
        if (uVignette) gl.uniform1f(uVignette, pp.vignette);
        if (uGrain) gl.uniform1f(uGrain, pp.grain);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (usesMouse) window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [intensity, variant, paramsRef]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
