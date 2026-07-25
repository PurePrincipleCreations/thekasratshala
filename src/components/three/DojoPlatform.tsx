import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function scallopedShape(radius: number, folds: number, amp: number, segments = 128) {
  const shape = new THREE.Shape();
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const r = radius + Math.sin(a * folds) * amp;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  return shape;
}

export default function DojoPlatform() {
  const group = useRef<THREE.Group>(null);
  const centerRef = useRef<THREE.Mesh>(null);
  const goldRef = useRef<THREE.Mesh>(null);

  const base = useMemo(() => new THREE.ShapeGeometry(scallopedShape(3.2, 8, 0.08)), []);
  const top = useMemo(() => new THREE.ShapeGeometry(scallopedShape(2.8, 8, 0.06)), []);

  const rings = useMemo(() => {
    const arr: { geo: THREE.BufferGeometry; color: string; y: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const r = 0.4 + (i / 7) * 2.6;
      const shape = scallopedShape(r, 8 + i * 2, 0.03 + i * 0.005, 96);
      const inner = new THREE.Path();
      const innerR = r - 0.05;
      for (let j = 0; j <= 96; j++) {
        const a = (j / 96) * Math.PI * 2;
        const x = Math.cos(a) * innerR;
        const y = Math.sin(a) * innerR;
        if (j === 0) inner.moveTo(x, y);
        else inner.lineTo(x, y);
      }
      shape.holes.push(inner);
      arr.push({
        geo: new THREE.ShapeGeometry(shape),
        color: i % 2 === 0 ? "#2A1F18" : "#3D2B1F",
        y: 0.02 + i * 0.001,
      });
    }
    return arr;
  }, []);

  const spokes = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      positions.push(Math.cos(a) * 0.3, 0, Math.sin(a) * 0.3);
      positions.push(Math.cos(a) * 2.6, 0, Math.sin(a) * 2.6);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, []);

  const mats = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const r = 1.6;
      arr.push([Math.cos(a) * r, 0.03, Math.sin(a) * r]);
    }
    return arr;
  }, []);

  const equipment = useMemo(
    () => [
      { pos: [1.0, 0.075, 0.5] as [number, number, number], color: "#3D2B1F" },
      { pos: [-0.9, 0.075, 0.7] as [number, number, number], color: "#2A1F18" },
      { pos: [0.2, 0.075, -1.1] as [number, number, number], color: "#3D2B1F" },
    ],
    []
  );

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.0005;
    const t = performance.now() * 0.002;
    if (centerRef.current) (centerRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(t) * 0.3;
    if (goldRef.current) (goldRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t + 1) * 0.2;
  });

  return (
    <group ref={group} position={[0, -1.6, 0]}>
      <mesh geometry={base} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1A1512" roughness={0.9} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={top} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#2A1F18" roughness={0.85} metalness={0.15} side={THREE.DoubleSide} />
      </mesh>

      {rings.map((r, i) => (
        <mesh key={i} geometry={r.geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, r.y, 0]}>
          <meshStandardMaterial color={r.color} roughness={0.85} side={THREE.DoubleSide} />
        </mesh>
      ))}

      <lineSegments geometry={spokes} position={[0, 0.025, 0]}>
        <lineBasicMaterial color="#C9A84C" transparent opacity={0.25} />
      </lineSegments>

      {mats.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.4, 0.02, 0.6]} />
          <meshStandardMaterial color="#1A1C20" roughness={0.9} />
        </mesh>
      ))}

      {equipment.map((e, i) => (
        <mesh key={i} position={e.pos}>
          <boxGeometry args={[0.3, 0.15, 0.3]} />
          <meshStandardMaterial color={e.color} roughness={0.7} metalness={0.2} />
        </mesh>
      ))}

      <mesh ref={centerRef} position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color="#6AD0D8" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={goldRef} position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.88, 2.92, 128]} />
        <meshBasicMaterial color="#4AABB5" transparent opacity={0.06} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
