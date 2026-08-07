import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ksLogo from "@/assets/ks-logo.png.asset.json";

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
          <img src={ksLogo.url} alt="The Kasrat Shala logo" className="w-[min(320px,70vw)] mb-4 animate-pulse-soft" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-[var(--muted)] mb-8">Movement Arts Dojo</p>
          <div className="w-40 h-px bg-[var(--cream)]/10 overflow-hidden">
            <div className="w-full h-full shimmer" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
