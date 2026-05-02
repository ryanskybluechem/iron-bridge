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

      void main(){
        vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);
        float t = u_time * 0.045;

        // Magnetic pole migrates across the canvas with progress.
        // Path: bottom-left → top-right → bottom-right (quadratic Bezier).
        vec2 a = vec2(-0.55, -0.32);
        vec2 b = vec2( 0.55,  0.30);
        vec2 c = vec2( 0.50, -0.32);
        float pr = clamp(u_progress, 0.0, 1.0);
        vec2 ab = mix(a, b, pr);
        vec2 bc = mix(b, c, pr);
        vec2 pole = mix(ab, bc, pr);

        // Slow drift in the noise field so it never feels static
        vec2 q = p + 0.18 * vec2(sin(t * 0.6), cos(t * 0.45));

        // Pole influence — falls off with distance, adds rotational warp
        vec2 toPole = p - pole;
        float dist = length(toPole);
        float poleFall = exp(-dist * 1.6);
        float ang = atan(toPole.y, toPole.x);

        // Base flow field
        float n1 = fbm(q * 1.3);
        // Add a 4-petal rotation around the pole so field lines fan out
        float n2 = poleFall * 0.65 * sin(ang * 4.0 + t * 0.9);
        float field = n1 + n2;

        // Iso-contour density (the "field lines")
        float lineDist = abs(fract(field * 3.6 + t * 0.18) - 0.5);
        float lines = smoothstep(0.06, 0.0, lineDist) * 0.42;
        lines *= 0.55 + 0.45 * smoothstep(1.4, 0.0, dist); // brighter near pole

        // Soft pearl wash where the field is high
        float pearlMix = smoothstep(0.10, 0.85, fbm(q * 0.65 + n1 * 0.4));

        // Glow at the pole itself
        float glow = exp(-dist * 2.2);
        float coreGlow = exp(-dist * 5.0) * 0.55;

        vec3 ink     = vec3(0.034, 0.046, 0.088);
        vec3 graphite= vec3(0.060, 0.075, 0.122);
        vec3 copper  = vec3(0.784, 0.459, 0.290);
        vec3 pearl   = vec3(0.945, 0.918, 0.875);

        vec3 col = mix(ink, graphite, smoothstep(-0.5, 0.5, n1));
        col = mix(col, pearl * 0.18, pearlMix * 0.22);
        col += lines * pearl * 0.18;
        col += glow * copper * 0.55;
        col += coreGlow * (copper * 1.4 + pearl * 0.2);

        // Vignette
        float vig = smoothstep(1.5, 0.30, length(p*vec2(0.85,1.0)));
        col *= 0.50 + 0.50 * vig;

        // Subtle grain
        float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233)))*43758.5453);
        col += (grain - 0.5) * 0.012;

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
