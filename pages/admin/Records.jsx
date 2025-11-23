import React, { Fragment, useState } from 'react'
import Statistics from '../../components/admin/Statistics'
import { dateFormatter, getLastStatus } from '../../utils/helpers'
import ShipmentModel from '../../components/admin/Models/ShipmentModel'
import { FaReceipt, FaLocationArrow, FaBan, FaMagnifyingGlass } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { useEffect } from 'react'

const Records = () => {
    const [ airwayBills, setAirwayBills ] = useState([])
    const [ formValues, setFormValues ] = useState({ from: '', to: '' })
    
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

    const inputHandler = (e) => {
        e.preventDefault()
        const { name, value } = e.target

        setFormValues({...formValues, [name]: value})
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

    const searchHandler = (e) => {
        e.preventDefault()
        if (formValues.to != '' && formValues.from != '') {
            getAirwayBillsByToFrom()        
        } else {
            console.log("Please select date filter")
        }
    }

    useEffect(() => {
        if (formValues.to !== '' && formValues.from !== '') {
            getAirwayBillsByToFrom()
        }
    }, [formValues.to, formValues.from])

    const getAirwayBillsByToFrom = async () => {
        try {
            const formData = new FormData()
            formData.append("to", formValues.to)
            formData.append("from", formValues.from)

            const resp = await axiosInstance.post("/api/airwaybill/getByToFrom", formData)
            
            setAirwayBills(resp.data)
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <Fragment>
            <ShipmentModel modelProps={{ modelData, setModelData }} />
            <Statistics to={ formValues.to } from={ formValues.from } />
            <div className="shipment-history col">
                <div className="row f-wrap">
                    <h3>Shipments History</h3>
                    <form method="POST" className="row g-2 ai-end filter-form">
                        <div className="form-field col w-100 ai-start">
                            <label htmlFor="from" className="subtext">From</label>
                            <input type="date" id="from" name="from" className='w-100' value={ formValues.from } onChange={ inputHandler } />
                        </div>
                        <div className="form-field col w-100 ai-start">
                            <label htmlFor="to" className="subtext">To</label>
                            <input type="date" id="to" name="to" className='w-100' value={ formValues.to } onChange={ inputHandler } />
                        </div>
                        {/* <div className="row">
                            <button type="submit" className="primary-btn p-4" onClick={ searchHandler }>Search <FaMagnifyingGlass /></button>
                        </div> */}
                    </form>
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

export default Records