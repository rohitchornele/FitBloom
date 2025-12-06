import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sessionType: {
      type: String,
      required: true,
      enum: [
        "Initial Consultation (60 min)",
        "Follow-up Session (30 min)",
        "Meal Planning Session",
        "Progress Review",
      ],
    },
    dateTime: {
      type: Date,
      required: true,
      index: true,
    },
    duration: {
      type: Number, // minutes
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

const Consultation = mongoose.model("Consultation", consultationSchema);

export default Consultation;
