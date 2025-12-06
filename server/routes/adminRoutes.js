import { Router } from "express";
import Doctor from "../models/Doctor.js";
import Article from "../models/Article.js";

const router = Router();

const isAdmin = (req, res, next) => {
  const adminToken = req.headers['x-admin-token'];
  if (adminToken !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: "Admin access required" });
  }
  next();
};

router.use(isAdmin);

// Doctors
router.get("/doctors", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});
router.post("/doctors", async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.json(doctor);
});
router.put("/doctors/:id", async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doctor);
});

// Articles
router.get("/articles", async (req, res) => {
  const articles = await Article.find({ published: true });
  res.json(articles);
});
router.post("/articles", async (req, res) => {
  const article = await Article.create(req.body);
  res.json(article);
});

export default router;
