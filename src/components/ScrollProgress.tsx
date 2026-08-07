import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "descent", label: "The Field" },
  { id: "about", label: "The Dojo" },
  { id: "courses", label: "Courses" },
  { id: "camps", label: "Camps" },
  { id: "gathering", label: "One Flow" },
  { id: "gallery", label: "Practice" },
  { id: "contact", label: "Connect" },
];


export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
      let cur = "hero";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < 300) cur = s.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
      <div className="relative flex flex-col items-start gap-8">
        <div className="absolute left-[5px] top-0 bottom-0 w-px bg-[var(--cream)]/10" />
        <div
          className="absolute left-[5px] top-0 w-px"
          style={{
            height: `${progress * 100}%`,
            background: "linear-gradient(180deg, var(--gold), var(--teal-glow))",
            boxShadow: "0 0 8px var(--teal-glow)",
          }}
        />
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3"
          >
            <span
              className={`w-3 h-3 rounded-full border transition-all ${
                active === s.id ? "scale-125" : ""
              }`}
              style={{
                borderColor: active === s.id ? "var(--teal-glow)" : "var(--stone)",
                background: active === s.id ? "var(--teal-glow)" : "transparent",
                boxShadow: active === s.id ? "0 0 8px var(--teal-glow)" : "none",
              }}
            />
            <span
              className={`text-xs tracking-[0.2em] uppercase transition-opacity ${
                active === s.id ? "opacity-100" : "opacity-40 group-hover:opacity-80"
              }`}
              style={{ color: active === s.id ? "#6AD0D8" : "var(--muted)" }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
