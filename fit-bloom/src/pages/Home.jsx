import React, { useEffect, useState } from 'react'
import Hero from '../components/homepage/Hero'
import Features from '../components/homepage/Features'
import HowItWorks from '../components/homepage/HowItWorks'
import Blogs from '../components/homepage/Blogs'
import Testimonials from '../components/homepage/Testimonials'
import CTASection from '../components/homepage/CTASection'
import NewYearPopup from '../components/NewYearPopup'
import { useAuth } from '../context/AuthContext'
import { useDoctorAuth } from '../context/DoctorAuthContext'

const Home = () => {

  const [showPopup, setShowPopup] = useState(true);

  const { user } = useAuth();
  const { doctor } = useDoctorAuth();

  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <Blogs />
      <Testimonials />
      <CTASection />

      {
        (user || doctor) ?
          (<NewYearPopup isOpen={false} />) : (
            <NewYearPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
          )
      }
    </div>
  )
}

export default Home