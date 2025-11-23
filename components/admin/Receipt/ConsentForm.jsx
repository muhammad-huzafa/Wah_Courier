import { getDate, getInvoiceGrandTotal, getPriceFormat } from '../../../utils/helpers'

const ConsentForm = ({ airwayBill }) => {
    return (
        <div className="consentForm">
            <h1 className="center">CNIC - Consent Form</h1>
            <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Agencies involved in controlling the cross-border movement of illegal drugs (Anti-Narcotics Force of Pakistan, Customs Drug Enforcement Cell and other law enforcement agencies) require courier companies to collect copies of original and valid Computerized National Identity Card (CNIC) from Customer (Shipper), at the time of shipment booking. The courier companies safely retain these CNIC copies and only share them with the law-enforcement agencies upon their request as per legal requirement.  This practice is exercised in case any contraband items, counterfeit goods, bullion, currency, gem stones, weapons, explosives, ammunition, human remains, illegal items, such as ivory and narcotics, hazardous material, dangerous goods, prohibited or restricted articles  and /or illegal drugs are found in the shipment booked by the Shipper.</p>
            <br />
            <p>&emsp;&emsp;&emsp;In order to book your shipment with WAH COURIERS AND LOGISTICS, please sign this form to accept, confirm and endorse your understanding, and your consent to share the copy of your original and valid CNIC.</p>
            <br /><br />
            <h3 className="uppercase">I, { airwayBill.consignor.contactPerson }</h3>
            <div className="consentinfo row">
                <div className="thumbImp">
                    <div>
                        .
                    </div> 
                </div>
                <div>
                    <p style={{ fontWeight: 'bold' }}>Bearing CNIC:</p>
                    <p style={{ fontWeight: 'bold' }}>AWB #:</p>
                </div>
                <div>
                    <p>{ airwayBill.consignor.ntnCnic }</p>
                    <p>{ airwayBill.airwayBillNo }</p>
                </div>
            </div>
            <p>&emsp;&emsp;&emsp;Understand and acknowledge the requirement stated above and agree to share the copy of my original and valid CNIC with WAH COURIERS AND LOGISTICS for onward submission to law enforcement agencies, if required.</p>
            <br /><br /><br /><br />
            <div className="sign-area row">
                <div className="col">
                    <p>___________________________</p>
                    <p>Signature</p>
                </div>
                <div className="col">
                    <p className="underline">{ getDate(airwayBill.createdAt) }</p>
                    <p>Date/Time</p>
                </div>
            </div>
            {
                airwayBill.consignor.idFront && airwayBill.consignor.idBack && 
                <div className="idC row" >
                    <img src={ airwayBill.consignor.idFront } alt="Consignor ID Front" />
                    <img src={ airwayBill.consignor.idBack } alt="Consignor ID Back" />
                </div>
            }
        </div>
    )
}

export default ConsentForm
