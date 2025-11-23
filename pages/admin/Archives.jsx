import React, { Fragment, useEffect, useState } from 'react'
import Statistics from '../../components/admin/Statistics'
import { Link, useNavigate } from 'react-router-dom'
import { FaReceipt, FaLocationArrow, FaBan, FaPlus } from 'react-icons/fa6'
import ShipmentModel from '../../components/admin/Models/ShipmentModel'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'
import axiosInstance from '../../utils/axiosInstance'
import { dateFormatter, getLastStatus } from '../../utils/helpers'

const Archives = () => {
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

    const getArchives = async () =>{
        try {
            const resp = await axiosInstance.get("/api/archive/getAll")
            setAirwayBills(resp.data)
        } catch (err) {
            console.log(err)
            console.log(err.response.statusText)
        }
    }

    useEffect(() => {
        getArchives()
    }, [])

    return (
        <Fragment>
            <div className='shipment-history col'>
                <div className="row">
                    <h3>Archive's Data</h3>
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
                                        <td>{ airwayBill.id }</td>
                                        <td>{ airwayBill.name }</td>
                                        <td>{ airwayBill.consignee }</td>
                                        <td>{ airwayBill.consignor }</td>
                                        <td>{ airwayBill.origin }</td>
                                        <td>{ airwayBill.destination }</td>
                                        <td>
                                            <span className={`${ airwayBill.remoteArea == 0 ? 'danger-badge' : airwayBill.remoteArea == 1 && 'success-badge' }`}>
                                                { airwayBill.remoteArea == 0 && 'No'}
                                                { airwayBill.remoteArea == 1 && 'Yes'}
                                            </span>
                                        </td>
                                        <td>
                                            {
                                                <span className={`${airwayBill.status == 0 ? 'dark-badge' : airwayBill.status == 1 ? 'primary-badge' : airwayBill.status == 2 ? 'danger-badge' : airwayBill.status == 3 ? 'secondary-badge' : airwayBill.status == 4 ? 'warning-badge' : airwayBill.status >= 5 && 'success-badge' }`}>
                                                    {
                                                        airwayBill.status == 0 ? 'Void' :
                                                        airwayBill.status == 1 ? 'Info Received' :
                                                        airwayBill.status == 2 ? 'Picked Up' :
                                                        airwayBill.status == 3 ? 'Processed' :
                                                        airwayBill.status == 4 ? 'Forwarded' :
                                                        airwayBill.status >= 5 && 'Updated'
                                                    }
                                                </span>
                                            }
                                        </td>
                                        <td>{ airwayBill.repFullName }</td>
                                        <td>{ dateFormatter(airwayBill.createdAt) }</td>
                                        <td className='row g-1 f-wrap'>
                                            {/* <button className='primary-btn' id={ airwayBill._id } onClick={ receiptHandler }>View <FaReceipt /></button>
                                            <button className='success-btn' id={ airwayBill.airwayBillNo } onClick={ trackingHandler }>Track <FaLocationArrow /></button>
                                            { airwayBill.status.length > 0 && <button className='dark-btn' id={ airwayBill._id } onClick={ getModel } name='Void Shipment'>Void <FaBan /></button> } */}
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

export default Archives