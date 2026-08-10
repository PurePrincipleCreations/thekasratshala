import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useAtom } from "jotai";
import { cartAtom, isCartOpenAtom } from "@/lib/store";

import ksLogo from "@/assets/ks-logo.png.asset.json";

const links = [
  { label: "Practice", path: "/courses" },
  { label: "Camps", path: "/camps" },
  { label: "One Flow", path: "/one-flow" },
  { label: "Connect", path: "/connect" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [cart] = useAtom(cartAtom);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);


  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 md:py-8">
      <div className="section-inner flex items-center justify-between">
        <Link to="/" className="relative z-50 group flex items-center gap-3">
          <img src={ksLogo.url} alt="Kasratshala" className="h-8 md:h-10 w-auto invert opacity-80 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path as any}
              className={`label-caps text-[9px] hover:text-[var(--gold)] transition-colors ${
                location.pathname === l.path ? "text-[var(--gold)]" : "text-[var(--muted)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
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
          <Link
            to="/connect"

            className="px-6 py-2 border border-[var(--bone)] text-[var(--cream)] font-hand text-lg hover:bg-[var(--bone)] transition-all"
          >
            Join the Dojo
          </Link>
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
