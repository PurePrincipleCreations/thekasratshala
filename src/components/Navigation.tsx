import { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useAtom } from "jotai";
import { cartAtom, isCartOpenAtom } from "@/lib/store";

import ksLogo from "@/assets/ks-logo-original.png.asset.json";
import toriiGate from "@/assets/torii-gate.png.asset.json";

const links = [
  { label: "Home", path: "/" },
  { label: "Courses", path: "/courses" },
  { label: "Camps", path: "/camps" },
  { label: "One Flow", path: "/one-flow" },
  { label: "Connect", path: "/connect" },
] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [cart] = useAtom(cartAtom);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);
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

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] py-4 md:py-6 transition-all duration-300 bg-gradient-to-b from-[var(--night)]/60 to-transparent">
      <div className="section-inner flex items-center justify-between">
        <Link to="/" className="relative z-[101] group flex items-center gap-3">
          <div className="flex flex-col">
            <img src={ksLogo.url} alt="Kasratshala" className="h-16 md:h-24 w-auto group-hover:scale-105 transition-transform" />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path as any}
              className="label-caps text-[10px] tracking-[0.2em] text-[var(--muted)] hover:text-[var(--gold)] transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--gold)] transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 relative z-[101]">
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
          
          {links.length > 0 && (
            <button 
              className="relative text-[var(--cream)] p-2 md:hidden hover:text-[var(--gold)] transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <X size={24} />
              ) : (
                <img 
                  src={toriiGate.url} 
                  alt="Menu" 
                  className="w-8 h-8 object-contain mix-blend-screen"
                />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {open && links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[var(--night)]/95 backdrop-blur-md z-[90] flex flex-col p-8 pt-32"
          >
            <div className="flex flex-col gap-8">
              {(links as any).map((l: any, i: number) => (
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}