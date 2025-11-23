import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import UserContext from '../../context/UserContext'
import axiosInstance from '../../utils/axiosInstance'
import { useLocation } from 'react-router-dom'

const Statistics = ({ to, from }) => {
  const { role } = useContext(UserContext)
  const [ stats, setStats ] = useState([])
  const location = useLocation()


  const getStatisticsByToday = async () => {
    try {
      const resp = await axiosInstance.get("/api/airwaybill/getStatisticsByToday")
      setStats(resp.data)

    } catch (err) {
      console.log(err)
    }
  }

  const getStatisticsByToFrom = async () => {
    try {
      const formData = new FormData()
      formData.append("to", to)
      formData.append("from", from)
      
      const resp = await axiosInstance.post("/api/airwaybill/getStatisticsByToFrom", formData)
      setStats(resp.data)
      
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (location.pathname == '/admin/dashboard/records' && to !== '' && from !== '') {
      getStatisticsByToFrom()
    }
  }, [to, from])

  useEffect(() => {
    if (location.pathname != '/admin/dashboard/records') {
      getStatisticsByToday()
    }
  }, [])

  return (
    <div className="card-area row">
        {
          stats && stats.map((stat, index) => (
            <Card totalCount={ stat.totalParcels + stat.totalDocuments } parcelsCount={ stat.totalParcels } docsCount={ stat.totalDocuments } collection={ stat.totalCollection } centerName={ stat.username } key={ index } />
          ))
        }
    </div>
  )
}

export default Statistics
