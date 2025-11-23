import React, { use, useEffect, useState } from 'react'
import Logo from '../../assets/images/wahcourR.png'
import { FaPrint } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Barcode from "react-barcode";
import { getDate, getGrossTotal, getInvoiceGrandTotal, getPriceFormat, getTime, getTotalDimWeight } from '../../utils/helpers'
import ReceiptInfo from '../../components/admin/Receipt/ReceiptInfo'
import ShipLabel from '../../components/admin/Receipt/ShipLabel'
import Invoice from '../../components/admin/Receipt/Invoice'
import ConsentForm from '../../components/admin/Receipt/ConsentForm'

const Receipt = () => {

    const params = useParams()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ airwayBill, setAirwayBill ] = useState({})

    useEffect(() => {
        const id = params.id
        getReceipt(id)
    }, [])

    const getReceipt = async (id) => {
        try {
            const resp = await axiosInstance.get(`/api/airwaybill/receipt/${id}`)
            setAirwayBill(resp.data)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const printHandler = (e) => {
        e.preventDefault()
        window.print()
    }
    
    return (
        isLoading ? '' : 
        <div className="main2 print">
            <div className="actions">
                <a href="" target="_blank" className="primary-btn" id="printBtn" onClick={ printHandler }>
                    <FaPrint />
                </a>
            </div>
            <ReceiptInfo airwayBill={ airwayBill } copy={"Customer Copy"} />
            <div className="pagebreak"> </div>  
            <ReceiptInfo airwayBill={ airwayBill } copy={"Express Centre Copy"} />
            <br /><hr />
            <div className="pagebreak"> </div>
            <ShipLabel airwayBill={ airwayBill } copy={"Label Copy"} />
            <br /><hr />
            <ShipLabel airwayBill={ airwayBill } copy={"Accounts Copy"} />
            <br /><hr />
            <ShipLabel airwayBill={ airwayBill } copy={"Express Center Copy"} />
            <hr />
            <div className="pagebreak"> </div>  
            {
                airwayBill.invoices && airwayBill.shipmentType == 1 &&                
                <Invoice airwayBill={ airwayBill } />
            }
            
            <div className="pagebreak"> </div>
            <ConsentForm airwayBill={ airwayBill } />
        </div>
    )
}

export default Receipt
