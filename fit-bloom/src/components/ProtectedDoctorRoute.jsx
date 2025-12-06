import { Navigate, useLocation } from "react-router-dom";
import { useDoctorAuth } from "../context/DoctorAuthContext";

export default function ProtectedDoctorRoute({ children }) {
  const { doctor, loading } = useDoctorAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!doctor) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
}
