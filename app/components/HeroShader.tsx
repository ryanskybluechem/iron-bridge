"use client";

import { useEffect, useRef } from "react";

type Palette = "iron" | "pearl";

interface HeroShaderProps {
  className?: string;
  intensity?: number;
  palette?: Palette;
}

const PALETTES: Record<Palette, string> = {
  iron: `
    vec3 c1 = vec3(0.039, 0.055, 0.102);
    vec3 c2 = vec3(0.094, 0.110, 0.165);
    vec3 c3 = vec3(0.784, 0.459, 0.290);
    vec3 c4 = vec3(0.357, 0.553, 0.937);
    vec3 c5 = vec3(0.945, 0.918, 0.875);
  `,
  pearl: `
    vec3 c1 = vec3(0.965, 0.953, 0.933);
    vec3 c2 = vec3(0.910, 0.890, 0.855);
    vec3 c3 = vec3(0.784, 0.459, 0.290);
    vec3 c4 = vec3(0.357, 0.553, 0.737);
    vec3 c5 = vec3(0.180, 0.200, 0.250);
  `,
};

export default function HeroShader({
  className = "",
  intensity = 1.0,
  palette = "iron",
}: HeroShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });

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
      uniform vec2 u_mouse;
      uniform float u_intensity;

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
        vec2 uv = gl_FragCoord.xy / u_res.xy;
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

        ${PALETTES[palette] || PALETTES.iron}

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

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = (e.clientX - rect.left) / rect.width;
      mouseRef.current.ty = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    resize();

    const loop = () => {
      resize();
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.05;
      m.y += (m.ty - m.y) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - startRef.current) / 1000);
      gl.uniform2f(uMouse, m.x, m.y);
      gl.uniform1f(uInt, intensity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [intensity, palette]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
