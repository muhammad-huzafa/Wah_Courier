import React from 'react'
import { FaTruck } from 'react-icons/fa6'

const Card = ({ totalCount, parcelsCount, docsCount, collection, centerName }) => {
  return (
    <div className="card row">
        <div className="col">
            <FaTruck className='icon' />
            <div>
                <h2>{ totalCount }</h2>
                <div className="info">
                    <h2>Parcels: { parcelsCount }</h2>
                    <h2>Docs: { docsCount }</h2>
                    <h2>Collection: { collection }</h2>
                </div>
                <span>{ centerName }</span>
            </div>
        </div>
        <span>Today's</span>
    </div>
  )
}

export default Card