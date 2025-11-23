import React, { Fragment, useEffect, useState } from 'react'
import Statistics from '../../components/admin/Statistics'
import { Link, useNavigate } from 'react-router-dom'
import { FaReceipt, FaLocationArrow, FaBan, FaPlus } from 'react-icons/fa6'
import ShipmentModel from '../../components/admin/Models/ShipmentModel'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'
import axiosInstance from '../../utils/axiosInstance'
import { dateFormatter, getLastStatus } from '../../utils/helpers'

const Home = () => {
    const navigate = useNavigate()
    const { role } = useContext(UserContext)
    const [ airwayBills, setAirwayBills ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    
    // Get Model Code Here
    const [ modelData, setModelData ] = useState({
        formName: '',
        id: '',
        style: { opacity: 0, transform: 'translateY(-100%)' },
        isOpen: false
    })

    const getModel = (e) => {
        e.preventDefault()
        let isOpen = false
        const { name, id } = e.target 

        if (!modelData.isOpen) {
            isOpen = true
        }
        
        if ( id ) {
            setModelData({
                formName: name,
                id: id,
                style: { opacity: 1, transform: 'translateY(0)' },
                isOpen: isOpen
            })
        } else {
            setModelData({
                formName: name,
                style: { opacity: 1, transform: 'translateY(0)' },
                isOpen: isOpen
            })
        }
    }

    const receiptHandler = (e) => {
        e.preventDefault()
        const { id } = e.target
        window.open(`/admin/dashboard/receipt/${id}`, '_blank')
    }

    const trackingHandler = (e) => {
        e.preventDefault()
        const { id } = e.target
        window.open(`/tracking/${ id }`, '_blank')
    }

    const getAirwayBillsByToday = async () =>{
        try {
            const resp = await axiosInstance.get("/api/airwaybill/getAllByToday")
            
            setAirwayBills(resp.data)
        } catch (err) {
            console.log(err.response.statusText)
        }
    }

    useEffect(() => {
        getAirwayBillsByToday()
    }, [modelData])

    return (
        <Fragment>
            <ShipmentModel modelProps={{ modelData, setModelData }} />
            <Statistics />
            <div className='shipment-history col'>
                <div className="row">
                    <h3>Today's Shipments</h3>
                    { role == 2 && <Link to={"/admin/dashboard/airwaybill"} target='_blank' className='primary-btn'>Add Airway Bill <FaPlus /></Link> }
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>AB #</th>
                                <th>Service</th>
                                <th>Consignee</th>
                                <th>Consignor</th>
                                <th>Origin</th>
                                <th>Destination</th>
                                <th>Remote Area</th>
                                <th>Shipment Status</th>
                                <th>Booked By</th>
                                <th>Booking Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {
                                airwayBills.map(( airwayBill, index ) => (
                                    <tr key={ index }>
                                        <td>{ airwayBill.airwayBillNo }</td>
                                        <td>{ airwayBill.service.name }</td>
                                        <td>{ airwayBill.consignee.contactPerson }</td>
                                        <td>{ airwayBill.consignor.contactPerson }</td>
                                        <td>{ airwayBill.origin }</td>
                                        <td>{ airwayBill.destination }</td>
                                        <td>
                                            <span className={`${ airwayBill.isRemoteArea == 0 ? 'danger-badge' : airwayBill.isRemoteArea == 1 && 'success-badge' }`}>
                                                { airwayBill.isRemoteArea == 0 && 'No'}
                                                { airwayBill.isRemoteArea == 1 && 'Yes'}
                                            </span>
                                        </td>
                                        <td>
                                            {
                                                airwayBill.status.length > 0 ? 
                                                <span className={`${getLastStatus(airwayBill.status) == 1 ? 'secondary-badge' : getLastStatus(airwayBill.status) == 2 ? 'danger-badge' : getLastStatus(airwayBill.status) == 3 ? 'primary-badge' : getLastStatus(airwayBill.status) == 4 ? 'warning-badge' : getLastStatus(airwayBill.status) >= 5 && 'success-badge' }`}>
                                                    { getLastStatus(airwayBill.status) == 1 ? 'Info Recieved' : getLastStatus(airwayBill.status) == 2 ? 'Packed' : getLastStatus(airwayBill.status) == 3 ? '3rd Party AWB' : getLastStatus(airwayBill.status) == 4 ? 'Mainfiest' : getLastStatus(airwayBill.status) >= 5 && 'Tracking No Update' }
                                                </span> :
                                                <span className='dark-badge'>Void</span>

                                            }
                                        </td>
                                        <td>{ airwayBill.center.username }</td>
                                        <td>{ dateFormatter(airwayBill.createdAt) }</td>
                                        <td className='row g-1 f-wrap'>
                                            <button className='primary-btn' id={ airwayBill._id } onClick={ receiptHandler }>View <FaReceipt /></button>
                                            <button className='success-btn' id={ airwayBill.airwayBillNo } onClick={ trackingHandler }>Track <FaLocationArrow /></button>
                                            { airwayBill.status.length > 0 && <button className='dark-btn' id={ airwayBill._id } onClick={ getModel } name='Void Shipment'>Void <FaBan /></button> }
                                        </td>
                                    </tr>                                    
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default Home