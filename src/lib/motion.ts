import type { Transition, Variants } from "framer-motion";

/** Restrained editorial easing — no bounce. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const transition = (duration = 0.9, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE as unknown as number[],
});

/** Scroll reveal: opacity + subtle translateY. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transition(0.9) },
};

export const revealStagger = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transition(0.9, i * 0.1) },
});

export const inViewOnce = { once: true, margin: "-80px" } as const;
