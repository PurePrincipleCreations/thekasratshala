import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { subscribeToScroll } from "@/utils/ScrollManager";
import { useEffect, useState } from "react";

function useScroll() {
  const [s, setS] = useState({ velocity: 0, direction: 0, scrollY: 0 });
  useEffect(() => {
    const un = subscribeToScroll(setS);
    return () => { un(); };
  }, []);
  return s;
}

export default function ArcaneTree() {
  const group = useRef<THREE.Group>(null);
  const runesRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  // Trunk curve
  const trunkGeom = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const y = t * 3.4;
      const wob = Math.sin(t * 6) * 0.06 + t * 0.15;
      pts.push(new THREE.Vector3(wob, y, Math.cos(t * 5) * 0.05));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const geo = new THREE.TubeGeometry(curve, 60, 0.9, 12, false);
    // Taper
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const t = Math.max(0, Math.min(1, v.y / 3.4));
      const r = 0.9 - t * (0.9 - 0.18);
      const centerY = v.y;
      // scale radial distance
      const cx = pts[Math.round(t * 20)]?.x ?? 0;
      const cz = pts[Math.round(t * 20)]?.z ?? 0;
      const dx = v.x - cx;
      const dz = v.z - cz;
      const cur = Math.hypot(dx, dz) || 1;
      const scale = r / 0.9;
      pos.setXYZ(i, cx + dx * scale, centerY, cz + dz * scale);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Runes
  const runes = useMemo(() => {
    const arr: { pos: [number, number, number]; color: string; rot: number }[] = [];
    for (let i = 0; i < 48; i++) {
      const t = i / 48;
      const angle = i * 0.72;
      const r = 0.9 - t * 0.7;
      arr.push({
        pos: [Math.cos(angle) * r, t * 3.2 + 0.1, Math.sin(angle) * r],
        color: i % 2 === 0 ? "#6AD0D8" : "#C9A84C",
        rot: angle,
      });
    }
    return arr;
  }, []);

  // Rune dots (48*4*3)
  const runeDotsGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(48 * 4 * 3 * 3);
    const colors = new Float32Array(48 * 4 * 3 * 3);
    const gold = new THREE.Color("#C9A84C");
    const teal = new THREE.Color("#6AD0D8");
    let idx = 0;
    for (let i = 0; i < 48; i++) {
      const t = i / 48;
      const y = t * 3.2 + 0.1;
      for (let j = 0; j < 4; j++) {
        const a = i * 0.72 + j * (Math.PI / 2);
        const r = 0.85 - t * 0.65;
        const cx = Math.cos(a) * r;
        const cz = Math.sin(a) * r;
        // triangle
        const c = j % 2 === 0 ? gold : teal;
        for (let k = 0; k < 3; k++) {
          const ang = (k / 3) * Math.PI * 2;
          positions[idx * 3] = cx + Math.cos(ang) * 0.02;
          positions[idx * 3 + 1] = y + Math.sin(ang) * 0.02;
          positions[idx * 3 + 2] = cz;
          colors[idx * 3] = c.r;
          colors[idx * 3 + 1] = c.g;
          colors[idx * 3 + 2] = c.b;
          idx++;
        }
      }
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, []);

  // Crown arcs
  const arcs = useMemo(() => {
    const items: { geo: THREE.TubeGeometry; color: string }[] = [];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 20; j++) {
        const t = j / 20;
        const arc = Math.sin(t * Math.PI) * 0.9;
        const r = 1.4 + arc * 0.3;
        pts.push(new THREE.Vector3(Math.cos(a) * r, 3.4 + arc, Math.sin(a) * r));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      items.push({
        geo: new THREE.TubeGeometry(curve, 30, 0.02, 6, false),
        color: i % 2 === 0 ? "#C9A84C" : "#6AD0D8",
      });
    }
    return items;
  }, []);

  // Mandala rings
  const outerRing = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 200; i++) {
      const a = (i / 200) * Math.PI * 2;
      const r = 2.2 + Math.sin(a * 8) * 0.1;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 4.3, Math.sin(a) * r));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 200, 0.015, 6, true);
  }, []);
  const innerRing = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 200; i++) {
      const a = (i / 200) * Math.PI * 2;
      const r = 1.8 + Math.sin(a * 5) * 0.08;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 4.25, Math.sin(a) * r));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 200, 0.012, 6, true);
  }, []);

  // Floating symbols (60 points)
  const symbolsGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(60 * 3);
    const col = new Float32Array(60 * 3);
    const gold = new THREE.Color("#C9A84C");
    const teal = new THREE.Color("#6AD0D8");
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2 * 3;
      const r = 1.6 + Math.random() * 1.2;
      const y = 0.5 + Math.random() * 3.5;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(a) * r;
      const c = i % 2 === 0 ? gold : teal;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, []);

  // Bioluminescent particles (1200)
  const particleCount = 1200;
  const particleGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const gold = new THREE.Color("#E8C860");
    const teal = new THREE.Color("#6AD0D8");
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = Math.random() * 8 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const mix = Math.random();
      col[i * 3] = gold.r * (1 - mix) + teal.r * mix;
      col[i * 3 + 1] = gold.g * (1 - mix) + teal.g * mix;
      col[i * 3 + 2] = gold.b * (1 - mix) + teal.b * mix;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += 0.0015;
      group.current.position.y = Math.sin(performance.now() * 0.0005) * 0.03;
    }
    if (runesRef.current) {
      const pulse = 1 + Math.min(1, Math.abs(scroll.velocity) / 10) * 0.4;
      runesRef.current.scale.setScalar(pulse);
    }
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const dir = scroll.direction === 0 ? 1 : scroll.direction;
      const speed = delta * (0.5 + Math.abs(scroll.velocity) * 0.15);
      for (let i = 0; i < particleCount; i++) {
        const y = pos.getY(i) - dir * speed;
        if (y < -4) pos.setY(i, 6);
        else if (y > 6) pos.setY(i, -4);
        else pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={[0, -1.5, 0]}>
      {/* Trunk */}
      <mesh geometry={trunkGeom} castShadow>
        <meshStandardMaterial color="#1A1512" roughness={0.85} metalness={0.3} />
      </mesh>
      <mesh geometry={trunkGeom} scale={0.92}>
        <meshStandardMaterial color="#2A1F18" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Runes */}
      <group ref={runesRef}>
        {runes.map((r, i) => (
          <mesh key={i} position={r.pos} rotation={[0, r.rot, 0]}>
            <planeGeometry args={[0.04, 0.06]} />
            <meshBasicMaterial color={r.color} side={THREE.DoubleSide} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
          </mesh>
        ))}
        <points geometry={runeDotsGeom}>
          <pointsMaterial size={0.03} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
      </group>

      {/* Crown arcs */}
      {arcs.map((a, i) => (
        <mesh key={i} geometry={a.geo}>
          <meshBasicMaterial color={a.color} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}

      {/* Mandala rings */}
      <mesh geometry={outerRing}>
        <meshBasicMaterial color="#C9A84C" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh geometry={innerRing}>
        <meshBasicMaterial color="#4AABB5" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Floating symbols */}
      <points geometry={symbolsGeom}>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Bioluminescent particles */}
      <points ref={particlesRef} geometry={particleGeom}>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Lights */}
      <pointLight position={[2, 1, 2]} color="#C9A84C" intensity={2} distance={10} />
      <pointLight position={[-2, 1, -1]} color="#4AABB5" intensity={1.6} distance={10} />
      <pointLight position={[0, -0.5, 0]} color="#6AD0D8" intensity={1.4} distance={6} />
    </group>
  );
}
