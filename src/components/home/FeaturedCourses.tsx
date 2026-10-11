import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import macePose from "@/assets/mace_pose.png.asset.json";
import suspensionStrength from "@/assets/suspension-strength.jpg.asset.json";
import handsContact from "@/assets/hands_contact.png.asset.json";
import MovementGeometry from "../biomechanical/MovementGeometry";

const featured = [
  { title: "Kinetic Conditioning", category: "Structure · Load", description: "Focus on structural integrity and load.", image: suspensionStrength, type: "strength" as const },
  { title: "Steel Mace Flow", category: "Rotation · Flow", description: "Rotational strength and fluid movement.", image: macePose, type: "mace" as const },
  { title: "Landmine Athletics", category: "Ground-based power", description: "Explosive, ground-based power.", image: handsContact, type: "recode" as const },
  { title: "Mace Vinyasa & Yoga Kali", category: "Ancient disciplines · Breath", description: "Ancient disciplines fused with breath mechanics.", image: yogaPose, type: "strength" as const },
].map((c) => ({ ...c, cta: "See batches", to: "/schedule" as any }));

export default function FeaturedCourses() {
  return (
    <section className="py-12 md:py-24 bg-[var(--night)] px-6">
      <div className="section-inner">
        <div className="space-y-6 mb-20 text-center">
          <p className="label-caps text-[var(--gold)] text-xs md:text-sm tracking-[0.3em] opacity-60">Daily Practice</p>
          <h2 className="editorial-heading text-5xl md:text-7xl leading-[0.95] tracking-tight">Train the Way You Were Meant To.</h2>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">Whether you are loading steel, flowing with a mace, or mastering your own mass, our schedule is built for progressive mastery. We offer structured morning and evening sessions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((item) => (
            <Link 
              key={item.title} 
              to={item.to}
              className="group block space-y-6"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[var(--bone)]">
                <motion.img 
                  src={item.image.url} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  alt={item.title}
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <MovementGeometry type={item.type} className="w-16 h-16 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <p className="label-caps text-[8px] text-[var(--gold)]">{item.category}</p>
                     <h3 className="editorial-heading text-3xl">{item.title}</h3>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[var(--muted)] text-sm leading-relaxed">{item.description}</p>
                <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                  <span className="inline-block label-caps text-[10px] text-[var(--gold)] border-b border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-colors">
                    {item.cta}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[var(--gold)]/20 flex items-center justify-center group-hover:bg-[var(--gold)] group-hover:text-[var(--night)] transition-all">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link 
            to="/schedule"
            className="inline-block px-10 py-4 border border-[var(--bone)] text-[var(--cream)] font-hand text-xl hover:bg-[var(--bone)] transition-all"
          >
            View the full schedule
          </Link>
        </div>
      </div>
    </section>
  );
}
