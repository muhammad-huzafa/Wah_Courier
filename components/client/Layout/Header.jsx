import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/wahcourR.png'
import { FaBars } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'
import AuthPanel from '../AuthPanel'

const Header = () => {   
    const { pathname } = useLocation()
    
    const [ isAuthPanelOpened, setIsAuthPanelOpened ] = useState(false)

    const authPanelHandler = (e) => {
        e.preventDefault()

        setIsAuthPanelOpened(!isAuthPanelOpened)
    }

    useEffect(() => {
        if (isAuthPanelOpened) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'auto'
        }
    
        // Cleanup in case component unmounts
        return () => {
          document.body.style.overflow = 'auto'
        }
        
      }, [isAuthPanelOpened])
    
    return (
        <div className="navbar row">
            <AuthPanel authPanel={{ isAuthPanelOpened, setIsAuthPanelOpened }} />
            <div className="logo">
                <Link to={"/"}><img src={ Logo } alt="wahcouriers-logo-social" /></Link>
            </div>
            <nav>
                <ul className="row">
                    <li className={ pathname === '/' ? 'active' : '' } ><Link to={"/"}>Home</Link></li>
                    <li className={ pathname === '/#whyChoose' ? 'active' : '' } ><a href="#whyChoose">Why Choose</a></li>
                    <li className={ pathname === '/#services' ? 'active' : '' } ><a href="#services">Our Services</a></li>
                    <li className={ pathname === '/#locations' ? 'active' : '' } ><a href="#locations">Our Locations</a></li>
                    <li className={ pathname === '/tracking' ? 'active' : '' } ><Link to={"/tracking"}>Tracking</Link></li>
                    <li className={ pathname === '/#contact' ? 'active' : '' } ><a href="#contact">Contact Us</a></li>
                </ul>
            </nav>
            <div id="header-submenu">
                <button className="btn1" onClick={ authPanelHandler }>Login</button>
                <FaBars />
                <div id="header-submenu-list">
                    <ul>
                        <li className={ pathname === '/' ? 'active' : '' } ><Link to={"/"}>Home</Link></li>
                        <li className={ pathname === '/#whyChoose' ? 'active' : '' } ><a href="#whyChoose">Why Choose</a></li>
                        <li className={ pathname === '/#services' ? 'active' : '' } ><a href="#services">Our Services</a></li>
                        <li className={ pathname === '/#locations' ? 'active' : '' } ><a href="#locations">Our Locations</a></li>
                        <li className={ pathname === '/tracking' ? 'active' : '' } ><Link to={"/tracking"}></Link></li>
                        <li className={ pathname === '/#contact' ? 'active' : '' } ><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
