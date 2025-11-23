import React from 'react'
import Logo from '../../../assets/images/wahcour.png'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa6'

const Footer = () => {
    return (   
        <footer className="footer">
            <div className="footer-top row jc-between ai-start">
                <div className="footer-logo">
                    <a href="index.php"><img src={ Logo } alt="" /></a>
                </div>
                <div className="footer-intro col">
                    <h3 className="uppercase">Wah Couriers & Logistics</h3>
                    <p>A premier courier from Pakistan providing courier & cargo services all around the world</p>
                    <p>Mon - Sat | 09:00 AM - 07:00 PM<br />
                        Sunday | CLOSED</p>
                </div>
                <div className="footer-quick-links col">
                    <h3 className="uppercase">Quick Links</h3>
                    <nav>
                        <ul>
                            <li id="q1"><a href="/">Home</a></li>
                            <li id="q2"><a href="#whyChoose">Why Choose</a></li> 
                            <li id="q3"><a href="#services">Our Services</a></li>
                            <li id="q4"><a href="#locations">Our Locations</a></li>
                            <li id="q5"><a href="tracking.php">Tracking</a></li>
                            <li id="q6"><a href="#contact">Contact Us</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="footer-connect col">
                    <h3 className="uppercase">Connect With Us</h3>
                    <div className="social-handles row g-1">
                        <a href="https://wa.me/wahcourier" target="_blank"><FaWhatsapp /></a>
                        <a href="https://www.facebook.com/WahCouriers" target="_blank"><FaFacebook /></a>
                        <a href="https://www.instagram.com/wahcouriers" target="_blank"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Wah Couriers and Logistics. All rights reserved. Designed & Developed by DevQuantum</p>
            </div>
        </footer>
    )
}

export default Footer
