import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import dojoBuilding from "@/assets/dojo-building-clear.jpg.asset.json";

const VIDEO_SRC =
  "https://player.mediadelivery.net/play/776265/7ca67b3c-581d-486e-b701-0507524a4abe?autoplay=true&loop=true&muted=true&preload=true&controls=false";

const trust = ["WeckMethod", "Landmine University", "Breakthrough", "Fullgrip", "Movement Science"];
const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <>
      <section className="relative isolate h-[100svh] min-h-[560px] flex items-center justify-center overflow-hidden bg-[var(--night)]">
        {/* Poster fallback */}
        <img
          src={dojoBuilding.url}
          alt="The Kasratshala dojo in Naggar, Himachal Pradesh"
          className="absolute inset-0 w-full h-full object-cover -z-30"
        />

        {/* Un-clickable background video */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-20" aria-hidden="true">
          <iframe
            src={VIDEO_SRC}
            title="Kasratshala background video"
            allow="autoplay; muted; encrypted-media; picture-in-picture"
            {...({ playsInline: true } as Record<string, unknown>)}
            tabIndex={-1}
            loading="eager"
            className="w-[100vw] h-[56.25vw] min-h-[100svh] min-w-[177.77svh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.15] border-0 pointer-events-none select-none"
          />
        </div>

        {/* Legibility overlay + interaction shield */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[var(--night)]/60 via-[var(--night)]/40 to-[var(--night)]/85" aria-hidden="true" />

        <div className="relative z-20 section-inner px-6 text-center max-w-4xl pt-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="label-caps text-[var(--gold)] tracking-[0.3em] text-xs md:text-sm"
          >
            Real Strength. Rebuilt Mechanics.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease }}
            className="editorial-heading text-5xl md:text-8xl leading-[0.95] text-[var(--cream)] mt-5"
          >
            Master the Art of <span className="italic text-[var(--gold)]">Real Strength.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="text-[var(--cream)]/85 text-base md:text-lg leading-relaxed mt-6 max-w-2xl mx-auto"
          >
            We don’t confine ourselves to a single system. The Kasratshala Way merges the raw discipline
            of the traditional Akhada and Yoga systems with the exact precision of modern biomechanics.
            It is a complete physical and energetic recalibration for the human body. Start where your
            body is.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <Link
              to="/schedule"
              className="px-8 py-4 bg-[var(--teal)] text-[var(--night)] font-hand text-xl hover:bg-[var(--gold)] transition-all"
            >
              View Live Schedule
            </Link>
            <Link
              to="/immersions"
              className="px-8 py-4 border border-[var(--cream)]/40 text-[var(--cream)] font-hand text-xl hover:bg-[var(--bone)] transition-all"
            >
              Explore Immersions
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Authority / trust banner */}
      <div className="bg-[var(--night)] border-y border-[var(--bone)] px-6 py-5">
        <div className="section-inner flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <span className="label-caps text-[var(--gold)] text-[11px] tracking-[0.3em]">Certified &amp; Informed By:</span>
          {trust.map((t, i) => (
            <span key={t} className="label-caps text-[var(--cream)]/80 text-[11px] tracking-[0.2em]">
              {t}{i < trust.length - 1 && <span className="ml-6 text-[var(--bone)]">|</span>}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
