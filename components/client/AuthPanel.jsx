import React, { Fragment, useEffect, useState } from 'react'
import Favicon from '../../assets/images/wclFav2.png'
import { FaUser, FaLock } from 'react-icons/fa6'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import Alert from '../Alert'
import Loader from '../Loader'

const AuthPanel = ({ authPanel }) => {

    const [ formValues, setFormValues ] = useState({ username: '', password: '' })
    const [ formErrors, setFormErrors ] = useState({})
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ resp, setResp ] = useState({})
    const navigate = useNavigate()

    const cancelHandler = (e) => {
        e.preventDefault()
        authPanel.setIsAuthPanelOpened(!authPanel.isAuthPanelOpened)
    }

    const inputHandler = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
    }

    const validate = (values) => {
        const errors = {}

        if (!values.username) {
            errors.username = "Username cannot be blank"
        }
        
        if (!values.password) {
            errors.password = "Password cannot be blank"
        }

        return errors
    }

    const loginHandler = async () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('username', formValues.username)
        formData.append('password', formValues.password)

        try { 
            const resp = await axiosInstance.post("/api/center/login", formData)
            navigate('/admin/dashboard')
        } catch (err) {
            if (err.response.status === 400) {
                if (err.response?.data.error == 'Username or Password is incorrect !!') {
                    setResp({ error: "Username or Password is incorrect !!" })
                } else if (err.response?.data.error == 'Center unavailable! Contact admin to active') {
                    setResp({ error: "Center unavailable! Contact admin to active" })
                } else {
                    setResp({ error: err.response.statusText })
                }
            } else if (err.response.status === 404) {
                setResp({ error: "User doesn't exists" })
            } else if (err.response.status === 500) {
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

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            loginHandler();
        }
    }, [formErrors])

    return (
        <Fragment>
            <Alert resp={ resp } />
            { isLoading && <Loader message={"Loading your experience..."} /> }
            <div id="overlay" className="row" style={ authPanel.isAuthPanelOpened ? { transform: "translateY(0) scale(1)" } : {}} >
                <div className="popup col">
                    <div className="logo row">
                        <img src={ Favicon } alt="" />
                    </div>
                    <form action="" method="POST" className="col g-3 lgform">
                        <h2>Login Panel</h2>
                        <div className="form-field col w-100 ai-start">
                            <label htmlFor="username" className="subtext">Username</label>
                            <div className='row g-1'>
                                <input type="text" id="username" name="username" className='w-100' value={ formValues.username } onChange={ inputHandler } />
                                <FaUser className='ico'/>
                            </div>
                        </div>
                        <div className="form-field col w-100 ai-start">
                            <label htmlFor="password" className="subtext">Password</label>
                            <div className='row g-1'>
                                <input type="password" id="password" name="password" className='w-100' value={ formValues.password } onChange={ inputHandler } />
                                <FaLock className='ico'/>
                            </div>
                        </div>
                        <a href='#'>Forgot password?</a>
                        <div className="row g-1">
                            <button className="primary-btn" onClick={ cancelHandler }>Cancel</button>
                            <button type="submit" className="danger-btn" onClick={ handleSubmit }>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default AuthPanel
