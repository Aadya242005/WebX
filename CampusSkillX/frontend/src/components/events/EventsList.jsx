import React from "react";
import EventCard from "./EventCard";

export default function EventsList({ events, onOpen }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {events.map((e) => (
        <EventCard key={e.id} event={e} onOpen={onOpen} />
      ))}
    </div>
  );
}
