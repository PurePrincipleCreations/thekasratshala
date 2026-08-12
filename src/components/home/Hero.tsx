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

      {/* Main Header Layer - "How to train AI" animation concept */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="w-full max-w-5xl px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* The "How to train AI" inspired animation header */}
            <div className="relative z-10 text-center">
              <motion.h1 
                className="editorial-heading text-6xl md:text-9xl text-[var(--cream)] tracking-tighter"
                initial={{ filter: "blur(20px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                HOW TO TRAIN <span className="italic text-[var(--gold)]">AI</span>
              </motion.h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent mt-4"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="label-caps text-[10px] md:text-xs text-[var(--gold)] tracking-[0.4em] mt-6"
              >
                AUTONOMOUS INTELLIGENCE • BIOMECHANICAL FLOW
              </motion.p>
            </div>

            {/* Background glow for the header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 -z-10 blur-[100px] bg-[var(--gold)] rounded-full scale-150"
            />
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
