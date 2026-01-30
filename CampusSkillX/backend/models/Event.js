import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    registeredAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },

    // store date as Date for correct sorting/filtering
    date: { type: Date, required: true },

    // time stored separately as "HH:MM" for display (optional)
    time: { type: String, trim: true, default: "" },

    venue: { type: String, required: true, trim: true, maxlength: 200 },
    organizer: { type: String, required: true, trim: true, maxlength: 200 },

    eligibility: { type: String, trim: true, default: "All Students" },

    capacity: { type: Number, default: 0, min: 0 }, // 0 = unlimited

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    registrations: { type: [registrationSchema], default: [] },
  },
  { timestamps: true }
);

// helpful virtuals
eventSchema.virtual("registrationCount").get(function () {
  return this.registrations?.length || 0;
});

eventSchema.set("toJSON", { virtuals: true });
eventSchema.set("toObject", { virtuals: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;
