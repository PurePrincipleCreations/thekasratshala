import { ReactNode } from "react";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import { useLocation } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import DojoFrames from "@/components/DojoFrames";
import ScheduleDock from "@/components/ScheduleDock";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }: { children?: ReactNode }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="relative min-h-screen overflow-x-clip selection:bg-[var(--gold)] selection:text-[var(--night)] bg-[var(--page)]">
      <div className="grain-overlay" />
      <Navigation />
      
      <AnimatePresence mode="wait">
        <motion.main
          key="main-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`relative ${isHomePage ? "pt-0" : "pt-16 md:pt-20"}`}
        >
          {children || <Outlet />}
          <DojoFrames />
        </motion.main>
      </AnimatePresence>

      <Footer />
      <ScheduleDock />
      <ScrollRestoration />
    </div>
  );
}
