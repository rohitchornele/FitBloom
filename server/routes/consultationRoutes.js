import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { createConsultation, deleteConsultation, getConsultations } from "../controllers/consultationController.js";


const consultationRoute = Router();
consultationRoute.use(requireAuth);

consultationRoute.get("/", getConsultations);
consultationRoute.post("/", createConsultation);
consultationRoute.delete("/:id", deleteConsultation);

export default consultationRoute;
