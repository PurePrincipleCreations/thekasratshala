import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import BiomechanicalOverlay from "../biomechanical/BiomechanicalOverlay";

export default function Hero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1.15, 1]);
  const y = useTransform(scrollY, [0, 800], [0, 150]);
  
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
    <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center overflow-hidden bg-[var(--night)] px-6">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--night)] via-[var(--night)]/80 to-transparent z-10" />
      
      <div className="section-inner relative z-20 w-full flex flex-col md:flex-row items-center gap-12 py-20">
        <div className="w-full md:w-1/2 space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.p variants={headlineReveal} className="label-caps text-[var(--muted)]">Movement Arts Dojo</motion.p>
            <motion.h1 variants={headlineReveal} className="editorial-heading text-6xl md:text-9xl mt-6 leading-[0.85]">
              Build a body<br />
              <span className="italic text-[var(--gold)] ml-4 md:ml-12">that moves with you.</span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 max-w-lg"
          >
            <p className="text-[var(--muted)] text-lg leading-relaxed">
              Kasratshala brings traditional movement tools, yoga, breathwork and modern biomechanics into one living practice — for stronger, more capable and more adaptable bodies.
            </p>
            <p className="label-caps text-[10px] text-[var(--gold)]">Ancient tools. Modern movement science. One body.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-6 pt-4"
          >
            <Link
              to={"/courses" as any}
              className="px-8 py-4 bg-[var(--teal)] text-[var(--night)] font-hand text-xl hover:bg-[var(--gold)] transition-colors"
            >
              Explore the practice
            </Link>
            <Link
              to={"/one-flow" as any}
              className="px-8 py-4 border border-[var(--bone)] text-[var(--cream)] font-hand text-xl hover:bg-[var(--bone)] transition-colors"
            >
              Discover One Flow
            </Link>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-auto md:h-[90vh]">
          <motion.div 
            style={{ 
              scale, 
              y,
              rotateX: mouseY,
              rotateY: mouseX,
            }} 
            className="relative w-full h-full overflow-hidden rounded-sm border border-[var(--bone)] shadow-2xl perspective-1000"
          >
            <img 
              src={yogaPose.url} 
              alt="Movement Arts" 
              className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity"
            />
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
              opacity={0.6}
            />
          </motion.div>
          
          {/* Hand-drawn element floating */}
          <motion.div
            style={{ x: mouseX, y: mouseY }}
            className="absolute -top-10 -right-10 w-40 h-40 border border-[var(--gold)] rounded-full opacity-20 pointer-events-none"
          />
        </div>
      </div>
      
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
