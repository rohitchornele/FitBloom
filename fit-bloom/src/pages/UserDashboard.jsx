
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/client";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [goals, setGoals] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [goalsRes, consultationsRes] = await Promise.all([
          api.get("/goals"),
          api.get("/consultations"),
        ]);
        setGoals(goalsRes.data);
        setConsultations(consultationsRes.data);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Compute stats from real data
  const stats = useMemo(() => {
    const activeGoals = goals.filter((g) => g.status === "Active" || !g.status);
    const completedGoals = goals.filter((g) => g.current >= g.target);
    const upcomingConsultations = consultations.filter(
      (c) => new Date(c.dateTime) >= new Date()
    );

    return [
      { label: "Active Goals", value: activeGoals.length, iconBg: "bg-emerald-50", iconTint: "text-emerald-500" },
      { label: "Upcoming Consultations", value: upcomingConsultations.length, iconBg: "bg-rose-50", iconTint: "text-rose-400" },
      { label: "Goals Completed", value: completedGoals.length, iconBg: "bg-emerald-50", iconTint: "text-emerald-500" },
      { label: "Total Sessions", value: consultations.length, iconBg: "bg-rose-50", iconTint: "text-rose-400" },
    ];
  }, [goals, consultations]);

  // Transform goals for cards (top 3 active)
  const dashboardGoals = useMemo(() => {
    const active = goals
      .filter((g) => g.status === "Active" || !g.status)
      .slice(0, 3)
      .map((goal) => ({
        id: goal._id,
        title: goal.title,
        current: `${goal.current} / ${goal.target} ${goal.unit}`,
        percent: goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0,
      }));

    return active.length > 0 ? active : goals.slice(0, 3);
  }, [goals]);

  // Transform consultations for cards (next upcoming)
  const dashboardConsultations = useMemo(() => {
    const upcoming = consultations
      .filter((c) => new Date(c.dateTime) >= new Date())
      .slice(0, 1);

    return upcoming.map((item) => {
      const d = new Date(item.dateTime);
      return {
        id: item._id,
        dateLabel: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
        day: d.getDate().toString(),
        title: item.sessionType,
        time: `${d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })} • ${item.duration} min`,
        with: "with Dr. Emily Chen",
      };
    });
  }, [consultations]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-rose-50 flex items-center justify-center">
        <p className="text-lg text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-rose-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Good afternoon, {user?.name.split(" ")[0]}!
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Here's your wellness overview for today.
            </p>
          </div>

          <button 
            onClick={() => navigate('/goals')} 
            className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 transition"
          >
            <span className="mr-2 text-lg leading-none">🎯</span>
            New Goal
          </button>
        </div>

        {/* Stats cards row */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((card) => (
            <div
              key={card.label}
              className="flex items-center justify-between rounded-3xl bg-white px-6 py-5 shadow-sm ring-1 ring-slate-100/80"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {card.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {card.value}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg}`}
              >
                <span className={`text-xl ${card.iconTint}`}>◎</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main 2-column area */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Active Goals column */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Active Goals
              </h2>
              <button 
                onClick={() => navigate('/goals')} 
                className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                <span>View All</span>
                <span>→</span>
              </button>
            </div>

            <div className="space-y-4">
              {dashboardGoals.map((goal) => (
                <article
                  key={goal.id}
                  className="flex items-center rounded-3xl bg-white px-6 py-5 shadow-sm ring-1 ring-slate-100/80"
                >
                  {/* icon column */}
                  <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50">
                    <span className="text-xl text-emerald-500">✓</span>
                  </div>

                  {/* content column */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {goal.title}
                      </h3>
                      <span className="text-xs font-semibold text-emerald-500">
                        {Math.round(goal.percent)}%
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{goal.current}</p>

                    <div className="mt-3 h-2 rounded-full bg-emerald-50">
                      <div
                        className="h-2 rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${goal.percent}%` }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Upcoming Consultations column */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Upcoming Consultations
              </h2>
              <button 
                onClick={() => navigate('/consultations')} 
                className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                <span>View All</span>
                <span>→</span>
              </button>
            </div>

            {dashboardConsultations.map((item) => (
              <article
                key={item.id}
                className="flex items-stretch rounded-3xl bg-white px-6 py-5 shadow-sm ring-1 ring-slate-100/80"
              >
                {/* Date pill */}
                <div className="mr-6 flex flex-col items-center justify-center rounded-2xl bg-rose-50 px-4 py-3 text-rose-500">
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    {item.dateLabel}
                  </span>
                  <span className="mt-1 text-2xl font-semibold">
                    {item.day}
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500">{item.time}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.with}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
