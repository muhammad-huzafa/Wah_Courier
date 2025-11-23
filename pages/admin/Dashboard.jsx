import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/admin/Layout/Sidebar'
import Header from '../../components/admin/Layout/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Centers from './Centers'
import Records from './Records'
import TrackingManagment from './TrackingManagment'
import FinanceManagement from './FinanceManagement'
import AccountsManagement from './AccountsManagement'
import Settings from './Settings'
import AirwayBill from './AirwayBill'
import MobNavBar from '../../components/admin/Layout/MobNavBar'
import AdminProtectedRoute from '../../utils/AdminProtectedRoute'
import Archives from './Archives'

const Dashboard = () => {
    const [ isExpand, setIsExpand ] = useState(true)

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
        setScreenWidth(window.innerWidth); // Update state when screen resizes
        };

        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Only runs once when component mounts

    const getDashWidth = (w) => {
        if (screenWidth < 780) {
            setIsExpand(true)
        }
        
        return screenWidth - w
    }

    return (
        <div className='main row'>
            <>
                <Sidebar expand={{ isExpand, setIsExpand }} />
                <MobNavBar />
            </>
            <main className="dashboard col" style={ !isExpand ? { width: `${ getDashWidth(70) }px`} : {} }>
                <Header />
                <Routes>
                    <Route index element={ <Home /> } />
                    <Route path='/airwaybill' element={ <AirwayBill /> } />
                    <Route path='/centers' element={ <Centers /> } />
                    <Route path='/records' element={ <Records /> } />
                    <Route path='/tracking-management' element={ <AdminProtectedRoute> <TrackingManagment /> </AdminProtectedRoute> } />
                    <Route path='/finance-management' element={ <AdminProtectedRoute> <FinanceManagement /> </AdminProtectedRoute> } />
                    <Route path='/accounts-managment' element={ <AdminProtectedRoute> <AccountsManagement /> </AdminProtectedRoute> } />
                    <Route path='/archives' element={ <AdminProtectedRoute> <Archives /> </AdminProtectedRoute> } />
                    <Route path='/settings' element={ <Settings /> } />
                </Routes>
            </main>
        </div>
    )
}

export default Dashboard