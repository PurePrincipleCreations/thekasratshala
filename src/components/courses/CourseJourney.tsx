import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { cartAtom, isCartOpenAtom } from "@/lib/store";
import { toast } from "sonner";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import macePose from "@/assets/mace_pose.png.asset.json";
import handsContact from "@/assets/hands_contact.png.asset.json";
import pranayamaKs from "@/assets/pranayama-ks.jpg.asset.json";
import oneFlow from "@/assets/one-flow.jpg.asset.json";
import recodeNew from "@/assets/recode-new.jpg.asset.json";
import pranayamaHero from "@/assets/pranayama-hero.png.asset.json";
import MovementGeometry from "../biomechanical/MovementGeometry";

const journey = [
  {
    n: "01",
    title: "RECODE",
    category: "Foundational movement recoding · Level 1",
    copy: "RECODE is Kasratshala’s foundational movement recoding process for modern bodies. It helps people realign how they move through four focused areas: Upper Body · Lower Body · Core · Gait",
    metadata: "Four-part workshop and course format. Level 1 is intentionally limited.",
    image: recodeNew,
    price: 15000,
    type: "recode" as const,
    to: "/courses/recode" as any
  },
  {
    n: "02",
    title: "Yoga for Strength",
    category: "Yoga Arts · Teacher Training Course module · Online",
    copy: "A yoga practice built for usable strength. Develop structure, joint capacity, balance and progressive control without separating strength from breath or awareness.",
    image: pranayamaKs,
    price: 40000,
    type: "strength" as const,
    to: "/courses/yoga-for-strength" as any
  },
  {
    n: "03",
    title: "Pranayama",
    category: "Advanced Breathwork · TTC module · Online",
    copy: "A deeper study of breath as capacity, regulation and attention. This is not breathwork as a quick fix. It is a deliberate practice for people ready to understand how breath changes movement.",
    image: pranayamaHero,
    price: 25000,
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
    price: 35000,
    type: "mace" as const,
    to: "/courses/steel-mace-flow" as any
  }
];

export default function CourseJourney() {
  const [cart, setCart] = useAtom(cartAtom);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);

  const addToCart = (id: string, name: string, price: number) => {
    if (cart.find(item => item.id === id)) {
      setIsCartOpen(true);
      return;
    }
    setCart([...cart, { id, name, price }]);
    toast.success(`${name} added to cart`);
    setIsCartOpen(true);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);
  
  // Retro-futuristic transition: sections slide up and fade while moving horizontally
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.3], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.3], [100, 0, -100]);
  
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55], [100, 0, -100]);
  
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.6, 0.8], [100, 0, -100]);
  
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 1, 1], [0, 1, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.75, 0.85, 1], [100, 0, 0]);
  
  const opacities = [opacity1, opacity2, opacity3, opacity4];
  const yPos = [y1, y2, y3, y4];

  return (
    <div className="bg-[var(--night)]">
      {/* Desktop Horizontal Scroll */}
      <div ref={containerRef} className="hidden md:block h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x }} className="flex h-full w-[400%]">
            {journey.map((item, i) => (
              <motion.div 
                key={item.n} 
                className="w-screen h-full flex items-center justify-center px-20"
                style={{ opacity: opacities[i] }}
              >
                <div className="section-inner w-full grid grid-cols-2 items-center gap-20">
                  <div className="space-y-12">
                    <div className="space-y-4">
                      <p className="editorial-heading text-8xl text-[var(--bone)] opacity-20">{item.n}</p>
                      <p className="label-caps text-[var(--gold)]">{item.category}</p>
                      <h2 className="editorial-heading text-7xl md:text-9xl">{item.title}</h2>
                    </div>
                    
                    <div className="space-y-8 max-w-lg">
                      <p className="text-[var(--muted)] text-xl leading-relaxed italic">{item.copy}</p>
                      {item.metadata && (
                        <p className="text-[var(--muted)] text-sm opacity-60 font-hand">{item.metadata}</p>
                      )}
                      
                      <div className="group flex items-center gap-4 text-[var(--gold)] cursor-pointer">
                        <Link to={item.to} className="label-caps border-b border-[var(--gold)]/20 group-hover:border-[var(--gold)] transition-all">
                          Dive deep into {item.title}
                        </Link>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(item.n, item.title, item.price);
                          }}
                          className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center group-hover:bg-[var(--gold)] group-hover:text-[var(--night)] transition-all"
                        >
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="relative aspect-square border border-[var(--bone)] rounded-sm overflow-hidden group/img">
                    <img 
                      src={item.image.url} 
                      className="w-full h-full object-cover grayscale-0 opacity-60 group-hover/img:scale-110 group-hover/img:opacity-100 transition-all duration-[2000ms]" 
                      alt={item.title} 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <MovementGeometry type={item.type} className="w-1/2 h-1/2 opacity-20" />
                    </div>
                  </div>
                </div>
              </motion.div>

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
              <img src={item.image.url} className="w-full h-full object-cover grayscale-0 opacity-60" alt={item.title} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <MovementGeometry type={item.type} className="w-1/3 h-1/3 opacity-20" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="label-caps text-[8px] text-[var(--gold)]">{item.category}</p>
              <Link to={item.to}><h2 className="editorial-heading text-4xl hover:text-[var(--gold)] transition-colors">{item.title}</h2></Link>
              <p className="label-caps text-[var(--gold)]">₹{item.price.toLocaleString()}</p>
              <p className="text-[var(--muted)] text-base italic leading-relaxed">{item.copy}</p>
              <button 
                onClick={() => addToCart(item.n, item.title, item.price)}
                className="inline-block px-8 py-3 bg-[var(--teal)] text-[var(--night)] label-caps text-[10px]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
