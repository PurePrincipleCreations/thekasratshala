import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ksLogo from "@/assets/ks-logo.png.asset.json";

const links = [
  { label: "The Dojo", id: "about" },
  { label: "Courses", id: "courses" },
  { label: "Camps", id: "camps" },
  { label: "One Flow", id: "gathering" },
  { label: "Connect", id: "contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let current = active;
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < 200) current = l.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md" : ""
      }`}
      style={{ background: scrolled ? "color-mix(in oklab, var(--page) 88%, transparent)" : "transparent" }}
    >
      <div className="section-inner flex items-center justify-between py-4">
        <button onClick={() => scrollTo("hero")} className="flex items-center opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto" aria-label="Kasratshala home">
          <img src={ksLogo.url} alt="The Kasrat Shala logo" className="h-10 w-auto" />
        </button>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className={`text-sm tracking-wide transition-colors ${
                  active === l.id ? "text-[var(--gold-bright)]" : "text-[var(--cream)]/70 hover:text-[var(--cream)]"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-[var(--cream)]" onClick={() => setOpen(true)} aria-label="Menu">
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--page)] flex flex-col items-center justify-center gap-8 z-50"
          >
            <button className="absolute top-6 right-6 text-[var(--cream)]" onClick={() => setOpen(false)} aria-label="Close">
              <X size={28} />
            </button>
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="section-title text-3xl text-[var(--heading)]"
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
