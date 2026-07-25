import { useMemo, useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { subscribeToScroll } from "@/utils/ScrollManager";

function useScroll() {
  const [s, setS] = useState({ velocity: 0, direction: 0, scrollY: 0 });
  useEffect(() => {
    const un = subscribeToScroll(setS);
    return () => { un(); };
  }, []);
  return s;
}

const SPINE_TOP = -1.6;
const SPINE_BOTTOM = -56.6;

export default function BidirectionalSpine() {
  const particlesRef = useRef<THREE.Points>(null);
  const rootsRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // 5 main spine roots
  const mainRoots = useMemo(() => {
    const arr: { geo: THREE.TubeGeometry; color: string }[] = [];
    for (let i = 0; i < 5; i++) {
      const pts: THREE.Vector3[] = [];
      const phase = (i / 5) * Math.PI * 2;
      for (let j = 0; j <= 40; j++) {
        const t = j / 40;
        const y = SPINE_TOP + t * (SPINE_BOTTOM - SPINE_TOP);
        const r = 0.3 + Math.sin(t * 4 + phase) * 0.6 + t * 0.8;
        const a = phase + t * Math.PI * 3;
        pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      arr.push({
        geo: new THREE.TubeGeometry(curve, 100, 0.05, 6, false),
        color: i % 2 === 0 ? "#4AABB5" : "#C9A84C",
      });
    }
    return arr;
  }, []);

  // 6 branch roots
  const branches = useMemo(() => {
    const ys = [-8, -14, -20, -26, -32, -38];
    return ys.flatMap((y, i) => {
      const branchCount = 4;
      return Array.from({ length: branchCount }, (_, k) => {
        const a = (k / branchCount) * Math.PI * 2 + i * 0.3;
        const pts: THREE.Vector3[] = [];
        for (let j = 0; j <= 20; j++) {
          const t = j / 20;
          const r = t * 3;
          pts.push(new THREE.Vector3(Math.cos(a) * r, y - t * 1.5, Math.sin(a) * r));
        }
        return {
          geo: new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.02, 5, false),
          color: (i + k) % 2 === 0 ? "#4AABB5" : "#C9A84C",
        };
      });
    });
  }, []);

  // 60 neuron nodes
  const neuronGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      const t = i / 60;
      const y = SPINE_TOP + t * (SPINE_BOTTOM - SPINE_TOP);
      const a = t * Math.PI * 6;
      const r = 0.5 + Math.random() * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  // 200 synaptic connections
  const synapseGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(200 * 3);
    const col = new Float32Array(200 * 3);
    const teal = new THREE.Color("#4AABB5");
    const gold = new THREE.Color("#C9A84C");
    for (let i = 0; i < 200; i++) {
      const t = i / 200;
      const y = SPINE_TOP + t * (SPINE_BOTTOM - SPINE_TOP);
      const a = Math.random() * Math.PI * 2;
      const r = 0.3 + Math.random() * 2.5;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(a) * r;
      const c = new THREE.Color().lerpColors(teal, gold, t);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, []);

  // 2500 bidirectional flow particles
  const particleCount = 2500;
  const particleGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const teal = new THREE.Color("#6AD0D8");
    const gold = new THREE.Color("#E8C860");
    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const y = SPINE_TOP + t * (SPINE_BOTTOM - SPINE_TOP);
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 3;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(a) * r;
      const c = new THREE.Color().lerpColors(teal, gold, t);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, []);

  // Anchor orbs
  const anchors = [-8, -17, -27, -37, -47];

  useFrame((_, delta) => {
    if (rootsRef.current) {
      const pulse = 1 + Math.min(1, Math.abs(scroll.velocity) / 10) * 0.15;
      rootsRef.current.scale.setScalar(pulse);
    }
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const dir = scroll.direction === 0 ? 1 : scroll.direction;
      const speed = delta * (1.5 + Math.abs(scroll.velocity) * 0.6);
      for (let i = 0; i < particleCount; i++) {
        let y = pos.getY(i) - dir * speed;
        if (y < SPINE_BOTTOM) y = SPINE_TOP;
        else if (y > SPINE_TOP) y = SPINE_BOTTOM;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <group>
      <group ref={rootsRef}>
        {mainRoots.map((r, i) => (
          <mesh key={i} geometry={r.geo}>
            <meshBasicMaterial color={r.color} transparent opacity={0.06} blending={THREE.AdditiveBlending} />
          </mesh>
        ))}
      </group>

      {branches.map((b, i) => (
        <mesh key={i} geometry={b.geo}>
          <meshBasicMaterial color={b.color} transparent opacity={0.05} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}

      <points geometry={neuronGeom}>
        <pointsMaterial color="#4AABB5" size={0.08} transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      <points geometry={synapseGeom}>
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      <points ref={particlesRef} geometry={particleGeom}>
        <pointsMaterial size={0.035} vertexColors transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {anchors.map((y, i) => (
        <AnchorOrb key={i} y={y} color={i % 2 === 0 ? "#C9A84C" : "#6AD0D8"} />
      ))}
    </group>
  );
}

function AnchorOrb({ y, color }: { y: number; color: string }) {
  const ring = useRef<THREE.Mesh>(null);
  const dot = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ring.current) ring.current.rotation.z += 0.01;
    if (dot.current) {
      const t = performance.now() * 0.003;
      const s = 1 + Math.sin(t) * 0.3;
      dot.current.scale.setScalar(s);
    }
  });
  return (
    <group position={[0, y, 0]}>
      <mesh ref={ring}>
        <ringGeometry args={[0.35, 0.4, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={dot}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
