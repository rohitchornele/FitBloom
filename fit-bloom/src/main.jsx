import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { DoctorAuthProvider } from './context/DoctorAuthContext.jsx'

createRoot(document.getElementById('root')).render(
   <AuthProvider>
    <DoctorAuthProvider>
      <App />
    </DoctorAuthProvider>
  </AuthProvider>
)
