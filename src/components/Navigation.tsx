import { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useAtom } from "jotai";
import { cartAtom, isCartOpenAtom } from "@/lib/store";

import ksLogo from "@/assets/ks-logo-new.png.asset.json";
import toriiGate from "@/assets/torii-gate.png.asset.json";

const links = [
  { label: "Home", path: "/" },
  { label: "Certifications", path: "/certifications" },
  { label: "Camps", path: "/camps" },
  { label: "Kinetic", path: "/kinetic" },
  { label: "Connect", path: "/connect" },
] as const;

export default function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [open, setOpen] = useState(false);
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
    <nav className={`${isHomePage ? "absolute" : "sticky"} top-0 left-0 right-0 z-[100] py-0 transition-all duration-300 pointer-events-none ${!isHomePage ? "bg-[var(--night)]" : ""}`}>
      <div className="section-inner flex items-center justify-between px-6 md:px-12 pointer-events-auto min-h-[60px] sm:min-h-[80px]">
        <button 
          onClick={() => setOpen(!open)}
          className="relative z-[101] group flex items-center outline-none py-1"
        >
          <div className="flex flex-col">
            <img src={ksLogo.url} alt="Kasratshala" className="h-10 sm:h-14 md:h-20 lg:h-24 w-auto group-hover:scale-105 transition-transform" />
          </div>
        </button>

        <div className="hidden md:flex items-center gap-8 lg:gap-12 transition-all duration-500">
          <AnimatePresence mode="wait">
            {!open && links.map((l, i) => (
              <motion.div
                key={l.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={l.path as any}
                  className="label-caps text-[20px] tracking-[0.25em] text-[#A3E635] hover:text-[#A3E635] transition-colors relative group font-bold px-4 py-2 rounded-full hover:bg-[rgba(93,74,62,0.2)]"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-6 relative z-[101]">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
          >
            <ShoppingBag size={28} className="md:w-8 md:h-8" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--gold)] text-[var(--night)] text-[10px] flex items-center justify-center rounded-full font-bold">
                {cart.length}
              </span>
            )}
          </button>
          
          {links.length > 0 && (
            <button 
              className="relative text-[var(--cream)] p-2 md:hidden hover:text-[var(--gold)] transition-colors"
              onClick={() => setOpen(!open)}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={32} />
                  </motion.div>
                ) : (
                  <motion.img 
                    key="menu"
                    src={toriiGate.url} 
                    alt="Menu" 
                    className="w-12 h-12 object-contain mix-blend-screen"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  />
                )}
              </AnimatePresence>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu - Slide from top */}
      {/* Navigation Overlay - Slide from top */}
      <AnimatePresence>
        {open && links.length > 0 && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-[var(--night)] z-[90] flex flex-col p-8 pt-48 md:pt-64 pointer-events-auto"
          >
            <div className="section-inner flex flex-col gap-10 md:gap-14">
              {(links as any).map((l: any, i: number) => (
                <motion.div
                  key={l.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={l.path as any}
                    onClick={() => setOpen(false)}
                    className="editorial-heading text-6xl md:text-8xl text-[var(--cream)] hover:text-[var(--gold)] transition-colors flex items-center justify-between group"
                  >
                    {l.label}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all w-12 h-12 md:w-20 md:h-20 -translate-x-4 group-hover:translate-x-0" />
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