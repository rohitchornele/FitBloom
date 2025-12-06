// routes/doctorArticles.js - UPDATE (separate from public)
import { Router } from "express";
import { 
  createArticle, 
  getDoctorArticles, 
  getArticle, 
  updateArticle, 
  deleteArticle 
} from "../controllers/articleController.js";
import { requireDoctorAuth } from "../middlewares/doctorAuth.js";

const doctorArticlesRoute = Router();

// ✅ DOCTOR ONLY - REQUIRES AUTH
doctorArticlesRoute.post("/", requireDoctorAuth, createArticle);
doctorArticlesRoute.get("/", requireDoctorAuth, getDoctorArticles);
doctorArticlesRoute.get("/:id", requireDoctorAuth, getArticle);
doctorArticlesRoute.patch("/:id", requireDoctorAuth, updateArticle);
doctorArticlesRoute.delete("/:id", requireDoctorAuth, deleteArticle);

export default doctorArticlesRoute;
