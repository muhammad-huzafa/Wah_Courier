import React, { Fragment, useEffect, useState } from 'react'
import { dateFormatter } from '../../utils/helpers'
import CenterModel from '../../components/admin/Models/CenterModel'
import { FaPlus, FaPenToSquare, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa6'
import axiosInstance from '../../utils/axiosInstance'

const Centers = () => {

    const [ centers, setCenters ] = useState([])

    // Get Model Code Here
    const [ modelData, setModelData ] = useState({
        formName: '',
        id: '',
        style: { opacity: 0, transform: 'translateY(-100%)' },
        isOpen: false
    })

    const getModel = (e) => {
        e.preventDefault()
        let isOpen = false
        const { name, id } = e.target 

        if (!modelData.isOpen) {
            isOpen = true
        }
        
        if ( id ) {
            setModelData({
                formName: name,
                id: id,
                style: { opacity: 1, transform: 'translateY(0)' },
                isOpen: isOpen
            })
        } else {
            setModelData({
                formName: name,
                id: '',
                style: { opacity: 1, transform: 'translateY(0)' },
                isOpen: isOpen
            })
        }
    }

    const getCenters = async () => {
        try {
            const resp = await axiosInstance.get("/api/center/getall")

            setCenters(resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCenters()
    }, [modelData])

    return (
        <Fragment>
            <CenterModel modelProps={{ modelData, setModelData }} />
            <div className="centers col">    
                <div className="row">
                    <h3>Our Centers</h3>
                    <a href="" className="primary-btn" onClick={ getModel } name="Add Center">Add Center <FaPlus /></a>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>Sr.No</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Rep. Full Name</th>
                                <th>Rep. Contact No</th>
                                <th>Created At</th>
                                <th>Modified At</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            { 
                                centers && centers.map(( center, index ) => (
                                    <tr key={ index }>
                                        <td>{ index + 1 }</td>
                                        <td>{ center.centerName }</td>
                                        <td>{ center.centerAddress }</td>
                                        <td>{ center.email }</td>
                                        <td>{ center.username }</td>
                                        <td>{ center.fullName }</td>
                                        <td>{ center.phone }</td>
                                        <td>{ dateFormatter( center.createdAt ) }</td>
                                        <td>{ dateFormatter( center.updatedAt ) }</td>
                                        <td>
                                            <span className={`${ center.status == 0 ? 'danger-badge' : center.status == 1 ? 'success-badge' : '' }`}>
                                                { center.status == 0 ? 'Inactive' : center.status == 1 ? 'Active' : '' }
                                            </span>
                                        </td>
                                        <td className='row g-1'>
                                            <button className='primary-btn' id={ center._id } name='Edit Center' onClick={ getModel }>Edit <FaPenToSquare /></button>
                                            <button className='danger-btn' id={ center._id } name='Delete Center' onClick={ getModel }>Delete <FaTrash /></button>
                                            { center.status == 0 && <button className='success-btn' id={ center._id } name='Active Center' onClick={ getModel }>Active <FaChevronUp /></button> }
                                            { center.status == 1 && <button className='warning-btn' id={ center._id } name='Inactive Center' onClick={ getModel }>Inactive <FaChevronDown /></button> }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default Centers
