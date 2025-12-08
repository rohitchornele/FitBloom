import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import goalRoute from "./routes/goalRoutes.js";
import consultationRoute from "./routes/consultationRoutes.js";
import doctorRoute from "./routes/doctorRoutes.js";
import publicArticlesRoute from "./routes/publicArticles.js";
import doctorArticlesRoute from "./routes/doctorArticles.js";



const app = express();

await connectDB();

// dotenv.config();
const PORT = process.env.PORT || 4000;


// Middlewares
app.use(
    cors({
        origin: process.env.ORIGIN, // Vite default; adjust if needed
        credentials: true,
    })
);
app.use(express.json());


// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.get("/", (req, res) => res.send("Server is live!!"));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/goals", goalRoute);
app.use("/api/consultations", consultationRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/public/articles", publicArticlesRoute);
app.use("/api/doctor/articles", doctorArticlesRoute);


app.listen(PORT, () => {
    console.log(`FitBloom API running on http://localhost:${PORT}`);
});

// Basic error handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Server error" });
});
