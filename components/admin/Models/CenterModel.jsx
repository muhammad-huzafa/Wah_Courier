import React, { Fragment, useEffect, useState } from 'react'
import { FaBan, FaPenToSquare, FaCheck } from 'react-icons/fa6'
import axiosInstance from '../../../utils/axiosInstance'
import Alert from '../../Alert'
import Loader from '../../Loader'

const CenterModel = ({ modelProps }) => {
    // Center CRUD   
    const initValues = { _id: '', centerName: "", centerAddress: "", email: "", username: "", password: "", confirmPassword: "", fullName: "", phone: "" }
    const [ formValues, setFormValues ] = useState({ ...initValues })
    const [ formErrors, setFormErrors ] = useState({})
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ resp, setResp ] = useState({})

    const inputHandler = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const addHandler = async () => {
        setIsLoading(true)
        const formData = new FormData()

        formData.append('centerName', formValues.centerName)
        formData.append('centerAddress', formValues.centerAddress)
        formData.append('email', formValues.email)
        formData.append('username', formValues.username)
        formData.append('password', formValues.password)
        formData.append('fullName', formValues.fullName)

        if (formValues.phone) {
            formData.append('phone', formValues.phone)
        }

        try {
            const resp = await axiosInstance.post("/api/center/create", formData)
            setResp({ message: "Center added successfully !!" })
            cancelHandler()
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

    const editHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()

        formData.append('centerName', formValues.centerName)
        formData.append('centerAddress', formValues.centerAddress)
        formData.append('email', formValues.email)
        formData.append('username', formValues.username)
        if (formValues.password) { formData.append('password', formValues.password) }
        formData.append('fullName', formValues.fullName)
        if (formValues.phone) { formData.append('phone', formValues.phone) }

        try {
            const resp = await axiosInstance.put(`/api/center/update/${ formValues._id }`, formData)
            setResp({ message: "Center updated successfully !!" })
            cancelHandler()
        } catch (err) {
            if (err.response.status == 400) {
                setResp({ error: err.response.statusText })
            } else if (err.response.status == 401) {
                setResp({ error: 'Not authorized to access' })
            } else if (err.response.status == 404) {
                setResp({ error: "Center doesn't exists" })
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

    const deleteHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const resp = await axiosInstance.put(`/api/center/delete/${ formValues._id }`)
            setResp({ message: "Center deleted successfully !!" })
            cancelHandler()
        } catch (err) {
            if (err.response.status == 400) {
                setResp({ error: err.response.statusText })
            } else if (err.response.status == 401) {
                setResp({ error: 'Not authorized to access' })
            } else if (err.response.status == 404) {
                setResp({ error: "Center doesn't exists" })
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

    const activeHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const resp = await axiosInstance.put(`/api/center/active/${ formValues._id }`)
            setResp({ message: "Center active successfully !!" })
            cancelHandler()
        } catch (err) {
            if (err.response.status == 400) {
                setResp({ error: err.response.statusText })
            } else if (err.response.status == 401) {
                setResp({ error: 'Not authorized to access' })
            } else if (err.response.status == 404) {
                setResp({ error: "Center doesn't exists" })
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

    const inActiveHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const resp = await axiosInstance.put(`/api/center/inactive/${ formValues._id }`)
            setResp({ message: "Center inactive successfully !!" })
            cancelHandler()
        } catch (err) {
            if (err.response.status == 400) {
                setResp({ error: err.response.statusText })
            } else if (err.response.status == 401) {
                setResp({ error: 'Not authorized to access' })
            } else if (err.response.status == 404) {
                setResp({ error: "Center doesn't exists" })
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

    const getCenterInfo = async () => {
        try {
            const resp = await axiosInstance.get(`/api/center/getone/${ modelProps.modelData.id }`)
            setFormValues(resp.data)
        } catch (err) {            
            if (err.response.status == 401) {
                setResponse({ error: "Not authorized to access" })
            } else if (err.response.status == 404) {
                setResponse({ error: "Center doesn't exists" })
            } else if (err.response.status == 500) {
                setResponse({ error: err.response.statusText })
            } else {
                setResponse(err.response.statusText)
            }
        }
    }

    useEffect(() => {
      if (modelProps.modelData.id) {
        getCenterInfo()
      } else {
        // Handle New Submission
      }
    }, [modelProps.modelData])


    const submissionHandler = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
    }

    // Submission 
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            addHandler()
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {}

        if (!values.centerName) {
            errors.centerName = 'Center name cannot be blank'
        }

        if (!values.centerAddress) {
            errors.centerAddress = 'Center address cannot be blank'
        }
        
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        
        if (!values.email) {
            errors.email = 'Email cannot be blank'
        } else if (!emailRegex.test(values.email)) {
            errors.email = 'Enter a valid email address'
        }  

        if (!values.username) {
            errors.username = 'Center username cannot be blank'
        }

        if (!values.password) {
            errors.password = "Password cannot be blank"
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = "Canfirm password cannot be blank"
        } else if (values.password != values.confirmPassword) {
            errors.confirmPassword = "Confirm password isn't matched"
        }

        if (!values.fullName) {
            errors.fullName = 'Full name cannot be blank'
        }

        if (values.phone) {
            const phone = Number(values.phone)

            if (!phone) {
                errors.phone = 'Phone number should be valid'
            }
        }

        return errors
    }
    
    
    return (
        <Fragment>
            <Alert resp={ resp } />
            { isLoading && <Loader message={"Processing your request.."} /> }
            <div id="overlay" className="row" style={ modelProps.modelData.style } >
                <div className="popup col g-2">
                    <div className="formHeader">
                        <h3>{ modelProps.modelData.formName }</h3>
                    </div>
                    <hr />
                    {
                        modelProps.modelData.formName == 'Add Center' || modelProps.modelData.formName == 'Edit Center' ?
                        <form className="col g-3">
                            <div className="formHeader">
                                <h3>Center Info</h3>
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="centerName">Center Name <span className="required">*</span></label>
                                <input type="text" name="centerName" id="centerName" className="w-100" value={ formValues.centerName } onChange={ inputHandler } />
                                { formErrors.centerName && <span className='form-field-error'>{ formErrors.centerName }</span> }
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="centerAddress">Center Address</label>
                                <textarea name="centerAddress" id="centerAddress" rows={3} className='w-100' value={ formValues.centerAddress } onChange={ inputHandler }></textarea>
                                { formErrors.centerAddress && <span className='form-field-error'>{ formErrors.centerAddress }</span> }
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="username">Username <span className="required">*</span></label>
                                <input type="text" name="username" id="username" className="w-100" value={ formValues.username } onChange={ inputHandler } />
                                { formErrors.username && <span className='form-field-error'>{ formErrors.username }</span> }
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="Email">Email <span className="required">*</span></label>
                                <input type="email" name="email" id="email" className="w-100" value={ formValues.email } onChange={ inputHandler } />
                                { formErrors.email && <span className='form-field-error'>{ formErrors.email }</span> }
                            </div>
                            <div className='row ai-stretch g-2 w-100'>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="password">Password <span className="required">*</span></label>
                                    <input type="password" name="password" id="password" className="w-100" value={ formValues.password } onChange={ inputHandler } />
                                    { formErrors.password && <span className='form-field-error'>{ formErrors.password }</span> }
                                </div>
                                <div className='form-field ai-start col w-100'>
                                    <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" className="w-100" value={ formValues.confirmPassword } onChange={ inputHandler } />
                                    { formErrors.confirmPassword && <span className='form-field-error'>{ formErrors.confirmPassword }</span> }
                                </div>
                            </div>
                            <div className="formHeader">
                                <h3>Representative Info</h3>
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                                <input type="text" name="fullName" id="fullName" className="w-100" value={ formValues.fullName } onChange={ inputHandler } />
                                { formErrors.fullName && <span className='form-field-error'>{ formErrors.fullName }</span> }
                            </div>
                            <div className='form-field ai-start col w-100'>
                                <label htmlFor="phone">Contact No <span className="required">*</span></label>
                                <input type="tel" name="phone" id="phone" className="w-100" value={ formValues.phone } onChange={ inputHandler } />
                                { formErrors.phone && <span className='form-field-error'>{ formErrors.phone }</span> }
                            </div>
                            <div className="row g-1">
                                <button className="primary-btn" onClick={ cancelHandler }>Cancel <FaBan /></button>
                                { modelProps.modelData.formName == 'Add Center' && <button type="submit" className="success-btn" onClick={ submissionHandler } >Add <FaCheck /></button> }
                                { modelProps.modelData.formName == 'Edit Center' && <button type="submit" className="success-btn" onClick={ editHandler }>Save <FaCheck /></button> }                       
                            </div>
                        </form> :
                        modelProps.modelData.formName == 'Delete Center' ? 
                        <form className="col g-3">
                            <h3>Are you sure to delete?</h3>
                            <div className="row g-1">
                                <button className="primary-btn" onClick={ cancelHandler }>Cancel <FaBan /></button>
                                <button type="submit" className="success-btn" onClick={ deleteHandler }>Confirm <FaCheck /></button>
                            </div>
                        </form> :
                        modelProps.modelData.formName == 'Active Center' ? 
                        <form className="col g-3">
                            <h3>Are you sure to active?</h3>
                            <div className="row g-1">
                                <button className="primary-btn" onClick={ cancelHandler }>Cancel <FaBan /></button>
                                <button type="submit" className="success-btn" onClick={ activeHandler }>Confirm <FaCheck /></button>
                            </div>
                        </form> :
                        modelProps.modelData.formName == 'Inactive Center' &&
                        <form className="col g-3">
                            <h3>Are you sure to inactive?</h3>
                            <div className="row g-1">
                                <button className="primary-btn" onClick={ cancelHandler }>Cancel <FaBan /></button>
                                <button type="submit" className="success-btn" onClick={ inActiveHandler }>Confirm <FaCheck /></button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default CenterModel