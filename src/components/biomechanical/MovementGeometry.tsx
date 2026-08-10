import { motion } from "framer-motion";

interface SvgGeometryProps {
  className?: string;
  type: "recode" | "strength" | "breath" | "mace";
}

export default function MovementGeometry({ className = "", type }: SvgGeometryProps) {
  return (
    <motion.svg viewBox="0 0 200 200" className={className} fill="none" stroke="var(--gold)" strokeWidth="0.5">
      {type === "recode" && (
        <g>
          <path d="M50 50 L150 50 M100 50 L100 150 M50 150 L150 150" strokeOpacity="0.4" />
          <circle cx="100" cy="100" r="30" strokeDasharray="4 4" />
        </g>
      )}
      {type === "strength" && (
        <path d="M20 150 C 20 20, 180 20, 180 150" />
      )}
      {type === "breath" && (
        <>
          <motion.circle cx="100" cy="100" r="30" initial={{ scale: 0.8 }} animate={{ scale: 1.2 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }} />
          <motion.circle cx="100" cy="100" r="50" initial={{ scale: 0.9 }} animate={{ scale: 1.1 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }} />
        </>
      )}
      {type === "mace" && (
        <circle cx="100" cy="100" r="60" strokeDasharray="80 20" />
      )}
    </motion.svg>
  );
}
