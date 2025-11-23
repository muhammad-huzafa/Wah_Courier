import Logo from '../../../assets/images/wahcourR.png'
import { getDate, getInvoiceGrandTotal, getPriceFormat } from '../../../utils/helpers'

const Invoice = ({ airwayBill, copy }) => {
    return (
        <div className="invoiceMain">
            <div>
                <div className="invoice-header row">
                    <div className="receipt-logo">
                        <img src={ Logo } alt="Company's Logo" />
                    </div>
                    <h1 className="center">Invoice</h1>
                    <div className="col">
                        <span className="text5">Date: { getDate(airwayBill.createdAt) }</span>
                        <span className="text5">Invoice: { airwayBill.airwayBillNo }</span>
                    </div>
                </div>
                <div className='row'>
                    <span className='uppercase text4'>Wah Couriers and Logistics</span>
                </div>
                <table border="2" className="invoice">
                    <tbody>
                        <tr>
                            <td className="center"><span className="uppercase text4">Shipper</span></td>
                            <td className="center"><span className="uppercase text4">Receiver</span></td>
                        </tr>
                        <tr>
                            <td>
                                <div className="col">
                                    <span className="text1">Company Name: <span className="text6 uppercase">{ airwayBill.consignor.company }</span></span>
                                    <span className="text1">Contact Person: <span className="text6 uppercase">{ airwayBill.consignor.contactPerson }</span></span>
                                    <span className="text1">Street Address: <span className="text6 uppercase">{ airwayBill.consignor.address }</span></span>
                                    <span className="text1">City: <span className="text6 uppercase">{ airwayBill.consignor.city }</span></span>
                                    <span className="text1">Country: <span className="text6 uppercase">{ airwayBill.consignor.country }</span></span>
                                    <span className="text1">Tel# <span className="text6 uppercase">{ "00" + airwayBill.consignor.phone1 }</span></span>
                                </div>
                            </td>
                            <td>
                                <div className="col">
                                    <span className="text1">Company Name: <span className="text6 uppercase">{ airwayBill.consignee.company }</span></span>
                                    <span className="text1">Contact Person: <span className="text6 uppercase">{ airwayBill.consignee.contactPerson }</span></span>
                                    <span className="text1">Street Address: <span className="text6 uppercase">{ airwayBill.consignee.address }</span></span>
                                    <span className="text1">City: <span className="text6 uppercase">{ airwayBill.consignee.city }</span></span>
                                    <span className="text1">Country: <span className="text6 uppercase">{ airwayBill.consignee.country }</span></span>
                                    <span className="text1">Tel# <span className="text6 uppercase">{ "00" + airwayBill.consignee.phone1 }</span></span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table border="2">
                    <tbody>
                        <tr className="empty"></tr>
                        <tr className="uppercase center">
                            <td className="text1">Mode of Transport</td>
                            <td className="text1">Airway Bill #</td>
                            <td className="text1">Total Gross Weight</td>
                        </tr>
                        <tr className="uppercase center">
                            <td className="text1">Air</td>
                            <td className="text2">{ airwayBill.airwayBillNo }</td>
                            <td className="text1">{ airwayBill.weight }</td>
                        </tr>
                        <tr className="empty"></tr>
                    </tbody>
                </table>
                <table border="2">
                    <thead>
                        <tr className="text1">
                            <th style={{ width: '5%' }}>SNo.</th>
                            <th style={{ width: '30%' }}>Description.</th>
                            <th style={{ width: '20%' }}>Qty</th>
                            <th style={{ width: '10%' }}>Unit Price</th>
                            <th style={{ width: '15%' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            airwayBill.invoices.length > 0 && airwayBill.invoices.map((invoice, index) => (
                                <tr className="uppercase text7" key={ index } >
                                    <td style={{ width: '5%' }}>{ index + 1 }</td>
                                    <td style={{ width: '30%' }}>{ invoice.description }</td>
                                    <td style={{ width: '20%' }}>{ invoice.quantity }</td>
                                    <td style={{ width: '10%' }}>{ invoice.price && getPriceFormat(invoice.price) }</td>
                                    <td style={{ width: '15%' }}>{ invoice.price && invoice.quantity && getPriceFormat(invoice.quantity * invoice.price) }</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4"></td>
                            <td className="text1">Total: { getInvoiceGrandTotal(airwayBill.invoices) }</td>
                        </tr>
                    </tfoot>
                </table>
                <table border="2" className="receipt-end">
                    <tbody>
                        <tr>
                            <td>
                                <div className="text2">
                                    <p>The Shipper hereby certifies that the shipment does not contain any drugs, narcotics, contraband items, or any IATA-restricted materials. If any such material is discovered during inspection, the Shipper shall be held fully responsible. Any duties or taxes at the destination, if not paid by the consignee, will be the responsibility of the undersigned. No claims will be entertained, and the shipment will remain at the Shipper's risk. Shipper has only paid the freight charges. Custom duties and taxes will be paid by the consignee at the destination.</p>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span className="text1">Signature/Stamp: </span><br />
                                        <span className="text1">Thumb Impression: </span>
                                        <span className="text1">CNIC: </span>
                                    </div>
                                    <div className="col">
                                        <span>_________________________________</span><br />
                                        <span>_________________________________</span>
                                        <span>_________________________________</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Invoice
