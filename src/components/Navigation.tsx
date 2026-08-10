import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ksLogo from "@/assets/ks-logo.png.asset.json";

const links = [
  { label: "Home", to: "/" as const },
  { label: "Courses", to: "/courses" as any },
  { label: "Camps", to: "/camps" as any },
  { label: "One Flow", to: "/one-flow" as any },
  { label: "Connect", to: "/connect" as any },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--bone)] backdrop-blur-md bg-[var(--night)]/80 transition-all duration-500">
      <div className="section-inner flex items-center justify-between py-4">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img src={ksLogo.url} alt="Kasratshala" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm label-caps transition-colors relative py-1 ${
                  location.pathname === l.to ? "text-[var(--gold)]" : "text-[var(--muted)] hover:text-[var(--cream)]"
                }`}
              >
                {l.label}
                {location.pathname === l.to && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--gold)]"
                  />
                )}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={"/connect" as any}
              className="ml-4 px-5 py-2 border border-[var(--gold)] text-[var(--gold)] text-xs font-hand hover:bg-[var(--gold)] hover:text-[var(--night)] transition-colors duration-300"
            >
              Enquire
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[var(--cream)]" onClick={() => setOpen(true)} aria-label="Menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[var(--night)] flex flex-col items-center justify-center p-8"
          >
            <button
              className="absolute top-6 right-6 text-[var(--cream)]"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <img src={ksLogo.url} alt="Kasratshala" className="h-12 w-auto mb-16" />
            <div className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`text-3xl editorial-heading ${
                      location.pathname === l.to ? "text-[var(--gold)]" : "text-[var(--cream)]"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1 }}
                className="mt-8"
              >
                <Link
                  to={"/connect" as any}
                  onClick={() => setOpen(false)}
                  className="px-8 py-3 bg-[var(--gold)] text-[var(--night)] label-caps"
                >
                  Enquire
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
