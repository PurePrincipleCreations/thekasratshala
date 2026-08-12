import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import droneFootage from "@/assets/drone-footage.mp4.asset.json";
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
    <section className="relative min-h-[95vh] flex flex-col md:flex-row items-center justify-center overflow-hidden bg-[var(--night)] px-6 pt-24">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--night)] via-[var(--night)]/90 to-transparent z-10" />
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover grayscale mix-blend-luminosity scale-110"
        >
          <source src={droneFootage.url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[var(--night)]/60" />
      </div>
      
      <div className="section-inner relative z-20 w-full flex flex-col md:flex-row items-center gap-12 py-20">
        <div className="w-full md:w-1/2 space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.p variants={headlineReveal} className="label-caps text-[var(--gold)] tracking-[0.2em]">Movement nourishment</motion.p>
            <motion.h1 variants={headlineReveal} className="editorial-heading text-[12vw] md:text-[14vw] mt-2 leading-[0.8] tracking-tighter mix-blend-difference overflow-hidden">
               {["KASRAT", "SHALA"].map((word, i) => (
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
            <div className="flex flex-col items-start gap-4">
              <Link
                to={"/courses" as any}
                className="group relative px-12 py-6 bg-[var(--teal)] text-[var(--night)] label-caps text-sm overflow-hidden rounded-full transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Begin the Journey</span>
                <motion.div 
                  className="absolute inset-0 bg-[var(--gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                />
              </Link>
              <p className="font-hand text-[var(--muted)] text-xl opacity-60">Hand-drawn but digitally precise.</p>
            </div>

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
