import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { weeklySchedule, matchesFilters, frequencyLimit, TIME_OPTIONS, FREQUENCY_OPTIONS, PROGRAM_OPTIONS, type DayClass, type SelectedClass } from "@/data/scheduleData";
import { createCashfreeOrder } from "@/lib/cashfree.functions";
import upiQr from "@/assets/upi-qr.jpg";

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

const PRICE = 1500;
const UPI_ID = "karamdeshwal@okhdfcbank";

function loadCashfree(): Promise<any> {
  return new Promise((resolve, reject) => {
    const w = window as any;
    if (w.Cashfree) return resolve(w.Cashfree);
    const s = document.createElement("script");
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    s.onload = () => resolve(w.Cashfree);
    s.onerror = reject;
    document.body.appendChild(s);
  });
}

function SchedulePage() {
  const [time, setTime] = useState("Both");
  const [freq, setFreq] = useState("3 Days a week");
  const [program, setProgram] = useState("All Programs");
  const [selectedClasses, setSelectedClasses] = useState<SelectedClass[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const days = useMemo(
    () =>
      weeklySchedule
        .map((d) => ({ ...d, classes: d.classes.filter((c) => matchesFilters(c, time, program)) }))
        .filter((d) => d.classes.length > 0),
    [time, program],
  );
  const isAdded = (id: string) => selectedClasses.some((c) => c.id === id);
  const distinctDays = new Set(selectedClasses.map((c) => c.day)).size;
  const limit = frequencyLimit(freq);
  const overLimit = distinctDays > limit;

  const toggle = (c: DayClass, day: string) =>
    setSelectedClasses((s) => (s.some((x) => x.id === c.id) ? s.filter((x) => x.id !== c.id) : [...s, { ...c, day }]));

  const handlePayment = async () => {
    if (overLimit) return toast.error(`Your pass covers ${limit} day${limit > 1 ? "s" : ""} a week`);
    if (form.phone.replace(/\D/g, "").length < 10) return toast.error("Enter a valid phone number");
    setIsProcessing(true);
    setFallback(false);
    try {
      const r = await createCashfreeOrder({
        data: { classIds: selectedClasses.map((c) => c.id), customer: form },
      });
      if (!r.ok) {
        setFallback(true);
        return;
      }
      const Cashfree = await loadCashfree();
      const cashfree = Cashfree({ mode: r.mode });
      await cashfree.checkout({
        paymentSessionId: r.sessionId,
        redirectTarget: document.getElementById("cashfree-embedded-container"),
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Payment could not start");
      setFallback(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const summary = selectedClasses.map((c) => `${c.name} (${c.day}, ${c.time})`).join("; ");
  const waMsg = encodeURIComponent(`Hi Kasratshala, I've paid for (${freq}): ${summary}. Name: ${form.name}`);

  return (
    <Layout>
      <section className="px-5 md:px-12 pt-10 md:pt-16 pb-32 max-w-6xl mx-auto">
        <p className="label-caps text-[var(--gold)] mb-4">Weekly batches</p>
        <h1 className="editorial-heading text-4xl md:text-6xl text-[var(--cream)] mb-4">The Schedule</h1>
        <p className="text-[var(--muted)] max-w-xl mb-10">
          Choose your pass, then pick your classes day by day.
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          <Select label="Time Preference" value={time} onChange={setTime} options={TIME_OPTIONS} />
          <Select label="Frequency Pass" value={freq} onChange={setFreq} options={FREQUENCY_OPTIONS} />
          <Select label="Program" value={program} onChange={setProgram} options={PROGRAM_OPTIONS} />
        </div>

        {overLimit && (
          <p role="alert" className="mb-8 rounded-2xl border border-[var(--clay)] bg-[var(--clay)]/10 px-5 py-3 text-sm text-[var(--cream)]">
            You've picked classes on {distinctDays} days, but the "{freq}" pass covers {limit} day{limit > 1 ? "s" : ""}. Remove some days or choose a bigger pass.
          </p>
        )}

        <div className="space-y-12 mt-10">
          {days.map((d) => (
            <div key={d.day}>
              <div className="flex items-center gap-5 mb-5">
                <h2 className="editorial-heading text-3xl md:text-5xl uppercase tracking-[0.08em] text-[var(--cream)] font-semibold">{d.day}</h2>
                <span className="h-px flex-1 bg-[var(--bone)]" />
              </div>
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {d.classes.map((c) => (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`rounded-[20px] border bg-[var(--cream)]/5 backdrop-blur-md p-5 md:px-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 transition-colors ${
                        isAdded(c.id) ? "border-[var(--gold)]" : "border-[var(--bone)]"
                      }`}
                    >
                      <div className="md:w-44 shrink-0">
                        <p className="label-caps text-[var(--muted)] mb-1">{c.timeSlot}</p>
                        <p className="text-[var(--gold)] font-semibold">{c.time}</p>
                      </div>
                      <div className="flex-1">
                        <h3 className="editorial-heading text-2xl text-[var(--cream)]">{c.name}</h3>
                        <p className="text-sm text-[var(--muted)] mt-1">{c.desc}</p>
                      </div>
                      <button
                        onClick={() => toggle(c, d.day)}
                        aria-pressed={isAdded(c.id)}
                        className={`shrink-0 rounded-full px-5 py-3 text-[11px] tracking-[0.24em] uppercase font-semibold transition-all ${
                          isAdded(c.id)
                            ? "bg-[var(--gold)] text-[var(--night)]"
                            : "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--night)]"
                        }`}
                      >
                        {isAdded(c.id) ? "Selected ✓" : "Select Class"}
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
        {days.length === 0 && <p className="text-[var(--muted)] text-center py-16">No classes match these filters.</p>}
      </section>

      <AnimatePresence>
        {selectedClasses.length > 0 && !isCheckoutOpen && (
          <motion.div
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full bg-[var(--night)]/90 backdrop-blur-xl border-t border-[var(--bone)] p-4 flex justify-between items-center gap-4 z-50"
          >
            <p className="text-[var(--cream)] text-sm">
              <span className="font-semibold">{selectedClasses.length}</span> class{selectedClasses.length > 1 ? "es" : ""} selected
              <span className="text-[var(--muted)]"> · ₹{(selectedClasses.length * PRICE).toLocaleString("en-IN")}</span>
            </p>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="rounded-full bg-[var(--gold)] px-6 py-3 text-[11px] tracking-[0.24em] uppercase font-semibold text-[var(--night)] hover:brightness-110"
            >
              Proceed to Checkout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="fixed inset-0 bg-[var(--night)]/60 z-[99]"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[var(--night)]/95 backdrop-blur-3xl border-l border-[var(--bone)] z-[100] p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <h2 className="editorial-heading text-2xl text-[var(--cream)]">Complete Registration</h2>
                <button onClick={() => setIsCheckoutOpen(false)} aria-label="Close" className="text-[var(--cream)] text-2xl">×</button>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-[var(--cream)]/85">
                {selectedClasses.map((c) => (
                  <li key={c.id} className="flex justify-between border-b border-[var(--bone)] pb-2">
                    <span>{c.name} · {c.day} {c.time}</span><span>₹{PRICE}</span>
                  </li>
                ))}
                <li className="flex justify-between font-semibold text-[var(--gold)] pt-1">
                  <span>Total</span><span>₹{(selectedClasses.length * PRICE).toLocaleString("en-IN")}</span>
                </li>
              </ul>
              <div className="mt-6 space-y-3">
                {(["name", "phone", "email"] as const).map((k) => (
                  <input
                    key={k}
                    value={form[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    placeholder={k === "name" ? "Full name" : k === "phone" ? "Phone (10 digits)" : "Email"}
                    className="w-full rounded-full border border-[var(--bone)] bg-[var(--cream)]/5 px-5 py-3 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]"
                  />
                ))}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full rounded-full bg-[var(--gold)] px-5 py-3 text-[11px] tracking-[0.24em] uppercase font-semibold text-[var(--night)] disabled:opacity-60"
                >
                  {isProcessing ? "Preparing secure checkout…" : "Pay Securely"}
                </button>
              </div>
              {isProcessing && (
                <div className="flex justify-center mt-6">
                  <div className="h-8 w-8 rounded-full border-2 border-[var(--gold)] border-t-transparent animate-spin" />
                </div>
              )}
              <div id="cashfree-embedded-container" className="w-full mt-6 rounded-xl overflow-hidden" />
              {fallback && (
                <div className="mt-6 rounded-2xl border border-[var(--bone)] p-5 text-center">
                  <p className="label-caps text-[var(--gold)] mb-3">Pay by UPI</p>
                  <img src={upiQr} alt="Kasratshala UPI QR code" className="mx-auto w-48 rounded-lg" />
                  <p className="text-[var(--cream)] text-sm mt-3">{UPI_ID}</p>
                  <a
                    href={`https://wa.me/${PHONE}?text=${waMsg}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-block mt-4 rounded-full border border-[var(--gold)] px-5 py-2 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)]"
                  >
                    Send payment screenshot
                  </a>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}
