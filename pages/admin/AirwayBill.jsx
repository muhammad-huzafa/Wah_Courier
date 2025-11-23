import React, { Fragment, useEffect, useState } from 'react'
import { formatLocalPhoneNumber, getCurrentDate, getDiscount, getGrossTotal, getInvoiceItemTotal, getTotal } from '../../utils/helpers'
import { FaPlus, FaTrash, FaMagnifyingGlass } from 'react-icons/fa6'
import axiosInstance from '../../utils/axiosInstance'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'
import SearchResults from '../../components/admin/SearchResults'
import Alert from '../../components/Alert'
import Loader from '../../components/Loader'

const AirwayBill = () => {

    const [ services, setServices ] = useState([])
    const [ countries, setCountries ] = useState([])
    const { user } = useContext(UserContext)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ resp, setResp ] = useState({})

    const shipperInitValues = { shipperCompany: '', shipperContactPerson: '', shipperRef: '', shipperAddress: '', shipperState: '', shipperCity: '', shipperPostCode: '', shipperPhone1: '', shipperPhone2: '', shipperNtnCnicNo: '', shipperEmail: '' }
    const [ shipperDetails, setShipperDetails ] = useState({ ...shipperInitValues })

    useEffect(() => {
        getServices()
        getNewAirwayBillNo()
        getCountries()
    }, [resp])

    const getServices = async () => {
        try {
            const resp = await axiosInstance.get("/api/service/getAllActive")
            setServices(resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getNewAirwayBillNo = async () => {
        try {
            const resp = await axiosInstance.get("/api/airwaybill/getLast")
            setShipmentDetails({ ...shipmentDetails, airwayBillNo: resp.data })
        } catch (err) {
            console.log(err)
        }
    }

    const getCountries = async () => {
        try {
            const resp = await axiosInstance.get("/api/airwaybill/getCountries")
            setCountries(resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    const shipperInputHandler = (e) => {
        const { name, value } = e.target
        setShipperDetails({ ...shipperDetails, [name]: value })
    }

    const receiverInitValues = { recCompany: '', recContactPerson: '', recAddress: '', recCountry: '', recState: '', recCity: '', recPostCode: '', recPhone1: '', recPhone2: '', recFax: '', recEmail: '' }
    const [ receiverDetails, setReceiverDetails ] = useState({ ...receiverInitValues })

    const receiverInputHandler = (e) => {
        const { name, value } = e.target
        setReceiverDetails({ ...receiverDetails, [name]: value })
    }

    const shipmentInitValues = { date: getCurrentDate(), origin: 'Pakistan', service: '0', user: user.username, airwayBillNo: null, paymentType: 0, amount: '', discount: '', gst: '', grossTotal: 0, cod: -1, codAmount: '', shipmentType: 0, weight: '', pieces: '', insurance: -1, worthOfPackage: '', insuranceValue: '', remArea: -1, remarks: '' }
    const [ shipmentDetails, setShipmentDetails ] = useState({ ...shipmentInitValues })
    
    const shipmentInputHandler = (e) => {
        const { name, value } = e.target
        
        if ( name == 'discount' ) {
            // Calculate discount on amount calculate grand total
            let amount = Number(shipmentDetails.amount) || 0
            let discount = Number(value) || 0
            let gst = Number(shipmentDetails.gst) || 0
            
            setShipmentDetails((prevDetails) => ({ ...prevDetails, [name]: discount, grossTotal: getGrossTotal(amount, discount, gst) }))
        } else if ( name == 'gst' ) {            
            // Calculate discount on amount calculate grand total
            let amount = Number(shipmentDetails.amount) || 0
            let discount = Number(shipmentDetails.discount) || 0
            let gst = Number(value) || 0

            setShipmentDetails((prevDetails) => ({ ...prevDetails, [name]: gst, grossTotal: getGrossTotal(amount, discount, gst) }))
        } else if ( name == 'amount' ) {            
            // Calculate amount with grand total
            let amount = Number(value) || 0
            let discount = Number(shipmentDetails.discount) || 0
            let gst = Number(shipmentDetails.gst) || 0

            setShipmentDetails((prevDetails) => ({ ...prevDetails, [name]: amount, grossTotal: getGrossTotal(amount, discount, gst) }))
        } else if ( name == 'paymentType' || name == 'codAmount' || name == 'weight' || name == 'pieces' || name == 'worthOfPackage' || name == 'insurance' || name == 'remArea' ) {            
            setShipmentDetails({ ...shipmentDetails, [name]: Number(value) })
        } else {            
            setShipmentDetails({ ...shipmentDetails, [name]: value })
        }

    }

    const [ results, setResults ] = useState([])
    const [ isConsignorSearched, setIsConsignorSearched ] = useState(false)

    const searchConsignor = async (e) => {
        const { id } = e.target
        
        if (id == 'shipperCompany' && shipperDetails.shipperCompany != '') {
            try {
                setIsConsignorSearched(true)
    
                const resp = await axiosInstance.get(`api/customer/search?term=${ shipperDetails.shipperCompany }`)
                setResults(resp.data)
            } catch (err) {
                console.log(err)
            }

        } else if (id == 'shipperContactPerson' && shipperDetails.shipperContactPerson != '') {
            try {
                setIsConsignorSearched(true)
    
                const resp = await axiosInstance.get(`api/customer/search?term=${ shipperDetails.shipperContactPerson }`)
                setResults(resp.data)
            } catch (err) {
                console.log(err)
            }

        }
    }

    const searchConsignee = async (e) => {
        const { id } = e.target

        if (id == 'recCompany' && receiverDetails.recCompany != '') {
            try {
                setIsConsignorSearched(false)
    
                const resp = await axiosInstance.get(`api/customer/search?term=${ receiverDetails.recCompany }`)
                setResults(resp.data)
            } catch (err) {
                console.log(err)
            }

        } else if (id == 'recContactPerson' && receiverDetails.recContactPerson != '') {
            try {
                setIsConsignorSearched(false)
    
                const resp = await axiosInstance.get(`api/customer/search?term=${ receiverDetails.recContactPerson }`)
                setResults(resp.data)
            } catch (err) {
                console.log(err)
            }

        }
    }

    const initDimensionsValues = { length: '', width: '', height: '' }
    const [ dimValues, setDimensionsValues ] = useState([{ ...initDimensionsValues }])

    const dimensionsHandler = (e) => {
        e.preventDefault()
        const { name } = e.target
        if ( name == 'add' ) {
            setDimensionsValues((prevDetails) => ([ ...prevDetails, { ...initDimensionsValues }]))
        } else if ( name == 'delete' ) {
            setDimensionsValues((prevDetails) => (
                prevDetails.length > 1 ? prevDetails.slice(0, -1) : prevDetails
            ))
        }
    }

    const dimensionsInputHandler = (e) => {
        const { name, value } = e.target
        const index = Number(e.target.closest('tr').childNodes[0].innerText.split(" ")[0] - 1)
        
        setDimensionsValues((prevDetails) =>
            prevDetails.map((dim, i) =>
                i === index ? { ...dim, [name]: Number(value) } : dim
            )
        )
    }
    

    const initInvoiceValues = { description: '', quantity: '', price: '', total: '' }
    const [ invoiceValues, setInvoiceValues ] = useState([{ ...initInvoiceValues }])

    const invoiceHandler = (e) => {
        e.preventDefault()
        const { name } = e.target 
        if ( name == 'add' ) {
            setInvoiceValues((prevDetails) => ([ ...prevDetails, { ...invoiceValues }]))
        } else if ( name == 'delete' ) {
            setInvoiceValues((prevDetails) => (
                prevDetails.length > 1 ? prevDetails.slice(0, -1) : prevDetails
            ))
        }
    }


    const invoiceInputHandler = (e) => {
        const { name, value } = e.target
        const index = Number(e.target.closest('tr').childNodes[0].innerText.split(" ")[0] - 1)
        
        if ( name == 'quantity' ) {
            setInvoiceValues((prevDetails) =>
                prevDetails.map((inv, i) =>
                    i === index ? { ...inv, [name]: Number(value) || 1, total: getInvoiceItemTotal(value, inv.price) } : inv
                )
            )
        } else if ( name == 'price' ) {
            setInvoiceValues((prevDetails) =>
                prevDetails.map((inv, i) =>
                    i === index ? { ...inv, [name]: Number(value) || 1, total: getInvoiceItemTotal(inv.quantity, value) } : inv
                )
            )
        } else if ( name == 'description' ) {
            setInvoiceValues((prevDetails) =>
                prevDetails.map((inv, i) =>
                    i === index ? { ...inv, [name]: value } : inv
                )
            )
        }
    }

    const [ idFront, setIdFront ] = useState()
    const [ idBack, setIdBack ] = useState()
    const [ customCopiesNTN, setCustomCopiesNTN ] = useState()

    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ shipperErrors, setShipperErrors ] = useState({})
    const [ receiverErrors, setReceiverErrors ] = useState({})
    const [ shipmentErrors, setShipmentErrors ] = useState({})

    const shipmentBookingHandler = (e) => {
        e.preventDefault()
        setShipperErrors(validateShipper(shipperDetails))
        setReceiverErrors(validateReciever(receiverDetails))
        setShipmentErrors(validateShipment(shipmentDetails))
        setIsSubmit(true)
        window.scrollTo(0, 0)
    }

    const validateShipper = (values) => {
        const errors = {}

        if (!values.shipperCompany) {
            errors.shipperCompany = 'Company cannot be blank'
        } 

        if (!values.shipperContactPerson) {
            errors.shipperContactPerson = 'Contact person cannot be blank'
        }

        if (!values.shipperPhone1) {
            errors.shipperPhone1 = 'Mobile cannot be blank'
        }

        if (!values.shipperNtnCnicNo) {
            errors.shipperNtnCnicNo = 'NTN/CNIC cannot be blank'
        }
        
        return errors
    }

    const validateReciever = (values) => {
        const errors = {}

        if (!values.recCompany) {
            errors.recCompany = 'Company cannot be blank'
        }

        if (!values.recContactPerson) {
            errors.recContactPerson = 'Contact person cannot be blank'
        }

        if (!values.recAddress) {
            errors.recAddress = 'Address cannot be blank'
        }

        if (!values.recCountry) {
            errors.recCountry = 'Country must be selected'
        }

        if (!values.recCity) {
            errors.recCity = 'City cannot be blank'
        }

        if (!values.recPostCode) {
            errors.recPostCode = 'Post code cannot be blank'
        }

        if (!values.recPhone1) {
            errors.recPhone1 = 'Mobile cannot be blank'
        }

        return errors
    }

    const validateShipment = (values) => {
        const errors = {}

        if (values.service == 0) {
            errors.service = 'Service must be selected'
        }

        if (!values.user) {
            errors.user = 'User is required'
        }

        if (!values.airwayBillNo) {
            errors.airwayBillNo = 'Airway Bill No is required'
        }

        if (values.paymentType == 0) {
            errors.paymentType = 'Payment type must be selected'
        }

        if (!values.amount) {
            errors.amount = 'Amount cannot be blank'
        }

        if (values.cod == -1) {
            errors.cod = 'COD must be selected'
        }

        if (values.cod == 1 && !values.codAmount) {
            errors.codAmount = 'COD Amount cannot be blank'
        }

        if (values.shipmentType == 0) {
            errors.shipmentType = 'Shipment Type must be selected'
        }

        if (!values.weight) {
            errors.weight = 'Weight cannot be blank'
        }

        if (!values.pieces) {
            errors.pieces = 'Pieces cannot be blank'
        }

        if (values.insurance == 1 && !values.worthOfPackage) {
            errors.worthOfPackage = 'Worth of Package must be defined'
        }

        if (values.insurance == 1 && !values.insuranceValue) {
            errors.insuranceValue = 'Insurance value must be defined'
        }

        if (values.remArea == -1) {
            errors.remArea = 'Remote Area must be selected'
        }
        
        return errors
    }

    useEffect(() => {
        if (Object.keys(shipperErrors).length === 0 && Object.keys(receiverErrors).length === 0 && Object.keys(shipmentErrors).length === 0 && isSubmit) {
            addAirwayBill()
        }
    }, [shipperErrors, receiverErrors, shipmentErrors])
    

    const [ printCheck, setPrintCheck ] = useState(false)

    const printHandler = () => {
        setPrintCheck(!printCheck)
    }

    const addAirwayBill = async () => {
        setIsLoading(true)
        try {
            const formData = new FormData()

            // Shipper Details
            formData.append("shipperDetails", JSON.stringify(shipperDetails))
            formData.append("shipperIDFront", idFront)
            formData.append("shipperIDBack", idBack)
            formData.append("customNTN", customCopiesNTN)
            
            // Reciever Details
            formData.append("receiverDetails", JSON.stringify(receiverDetails))
            
            // Shipment Details
            formData.append("origin", shipmentDetails.origin)
            formData.append("service", shipmentDetails.service)
            formData.append("airwayBillNo", shipmentDetails.airwayBillNo)
            formData.append("paymentType", shipmentDetails.paymentType)
            formData.append("amount", shipmentDetails.amount)
            formData.append("discount", shipmentDetails.discount)
            formData.append("gst", shipmentDetails.gst)
            formData.append("cod", shipmentDetails.cod)
            formData.append("codAmount", shipmentDetails.codAmount)
            formData.append("shipmentType", shipmentDetails.shipmentType)
            formData.append("weight", shipmentDetails.weight)
            formData.append("pieces", shipmentDetails.pieces)
            formData.append("insurance", shipmentDetails.insurance)
            formData.append("worthOfPackage", shipmentDetails.worthOfPackage)
            formData.append("remArea", shipmentDetails.remArea)
            formData.append("remarks", shipmentDetails.remarks)

            // Dimensions Details
            formData.append("dimValues", JSON.stringify(dimValues))

            // Invoices Details
            formData.append("invoiceValues", JSON.stringify(invoiceValues))


            const resp = await axiosInstance.post("/api/airwaybill/create", formData)
            setResp({ message: "AirwayBill added successfully !!" })
            
            if (printCheck) {
                window.open(`/admin/dashboard/receipt/${resp.data.id}`, '_blank')
            } else {
                console.log("No Print")
            }

            // Reload when succeeded
            window.location.reload()
            
            // if (form)
        } catch (err) {
            if (err.response.status == 400) {
                if (err.response.data?.errors) {
                    setResp({ error: err.response.data.errors[0].msg })
                } else if (err.response.data?.error) {
                    setResp({ error: err.response.data.error })
                } else {
                    setResp({ error: err.response.statusText })
                }
            } else if (err.response.status == 401) {
                setResp({ error: 'Not authorized to access' })
            } else if (err.response.status == 404) {
                setResp({ error: "Center doesn't exists" })
            } else if (err.response.status == 500) {
                if (err.response.data?.error) {
                    setResp({ error: err.response.data.error })
                } else {
                    setResp({ error: err.response.statusText })
                }
            } else {
                setResp({ error: err.response.statusText })
            }
        } finally {
            setTimeout(() => {
                setResp({})
            }, 3000)
            setIsLoading(false)
            setIsSubmit(false)
        }
    }

    return (
        <Fragment>
            { isLoading && <Loader message={"Processing your request..."} /> }
            <Alert resp={ resp } />
            <SearchResults res={{ results, setResults }} shipper={{ shipperDetails, setShipperDetails }} rec={{ receiverDetails, setReceiverDetails }} isConsignor={ isConsignorSearched }/>
            <div className="popup shipPopup col w-100 g-3">
                <div className="formHeader row">
                    <h2 className="uppercase">Add New Shipment</h2>
                </div>
                <form className="form col g-3 w-100" method="POST" encType="multipart/form-data">
                    <div className='row ai-stretch jc-between g-2 w-100'>
                        <div className='form-field ai-start col w-100'>
                            <label htmlFor="date">Date</label>
                            <input type="date" name="date" disabled id="currDate" className='w-100' value={ shipmentDetails.date } />
                            {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                        </div>
                        <div className='form-field ai-start col w-100'>
                            <label htmlFor="origin">Country</label>
                            <select name="origin" id="origin" className="uppercase w-100" defaultValue={ shipmentDetails.origin }>
                                <option disabled value="0">Please Select</option>
                                <option value="Pakistan">Pakistan</option>
                            </select>
                            {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                        </div>
                        <div className='form-field ai-start col w-100'>
                            <label htmlFor="service">Service</label>
                            <select name="service" id="service" className="uppercase w-100" defaultValue={ shipmentDetails.service } onChange={ shipmentInputHandler }>
                                <option disabled value="0">Please Select</option>
                                {
                                    services && services.map(( service, index ) => (
                                        <option value={service._id} key={ index }>{ service.name }</option>
                                    ))
                                }
                            </select>
                            { shipmentErrors.service && <span className='form-field-error'>{ shipmentErrors.service }</span> }
                        </div>
                        <div className='form-field ai-start col w-100'>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" className="uppercase w-100" disabled value={ shipmentDetails.user } />
                            { shipmentErrors.user && <span className='form-field-error'>{ shipmentErrors.user }</span> }
                        </div>
                        <div className='form-field ai-start col w-100'>
                            <label htmlFor="awBillNo">Airway BillNo: </label>
                            <input type="number" name="awBillNo" className="uppercase w-100" value={ shipmentDetails.airwayBillNo } disabled />
                            { shipmentErrors.airwayBillNo && <span className='form-field-error'>{ shipmentErrors.airwayBillNo }</span> }
                        </div>
                    </div>
                    <div className="row g-3 w-100">
                        <div className="col g-3 w-100">
                            <div className="formHeader row">
                                <h2 className="uppercase">Shipper Details</h2>
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="shipperCompany">Company <span className="required">*</span></label>
                                <div className='row g-2 w-100'>
                                    <input type="text" name="shipperCompany" id="shipperCompany" className='w-100' value={ shipperDetails.shipperCompany } onChange={ shipperInputHandler } />
                                    <div className='searchIcon row' id='shipperCompany' onClick={ searchConsignor } >
                                        <FaMagnifyingGlass />
                                    </div>
                                </div>
                                { shipperErrors.shipperCompany && <span className='form-field-error'>{ shipperErrors.shipperCompany }</span> }
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="shipperContactPerson">Contact Person <span className="required">*</span></label>
                                    <div className='row g-2 w-100'>
                                        <input type="text" name="shipperContactPerson" id="shipperContactPerson" className='w-100' value={ shipperDetails.shipperContactPerson } onChange={ shipperInputHandler } />
                                        <div className='searchIcon row' id='shipperContactPerson' onClick={ searchConsignor } >
                                            <FaMagnifyingGlass />
                                        </div>
                                    </div>
                                    { shipperErrors.shipperCompany && <span className='form-field-error'>{ shipperErrors.shipperCompany }</span> }
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="shipperRef">Ref</label>
                                    <input type="text" name="shipperRef" id="shipperRef" className='w-100' value={ shipperDetails.shipperRef } onChange={ shipperInputHandler } />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="shipperAddress">Address</label>
                                <textarea name="shipperAddress" id="shipperAddress" rows="3" className='w-100' value={ shipperDetails.shipperAddress } onChange={ shipperInputHandler } ></textarea>
                                {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="shipperState">State</label>
                                    <input type="text" name="shipperState" id="shipperState" className='w-100' value={ shipperDetails.shipperState } onChange={ shipperInputHandler } />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="shipperCity">City</label>
                                    <input type="text" name="shipperCity" id="shipperCity" className='w-100' value={ shipperDetails.shipperCity } onChange={ shipperInputHandler } />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="shipperPostCode">Post Code</label>
                                    <input type="number" name="shipperPostCode" id="shipperPostCode" className='w-100' value={ shipperDetails.shipperPostCode } onChange={ shipperInputHandler } />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="shipperPhone1">Mobile 1 <span className="required">*</span></label>
                                    <input type="tel" name="shipperPhone1" id="shipperPhone1" className='w-100' value={ shipperDetails.shipperPhone1 } onChange={ shipperInputHandler } />
                                    { shipperErrors.shipperPhone1 && <span className='form-field-error'>{ shipperErrors.shipperPhone1 }</span> }
                                </div>
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="shipperPhone2">Mobile 2</label>
                                    <input type="number" name="shipperPhone2" id="shipperPhone2" className='w-100' value={ shipperDetails.shipperPhone2 } onChange={ shipperInputHandler } />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="shipperNtnCnicNo">NTN/CNIC # <span className="required">*</span></label>
                                    <input type="tel" name="shipperNtnCnicNo" id="shipperNtnCnicNo" className='w-100' value={ shipperDetails.shipperNtnCnicNo } onChange={ shipperInputHandler } />
                                    { shipperErrors.shipperNtnCnicNo && <span className='form-field-error'>{ shipperErrors.shipperNtnCnicNo }</span> }
                                </div>
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="shipperEmail">Email</label>
                                <input type="email" name="shipperEmail" id="shipperEmail" className='w-100' value={ shipperDetails.shipperEmail } onChange={ shipperInputHandler } />
                                {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                            </div>
                            <div className='row ai-stretch g-3 w-100 f-wrap'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="shipperIDFront">ID Card (Front)</label>
                                    <input type="file" name="shipperIDFront" id="shipperIDFront" className="w-100" onChange={(e) => setIdFront(e.target.files[0])}/>
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="shipperIDBack">ID Card (Back)</label>
                                    <input type="file" name="shipperIDBack" id="shipperIDBack" className="w-100" onChange={(e) => setIdBack(e.target.files[0])} />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="customCopiesNTN">Custom Copies/NTN:</label>
                                    <input type="file" name="customCopiesNTN" id="customCopiesNTN" className="w-100" onChange={(e) => setCustomCopiesNTN(e.target.files[0])} />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                            </div>
                            
                            <div className="formHeader row">
                                <h2 className="uppercase">Receiver Details</h2>
                            </div>
                            
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="recCompany">Company <span className="required">*</span></label>
                                <div className='row g-2 w-100'>
                                    <input type="text" name="recCompany" id="recCompany" className='w-100' value={ receiverDetails.recCompany } onChange={ receiverInputHandler } />
                                    <div className='searchIcon row' id='recCompany' onClick={ searchConsignee } >
                                        <FaMagnifyingGlass />
                                    </div>
                                </div>
                                { receiverErrors.recCompany && <span className='form-field-error'>{ receiverErrors.recCompany }</span> }
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="recContactPerson">Contact Person <span className="required">*</span></label>
                                <div className='row g-2 w-100'>
                                    <input type="text" name="recContactPerson" id="recContactPerson" className='w-100' value={ receiverDetails.recContactPerson } onChange={ receiverInputHandler } />
                                    <div className='searchIcon row' id='recContactPerson' onClick={ searchConsignee } >
                                        <FaMagnifyingGlass />
                                    </div>
                                </div>
                                { receiverErrors.recContactPerson && <span className='form-field-error'>{ receiverErrors.recContactPerson }</span> }
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="recAddress">Address <span className="required">*</span></label>
                                <input type="text" name="recAddress" id="recAddress" className='w-100' value={ receiverDetails.recAddress } onChange={ receiverInputHandler } />
                                { receiverErrors.recAddress && <span className='form-field-error'>{ receiverErrors.recAddress }</span> }
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="recCountry">Country <span className="required">*</span></label>
                                    <select name="recCountry" id="recCountry" className='w-100' defaultValue={ receiverDetails.recCountry } onChange={ receiverInputHandler } >
                                        <option disabled value="0">Please Select</option>
                                        {
                                            countries && countries.map((country, index) => (
                                                <option value={ country.name } key={ index }>{ country.name }</option>
                                            ))
                                        }
                                    </select>
                                    { receiverErrors.recCountry && <span className='form-field-error'>{ receiverErrors.recCountry }</span> }
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="recState">State</label>
                                    <input type="text" name="recState"  id="recState" className='w-100' value={ receiverDetails.recState } onChange={ receiverInputHandler } />
                                    {/* { receiverErrors.recState && <span className='form-field-error'>{ receiverErrors.recState }</span> } */}
                                </div>
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="recCity">City <span className="required">*</span></label>
                                    <input type="text" name="recCity"  id="recCity" className='w-100' value={ receiverDetails.recCity } onChange={ receiverInputHandler } />
                                    { receiverErrors.recCity && <span className='form-field-error'>{ receiverErrors.recCity }</span> }
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="recPostCode">Post Code <span className="required">*</span></label>
                                    <input type="text" name="recPostCode"  id="recPostCode" className="w-100" value={ receiverDetails.recPostCode } onChange={ receiverInputHandler } />
                                    { receiverErrors.recPostCode && <span className='form-field-error'>{ receiverErrors.recPostCode }</span> }
                                </div>
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="recPhone1">Phone 1 <span className="required">*</span></label>
                                    <input type="text" name="recPhone1" id="recPhone1" className="w-100" value={ receiverDetails.recPhone1 } onChange={ receiverInputHandler } />
                                    { receiverErrors.recPhone1 && <span className='form-field-error'>{ receiverErrors.recPhone1 }</span> }
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="recPhone2">Phone 2</label>
                                    <input type="text" name="recPhone2" id="recPhone2" className="w-100" value={ receiverDetails.recPhone2 } onChange={ receiverInputHandler } />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="recFAX">Fax</label>
                                    <input type="text" name="recFAX" id="recFAX" className="w-100" value={ receiverDetails.recFax } onChange={ receiverInputHandler } />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="recEmail">Email</label>
                                    <input type="email" name="recEmail" id="recEmail" className="w-100" value={ receiverDetails.recEmail } onChange={ receiverInputHandler } />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                            </div>
                        </div>
                        <div className="col g-3 w-100">
                            <div className="formHeader row">
                                <h2 className="uppercase">Shipment Details</h2>
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="paymentType">Payment <span className="required">*</span></label>
                                    <select name="paymentType" id="paymentType" className="uppercase w-100" defaultValue={ shipmentDetails.paymentType } onChange={ shipmentInputHandler } >
                                        <option disabled value="0">Please Select</option>
                                        <option value="1">Cash</option>
                                        <option value="2">Credit</option>
                                    </select>
                                    { shipmentErrors.paymentType && <span className='form-field-error'>{ shipmentErrors.paymentType }</span> }
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="amount">Amount <span className="required">*</span></label>
                                    <input type="number" name="amount" id="amount" min="1" step="0.01" className='w-100' value={ shipmentDetails.amount } onChange={ shipmentInputHandler } />
                                    { shipmentErrors.amount && <span className='form-field-error'>{ shipmentErrors.amount }</span> }
                                </div>
                            </div>                 
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="discount">Discount (Rs)</label>
                                    <input type="number" name="discount" id="discount" min="0" value={ shipmentDetails.discount } step="0.01" className='w-100' onChange={ shipmentInputHandler } />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="gst">GST (%)</label>
                                    <input type="number" name="gst" id="gst" min="0" value={ shipmentDetails.gst } step="0.01" className='w-100' onChange={ shipmentInputHandler } />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="grossTotal">Total</label>
                                    <input type="number" name="grossTotal" id="grossTotal" min="0" value={ shipmentDetails.grossTotal } step="0.01" className='w-100' readOnly />
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="cod">COD/Non-COD <span className="required">*</span></label>
                                    <select name="cod" id="cod" className="uppercase w-100" defaultValue={ shipmentDetails.cod } onChange={ shipmentInputHandler } >
                                        <option disabled value="-1">Please Select</option>
                                        <option value="1">COD</option>
                                        <option value="0">Non-COD</option>
                                    </select>
                                    { shipmentErrors.cod && <span className='form-field-error'>{ shipmentErrors.cod }</span> }
                                </div>
                                {
                                    shipmentDetails.cod == 1 &&
                                    <div className='form-field ai-start col w-100'>
                                        <label htmlFor="codAmount">COD Amount <span className="required">*</span></label>
                                        <input type="number" name="codAmount" id="codAmount" min="0" value={ shipmentDetails.codAmount } step="0.01" className='w-100' onChange={ shipmentInputHandler } />
                                        { shipmentErrors.codAmount && <span className='form-field-error'>{ shipmentErrors.codAmount }</span> }
                                    </div>
                                }
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="shipmentType">Shipment Type <span className="required">*</span></label>
                                <select name="shipmentType" id="shipmentType" className="uppercase w-100" defaultValue={ shipmentDetails.shipmentType } onChange={ shipmentInputHandler } >
                                    <option disabled value="0">Please Select</option>
                                    <option value="1">Document</option>
                                    <option value="2">Parcel</option>
                                </select>
                                { shipmentErrors.shipmentType && <span className='form-field-error'>{ shipmentErrors.shipmentType }</span> }
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="weight">Weight(Kg) <span className="required">*</span></label>
                                    <input type="number" name="weight" step="0.01" className='w-100' value={ shipmentDetails.weight } onChange={ shipmentInputHandler } />
                                    { shipmentErrors.weight && <span className='form-field-error'>{ shipmentErrors.weight }</span> }
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="pieces">Pieces <span className="required">*</span></label>
                                    <input type="number" name="pieces" min='0' className='w-100' value={ shipmentDetails.pieces } onChange={ shipmentInputHandler } />
                                    { shipmentErrors.pieces && <span className='form-field-error'>{ shipmentErrors.pieces }</span> }
                                </div>
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="insurance">Insurance</label>
                                    <div className='row w-100 g-1 jc-start'>
                                        Yes <input type="radio" name="insurance" id='insYes' value="1" onChange={ shipmentInputHandler } />
                                        No <input type="radio" name="insurance" id='insNo' value="0" onChange={ shipmentInputHandler } /> 
                                    </div>
                                    {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="remArea">Remote Area</label>
                                    <div className='row w-100 g-1 jc-start'>
                                        Yes <input type="radio" name="remArea" id='remYes' value="1" onChange={ shipmentInputHandler } />
                                        No <input type="radio" name="remArea" id='remNo' value="0" onChange={ shipmentInputHandler } /> 
                                    </div>
                                    { shipmentErrors.remArea && <span className='form-field-error'>{ shipmentErrors.remArea }</span> }
                                </div>
                            </div>
                            {
                                shipmentDetails.insurance == 1 &&
                                <div className='row ai-stretch g-2 w-100'>
                                    <div className='form-field ai-start col w-100'>
                                        <label htmlFor="worthOfPackage">Worth</label>
                                        <input type="number" name="worthOfPackage" id='worthOfPackage' value={ shipmentDetails.worthOfPackage } className='w-100' onChange={ shipmentInputHandler } />
                                        { shipmentErrors.worthOfPackage && <span className='form-field-error'>{ shipmentErrors.worthOfPackage }</span> }
                                    </div>
                                    <div className='form-field ai-start col w-100'>
                                        <label htmlFor="insuranceValue">Insurance Value</label>
                                        <input type="text" name="insuranceValue" value={ shipmentDetails.insuranceValue } step="0.01" className='w-100' readOnly/>
                                        { shipmentErrors.insuranceValue && <span className='form-field-error'>{ shipmentErrors.insuranceValue }</span> }
                                    </div>
                                </div>
                            }                       
                            <div className="formHeader row">
                                <h2 className="uppercase">Dimensions</h2>
                            </div>
                            <table border="1" id="dimensionsTable">
                                <thead>
                                    <tr>
                                        <th>SNo.</th>
                                        <th>Length</th>
                                        <th>Width</th>
                                        <th>Height</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody id="dimensionsTableBody">
                                    {
                                        dimValues && dimValues.map((dim, index) => (
                                            <tr key={ index }>
                                                <td>{ index + 1 } <span className="required">*</span></td>
                                                <td>
                                                    <input type="number" name="length" value={ dim.length } onChange={ dimensionsInputHandler } />
                                                </td>
                                                <td>
                                                    <input type="number" name="width" value={ dim.width } onChange={ dimensionsInputHandler } />
                                                </td>
                                                <td>
                                                    <input type="number" name="height" value={ dim.height } onChange={ dimensionsInputHandler } />
                                                </td>
                                                <td>
                                                    { index != 0 && <button className="danger-btn" name='delete' onClick={ dimensionsHandler } >Delete</button> }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4}></td>
                                        <td>
                                            <button className="success-btn" name='add' onClick={ dimensionsHandler }>Add</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="formHeader row">
                                <h2 className="uppercase">Invoice Details (*)</h2>
                            </div>
                            <table border="1" id="invoiceTable">
                                <thead>
                                    <tr>
                                        <th>SNo.</th>
                                        <th>Description</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody id="invoiceTableBody">
                                    {
                                        invoiceValues && invoiceValues.map((inv, index) => (
                                            <tr key={ index }>
                                                <td>{ index + 1 }</td>
                                                <td>
                                                    <input type="text" name="description" value={ inv.description } onChange={ invoiceInputHandler } />
                                                </td>
                                                <td>
                                                    <input type="number" name="quantity" value={ inv.quantity } onChange={ invoiceInputHandler } />
                                                </td>
                                                <td>
                                                    <input type="number" name="price" value={ inv.price } onChange={ invoiceInputHandler } />
                                                </td>
                                                <td>
                                                    <input type="number" name="total" value={ inv.total } readOnly />
                                                </td>
                                                <td>
                                                    { index != 0 && <button className="danger-btn" name='delete' onClick={ invoiceHandler } >Delete</button> }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={5}></td>
                                        <td>
                                            <button className="success-btn" name='add' onClick={ invoiceHandler }>Add</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="remarks">Remarks</label>
                                <textarea type="text" name="remarks" id='remarks' rows="7" className='w-100' value={ shipmentDetails.remarks } onChange={ shipmentInputHandler } ></textarea>
                                {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="printCheck">Print Invoice</label>
                                <div className='row w-100 g-1 jc-start'>
                                    <input type="checkbox" name="printCheck" id="printCheck" style={{ width: 'max-content' }} onChange={ printHandler } checked={ printCheck } /> Yes
                                </div>
                                {/* { formErrors.name && <span className='form-field-error'>{ formErrors.name }</span> } */}
                            </div>
                        </div>
                    </div>
                    <div className="row g-2">
                        <button className="primary-btn">Cancel</button>
                        <button type="submit" className="success-btn" onClick={ shipmentBookingHandler }>Add Shipment</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default AirwayBill
