import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uAccent;

  // cheap value noise
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.4 + uMouse * 0.18;
    float t = uTime * 0.045;

    float n = fbm(p + vec2(t, -t * 0.6));
    float n2 = fbm(p * 1.7 - vec2(t * 0.8, t * 0.3));
    float flow = smoothstep(0.25, 0.95, n * 0.7 + n2 * 0.45);

    vec3 base = mix(vec3(0.980), vec3(0.953, 0.957, 0.965), flow);
    vec3 tinted = mix(base, uAccent, pow(flow, 2.6) * 0.30);

    // soft vignette to keep the centre light and airy
    float d = distance(uv, vec2(0.5, 0.52));
    tinted = mix(tinted, vec3(0.988), smoothstep(0.55, 0.0, d) * 0.55);

    gl_FragColor = vec4(tinted, 1.0);
  }
`;

function FluidPlane() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const target = useRef(new THREE.Vector2());
  const viewport = useThree((s) => s.viewport);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uAccent: { value: new THREE.Color("#f97316") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const m = material.current;
    if (!m) return;
    m.uniforms.uTime.value += Math.min(delta, 0.05);
    target.current.set(state.pointer.x, state.pointer.y);
    m.uniforms.uMouse.value.lerp(target.current, 0.02);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function HeroBackground() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 1], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: false }}
    >
      <FluidPlane />
    </Canvas>
  );
}
