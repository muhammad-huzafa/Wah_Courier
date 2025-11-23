import Logo from '../../../assets/images/wahcourR.png'
import Barcode from "react-barcode"
import { getDate, getGrossTotal, getPriceFormat, getTime, getTotalDimWeight } from '../../../utils/helpers'
import Document from '../../../assets/images/types/document.png'
import Parcel from '../../../assets/images/types/parcel.png'

const ReceiptInfo = ({ airwayBill, copy }) => {
    return (
        <div className="receipt col" id="receipt">
            <div className="receiptMain">
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
                <table border="2">
                    <tbody>
                        <tr>
                            <td rowSpan="5" className="uppercase v-text text1">
                                From
                            </td>
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
                                        <span className="uppercase text1">{ airwayBill.consignee.contactPerson }</span>
                                    </div>
                                </div>
                                <div className="col uppercase">
                                    <span className="text2">Consignee</span>
                                    <span className="text1 mt-3">{ airwayBill.consignee.contactPerson }</span>
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
                            <td colSpan="2" rowSpan="4" className="text2">
                                Shipper warrants that all information furnished is true and correctand that he / she / they have read and clearly understand thestandard conditions of carriage of Wah Courier & Logistics. As printed on below the airway bill.<br /><br />
                                <span className="uppercase text1">Shipper</span><br />
                                <span className="uppercase text1">Signature</span>
                            </td>
                            <td colSpan="3" rowSpan="2" className="text2">
                                Wah Courier & Logistics is not Responsible for Re-Weight, Remote area or anyother charges. It will be applicable to Shipper or Client.
                            </td>
                            <td colSpan="2">
                                <div className="col text2">
                                    DIMENSION
                                    {
                                        airwayBill.dimensions.map((dimension, index) => (
                                            <div className="row dimensions text1" key={ index }>
                                                <span>Length</span>
                                                <span>{ dimension.length }</span>
                                                <span>Width</span>
                                                <span>{ dimension.width }</span>
                                                <span>Height</span>
                                                <span>{ dimension.height }</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td className="center text2">
                                Total<br />Peices
                            </td>
                            <td className="center text2">
                                Weight (KGs)
                            </td>
                            <td className="center text2">
                                Description of Shipment
                            </td>
                            <td colSpan="2">
                                <span className="text2">Shipment Type</span><br />
                                <span className="uppercase text1" id="shipType">
                                    {
                                        <img src={`${ airwayBill.shipmentType == 1 ? Parcel : airwayBill.shipmentType == 2 && Document }`}  />
                                    }
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan="4" className="center text1">{ airwayBill.pieces }</td>
                            <td rowSpan="2" className="center text1">{ airwayBill.weight }</td>
                            <td rowSpan="4" className="center uppercase text1">
                                {
                                    airwayBill.invoices?.map((invoice, index) => (
                                        <p key={index}>{ invoice.description }</p>
                                    ))
                                }
                            </td>
                            <td className="uppercase text2">Charges</td>
                            <td rowSpan="1" className="text1">{ getPriceFormat(airwayBill.amount) }</td>
                        </tr>
                        <tr>
                            <td rowSpan="2">
                                <div className="col">
                                    <span className="text2">PU Date</span>
                                    <span className="text1">{ getDate(airwayBill.createdAt) }</span>
                                </div>
                            </td>
                            <td rowSpan="2">
                                <div className="col">
                                    <span className="text2">PU Time</span>
                                    <span className="text1">{ getTime(airwayBill.createdAt) }</span>
                                </div>
                            </td>
                            <td className="uppercase text2">
                                <span>Insurance</span>
                            </td>
                            <td rowSpan="1" className="text1">{ airwayBill.isInsurance ? 'Yes' : 'N/A' }</td>   
                        </tr>
                        <tr>
                            <td rowSpan="2" className="center text1" >
                                Dim Weight<br /> { getTotalDimWeight(airwayBill.dimensions) }
                            </td>   
                            <td className="uppercase text2">
                                <span>Val Declared</span>
                            </td>
                            <td rowSpan="1" className="text1">{ airwayBill.isInsurance ? getPriceFormat(airwayBill.worthOfPackage) : 'N/A' }</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <span className="uppercase text2">Courier's</span><br />
                                <span className="uppercase text2">Signature __________________</span>
                            </td>
                            <td className="uppercase text2">
                                <span>COD Amount</span>
                            </td>  
                            <td className="text1">
                                <span>{ airwayBill.codAmount ? getPriceFormat(airwayBill.codAmount) : 'N/A' }</span>
                            </td>
                            
                        </tr>
                        <tr>
                            <td colSpan="1" rowSpan="3">
                                <span>
                                    Track it at<br /><a href="https://www.wahcouriers.com" id="link">www.wahcouriers.com</a>
                                </span>
                            </td>
                            <td colSpan="4" rowSpan="3">
                                <span className="text1">Remarks</span><br />
                                <span>{ airwayBill.remarks ? airwayBill.remarks : '' }</span>
                            </td>
                            <td className="uppercase text2">
                                <span>GST</span>
                            </td>  
                            <td className="text1">
                                <span>{ airwayBill.gst != 0 ? airwayBill.gst + "%" : 'N/A' }</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="uppercase text2">
                                <span>Discount</span>
                            </td>  
                            <td className="text1">
                                <span>{ airwayBill?.discount ? getPriceFormat(airwayBill.discount) : 'N/A' }</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="uppercase text2">
                                <span>Net Amount</span>
                            </td>  
                            <td className="text1">
                                <span>{ getPriceFormat(getGrossTotal(airwayBill.amount, airwayBill.discount, airwayBill.gst)) }</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table border="2">
                    <tbody>
                        <tr>
                            <td colSpan="4" className="center">
                                <span className="uppercase text4">{ airwayBill.airwayBillNo }</span>
                            </td>
                            <td colSpan="4" className="center">
                                <span className="text2">UAN 00923368418488</span>
                                <i className="fa fa-whatsapp"></i>
                                <i className="fa fa-phone"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h2 className='center w-100 text4'>Terms & Conditions</h2>
                <div className="terms row">
                    <div>
                        <ol className="start">
                            <li>The Shipper hereby certifies that the shipment does not contain any drugs, narcotics, contraband items, or any IATA-restricted materials. If any such material is discovered during inspection, the Shipper shall be held fully responsible.</li>
                            <li>Any duties or taxes at the destination, if not paid by the consignee, will be the responsibility of the undersigned.</li>
                            <li>No claims will be entertained, and the shipment will remain at the Shipper's risk.</li>
                            <li>The Shipper has only paid the freight charges. Customs duties and taxes will be paid by the consignee at the destination.</li>
                        </ol>
                    </div>
                    <div>
                        <ol start="5">
                            <li>Delivery time will be calculated based on working days only, starting from the date of departure from Pakistan.</li>
                            <li>Saturdays and Sundays are not considered working days and will not be included in the delivery time calculation.</li>                            
                            <li>Any delays caused by customs clearance at the destination or in transit will not be counted as part of the delivery time.</li>
                            <li>Delays due to natural disasters, adverse weather conditions, war, or any other unforeseen circumstances resulting in flight delays or cancellations will not be included in the delivery timeframe.</li>
                        </ol>
                    </div>
                </div>
                <div className="terms row row-rev">
                    <div>
                        <ol className="start">
                            <li> بھیجنے والا تصدیق کرتا ہے کہ اس شپمنٹ میں کسی قسم کی منشیات، نشہ آور اشیاء، ممنوعہ سامان یا کوئی ایسا مواد شامل نہیں جو کے قوانین کے تحت ممنوع ہو۔ اگر معائنے کے دوران ایسا کوئی مواد پایا گیا تو اس کی مکمل ذمہ داری بھیجنے والے پر عائد ہوگی۔</li>
                            <li> اگر منزل پر کسی قسم کے ٹیکس یا کسٹم ڈیوٹیز لاگو ہوں اور وصول کنندہ ان کی ادائیگی نہ کرے، تو ان کی مکمل ذمہ داری دستخط کنندہ پر ہوگی۔</li>
                            <li>کسی بھی قسم کا کلیم قابلِ قبول نہیں ہوگا، اور شپمنٹ مکمل طور پر بھیجنے والے کے رسک پر ہوگی۔</li>
                            <li>بھیجنے والے نے صرف فریٹ چارجز ادا کیے ہیں۔ کسٹم ڈیوٹیز اور دیگر تمام ٹیکسز کی ادائیگی منزل پر وصول کنندہ کرے گا۔</li>
                        </ol>
                    </div>
                    <div>
                        <ol start="5">
                            <li>ڈیلیوری کا وقت صرف ورکنگ ڈیز کاروباری دنوں میں شمار کیا جائے گا، اور یہ وقت پاکستان سے روانگی کی تاریخ سے شروع ہوگا۔</li>
                            <li>ہفتہ اور اتوار ورکنگ ڈیز میں شمار نہیں ہوں گے اور انہیں ڈیلیوری کے وقت میں شامل نہیں کیا جائے گا۔</li>                            
                            <li>اگر شپمنٹ دورانِ راستہ یا منزل پر کسٹمز کلیرنس کی وجہ سے تاخیر کا شکار ہو تو وہ وقت ڈیلیوری ٹائم میں شمار نہیں ہوگا۔</li>
                            <li>قدرتی آفات، خراب موسم، جنگ یا کسی بھی ایسے غیر متوقع حالات جن کی وجہ سے پروازیں تاخیر کا شکار ہوں، ان کی وجہ سے ہونے والی تاخیر ڈیلیوری کے وقت میں شامل نہیں کی جائے گی۔</li>
                        </ol>
                    </div>
                </div>
            </div>
            <hr />
            {
                copy == "Express Centre Copy" &&
                <div className='row w-100 ai-end jc-end g-4'>
                    <div className='row jc-start g-2'>
                        <span className='text4'>Signature: </span> ___________________
                    </div>
                    <div className="thumbImp">
                        <div>
                            .
                        </div> 
                    </div>
                </div>
            }
        </div>
    )
}

export default ReceiptInfo