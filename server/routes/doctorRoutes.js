import { Router } from "express";
import { doctorLogin, doctorRegister, getActiveClients, getDoctorProfile, getDoctorPublicProfile, updateDoctorProfile } from "../controllers/doctorAuthController.js";
import { requireDoctorAuth } from "../middlewares/doctorAuth.js";

const doctorRoute = Router();

doctorRoute.post("/register", doctorRegister);
doctorRoute.post("/login", doctorLogin);
doctorRoute.get("/me", requireDoctorAuth, getDoctorProfile);
doctorRoute.patch("/me", requireDoctorAuth, updateDoctorProfile);
doctorRoute.get("/public", getDoctorPublicProfile);
doctorRoute.get('/active-clients', requireDoctorAuth, getActiveClients);

export default doctorRoute;
