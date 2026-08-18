import { motion, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import BiomechanicalOverlay from "../biomechanical/BiomechanicalOverlay";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(true);
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(mousePos.x, springConfig);
  const mouseY = useSpring(mousePos.y, springConfig);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (iframeRef.current) {
      // YouTube IFrame API control via postMessage
      const action = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: action, args: [] }),
        '*'
      );
    }
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--night)] -mt-[120px]">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.78vh] h-[56.25vw]">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/H46Oo99i898?autoplay=1&mute=1&loop=1&playlist=H46Oo99i898&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&vq=hd1080&enablejsapi=1`}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="Hero Video"
          />
        </div>
      </div>



      {/* Volume Control */}
      <button 
        onClick={toggleMute}
        className="absolute bottom-10 right-10 z-30 p-4 rounded-full bg-[var(--night)]/20 backdrop-blur-md border border-[var(--cream)]/10 text-[var(--cream)] hover:text-[var(--gold)] transition-all hover:scale-110 active:scale-95 group"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX size={24} className="group-hover:animate-pulse" /> : <Volume2 size={24} />}
      </button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="label-caps text-[8px] text-[var(--cream)] uppercase tracking-[0.2em]">Scroll to descend</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--gold)] to-transparent" />
      </motion.div>
    </section>
  );
}
