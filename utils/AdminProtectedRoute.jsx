import { Navigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { useState } from "react"
import UserContext from "../context/UserContext"
import axiosInstance from "./axiosInstance";

const AdminProtectedRoute = ({ children }) => {
    // const [ user, setUser ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const { user, setUser, setRole } = useContext(UserContext)

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

    useEffect(() => {
      getUser()
    }, [])

    if (isLoading) {
      return null
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

    if (user && user.role !== 1) {
      return <Navigate to="/admin/dashboard" />;
    }

    return children
};

export default AdminProtectedRoute