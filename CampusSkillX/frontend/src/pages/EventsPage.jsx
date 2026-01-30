import React, { useMemo, useState } from "react";
import EventsList from "../components/events/EventsList";
import CreateEvent from "../components/events/CreateEvent";

const hardcodedEvents = [
  {
    id: "1",
    title: "Technavya Tech Expo",
    category: "Tech",
    date: "2026-02-03",
    time: "10:00 AM",
    venue: "Central Ground / Expo Area",
    organizer: "Tech Council",
    eligibility: "All Students",
    description:
      "Campus-wide tech exhibition showcasing student projects, prototypes, and innovative demos.",
    tags: ["Expo", "Innovation", "Projects"],
  },
  {
    id: "2",
    title: "AI Battle Arena",
    category: "Tech",
    date: "2026-02-04",
    time: "12:00 PM",
    venue: "AI/ML Lab",
    organizer: "AI Club",
    eligibility: "Open to all branches",
    description:
      "Model-vs-model challenges: accuracy, creativity, and real-world problem solving.",
    tags: ["AI", "ML", "Competition"],
  },
  {
    id: "3",
    title: "WebX",
    category: "Hackathon",
    date: "2026-02-05",
    time: "09:00 AM",
    venue: "CSE Block • Innovation Hall",
    organizer: "Web Dev Community",
    eligibility: "Teams of 2–4",
    description:
      "Build a full-stack project with strong UI/UX + backend integration. Mentors + demo day.",
    tags: ["Fullstack", "UI/UX", "MERN"],
  },
  {
    id: "4",
    title: "Mechathon",
    category: "Hackathon",
    date: "2026-02-06",
    time: "10:00 AM",
    venue: "Mechanical Workshop",
    organizer: "Mechanical Society",
    eligibility: "All Students",
    description:
      "Design-build-solve mechanical challenges with rapid prototyping and testing.",
    tags: ["Design", "Prototype", "CAD"],
  },
  {
    id: "5",
    title: "Line Tracing Robowar",
    category: "Robotics",
    date: "2026-02-07",
    time: "11:30 AM",
    venue: "Electronics Lab Arena",
    organizer: "Robotics Club",
    eligibility: "Robotics teams",
    description:
      "Race challenge: build a bot that follows the track with speed + precision.",
    tags: ["Robotics", "Arduino", "Race"],
  },
  {
    id: "6",
    title: "RoboWar",
    category: "Robotics",
    date: "2026-02-07",
    time: "03:00 PM",
    venue: "Main Arena (Ground Stage)",
    organizer: "Robotics Club",
    eligibility: "Registered teams only",
    description:
      "Battle-ready bots compete in knockouts — power, control, and strategy.",
    tags: ["Bots", "Arena", "Battle"],
  },
  {
    id: "7",
    title: "Treasure Hunt",
    category: "Fun",
    date: "2026-02-08",
    time: "02:00 PM",
    venue: "Campus Wide",
    organizer: "Student Council",
    eligibility: "Teams of 3–5",
    description:
      "Clues, puzzles and coordination across campus. Fastest team wins!",
    tags: ["Puzzle", "Team", "Adventure"],
  },
];

const categories = ["All", "Tech", "Hackathon", "Robotics", "Fun"];

export default function EventsPage() {
  const [events, setEvents] = useState(hardcodedEvents);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return events
      .filter((e) => (category === "All" ? true : e.category === category))
      .filter((e) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          (e.tags || []).join(" ").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, category, query]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs text-slate-400">CampusSkillX • Events</p>
            <h1 className="text-3xl font-semibold">College Events</h1>
            <p className="mt-1 text-sm text-slate-300">
              Browse upcoming & past events and view details.
            </p>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm transition ${
                  category === c
                    ? "bg-white/15 border border-white/10"
                    : "hover:bg-white/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mt-5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, venue, organizer, tags..."
            className="w-full md:max-w-xl rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-white/20"
          />
        </div>

        {/* Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <EventsList events={filtered} onOpen={setSelected} />
            {filtered.length === 0 && (
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
                No events found.
              </div>
            )}
          </div>

          {/* Optional: Add event (demo UI only) */}
          <div className="lg:col-span-1">
            <CreateEvent onAdd={(ev) => setEvents((p) => [ev, ...p])} />
          </div>
        </div>
      </div>

      {/* Details modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 p-4 flex items-end sm:items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">{selected.title}</h2>
                <p className="mt-1 text-slate-300 text-sm">
                  {selected.date} {selected.time ? `• ${selected.time}` : ""} •{" "}
                  {selected.venue}
                </p>
                <p className="mt-1 text-slate-300 text-sm">
                  Organizer: {selected.organizer} • Eligibility:{" "}
                  {selected.eligibility}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-300">{selected.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(selected.tags || []).map((t) => (
                <span
                  key={t}
                  className="text-xs rounded-full border border-white/10 bg-white/5 px-2.5 py-1"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <button className="w-full rounded-2xl bg-indigo-500/80 px-4 py-3 text-sm font-semibold hover:bg-indigo-500">
                Register (UI only)
              </button>
              <p className="mt-2 text-xs text-slate-400 text-center">
                Demo-only registration (no backend).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
