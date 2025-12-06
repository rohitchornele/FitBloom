import React from 'react'
import Hero from '../components/homepage/Hero'
import Features from '../components/homepage/Features'
import HowItWorks from '../components/homepage/HowItWorks'
import Blogs from '../components/homepage/Blogs'
import Testimonials from '../components/homepage/Testimonials'
import CTASection from '../components/homepage/CTASection'

const Home = () => {
  return (
    <div>
        <Hero />
        <Features />
        <HowItWorks />
        <Blogs />
        <Testimonials />
        <CTASection />
        
    </div>
  )
}

export default Home