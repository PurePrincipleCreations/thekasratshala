import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "#080A0C" }}
        >
          <div className="w-20 h-20 rounded-full border border-[var(--gold)]/60 flex items-center justify-center animate-pulse-soft mb-6">
            <span className="text-3xl text-[var(--gold-bright)]" style={{ fontFamily: "var(--font-deva)" }}>क</span>
          </div>
          <h1 className="hand-title text-5xl text-[var(--heading)] mb-1">Kasratshala</h1>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[var(--muted)] mb-8">Movement Arts Dojo</p>
          <div className="w-40 h-px bg-[var(--cream)]/10 overflow-hidden">
            <div className="w-full h-full shimmer" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
