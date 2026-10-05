import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import LiveTimetable, { useNowMinutes } from "@/components/live/LiveTimetable";
import { bundles, liveBatches, toMin } from "@/data/coursesData";
import { cartAtom, isCartOpenAtom } from "@/lib/store";

export const Route = createFileRoute("/programs")({
  component: Programs,
  head: () => ({
    meta: [
      { title: "Programs — Online, Live & Offline | Kasratshala" },
      { name: "description", content: "Recorded online bundles, daily live-stream batches and in-person immersions at the Naggar Dojo." },
      { property: "og:title", content: "Programs — Online, Live & Offline | Kasratshala" },
      { property: "og:description", content: "Recorded online bundles, daily live-stream batches and in-person immersions at the Naggar Dojo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://thekasratshala.lovable.app/programs" }],
  }),
});

const TABS = [
  { id: "online", label: "Online Bundles" },
  { id: "live", label: "Live Batches" },
  { id: "offline", label: "Offline Gatherings" },
] as const;

function Programs() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("online");
  return (
    <Layout>
      <section className="pt-28 md:pt-36 pb-10 px-6">
        <div className="section-inner space-y-8">
          <div className="space-y-3">
            <p className="label-caps text-[var(--gold)]">Three ways to practise</p>
            <h1 className="editorial-heading text-5xl md:text-7xl text-[var(--cream)]">Programs.</h1>
          </div>
          <div className="inline-flex flex-wrap gap-1 rounded-full border border-[var(--bone)] bg-[var(--alt)] p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-5 py-2.5 label-caps transition-all ${
                  tab === t.id ? "bg-[var(--gold)] text-[var(--night)]" : "text-[var(--muted)] hover:text-[var(--cream)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="section-inner">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              {tab === "online" && <OnlineBundles />}
              {tab === "live" && <LiveBatches />}
              {tab === "offline" && <Offline />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}

function OnlineBundles() {
  const [cart, setCart] = useAtom(cartAtom);
  const [, setOpen] = useAtom(isCartOpenAtom);
  const add = (id: string, name: string, price: number) => {
    if (!cart.find((c) => c.id === id)) {
      setCart([...cart, { id, name, price }]);
      toast.success(`${name} added`);
    }
    setOpen(true);
  };
  return (
    <div className="space-y-8">
      <span className="inline-block rounded-full border border-[var(--gold)] px-4 py-1.5 label-caps text-[var(--gold)]">Recorded curriculum • Self-paced</span>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(bundles ?? []).map((b) => (
          <article key={b.slug} className="rounded-[22px] border border-[var(--bone)] bg-[var(--alt)] overflow-hidden flex flex-col">
            <div className="relative aspect-video bg-[var(--night)] flex items-center justify-center">
              <Play className="text-[var(--gold)] opacity-60" size={36} />
              <span className="absolute bottom-3 left-3 rounded-full bg-[var(--night)]/80 px-3 py-1 text-[11px] text-[var(--cream)]">{b.runtime}</span>
            </div>
            <div className="p-6 space-y-5 flex-1 flex flex-col">
              <h3 className="editorial-heading text-2xl text-[var(--cream)]">{b?.title}</h3>
              <ul className="space-y-2">
                {(b?.lessons ?? []).slice(0, 3).map((l) => (
                  <li key={l.title} className="flex items-center gap-3 text-sm text-[var(--muted)]">
                    <Play size={11} className="text-[var(--gold)]" /> {l.title}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4 border-t border-[var(--bone)] space-y-4">
                <p className="editorial-heading text-2xl text-[var(--gold)]">₹{b.price.toLocaleString("en-IN")}</p>
                <div className="flex gap-3">
                  <Link to="/learn/$slug" params={{ slug: b.slug }} className="flex-1 text-center rounded-full bg-[var(--gold)] px-4 py-2.5 label-caps text-[var(--night)]">Explore Curriculum</Link>
                  <button onClick={() => add(b.slug, b.title, b.price)} className="rounded-full border border-[var(--bone)] px-4 py-2.5 label-caps text-[var(--cream)] hover:border-[var(--gold)]">Add Bundle</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function LiveBatches() {
  const now = useNowMinutes();
  const nowMin = now ? now.getHours() * 60 + now.getMinutes() : -1;
  return (
    <div className="space-y-10">
      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)] px-4 py-1.5 label-caps text-[var(--gold)]">
        <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse" /> Live interactive • Daily practice
      </span>
      <div className="grid md:grid-cols-3 gap-6">
        {(liveBatches ?? []).map((b) => {
          const liveT = (b?.times ?? []).find((t) => nowMin >= toMin(t.start) && nowMin < toMin(t.start) + b.durationMin);
          return (
            <article key={b.id} className={`rounded-[22px] border p-6 space-y-5 bg-[var(--alt)] ${liveT ? "border-[var(--gold)]" : "border-[var(--bone)]"}`}>
              <div className="flex justify-between items-center">
                <span className="rounded-full bg-[var(--night)] px-3 py-1 text-[11px] text-[var(--cream)]">{b.scope}</span>
                {liveT && <span className="label-caps text-[var(--gold)] flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse" />Live now</span>}
              </div>
              <div>
                <h3 className="editorial-heading text-2xl text-[var(--cream)]">{b.title}</h3>
                <p className="text-sm italic text-[var(--muted)]">{b.instructor}</p>
              </div>
              {liveT && <p className="text-xs text-[var(--gold)]">Started {liveT.start} • {nowMin - toMin(liveT.start)} of {b.durationMin} min</p>}
              <div className="flex flex-wrap gap-2">
                {(b.times ?? []).map((t) => (
                  <span key={t.start} className="rounded-full border border-[var(--bone)] px-3 py-1.5 text-xs text-[var(--cream)]">{t.label}: {t.start} IST</span>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => toast("The live room opens 10 minutes before class.")} className="rounded-full bg-[var(--gold)] px-4 py-2.5 label-caps text-[var(--night)]">Join Live Room</button>
                <a href="#timetable" className="rounded-full border border-[var(--bone)] px-4 py-2.5 label-caps text-[var(--cream)]">View Schedule</a>
              </div>
            </article>
          );
        })}
      </div>
      <div id="timetable" className="space-y-4">
        <h2 className="editorial-heading text-3xl text-[var(--cream)]">This week</h2>
        <LiveTimetable />
      </div>
    </div>
  );
}

function Offline() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", background: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes("@")) return toast.error("Please add your name and a valid email.");
    toast.success("Thank you — we'll write to you with the next dates.");
    setOpen(false);
    setForm({ name: "", email: "", phone: "", background: "" });
  };
  return (
    <div className="rounded-[28px] bg-[#2A1D1A] border border-[var(--gold)]/20 p-8 md:p-14 space-y-8">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-[var(--gold)] px-4 py-1.5 label-caps text-[var(--gold)]">Gathering • Open to all</span>
        <span className="rounded-full border border-[var(--gold)]/50 px-4 py-1.5 label-caps text-[var(--gold)]">Residential immersion • Naggar, Kullu</span>
      </div>
      <h2 className="editorial-heading text-4xl md:text-6xl text-[var(--cream)]">One Flow &amp; The Kasrat Camp</h2>
      <p className="max-w-2xl text-lg italic text-[var(--muted)]">One day. One field. A shared practice. Residential immersions run in Naggar. Intensive physical conditioning, mace mechanics, and pranayama.</p>
      <p className="text-sm text-[var(--cream)]">Next date on enquiry • Naggar dojo, in person • 26 interested</p>
      <button onClick={() => setOpen(true)} className="rounded-full bg-[var(--gold)] px-7 py-3.5 label-caps text-[var(--night)] hover:brightness-110">I&apos;m Interested / Enquire Dates</button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[80] bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.form
              onSubmit={submit}
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.35 }}
              className="fixed right-0 top-0 z-[81] h-full w-full max-w-md bg-[var(--night)] border-l border-[var(--bone)] p-8 space-y-5 overflow-y-auto"
            >
              <div className="flex justify-between items-center">
                <p className="label-caps text-[var(--gold)]">Offline enquiry</p>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close"><X className="text-[var(--cream)]" /></button>
              </div>
              {(["name", "email", "phone"] as const).map((k) => (
                <input key={k} value={form[k]} maxLength={120} onChange={(e) => setForm({ ...form, [k]: e.target.value })} placeholder={k[0].toUpperCase() + k.slice(1)}
                  className="w-full rounded-xl bg-[var(--alt)] border border-[var(--bone)] px-4 py-3 text-[var(--cream)] outline-none focus:border-[var(--gold)]" />
              ))}
              <textarea value={form.background} maxLength={1000} onChange={(e) => setForm({ ...form, background: e.target.value })} rows={4} placeholder="Movement background"
                className="w-full rounded-xl bg-[var(--alt)] border border-[var(--bone)] px-4 py-3 text-[var(--cream)] outline-none focus:border-[var(--gold)]" />
              <button className="w-full rounded-full bg-[var(--gold)] py-3 label-caps text-[var(--night)]">Send enquiry</button>
            </motion.form>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
