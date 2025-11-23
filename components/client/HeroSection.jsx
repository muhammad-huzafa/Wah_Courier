import React from 'react'
import Background from '../../assets/images/bgs/bg4.webp'
import Header from './Layout/Header'
import TrackingPanel from './TrackingPanel'

const HeroSection = () => {
    return (
        <div className="home" id="home">
            <Header />
            <div className="home-inner col">
                <h2>International Documents & Parcel Delivery Service</h2>
                <TrackingPanel />
                <div className="clip">
                    <img src={ Background } alt="background-image-for-hero-banner" />
                </div>
            </div>
            
        </div>
    )
}

export default HeroSection
