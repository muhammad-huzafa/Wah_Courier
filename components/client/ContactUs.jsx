import React from 'react'
import { FaMapLocationDot, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa6'

const ContactUs = () => {
    return (
        <div className="contact section row" id="contact">
            <div className="left col">
                <h3 className="heading">Contact Form</h3>
                <form action="" className='col g-3 ai-end'>
                    <div className='form-field ai-start col w-100'>
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" name="fullName" id="fullName" className='w-100'/>
                        {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                    </div>
                    <div className='form-field ai-start col w-100'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className='w-100'/>
                        {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                    </div>
                    <div className='form-field ai-start col w-100'>
                        <label htmlFor="commMsg">Comment/Message</label>
                        <textarea type="text" name="commMsg" id="commMsg" className="w-100" rows="9"></textarea>
                        {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                    </div>
                    <input type="submit" value="Submit" className="btn1" />
                </form>
            </div>
            <div className="right">
                <div className="overlay2 col">
                    <div className="contact-card col">
                        <div className="card-item row ai-start">
                            <FaMapLocationDot />
                            <div className="col">
                                <h4 className="card-title">Location</h4>
                                <p className="card-desc">Shop# 11, Opposite Bank Alfalah, Cantonment Market, Lalarukh, Basti Wah Cantt, Pakistan</p>
                            </div>
                        </div>
                        <div className="card-item row ai-start">
                            <FaPhone />
                            <div className="col">
                                <h4 className="card-title">Phone</h4>
                                <p className="card-desc">+923368418488</p>
                            </div>
                        </div>
                        <div className="card-item row ai-start">
                            <FaEnvelope />
                            <div className="col">
                                <h4 className="card-title">Email</h4>
                                <p className="card-desc">wahcouriers@yahoo.com<br />wahcourier@gmail.com</p>
                            </div>
                        </div>
                        <div className="card-item row ai-start">
                            <FaClock />
                            <div className="col">
                                <h4 className="card-title">Hours</h4>
                                <p className="card-desc">Mon - Sat | 09:00 AM - 07:00 PM<br />
                                Sunday | CLOSED</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
