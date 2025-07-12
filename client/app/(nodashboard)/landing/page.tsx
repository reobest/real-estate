import React from 'react'
import Hero from '../../../components/Hero'
import Features from '../../../components/Features'
import Discover from '../../../components/Discover'
import CallToAction from '../../../components/CallToAction'
import Footer from '../../../components/Footer'
const page = () => {
  return (
    <div className='w-full'>
      <Hero/>
      <Features/>
      <Discover/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default page