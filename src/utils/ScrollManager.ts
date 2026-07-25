type Listener = (state: { scrollY: number; velocity: number; direction: number }) => void;

class ScrollManager {
  scrollY = 0;
  scrollVelocity = 0;
  scrollDirection = 0;
  private lastY = 0;
  private raf: number | null = null;
  private listeners = new Set<Listener>();
  private running = false;

  init() {
    if (typeof window === "undefined" || this.running) return;
    this.running = true;
    this.lastY = window.scrollY;
    this.scrollY = window.scrollY;
    const loop = () => {
      const y = window.scrollY;
      const dy = y - this.lastY;
      this.scrollVelocity = Math.max(-20, Math.min(20, dy));
      this.scrollDirection = dy > 0.1 ? 1 : dy < -0.1 ? -1 : 0;
      this.scrollY = y;
      this.lastY = y;
      this.listeners.forEach((fn) =>
        fn({ scrollY: this.scrollY, velocity: this.scrollVelocity, direction: this.scrollDirection })
      );
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }
  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
    this.running = false;
    this.listeners.clear();
  }
  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}

const manager = new ScrollManager();
export const initScrollManager = () => manager.init();
export const destroyScrollManager = () => manager.destroy();
export const subscribeToScroll = (fn: Listener) => manager.subscribe(fn);

import { useEffect, useState } from "react";
export function useScrollState() {
  const [state, setState] = useState({ scrollY: 0, velocity: 0, direction: 0 });
  useEffect(() => {
    manager.init();
    const un = manager.subscribe(setState);
    return () => { un(); };
  }, []);
  return state;
}
