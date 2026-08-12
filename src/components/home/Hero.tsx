import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
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
            className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity"
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

      <div className="section-inner relative z-20 w-full flex flex-col items-center text-center py-20 mt-16 md:mt-24">
        <div className="max-w-4xl space-y-6 md:space-y-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="flex flex-col items-center"
          >
            <motion.p variants={headlineReveal} className="label-caps text-[var(--gold)] tracking-[0.4em] text-[10px] md:text-xs mb-4">
              Movement Arts Dojo
            </motion.p>
            <motion.h1 
              variants={headlineReveal} 
              className="editorial-heading text-[10vw] md:text-[6vw] leading-[0.9] tracking-tighter text-[var(--cream)] uppercase"
            >
               {["MOVEMENT", "NOURISHMENT"].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ y: "100%", rotateX: -90, opacity: 0 }}
                    animate={{ y: 0, rotateX: 0, opacity: 1 }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.6 + (i * 0.2),
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="block origin-bottom"
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            <p className="text-[var(--cream)]/80 text-lg md:text-xl leading-relaxed italic font-serif">
              Kasratshala brings traditional movement tools, yoga, breathwork and modern biomechanics into one living practice — for stronger, more capable and more adaptable bodies.
            </p>
            <p className="label-caps text-[10px] md:text-xs text-[var(--gold)] border-t border-[var(--gold)]/20 pt-6 inline-block">
              Ancient tools. Modern movement science. One body.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-6 pt-4"
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
