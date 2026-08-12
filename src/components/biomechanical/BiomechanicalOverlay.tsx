import { motion } from "framer-motion";

interface BiomechanicalOverlayProps {
  className?: string;
  points?: { x: number; y: number; label?: string }[];
  paths?: string[];
  circles?: { cx: number; cy: number; r: number }[];
  opacity?: number;
  headlines?: {
    howToMoveWell?: string;
    functionalMovement?: string;
    trainYourNeuro?: string;
  };
}

export default function BiomechanicalOverlay({
  className = "",
  points = [],
  paths = [],
  circles = [],
  opacity = 0.4,
  headlines
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
      {headlines && (
        <foreignObject x="0" y="0" width="100%" height="100%" className="overflow-visible">
          <div className="w-full h-full flex flex-col items-center justify-center text-center px-4" style={{ transform: 'translateY(-10%)' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="space-y-2 md:space-y-4"
            >
              {headlines.howToMoveWell && (
                <span className="label-caps text-[var(--gold)] text-[6px] md:text-[10px] tracking-[0.3em] block mb-2 md:mb-4">
                  {headlines.howToMoveWell}
                </span>
              )}
              {headlines.trainYourNeuro && (
                <p className="font-hand text-[8px] md:text-[14px] text-[var(--bone)] mt-2 md:mt-4 max-w-[150px] md:max-w-xs mx-auto opacity-80 italic leading-tight">
                  {headlines.trainYourNeuro}
                </p>
              )}
            </motion.div>
          </div>
        </foreignObject>
      )}
    </motion.svg>
  );
}
