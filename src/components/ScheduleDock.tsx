import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, X, ArrowRight, Phone, MessageCircle, Copy, Check, ArrowLeft } from "lucide-react";
import upiQr from "@/assets/upi-qr.jpg";

const PHONE_DISPLAY = "83079 29691";
const PHONE_RAW = "918307929691";
const UPI_ID = "karamdeshwal@okhdfcbank";
const WHATSAPP =
  `https://wa.me/${PHONE_RAW}?text=` +
  encodeURIComponent(
    "Hi Kasratshala, I'd like to join the October schedule at the Shala. Could you share the pricing and how to get started?",
  );

const slots = ["8:00 AM", "9:00 AM", "5:15 PM"] as const;

const schedule: { day: string; sessions: [string, string, string] }[] = [
  {
    day: "Monday",
    sessions: [
      "—",
      "Hatha Vinyasa + Surya Namaskar + Pranayama",
      "Lower Body Basics + Footwork + Jumps",
    ],
  },
  {
    day: "Tuesday",
    sessions: [
      "BOSU + Weck Method",
      "Steel Mace Flow by Leo Savage",
      "Breakthrough Method Kettlebell Training — Push & Pull",
    ],
  },
  { day: "Wednesday", sessions: ["—", "Isolation + Articulation", "RMTS"] },
  {
    day: "Thursday",
    sessions: [
      "Locomotion (Weck Method) + Pulses",
      "Warrior Vinyasa + Mobility + Pranayama",
      "OFF",
    ],
  },
  {
    day: "Friday",
    sessions: ["—", "Flyday — Hops, Jumps, Primals + Inversions", "Landmine University"],
  },
  {
    day: "Saturday",
    sessions: ["Kettlebells / Breakthrough + Maharashtra Sadhna", "—", "Martial Mace"],
  },
  { day: "Sunday", sessions: ["Bhakti Tisra + Kali Workshop", "—", "OFF"] },
];

const REGISTER_MAIL =
  "mailto:kasratshala@gmail.com?subject=October%20Shala%20Schedule%20%E2%80%94%20Registration&body=Hi%20Kasratshala%2C%0A%0AI%27d%20like%20to%20register%20for%20the%20October%20schedule%20at%20the%20Shala.%0A%0AName%3A%0APhone%3A%0ASessions%20I%27m%20interested%20in%3A%0A";

