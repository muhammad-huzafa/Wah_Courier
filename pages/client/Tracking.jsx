import React, { Fragment, useEffect, useState } from 'react'
import FloatingButton from '../../components/client/FloatingButton'
import Header from '../../components/client/Layout/Header'
import Footer from '../../components/client/Layout/Footer'
import TrackingPanel from '../../components/client/TrackingPanel'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Alert from '../../components/Alert'
import Loader from '../../components/Loader'
import { dateFormatter, getLastStatus, getLastStatusDescription, getStatus, getStatusDescription } from '../../utils/helpers'

const Tracking = () => {

    const [ airwayBill, setAirwayBill ] = useState(null)
    const { airwayBillNo } = useParams()
    const [ resp, setResp ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        if (airwayBillNo) {
            getAirwayBill()
        }
    }, [airwayBillNo])

    const getAirwayBill = async () => {
        setIsLoading(true)

        try {
            const resp = await axiosInstance.get(`/api/airwaybill/track/${ airwayBillNo }`)
            setAirwayBill(resp.data)
        } catch (err) {
            if (err.response.status == 400) {
                setResp({ error: err.response.statusText })
            } else if (err.response.status == 401) {
                setResp({ error: 'Not authorized to access' })
            } else if (err.response.status == 404) {
                setResp({ error: "AirwayBill doesn't exists" })
            } else if (err.response.status == 500) {
                setResp({ error: err.response.statusText })
            } else {
                setResp({ error: err.response.statusText })
            }
        } finally {
            setIsLoading(false)
            setTimeout(() => {
                setResp({})
            }, 3000);
        }
    }

    return (
        <Fragment>
            <Alert resp={ resp } />
            { isLoading && <Loader message={"Processing your request..."} /> }
            <FloatingButton />
            <div className="home trackp">
                <Header />
                <div className="home-inner trackp col">
                    <h2>Shipments Tracking</h2>
                    <TrackingPanel ab={{ airwayBill, setAirwayBill }} />
                </div>
                {
                    airwayBill && 
                    <div className="tracking-display-area col">
                        <h2 className="tracking-no-heading">Airway Bill# <span>{ airwayBill.airwayBillNo }</span></h2>
                        <div className="tracking-body col">
                            <div className="row">
                                <div className="col">
                                    <div className="tracking-info-field">
                                        <p className="tracking-info-head">Origin :</p>
                                        <p className="tracking-info-value uppercase">{ airwayBill.origin }</p>
                                    </div>
                                    <div className="tracking-info-field">
                                        <p className="tracking-info-head">Booking Date :</p>
                                        <p className="tracking-info-value">{ dateFormatter(airwayBill.createdAt) }</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="tracking-info-field">
                                        <p className="tracking-info-head">Destination :</p>
                                        <p className="tracking-info-value">{ airwayBill.destination }</p>
                                    </div>
                                    <div className="tracking-info-field">
                                        <p className="tracking-info-head">Status :</p>
                                        <p className="tracking-info-value">
                                            {
                                                airwayBill.status?.length > 0 ?
                                                <>
                                                    {
                                                        // getLastStatus(airwayBill.status) == 1 ? 'Information Recieved' :
                                                        // getLastStatus(airwayBill.status) >= 2 && getLastStatus(airwayBill.status) < 6 ? getLastStatusDescription(airwayBill.status) : 
                                                        'Shipment Forwarded'
                                                        // 1 - BASE INFO RECIEVED
                                                        // 2 - PACKED
                                                        // 3 - 3RD PARTY AWB 
                                                        // 4 - MAINFIEST
                                                        // 5 - PROCEED
                                                        // 6 - TRACKING NUMBER UPDATE
                                                    }
                                                </> : 'Void'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <table border="1">
                                <thead>
                                <tr>
                                    <th>Date Time</th>
                                    <th >Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        airwayBill.status.map(( status, index ) => (                                            
                                            <tr key={ index }>
                                                <td>{ dateFormatter(status.createdAt) }</td>
                                                {
                                                    status.type >= 1 & status.type <= 5 ?
                                                    <td className='uppercase'>{ getStatusDescription(status) }</td> :
                                                    <td>
                                                        Your consignment has been <span class="forwarded">forwarded </span>with tracking #. <span class="tracking-no">{ status.trackingNo }</span> you want to track your consignment? <a href={ status.description } target="_blank" class="uppercase tracking-link">Click here</a>
                                                    </td>
                                                }
                                            </tr>   
                                        ))
                                    }   
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </Fragment>
    )
}

export default Tracking
