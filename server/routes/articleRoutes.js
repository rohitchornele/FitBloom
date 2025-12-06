// routes/doctorArticles.js
import { Router } from "express";
import { 
  createArticle, 
  getDoctorArticles, 
  getArticle, 
  updateArticle, 
  deleteArticle, 
  getAllArticles
} from "../controllers/articleController.js";
import { requireDoctorAuth } from "../middlewares/doctorAuth.js";

const articlesRoute = Router();

articlesRoute.post("/", requireDoctorAuth, createArticle);
articlesRoute.get("/", requireDoctorAuth, getDoctorArticles);
articlesRoute.get("/:id", requireDoctorAuth, getArticle);
articlesRoute.patch("/:id", requireDoctorAuth, updateArticle);
articlesRoute.delete("/:id", requireDoctorAuth, deleteArticle);
articlesRoute.get("/all", getAllArticles);

export default articlesRoute;