export default function ScheduleDock() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"schedule" | "register">("schedule");
  const [copied, setCopied] = useState(false);

  const close = () => {
    setOpen(false);
    setTimeout(() => setStep("schedule"), 400);
  };

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[110] bg-[var(--night)]/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 left-0 right-0 z-[120] flex justify-center px-4 pointer-events-none">
        <div className="w-full max-w-3xl pointer-events-auto">
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mb-3 overflow-hidden rounded-[28px] border border-[var(--bone)] bg-[var(--forest)]/95 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3 md:px-7 md:pt-7 border-b border-[var(--bone)]">
                  <div>
                    <p className="label-caps text-[var(--gold)]">October · At the Shala</p>
                    <h2 className="editorial-heading text-2xl md:text-3xl text-[var(--cream)] mt-1">
                      {step === "schedule" ? "Weekly Practice Schedule" : "Register & Pay"}
                    </h2>
                    <p className="text-xs md:text-sm text-[var(--muted)] mt-1">
                      {step === "schedule"
                        ? "Naggar, Himachal · drop-in or full month"
                        : "Three simple steps to hold your mat"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {step === "register" && (
                      <button
                        onClick={() => setStep("schedule")}
                        aria-label="Back to schedule"
                        className="text-[var(--muted)] hover:text-[var(--gold)] transition-colors p-1"
                      >
                        <ArrowLeft size={20} />
                      </button>
                    )}
                    <button
                      onClick={close}
                      aria-label="Close schedule"
                      className="text-[var(--muted)] hover:text-[var(--gold)] transition-colors p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {step === "register" ? (
                  <div className="max-h-[58svh] overflow-y-auto px-5 py-5 md:px-7 md:py-7">
                    <div className="grid md:grid-cols-2 gap-7 md:gap-9">
                      <div className="space-y-6">
                        <div>
                          <p className="label-caps text-[var(--gold)] mb-2">Step one · Ask</p>
                          <h3 className="editorial-heading text-xl text-[var(--cream)] mb-2">
                            Contact for pricing
                          </h3>
                          <p className="text-sm text-[var(--muted)] leading-relaxed">
                            Pricing depends on the sessions you choose — drop-in, weekly or
                            the full October month. Reach out and we&apos;ll tell you how to
                            join and what it costs.
                          </p>
                          <p className="editorial-heading text-2xl md:text-3xl text-[var(--cream)] mt-4">
                            {PHONE_DISPLAY}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-4">
                            <a
                              href={WHATSAPP}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-2.5 text-[11px] tracking-[0.24em] uppercase font-semibold text-[var(--night)] hover:brightness-110 transition-all"
                            >
                              <MessageCircle size={14} /> WhatsApp
                            </a>
                            <a
                              href={`tel:+${PHONE_RAW}`}
                              className="inline-flex items-center gap-2 rounded-full border border-[var(--bone)] px-5 py-2.5 text-[11px] tracking-[0.24em] uppercase font-semibold text-[var(--cream)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all"
                            >
                              <Phone size={14} /> Call
                            </a>
                          </div>
                        </div>

                        <div className="border-t border-[var(--bone)] pt-5">
                          <p className="label-caps text-[var(--gold)] mb-2">
                            Step three · Confirm
                          </p>
                          <p className="text-sm text-[var(--muted)] leading-relaxed">
                            Send the payment screenshot with your name and chosen slots on
                            WhatsApp. Your place is confirmed by reply.
                          </p>
                          <a
                            href={REGISTER_MAIL}
                            className="inline-flex items-center gap-2 mt-4 text-[11px] tracking-[0.24em] uppercase text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
                          >
                            Or email us <ArrowRight size={13} />
                          </a>
                        </div>
                      </div>

                      <div className="rounded-[22px] border border-[var(--bone)] bg-[var(--night)]/50 p-5 md:p-6 flex flex-col items-center text-center">
                        <p className="label-caps text-[var(--gold)] mb-1">Step two · Pay</p>
                        <p className="text-xs text-[var(--muted)] mb-4">
                          Scan with any UPI app
                        </p>
                        <div className="rounded-2xl overflow-hidden bg-[var(--cream)] p-2 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.9)]">
                          <img
                            src={upiQr}
                            alt="Kasratshala UPI payment QR code"
                            className="w-44 h-auto md:w-52"
                          />
                        </div>
                        <p className="label-caps text-[var(--muted)] mt-5">UPI ID</p>
                        <button
                          onClick={copyUpi}
                          className="mt-1 inline-flex items-center gap-2 text-sm text-[var(--cream)] hover:text-[var(--gold)] transition-colors break-all"
                        >
                          {UPI_ID}
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                        <a
                          href={`upi://pay?pa=${UPI_ID}&pn=Kasratshala&cu=INR`}
                          className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full border border-[var(--bone)] px-5 py-2.5 text-[11px] tracking-[0.24em] uppercase font-semibold text-[var(--cream)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all md:hidden"
                        >
                          Open UPI app
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                <div className="max-h-[58svh] overflow-y-auto px-5 py-4 md:px-7 md:py-6">
                  <div className="hidden md:grid grid-cols-[110px_repeat(3,1fr)] gap-3 pb-3 border-b border-[var(--bone)]">
                    <span className="label-caps text-[var(--muted)]">Day</span>
                    {slots.map((s) => (
                      <span key={s} className="label-caps text-[var(--gold)]">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="divide-y divide-[var(--bone)]">
                    {schedule.map((row, i) => (
                      <motion.div
                        key={row.day}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
                        className="py-4 md:grid md:grid-cols-[110px_repeat(3,1fr)] md:gap-3 md:items-start"
                      >
                        <span className="editorial-heading text-lg md:text-base text-[var(--cream)] block mb-2 md:mb-0">
                          {row.day}
                        </span>
                        {row.sessions.map((session, j) => (
                          <div key={j} className="flex gap-3 md:block py-1 md:py-0">
                            <span className="label-caps text-[var(--muted)] w-[68px] shrink-0 pt-[3px] md:hidden">
                              {slots[j]}
                            </span>
                            <span
                              className={`text-sm leading-relaxed ${
                                session === "—" || session === "OFF"
                                  ? "text-[var(--muted)]"
                                  : "text-[var(--cream)]"
                              }`}
                            >
                              {session}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-5 py-4 md:px-7 border-t border-[var(--bone)] bg-[var(--night)]/50">
                  <p className="text-xs text-[var(--muted)] flex-1">
                    Sessions run through October. Register to hold your spot — limited mats
                    per slot.
                  </p>
                  <a
                    href={REGISTER_MAIL}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-[11px] tracking-[0.28em] uppercase font-semibold text-[var(--night)] hover:brightness-110 transition-all"
                  >
                    Register
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center">
            <motion.button
              onClick={() => setOpen((v) => !v)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full border border-[var(--bone)] bg-[var(--forest)]/90 px-5 py-3 md:px-7 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]"
            >
              <CalendarDays size={18} className="text-[var(--gold)]" />
              <span className="label-caps text-[var(--cream)]">October Schedule</span>
              <span className="hidden sm:inline text-[10px] tracking-[0.22em] uppercase text-[var(--muted)]">
                {open ? "Close" : "Register"}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
