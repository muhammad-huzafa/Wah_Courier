import React, { Fragment, useEffect, useState } from 'react'
import { FaBan, FaPenToSquare, FaCheck } from 'react-icons/fa6'
import axiosInstance from '../../../utils/axiosInstance'
import Alert from '../../Alert'
import Loader from '../../Loader'

const ShipmentModel = ({ modelProps }) => {
    // Shipment CRUD   
    const initValues = { _id: '' }
    const [ formValues, setFormValues ] = useState({ ...initValues })
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ formErrors, setFormErrors ] = useState({})
    const [ resp, setResp ] = useState({})

    const inputHandler = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const updateStatus = async () => {
        setIsLoading(true)

        const formData = new FormData()
        formData.append('type', formValues.type)
        formData.append('description', formValues.description)
        formData.append('trackingNo', formValues.trackingNo)

        try {
            const resp = await axiosInstance.put(`/api/airwaybill/upTrack/${ formValues._id }`, formData)
            setResp({ message: "AirwayBill Status Updated Successfully !!" })
            cancelHandler()
        } catch (err) {
            if (err.response.status == 400) {
                if (err.response.data?.error) {
                    setResp({ error: err.response.data.error })
                } else {
                    setResp({ error: err.response.statusText })
                }
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
            setIsSubmit(false)
            setTimeout(() => {
                setResp({})
            }, 3000);
        }
    }

    const submissionHandler = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            updateStatus()
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {}

        if (!values.description) {
            errors.description = 'Description cannot be blank'
        }

        if (!values.type) {
            errors.type = 'Type must be selected'
        } else if (Number(values.type) == 6 && !values.trackingNo) {
            errors.trackingNo = 'Tracking no cannot be blank'
        }

        return errors
    }

    const downTrackHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const resp = await axiosInstance.put(`/api/airwaybill/downTrack/${ formValues._id }`)
            setResp({ message: "AirwayBill Tracking Down Successfully !!" })
        } catch (err) {
            if (err.response.status == 400) {
                if (err.response.data?.error) {
                    setResp({ error: err.response.data.error })
                } else {
                    setResp({ error: err.response.statusText })
                }
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
            cancelHandler()
            setIsLoading(false)
            setTimeout(() => {
                setResp({})
            }, 3000);
        }
    }

    const addNoteHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData()
        formData.append("note", formValues.note)

        try {
            const resp = await axiosInstance.put(`/api/airwaybill/addNote/${ formValues._id }`, formData)
            setResp({ message: "AirwayBill Note Updated Successfully !!" })
        } catch (err) {
            if (err.response.status == 400) {
                if (err.response.data?.error) {
                    setResp({ error: err.response.data.error })
                } else {
                    setResp({ error: err.response.statusText })
                }
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
            cancelHandler()
            setIsLoading(false)
            setTimeout(() => {
                setResp({})
            }, 3000);
        }
    }

    const voidHandler = async (e) => {
        e.preventDefault()

        try {
            const resp = await axiosInstance.put(`/api/airwaybill/void/${formValues._id}`)
            setResp({ message: "Shipment void successfully !!" })
        } catch (err) {
            console.log(err.response.statusText)
        } finally {
            cancelHandler()
            setTimeout(() => {
                setResp({})
            }, 3000)
        }
    }
    
    // Model Cancel Handler
    const cancelHandler = (e) => {
        if (e) {
            e.preventDefault()
        }        
        modelProps.setModelData({
            formName: '',
            id: '',
            style: { opacity: 0, transform: 'translateY(-100%)' },
            isOpen: false
        })

        setFormValues({ ...initValues })
    }

    const getDeliverPartners = async () => {
        try {
            const resp = await axiosInstance.get(`/api/deliverypartner/getAllActive`)
            setDeliveryPartners(resp.data)
        } catch (err) {            
            if (err.response.status == 401) {
                setResp({ error: "Not authorized to access" })
            } else if (err.response.status == 404) {
                setResp({ error: "No delivery partners found" })
            } else if (err.response.status == 500) {
                setResp({ error: err.response.statusText })
            } else {
                setResp(err.response.statusText)
            }
        }
    }

    useEffect(() => {
        if (modelProps.modelData.id && modelProps.modelData.formName == "Forward Shipment") {
            getDeliverPartners()
            setFormValues({ _id: modelProps.modelData.id })
        } else {
            setFormValues({ _id: modelProps.modelData.id })
        }
    }, [modelProps.modelData])

    const [ deliveryPartners, setDeliveryPartners ] = useState([])

    const [ statuses, setStatuses ] = useState([
        { _id: '2163ujfdzs8d82421', name: 'Arrived in Facility' },
        { _id: '2163ujfdzs8d82421', name: 'In Transit to Destination' },
        { _id: '2163ujfdzs8d82421', name: 'Prepared' },
        { _id: '2163ujfdzs8d82421', name: 'Available for Pickup' },
        { _id: '2163ujfdzs8d82421', name: 'Handover to Delivery Partner' },
        { _id: '2163ujfdzs8d82421', name: 'In Custom Clearance' },
        { _id: '2163ujfdzs8d82421', name: 'Custom Duties and Taxes Unpaid' },
        { _id: '2163ujfdzs8d82421', name: 'Cleared Custom' },
        { _id: '2163ujfdzs8d82421', name: 'Receiver Not Available' },
        { _id: '2163ujfdzs8d82421', name: 'Unable to Locate' },
        { _id: '2163ujfdzs8d82421', name: 'Not Accepted' },
        { _id: '2163ujfdzs8d82421', name: 'Out for Deliver' },
        { _id: '2163ujfdzs8d82421', name: 'Delivered' }
    ])

    const [ statusTypes, setStatusTypes ] = useState([
        { type: 2, name: 'Packed' },
        { type: 3, name: '3rd Party AWB' },
        { type: 4, name: 'Mainfiest' },
        { type: 5, name: 'Proceed' },
        { type: 6, name: 'Tracking Number Update' }
    ])
    
    return (
        <Fragment>
            <Alert resp={ resp } />
            { isLoading && <Loader message={"Processing your request..."} /> }
            <div id="overlay" className="row" style={ modelProps.modelData.style } >
                <div className="popup col g-2">
                    <div className="formHeader">
                        <h3>{ modelProps.modelData.formName }</h3>
                    </div>
                    <hr />
                    {
                        modelProps.modelData.formName == 'Up Track Shipment' ? 
                        <form className="col g-3">
                            <h3>Are you sure to Up Track?</h3>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="type">Type</label>
                                <select name="type" className='uppercase w-100' defaultValue={0} onChange={ inputHandler }>
                                    <option value={ 0 }>Select Status Type</option>
                                    {
                                        statusTypes.map(( type, index ) => (
                                            <option value={ type.type } key={ index }>{ type.name }</option>
                                        ))
                                    }
                                </select>
                                { formErrors.type && <span className='form-field-error'>{ formErrors.type }</span> }
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" rows={5} cols={70} className="uppercase w-100" defaultValue={ '' } onChange={ inputHandler }></textarea>
                                { formErrors.description && <span className='form-field-error'>{ formErrors.description }</span> }
                            </div>
                            {
                                formValues?.type == 6 &&
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="trackingNo">Tracking No</label>
                                    <input type="text" name="trackingNo" id="trackingNo" className="uppercase w-100"  onChange={ inputHandler } />                            
                                    { formErrors.trackingNo && <span className='form-field-error'>{ formErrors.trackingNo }</span> }
                                </div>
                            }
                            <div className="row g-1">
                                <button className="primary-btn" onClick={ cancelHandler }>Cancel <FaBan /></button>
                                <button type="submit" className="success-btn" onClick={ submissionHandler }>Confirm <FaCheck /></button>
                            </div>
                        </form> :
                        modelProps.modelData.formName == 'Down Track Shipment' ? 
                        <form className="col g-3">
                            <h3>Are you sure to down track?</h3>
                            <div className="row g-1">
                                <button className="primary-btn" onClick={ cancelHandler }>Cancel <FaBan /></button>
                                <button type="submit" className="success-btn" onClick={ downTrackHandler }>Confirm <FaCheck /></button>
                            </div>
                        </form> : 
                        modelProps.modelData.formName == 'Add Note' ? 
                        <form className="col g-3">
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="note">Note</label>
                                <textarea name="note" id="note" rows={5} cols={70} className="w-100" defaultValue={ '' } onChange={ inputHandler }></textarea>
                            </div>
                            <div className="row g-1">
                                <button className="primary-btn" onClick={ cancelHandler }>Cancel <FaBan /></button>
                                <button type="submit" className="success-btn" onClick={ addNoteHandler }>Confirm <FaCheck /></button>
                            </div>
                        </form> : 
                        modelProps.modelData.formName == 'Void Shipment' && 
                        <form className="col g-3">
                            <h3>Are you sure to void?</h3>
                            <div className="row g-1">
                                <button className="primary-btn" onClick={ cancelHandler }>Cancel <FaBan /></button>
                                <button type="submit" className="success-btn" onClick={ voidHandler }>Confirm <FaCheck /></button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default ShipmentModel