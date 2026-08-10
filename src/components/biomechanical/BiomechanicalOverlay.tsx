import { motion } from "framer-motion";

interface BiomechanicalOverlayProps {
  className?: string;
  points?: { x: number; y: number; label?: string }[];
  paths?: string[];
  circles?: { cx: number; cy: number; r: number }[];
  opacity?: number;
}

export default function BiomechanicalOverlay({
  className = "",
  points = [],
  paths = [],
  circles = [],
  opacity = 0.4
}: BiomechanicalOverlayProps) {
  return (
    <motion.svg
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${className}`}
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.5 }}
    >
      <g fill="none" stroke="var(--cream)" strokeWidth="0.5" strokeOpacity="0.4">
        {circles.map((c, i) => (
          <motion.circle
            key={`circle-${i}`}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        ))}
        {paths.map((d, i) => (
          <motion.path
            key={`path-${i}`}
            d={d}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 0.5 + i * 0.3 }}
          />
        ))}
      </g>
      
      {points.map((p, i) => (
        <g key={`point-${i}`}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r="3"
            fill="var(--gold)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1 }}
          />
          {p.label && (
            <motion.text
              x={p.x + 8}
              y={p.y + 4}
              fill="var(--muted)"
              fontSize="8"
              className="label-caps"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            >
              {p.label}
            </motion.text>
          )}
        </g>
      ))}
    </motion.svg>
  );
}
