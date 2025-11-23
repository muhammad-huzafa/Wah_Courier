import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../../assets/images/wahcour.png'
import Fav from '../../../assets/images/wclFav1.png'
import { FaBars, FaHouse, FaBuilding, FaGlobe, FaMapLocationDot, FaMoneyBill, FaBoxArchive, FaGear, FaArrowRightFromBracket } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosInstance'
import UserContext from '../../../context/UserContext'

const Sidebar = ({ expand, style }) => {
    const { role } = useContext(UserContext)
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const [ resp, setResp ] = useState({})

    const expandHandler = () => {
        expand.setIsExpand( !expand.isExpand )
    }

    const logoutHandler = async (e) => {
        e.preventDefault()

        try {
            const resp = await axiosInstance.post("/api/center/logout")

            // Redirect to homepage on success
            navigate('/')
            
        } catch (err) {
            // Redirect to the dashboard homepage
            setResp({ error: err.response?.status })
        }
    }

    return (
        <aside className="sidebar col" style={ !expand.isExpand ? { width: '70px' } : {} }>
            <div className="logo row">
                { expand.isExpand ? <img src={ Logo } alt="" /> :  <img src={ Fav } alt="" /> }
            </div>
            <ul className="sidebar-list col">
                <li className={`sidebar-list-item ${pathname === '/admin/dashboard' ? 'active' : ''}`}>
                    <Link to={"/admin/dashboard"} className='row g-2 jc-start'>
                        <FaHouse />
                        { expand.isExpand && <span>Home</span> }
                    </Link>
                </li>
                {
                    role === 1 &&
                    <li className={`sidebar-list-item ${pathname === '/admin/dashboard/centers' ? 'active' : ''}`}>
                        <Link to={"/admin/dashboard/centers"} className='row g-2 jc-start'>
                            <FaBuilding />
                            { expand.isExpand && <span>Our Centers</span> }
                        </Link>
                    </li>
                }
                <li className={`sidebar-list-item ${pathname === '/admin/dashboard/records' ? 'active' : ''}`}>
                    <Link to={"/admin/dashboard/records"} className='row g-2 jc-start'>
                        <FaGlobe />
                        { expand.isExpand && <span>View Records</span> }
                    </Link>
                </li>   
                {
                    role === 1 && 
                    <>
                        <li className={`sidebar-list-item ${pathname === '/admin/dashboard/tracking-management' ? 'active' : ''}`}>
                            <Link to={"/admin/dashboard/tracking-management"} className='row g-2 jc-start'>
                                <FaMapLocationDot />
                                { expand.isExpand && <span>Tracking Management</span> }
                            </Link>
                        </li>
                        <li className={`sidebar-list-item ${pathname === '/admin/dashboard/finance-management' ? 'active' : ''}`}>
                            <Link to={"/admin/dashboard/finance-management"} className='row g-2 jc-start'>
                                <FaMoneyBill />
                                { expand.isExpand && <span>Finance Management</span> }
                            </Link>
                        </li>
                        <li className={`sidebar-list-item ${pathname === '/admin/dashboard/accounts-management' ? 'active' : ''}`}>
                            <Link to={"/admin/dashboard/accounts-management"} className='row g-2 jc-start'>
                                <FaMoneyBill />
                                { expand.isExpand && <span>Accounts Management</span> }
                            </Link>
                        </li>
                        <li className={`sidebar-list-item ${pathname === '/admin/dashboard/archives' ? 'active' : ''}`}>
                            <Link to={"/admin/dashboard/archives"} className='row g-2 jc-start'>
                                <FaBoxArchive />
                                { expand.isExpand && <span>Archives</span> }
                            </Link>
                        </li>
                    </>
                }
                <li className={`sidebar-list-item ${pathname === '/admin/dashboard/settings' ? 'active' : ''}`}>
                    <Link to={"/admin/dashboard/settings"} className='row g-2 jc-start'>
                        <FaGear />
                        { expand.isExpand && <span>Settings</span> }
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to={""} className='row g-2 jc-start' onClick={ logoutHandler }>
                        <FaArrowRightFromBracket />
                        { expand.isExpand && <span>Logout</span> }
                    </Link>
                </li>
            </ul>
            <div className='expand-ico row' onClick={ expandHandler }>
                <FaBars />
            </div>
        </aside>
    )
}

export default Sidebar
