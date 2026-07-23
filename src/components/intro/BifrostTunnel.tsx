import { Renderer, Program, Mesh, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'

import './BifrostTunnel.css'

interface Props {
  /** Scene-1 progress, 0 → 1 (dark space → full tunnel → white-out). */
  progress: number
  visible: boolean
}

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// fractal noise — layered detail for turbulent, non-symmetric streaks
float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += amp * snoise(p);
    p = rot * p * 2.0;
    amp *= 0.5;
  }
  return v;
}

// iridescent Bifrost palette — teal / cyan / violet / magenta / gold sweep
vec3 palette(float t) {
  return 0.55 + 0.45 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.60)));
}

void main() {
  vec2 res = uResolution;
  // aspect-correct, y-normalized coords centered on screen
  vec2 p = (2.0 * gl_FragCoord.xy - res) / res.y;
  float prog = clamp(uProgress, 0.0, 1.0);

  float r = length(p);
  float a = atan(p.y, p.x);

  // forward travel through the tunnel — accelerates as you scroll
  float travel = uTime * (0.15 + prog * 0.9) + prog * 3.0;
  float td = 0.30 / (r + 0.05) - travel;

  // turbulent swirl tied to depth — breaks the "kaleidoscope" symmetry
  a += 0.30 * sin(td * 0.5 - uTime * 0.15) * (0.4 + 0.6 * prog);

  // seamless angular sampling on the unit circle
  vec2 circ = vec2(cos(a), sin(a));

  // domain warp → irregular, organic streaks (not even radial spikes)
  float w = fbm(circ * 2.2 + td * 0.25);

  // layer 1 — fine streaks streaming outward
  vec2 q1 = circ * 7.0 + w * 1.3 + vec2(0.0, td);
  float s1 = pow(clamp(fbm(q1) * 0.5 + 0.5, 0.0, 1.0), 2.4);

  // layer 2 — broader streaks at a different depth (parallax → tunnel feel)
  vec2 q2 = circ * 3.5 - w * 0.8 + vec2(0.0, td * 1.6);
  float s2 = pow(clamp(fbm(q2) * 0.5 + 0.5, 0.0, 1.0), 3.2);

  // radial glow — brightest toward the centre
  float glow = 0.30 / (r + 0.04);

  float tA = a * 0.159 + td * 0.025 + s1 * 0.25;
  float tB = a * 0.159 - td * 0.020 + 0.40;
  vec3 color = palette(tA) * s1 * glow * 1.5 + palette(tB) * s2 * glow * 0.9;

  // blazing white-hot convergence core
  float core = smoothstep(0.22, 0.0, r);
  color += vec3(1.0) * pow(core, 1.8) * (0.5 + prog * 2.0);

  // reveal ramp — the tunnel emerges from darkness as you scroll in
  float reveal = smoothstep(0.02, 0.32, prog);
  color *= reveal;

  // calm starfield at the very start, fading as the tunnel takes over
  float stars = pow(max(0.0, snoise(p * 70.0)), 20.0) * 4.0;
  float starFade = 1.0 - smoothstep(0.0, 0.18, prog);
  color += vec3(0.75, 0.82, 1.0) * stars * starFade;

  // deep-space base tint
  color += vec3(0.015, 0.02, 0.05) * (0.5 + 0.5 * reveal);

  // filmic tonemap for soft bloom rolloff
  color = 1.0 - exp(-color * 1.25);

  // final white-out — hands off to the screen-shatter scene
  float whiteout = smoothstep(0.82, 1.0, prog);
  color = mix(color, vec3(1.0), whiteout);

  fragColor = vec4(color, 1.0);
}
`

export default function BifrostTunnel({ progress, visible }: Props) {
  const ctnDom = useRef<HTMLDivElement>(null)
  const progressRef = useRef(progress)
  progressRef.current = progress

  useEffect(() => {
    const ctn = ctnDom.current
    if (!ctn) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const renderer = new Renderer({
      alpha: false,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    })
    const gl = renderer.gl
    gl.clearColor(0.02, 0.02, 0.06, 1)

    const geometry = new Triangle(gl)
    if ((geometry.attributes as Record<string, unknown>).uv) {
      delete (geometry.attributes as Record<string, unknown>).uv
    }

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: progressRef.current },
        uResolution: { value: [gl.canvas.width, gl.canvas.height] },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    ctn.appendChild(gl.canvas as HTMLCanvasElement)

    function resize() {
      if (!ctn) return
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight)
      // gl_FragCoord is in device pixels, so uResolution must match the
      // drawing-buffer size (CSS size × dpr), not the CSS size.
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height]
    }
    window.addEventListener('resize', resize)
    resize()

    let animateId = 0
    const start = performance.now()
    const update = (now: number) => {
      animateId = requestAnimationFrame(update)
      // reduced motion: freeze the ambient shimmer, keep scroll scrubbing live
      program.uniforms.uTime.value = reduceMotion ? 0 : (now - start) * 0.001
      program.uniforms.uProgress.value = progressRef.current
      renderer.render({ scene: mesh })
    }
    animateId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(animateId)
      window.removeEventListener('resize', resize)
      if (ctn && (gl.canvas as HTMLCanvasElement).parentNode === ctn) {
        ctn.removeChild(gl.canvas as HTMLCanvasElement)
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return (
    <div
      ref={ctnDom}
      className="bifrost-container"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
    />
  )
}
