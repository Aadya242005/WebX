import React, { useState } from "react";

export default function CreateEvent({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    category: "Tech",
    date: "",
    time: "",
    venue: "",
    organizer: "",
    eligibility: "All Students",
    description: "",
    tags: "",
  });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.venue || !form.description) return;

    const newEvent = {
      id: crypto.randomUUID(),
      title: form.title,
      category: form.category,
      date: form.date,
      time: form.time,
      venue: form.venue,
      organizer: form.organizer || "Campus Committee",
      eligibility: form.eligibility,
      description: form.description,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    onAdd?.(newEvent);

    setForm({
      title: "",
      category: "Tech",
      date: "",
      time: "",
      venue: "",
      organizer: "",
      eligibility: "All Students",
      description: "",
      tags: "",
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-5"
    >
      <h3 className="text-lg font-semibold mb-3">Add Event (Demo)</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Title *"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
        />

        <select
          name="category"
          value={form.category}
          onChange={onChange}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
        >
          <option>Tech</option>
          <option>Hackathon</option>
          <option>Robotics</option>
          <option>Fun</option>
          <option>Career</option>
          <option>Cultural</option>
          <option>Sports</option>
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={onChange}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
        />

        <input
          name="time"
          value={form.time}
          onChange={onChange}
          placeholder="Time (e.g. 10:00 AM)"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
        />

        <input
          name="venue"
          value={form.venue}
          onChange={onChange}
          placeholder="Venue *"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm md:col-span-2"
        />

        <input
          name="organizer"
          value={form.organizer}
          onChange={onChange}
          placeholder="Organizer"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
        />

        <input
          name="eligibility"
          value={form.eligibility}
          onChange={onChange}
          placeholder="Eligibility"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
        />
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Description *"
        className="mt-3 w-full min-h-[110px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
      />

      <input
        name="tags"
        value={form.tags}
        onChange={onChange}
        placeholder="Tags (comma separated) e.g. AI, Expo, Team"
        className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
      />

      <button className="mt-4 w-full rounded-2xl bg-indigo-500/80 px-4 py-3 text-sm font-semibold hover:bg-indigo-500">
        Add Event
      </button>
    </form>
  );
}
