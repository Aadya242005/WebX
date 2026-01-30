import React, { useEffect, useState } from "react";
import { fetchEventById, registerEvent } from "../api/eventsApi";

export default function EventDetails({ eventId, onClose, isAdmin }) {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetchEventById(eventId);
        setEvent(res.data.event);
        setAlreadyRegistered(Boolean(res.data.alreadyRegistered));
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load event");
      } finally {
        setLoading(false);
      }
    })();
  }, [eventId]);

  const onRegister = async () => {
    try {
      setRegistering(true);
      await registerEvent(eventId);
      setAlreadyRegistered(true);
    } catch (e) {
      setError(e?.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/60 p-4 flex items-center justify-center">
        <div className="rounded-3xl border border-white/10 bg-slate-950 p-6 w-full max-w-xl">
          Loading...
        </div>
      </div>
    );
  }

  if (!event) return null;

  const dateText = new Date(event.date).toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="fixed inset-0 bg-black/60 p-4 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">{event.title}</h2>
            <p className="mt-1 text-slate-300">
              {dateText} {event.time ? `• ${event.time}` : ""} • {event.venue}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <p className="mt-4 text-sm text-slate-300">{event.description}</p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-slate-400">Organizer</p>
            <p className="font-medium">{event.organizer}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-slate-400">Eligibility</p>
            <p className="font-medium">{event.eligibility}</p>
          </div>
        </div>

        {!isAdmin && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={onRegister}
              disabled={alreadyRegistered || registering}
              className={`flex-1 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                alreadyRegistered
                  ? "bg-white/5 text-slate-400 border border-white/10 cursor-not-allowed"
                  : "bg-indigo-500/80 hover:bg-indigo-500"
              }`}
            >
              {alreadyRegistered ? "Already Registered" : registering ? "Registering..." : "Register"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
