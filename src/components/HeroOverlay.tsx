import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ksLogo from "@/assets/ks-logo.png.asset.json";
import yogaPose from "@/assets/yoga_pose.png.asset.json";
import macePose from "@/assets/mace_pose.png.asset.json";
import handsContact from "@/assets/hands_contact.png.asset.json";
import { EASE } from "@/lib/motion";

const markers = [
  { n: "01", label: "body first" },
  { n: "360°", label: "movement practice" },
  { n: "India", label: "rooted, online" },
];

const headlineLines = ["Movement", "nourishment"];

function useMouseParallax(disabled: boolean) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (disabled) return;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [disabled]);
  return pos;
}

export default function HeroOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.08, 1]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0.35]);
  const { x, y } = useMouseParallax(!!reduce);

  const layer = (depth: number) => ({
    transform: `translate3d(${x * depth}px, ${y * depth}px, 0)`,
  });

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--page)]"
    >
      {/* Layer 1 — paper texture */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          ...layer(3),
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/></filter><rect width='100%25' height='100%25' filter='url(%23p)' opacity='0.35'/></svg>\")",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* Layer 2 — Himalayan haze / moss gradients */}
      <div className="absolute inset-0 hero-haze" style={layer(3)} aria-hidden="true" />

      {/* Layer 3 — technical movement geometry */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{ ...layer(10), opacity: 0.4 }}
      >
        <g fill="none" stroke="#405044" strokeWidth="1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={`v${i}`} x1={140 + i * 184} y1="0" x2={140 + i * 184} y2="800" opacity="0.12" />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line key={`h${i}`} x1="0" y1={140 + i * 180} x2="1200" y2={140 + i * 180} opacity="0.12" />
          ))}
          <motion.circle
            cx="600" cy="400" r="290"
            opacity="0.3"
            initial={reduce ? undefined : { pathLength: 0 }}
            animate={reduce ? undefined : { pathLength: 1 }}
            transition={{ duration: 2.4, ease: EASE as unknown as number[] }}
          />
          <motion.circle
            cx="600" cy="400" r="180"
            opacity="0.22"
            initial={reduce ? undefined : { pathLength: 0 }}
            animate={reduce ? undefined : { pathLength: 1 }}
            transition={{ duration: 2.4, delay: 0.2, ease: EASE as unknown as number[] }}
          />
          <motion.path
            d="M220 620 C 420 380, 780 380, 980 620"
            stroke="#b48357"
            opacity="0.3"
            strokeWidth="1.2"
            initial={reduce ? undefined : { pathLength: 0 }}
            animate={reduce ? undefined : { pathLength: 1 }}
            transition={{ duration: 2, delay: 0.4, ease: EASE as unknown as number[] }}
          />
        </g>
        <g fill="#b48357" opacity="0.35">
          <circle cx="600" cy="110" r="4" />
          <circle cx="600" cy="690" r="4" />
          <circle cx="310" cy="400" r="3" />
          <circle cx="890" cy="400" r="3" />
        </g>
      </motion.svg>

      {/* Foreground */}
      <motion.div className="relative z-10 text-center px-6 py-28" style={{ ...layer(4), scale, opacity: fade }}>
        <div className="relative mb-16 h-64 md:h-80 w-full max-w-xl mx-auto">
          {[
            { src: yogaPose, delay: 0, x: -60, y: -20, rotate: -5 },
            { src: macePose, delay: 0.2, x: 60, y: 0, rotate: 5 },
            { src: handsContact, delay: 0.4, x: 0, y: 40, rotate: 0 },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 40, rotate: img.rotate }}
              animate={{ opacity: 1, scale: 1, y: img.y, x: img.x }}
              transition={{ duration: 1.2, delay: img.delay, ease: EASE as unknown as number[] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={img.src.url}
                className="w-48 md:w-64 h-auto object-cover rounded-sm shadow-2xl border-4 border-[var(--page)]"
                alt="Movement practice"
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE as unknown as number[] }}
          className="label-caps"
        >
          Movement Arts Dojo · Naggar, Himachal Pradesh
        </motion.p>

        <h1 className="hand-title text-6xl md:text-8xl text-[var(--heading)] leading-[0.95] mt-4">
          {headlineLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.45 + i * 0.14, ease: EASE as unknown as number[] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE as unknown as number[] }}
          className="section-sub text-base md:text-lg mt-6 max-w-2xl mx-auto"
        >
          Kasratshala is a movement arts dojo bringing ancient tools, yoga, martial arts and modern
          movement science into one living practice — built for how bodies actually move
          bio-mechanically.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE as unknown as number[] }}
          className="label-caps mt-6 text-[var(--gold-bright)]"
        >
          Ancient tools. Modern movement science. One body.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: EASE as unknown as number[] }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <button
            onClick={() => scrollTo("courses")}
            className="px-7 py-3 bg-[var(--teal)] text-[var(--page)] text-xs tracking-[0.25em] uppercase hover:bg-[var(--gold)] transition-colors duration-500"
          >
            Explore online courses
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-7 py-3 border border-[var(--teal)]/40 text-[var(--teal)] text-xs tracking-[0.25em] uppercase hover:bg-[var(--teal)] hover:text-[var(--page)] transition-colors duration-500"
          >
            Speak with us
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.25, ease: EASE as unknown as number[] }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12"
        >
          {markers.map((m) => (
            <div key={m.n} className="text-center">
              <p className="section-title text-2xl text-[var(--teal)]">{m.n}</p>
              <p className="label-caps mt-1 text-[10px]">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4, duration: 0.9 }, y: { repeat: Infinity, duration: 2.4, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="label-caps text-[10px]">Movement, made fun</span>
        <ChevronDown size={18} className="text-[var(--gold)]" />
      </motion.div>
    </section>
  );
}
