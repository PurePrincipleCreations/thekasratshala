import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import BiomechanicalOverlay from "../biomechanical/BiomechanicalOverlay";

export default function Hero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1.06, 1]);
  const y = useTransform(scrollY, [0, 800], [0, 100]);

  return (
    <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center overflow-hidden bg-[var(--night)] px-6">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--night)] via-[var(--night)]/80 to-transparent z-10" />
      
      <div className="section-inner relative z-20 w-full flex flex-col md:flex-row items-center gap-12 py-20">
        <div className="w-full md:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="label-caps text-[var(--muted)]">Movement Arts Dojo · Naggar, Himachal Pradesh</p>
            <h1 className="editorial-heading text-6xl md:text-8xl mt-6">
              Build a body<br />
              <span className="italic text-[var(--gold)]">that moves with you.</span>
            </h1>
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
              className="px-8 py-4 bg-[var(--teal)] text-[var(--night)] label-caps hover:bg-[var(--gold)] transition-colors"
            >
              Explore the practice
            </Link>
            <Link
              to={"/one-flow" as any}
              className="px-8 py-4 border border-[var(--bone)] text-[var(--cream)] label-caps hover:bg-[var(--bone)] transition-colors"
            >
              Discover One Flow
            </Link>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-auto md:h-[80vh]">
          <motion.div style={{ scale, y }} className="relative w-full h-full overflow-hidden rounded-sm border border-[var(--bone)]">
            <img 
              src={yogaPose.url} 
              alt="Movement Arts" 
              className="w-full h-full object-cover grayscale opacity-60"
            />
            <BiomechanicalOverlay 
              circles={[{ cx: 200, cy: 300, r: 150 }]}
              paths={["M50 300 Q200 100 350 300"]}
              points={[{ x: 200, y: 300, label: "ALIGNMENT" }, { x: 100, y: 200, label: "FORCE" }]}
            />
          </motion.div>
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
