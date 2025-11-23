import React from 'react'
import UserContext from './UserContext'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import Cookies from 'js-cookie'

const UserProvider = (props) => {
    const [ user, setUser ] = useState(null)
    const [ role, setRole ] = useState(0)
    const [ isLoading, setIsLoading ] = useState(true)  

    useEffect(() => {
        const getUser = async () => {
            try {
                const resp = await axiosInstance.get("/api/center/getCenterDetails");
                
                // This runs only if status is 2xx
                setIsLoading(false)
                setUser(resp.data)
                setRole(resp.data.role)
            } catch (err) {
                setIsLoading(false)
                setUser(null)
                setRole(null)
            }
        }

        getUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, role, setRole, isLoading, setIsLoading }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider