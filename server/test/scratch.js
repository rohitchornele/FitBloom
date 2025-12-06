import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

async function run() {
  await connectDB();

  const user = new User({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  });

  await user.save();
  const ok = await user.comparePassword("password123");
}

run();
