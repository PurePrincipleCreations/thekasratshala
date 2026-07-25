import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { subscribeToScroll } from "@/utils/ScrollManager";

export default function CameraController() {
  const { camera } = useThree();
  const [scroll, setScroll] = useState({ scrollY: 0, velocity: 0, direction: 0 });
  const target = useRef(new THREE.Vector3(0, 1.8, 6));

  useEffect(() => {
    const un = subscribeToScroll(setScroll);
    return () => { un(); };
  }, []);

  useFrame(() => {
    const y = 1.8 - scroll.scrollY * 0.003;
    const progress = Math.min(1, scroll.scrollY / 4000);
    const z = 6 - progress * 1.5;
    const sway = Math.min(1, Math.abs(scroll.velocity) / 20) * 0.15 * Math.sign(scroll.velocity);
    const drift = Math.sin(performance.now() * 0.0004) * 0.2;

    target.current.set(sway + drift, y, z);
    camera.position.lerp(target.current, 0.035);
    camera.lookAt(0, y - 2, 0);
  });

  return null;
}
