import { Navigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { useState } from "react"
import UserContext from "../context/UserContext"

const AdminProtectedRoute = ({ children }) => {
    // const [ user, setUser ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const { user, setUser, setRole } = useContext(UserContext)

    const getUser = async () => {
      const resp = await axiosInstance.get("/api/center/getCenterDetails")

      if (resp.status === 200) {
          setIsLoading(false)
          setUser(resp.data)
          setRole(resp.data.role)
      } else if (resp.status === 400) {
          setIsLoading(false)
          setUser(null)
          setRole(null)
      } else if (resp.status === 401) {
        setIsLoading(false)
        setUser(null)
        setRole(null)
      } else {                
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

    if (user && user.role !== 2) {
        return <Navigate to="/admin/dashboard" />;
    }

    return children
};

export default AdminProtectedRoute