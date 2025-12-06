
import { createContext, useContext, useEffect, useState } from "react";
import doctorApi from "../api/doctorClient";

const DoctorAuthContext = createContext(null);

export function DoctorAuthProvider({ children }) {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ ALWAYS LOAD ON EVERY MOUNT (handles page refresh perfectly)
  useEffect(() => {
    loadDoctorProfile();
  }, []);

  const loadDoctorProfile = async () => {
    const token = localStorage.getItem("fitbloom_doctor_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await doctorApi.get("/doctor/me");
      setDoctor(res.data);
    } catch (err) {
      console.error("DoctorAuthContext: Load failed:", err.response?.data);
      localStorage.removeItem("fitbloom_doctor_token");
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (token, doctorData) => {
    localStorage.clear();
    localStorage.setItem("fitbloom_doctor_token", token);
    setDoctor(doctorData);
  };

  const doctorLogout = () => {
    localStorage.removeItem("fitbloom_doctor_token");
    localStorage.clear();
    setDoctor(null);
  };

  return (
    <DoctorAuthContext.Provider value={{ doctor, loading, login, doctorLogout, reloadProfile: loadDoctorProfile }}>
      {children}
    </DoctorAuthContext.Provider>
  );
}

export function useDoctorAuth() {
  return useContext(DoctorAuthContext);
}
