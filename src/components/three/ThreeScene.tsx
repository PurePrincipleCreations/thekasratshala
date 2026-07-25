import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import ArcaneTree from "./ArcaneTree";
import DojoPlatform from "./DojoPlatform";
import BidirectionalSpine from "./BidirectionalSpine";
import CameraController from "./CameraController";
import { initScrollManager } from "@/utils/ScrollManager";

export default function ThreeScene() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    initScrollManager();
    if (typeof window === "undefined") return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const lowPerf = (navigator.hardwareConcurrency ?? 8) <= 4;
    if (!mobile && !lowPerf) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0"
      style={{ zIndex: 1, pointerEvents: "none" }}
    >
      <Canvas
        camera={{ fov: 40, near: 0.1, far: 80, position: [0, 1.8, 6] }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 1.5]}
      >
        <fog attach="fog" args={["#080A0C", 20, 55]} />
        <ambientLight intensity={0.25} />
        <ArcaneTree />
        <DojoPlatform />
        <BidirectionalSpine />
        <CameraController />
        <EffectComposer>
          <Bloom intensity={0.12} luminanceThreshold={0.4} luminanceSmoothing={0.85} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
