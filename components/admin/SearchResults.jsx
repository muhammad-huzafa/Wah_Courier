import React, { useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance'

const SearchResults = ({ res, shipper, rec, isConsignor }) => {

    const cancelHandler = async () => {
        res.setResults([])
    }

    const selectHandler = (e) => {
        const { id } = e.target
        
        if (isConsignor) {
            selectShipper(id)
        } else {
            selectReciever(id)
        }
    }

    const selectShipper = async (id) => {
        try {
            const resp = await axiosInstance.get(`/api/customer/getOne/${id}`)
            
            shipper.setShipperDetails({
                _id: resp.data._id,
                shipperCompany: resp.data.company,
                shipperContactPerson: resp.data.contactPerson,
                shipperRef: resp.data.ref,
                shipperAddress: resp.data.address,
                shipperState: resp.data.state,
                shipperCity: resp.data.city,
                shipperPostCode: resp.data.postCode,
                shipperPhone1: resp.data.phone1,
                shipperPhone2: resp.data.phone2,
                shipperNtnCnicNo: resp.data.ntnCnic,
                shipperEmail: resp.data.email
            })
        } catch (err) {
            console.log(err)
        } finally {
            res.setResults([])
        }
    }

    const selectReciever = async (id) => {
        try {
            const resp = await axiosInstance.get(`/api/customer/getOne/${id}`)
            rec.setReceiverDetails({                
                _id: resp.data._id,
                recCompany: resp.data.company,
                recContactPerson: resp.data.contactPerson,
                recAddress: resp.data.address,
                recCountry: resp.data.country,
                recState: resp.data.state,
                recCity: resp.data.city,
                recPostCode: resp.data.postCode,
                recPhone1: resp.data.phone1,
                recPhone2: resp.data.phone2,
                recFax: resp.data.recFax,
                recEmail: resp.data.email
            })
        } catch (err) {
            console.log(err)
        } finally {            
            res.setResults([])
        }
    }
    
    return (
        <div id="searchBox" className="row" style={ res.results.length > 0 ? { transform: 'translateY(0) scale(1)' } : {} } >
            <div className="popup col">
                <div className="table-container">
                    <table id="custTable">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Company</th>
                                <th>Contact Person</th>
                                <th>Ref</th>
                                <th>Address</th>
                                <th>Country</th>
                                <th>State</th>
                                <th>City</th>
                                <th>PostCode</th>
                                <th>Phone 1</th>
                                <th>Phone 2</th>
                                <th>NTN/CNIC</th>
                                <th>FAX</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="custTableBody">
                            {
                                res.results.length > 0 && res.results.map(( result, index ) => (        
                                    <tr key={ index }>
                                        {/* <td>{ result._id }</td> */}
                                        <td>{ result.company }</td>
                                        <td>{ result.contactPerson }</td>
                                        <td>{ result.ref }</td>
                                        <td>{ result.address }</td>
                                        <td>{ result.country }</td>
                                        <td>{ result.state }</td>
                                        <td>{ result.city }</td>
                                        <td>{ result.postCode }</td>
                                        <td>{ result.phone1 }</td>
                                        <td>{ result.phone2 }</td>
                                        <td>{ result.ntnCnic }</td>
                                        <td>{ result.fax }</td>
                                        <td>{ result.email }</td>
                                        <td>
                                            <button className='success-btn' onClick={ selectHandler } id={ result._id } >Select</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="primary-btn" onClick={ cancelHandler }>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default SearchResults
