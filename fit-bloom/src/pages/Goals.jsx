
import { useEffect, useState } from "react";
import CreateGoalModal from "../components/CreateGoalModal";
import LogProgressModal from "../components/LogProgressModal";
import api from "../api/client";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [openLog, setOpenLog] = useState(false);
  const [activeGoal, setActiveGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load goals on mount
  useEffect(() => {
    let cancelled = false;

    async function fetchGoals() {
      try {
        setError("");
        const res = await api.get("/goals");
        if (!cancelled) setGoals(res.data);
      } catch (err) {
        if (!cancelled) {
          const msg =
            err.response?.data?.message || "Failed to load goals.";
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGoals();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenLog = (goal) => {
    setActiveGoal(goal);
    setOpenLog(true);
  };

  const handleLogSave = async (goalId, { value, note }) => {
    try {
      const res = await api.post(`/goals/${goalId}/logs`, { value, note });
      const updated = res.data;

      setGoals((prev) =>
        prev.map((g) => (g._id === updated._id ? updated : g))
      );
    } catch (err) {
      console.error("Log progress error:", err);
    }
  };

  const handleCreateGoal = async (data) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        target: Number(data.target),
        unit: data.unit,
        category: data.category,
        targetDate: data.targetDate || undefined,
      };

      const res = await api.post("/goals", payload);
      const newGoal = res.data;

      setGoals((prev) => [...prev, newGoal]);
      setShowCreateGoal(false);
    } catch (err) {
      console.error("Create goal error:", err);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await api.delete(`/goals/${goalId}`);
      setGoals((prev) => prev.filter((g) => g._id !== goalId));
    } catch (err) {
      console.error("Delete goal error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-rose-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Goals &amp; Progress
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track your wellness goals and celebrate your achievements.
            </p>
          </div>

          <button
            onClick={() => setShowCreateGoal(true)}
            className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600"
          >
            <span className="mr-2 text-lg leading-none">+</span>
            New Goal
          </button>
        </div>

        {/* Create goal modal */}
        {showCreateGoal && (
          <CreateGoalModal
            isOpen={showCreateGoal}
            onClose={() => setShowCreateGoal(false)}
            onSubmit={handleCreateGoal}
          />
        )}

        {/* Error / loading */}
        {error && (
          <p className="mt-4 text-sm text-red-500">
            {error}
          </p>
        )}
        {loading && !error && (
          <p className="mt-4 text-sm text-slate-500">Loading goals...</p>
        )}

        {/* Active goals title */}
        {!loading && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-slate-800">
              Active Goals ({goals.length})
            </h2>
          </div>
        )}

        {/* Cards grid */}
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => {
            const progressPercent =
              goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
            const progressLabel = `${goal.current} / ${goal.target} ${goal.unit}`;
            const status = goal.status || "Active";

            return (
              <article
                key={goal._id}
                className="relative rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100/80 transition hover:shadow-md"
              >
                {/* Status pill */}
                <span className="absolute right-5 top-5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  {status}
                </span>

                {/* Delete button (top-left corner) */}
                <button
                  onClick={() => handleDeleteGoal(goal._id)}
                  className="absolute left-5 top-5 text-xs text-slate-400 hover:text-rose-500"
                  title="Delete goal"
                >
                  ✕
                </button>

                {/* Icon */}
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                  <span className="text-xl text-emerald-500">✓</span>
                </div>

                {/* Title & desc */}
                <h3 className="text-lg font-semibold text-slate-900">
                  {goal.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {goal.description}
                </p>

                {/* Progress label */}
                <div className="mt-5 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Progress</span>
                  <span className="text-slate-600">{progressLabel}</span>
                </div>

                {/* Progress bar */}
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  />
                </div>

                {/* Log progress button */}
                <button
                  onClick={() => handleOpenLog(goal)}
                  className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-50 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                >
                  <span className="text-base leading-none">+</span>
                  <span>Log Progress</span>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {/* Log progress modal */}
      {openLog && activeGoal && (
        <LogProgressModal
          isOpen={openLog}
          onClose={() => setOpenLog(false)}
          goalTitle={activeGoal.title}
          unitLabel={activeGoal.unit}
          onSave={(data) => handleLogSave(activeGoal._id, data)}
        />
      )}
    </div>
  );
}
