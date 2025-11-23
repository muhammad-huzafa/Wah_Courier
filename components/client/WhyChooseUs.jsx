import React from 'react'
import IcoDtd from '../../assets/images/icons/dtd.svg'
import IcoRtt from '../../assets/images/icons/rtt.svg'
import IcoFrar from '../../assets/images/icons/frar.svg'
import IcoWrcs from '../../assets/images/icons/wrcs.svg'
import Ico247cs from '../../assets/images/icons/247cs.svg'

const WhyChooseUs = () => {
    return (
        <div className="whyChoose row" id="whyChoose">
            <div className="left">
                <div className="overlay1">
                    <p className="subtext1">Why Choose</p>
                    <h3 className="heading">Wah Couriers & Logistics</h3>
                    <p className="subtext2">WAH Couriers and Logistics, a premier courier from Pakistan, provides global shipping solutions with precision and reliability. Trusted for its swift and secure deliveries, WAH Courier is the preferred choice for businesses worldwide.</p>
                </div>
            </div>
            <div className="right col">
                <div className="feat-card row">
                    <div className="feat-card-ico">
                        <img src={ IcoDtd } alt="Door to door service icon" />
                    </div>
                    <div className="feat-card-desc">
                        <h3 className="subheading">Door-to-door Delivery<br />Documents & Parcels</h3>
                    </div>
                </div>
                <div className="feat-card row">
                    <div className="feat-card-ico">
                        <img src={ IcoRtt } alt="Real time shipment tracking icon" />
                    </div>
                    <div className="feat-card-desc">
                        <h3 className="subheading">Real Time Shipments<br />Tracking</h3>
                    </div>
                </div>
                <div className="feat-card row">
                    <div className="feat-card-ico">
                        <img src={ IcoFrar } alt="Affordable rates icon" />
                    </div>
                    <div className="feat-card-desc">
                        <h3 className="subheading">Fast, Reliable &<br />Affordable Rates</h3>
                    </div>
                </div>
                <div className="feat-card row">
                    <div className="feat-card-ico">
                        <img src={ IcoWrcs } alt="Courier service icon" />
                    </div>
                    <div className="feat-card-desc">
                        <h3 className="subheading">A Wide Range of International<br />Courier Services</h3>
                    </div>
                </div>
                <div className="feat-card row">
                    <div className="feat-card-ico">
                        <img src={ Ico247cs } alt="247 customer support icon" />
                    </div>
                    <div className="feat-card-desc">
                        <h3 className="subheading">24/7 Customer<br />Support</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyChooseUs
