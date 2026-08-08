import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Pause, ChevronDown } from "lucide-react";

export default function VideoTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <section id="descent" ref={ref} className="relative min-h-screen flex items-center justify-center py-24 bg-[var(--page)]">
      <motion.div style={{ opacity }} className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full md:mx-[8%] md:w-[84%] aspect-video overflow-hidden rounded-sm">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"
          >
            <source src="https://cdn.coverr.co/videos/coverr-a-drone-view-of-the-mountains-1584/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,10,12,0.4), rgba(8,10,12,0.7))" }} />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <p className="section-title text-3xl md:text-5xl max-w-3xl italic text-white">
              "Ancient tools. Modern movement science.<br/>One body."
            </p>

            <div className="gold-line mt-8" />
          </div>

          <button
            onClick={toggle}
            className="absolute bottom-6 right-6 w-11 h-11 rounded-full border border-white/40 bg-black/30 backdrop-blur flex items-center justify-center text-white hover:border-[var(--lime)]"
            aria-label="Play/pause"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">Scroll to continue</span>
        <ChevronDown size={16} className="text-[var(--gold)]" />
      </div>
    </section>
  );
}
