import { motion } from "framer-motion";
import outdoorTraining from "@/assets/outdoor_training.png.asset.json";
import macePose from "@/assets/mace_pose.png.asset.json";
import feetDetail from "@/assets/feet_detail.png.asset.json";
import stickDrill from "@/assets/stick_drill.png.asset.json";
import buildingMist from "@/assets/dojo-building-mist.jpg.asset.json";
import buildingClear from "@/assets/dojo-building-clear.jpg.asset.json";
import stickTraining from "@/assets/stick-training.jpg.asset.json";
import dojoDrone4 from "@/assets/dojo-drone-4.jpg.asset.json";
import dojoDrone3 from "@/assets/dojo-drone-3.jpg.asset.json";

const frames = [
  { image: dojoDrone4.url, caption: "Dojo from above" },
  { image: buildingMist.url, caption: "The Dojo in mist" },
  { image: buildingClear.url, caption: "Clear skies" },
  { image: stickTraining.url, caption: "Morning drills" },
  { image: dojoDrone3.url, caption: "The courtyard" },
  { image: macePose.url, caption: "Mace flow" },
  { image: feetDetail.url, caption: "Ground contact" },
  { image: stickDrill.url, caption: "Evening drills" },
];

const reviews = [
  {
    quote: "A transformative space for anyone looking to understand their body beyond just strength.",
    author: "Google Review",
  },
  {
    quote: "The mace work changed how I move. Simple tools, deep science, patient teaching.",
    author: "Google Review",
  },
  {
    quote: "Naggar, the mountains and the practice — I left with a way of training I still keep.",
    author: "Google Review",
  },
];

export default function DojoFrames() {
  return (
    <section className="relative py-20 md:py-24 px-6 bg-[var(--night)] border-t border-[var(--bone)]">
      <div className="section-inner space-y-12">
        <div className="space-y-3">
          <p className="label-caps text-[var(--gold)] tracking-widest text-[10px]">The Dojo, in frames</p>
          <h2 className="editorial-heading text-3xl md:text-5xl leading-tight">
            The Living Space
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
          {frames.map((f, i) => (
            <motion.figure
              key={f.caption}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[var(--bone)]"
            >
              <img
                src={f.image}
                alt={f.caption}
                loading="lazy"
                className="w-full h-full object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
              />
              <figcaption className="absolute bottom-3 left-3 label-caps text-[8px] text-[var(--cream)]">
                {f.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={r.quote}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 bg-[var(--alt)] border border-[var(--bone)] rounded-sm space-y-3"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-3 h-3 fill-[var(--gold)]" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm italic text-[var(--muted)] leading-relaxed">"{r.quote}"</p>
              <p className="label-caps text-[8px] text-[var(--cream)]/60">— {r.author}</p>
            </motion.blockquote>
          ))}
        </div>

        <div className="grayscale contrast-125 opacity-70 border border-[var(--bone)] rounded-sm overflow-hidden h-56 md:h-72">
          <iframe
            title="Kasratshala Dojo location in Naggar, Himachal Pradesh"
            src="https://www.google.com/maps?q=Naggar,%20Kullu,%20Himachal%20Pradesh&output=embed"
            loading="lazy"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
