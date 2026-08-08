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
    <div className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-40">
      <div className="relative flex flex-col items-start gap-8">
        <div className="absolute left-[5px] top-0 bottom-0 w-px bg-[var(--cream)]/10" />
        <div
          className="absolute left-[5px] top-0 w-px"
          style={{
            height: `${progress * 100}%`,
            background: "linear-gradient(180deg, var(--gold), var(--teal))",
          }}
        />
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full border transition-all ${
                active === s.id ? "scale-125" : ""
              }`}
              style={{
                borderColor: active === s.id ? "var(--teal)" : "var(--stone)",
                background: active === s.id ? "var(--teal)" : "transparent",
              }}
            />
            <span
              className="text-[10px] tracking-[0.2em] uppercase opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-90 group-hover:translate-x-0 whitespace-nowrap"
              style={{ color: active === s.id ? "var(--teal)" : "var(--muted)" }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
