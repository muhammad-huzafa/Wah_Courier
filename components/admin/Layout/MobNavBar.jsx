import React, { useContext, useEffect } from 'react'
import Logo from '../../../assets/images/wclFav1.png'
import { FaHouse, FaBuilding, FaGlobe, FaMapLocationDot, FaMoneyBill, FaGear, FaArrowRightFromBracket } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'
import UserContext from '../../../context/UserContext'

const MobNavBar = () => {
    const { role } = useContext(UserContext)
    const { pathname } = useLocation()
    
    return (
        <nav className="mob-navbar row w-100">
            <ul className="mob-navbar-list row jc-between w-100">
                {
                    role == 1 &&
                    <li className={`mob-navbar-list-item ${pathname === '/admin/dashboard/centers' ? 'active' : ''}`}>
                        <Link to={"/admin/dashboard/centers"} className='row g-2 jc-start'>
                            <FaBuilding />
                        </Link>
                    </li>
                }
                <li className={`mob-navbar-list-item ${pathname === '/admin/dashboard/records' ? 'active' : ''}`}>
                    <Link to={"/admin/dashboard/records"} className='row g-2 jc-start'>
                        <FaGlobe />
                    </Link>
                </li>   
                {
                    role == 1 &&
                    <li className={`mob-navbar-list-item ${pathname === '/admin/dashboard/tracking-management' ? 'active' : ''}`}>
                        <Link to={"/admin/dashboard/tracking-management"} className='row g-2 jc-start'>
                            <FaMapLocationDot />
                        </Link>
                    </li>
                }
                <li className={`mob-navbar-list-item logo ${pathname === '/admin/dashboard' ? 'active' : ''}`}>
                    <Link to={"/admin/dashboard"} className='row g-2 jc-start'>
                        <img src={ Logo } alt="" />
                    </Link>
                </li>
                {
                    role == 1 && 
                    <>
                        <li className={`mob-navbar-list-item ${pathname === '/admin/dashboard/finance-management' ? 'active' : ''}`}>
                            <Link to={"/admin/dashboard/finance-management"} className='row g-2 jc-start'>
                                <FaMoneyBill />
                            </Link>
                        </li>
                        <li className={`mob-navbar-list-item ${pathname === '/admin/dashboard/accounts-management' ? 'active' : ''}`}>
                            <Link to={"/admin/dashboard/accounts-management"} className='row g-2 jc-start'>
                                <FaMoneyBill />
                            </Link>
                        </li>
                    </>
                }
                <li className={`mob-navbar-list-item ${pathname === '/admin/dashboard/settings' ? 'active' : ''}`}>
                    <Link to={"/admin/dashboard/settings"} className='row g-2 jc-start'>
                        <FaGear />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default MobNavBar
