import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import buildingBackground from "@/assets/kasrat-shala-building.png.asset.json";
import droneFootage from "@/assets/drone-footage.mp4.asset.json";
import BiomechanicalOverlay from "../biomechanical/BiomechanicalOverlay";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(mousePos.x, springConfig);
  const mouseY = useSpring(mousePos.y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--night)]">
      {/* Background Video Layer — YouTube Embed for specific video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.78vh] h-[56.25vw]">
          <iframe
            src="https://www.youtube.com/embed/H46Oo99i898?autoplay=1&mute=1&loop=1&playlist=H46Oo99i898&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&vq=hd720"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="Hero Video"
          />
        </div>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-[var(--night)]/20 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--night)]/40 via-transparent to-[var(--night)]" />
      </div>

      {/* Biomechanical Overlay — Integrated with headlines */}
      <div className="absolute inset-0 pointer-events-none z-[5] opacity-80 flex items-center justify-center">
        <div className="w-full max-w-[340px] sm:max-w-[500px] md:w-[600px] h-[500px] sm:h-[600px] relative">
          <BiomechanicalOverlay
            circles={[{ cx: 200, cy: 300, r: 180 }, { cx: 200, cy: 300, r: 240 }]}
            paths={[
              "M50 300 Q200 50 350 300",
              "M50 400 Q200 550 350 400",
              "M200 50 L200 550",
            ]}
            points={[
              { x: 200, y: 120, label: "AXIS" },
            ]}
            headlines={{
              howToMoveWell: "How to move",
              trainYourNeuro: "Train your body on the Richness of Movement Science"
            }}
          />
        </div>
      </div>

      {/* Hand-drawn element floating (Subtle) */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="absolute top-1/4 right-1/4 w-40 h-40 border border-[var(--gold)]/20 rounded-full opacity-40 pointer-events-none z-[6]"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="label-caps text-[8px] text-[var(--cream)] uppercase tracking-[0.2em]">Scroll to descend</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--gold)] to-transparent" />
      </motion.div>
    </section>
  );
}
