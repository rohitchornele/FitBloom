import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 }, // ✅ KEEP FOR LOGIN
  title: { type: String, required: true },
  phone: { type: String },
  bio: { type: String },
  image: { type: String },
  qualifications: { type: String },
  certificates: { type: String, },
  experience: { type: Number, default: 0, min: 0 },
  clients: { type: Number, default: 0, min: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });


// Hash password
doctorSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
doctorSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("Doctor", doctorSchema);
