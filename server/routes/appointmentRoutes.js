
import { Router } from "express";
import { getDoctorAppointments, updateAppointmentStatus } from "../controllers/appointmentController.js";
import { requireDoctorAuth } from "../middlewares/doctorAuth.js";

const doctorAppointmentsRoute = Router();

doctorAppointmentsRoute.get("/", requireDoctorAuth, getDoctorAppointments);
doctorAppointmentsRoute.patch("/:id", requireDoctorAuth, updateAppointmentStatus);

export default doctorAppointmentsRoute;
