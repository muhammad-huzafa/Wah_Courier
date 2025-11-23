import React, { Fragment, useEffect, useState } from 'react'
import Statistics from '../../components/admin/Statistics'
import { dateFormatter, getLastStatus } from '../../utils/helpers'
import { FaReceipt, FaLocationArrow, FaChevronUp, FaChevronDown, FaNoteSticky } from 'react-icons/fa6'
import ShipmentModel from '../../components/admin/Models/ShipmentModel'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

const TrackingManagment = () => {
    const navigate = useNavigate()
    const [ airwayBills, setAirwayBills ] = useState([])
    
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
                id: '',
                style: { opacity: 1, transform: 'translateY(0)' },
                isOpen: isOpen
            })
        }
    }

    const receiptHandler = (e) => {
        e.preventDefault()
        const { id } = e.target
        navigate(`/admin/dashboard/receipt/${id}`)
    }

    const trackingHandler = (e) => {
        e.preventDefault()
        const { id } = e.target
        window.open(`/tracking/${ id }`, '_blank')
    }

    useEffect(() => {
        getAllAirwayBills()
    }, [modelData])

    const getAllAirwayBills = async () => {
        try {
            const resp = await axiosInstance.get("/api/airwaybill/getAll")

            setAirwayBills(resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Fragment>
            <ShipmentModel modelProps={{ modelData, setModelData }} />
            <Statistics />
            <div className="shipment-history col">
                <div className="row">
                    <h3>Shipments Tracking</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>CN #</th>
                                <th>Latest Tracking</th>
                                <th>Last Updated</th>
                                <th>Notes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {
                                airwayBills && airwayBills.map(( airwayBill, index ) => (
                                    <tr key={ index }>
                                        <td>{ airwayBill.airwayBillNo }</td>
                                        <td>
                                            {
                                                airwayBill.status.length > 0 ? 
                                                <span className={`${getLastStatus(airwayBill.status) == 1 ? 'secondary-badge' : getLastStatus(airwayBill.status) == 2 ? 'warning-badge' : getLastStatus(airwayBill.status) == 3 ? 'primary-badge' : getLastStatus(airwayBill.status) == 4 ? 'danger-badge' : getLastStatus(airwayBill.status) == 5 ? 'primary-badge' : getLastStatus(airwayBill.status) == 6 && 'success-badge' }`}>
                                                    { getLastStatus(airwayBill.status) == 1 ? 'Info Recieved' : getLastStatus(airwayBill.status) == 2 ? 'Packed' : getLastStatus(airwayBill.status) == 3 ? '3rd Party AWB' : getLastStatus(airwayBill.status) == 4 ? 'Mainfiest' : getLastStatus(airwayBill.status) == 5 ? 'Proceeded' : getLastStatus(airwayBill.status) == 6 && 'Tracking No Update' }
                                                </span> :
                                                <span className='dark-badge'>Void</span>
                                            }
                                        </td>
                                        <td>{ dateFormatter(airwayBill.updatedAt) }</td>
                                        <td>{ airwayBill?.notes }</td>
                                        <td className='row g-1 f-wrap'>
                                            <button className='primary-btn' id={ airwayBill._id } onClick={ receiptHandler }>View <FaReceipt /></button>
                                            <button className='success-btn' id={ airwayBill.airwayBillNo } onClick={ trackingHandler }>Track <FaLocationArrow /></button>
                                            {
                                                airwayBill.status.length > 0 && 
                                                <>
                                                    { <button className='warning-btn' id={ airwayBill._id } name='Up Track Shipment' onClick={ getModel }>Up Track <FaChevronUp /></button> }
                                                    { <button className='danger-btn' id={ airwayBill._id } name='Down Track Shipment' onClick={ getModel }>Down Track <FaChevronDown /></button> }
                                                </>
                                            }   
                                            <button className='primary-btn' id={ airwayBill._id } name='Add Note' onClick={ getModel }>Update Note <FaNoteSticky /></button>                               
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

export default TrackingManagment
