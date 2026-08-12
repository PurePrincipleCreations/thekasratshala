import { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useAtom } from "jotai";
import { cartAtom, isCartOpenAtom } from "@/lib/store";

import ksLogo from "@/assets/ks-logo-original.png.asset.json";
import outdoorTraining from "@/assets/outdoor_training.png.asset.json";
import outdoorMace2 from "@/assets/outdoor_mace_2.png.asset.json";
import handMudra from "@/assets/hand_mudra.png.asset.json";
import handsContact from "@/assets/hands_contact.png.asset.json";

const links = [] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [cart] = useAtom(cartAtom);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);
  const [hovered, setHovered] = useState<string | null>(null);
  const cursorX = useSpring(0, { damping: 30, stiffness: 250, mass: 0.4 });
  const cursorY = useSpring(0, { damping: 30, stiffness: 250, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  const hoveredLink = links.find((l) => l.path === hovered);


  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] py-4 md:py-6 transition-all duration-300">
      <div className="section-inner flex items-center justify-between">
        <Link to="/" className="relative z-[101] group flex items-center gap-3">
          <div className="flex flex-col">
            <img src={ksLogo.url} alt="Kasratshala" className="h-12 md:h-16 w-auto group-hover:scale-105 transition-transform" />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
          >
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] text-[var(--night)] text-[8px] flex items-center justify-center rounded-full font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
        </div>
        
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
          >
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] text-[var(--night)] text-[8px] flex items-center justify-center rounded-full font-bold">
                {cart.length}
              </span>
            )}
          </button>
          {/* Mobile Toggle */}
          <button 
            className="relative z-50 text-[var(--cream)] p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>


      {/* Cursor-following preview on nav hover (desktop) */}
      <AnimatePresence>
        {hoveredLink && (
          <motion.div
            key={hoveredLink.path}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: cursorX, y: cursorY }}
            className="pointer-events-none fixed top-0 left-0 z-40 hidden md:block"
          >
            <div className="-translate-x-1/2 translate-y-8">
              <div className="w-56 overflow-hidden rounded-sm border border-[var(--bone)] bg-[var(--forest)]">
                <img
                  src={hoveredLink.preview}
                  alt=""
                  aria-hidden="true"
                  className="h-36 w-full object-cover grayscale opacity-80"
                />
                <p className="label-caps px-3 py-2 text-[8px] text-[var(--gold)]">{hoveredLink.label}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[var(--night)] z-40 flex flex-col p-8 pt-32"
          >
            <div className="flex flex-col gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={l.path as any}
                    className="editorial-heading text-5xl text-[var(--cream)] hover:text-[var(--gold)] transition-colors flex items-center justify-between group"
                  >
                    {l.label}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto border-t border-[var(--bone)] pt-8"
            >
              <p className="label-caps text-[var(--muted)] mb-4">Kasratshala</p>
              <a href="mailto:namaste@kasratshala.in" className="text-xl font-serif italic text-[var(--gold)]">
                namaste@kasratshala.in
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
