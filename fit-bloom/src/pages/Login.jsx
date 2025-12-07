// import React, { useState } from "react";
// import { Mail, Lock, Leaf } from "lucide-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import api from "../api/client";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();

//   const from = location.state?.from?.pathname || "/dashboard";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await api.post("/auth/login", form);
//       const { token, user } = res.data;

//       login(token, user);
//       navigate(from, { replace: true });
//     } catch (err) {
//       const msg =
//         err.response?.data?.message || "Invalid email or password.";
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-rose-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         {/* Logo + title */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="flex items-center gap-2">
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
//               <span className="text-xl text-white">
//                 <Leaf />
//               </span>
//             </div>
//             <span className="text-xl font-semibold text-slate-900">
//               FitBloom
//             </span>
//           </div>
//           <h1 className="mt-6 text-2xl font-semibold text-slate-900">
//             Welcome back
//           </h1>
//           <p className="mt-2 text-sm text-slate-500">
//             Sign in to continue your wellness journey.
//           </p>
//         </div>

//         {/* Card */}
//         <div className="rounded-3xl bg-white px-6 py-6 shadow-lg shadow-emerald-100 ring-1 ring-emerald-50 sm:px-8 sm:py-7">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
//                 Email
//               </label>
//               <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-3 py-3">
//                 <Mail className="h-4 w-4 text-slate-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   placeholder="you@example.com"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
//                 />
//               </div>
//             </div>

//             {/* Password + forgot */}
//             <div>
//               <div className="mb-2 flex items-center justify-between">
//                 <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
//                   Password
//                 </label>
//                 <button
//                   type="button"
//                   className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
//                 >
//                   Forgot password?
//                 </button>
//               </div>
//               <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-3 py-3">
//                 <Lock className="h-4 w-4 text-slate-400" />
//                 <input
//                   type="password"
//                   name="password"
//                   required
//                   placeholder="••••••••"
//                   value={form.password}
//                   onChange={handleChange}
//                   className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
//                 />
//               </div>
//             </div>

//             {error && (
//               <p className="text-xs text-red-500 mt-1">
//                 {error}
//               </p>
//             )}

//             {/* Sign in button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:-translate-y-px disabled:opacity-60 disabled:hover:translate-y-0"
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </button>

//             {/* Sign up link */}
//             <p className="pt-1 text-center text-xs text-slate-500">
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="font-semibold text-emerald-600 hover:text-emerald-700"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }


import React, { useState } from "react";
import { Mail, Lock, Leaf, UserCog } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data;

      login(token, user);
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message || "Invalid email or password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    navigate("/admin");
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-rose-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo + title */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
              <span className="text-xl text-white">
                <Leaf />
              </span>
            </div>
            <span className="text-xl font-semibold text-slate-900">
              FitBloom
            </span>
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue your wellness journey.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white px-6 py-6 shadow-lg shadow-emerald-100 ring-1 ring-emerald-50 sm:px-8 sm:py-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-3 py-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Password + forgot */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Forgot password?
                </button>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-3 py-3">
                <Lock className="h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 mt-1">{error}</p>
            )}

            {/* Sign in button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:-translate-y-px disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* NEW: Admin/Doctor Login Button */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider text-slate-400">
                or
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdminLogin}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-slate-900 hover:to-black hover:shadow-md transition-all hover:-translate-y-px border border-slate-200"
            >
              <UserCog className="h-4 w-4" />
              Login as Admin / Doctor
            </button>

            {/* Sign up link */}
            <p className="pt-1 text-center text-xs text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
