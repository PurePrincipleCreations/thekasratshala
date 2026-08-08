import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

export type MovementPathType = "yoga" | "breath" | "mace" | "oneflow";

const MOSS = "#405044";
const CLAY = "#b48357";

type Props = {
  type: MovementPathType;
  className?: string;
  size?: number;
  tone?: "moss" | "clay";
};

/**
 * Decorative technical movement geometry. Purely presentational — aria-hidden
 * and pointer-events-none so it never interferes with reading or interaction.
 */
export default function MovementPath({ type, className = "", size = 220, tone = "moss" }: Props) {
  const reduce = useReducedMotion();
  const stroke = tone === "clay" ? CLAY : MOSS;

  const draw = (i: number, opacity = 0.5) =>
    reduce
      ? { initial: { pathLength: 1, opacity }, animate: { pathLength: 1, opacity } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 1.2, delay: 0.15 + i * 0.18, ease: EASE as unknown as number[] },
        };

  const common = {
    fill: "none",
    stroke,
    strokeLinecap: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none select-none max-w-full ${className}`}
    >
      {type === "yoga" && (
        <>
          <motion.path
            d="M30 150 C 55 70, 145 70, 170 150"
            {...common}
            strokeWidth={1.5}
            {...draw(0, 0.6)}
          />
          <motion.line x1="20" y1="160" x2="180" y2="160" {...common} strokeWidth={1} {...draw(1, 0.45)} />
          <motion.line x1="100" y1="86" x2="100" y2="160" {...common} strokeWidth={1} {...draw(2, 0.3)} />
          <motion.circle cx="100" cy="160" r="3.5" {...common} strokeWidth={1.2} {...draw(3, 0.7)} />
        </>
      )}

      {type === "breath" && (
        <>
          {[34, 56, 78].map((r, i) => (
            <motion.circle key={r} cx="100" cy="100" r={r} {...common} strokeWidth={1.2} {...draw(i, 0.6 - i * 0.12)} />
          ))}
          <motion.circle cx="100" cy="100" r="3" {...common} strokeWidth={1.2} {...draw(3, 0.7)} />
        </>
      )}

      {type === "mace" && (
        <>
          <motion.circle cx="100" cy="100" r="70" {...common} strokeWidth={1.4} {...draw(0, 0.55)} />
          <motion.line x1="100" y1="100" x2="100" y2="30" {...common} strokeWidth={1} {...draw(1, 0.35)} />
          <motion.g
            style={{ originX: "100px", originY: "100px" }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={reduce ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="100" cy="30" r="6" fill={stroke} opacity={0.5} />
          </motion.g>
          <motion.circle cx="100" cy="100" r="3" {...common} strokeWidth={1.2} {...draw(2, 0.6)} />
        </>
      )}

      {type === "oneflow" && (
        <>
          {[
            { cx: 62, cy: 62 },
            { cx: 138, cy: 62 },
            { cx: 62, cy: 138 },
            { cx: 138, cy: 138 },
          ].map((c, i) => (
            <motion.circle
              key={i}
              cx={c.cx}
              cy={c.cy}
              r="42"
              {...common}
              strokeWidth={1.2}
              initial={reduce ? { opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.45, cx: 100 - (100 - c.cx) * 0.32, cy: 100 - (100 - c.cy) * 0.32 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : i * 0.14, ease: EASE as unknown as number[] }}
            />
          ))}
          <motion.circle cx="100" cy="100" r="3.5" {...common} strokeWidth={1.4} {...draw(4, 0.7)} />
        </>
      )}
    </svg>
  );
}
