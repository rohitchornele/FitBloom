import Goal from "../models/Goal.js";

// GET /api/goals
export async function getGoals(req, res, next) {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({
      createdAt: 1,
    });
    res.json(goals);
  } catch (err) {
    next(err);
  }
}

// POST /api/goals
export async function createGoal(req, res, next) {
  try {
    const { title, description, target, unit, category, targetDate } = req.body;

    if (!title || !target || !unit) {
      return res
        .status(400)
        .json({ message: "Title, target and unit are required" });
    }

    const goal = await Goal.create({
      user: req.user.id,
      title,
      description,
      target,
      unit,
      category: category || "Other",
      targetDate: targetDate ? new Date(targetDate) : undefined,
    });

    res.status(201).json(goal);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/goals/:id
export async function updateGoal(req, res, next) {
  try {
    const { id } = req.params;

    const goal = await Goal.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json(goal);
  } catch (err) {
    next(err);
  }
}

// POST /api/goals/:id/logs  (log progress)
export async function addGoalLog(req, res, next) {
  try {
    const { id } = req.params;
    const { value, note } = req.body;

    if (typeof value !== "number") {
      return res
        .status(400)
        .json({ message: "Numeric 'value' is required to log progress" });
    }

    const goal = await Goal.findOne({ _id: id, user: req.user.id });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    goal.current += value;
    goal.logs.push({ value, note });

    await goal.save();

    res.json(goal);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/goals/:id
export async function deleteGoal(req, res, next) {
  try {
    const { id } = req.params;

    const goal = await Goal.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json({ message: "Goal deleted", id: goal._id });
  } catch (err) {
    next(err);
  }
}

