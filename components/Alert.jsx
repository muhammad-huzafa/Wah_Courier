import React from 'react'

const Alert = ({ resp }) => {
  return (
    <div>
        { resp.message && <div className="alert-success">{ resp.message }</div> }
        { resp.error && <div className="alert-danger">{ resp.error }</div> }
    </div>
  )
}

export default Alert
