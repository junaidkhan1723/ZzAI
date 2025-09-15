import React from 'react'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Features/>
    <Testimonial/>
    <Plan />
    <Footer/>
    </>
  )
}

export default Home