import Logo from '../../../assets/images/wahcourR.png'
import Barcode from "react-barcode"
import { getDate, getGrossTotal, getPriceFormat, getTime, getTotalDimWeight } from '../../../utils/helpers'

const ShipLabel = ({ airwayBill, copy }) => {
    return (
        copy != "Label Copy" ? 
        <div className="shipLabels col">
            <div className="shipLabel no-break w-100">
                <p className='uppercase center w-100 text1'>{ copy }</p>
                <div className="reciept-header row">
                    <div className="receipt-logo">
                        <img src={ Logo } alt="Company's Logo" />
                    </div>
                    <div>
                        <table border="2">
                            <tbody>
                                <tr>
                                    <td>
                                        <span className="text2">Origin</span><br />
                                        <span className="uppercase text1">{ airwayBill.origin }</span>
                                    </td>
                                    <td>
                                        <span className="text2">Service</span><br />
                                        <span className="uppercase text1">{ airwayBill.service.name }</span>
                                    </td>
                                    <td>
                                        <span className="text2">Destination</span><br />
                                        <span className="uppercase text1">{ airwayBill.destination }</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="barcode col">
                        <Barcode value={ airwayBill.airwayBillNo } format="CODE128" width={2} height={40} displayValue={true} background='transparent' />
                    </div>
                </div>
                <div className='row'>
                    <span className='uppercase text4'>Wah Couriers and Logistics</span>
                </div>
                <div className="w-100">
                    <table border="2">
                        <tbody>
                            <tr>
                                <td rowSpan="5" className="uppercase v-text text1">From</td>
                                <td rowSpan="1" colSpan="3" className="info">
                                    <div className="area">
                                        <div className="company">
                                            <span className="uppercase text2">Account No</span><br />
                                            <span className="uppercase text1">{ airwayBill.center.username }</span>
                                        </div>
                                    </div>
                                    <div className="col uppercase" >
                                        <span className="text2">Shipper</span>
                                        <span className="text1">{ airwayBill.consignor.contactPerson }</span>
                                        <span className="text1">{ airwayBill.consignor.address }</span>  
                                    </div>
                                </td>
                                <td rowSpan="5" className="uppercase v-text text1">To</td>
                                <td colSpan="2" rowSpan="1" className="info" >
                                    <div className="area">
                                        <div className="company">
                                            <span className="uppercase text2">Attention</span><br />
                                            <span className="uppercase text1">{ airwayBill.consignee.company }</span>
                                        </div>
                                    </div>
                                    <div className="col uppercase">
                                        <span className="text2">Consignee</span>
                                        <span className="text1">{ airwayBill.consignee.contactPerson }</span>
                                        <span className="text1">{ airwayBill.consignee.address }</span>
                                    </div>        
                                </td>
                            </tr>                     
                            <tr>
                                <td>
                                    <span className="text2">Contact</span><br />
                                    <span className="uppercase text1">{ airwayBill.consignor.contactPerson }</span>
                                </td>
                                <td>
                                    <span className="text2">Telephone/Telex/Fax</span><br />
                                    <span className="uppercase text1">{ "00" + airwayBill.consignor.phone1 }</span><br />
                                    <span className="uppercase text1">{ airwayBill.consignor.phone2 && "00" + airwayBill.consignor.phone2 }</span>
                                </td>
                                <td>
                                    <span className="text2">NTN/CNIC</span><br />
                                    <span className="uppercase text1">{ airwayBill.consignor.ntnCnic }</span>
                                </td>
                                <td colSpan="2" className="uppercase text2">
                                    <span>Tel 1: { airwayBill.consignee.phone1 }</span><br />
                                    <span>Tel 2: { airwayBill.consignee.phone2 }</span><br />
                                    <span>Email: { airwayBill.consignee.email }</span>
                                </td>
                            </tr>
                            <tr></tr>
                            <tr></tr>
                            <tr></tr>
                        </tbody>
                    </table>
                    <table border="2">
                        <tbody>
                            <tr>
                                <td colSpan="2" className="center">
                                    <span className="uppercase text4">{ airwayBill.airwayBillNo }</span>
                                </td>
                                <td colSpan="2" className="center">
                                    <span className="text2">UAN 00923368418488</span>
                                    <i className="fa fa-whatsapp"></i>
                                    <i className="fa fa-phone"></i>
                                </td>
                                <td colSpan="2">
                                    <span className="text1">COD Amount</span>
                                </td>
                                <td colSpan="2">
                                    <span className="text1">{ airwayBill.codAmount ? getPriceFormat(airwayBill.codAmount) : 'N/A' }</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> :
        <div className="shipLabels col">
            <div className="shipLabel no-break w-100">
                <p className='uppercase center w-100 text1'>{ copy }</p>
                <div className="reciept-header row">
                    <div className="receipt-logo">
                        <img src={ Logo } alt="Company's Logo" />
                    </div>
                    <div>
                        <table border="2">
                            <tbody>
                                <tr>
                                    <td>
                                        <span className="text2">Origin</span><br />
                                        <span className="uppercase text1">{ airwayBill.origin }</span>
                                    </td>
                                    <td>
                                        <span className="text2">Service</span><br />
                                        <span className="uppercase text1">{ airwayBill.service.name }</span>
                                    </td>
                                    <td>
                                        <span className="text2">Destination</span><br />
                                        <span className="uppercase text1">{ airwayBill.destination }</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="barcode col">
                        <Barcode value={ airwayBill.airwayBillNo } format="CODE128" width={2} height={40} displayValue={true} background='transparent' />
                    </div>
                </div>
                <div className='row'>
                    <span className='uppercase text4'>Wah Couriers and Logistics</span>
                </div>
                <div className="w-100">
                    <table border="2">
                        <tbody>
                            <tr>
                                <td colSpan="2" rowSpan="1" className="info" >
                                    <div className="area">
                                        <div className="company">
                                            <span className="uppercase text2">Attention</span><br />
                                            <span className="uppercase text1">{ airwayBill.consignee.company }</span>
                                        </div>
                                    </div>
                                    <div className="col uppercase">
                                        <span className="text2">Consignee</span>
                                        <span className="text1">{ airwayBill.consignee.contactPerson }</span>
                                        <span className="text1">{ airwayBill.consignee.address }</span>
                                    </div>        
                                </td>
                            </tr>                     
                            <tr>
                                <td colSpan="2" className="uppercase text2">
                                    <span>Tel 1: { airwayBill.consignee.phone1 }</span><br />
                                    <span>Tel 2: { airwayBill.consignee.phone2 }</span><br />
                                    <span>Email: { airwayBill.consignee.email }</span>
                                </td>
                            </tr>
                            <tr></tr>
                            <tr></tr>
                            <tr></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>        
    )
}

export default ShipLabel
