import React, { Fragment, useState } from 'react'
import Footer from '../../components/client/Layout/Footer'
import FloatingButton from '../../components/client/FloatingButton'
import HeroSection from '../../components/client/HeroSection'
import WhyChooseUs from '../../components/client/WhyChooseUs'
import Services from '../../components/client/Services'
import DeliveryPartners from '../../components/client/DeliveryPartners'
import OurLocations from '../../components/client/OurLocations'
import ContactUs from '../../components/client/ContactUs'

const LandingPage = () => {

  return (
    <Fragment>
        <FloatingButton />
        <HeroSection />
        <WhyChooseUs />
        <Services />
        <DeliveryPartners />
        <OurLocations />
        <ContactUs />
        <Footer />
    </Fragment>
  )
}

export default LandingPage