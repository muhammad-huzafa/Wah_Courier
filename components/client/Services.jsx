import React from 'react'

const Services = () => {
    return (
        <div className="services col" id="services">
            <p className="subtext1">Fast, Reliable and Affordable Rates</p>
            <h2 className="heading">Our Services</h2>
            <div className="service-cards-area row">
                <div className="service-slide row">
                    <div className="card1 col">
                        <h3 className="card-title">Urgent</h3>
                        <p className="card-desc">Delivery in 2-3 working days</p>
                    </div>
                    <div className="card1 col">
                        <h3 className="card-title">Express</h3>
                        <p className="card-desc">Delivery in 5-7 working days</p>
                    </div>
                    <div className="card1 col">
                        <h3 className="card-title">Standard</h3>
                        <p className="card-desc">Delivery in 8-10 working days</p>
                    </div>
                    <div className="card1 col">
                        <h3 className="card-title">Economy</h3>
                        <p className="card-desc">Delivery in 10-15 working days</p>
                    </div>
                </div>
                <div className="service-slide row">
                    <div className="card1 col">
                        <h3 className="card-title">Air Cargo</h3>
                    </div>
                    <div className="card1 col">
                        <h3 className="card-title">Student Package</h3>
                    </div>
                    <div className="card1 col">
                        <h3 className="card-title">Ecommerce</h3>
                    </div>
                    <div className="card1 col">
                        <h3 className="card-title">Attestation</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
