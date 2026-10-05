// Defensive mock data: every item ships with guaranteed arrays so renders never crash.
export type Lesson = { title: string; duration: string; status?: "done" | "progress" | "todo" };
export type Chapter = { t: number; label: string };

export type Bundle = {
  slug: string;
  title: string;
  runtime: string;
  price: number;
  image?: string;
  tags: string[];
  modules: string[];
  lessons: Lesson[];
  chapters: Chapter[];
};

export type LiveBatch = {
  id: string;
  title: string;
  instructor: string;
  scope: string;
  times: { label: string; start: string }[];
  durationMin: number;
  tags: string[];
};

const safe = <T extends object>(o: Partial<T> & Record<string, unknown>) =>
  ({ tags: [], modules: [], lessons: [], chapters: [], ...o }) as unknown as T;

export const bandhaChapters: Chapter[] = [
  { t: 0, label: "What this session covers" },
  { t: 260, label: "A bandha is a balance, not a squeeze" },
  { t: 830, label: "Pressure behaves hydraulically" },
  { t: 1410, label: "Mula bandha: the base" },
  { t: 2055, label: "Uddiyana bandha: the middle" },
  { t: 2680, label: "Jalandhara bandha and breath retention" },
  { t: 3250, label: "Common mistakes and cautions" },
  { t: 3630, label: "Questions from the batch" },
];

export const bundles: Bundle[] = [
  safe<Bundle>({
    slug: "pranayama-foundations",
    title: "Pranayama & The Bandhas",
    runtime: "12 Hours • 8 Deep Lectures",
    price: 25000,
    tags: ["Pranayama", "Breath"],
    chapters: bandhaChapters,
    lessons: [
      { title: "Breath as capacity", duration: "58m", status: "done" },
      { title: "The diaphragm, re-learned", duration: "1h 02m", status: "done" },
      { title: "Nadi shodhana in depth", duration: "54m", status: "done" },
      { title: "The bandhas: locks as a system", duration: "1h 07m", status: "progress" },
      { title: "Kumbhaka: retention safely", duration: "49m", status: "todo" },
      { title: "Kapalabhati & bhastrika", duration: "52m", status: "todo" },
      { title: "Breath under load", duration: "1h 05m", status: "todo" },
      { title: "Building a daily practice", duration: "44m", status: "todo" },
    ],
  }),
  safe<Bundle>({
    slug: "recode-movement",
    title: "RECODE — Foundational Movement",
    runtime: "9 Hours • 6 Deep Lectures",
    price: 18000,
    tags: ["Mobility", "Foundations"],
    chapters: bandhaChapters,
    lessons: [
      { title: "Reading your current state", duration: "48m", status: "done" },
      { title: "Squat, hinge, rotate", duration: "1h 10m", status: "progress" },
      { title: "Joint capacity drills", duration: "55m", status: "todo" },
      { title: "Ground to standing", duration: "52m", status: "todo" },
      { title: "Loaded carries", duration: "47m", status: "todo" },
      { title: "Your recoded week", duration: "38m", status: "todo" },
    ],
  }),
  safe<Bundle>({
    slug: "steel-mace-flow",
    title: "Steel Mace Flow — Online",
    runtime: "10 Hours • 7 Deep Lectures",
    price: 30000,
    tags: ["Mace Fundamentals", "Strength"],
    chapters: bandhaChapters,
    lessons: [
      { title: "Grip, stance and safety", duration: "1h 00m", status: "todo" },
      { title: "Swing paths", duration: "58m", status: "todo" },
      { title: "Rotational loading", duration: "1h 04m", status: "todo" },
      { title: "Transitions & sequencing", duration: "55m", status: "todo" },
    ],
  }),
];

export const liveBatches: LiveBatch[] = [
  safe<LiveBatch>({
    id: "strength",
    title: "Daily Strength & Mobility",
    instructor: "with Veer",
    scope: "Strength",
    times: [{ label: "Morning Batch", start: "07:00" }, { label: "Evening Batch", start: "17:30" }],
    durationMin: 60,
  }),
  safe<LiveBatch>({
    id: "pranayama",
    title: "Pranayama Live Stream",
    instructor: "with Veer",
    scope: "Pranayama",
    times: [{ label: "Evening Batch", start: "19:30" }],
    durationMin: 45,
  }),
  safe<LiveBatch>({
    id: "mace",
    title: "Mace Fundamentals Live",
    instructor: "with Claire Rana",
    scope: "Mace Fundamentals",
    times: [{ label: "Morning Batch", start: "08:00" }],
    durationMin: 60,
  }),
];

export const getBundle = (slug?: string) => bundles.find((b) => b?.slug === slug);

export const toMin = (hhmm: string) => {
  const [h, m] = (hhmm ?? "0:0").split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

export const fmtTime = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  const mm = h ? String(m).padStart(2, "0") : String(m);
  return `${h ? h + ":" : ""}${mm}:${String(sec).padStart(2, "0")}`;
};
