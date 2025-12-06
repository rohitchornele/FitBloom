import { Router } from "express";
import { getUserData, login, register, updateMe } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/auth.js";

const authRoute = Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/user-data", requireAuth, getUserData);
authRoute.patch("/me", requireAuth, updateMe);

export default authRoute;