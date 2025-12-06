import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'  
import './App.css'
import Home from './pages/Home'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import UserDashboard from './pages/UserDashboard'
import Goals from './pages/Goals'
import Consultations from './pages/Consultations'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Articles from './pages/Articles'
import Contact from './pages/Contact'
import NewYearPopup from './components/NewYearPopup'
import ProfileSettingsPage from './pages/ProfileSettingsPage'
import ScrollToTop from './components/ScrollToTop'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedDoctorRoute from './components/ProtectedDoctorRoute'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminRegister from './pages/AdminRegister'
import Appointments from './pages/Appointments'
import Signup from './pages/Signup'

const AUTH_PAGES = ["/login", "/signup", "/admin/dashboard", "/admin/register", "/admin", "/doctor/appointments",];

function AppContent() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();  // <-- GET CURRENT PATH

  useEffect(() => {
    // const closed = localStorage.getItem(STORAGE_KEY) === "true";
    if (!closed) {
      const t = setTimeout(() => setShowPopup(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const isAuthPage = AUTH_PAGES.includes(location.pathname);

  useEffect(() => {
    if (isAuthPage) {
      document.body.style.overflow = 'scroll';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAuthPage]);

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><UserDashboard /></ProtectedRoute>
        } />
        <Route path="/goals" element={
          <ProtectedRoute><Goals /></ProtectedRoute>
        } />
        <Route path="/consultations" element={
          <ProtectedRoute><Consultations /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>
        } />


        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} /> {/* similar to login */}
        <Route path="/admin/dashboard" element={
          <ProtectedDoctorRoute>
            <AdminDashboard />
          </ProtectedDoctorRoute>
        } />
        <Route path="/doctor/appointments" element={
          <ProtectedDoctorRoute>
            <Appointments />
          </ProtectedDoctorRoute>
        } />
      </Routes>

      {/* Hide Footer on auth pages */}
      {!isAuthPage && <Footer />}

      <NewYearPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
