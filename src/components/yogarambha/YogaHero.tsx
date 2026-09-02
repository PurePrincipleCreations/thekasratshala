import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";

const HeroBackground = lazy(() => import("./HeroBackground"));

const headline = [
  "WHY CHOOSE YOGARAMBHA",
  "ACADEMY FOR",
  "YOUR STUDIES?",
];

export default function YogaHero() {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".yg-line-inner", {
        yPercent: 118,
        rotate: 2,
        duration: 1.1,
        stagger: 0.14,
        delay: 0.25,
      })
        .from(".yg-sub", { y: 18, opacity: 0, duration: 0.9 }, "-=0.45")
        .from(".yg-cta", { y: 14, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.55")
        .from(card.current, { y: 40, opacity: 0, duration: 1 }, "-=0.6");

      gsap.to(card.current, {
        y: -14,
        duration: 4.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.4,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex h-[100svh] min-h-[620px] w-full items-center justify-center overflow-hidden bg-[#FAFAFA]"
    >
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroBackground />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/70" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        <p className="yg-sub mb-6 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#f97316]">
          Movement · Yoga · Pranayama
        </p>

        <h1 className="font-sans text-[8.4vw] font-semibold leading-[1.02] tracking-[-0.035em] text-slate-900 sm:text-[6vw] lg:text-[3.6rem]">
          {headline.map((line) => (
            <span key={line} className="block overflow-hidden py-[0.06em]">
              <span className="yg-line-inner block">{line}</span>
            </span>
          ))}
        </h1>

        <p className="yg-sub mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-slate-600 md:text-[17px]">
          After years of research and exploration into the world of movement arts, yoga,
          pranayama, teaching and philosophy, we were able to create the best way to learn
          this wonderful, ancient art.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button className="yg-cta rounded-full bg-slate-900 px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_22px_48px_-22px_rgba(15,23,42,0.75)] transition-transform hover:scale-[1.03]">
            Explore Programs
          </button>
          <button className="yg-cta rounded-full border border-white/70 bg-white/60 px-7 py-3.5 text-[14px] font-semibold text-slate-800 backdrop-blur-md transition-colors hover:bg-white/85">
            Book a Retreat
          </button>
        </div>
      </div>

      <div
        ref={card}
        className="absolute bottom-8 right-4 z-10 w-[min(360px,calc(100%-2rem))] rounded-[2rem] border border-white/70 bg-white/45 p-6 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.4)] backdrop-blur-lg md:bottom-12 md:right-10"
      >
        <p className="text-[14px] leading-relaxed text-slate-700 md:text-[15px]">
          &ldquo;Where is the delusion when truth is known? Where is the disease when the
          mind is clear? Where is death when the Breath is controlled? Therefore surrender
          to Yoga.&rdquo;
        </p>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
          T. Krishnamacharya
        </p>
      </div>
    </section>
  );
}
