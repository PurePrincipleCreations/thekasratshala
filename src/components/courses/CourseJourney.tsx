import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import macePose from "@/assets/mace_pose.png.asset.json";
import handsContact from "@/assets/hands_contact.png.asset.json";
import MovementGeometry from "../biomechanical/MovementGeometry";

const journey = [
  {
    n: "01",
    title: "RECODE",
    category: "Foundational movement recoding · Level 1",
    copy: "RECODE is Kasratshala’s foundational movement recoding process for modern bodies. It helps people realign how they move through four focused areas: Upper Body · Lower Body · Core · Gait",
    metadata: "Four-part workshop and course format. Level 1 is intentionally limited.",
    image: handsContact,
    type: "recode" as const,
    to: "/courses/recode" as any
  },
  {
    n: "02",
    title: "Yoga for Strength",
    category: "Yoga Arts · Teacher Training Course module · Online",
    copy: "A yoga practice built for usable strength. Develop structure, joint capacity, balance and progressive control without separating strength from breath or awareness.",
    image: yogaPose,
    type: "strength" as const,
    to: "/courses/yoga-for-strength" as any
  },
  {
    n: "03",
    title: "Pranayama",
    category: "Advanced Breathwork · TTC module · Online",
    copy: "A deeper study of breath as capacity, regulation and attention. This is not breathwork as a quick fix. It is a deliberate practice for people ready to understand how breath changes movement.",
    image: handsContact,
    type: "breath" as const,
    to: "/courses/pranayama" as any
  },
  {
    n: "04",
    title: "Steel Mace Flow",
    category: "Strength Arts + Movement Arts · Certification",
    copy: "Steel Mace Flow develops rotational strength, shoulder integrity, timing and fluid multi-planar movement through the ancient gada.",
    metadata: "Veer — Master Trainer. Karam — Level 2 Trainer.",
    image: macePose,
    type: "mace" as const,
    to: "/courses/steel-mace-flow" as any
  }
];

export default function CourseJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);

  return (
    <div className="bg-[var(--night)]">
      {/* Desktop Horizontal Scroll */}
      <div ref={containerRef} className="hidden md:block h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x }} className="flex h-full w-[400%]">
            {journey.map((item, i) => (
              <div key={item.n} className="w-screen h-full flex items-center justify-center px-20">
                <div className="section-inner w-full flex items-center gap-20">
                  <div className="w-1/2 space-y-8">
                    <p className="editorial-heading text-8xl text-[var(--bone)]">{item.n}</p>
                    <div className="space-y-4">
                      <p className="label-caps text-[var(--gold)]">{item.category}</p>
                      <h2 className="editorial-heading text-7xl">{item.title}</h2>
                      <p className="text-[var(--muted)] text-xl leading-relaxed italic">{item.copy}</p>
                    </div>
                    {item.metadata && (
                      <p className="text-[var(--muted)] text-sm opacity-60">{item.metadata}</p>
                    )}
                    <Link to={item.to} className="inline-block px-10 py-5 bg-[var(--teal)] text-[var(--night)] label-caps hover:bg-[var(--gold)] transition-all">
                      Explore {item.title}
                    </Link>
                  </div>
                  <div className="w-1/2 relative aspect-square border border-[var(--bone)] rounded-sm overflow-hidden">
                    <img src={item.image.url} className="w-full h-full object-cover grayscale opacity-40" alt={item.title} />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <MovementGeometry type={item.type} className="w-1/2 h-1/2 opacity-20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          {/* Progress system */}
          <div className="absolute bottom-20 left-20 flex items-center gap-4">
             <p className="label-caps text-[var(--gold)]">Journey</p>
             <div className="w-48 h-px bg-[var(--bone)] relative">
                <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 bg-[var(--gold)] origin-left" />
             </div>
             <p className="label-caps text-[var(--muted)]">01 / 04</p>
          </div>
        </div>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="md:hidden py-20 px-6 space-y-12">
        {journey.map((item) => (
          <div key={item.n} className="space-y-6 pb-12 border-b border-[var(--bone)]">
            <div className="relative aspect-[4/3] rounded-sm border border-[var(--bone)] overflow-hidden">
              <img src={item.image.url} className="w-full h-full object-cover grayscale opacity-40" alt={item.title} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <MovementGeometry type={item.type} className="w-1/3 h-1/3 opacity-20" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="label-caps text-[8px] text-[var(--gold)]">{item.category}</p>
              <h2 className="editorial-heading text-4xl">{item.title}</h2>
              <p className="text-[var(--muted)] text-base italic leading-relaxed">{item.copy}</p>
              <Link to={item.to} className="inline-block px-8 py-3 bg-[var(--teal)] text-[var(--night)] label-caps text-[10px]">
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
