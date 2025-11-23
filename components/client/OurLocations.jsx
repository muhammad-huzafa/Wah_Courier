import React from 'react'

const OurLocations = () => {
    return (
        <div className="locations" id="locations">
            <div className="overlay1 col">
                <p className="subtext1">Find us at</p>
                <h2 className="heading">Our Locations</h2>
                <div className="location-cards">
                    <div className="location-card col jc-start">
                        <h3 className="card-title">Branch 1</h3>
                        <p className="card-desc">Shop# 23, 24/37, Behind HBL Bank, Aslam Market Wah Cantt, Pakistan<br /><br />051-4902066</p>
                        <div className="card-buttons row">
                            <a href="https://wa.me/wahcourier" target="_blank" className="btn1">Contact Now</a>
                            <a href="https://maps.app.goo.gl/tDsKeB25KVzi8A3k6" target="_blank" className="btn1">Get Direction</a>
                        </div>
                    </div>
                    <div className="location-card col jc-start">
                        <h3 className="card-title">Head Office</h3>
                        <p className="card-desc">Shop# 11, Opposite Bank Alfalah, Cantonment Market, Lalarukh, Basti Wah Cantt, Pakistan<br /><br />051-4533062</p>
                        <div className="card-buttons row">
                            <a href="https://wa.me/wahcourier" target="_blank" className="btn1">Contact Now</a>
                            <a href="https://maps.app.goo.gl/xqSBrbXN1Dc2Z3GH8" target="_blank" className="btn1">Get Direction</a>
                        </div>
                    </div>
                    <div className="location-card col jc-start">
                        <h3 className="card-title">Branch 2</h3>
                        <p className="card-desc">Shop# 2, Near Security Office, Downtown, Main Boulevard, Block-C, New City Phase 2, Wah, Pakistan<br />051-4592159</p>
                        <div className="card-buttons row">
                            <a href="https://wa.me/wahcourier" target="_blank" className="btn1">Contact Now</a>
                            <a href="https://maps.app.goo.gl/qvhumcvdXS3yNkpj8" target="_blank" className="btn1">Get Direction</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurLocations
