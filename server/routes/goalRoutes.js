import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { addGoalLog, createGoal, deleteGoal, getGoals, updateGoal } from "../controllers/goalController.js";


const goalRoute = Router();

goalRoute.use(requireAuth); // all routes below require auth

goalRoute.get("/", getGoals);
goalRoute.post("/", createGoal);
goalRoute.patch("/:id", updateGoal);
goalRoute.post("/:id/logs", addGoalLog);
goalRoute.delete("/:id", deleteGoal);

export default goalRoute;
