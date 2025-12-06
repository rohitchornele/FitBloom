import mongoose from "mongoose";

const goalLogSchema = new mongoose.Schema(
  {
    value: { type: Number, required: true },
    note: { type: String, trim: true },
  },
  { timestamps: true }
);

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    target: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
    },
    current: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: String,
      enum: ["Nutrition", "Exercise", "Sleep", "Mindfulness", "Other"],
      default: "Other",
    },
    targetDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Past due"],
      default: "Active",
    },
    logs: [goalLogSchema],
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
