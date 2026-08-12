import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import droneFootage from "@/assets/drone-footage.mp4.asset.json";
import BiomechanicalOverlay from "../biomechanical/BiomechanicalOverlay";
import MovementMarquee from "./MovementMarquee";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(mousePos.x, springConfig);
  const mouseY = useSpring(mousePos.y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 20, 
        y: (e.clientY / window.innerHeight - 0.5) * 20 
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const headlineReveal = {
    hidden: { opacity: 0, y: 40, skewY: 7 },
    visible: { 
      opacity: 1, 
      y: 0, 
      skewY: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--night)]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ scale: 1.1 }}
          className="w-full h-full"
        >
          <img 
            src={yogaPose.url} 
            alt="" 
            className="w-full h-full object-cover grayscale opacity-20 mix-blend-luminosity"
          />
        </motion.div>
        {/* Subtle translucent overlay */}
        <div className="absolute inset-0 bg-[var(--night)]/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--night)] via-transparent to-[var(--night)]" />
      </div>

      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover grayscale mix-blend-luminosity scale-110"
        >
          <source src={droneFootage.url} type="video/mp4" />
        </video>
      </div>

      {/* Movement Marquee Background Layer - Now serving as the main header */}
      <div className="absolute inset-0 z-10 flex items-center justify-center mix-blend-normal overflow-hidden pt-20">
        <div className="w-full scale-110 rotate-[-2deg]">
          <div className="flex flex-col items-center justify-center text-center px-4 mb-12 relative z-30 pointer-events-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="editorial-heading text-4xl md:text-6xl text-[var(--gold)] mb-4"
            >
              How Surge Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="label-caps text-xs md:text-sm text-[var(--cream)] tracking-[0.2em] max-w-lg"
            >
              Train your body with intentional force and rhythm.
            </motion.p>
          </div>
          <MovementMarquee />
        </div>
      </div>

      <div className="section-inner relative z-20 w-full flex flex-col items-center text-center py-20 mt-16 md:mt-24 pointer-events-none">
        <div className="max-w-4xl space-y-6 md:space-y-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="flex flex-col items-center"
          >
            <div className="relative min-h-[30vh] md:min-h-[40vh] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 blur-[120px] bg-[var(--gold)]/10 rounded-full scale-150"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-6 pt-4 pointer-events-auto"
          >
            <Link
              to={"/courses" as any}
              className="group relative px-12 py-6 bg-[var(--teal)]/20 hover:bg-[var(--teal)]/40 backdrop-blur-md border border-[var(--gold)]/30 text-[var(--cream)] label-caps text-sm overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Begin the Journey</span>
              <motion.div 
                className="absolute inset-0 bg-[var(--gold)]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Biomechanical Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
        <BiomechanicalOverlay 
          circles={[{ cx: 200, cy: 300, r: 180 }, { cx: 200, cy: 300, r: 240 }]}
          paths={[
            "M50 300 Q200 50 350 300",
            "M50 400 Q200 550 350 400",
            "M200 50 L200 550"
          ]}
          points={[
            { x: 200, y: 300, label: "CENTRE" }, 
            { x: 200, y: 120, label: "AXIS" },
            { x: 80, y: 300, label: "TORQUE" }
          ]}
        />
      </div>

      {/* Hand-drawn element floating (Subtle) */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="absolute top-1/4 right-1/4 w-40 h-40 border border-[var(--gold)]/10 rounded-full opacity-20 pointer-events-none z-10"
      />
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="label-caps text-[8px]">Scroll to descend</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--gold)] to-transparent" />
      </motion.div>
    </section>
  );
}
