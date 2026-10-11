export type DayClass = {
  id: string;
  timeSlot: "Morning" | "Evening";
  time: string;
  name: string;
  desc: string;
};
export type ScheduleDay = { day: string; classes: DayClass[] };
export type SelectedClass = DayClass & { day: string };

// Day-wise weekly schedule — swap for a database query later; the UI consumes this exact shape.
export const weeklySchedule: ScheduleDay[] = [
  {
    day: "Monday",
    classes: [
      { id: "m1", timeSlot: "Morning", time: "08:00 AM", name: "Grounding", desc: "Foot-2-Core and Ankle Resilience for athletic foundation. Great for trekking, running, sports." },
      { id: "m2", timeSlot: "Morning", time: "09:00 AM", name: "Vinyasa", desc: "The harmony between Breath, Movement and Flow!!" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { id: "t1", timeSlot: "Morning", time: "08:00 AM", name: "Demo Class", desc: "Will Be Updated" },
      { id: "t2", timeSlot: "Evening", time: "05:15 PM", name: "Demo Class", desc: "Will Be Updated" },
    ],
  },
  {
    day: "Wednesday",
    classes: [{ id: "w1", timeSlot: "Morning", time: "09:00 AM", name: "Vinyasa", desc: "The harmony between Breath, Movement and Flow!!" }],
  },
  {
    day: "Thursday",
    classes: [
      { id: "th1", timeSlot: "Morning", time: "08:00 AM - 10:00 AM", name: "Vinyasa", desc: "The harmony between Breath, Movement and Flow!!" },
      { id: "th2", timeSlot: "Evening", time: "05:15 PM", name: "Kali-PTK", desc: "Combat mechanics and coordination." },
    ],
  },
  {
    day: "Friday",
    classes: [
      { id: "f1", timeSlot: "Morning", time: "09:00 AM", name: "Friday+Flyday", desc: "Vinyasa Armplay" },
      { id: "f2", timeSlot: "Evening", time: "Evening", name: "Breakthrough", desc: "Turkish Getup mechanics" },
    ],
  },
  {
    day: "Saturday",
    classes: [{ id: "s1", timeSlot: "Evening", time: "05:15 PM", name: "Breakthrough", desc: "4-1 based Strength & Conditioning focussed workouts" }],
  },
];

export const TIME_OPTIONS = ["Both", "Morning Only", "Evening Only"];
export const FREQUENCY_OPTIONS = ["Any 1 Day a week", "3 Days a week", "All Days"];
export const PROGRAM_OPTIONS = ["All Programs", "Vinyasa", "Breakthrough", "Kali-PTK", "Grounding"];

export function frequencyLimit(f: string): number {
  if (f.startsWith("Any 1")) return 1;
  if (f.startsWith("3")) return 3;
  return Infinity;
}

export function matchesFilters(c: DayClass, time: string, program: string) {
  const t = time === "Both" || (time === "Morning Only" ? c.timeSlot === "Morning" : c.timeSlot === "Evening");
  const p = program === "All Programs" || c.name === program;
  return t && p;
}
