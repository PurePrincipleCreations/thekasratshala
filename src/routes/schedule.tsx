import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { mockSchedule, filterSchedule } from "@/data/scheduleData";

const URL = "https://thekasratshala.lovable.app/schedule";
const TITLE = "Class Schedule — Kasratshala Dojo";
const DESC =
  "Weekly Kasratshala batches: Kinetic Conditioning, Steel Mace Flow, Yoga Kali and Sunday workshops. Filter by time, days and class and book a batch.";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: SchedulePage,
});

const PHONE = "918307929691";

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2 flex-1 min-w-[180px]">
      <span className="label-caps text-[var(--gold)]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-[var(--bone)] bg-[var(--cream)]/5 backdrop-blur-md px-5 py-3 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[var(--night)]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function SchedulePage() {
  const [time, setTime] = useState("All");
  const [days, setDays] = useState("All");
  const [cls, setCls] = useState("All");
  const classOptions = ["All", ...Array.from(new Set(mockSchedule.map((c) => c.type)))];
  const list = useMemo(() => filterSchedule(mockSchedule, { time, days, cls }), [time, days, cls]);

  const book = (type: string, d: string, t: string) => {
    const msg = encodeURIComponent(`Hi Kasratshala, I'd like to book the ${type} batch (${d}, ${t}).`);
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank", "noopener");
    toast.success("Opening WhatsApp to confirm your batch");
  };

  return (
    <Layout>
      <section className="px-5 md:px-12 pt-10 md:pt-16 pb-20 max-w-6xl mx-auto">
        <p className="label-caps text-[var(--gold)] mb-4">Weekly batches</p>
        <h1 className="editorial-heading text-4xl md:text-6xl text-[var(--cream)] mb-4">The Schedule</h1>
        <p className="text-[var(--muted)] max-w-xl mb-10">
          Find the batch that fits your week. Filter, pick a slot, and book it with us directly.
        </p>

        <div className="flex flex-wrap gap-4 mb-10">
          <Select label="Time" value={time} onChange={setTime} options={["All", "Morning", "Evening"]} />
          <Select label="Days" value={days} onChange={setDays} options={["All", "Mon/Wed/Fri", "Tue/Thu/Sat", "Sunday"]} />
          <Select label="Class" value={cls} onChange={setCls} options={classOptions} />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <motion.article
                key={c.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="rounded-[24px] border border-[var(--bone)] bg-[var(--cream)]/5 backdrop-blur-md p-6 md:p-7 flex flex-col gap-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="label-caps text-[var(--muted)] mb-2">{c.timeSlot}</p>
                    <h2 className="editorial-heading text-2xl text-[var(--cream)]">{c.type}</h2>
                  </div>
                  <span
                    className={`label-caps rounded-full px-3 py-1 border ${
                      c.status === "Open"
                        ? "border-[var(--gold)] text-[var(--gold)]"
                        : "border-[var(--bone)] text-[var(--muted)]"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="flex gap-8 text-[var(--cream)]">
                  <div>
                    <p className="label-caps text-[var(--muted)] mb-1">Days</p>
                    <p>{c.days}</p>
                  </div>
                  <div>
                    <p className="label-caps text-[var(--muted)] mb-1">Time</p>
                    <p>{c.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => book(c.type, c.days, c.time)}
                  className="mt-auto rounded-full bg-[var(--gold)] px-5 py-3 text-[11px] tracking-[0.24em] uppercase font-semibold text-[var(--night)] hover:brightness-110 transition-all"
                >
                  {c.status === "Waitlist" ? "Join Waitlist" : "Book Batch"}
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
        {list.length === 0 && (
          <p className="text-[var(--muted)] text-center py-16">No batches match these filters.</p>
        )}
      </section>
    </Layout>
  );
}
