import React, { useState } from 'react'
import { FaArrowRightToBracket } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosInstance'
import { useContext } from 'react'
import UserContext from '../../../context/UserContext'

const Header = () => {
    const { role, user } = useContext(UserContext);
    const [ resp, setResp ] = useState({})
    const navigate = useNavigate()

    const logoutHandler = async (e) => {
        e.preventDefault()

        try {
            const resp = await axiosInstance.post("/api/center/logout")

            // Redirect to homepage on success
            navigate('/')
            
        } catch (err) {
            // Redirect to the dashboard homepage
            navigate('/admin/dashboard')
            setResp({ error: err.response.statusText })
        }
    }

    return (
        <header className="header row">
            <div>
                <h1>Dashboard</h1>
                <span>Welcome Back, { user.username }</span>
            </div>
            <div className="row">
                <span>{ user.fullName }</span>
                <Link to={"/"} onClick={ logoutHandler }><FaArrowRightToBracket className='icon' /></Link>
            </div>
        </header>
    )
}

export default Header
