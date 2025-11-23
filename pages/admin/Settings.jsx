import React, { Fragment, useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import Alert from '../../components/Alert'
import Loader from '../../components/Loader'

const Settings = () => {
    const [ center, setCenter ] = useState({})
    const [ formErrors, setFormErrors ] = useState({})
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ resp, setResp ] = useState({})

    const getCenterDetails = async () => {
        try {
            const resp = await axiosInstance.get("/api/center/getCenterDetails");
            
            setCenter(resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCenterDetails()
    }, [formErrors])


    useEffect(() => {        
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            updateHandler() 
        }
    }, [formErrors])


    const inputHandler = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setCenter({ ...center, [name]: value })
    }

    const submissionHandler = (e) => {
        e.preventDefault()
        setFormErrors(validate(center))
        setIsSubmit(true)
    }

    const validate = (values) => {
        const errors = {}

        if (!values.centerName) {
            errors.centerName = "Center name cannot be blank"
        }

        if (!values.centerAddress) {
            errors.centerAddress = "Center address cannot be blank"
        }

        if (!values.username) {
            errors.username = "Username cannot be blank"
        }

        if (!values.fullName) {
            errors.fullName = "Full name cannot be blank"
        } 

        if (!values.phone) {
            errors.phone = "Contact no cannot be blank"
        }

        return errors
    }

    const updateHandler = async (e) => {
        setIsLoading(true)

        try {
            const formData = new FormData()
            formData.append("centerName", center.centerName)
            formData.append("centerAddress", center.centerAddress)
            formData.append("email", center.email)
            formData.append("username", center.username)
            formData.append("fullName", center.fullName)
            if (center.password) { formData.append("password", center.password) }
            formData.append("phone", center.phone)

            const resp = await axiosInstance.put("/api/center/updateProfile", formData)
            setResp({ message: 'Profile Updated Successfully' })
            getCenterDetails()

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
            setIsSubmit(false)
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
            <div className="settings col">
                <div className="row">
                    <h3>Center Settings</h3>
                </div>
                <form action="" className="col w-100 g-3" method="">
                    <div className="row w-100 g-3 ai-start">
                        <div className="left col g-3 w-100">
                            <div className="formHeader">
                                <h3>Center Info</h3>
                            </div>
                            <input type="hidden" name="centerId" value="" />
                            <div className="form-field col w-100 ai-start">
                                <label htmlFor="centerName">Center Name</label>
                                <input type="text" name="centerName" id="centerName" className='w-100' value={ center.centerName } onChange={ inputHandler } />
                                { formErrors.centerName && <span className='form-field-error'>{ formErrors.centerName }</span> }
                            </div>
                            <div className="form-field col w-100 ai-start">
                                <label htmlFor="centerAddress">Center Address</label>
                                <textarea name="centerAddress" id="centerAddress" cols="70" rows={10} className='w-100' value={ center.centerAddress } onChange={ inputHandler }></textarea>
                                { formErrors.centerAddress && <span className='form-field-error'>{ formErrors.centerAddress }</span> }
                            </div>
                        </div>
                        <div className="right col g-3 w-100">
                            <div className="formHeader">
                                <h3>Representative Info</h3>
                            </div>
                            <div className="form-field col w-100 ai-start">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" name="fullName" id="fullName" className='w-100' value={ center.fullName } onChange={ inputHandler } />
                                { formErrors.fullName && <span className='form-field-error'>{ formErrors.fullName }</span> }
                            </div>
                            <div className='row w-100 g-2'>
                                <div className="form-field col w-100 ai-start">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" className='w-100' value={ center.email } onChange={ inputHandler } />
                                    { formErrors.email && <span className='form-field-error'>{ formErrors.email }</span> }
                                </div>
                                <div className="form-field col w-100 ai-start">
                                    <label htmlFor="phone">Contact No</label>
                                    <input type="tel" name="phone" id="phone" className='w-100' value={ center.phone } onChange={ inputHandler } />
                                    { formErrors.phone && <span className='form-field-error'>{ formErrors.phone }</span> }
                                </div>
                            </div>
                            <div className='row w-100 g-2'>
                                <div className="form-field col w-100 ai-start">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" className='w-100' value={ center.username } onChange={ inputHandler } />
                                    { formErrors.username && <span className='form-field-error'>{ formErrors.username }</span> }
                                </div>
                                <div className="form-field col w-100 ai-start">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className='w-100' onChange={ inputHandler } autoComplete="new-password" />
                                </div>
                            </div>
                        </div>
                    </div>             
                    <div className="row">
                        <button type="submit" className="success-btn" onClick={ submissionHandler }>Save Changes</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Settings
