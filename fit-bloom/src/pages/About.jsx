import React from 'react'
import AboutHero from '../components/about/AboutHero'
import DoctorProfile from '../components/about/DoctorProfile'
import PhilosophyGrid from '../components/about/PhilosophyGrid'
import AboutCTABanner from '../components/about/AboutCTABanner'

const About = () => {
  return (
    <>
    <AboutHero />
    <PhilosophyGrid />
    <DoctorProfile />
    <AboutCTABanner />
    </>
  )
}

export default About