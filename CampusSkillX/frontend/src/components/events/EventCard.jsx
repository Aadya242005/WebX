import React from "react";

export default function EventCard({ event, onOpen }) {
  const dateText = new Date(event.date).toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const isPast = new Date(event.date) < new Date();

  return (
    <button
      onClick={() => onOpen?.(event)}
      className="text-left rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5">
          {event.category}
        </span>
        <span
          className={`text-xs px-2.5 py-1 rounded-full border ${
            isPast
              ? "border-rose-500/20 bg-rose-500/10 text-rose-200"
              : "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
          }`}
        >
          {isPast ? "Past" : "Upcoming"}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold">{event.title}</h3>
      <p className="mt-1 text-sm text-slate-300">
        {dateText} {event.time ? `• ${event.time}` : ""}
      </p>
      <p className="mt-1 text-sm text-slate-300">{event.venue}</p>

      <p className="mt-3 text-sm text-slate-300 line-clamp-2">
        {event.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(event.tags || []).slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-xs rounded-full border border-white/10 bg-white/5 px-2.5 py-1"
          >
            #{t}
          </span>
        ))}
      </div>
    </button>
  );
}
